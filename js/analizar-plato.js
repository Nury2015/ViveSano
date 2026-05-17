// ============================================================
// ANALIZAR PLATO — ViveSano
// Toma/sube foto del plato → Claude AI identifica y recomienda
// ============================================================

let imagenSeleccionada = null; // base64 sin prefijo
let mediaTypeSeleccionada = "image/jpeg";

// ─── Seleccionar imagen (cámara o galería) ───────────────────
function abrirCamara()  { document.getElementById("ap-input-camara").click(); }
function abrirGaleria() { document.getElementById("ap-input-galeria").click(); }

function onImagenSeleccionada(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;
  mediaTypeSeleccionada = archivo.type || "image/jpeg";
  comprimirImagen(archivo, (base64, dataUrl) => {
    imagenSeleccionada = base64;
    mostrarPreview(dataUrl);
    document.getElementById("ap-btn-analizar").disabled = false;
    ocultarResultado();
  });
}

// ─── Comprimir imagen con Canvas (máx 800px, 80% calidad) ────
function comprimirImagen(archivo, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
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
      const base64  = dataUrl.split(",")[1];
      callback(base64, dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(archivo);
}

// ─── Mostrar preview ─────────────────────────────────────────
function mostrarPreview(dataUrl) {
  const wrap = document.getElementById("ap-preview-wrap");
  wrap.innerHTML = `<img src="${dataUrl}" alt="Foto del plato">`;
}

// ─── Enviar a Firebase Function → Claude API ─────────────────
async function analizarPlato() {
  if (!imagenSeleccionada) return;

  const btn = document.getElementById("ap-btn-analizar");
  btn.disabled = true;

  // Mostrar overlay de carga
  const wrap = document.getElementById("ap-preview-wrap");
  const overlay = document.createElement("div");
  overlay.className = "ap-loading-overlay";
  overlay.innerHTML = `<div class="ap-spinner"></div><p>Analizando tu plato con IA…</p>`;
  wrap.appendChild(overlay);
  ocultarResultado();

  // Leer perfil del usuario
  const usuario = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const perfilUsuario = {
    enfermedad:       usuario.enfermedad,
    objetivo:         usuario.objetivo,
    condicion:        usuario.condicion,
    trimestre:        usuario.trimestre,
    caloriasObjetivo: parseInt(localStorage.getItem("caloriasObjetivo")) || null,
  };

  try {
    // Llamar a la Firebase Callable Function
    const fn = firebase.functions().httpsCallable("analizarPlato");
    const res = await fn({
      imagenBase64: imagenSeleccionada,
      mediaType:    mediaTypeSeleccionada,
      perfilUsuario,
    });

    overlay.remove();
    btn.disabled = false;

    if (res.data?.ok) {
      mostrarResultado(res.data.analisis);
    } else {
      mostrarError("No se pudo analizar la imagen. Intenta de nuevo.");
    }
  } catch (err) {
    overlay.remove();
    btn.disabled = false;
    console.error("Error analizarPlato:", err);
    if (err.code === "functions/not-found" || err.code === "functions/unimplemented") {
      mostrarBannerSetup();
    } else {
      mostrarError(err.message || "Error al conectar con el servidor.");
    }
  }
}

// ─── Renderizar resultado ────────────────────────────────────
function mostrarResultado(analisis) {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;

  // Si llegó texto plano (fallback)
  if (analisis.texto) {
    cont.innerHTML = `<div class="ap-section"><p style="font-size:14px;line-height:1.6">${analisis.texto}</p></div>`;
    cont.style.display = "block";
    cont.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const { alimentos = [], caloriasEstimadas = 0, puntuacion = 5,
          bienHecho = [], mejoras = [], consejo = "" } = analisis;

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
        ${alimentos.map(a => `<span class="ap-alimento-chip">${a}</span>`).join("")}
      </div>
    </div>

    <div class="ap-section">
      <p class="ap-section-title">🔥 Calorías estimadas</p>
      <p class="ap-calorias">${caloriasEstimadas} <span>kcal en este plato</span></p>
    </div>

    ${bienHecho.length ? `
    <div class="ap-section">
      <p class="ap-section-title">Lo que está bien ✅</p>
      <ul class="ap-lista bien">
        ${bienHecho.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </div>` : ""}

    ${mejoras.length ? `
    <div class="ap-section">
      <p class="ap-section-title">Lo que puedes mejorar ⚠️</p>
      <ul class="ap-lista cambiar">
        ${mejoras.map(m => `<li>${m}</li>`).join("")}
      </ul>
    </div>` : ""}

    ${consejo ? `
    <div class="ap-section">
      <p class="ap-section-title">💡 Consejo personalizado</p>
      <p class="ap-consejo">${consejo}</p>
    </div>` : ""}`;

  cont.style.display = "block";
  setTimeout(() => cont.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
}

function ocultarResultado() {
  const cont = document.getElementById("ap-resultado");
  if (cont) { cont.style.display = "none"; cont.innerHTML = ""; }
  const banner = document.getElementById("ap-setup-banner");
  if (banner) banner.style.display = "none";
}

function mostrarError(msg) {
  const cont = document.getElementById("ap-resultado");
  if (!cont) return;
  cont.innerHTML = `<div class="ap-section" style="color:#e53935;font-size:14px">⚠️ ${msg}</div>`;
  cont.style.display = "block";
}

function mostrarBannerSetup() {
  const banner = document.getElementById("ap-setup-banner");
  if (banner) banner.style.display = "block";
}
