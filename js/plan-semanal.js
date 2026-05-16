// ============================================================
// PLAN SEMANAL — ViveSano
// Genera 7 días × 3 comidas adaptado al perfil del usuario
// ============================================================

const DIAS_SEMANA = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const TIPOS_PLAN  = [
  { id: "desayuno", label: "Desayuno", emoji: "🌅" },
  { id: "almuerzo", label: "Almuerzo", emoji: "☀️"  },
  { id: "cena",     label: "Cena",     emoji: "🌙"  },
];

let planActual   = null;
let veganoActivo = false;

// ─── Utilidad: mezcla aleatoria ──────────────────────────────
function _shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Filtrar y priorizar recetas según perfil ─────────────────
function _filtrarRecetas(tipo) {
  const usuario    = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const enfermedad = usuario.enfermedad || "ninguna";
  const condicion  = usuario.condicion  || "";
  const objetivo   = usuario.objetivo   || "mantener";
  const trimestre  = usuario.trimestre  || "1";

  let r = [...(RECETAS[tipo] || [])];

  if (veganoActivo)          r = r.filter(x => x.vegano);
  if (enfermedad !== "ninguna") r = r.filter(x => !x.contraindicada?.includes(enfermedad));
  if (condicion === "embarazo") r = r.filter(x => !x.contraindicada?.includes("embarazo"));

  // Ordenar por prioridad según objetivo
  if (condicion === "embarazo" && typeof _scoreEmbarazo === "function") {
    r.sort((a, b) => _scoreEmbarazo(b, trimestre) - _scoreEmbarazo(a, trimestre));
  } else if (objetivo === "masa") {
    r.sort((a, b) => (b.proteinas || 0) - (a.proteinas || 0));
  } else if (objetivo === "bajar") {
    r.sort((a, b) => (a.calorias || 0) - (b.calorias || 0));
  }

  // Mezclar para variedad (preservando las más prioritarias arriba en partes)
  const top  = r.slice(0, Math.ceil(r.length / 2));
  const rest = _shuffle(r.slice(Math.ceil(r.length / 2)));
  return [..._shuffle(top), ...rest];
}

// ─── Generar plan de 7 días ──────────────────────────────────
function generarPlanSemanal() {
  const bancos = {};
  TIPOS_PLAN.forEach(t => { bancos[t.id] = _filtrarRecetas(t.id); });

  planActual = DIAS_SEMANA.map((dia, idx) => {
    const dia_plan = { dia };
    TIPOS_PLAN.forEach(t => {
      const lista = bancos[t.id];
      // Evitar repetición tomando índice distinto por tipo
      const offset = { desayuno: 0, almuerzo: 2, cena: 5 }[t.id] || 0;
      dia_plan[t.id] = lista[(idx + offset) % lista.length] || lista[0];
    });
    return dia_plan;
  });

  // Guardar en localStorage
  localStorage.setItem("planSemanalGenerado", JSON.stringify(planActual));
  renderPlanSemanal();
}

// ─── Cargar plan guardado si existe ─────────────────────────
function cargarPlanGuardado() {
  const guardado = localStorage.getItem("planSemanalGenerado");
  if (guardado) {
    planActual = JSON.parse(guardado);
    renderPlanSemanal();
  } else {
    generarPlanSemanal();
  }
}

// ─── Calcular kcal totales de un día ─────────────────────────
function _kcalDia(dia_plan) {
  return TIPOS_PLAN.reduce((acc, t) => acc + (dia_plan[t.id]?.calorias || 0), 0);
}

// ─── Barra de progreso de kcal ───────────────────────────────
function _barraKcal(actual, meta) {
  const pct = Math.min(Math.round((actual / meta) * 100), 100);
  const color = actual > meta * 1.1 ? "#ef5350" : actual >= meta * 0.85 ? "#4caf50" : "#ff9800";
  return `<div class="ps-kcal-barra"><div class="ps-kcal-fill" style="width:${pct}%;background:${color}"></div></div>`;
}

// ─── Renderizar plan completo ─────────────────────────────────
function renderPlanSemanal() {
  const cont = document.getElementById("ps-contenido");
  if (!cont || !planActual) return;

  const meta = parseInt(localStorage.getItem("caloriasObjetivo")) || 2000;

  cont.innerHTML = planActual.map((dia_plan, dIdx) => {
    const kcalTotal = _kcalDia(dia_plan);
    const esHoy     = new Date().getDay() === ([0,1,2,3,4,5,6][(dIdx + 1) % 7]); // aproximado

    const comidasHTML = TIPOS_PLAN.map(t => {
      const r = dia_plan[t.id];
      if (!r) return "";
      const fotoUrl  = typeof urlFoto === "function" ? urlFoto(r) : null;
      const emoji    = typeof getEmoji === "function" ? getEmoji(r) : "🍽️";
      const imgHTML  = fotoUrl
        ? `<img src="${fotoUrl}" alt="${r.nombre}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : "";
      const efHTML = `<div class="ps-sin-foto" style="display:${fotoUrl?"none":"flex"}">${emoji}</div>`;
      const adapText = _adaptacionTexto(r);

      return `
        <div class="ps-comida">
          <div class="ps-comida-img">
            ${imgHTML}${efHTML}
            <span class="ps-tipo-label">${t.emoji} ${t.label}</span>
          </div>
          <div class="ps-comida-info">
            <p class="ps-receta-nombre">${r.nombre.replace(/🌱 /g,"")}</p>
            <div class="ps-macros">
              <span class="ps-mac ps-mac-kcal">🔥 ${r.calorias}</span>
              <span class="ps-mac ps-mac-prot">🌿 ${r.proteinas}g</span>
              <span class="ps-mac ps-mac-carbs">🌾 ${r.carbohidratos}g</span>
            </div>
            ${adapText ? `<p class="ps-adapta">${adapText}</p>` : ""}
          </div>
        </div>`;
    }).join("");

    return `
      <div class="ps-dia-card${dIdx === diaActual() ? " ps-dia-hoy" : ""}">
        <div class="ps-dia-header">
          <span class="ps-dia-nombre">${dia_plan.dia}${dIdx === diaActual() ? " · hoy" : ""}</span>
          <span class="ps-dia-kcal">${kcalTotal} kcal</span>
        </div>
        ${_barraKcal(kcalTotal, meta)}
        <div class="ps-comidas-wrap">${comidasHTML}</div>
      </div>`;
  }).join("");
}

// ─── Índice del día actual (0=Lunes … 6=Domingo) ────────────
function diaActual() {
  const d = new Date().getDay(); // 0=Dom,1=Lun…
  return d === 0 ? 6 : d - 1;   // → 0=Lun … 6=Dom
}

// ─── Texto de adaptación para mostrar en card ────────────────
function _adaptacionTexto(receta) {
  const usuario    = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const enfermedad = usuario.enfermedad || "ninguna";
  const condicion  = usuario.condicion  || "";
  const trimestre  = usuario.trimestre  || "1";
  if (condicion === "embarazo" && receta.adaptaciones?.embarazo)
    return `🤰 ${receta.adaptaciones.embarazo}`;
  if (enfermedad !== "ninguna" && receta.adaptaciones?.[enfermedad])
    return `💊 ${receta.adaptaciones[enfermedad]}`;
  return "";
}

// ─── Banner de adaptaciones activas ─────────────────────────
function renderBannerAdapt() {
  const el = document.getElementById("ps-banner-adapt");
  if (!el) return;

  const usuario    = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const enfermedad = usuario.enfermedad || "ninguna";
  const condicion  = usuario.condicion  || "";
  const objetivo   = usuario.objetivo   || "mantener";
  const trimestre  = usuario.trimestre  || "1";

  const ETIQ_ENF = {
    diabetes:"Diabetes", hipertension:"Hipertensión", colesterol:"Colesterol alto",
    obesidad:"Obesidad", celiaquia:"Celiaquía", tiroides:"Tiroides",
    renal:"Enfermedad renal", cardiaca:"Cardiovascular", digestiva:"Digestivo",
    gastritis:"Gastritis",
  };
  const ETIQ_OBJ = {
    bajar:"Bajar grasa 🥗", masa:"Ganar masa 💪", tonificar:"Tonificar ✨", mantener:"Mantener peso ⚖️"
  };

  const tags = [];
  if (enfermedad !== "ninguna") tags.push(`🩺 ${ETIQ_ENF[enfermedad] || enfermedad}`);
  if (condicion === "embarazo") {
    const cfg = typeof PRIORIDAD_TRIMESTRE !== "undefined" ? PRIORIDAD_TRIMESTRE[trimestre] : null;
    tags.push(`🤰 Embarazo T${trimestre}${cfg ? ` · ${cfg.tip}` : ""}`);
  }
  if (condicion === "lactancia") tags.push("🍼 Lactancia");
  if (veganoActivo) tags.push("🌱 Vegano");
  tags.push(ETIQ_OBJ[objetivo] || objetivo);

  el.innerHTML = tags.map(t => `<span class="ps-tag">${t}</span>`).join("");
}

// ─── Toggle vegano ───────────────────────────────────────────
function toggleVeganoSemanal() {
  veganoActivo = !veganoActivo;
  const btn = document.getElementById("btn-vegano-sem");
  if (btn) btn.classList.toggle("activo", veganoActivo);
  generarPlanSemanal();
}

// ─── Exportar lista de la semana ─────────────────────────────
function exportarPlan() {
  if (!planActual) return;
  let txt = "📅 Plan Semanal — ViveSano\n\n";
  planActual.forEach(d => {
    txt += `📅 ${d.dia}\n`;
    TIPOS_PLAN.forEach(t => {
      const r = d[t.id];
      if (r) txt += `  ${t.emoji} ${t.label}: ${r.nombre.replace(/🌱 /g,"")} (${r.calorias} kcal)\n`;
    });
    txt += `  Total: ${_kcalDia(d)} kcal\n\n`;
  });
  navigator.clipboard?.writeText(txt).then(() => {
    const btn = document.getElementById("btn-exportar");
    if (btn) { btn.textContent = "✓ Copiado"; setTimeout(() => { btn.textContent = "📋 Copiar plan"; }, 2500); }
  }).catch(() => alert(txt));
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderBannerAdapt();
  cargarPlanGuardado();
});
