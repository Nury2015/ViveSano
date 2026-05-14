// ============================================================
// HISTORIAL — lee del localStorage real
// ============================================================

const COLORES = { desayuno: "ff9800", once: "8bc34a", almuerzo: "1976d2", cena: "7b1fa2", plan_dia: "6a1b9a" };
const LABELS  = { desayuno: "🌅 Desayuno", once: "🍎 Once", almuerzo: "☀️ Almuerzo", cena: "🌙 Cena", plan_dia: "📋 Plan del día" };

let filtroActual = "todos";
let todoItems    = [];   // recetas + planes aplanados

// ─── CARGAR HISTORIAL ────────────────────────────────────────
function cargarHistorial() {
  const raw = JSON.parse(localStorage.getItem("historial")) || [];
  todoItems = [];

  raw.forEach(item => {
    if (item.tipo === "plan_dia") {
      // Guardar el plan completo
      todoItems.push({ ...item, _displayTipo: "plan_dia" });
      // Y también cada receta individual del plan
      if (item.comidas) {
        Object.values(item.comidas).forEach(r => {
          if (r && r.nombre) {
            todoItems.push({ ...r, _displayTipo: r.tipo || "desayuno", _dePlan: item.fecha });
          }
        });
      }
    } else if (item.nombre) {
      todoItems.push({ ...item, _displayTipo: item.tipo || item.tipoMeal || "almuerzo" });
    }
  });

  // Deduplicar por id+fecha para no mostrar doble
  const vistos = new Set();
  todoItems = todoItems.filter(i => {
    const key = `${i._displayTipo}-${i.id || i.nombre}-${i.fecha || ""}`;
    if (vistos.has(key)) return false;
    vistos.add(key);
    return true;
  });

  renderStats();
  renderGrid();
  renderIngFavoritos();
}

// ─── STATS ────────────────────────────────────────────────────
function renderStats() {
  const total    = todoItems.length;
  const planes   = todoItems.filter(i => i._displayTipo === "plan_dia").length;
  const recetas  = total - planes;
  const tiposCont = {};
  todoItems.filter(i => i._displayTipo !== "plan_dia").forEach(i => {
    tiposCont[i._displayTipo] = (tiposCont[i._displayTipo] || 0) + 1;
  });

  const bar = document.getElementById("stats-bar");
  bar.innerHTML = `
    <div class="stat"><strong>${total}</strong><span>Total guardados</span></div>
    <div class="stat"><strong>${planes}</strong><span>Planes del día</span></div>
    <div class="stat"><strong>${recetas}</strong><span>Recetas</span></div>
    <div class="stat"><strong>${tiposCont.desayuno || 0}</strong><span>Desayunos</span></div>
    <div class="stat"><strong>${tiposCont.almuerzo || 0}</strong><span>Almuerzos</span></div>
    <div class="stat"><strong>${tiposCont.cena || 0}</strong><span>Cenas</span></div>
  `;
}

// ─── GRID DE RECETAS ──────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById("recetasGrid");

  let lista = filtroActual === "todos"
    ? todoItems
    : todoItems.filter(i => i._displayTipo === filtroActual);

  if (!lista.length) {
    grid.innerHTML = `<p class="hist-vacio">
      ${filtroActual === "todos"
        ? "Aún no tienes nada guardado. Ve a <a href='recetas.html'>Recetas</a> y guarda tu plan del día."
        : `No tienes ${LABELS[filtroActual]?.replace(/[^\w\s]/g, "") || filtroActual} guardados.`}
    </p>`;
    return;
  }

  grid.innerHTML = lista.map(item => {
    if (item._displayTipo === "plan_dia") return renderPlanCard(item);
    return renderRecetaCard(item);
  }).join("");
}

function renderRecetaCard(r) {
  const tipo   = r._displayTipo || "almuerzo";
  const fotoId = r.foto || "";
  const imgUrl = fotoId
    ? `https://images.unsplash.com/photo-${fotoId}?w=300&h=160&fit=crop&auto=format&q=80`
    : `https://placehold.co/300x160/${COLORES[tipo]||"4caf50"}/white?text=${encodeURIComponent(r.nombre?.split(" ").slice(0,2).join("+") || "Receta")}`;

  return `
    <div class="hist-card" onclick='abrirReceta(${JSON.stringify(r)})'>
      <img src="${imgUrl}" loading="lazy"
           onerror="this.onerror=null;this.src='https://placehold.co/300x160/4caf50/white?text=Receta'">
      <div class="hist-card-info">
        <span class="hist-tipo ${tipo}">${LABELS[tipo] || tipo}</span>
        ${r.vegano ? '<span class="badge-v">🌱</span>' : ""}
        <p>${r.nombre}</p>
        <span class="hist-kcal">${r.calorias || "-"} kcal · ${r.proteinas || "-"}g prot.</span>
        ${r.fechaGuardado ? `<span class="hist-fecha">${r.fechaGuardado}</span>` : ""}
        ${r._dePlan ? `<span class="hist-fecha">Del plan del ${r._dePlan}</span>` : ""}
      </div>
    </div>`;
}

function renderPlanCard(plan) {
  const comidas = plan.comidas ? Object.values(plan.comidas) : [];
  const fotos   = comidas.slice(0, 3).map(r =>
    r.foto
      ? `<img src="https://images.unsplash.com/photo-${r.foto}?w=100&h=80&fit=crop&auto=format&q=80" loading="lazy"
              onerror="this.onerror=null;this.src='https://placehold.co/100x80/6a1b9a/white?text=Plan'">`
      : `<img src="https://placehold.co/100x80/6a1b9a/white?text=Comida">`
  ).join("");

  return `
    <div class="hist-card plan-card-hist">
      <div class="plan-fotos">${fotos}</div>
      <div class="hist-card-info">
        <span class="hist-tipo plan_dia">📋 Plan del día</span>
        <p>${plan.fecha || "Plan guardado"}</p>
        <span class="hist-kcal">${plan.calorias || "-"} kcal / ${plan.objetivo || "-"} objetivo</span>
        <div class="plan-comidas-mini">
          ${comidas.map(r => `<span>${r.nombre?.split(" ").slice(0,2).join(" ")}</span>`).join("")}
        </div>
      </div>
    </div>`;
}

// ─── INGREDIENTES FAVORITOS ───────────────────────────────────
function renderIngFavoritos() {
  const favs = JSON.parse(localStorage.getItem("ingredientesFavoritos") || "[]");
  const cont  = document.getElementById("ingredientesFav");
  const empty = document.getElementById("ing-vacio");

  if (!favs.length) {
    cont.style.display  = "none";
    empty.style.display = "block";
    return;
  }

  cont.style.display  = "flex";
  empty.style.display = "none";
  cont.innerHTML = favs.map(f => `<span class="ing-chip">⭐ ${f}</span>`).join("");
}

// ─── ABRIR RECETA ─────────────────────────────────────────────
function abrirReceta(receta) {
  localStorage.setItem("recetaActual", JSON.stringify(receta));
  window.location.href = "detalle.html";
}

// ─── FILTROS ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cargarHistorial();

  document.querySelectorAll(".hfil").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".hfil").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      filtroActual = btn.dataset.tipo;
      renderGrid();
    });
  });
});
