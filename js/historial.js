// ============================================================
// HISTORIAL — datos reales desde localStorage
// ============================================================

const TIPO_LABELS  = { desayuno:"🌅 Desayuno", once:"🍎 Once", almuerzo:"☀️ Almuerzo", cena:"🌙 Cena" };
const TIPO_COLORES = { desayuno:"e07a5f", once:"52b788", almuerzo:"2d6a4f", cena:"264653" };
const DIAS_SLOT    = { desayuno:"🌅", once_manana:"🍎", almuerzo:"☀️", once_tarde:"🍊", cena:"🌙" };

let historialData = [];
let filtroRecetas = "todos";

// ─── EMOJI ───────────────────────────────────────────────────
function getEmoji(receta) {
  const n = (receta.nombre || "").toLowerCase().replace(/🌱 /g, "");
  if (n.includes("changua"))                      return "🥛";
  if (n.includes("avena"))                        return "🥣";
  if (n.includes("arepa"))                        return "🫓";
  if (n.includes("calentado"))                    return "🍳";
  if (n.includes("perico") || n.includes("huevo")) return "🍳";
  if (n.includes("chontaduro"))                   return "🌴";
  if (n.includes("pandebono"))                    return "🥐";
  if (n.includes("oblea") || n.includes("arequipe")) return "🍪";
  if (n.includes("yogur"))                        return "🫙";
  if (n.includes("fruta"))                        return "🍊";
  if (n.includes("sancocho"))                     return "🫕";
  if (n.includes("ajiaco"))                       return "🥣";
  if (n.includes("arroz"))                        return "🍚";
  if (n.includes("sopa") || n.includes("crema") || n.includes("caldo")) return "🍲";
  if (n.includes("bandeja"))                      return "🍽️";
  if (n.includes("lenteja") || n.includes("frijol")) return "🫘";
  if (n.includes("aguacate"))                     return "🥑";
  if (n.includes("sudado"))                       return "🥩";
  if (n.includes("pasta") || n.includes("fideo")) return "🍝";
  if (n.includes("verdura"))                      return "🥦";
  return "🍴";
}

// ─── CARGAR ──────────────────────────────────────────────────
function cargarHistorial() {
  historialData = JSON.parse(localStorage.getItem("historial")) || [];
  renderStats();
  renderPlanes();
  renderRecetas();
  renderFavoritos();
}

// ─── STATS ───────────────────────────────────────────────────
function renderStats() {
  const planes  = historialData.filter(i => i.tipo === "plan_dia").length;
  const recetas = historialData.filter(i => i.nombre && i.tipo !== "plan_dia").length;
  // Recetas extraídas de planes
  const totalRecetas = recetas + historialData
    .filter(i => i.tipo === "plan_dia")
    .reduce((s, p) => s + (p.comidas ? Object.keys(p.comidas).length : 0), 0);

  document.getElementById("stats-bar").innerHTML = `
    <div class="stat"><strong>${planes}</strong><span>Planes guardados</span></div>
    <div class="stat"><strong>${totalRecetas}</strong><span>Recetas guardadas</span></div>
    <div class="stat"><strong>${planes + recetas}</strong><span>Total</span></div>
  `;
}

// ─── PLANES ──────────────────────────────────────────────────
function renderPlanes() {
  const planes = historialData
    .map((item, idx) => ({ ...item, _idx: idx }))
    .filter(i => i.tipo === "plan_dia")
    .sort((a, b) => (b.fechaISO || "").localeCompare(a.fechaISO || "")); // más reciente primero

  const cont = document.getElementById("planesLista");

  if (!planes.length) {
    cont.innerHTML = `<p class="hist-vacio">No tienes planes guardados aún.<br>
      Ve a <a href="recetas.html">Recetas</a>, elige tus comidas del día y pulsa <strong>"Guardar mi plan del día"</strong>.</p>`;
    return;
  }

  cont.innerHTML = planes.map(plan => {
    const comidas  = plan.comidas ? Object.entries(plan.comidas) : [];
    const pct      = plan.objetivo ? Math.min(Math.round((plan.calorias / plan.objetivo) * 100), 100) : 0;
    const color    = pct >= 90 ? "#43a047" : pct >= 60 ? "#fb8c00" : "#42a5f5";

    const lista = comidas.map(([slot, r]) => {
      const emoji = DIAS_SLOT[slot] || "🍽️";
      const foto  = r.foto
        ? `<img src="https://images.unsplash.com/photo-${r.foto}?w=60&h=60&fit=crop&auto=format&q=70"
               onerror="this.style.display='none'" loading="lazy">`
        : `<span class="plan-comida-ef" style="background:#${TIPO_COLORES[r.tipo]||"2d6a4f"}">${getEmoji(r)}</span>`;
      return `
        <li class="plan-comida-item" onclick='abrirReceta(${JSON.stringify(r)})'>
          ${foto}
          <div>
            <span class="plan-comida-label">${emoji} ${TIPO_LABELS[r.tipo] || slot}</span>
            <p>${r.nombre?.replace(/🌱 /g,"") || "-"}</p>
            <span>${r.calorias || "-"} kcal</span>
          </div>
        </li>`;
    }).join("");

    return `
      <div class="plan-item">
        <div class="plan-item-header">
          <div>
            <span class="plan-dia">${plan.diaSemana || "Plan"}</span>
            <span class="plan-date">${plan.fecha}</span>
          </div>
          <div class="plan-meta">
            <span class="plan-kcal-badge">${plan.calorias} / ${plan.objetivo || "?"} kcal</span>
            <button class="btn-borrar-plan" onclick="borrarPlan(${plan._idx})" title="Borrar este plan">🗑️ Borrar</button>
          </div>
        </div>
        <div class="plan-barra-wrap">
          <div class="plan-barra-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <ul class="plan-comidas-lista">${lista}</ul>
      </div>`;
  }).join("");
}

// ─── BORRAR UN PLAN ──────────────────────────────────────────
function borrarPlan(idx) {
  if (!confirm("¿Borrar este plan del día?")) return;
  historialData.splice(idx, 1);
  localStorage.setItem("historial", JSON.stringify(historialData));
  cargarHistorial();
}

// ─── BORRAR TODOS LOS PLANES ─────────────────────────────────
function borrarTodosPlanes() {
  if (!confirm("¿Borrar TODOS los planes guardados? Esta acción no se puede deshacer.")) return;
  historialData = historialData.filter(i => i.tipo !== "plan_dia");
  localStorage.setItem("historial", JSON.stringify(historialData));
  cargarHistorial();
}

// ─── RECETAS ─────────────────────────────────────────────────
function renderRecetas() {
  // Extraer recetas únicas de planes + guardadas individualmente
  const vistas   = new Set();
  const recetas  = [];

  // De planes
  historialData.filter(i => i.tipo === "plan_dia").forEach(plan => {
    if (!plan.comidas) return;
    Object.values(plan.comidas).forEach(r => {
      const key = r.id || r.nombre;
      if (r?.nombre && !vistas.has(key)) {
        vistas.add(key);
        recetas.push({ ...r, _dePlan: plan.fecha });
      }
    });
  });

  // Individuales guardadas (guardamos el índice para poder borrarlas)
  historialData.forEach((item, idx) => {
    if (item.nombre && item.tipo !== "plan_dia") {
      const key = item.id || item.nombre;
      if (!vistas.has(key)) {
        vistas.add(key);
        recetas.push({ ...item, _histIdx: idx });
      }
    }
  });

  const lista = filtroRecetas === "todos"
    ? recetas
    : recetas.filter(r => r.tipo === filtroRecetas);

  const cont = document.getElementById("recetasGrid");

  if (!lista.length) {
    cont.innerHTML = `<p class="hist-vacio">
      ${filtroRecetas === "todos"
        ? "No hay recetas guardadas. Guarda un plan del día para verlas aquí."
        : `No hay ${TIPO_LABELS[filtroRecetas] || filtroRecetas}s guardados.`}
    </p>`;
    return;
  }

  cont.innerHTML = lista.map(r => {
    const tipo   = r.tipo || "almuerzo";
    const fotoId = r.foto;
    const imgURL = fotoId
      ? `https://images.unsplash.com/photo-${fotoId}?w=200&h=100&fit=crop&auto=format&q=80`
      : null;

    const btnBorrar = r._histIdx !== undefined
      ? `<button class="hist-card-del" onclick="event.stopPropagation();borrarRecetaGuardada(${r._histIdx})" title="Borrar receta">✕</button>`
      : "";

    return `
      <div class="hist-card" onclick='abrirReceta(${JSON.stringify(r)})'>
        ${btnBorrar}
        ${imgURL
          ? `<img src="${imgURL}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ""}
        <div class="hist-sin-foto" style="display:${imgURL?"none":"flex"};background:#${TIPO_COLORES[tipo]||"2d6a4f"}">
          ${getEmoji(r)}
        </div>
        <div class="hist-card-info">
          <span class="hist-tipo ${tipo}">${TIPO_LABELS[tipo] || tipo}</span>
          <p>${r.nombre?.replace(/🌱 /g,"") || "-"}</p>
          <span class="hist-kcal">${r.calorias || "-"} kcal · ${r.proteinas || "-"}g prot.</span>
          <span class="hist-fecha">${r._dePlan ? "📋 Del plan del "+r._dePlan : (r.fechaGuardado || "")}</span>
        </div>
      </div>`;
  }).join("");
}

// ─── BORRAR RECETA INDIVIDUAL ────────────────────────────────
function borrarRecetaGuardada(idx) {
  if (!confirm("¿Borrar esta receta del historial?")) return;
  historialData.splice(idx, 1);
  localStorage.setItem("historial", JSON.stringify(historialData));
  cargarHistorial();
}

// ─── BORRAR TODAS LAS RECETAS INDIVIDUALES ───────────────────
function borrarTodasRecetasGuardadas() {
  const n = historialData.filter(i => i.nombre && i.tipo !== "plan_dia").length;
  if (!n) return;
  if (!confirm(`¿Borrar las ${n} recetas guardadas individualmente? Los planes no se verán afectados.`)) return;
  historialData = historialData.filter(i => i.tipo === "plan_dia" || !i.nombre);
  localStorage.setItem("historial", JSON.stringify(historialData));
  cargarHistorial();
}

// ─── ABRIR RECETA ────────────────────────────────────────────
function abrirReceta(receta) {
  localStorage.setItem("recetaActual", JSON.stringify(receta));
  window.location.href = "detalle.html";
}

// ─── FAVORITOS ───────────────────────────────────────────────
function renderFavoritos() {
  const favs  = JSON.parse(localStorage.getItem("ingredientesFavoritos") || "[]");
  const cont  = document.getElementById("ingredientesFav");
  const empty = document.getElementById("ing-vacio");

  if (!favs.length) {
    cont.style.display  = "none";
    empty.style.display = "block";
    return;
  }

  cont.style.display  = "flex";
  empty.style.display = "none";
  cont.innerHTML = favs.map(f =>
    `<span class="ing-chip">
       ⭐ ${f}
       <button class="ing-chip-remove" onclick="quitarFavoritoH('${f}')" title="Quitar de favoritos">✕</button>
     </span>`
  ).join("");
}

function quitarFavoritoH(nombre) {
  const favs = JSON.parse(localStorage.getItem("ingredientesFavoritos") || "[]");
  localStorage.setItem("ingredientesFavoritos", JSON.stringify(favs.filter(f => f !== nombre)));
  renderFavoritos();
}

function borrarTodosFavoritos() {
  if (!confirm("¿Borrar todos los ingredientes favoritos?")) return;
  localStorage.removeItem("ingredientesFavoritos");
  renderFavoritos();
}

// ─── FILTROS RECETAS ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cargarHistorial();

  document.querySelectorAll(".hfil").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".hfil").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      filtroRecetas = btn.dataset.tipo;
      renderRecetas();
    });
  });
});
