// ============================================================
// ANALIZAR PLATO — ViveSano
// Versión actual: Gemini directo (sin servidor)
// Versión futura: Firebase Functions + Stripe (ver functions/index.js)
// ============================================================

const _GK          = "AIzaSyBqlHh_328DD4y5P8EIZctueRXJ6szYOog";
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${_GK}`;

let imagenBase64    = null;
let mediaTypeImagen = "image/jpeg";
let _cooldownHasta  = 0; // timestamp unix: cuando se puede volver a analizar

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ap-estado-uso").innerHTML = "";
  document.getElementById("ap-capture-card").style.display = "block";
});

// ─── Selección de imagen ─────────────────────────────────────
function abrirCamara()  { document.getElementById("ap-input-camara").click(); }
function abrirGaleria() { document.getElementById("ap-input-galeria").click(); }

function onImagenSeleccionada(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;
  mediaTypeImagen = archivo.type || "image/jpeg";
  comprimirImagen(archivo, (b64, dataUrl) => {
    imagenBase64 = b64;
    document.getElementById("ap-preview-wrap").innerHTML =
      `<img src="${dataUrl}" alt="Foto del plato">`;
    document.getElementById("ap-btn-analizar").disabled = false;
    ocultarResultado();
  });
}

function comprimirImagen(archivo, cb) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.80);
      mediaTypeImagen = "image/jpeg"; // siempre JPEG tras comprimir
      cb(dataUrl.split(",")[1], dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(archivo);
}

// ─── Analizar ─────────────────────────────────────────────────
async function analizarPlato() {
  if (!imagenBase64) return;

  // Verificar cooldown por rate limiting
  if (Date.now() < _cooldownHasta) {
    const segs = Math.ceil((_cooldownHasta - Date.now()) / 1000);
    mostrarError(`⏳ Muchas solicitudes seguidas. Espera ${segs} segundo${segs !== 1 ? "s" : ""} e intenta de nuevo.`);
    return;
  }

  const btn     = document.getElementById("ap-btn-analizar");
  btn.disabled  = true;
  const wrap    = document.getElementById("ap-preview-wrap");
  const overlay = document.createElement("div");
  overlay.className = "ap-loading-overlay";
  overlay.innerHTML = `<div class="ap-spinner"></div><p>Analizando con IA…</p>`;
  wrap.appendChild(overlay);
  ocultarResultado();

  const usuario = JSON.parse(localStorage.getItem("datosUsuario") || "{}");

  try {
    const res = await fetch(GEMINI_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [
          { inlineData: { mimeType: mediaTypeImagen, data: imagenBase64 } },
          { text: construirPrompt(usuario) },
        ]}],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
      }),
    });

    overlay.remove();
    btn.disabled = false;

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status === 429) {
        // Rate limit: aplicar cooldown de 40 segundos y mostrar cuenta regresiva
        _cooldownHasta = Date.now() + 40000;
        mostrarErrorConCuentaRegresiva(40);
      } else {
        const msg = res.status === 403
          ? "🔑 API key sin permisos. Revisa la configuración en Google Cloud."
          : `❌ Error ${res.status}: ${err?.error?.message || "Intenta de nuevo."}`;
        mostrarError(msg);
      }
      return;
    }

    const data    = await res.json();
    const texto   = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    mostrarResultado(parsearRespuesta(texto));

  } catch (e) {
    overlay.remove();
    btn.disabled = false;
    mostrarError("Sin conexión. Verifica tu internet.");
  }
}

// ─── Prompt ──────────────────────────────────────────────────
function construirPrompt(u) {
  const ENF = { diabetes:"Diabetes", hipertension:"Hipertensión", colesterol:"Colesterol alto",
    obesidad:"Obesidad", celiaquia:"Celiaquía", gastritis:"Gastritis",
    renal:"Enfermedad renal", cardiaca:"Cardiovascular", digestiva:"Digestivo" };
  const OBJ = { bajar:"bajar grasa", masa:"ganar masa muscular",
    tonificar:"tonificar", mantener:"mantener el peso" };
  const l = [];
  if (u.enfermedad && u.enfermedad !== "ninguna") l.push(`- Condición: ${ENF[u.enfermedad] || u.enfermedad}`);
  if (u.objetivo) l.push(`- Objetivo: ${OBJ[u.objetivo] || u.objetivo}`);
  if (u.condicion === "embarazo") l.push(`- Embarazada (T${u.trimestre || 1})`);
  const kcal = parseInt(localStorage.getItem("caloriasObjetivo"));
  if (kcal) l.push(`- Meta: ${kcal} kcal/día`);
  const perfil = l.length ? `\nPerfil:\n${l.join("\n")}\n` : "";
  return `Eres nutricionista colombiano. Analiza esta foto del plato.${perfil}
Responde SOLO JSON válido:
{"alimentos":["item1"],"caloriasEstimadas":450,"puntuacion":7,"bienHecho":["punto1"],"mejoras":["mejora1"],"consejo":"Consejo corto."}
- puntuacion 1-10 según perfil · SOLO JSON`;
}

function parsearRespuesta(texto) {
  try { return JSON.parse(texto.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim()); }
  catch { return { texto }; }
}

// ─── Mostrar resultado ────────────────────────────────────────
function mostrarResultado(a) {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;
  if (a.texto) {
    cont.innerHTML = `<div class="ap-section"><p style="font-size:14px;line-height:1.6">${a.texto}</p></div>`;
    cont.style.display = "block";
    cont.scrollIntoView({ behavior:"smooth", block:"start" });
    return;
  }
  const { alimentos=[], caloriasEstimadas=0, puntuacion=5, bienHecho=[], mejoras=[], consejo="" } = a;
  const sc = puntuacion >= 8 ? "alto" : puntuacion >= 5 ? "medio" : "bajo";
  cont.innerHTML = `
    <div class="ap-resultado-header">
      <h3>🔬 Análisis de tu plato</h3>
      <div class="ap-score ${sc}">
        <span class="ap-score-num">${puntuacion}/10</span>
        <span class="ap-score-lbl">Nutrición</span>
      </div>
    </div>
    <div class="ap-section">
      <p class="ap-section-title">🍽️ Alimentos detectados</p>
      <div class="ap-alimentos">${alimentos.map(x=>`<span class="ap-alimento-chip">${x}</span>`).join("")}</div>
    </div>
    <div class="ap-section">
      <p class="ap-section-title">🔥 Calorías estimadas</p>
      <p class="ap-calorias">${caloriasEstimadas}<span> kcal en este plato</span></p>
    </div>
    ${bienHecho.length?`<div class="ap-section"><p class="ap-section-title">Lo que está bien ✅</p>
      <ul class="ap-lista bien">${bienHecho.map(b=>`<li>${b}</li>`).join("")}</ul></div>`:""}
    ${mejoras.length?`<div class="ap-section"><p class="ap-section-title">Lo que puedes mejorar ⚠️</p>
      <ul class="ap-lista cambiar">${mejoras.map(m=>`<li>${m}</li>`).join("")}</ul></div>`:""}
    ${consejo?`<div class="ap-section"><p class="ap-section-title">💡 Consejo personalizado</p>
      <p class="ap-consejo">${consejo}</p></div>`:""}`;
  cont.style.display = "block";
  setTimeout(() => cont.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
}

function ocultarResultado() {
  const c = document.getElementById("ap-resultado");
  if (c) { c.style.display = "none"; c.innerHTML = ""; }
}

function mostrarError(msg) {
  const c = document.getElementById("ap-resultado");
  if (!c) return;
  c.innerHTML = `
    <div class="ap-section" style="padding:16px;text-align:center">
      <p style="color:#e53935;font-size:14px;line-height:1.6;margin:0 0 12px">${msg}</p>
      <button onclick="ocultarResultado()" style="background:#f5f5f5;border:none;padding:8px 18px;border-radius:10px;font-size:13px;cursor:pointer">Cerrar</button>
    </div>`;
  c.style.display = "block";
}

let _countdownInterval = null;
function mostrarErrorConCuentaRegresiva(segs) {
  clearInterval(_countdownInterval);
  const c = document.getElementById("ap-resultado");
  if (!c) return;
  let restante = segs;

  function render() {
    c.innerHTML = `
      <div class="ap-section" style="padding:20px;text-align:center">
        <p style="font-size:28px;margin:0 0 8px">⏳</p>
        <p style="font-weight:700;font-size:15px;color:#1a2e1a;margin:0 0 6px">Demasiadas solicitudes</p>
        <p style="color:#666;font-size:13px;line-height:1.6;margin:0 0 16px">
          La API de IA tiene un límite de peticiones.<br>
          Puedes volver a intentarlo en <strong id="ap-countdown">${restante}</strong> segundo${restante !== 1 ? "s" : ""}.
        </p>
        <div style="height:6px;background:#eee;border-radius:3px;overflow:hidden">
          <div id="ap-countdown-bar" style="height:100%;background:#2e7d32;border-radius:3px;transition:width 1s linear;width:${(restante/segs)*100}%"></div>
        </div>
      </div>`;
    c.style.display = "block";
  }

  render();
  _countdownInterval = setInterval(() => {
    restante--;
    const numEl = document.getElementById("ap-countdown");
    const barEl = document.getElementById("ap-countdown-bar");
    if (numEl) numEl.textContent = restante;
    if (barEl) barEl.style.width = `${(restante / segs) * 100}%`;
    if (restante <= 0) {
      clearInterval(_countdownInterval);
      ocultarResultado();
      const btn = document.getElementById("ap-btn-analizar");
      if (btn) { btn.disabled = false; btn.textContent = "🔍 Analizar plato"; }
    }
  }, 1000);
}
