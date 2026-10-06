// ============================================================
// ANALIZAR PLATO — ViveSano
// La foto se envía a la Cloud Function `analizarPlatoIA` (functions/index.js),
// que guarda la clave de Gemini en el servidor y controla la cuota diaria.
// ============================================================

let imagenBase64    = null;
let mediaTypeImagen = "image/jpeg";
let _cooldownHasta  = 0; // timestamp unix: cuando se puede volver a analizar

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ap-capture-card").style.display = "block";
  auth.onAuthStateChanged(user => user ? cargarEstadoUso() : mostrarEstadoSinSesion());
});

// ─── Utilidades ──────────────────────────────────────────────
// El texto de la IA se escapa antes de insertarlo en la página
function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

// ─── Estado de uso (gratis / premium / sin sesión) ───────────
function mostrarEstadoSinSesion() {
  document.getElementById("ap-estado-uso").innerHTML = `
    <div class="ap-badge-login">
      🔒 Inicia sesión para analizar tus platos (3 análisis gratis al día).
      <a href="recetas.html" style="color:#2e7d32;font-weight:700">Iniciar sesión</a>
    </div>`;
}

async function cargarEstadoUso() {
  try {
    const res = await firebase.functions().httpsCallable("consultarSuscripcion")();
    pintarEstadoUso(res.data.plan === "premium" ? null : res.data.restantes);
  } catch (e) {
    document.getElementById("ap-estado-uso").innerHTML = "";
  }
}

// restantes = null → premium
function pintarEstadoUso(restantes) {
  const el = document.getElementById("ap-estado-uso");
  if (restantes === null) {
    el.innerHTML = `<div class="ap-badge-premium">⭐ Premium · análisis ilimitados</div>`;
    return;
  }
  const puntos = [0, 1, 2].map(i => `<span class="ap-punto${i < 3 - restantes ? " usado" : ""}"></span>`).join("");
  el.innerHTML = `
    <div class="ap-uso-bar">
      <span>Te quedan <strong>${restantes}</strong> análisis gratis hoy</span>
      <div class="ap-uso-puntos">${puntos}</div>
    </div>`;
}

// ─── Selección de imagen ─────────────────────────────────────
function abrirCamara()  { document.getElementById("ap-input-camara").click(); }
function abrirGaleria() { document.getElementById("ap-input-galeria").click(); }

function onImagenSeleccionada(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;
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
    img.onerror = () => mostrarError("No se pudo leer la imagen. Prueba con otra foto.");
    img.src = e.target.result;
  };
  reader.readAsDataURL(archivo);
}

// ─── Analizar ─────────────────────────────────────────────────
async function analizarPlato() {
  if (!imagenBase64) return;

  if (!auth.currentUser) {
    mostrarError(`🔒 Necesitas iniciar sesión para analizar tu plato.<br>
      <a href="recetas.html" style="color:#2e7d32;font-weight:700">Iniciar sesión</a>`);
    return;
  }

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
  const perfilUsuario = {
    enfermedad:       usuario.enfermedad,
    objetivo:         usuario.objetivo,
    condicion:        usuario.condicion,
    trimestre:        usuario.trimestre,
    caloriasObjetivo: parseInt(localStorage.getItem("caloriasObjetivo")) || null,
  };

  try {
    const fn  = firebase.functions().httpsCallable("analizarPlatoIA", { timeout: 70000 });
    const res = await fn({ imagenBase64, mediaType: mediaTypeImagen, perfilUsuario });
    mostrarResultado(res.data.analisis);
    pintarEstadoUso(res.data.acceso === "premium" ? null : res.data.restantes);
  } catch (e) {
    manejarErrorAnalisis(e);
  } finally {
    overlay.remove();
    btn.disabled = false;
  }
}

function manejarErrorAnalisis(e) {
  const code = (e.code || "").replace("functions/", "");
  if (code === "resource-exhausted") {
    pintarEstadoUso(0);
    mostrarError(`Ya usaste tus 3 análisis gratis de hoy. Vuelve mañana o pásate a Premium.<br><br>
      <a href="suscripcion.html" class="ap-link-premium">⭐ Ver Premium</a>`);
  } else if (code === "unavailable") {
    _cooldownHasta = Date.now() + 40000;
    mostrarErrorConCuentaRegresiva(40);
  } else if (code === "unauthenticated") {
    mostrarError(`🔒 Tu sesión expiró. <a href="recetas.html" style="color:#2e7d32;font-weight:700">Inicia sesión</a> de nuevo.`);
  } else if (code === "invalid-argument") {
    mostrarError(esc(e.message || "La imagen no es válida. Prueba con otra foto."));
  } else {
    console.error("analizarPlatoIA:", e);
    mostrarError("❌ No se pudo analizar la imagen. Revisa tu conexión e intenta de nuevo.");
  }
}

// ─── Mostrar resultado ────────────────────────────────────────
function mostrarResultado(a) {
  const cont = document.getElementById("ap-resultado");
  if (!cont || !a) return;
  if (a.texto) {
    cont.innerHTML = `<div class="ap-section"><p style="font-size:14px;line-height:1.6">${esc(a.texto)}</p></div>`;
    cont.style.display = "block";
    cont.scrollIntoView({ behavior:"smooth", block:"start" });
    return;
  }
  const lista = v => Array.isArray(v) ? v : [];
  const alimentos  = lista(a.alimentos);
  const bienHecho  = lista(a.bienHecho);
  const mejoras    = lista(a.mejoras);
  const calorias   = Math.round(Number(a.caloriasEstimadas)) || 0;
  const puntuacion = Math.min(10, Math.max(1, Math.round(Number(a.puntuacion)) || 5));
  const consejo    = a.consejo || "";
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
      <div class="ap-alimentos">${alimentos.map(x=>`<span class="ap-alimento-chip">${esc(x)}</span>`).join("")}</div>
    </div>
    <div class="ap-section">
      <p class="ap-section-title">🔥 Calorías estimadas</p>
      <p class="ap-calorias">${calorias}<span> kcal en este plato</span></p>
    </div>
    ${bienHecho.length?`<div class="ap-section"><p class="ap-section-title">Lo que está bien ✅</p>
      <ul class="ap-lista bien">${bienHecho.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></div>`:""}
    ${mejoras.length?`<div class="ap-section"><p class="ap-section-title">Lo que puedes mejorar ⚠️</p>
      <ul class="ap-lista cambiar">${mejoras.map(m=>`<li>${esc(m)}</li>`).join("")}</ul></div>`:""}
    ${consejo?`<div class="ap-section"><p class="ap-section-title">💡 Consejo personalizado</p>
      <p class="ap-consejo">${esc(consejo)}</p></div>`:""}`;
  cont.style.display = "block";
  setTimeout(() => cont.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
}

function ocultarResultado() {
  const c = document.getElementById("ap-resultado");
  if (c) { c.style.display = "none"; c.innerHTML = ""; }
}

// msg puede contener HTML propio (enlaces); el texto externo se escapa antes de pasarlo
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

  c.innerHTML = `
    <div class="ap-section" style="padding:20px;text-align:center">
      <p style="font-size:28px;margin:0 0 8px">⏳</p>
      <p style="font-weight:700;font-size:15px;color:#1a2e1a;margin:0 0 6px">La IA está ocupada</p>
      <p style="color:#666;font-size:13px;line-height:1.6;margin:0 0 16px">
        Hay muchas solicitudes en este momento.<br>
        Puedes volver a intentarlo en <strong id="ap-countdown">${restante}</strong> segundos.
      </p>
      <div style="height:6px;background:#eee;border-radius:3px;overflow:hidden">
        <div id="ap-countdown-bar" style="height:100%;background:#2e7d32;border-radius:3px;transition:width 1s linear;width:100%"></div>
      </div>
    </div>`;
  c.style.display = "block";

  _countdownInterval = setInterval(() => {
    restante--;
    const numEl = document.getElementById("ap-countdown");
    const barEl = document.getElementById("ap-countdown-bar");
    if (numEl) numEl.textContent = restante;
    if (barEl) barEl.style.width = `${(restante / segs) * 100}%`;
    if (restante <= 0) {
      clearInterval(_countdownInterval);
      ocultarResultado();
    }
  }, 1000);
}
