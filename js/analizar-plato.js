// ============================================================
// ANALIZAR PLATO — ViveSano
// Llama a Firebase Function que verifica pago y usa Gemini
// ============================================================

let imagenBase64    = null;
let mediaTypeImagen = "image/jpeg";

// ─── Inicializar ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await cargarEstadoSuscripcion();
});

async function cargarEstadoSuscripcion() {
  // Si no está logueado, mostrar mensaje de login
  if (!auth.currentUser) {
    auth.onAuthStateChanged(async (user) => {
      if (user) await cargarEstadoSuscripcion();
      else mostrarBannerLogin();
    });
    return;
  }

  try {
    const fn   = firebase.functions().httpsCallable("consultarSuscripcion");
    const res  = await fn();
    const data = res.data;
    renderEstado(data);
  } catch {
    renderEstado({ plan: "gratis", restantes: 3, usadosHoy: 0 });
  }
}

function renderEstado(data) {
  const el = document.getElementById("ap-estado-uso");
  if (!el) return;

  if (data.plan === "premium") {
    el.innerHTML = `<div class="ap-badge-premium">⭐ Premium — análisis ilimitados</div>`;
  } else {
    const r = data.restantes ?? (3 - (data.usadosHoy || 0));
    const color = r > 1 ? "#2e7d32" : r === 1 ? "#f57c00" : "#e53935";
    el.innerHTML = `
      <div class="ap-uso-bar">
        <span style="color:${color};font-weight:700">${r} análisis gratuito${r !== 1 ? "s" : ""} restante${r !== 1 ? "s" : ""} hoy</span>
        <div class="ap-uso-puntos">
          ${[0,1,2].map(i => `<span class="ap-punto ${i < (3 - r) ? "usado" : ""}"></span>`).join("")}
        </div>
        ${r === 0 ? `<a href="suscripcion.html" class="ap-link-premium">✨ Hazte Premium para análisis ilimitados</a>` : ""}
      </div>`;
  }
}

function mostrarBannerLogin() {
  const el = document.getElementById("ap-estado-uso");
  if (el) el.innerHTML = `<div class="ap-badge-login">
    <a href="recetas.html" style="color:#2e7d32;font-weight:700">Inicia sesión</a> para analizar tu plato
  </div>`;
}

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
      cb(dataUrl.split(",")[1], dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(archivo);
}

// ─── Analizar (llama Firebase Function) ──────────────────────
async function analizarPlato() {
  if (!imagenBase64) return;

  if (!auth.currentUser) {
    mostrarError('Debes <a href="recetas.html" style="color:#2e7d32;font-weight:700">iniciar sesión</a> para analizar tu plato.');
    return;
  }

  const btn = document.getElementById("ap-btn-analizar");
  btn.disabled = true;
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
    const fn  = firebase.functions().httpsCallable("analizarPlatoIA");
    const res = await fn({ imagenBase64, mediaType: mediaTypeImagen, perfilUsuario });

    overlay.remove();
    btn.disabled = false;

    if (res.data?.ok) {
      mostrarResultado(res.data.analisis, res.data.restantes);
      await cargarEstadoSuscripcion(); // actualizar contador
    }
  } catch (err) {
    overlay.remove();
    btn.disabled = false;

    // Límite gratuito alcanzado
    try {
      const detalle = JSON.parse(err.message);
      if (detalle.tipo === "limite_alcanzado") {
        mostrarLimiteMensaje();
        return;
      }
    } catch {}

    mostrarError(err.message || "Error al analizar. Intenta de nuevo.");
  }
}

// ─── Mostrar resultado ────────────────────────────────────────
function mostrarResultado(analisis, restantes) {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;

  if (analisis.texto) {
    cont.innerHTML = `<div class="ap-section"><p style="font-size:14px;line-height:1.6">${analisis.texto}</p></div>`;
    cont.style.display = "block";
    cont.scrollIntoView({ behavior:"smooth", block:"start" });
    return;
  }

  const { alimentos=[], caloriasEstimadas=0, puntuacion=5,
          bienHecho=[], mejoras=[], consejo="" } = analisis;
  const scoreClass = puntuacion >= 8 ? "alto" : puntuacion >= 5 ? "medio" : "bajo";

  cont.innerHTML = `
    <div class="ap-resultado-header">
      <h3>🔬 Análisis de tu plato</h3>
      <div class="ap-score ${scoreClass}">
        <span class="ap-score-num">${puntuacion}/10</span>
        <span class="ap-score-lbl">Nutrición</span>
      </div>
    </div>
    <div class="ap-section">
      <p class="ap-section-title">🍽️ Alimentos detectados</p>
      <div class="ap-alimentos">
        ${alimentos.map(a=>`<span class="ap-alimento-chip">${a}</span>`).join("")}
      </div>
    </div>
    <div class="ap-section">
      <p class="ap-section-title">🔥 Calorías estimadas</p>
      <p class="ap-calorias">${caloriasEstimadas}<span> kcal en este plato</span></p>
    </div>
    ${bienHecho.length ? `
    <div class="ap-section">
      <p class="ap-section-title">Lo que está bien ✅</p>
      <ul class="ap-lista bien">${bienHecho.map(b=>`<li>${b}</li>`).join("")}</ul>
    </div>` : ""}
    ${mejoras.length ? `
    <div class="ap-section">
      <p class="ap-section-title">Lo que puedes mejorar ⚠️</p>
      <ul class="ap-lista cambiar">${mejoras.map(m=>`<li>${m}</li>`).join("")}</ul>
    </div>` : ""}
    ${consejo ? `
    <div class="ap-section">
      <p class="ap-section-title">💡 Consejo personalizado</p>
      <p class="ap-consejo">${consejo}</p>
    </div>` : ""}
    ${restantes !== null && restantes === 0 ? `
    <div class="ap-section" style="text-align:center">
      <p style="font-size:13px;color:#888;margin:0 0 8px">Usaste todos tus análisis gratuitos de hoy.</p>
      <a href="suscripcion.html" class="ap-btn-premium-inline">✨ Hazte Premium — análisis ilimitados</a>
    </div>` : ""}`;

  cont.style.display = "block";
  setTimeout(() => cont.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
}

function mostrarLimiteMensaje() {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;
  cont.innerHTML = `
    <div class="ap-section" style="text-align:center;padding:24px">
      <div style="font-size:36px;margin-bottom:10px">🔒</div>
      <h3 style="margin:0 0 6px;color:#1b5233">Límite diario alcanzado</h3>
      <p style="font-size:13px;color:#666;margin:0 0 16px;line-height:1.6">
        Usaste tus 3 análisis gratuitos de hoy.<br>
        Vuelve mañana o hazte Premium para análisis ilimitados.
      </p>
      <a href="suscripcion.html" class="ap-btn-premium-inline">✨ Ver planes Premium</a>
    </div>`;
  cont.style.display = "block";
  cont.scrollIntoView({ behavior:"smooth", block:"start" });
}

function ocultarResultado() {
  const cont = document.getElementById("ap-resultado");
  if (cont) { cont.style.display = "none"; cont.innerHTML = ""; }
}

function mostrarError(msg) {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;
  cont.innerHTML = `<div class="ap-section" style="color:#e53935;font-size:13px;line-height:1.6">⚠️ ${msg}</div>`;
  cont.style.display = "block";
}
