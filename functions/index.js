const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret }  = require("firebase-functions/params");
const admin             = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ── Secrets (guardar con: firebase functions:secrets:set NOMBRE) ──
const geminiKey        = defineSecret("GEMINI_API_KEY");
const stripeSecretKey  = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSec = defineSecret("STRIPE_WEBHOOK_SECRET");

// ── Constantes ───────────────────────────────────────────────
const GEMINI_MODEL  = "gemini-1.5-flash";
const GEMINI_URL    = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const LIMITE_GRATIS = 3;  // análisis gratis por día
const APP_URL       = "https://nury2015.github.io/ViveSano";

// ════════════════════════════════════════════════════════════
// 1. ANALIZAR PLATO (verifica acceso + llama Gemini)
// ════════════════════════════════════════════════════════════
exports.analizarPlatoIA = onCall(
  { secrets: [geminiKey], region: "us-central1" },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Debes iniciar sesión para usar esta función.");

    const uid = request.auth.uid;
    const { imagenBase64, mediaType = "image/jpeg", perfilUsuario = {} } = request.data;
    if (!imagenBase64) throw new HttpsError("invalid-argument", "Se requiere una imagen.");

    // ── Verificar acceso (premium o cuota gratuita) ─────────
    const acceso = await verificarAcceso(uid);
    if (!acceso.permitido) {
      throw new HttpsError("resource-exhausted", JSON.stringify({
        tipo: "limite_alcanzado",
        usados: LIMITE_GRATIS,
        limite: LIMITE_GRATIS,
      }));
    }

    // ── Llamar a Gemini ────────────────────────────────────
    const prompt = construirPrompt(perfilUsuario);
    const res = await fetch(`${GEMINI_URL}?key=${geminiKey.value()}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [
          { inlineData: { mimeType: mediaType, data: imagenBase64 } },
          { text: prompt },
        ]}],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new HttpsError("internal", `Error Gemini: ${err?.error?.message}`);
    }

    const data  = await res.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const analisis = parsearRespuesta(texto);

    // ── Registrar uso ──────────────────────────────────────
    await registrarUso(uid);

    return {
      ok:       true,
      analisis,
      acceso:   acceso.tipo,
      restantes: acceso.tipo === "gratis" ? acceso.restantes - 1 : null,
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
        price:    request.data.priceId, // ID del precio en Stripe
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
        snap.forEach(doc => doc.ref.update({ "suscripcion.estado": "inactivo" }));
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object;
        const customerId = sub.customer;
        const estado = sub.status === "active" ? "activo" : "inactivo";
        const snap = await db.collection("usuarios")
          .where("suscripcion.stripeCustomerId", "==", customerId).get();
        snap.forEach(doc => doc.ref.update({ "suscripcion.estado": estado }));
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
  const hoy     = new Date().toISOString().slice(0, 10);
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
async function verificarAcceso(uid) {
  const userDoc = await db.collection("usuarios").doc(uid).get();
  const sus = userDoc.data()?.suscripcion || {};

  if (sus.estado === "activo") return { permitido: true, tipo: "premium" };

  const hoy    = new Date().toISOString().slice(0, 10);
  const usoDoc = await db.collection("usuarios").doc(uid).collection("uso").doc(hoy).get();
  const usados = usoDoc.exists ? usoDoc.data().analisis : 0;

  if (usados < LIMITE_GRATIS) {
    return { permitido: true, tipo: "gratis", restantes: LIMITE_GRATIS - usados };
  }
  return { permitido: false, tipo: "limite" };
}

async function registrarUso(uid) {
  const hoy = new Date().toISOString().slice(0, 10);
  await db.collection("usuarios").doc(uid).collection("uso").doc(hoy).set(
    { analisis: admin.firestore.FieldValue.increment(1) }, { merge: true }
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
  if (usuario.enfermedad && usuario.enfermedad !== "ninguna")
    lineas.push(`- Condición: ${ETIQ_ENF[usuario.enfermedad] || usuario.enfermedad}`);
  if (usuario.objetivo)
    lineas.push(`- Objetivo: ${ETIQ_OBJ[usuario.objetivo] || usuario.objetivo}`);
  if (usuario.condicion === "embarazo")
    lineas.push(`- Embarazada (trimestre ${usuario.trimestre || 1})`);
  if (usuario.caloriasObjetivo)
    lineas.push(`- Meta calórica: ${usuario.caloriasObjetivo} kcal/día`);

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
