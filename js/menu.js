// ── DATOS DE BÚSQUEDA ─────────────────────────────────────
const SEARCH_ITEMS = [
  { ico:"📊", cat:"Sección", nombre:"Mi Progreso",          url:"progreso.html" },
  { ico:"💪", cat:"Sección", nombre:"Ejercicio & Bienestar", url:"ejercicio.html" },
  { ico:"🧘", cat:"Sección", nombre:"Meditación guiada",    url:"ejercicio.html?tab=meditacion" },
  { ico:"🔔", cat:"Sección", nombre:"Mi Día / Recordatorios",url:"recordatorios.html" },
  { ico:"📷", cat:"Sección", nombre:"Analizar Plato",       url:"analizar-plato.html" },
  { ico:"🥗", cat:"Sección", nombre:"Mis Recetas",          url:"recetas.html" },
  { ico:"📅", cat:"Sección", nombre:"Plan Semanal",         url:"plan-semanal.html" },
  { ico:"📋", cat:"Sección", nombre:"Historial",            url:"historial.html" },
  { ico:"👤", cat:"Sección", nombre:"Mi Perfil",            url:"perfil.html" },
  // Ejercicios
  { ico:"🏋️", cat:"Ejercicio", nombre:"Sentadillas",          url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Sentadilla sumo",      url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Flexiones de brazos",  url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Plancha frontal",      url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Puente de glúteos",    url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Zancadas alternadas",  url:"ejercicio.html" },
  { ico:"🏋️", cat:"Ejercicio", nombre:"Dips en silla",        url:"ejercicio.html" },
  { ico:"🏃", cat:"Ejercicio", nombre:"Burpees",              url:"ejercicio.html" },
  { ico:"🏃", cat:"Ejercicio", nombre:"Mountain climbers",    url:"ejercicio.html" },
  { ico:"🏃", cat:"Ejercicio", nombre:"Saltos de tijera",     url:"ejercicio.html" },
  { ico:"🏃", cat:"Ejercicio", nombre:"High knees",           url:"ejercicio.html" },
  { ico:"🏃", cat:"Ejercicio", nombre:"Circuito HIIT",        url:"ejercicio.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Yoga Básico",          url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Yoga para la Espalda", url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Yoga Restaurativo",    url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Respiración 4-7-8",   url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Escaneo Corporal",     url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Visualización Guiada", url:"ejercicio.html?tab=meditacion" },
  { ico:"🧘", cat:"Meditación", nombre:"Mindfulness",          url:"ejercicio.html?tab=meditacion" },
];

function _normalizar(s) {
  return (s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

function buscarEnApp(query) {
  const q = _normalizar(query);
  if (!q) return [];

  // Recetas guardadas
  const recetas = JSON.parse(localStorage.getItem("misRecetas") || "[]");
  const recData = recetas.map(r => ({
    ico: "🥗", cat: "Receta", nombre: r.nombre || "Receta sin nombre", url: "recetas.html"
  }));

  return [...SEARCH_ITEMS, ...recData]
    .filter(it => _normalizar(it.nombre).includes(q) || _normalizar(it.cat).includes(q))
    .slice(0, 10);
}

// ── INICIAR MENÚ ──────────────────────────────────────────
function iniciarMenu() {

  const boton  = document.getElementById("btn-menu");
  const menu   = document.querySelector(".menu");
  if (!boton || !menu) return;
  const icono  = boton.querySelector("i");

  // ── Estado activo (soporta query params: ejercicio.html?tab=meditacion) ──
  const paginaBase  = window.location.pathname.split("/").pop() || "index.html";
  const paginaFull  = paginaBase + window.location.search; // "ejercicio.html?tab=meditacion"

  document.querySelectorAll(".menu a, .bottom-nav-item").forEach(link => {
    const href = link.getAttribute("href") || "";
    // Coincidencia exacta primero
    if (href === paginaFull || href === paginaBase) {
      // Dar preferencia al más específico: si href tiene query y coincide, activar
      if (href === paginaFull) { link.classList.add("active"); }
      // Si no hay query en la URL actual, activar el link base
      else if (!window.location.search && href === paginaBase) { link.classList.add("active"); }
    }
  });

  // ── Hamburguesa ──────────────────────────────────────────
  boton.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("active");
    icono.className = menu.classList.contains("active")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });

  document.addEventListener("click", e => {
    if (!menu.contains(e.target) && !boton.contains(e.target)) {
      menu.classList.remove("active");
      icono.className = "fa-solid fa-bars";
    }
  });

  document.querySelectorAll(".menu li").forEach(op => {
    op.addEventListener("click", () => {
      menu.classList.remove("active");
      icono.className = "fa-solid fa-bars";
    });
  });

  // ── Búsqueda ─────────────────────────────────────────────
  const btnSearch  = document.getElementById("btn-search");
  const overlay    = document.getElementById("search-overlay");
  const btnClose   = document.getElementById("btn-search-close");
  const input      = document.getElementById("search-input");
  const resultados = document.getElementById("search-results");

  if (btnSearch && overlay) {
    btnSearch.addEventListener("click", () => {
      overlay.style.display = "flex";
      setTimeout(() => input?.focus(), 80);
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      overlay.style.display = "none";
      if (input) input.value = "";
      if (resultados) resultados.innerHTML = '<p class="search-hint">Escribe para buscar en toda la app</p>';
    });
  }

  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) {
        resultados.innerHTML = '<p class="search-hint">Escribe para buscar en toda la app</p>';
        return;
      }
      const items = buscarEnApp(q);
      if (!items.length) {
        resultados.innerHTML = `<div class="search-no-result">😕 Sin resultados para "<strong>${q}</strong>"</div>`;
        return;
      }
      resultados.innerHTML = items.map(it => `
        <a href="${it.url}" class="search-result-item">
          <span class="search-result-ico">${it.ico}</span>
          <span class="search-result-info">
            <span class="search-result-nombre">${it.nombre}</span>
            <span class="search-result-cat">${it.cat}</span>
          </span>
        </a>`).join("");
    });

    input.addEventListener("keydown", e => {
      if (e.key === "Escape") btnClose?.click();
    });
  }

  // ── Usuario en nav ────────────────────────────────────────
  if (typeof auth !== "undefined" && auth.currentUser) {
    if (typeof actualizarNavUsuario === "function")
      actualizarNavUsuario(auth.currentUser);
  }
}

window.iniciarMenu = iniciarMenu;

// ── CHECKER DE RECORDATORIOS (se ejecuta en todas las páginas) ──
(function () {
  function _iconRec() {
    try { return new URL("assets/img/logofondoblanco.png", location.href).href; }
    catch { return ""; }
  }

  function checkRecordatorios() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const config = JSON.parse(localStorage.getItem("recordatorios") || "[]");
    if (!config.length) return;

    const ahora    = new Date();
    const hhmm     = `${String(ahora.getHours()).padStart(2,"0")}:${String(ahora.getMinutes()).padStart(2,"0")}`;
    const claveHoy = `rec_mostrado_${ahora.toDateString()}`;
    const yaVistos = JSON.parse(sessionStorage.getItem(claveHoy) || "[]");

    config.forEach(r => {
      if (!r.activo || r.hora !== hhmm) return;
      if (r.diaDelMes && ahora.getDate() !== r.diaDelMes) return;
      if (yaVistos.includes(r.id)) return;

      const MENS = {
        desayuno:    "¡Hora del desayuno! Empieza el día con energía 💪",
        once_manana: "¡Hora de tus onces! Un snack saludable te espera 🍎",
        almuerzo:    "¡Hora del almuerzo! Recarga energías para la tarde ☀️",
        once_tarde:  "¡Merienda! Mantén tu metabolismo activo 🧁",
        cena:        "¡Hora de cenar! Una cena liviana es lo ideal 🌙",
        ejercicio:   "¡Hora de entrenar! Tu cuerpo te lo va a agradecer 💪",
        meditacion:  "Momento de meditar. Respira profundo. 🧘",
      };

      new Notification("ViveSano 🥗", {
        body: MENS[r.id] || `¡Hora de ${r.label}!`,
        icon: _iconRec(),
        tag:  `vivesano-${r.id}`,
      });

      yaVistos.push(r.id);
      sessionStorage.setItem(claveHoy, JSON.stringify(yaVistos));
    });
  }

  setInterval(checkRecordatorios, 60_000);
  checkRecordatorios();
})();
