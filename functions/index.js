const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const admin             = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ── Secrets (guardar con: firebase functions:secrets:set NOMBRE) ──
const geminiKey        = defineSecret("GEMINI_API_KEY");
const stripeSecretKey  = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSec = defineSecret("STRIPE_WEBHOOK_SECRET");

// ── Parámetros (se configuran en functions/.env) ──
const stripePriceId    = defineString("STRIPE_PRICE_ID", { default: "" }); // único precio aceptado en el checkout
// "gemini-flash-latest" siempre apunta al Flash vigente, así no se rompe cuando Google retira un modelo
const geminiModel      = defineString("GEMINI_MODEL", { default: "gemini-flash-latest" });

// ── Constantes ───────────────────────────────────────────────
const LIMITE_GRATIS = 3;  // análisis gratis por día
const APP_URL       = "https://nury2015.github.io/ViveSano";
const MAX_IMAGEN_B64 = 4 * 1024 * 1024; // ~3 MB de imagen
const TIPOS_IMAGEN  = ["image/jpeg", "image/png", "image/webp"];

// ════════════════════════════════════════════════════════════
// 1. ANALIZAR PLATO (verifica acceso + llama Gemini)
// ════════════════════════════════════════════════════════════
exports.analizarPlatoIA = onCall(
  { secrets: [geminiKey], region: "us-central1", timeoutSeconds: 60 },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Debes iniciar sesión para usar esta función.");

    const uid = request.auth.uid;
    const { imagenBase64, mediaType = "image/jpeg", perfilUsuario = {} } = request.data || {};
    if (typeof imagenBase64 !== "string" || !imagenBase64)
      throw new HttpsError("invalid-argument", "Se requiere una imagen.");
    if (imagenBase64.length > MAX_IMAGEN_B64)
      throw new HttpsError("invalid-argument", "La imagen es demasiado grande.");
    if (!TIPOS_IMAGEN.includes(mediaType))
      throw new HttpsError("invalid-argument", "Formato de imagen no soportado.");

    // ── Reservar un análisis (premium o cuota gratuita) ─────
    const acceso = await reservarUso(uid);
    if (!acceso.permitido) {
      throw new HttpsError("resource-exhausted", JSON.stringify({
        tipo: "limite_alcanzado",
        usados: LIMITE_GRATIS,
        limite: LIMITE_GRATIS,
      }));
    }

    // ── Llamar a Gemini ────────────────────────────────────
    let analisis;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel.value()}:generateContent`;
      const res = await fetch(url, {
        method:  "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey.value() },
        body: JSON.stringify({
          contents: [{ parts: [
            { inlineData: { mimeType: mediaType, data: imagenBase64 } },
            { text: construirPrompt(perfilUsuario) },
          ]}],
          // Margen amplio: los modelos con "thinking" gastan tokens antes de responder
          generationConfig: { temperature: 0.4, maxOutputTokens: 4096, responseMimeType: "application/json" },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Gemini", res.status, err?.error?.message);
        throw new HttpsError(res.status === 429 ? "unavailable" : "internal",
          res.status === 429 ? "La IA está ocupada. Intenta en un minuto." : "No se pudo analizar la imagen.");
      }

      const data  = await res.json();
      const texto = (data?.candidates?.[0]?.content?.parts || [])
        .filter(p => p.text && !p.thought).map(p => p.text).join("");
      analisis = parsearRespuesta(texto);
    } catch (e) {
      // Si la IA falla, devolver el análisis reservado
      if (acceso.tipo === "gratis") await liberarUso(uid);
      if (e instanceof HttpsError) throw e;
      console.error("Error analizando plato:", e);
      throw new HttpsError("internal", "No se pudo analizar la imagen.");
    }

    return {
      ok:       true,
      analisis,
      acceso:   acceso.tipo,
      restantes: acceso.tipo === "gratis" ? acceso.restantes : null,
    };
  }
);

// ════════════════════════════════════════════════════════════
// 2. CREAR SESIÓN DE PAGO STRIPE
// ════════════════════════════════════════════════════════════
exports.crearCheckout = onCall(
  { secrets: [stripeSecretKey], region: "us-central1" },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Debes iniciar sesión.");

    // Solo se acepta el precio configurado en el servidor
    if (!stripePriceId.value() || request.data?.priceId !== stripePriceId.value())
      throw new HttpsError("invalid-argument", "Plan no válido.");

    const Stripe = require("stripe");
    const stripe = Stripe(stripeSecretKey.value());
    const uid    = request.auth.uid;
    const email  = request.auth.token.email || "";

    // Crear o recuperar customer de Stripe
    const userDoc = await db.collection("usuarios").doc(uid).get();
    let customerId = userDoc.data()?.suscripcion?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { uid } });
      customerId = customer.id;
      await db.collection("usuarios").doc(uid).set(
        { suscripcion: { stripeCustomerId: customerId } }, { merge: true }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode:                 "subscription",
      customer:             customerId,
      payment_method_types: ["card"],
      line_items: [{
        price:    stripePriceId.value(), // ID del precio en Stripe
        quantity: 1,
      }],
      success_url: `${APP_URL}/suscripcion.html?exito=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${APP_URL}/suscripcion.html?cancelado=1`,
      metadata:    { uid },
    });

    return { url: session.url };
  }
);

// ════════════════════════════════════════════════════════════
// 3. WEBHOOK DE STRIPE (eventos de pago)
// ════════════════════════════════════════════════════════════
exports.webhookStripe = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSec], region: "us-central1" },
  async (req, res) => {
    const Stripe = require("stripe");
    const stripe = Stripe(stripeSecretKey.value());
    const sig    = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSec.value());
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.metadata?.uid;
        if (uid) {
          await db.collection("usuarios").doc(uid).set({
            suscripcion: {
              estado:               "activo",
              plan:                 "premium",
              stripeSubscriptionId: session.subscription,
              stripeCustomerId:     session.customer,
              fechaActivacion:      admin.firestore.FieldValue.serverTimestamp(),
            }
          }, { merge: true });
        }
        break;
      }
      case "customer.subscription.deleted":
      case "customer.subscription.paused": {
        const customerId = event.data.object.customer;
        const snap = await db.collection("usuarios")
          .where("suscripcion.stripeCustomerId", "==", customerId).get();
        await Promise.all(snap.docs.map(doc => doc.ref.update({ "suscripcion.estado": "inactivo" })));
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object;
        const customerId = sub.customer;
        // trialing = prueba gratis; past_due = Stripe sigue reintentando el cobro
        const estado = ["active", "trialing", "past_due"].includes(sub.status) ? "activo" : "inactivo";
        const snap = await db.collection("usuarios")
          .where("suscripcion.stripeCustomerId", "==", customerId).get();
        await Promise.all(snap.docs.map(doc => doc.ref.update({ "suscripcion.estado": estado })));
        break;
      }
    }

    res.json({ received: true });
  }
);

// ════════════════════════════════════════════════════════════
// 4. CONSULTAR ESTADO DE SUSCRIPCIÓN
// ════════════════════════════════════════════════════════════
exports.consultarSuscripcion = onCall({ region: "us-central1" }, async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Debes iniciar sesión.");

  const uid     = request.auth.uid;
  const userDoc = await db.collection("usuarios").doc(uid).get();
  const datos   = userDoc.data() || {};
  const sus     = datos.suscripcion || {};
  const hoy     = hoyColombia();
  const usoDoc  = await db.collection("usuarios").doc(uid).collection("uso").doc(hoy).get();
  const usados  = usoDoc.exists ? usoDoc.data().analisis : 0;

  return {
    plan:       sus.estado === "activo" ? "premium" : "gratis",
    estado:     sus.estado || "inactivo",
    usadosHoy:  usados,
    limiteHoy:  LIMITE_GRATIS,
    restantes:  sus.estado === "activo" ? null : Math.max(0, LIMITE_GRATIS - usados),
  };
});

// ════════════════════════════════════════════════════════════
// 5. CANCELAR SUSCRIPCIÓN
// ════════════════════════════════════════════════════════════
exports.cancelarSuscripcion = onCall(
  { secrets: [stripeSecretKey], region: "us-central1" },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Debes iniciar sesión.");

    const Stripe = require("stripe");
    const stripe = Stripe(stripeSecretKey.value());
    const uid    = request.auth.uid;

    const userDoc = await db.collection("usuarios").doc(uid).get();
    const subId   = userDoc.data()?.suscripcion?.stripeSubscriptionId;
    if (!subId) throw new HttpsError("not-found", "No se encontró suscripción activa.");

    // Cancelar al final del período (no de inmediato)
    await stripe.subscriptions.update(subId, { cancel_at_period_end: true });
    await db.collection("usuarios").doc(uid).update({
      "suscripcion.cancelando": true,
    });

    return { ok: true };
  }
);

// ── Helpers ──────────────────────────────────────────────────
// Fecha del día en Colombia (el límite diario se reinicia a medianoche local, no UTC)
function hoyColombia() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

// Verifica acceso y descuenta un análisis en una sola transacción
// (evita que varias peticiones simultáneas superen el límite)
async function reservarUso(uid) {
  const userRef = db.collection("usuarios").doc(uid);
  const usoRef  = userRef.collection("uso").doc(hoyColombia());

  return db.runTransaction(async (tx) => {
    const [userDoc, usoDoc] = await Promise.all([tx.get(userRef), tx.get(usoRef)]);
    if (userDoc.data()?.suscripcion?.estado === "activo") return { permitido: true, tipo: "premium" };

    const usados = usoDoc.exists ? usoDoc.data().analisis || 0 : 0;
    if (usados >= LIMITE_GRATIS) return { permitido: false, tipo: "limite" };

    tx.set(usoRef, { analisis: usados + 1 }, { merge: true });
    return { permitido: true, tipo: "gratis", restantes: LIMITE_GRATIS - usados - 1 };
  });
}

async function liberarUso(uid) {
  await db.collection("usuarios").doc(uid).collection("uso").doc(hoyColombia()).set(
    { analisis: admin.firestore.FieldValue.increment(-1) }, { merge: true }
  );
}

function construirPrompt(usuario) {
  const ETIQ_ENF = {
    diabetes:"Diabetes", hipertension:"Hipertensión", colesterol:"Colesterol alto",
    obesidad:"Obesidad", celiaquia:"Celiaquía", gastritis:"Gastritis",
    renal:"Enfermedad renal", cardiaca:"Cardiovascular", digestiva:"Digestivo",
  };
  const ETIQ_OBJ = {
    bajar:"bajar grasa", masa:"ganar masa muscular",
    tonificar:"tonificar", mantener:"mantener el peso",
  };
  const lineas = [];
  // Solo valores conocidos: el perfil viene del navegador y no debe colarse texto libre en el prompt
  if (ETIQ_ENF[usuario.enfermedad])
    lineas.push(`- Condición: ${ETIQ_ENF[usuario.enfermedad]}`);
  if (ETIQ_OBJ[usuario.objetivo])
    lineas.push(`- Objetivo: ${ETIQ_OBJ[usuario.objetivo]}`);
  if (usuario.condicion === "embarazo") {
    const trimestre = [1, 2, 3].includes(Number(usuario.trimestre)) ? Number(usuario.trimestre) : 1;
    lineas.push(`- Embarazada (trimestre ${trimestre})`);
  }
  const kcal = Math.round(Number(usuario.caloriasObjetivo));
  if (kcal >= 800 && kcal <= 6000)
    lineas.push(`- Meta calórica: ${kcal} kcal/día`);

  const perfil = lineas.length ? `\nPerfil del usuario:\n${lineas.join("\n")}\n` : "";

  return `Eres un nutricionista colombiano experto. Analiza esta foto del plato.${perfil}
Responde SOLO con JSON válido, sin texto adicional:
{
  "alimentos": ["alimento1", "alimento2"],
  "caloriasEstimadas": 450,
  "puntuacion": 7,
  "bienHecho": ["punto positivo 1"],
  "mejoras": ["mejora concreta 1", "mejora concreta 2"],
  "consejo": "Consejo personalizado corto y motivador."
}
- puntuacion: 1-10 según el perfil del usuario
- Si no hay comida visible: alimentos: ["No se detectó comida"]
- SOLO JSON`;
}

function parsearRespuesta(texto) {
  try {
    return JSON.parse(texto.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim());
  } catch {
    return { texto };
  }
}
