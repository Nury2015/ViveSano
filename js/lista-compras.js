// ============================================================
// LISTA DE COMPRAS — ViveSano
// Genera y agrupa ingredientes de las recetas seleccionadas
// ============================================================

const CATEGORIAS_ING = [
  { id: "proteinas",     emoji: "🥩", label: "Proteínas",
    keys: ["pollo", "carne", "costilla", "menudo", "cerdo", "huevo", "atún", "frijol", "lenteja", "sardina", "tofu", "salmón", "pescado", "haba"] },
  { id: "verduras",      emoji: "🥦", label: "Verduras",
    keys: ["tomate", "cebolla", "zanahoria", "habichuela", "ahuyama", "brócoli", "espinaca", "lechuga", "pepino", "cilantro", "ajo", "pimentón", "repollo", "apio", "mazorca", "choclo", "yuca"] },
  { id: "frutas",        emoji: "🍌", label: "Frutas",
    keys: ["banano", "mango", "papaya", "naranja", "fresa", "piña", "aguacate", "limón", "guayaba", "maracuyá", "mora", "guanábana"] },
  { id: "carbohidratos", emoji: "🍚", label: "Carbohidratos",
    keys: ["arroz", "papa", "arepa", "plátano", "fideos", "avena", "pan", "almojábana", "bocadillo", "maíz", "maizena", "galleta"] },
  { id: "lacteos",       emoji: "🥛", label: "Lácteos",
    keys: ["leche", "queso", "yogur", "mantequilla", "crema de leche", "chocolate caliente", "kumis"] },
  { id: "condimentos",   emoji: "🧂", label: "Condimentos",
    keys: ["hogao", "caldo de pollo", "comino", "achiote", "color", "panela", "sal", "aceite", "canela", "azúcar", "pimienta", "vinagre"] },
];
const _CAT_OTROS = { id: "otros", emoji: "🛒", label: "Otros" };
const _TODAS_CATS = [...CATEGORIAS_ING, _CAT_OTROS];

// ─── Utilidades de localStorage ──────────────────────────────
function _getComprados() {
  return new Set(JSON.parse(localStorage.getItem("listaComprasComprados") || "[]"));
}
function _saveComprados(set) {
  localStorage.setItem("listaComprasComprados", JSON.stringify([...set]));
}

// ─── Clasificar un ingrediente en su categoría ───────────────
function _categorizarIng(nombre) {
  const n = nombre.toLowerCase();
  for (const cat of CATEGORIAS_ING) {
    if (cat.keys.some(k => n.includes(k))) return cat.id;
  }
  return "otros";
}

// ─── Construir lista desde recetas seleccionadas ─────────────
function generarItemsLista() {
  const mapa = {};
  SLOTS.forEach(slot => {
    const receta = selecciones[slot.id];
    if (!receta) return;
    (receta.ingredientes || []).forEach(ing => {
      const key = ing.nombre.toLowerCase().trim();
      if (mapa[key]) {
        if (!mapa[key].fuentes.includes(receta.nombre))
          mapa[key].fuentes.push(receta.nombre);
      } else {
        mapa[key] = {
          id:       key.replace(/[^a-z0-9áéíóúüñ]/gi, "_"),
          nombre:   ing.nombre,
          cantidad: ing.cantidad,
          fuentes:  [receta.nombre],
          catId:    _categorizarIng(ing.nombre),
        };
      }
    });
  });
  return Object.values(mapa);
}

// ─── Abrir / cerrar panel ────────────────────────────────────
function toggleListaCompras() {
  const panel = document.getElementById("panel-lista-compras");
  if (!panel) return;
  const abierto = panel.style.display !== "none";
  panel.style.display = abierto ? "none" : "block";
  const btn = document.getElementById("btn-lista-compras");
  if (btn) btn.classList.toggle("activo", !abierto);
  if (!abierto) renderListaCompras();
}

// ─── Actualizar lista si está visible ────────────────────────
function actualizarListaCompras() {
  const panel = document.getElementById("panel-lista-compras");
  if (panel && panel.style.display !== "none") renderListaCompras();
}

// ─── Renderizar ──────────────────────────────────────────────
function renderListaCompras() {
  const cont = document.getElementById("lista-compras-contenido");
  if (!cont) return;

  const items     = generarItemsLista();
  const comprados = _getComprados();

  if (!items.length) {
    cont.innerHTML = `
      <div class="lista-vacia">
        <span class="lista-vacia-ico">🛒</span>
        <p>Selecciona al menos una receta del día y aquí verás tu lista de compras automáticamente.</p>
      </div>`;
    return;
  }

  // Agrupar por categoría
  const grupos = {};
  _TODAS_CATS.forEach(c => { grupos[c.id] = []; });
  items.forEach(item => {
    const cat = item.catId || "otros";
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(item);
  });

  const total    = items.length;
  const nCompra  = items.filter(i => comprados.has(i.id)).length;
  const pct      = total ? Math.round((nCompra / total) * 100) : 0;

  let html = `
    <div class="lista-top-bar">
      <span class="lista-contador">${nCompra} de ${total} ingredientes</span>
      <div class="lista-acciones">
        <button class="btn-lista-acc" onclick="copiarLista(this)">📋 Copiar</button>
        <button class="btn-lista-acc btn-lista-limpiar" onclick="limpiarComprados()">✕ Limpiar</button>
      </div>
    </div>
    <div class="lista-barra-wrap">
      <div class="lista-barra-fill" style="width:${pct}%"></div>
    </div>`;

  _TODAS_CATS.forEach(cat => {
    const grupo = grupos[cat.id];
    if (!grupo || !grupo.length) return;
    const nCat = grupo.filter(i => comprados.has(i.id)).length;

    html += `
    <div class="lista-grupo">
      <div class="lista-grupo-hdr">
        <span>${cat.emoji} ${cat.label}</span>
        <span class="lista-grupo-count">${nCat}/${grupo.length}</span>
      </div>
      <ul class="lista-ul">`;

    grupo.forEach(item => {
      const done = comprados.has(item.id);
      html += `
        <li class="lista-item${done ? " lista-comprado" : ""}" onclick="toggleComprado('${item.id}')">
          <span class="lista-check-ico">${done ? "✅" : "⬜"}</span>
          <div class="lista-item-datos">
            <span class="lista-nombre">${item.nombre}</span>
            <span class="lista-cant">${item.cantidad}</span>
            ${item.fuentes.length > 1
              ? `<span class="lista-fuente">De: ${item.fuentes.map(f => f.replace(/🌱 /g,"")).join(", ")}</span>`
              : ""}
          </div>
        </li>`;
    });

    html += `</ul></div>`;
  });

  cont.innerHTML = html;
}

// ─── Marcar / desmarcar ingrediente ─────────────────────────
function toggleComprado(itemId) {
  const comprados = _getComprados();
  if (comprados.has(itemId)) comprados.delete(itemId);
  else comprados.add(itemId);
  _saveComprados(comprados);
  renderListaCompras();
}

// ─── Limpiar todos los comprados ─────────────────────────────
function limpiarComprados() {
  _saveComprados(new Set());
  renderListaCompras();
}

// ─── Copiar lista al portapapeles ────────────────────────────
function copiarLista(btnEl) {
  const items = generarItemsLista();
  if (!items.length) return;

  const comprados = _getComprados();
  const grupos = {};
  _TODAS_CATS.forEach(c => { grupos[c.id] = []; });
  items.forEach(i => { (grupos[i.catId] || grupos["otros"]).push(i); });

  let txt = "🛒 Lista de compras — ViveSano\n\n";
  _TODAS_CATS.forEach(cat => {
    const g = grupos[cat.id];
    if (!g || !g.length) return;
    txt += `${cat.emoji} ${cat.label}:\n`;
    g.forEach(item => {
      txt += `  ${comprados.has(item.id) ? "✅" : "☐"} ${item.nombre} — ${item.cantidad}\n`;
    });
    txt += "\n";
  });

  navigator.clipboard?.writeText(txt).then(() => {
    if (btnEl) {
      btnEl.textContent = "✓ Copiado";
      setTimeout(() => { btnEl.textContent = "📋 Copiar"; }, 2000);
    }
  }).catch(() => {
    alert(txt); // fallback para navegadores sin clipboard API
  });
}
