// ============================================================
// ANALIZAR PLATO — ViveSano
// Usa Google Gemini Vision (gratis, sin servidor)
// ============================================================

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_URL   = key =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

let imagenBase64     = null;
let mediaTypeImagen  = "image/jpeg";

// ─── API Key ─────────────────────────────────────────────────
function getApiKey()      { return localStorage.getItem("geminiApiKey") || ""; }
function guardarApiKey(k) { localStorage.setItem("geminiApiKey", k.trim()); }

// ─── Inicializar página ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  if (!getApiKey()) mostrarPanelApiKey();
  else              ocultarPanelApiKey();
});

function mostrarPanelApiKey() {
  document.getElementById("ap-panel-apikey").style.display = "block";
  document.getElementById("ap-capture-card").style.display = "none";
}

function ocultarPanelApiKey() {
  document.getElementById("ap-panel-apikey").style.display = "none";
  document.getElementById("ap-capture-card").style.display = "block";
}

function confirmarApiKey() {
  const inp = document.getElementById("ap-apikey-input");
  const key = inp.value.trim();
  if (!key.startsWith("AIza")) {
    inp.style.borderColor = "#e53935";
    document.getElementById("ap-apikey-msg").textContent = "La API key de Google comienza con 'AIza'.";
    return;
  }
  guardarApiKey(key);
  ocultarPanelApiKey();
  document.getElementById("ap-apikey-msg").textContent = "";
}

function cambiarApiKey() {
  localStorage.removeItem("geminiApiKey");
  document.getElementById("ap-apikey-input").value = "";
  mostrarPanelApiKey();
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

// ─── Llamar a Gemini Vision ───────────────────────────────────
async function analizarPlato() {
  if (!imagenBase64) return;
  const apiKey = getApiKey();
  if (!apiKey) { mostrarPanelApiKey(); return; }

  const btn = document.getElementById("ap-btn-analizar");
  btn.disabled = true;

  const wrap    = document.getElementById("ap-preview-wrap");
  const overlay = document.createElement("div");
  overlay.className = "ap-loading-overlay";
  overlay.innerHTML = `<div class="ap-spinner"></div><p>Analizando con IA…</p>`;
  wrap.appendChild(overlay);
  ocultarResultado();

  const usuario = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const prompt  = construirPrompt(usuario);

  try {
    const res = await fetch(GEMINI_URL(apiKey), {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: mediaTypeImagen, data: imagenBase64 } },
            { text: prompt },
          ],
        }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
      }),
    });

    overlay.remove();
    btn.disabled = false;

    if (!res.ok) {
      const err = await res.json();
      if (res.status === 400 || res.status === 403) {
        mostrarError("API key inválida o sin permisos. <a href='#' onclick='cambiarApiKey()'>Actualiza tu key</a>");
      } else {
        mostrarError(`Error ${res.status}: ${err?.error?.message || "Intenta de nuevo."}`);
      }
      return;
    }

    const data    = await res.json();
    const texto   = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const analisis = parsearRespuesta(texto);
    mostrarResultado(analisis);

  } catch (e) {
    overlay.remove();
    btn.disabled = false;
    mostrarError("Sin conexión o error de red. Revisa tu internet.");
  }
}

// ─── Construir prompt con perfil del usuario ─────────────────
function construirPrompt(usuario) {
  const ETIQ_ENF = {
    diabetes:"Diabetes", hipertension:"Hipertensión", colesterol:"Colesterol alto",
    obesidad:"Obesidad", celiaquia:"Celiaquía", tiroides:"Tiroides",
    renal:"Enfermedad renal", cardiaca:"Cardiovascular", digestiva:"Digestivo",
    gastritis:"Gastritis",
  };
  const ETIQ_OBJ = {
    bajar:"bajar grasa", masa:"ganar masa muscular",
    tonificar:"tonificar", mantener:"mantener el peso",
  };

  const lineas = [];
  if (usuario.enfermedad && usuario.enfermedad !== "ninguna")
    lineas.push(`- Condición médica: ${ETIQ_ENF[usuario.enfermedad] || usuario.enfermedad}`);
  if (usuario.objetivo)
    lineas.push(`- Objetivo: ${ETIQ_OBJ[usuario.objetivo] || usuario.objetivo}`);
  if (usuario.condicion === "embarazo")
    lineas.push(`- Embarazada (trimestre ${usuario.trimestre || 1})`);
  const kcal = parseInt(localStorage.getItem("caloriasObjetivo"));
  if (kcal) lineas.push(`- Meta calórica diaria: ${kcal} kcal`);

  const perfil = lineas.length
    ? `\n\nPerfil del usuario:\n${lineas.join("\n")}\n`
    : "";

  return `Eres un nutricionista colombiano experto en comida latina.
Analiza esta foto del plato de comida y responde SOLO con un JSON válido, sin texto adicional.${perfil}

Formato exacto del JSON:
{
  "alimentos": ["alimento1", "alimento2"],
  "caloriasEstimadas": 450,
  "puntuacion": 7,
  "bienHecho": ["punto positivo 1", "punto positivo 2"],
  "mejoras": ["qué reducir o quitar", "qué agregar"],
  "consejo": "Consejo corto y motivador personalizado para este usuario (máx 2 oraciones)."
}

Reglas:
- puntuacion del 1 al 10 considerando el perfil del usuario
- mejoras: máximo 3, concretos y accionables
- Si no hay comida visible escribe alimentos: ["No se detectó comida"]
- SOLO JSON, nada más`;
}

// ─── Parsear respuesta de Gemini ─────────────────────────────
function parsearRespuesta(texto) {
  try {
    const limpio = texto.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
    return JSON.parse(limpio);
  } catch {
    return { texto }; // fallback texto plano
  }
}

// ─── Mostrar resultado ───────────────────────────────────────
function mostrarResultado(analisis) {
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
    <div class="ap-section" style="text-align:right">
      <button onclick="cambiarApiKey()" style="background:none;border:none;
        font-size:11px;color:#bbb;cursor:pointer;font-family:inherit">⚙️ Cambiar API key</button>
    </div>`;

  cont.style.display = "block";
  setTimeout(() => cont.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
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
