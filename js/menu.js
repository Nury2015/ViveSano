// ── PLAN DE EJERCICIO SEGÚN LA SALUD ──────────────────────
// Única regla para Ejercicio, Meditación y Mi Día
function necesitaRutinaSuave(u) {
  const imc = u.peso && u.estatura ? u.peso / Math.pow(u.estatura / 100, 2) : 0;
  return ["cardiaca", "hipertension", "obesidad", "renal", "diabetes"].includes(u.enfermedad)
    || u.edad >= 65 || imc >= 30;
}
function tipoPlanEjercicio(u) {
  if (u.condicion === "embarazo") return "prenatal";
  if (necesitaRutinaSuave(u))     return "cardiaco"; // plan suave: sin HIIT ni saltos
  return u.objetivo === "bajar" ? "cardio" : u.objetivo === "masa" ? "fuerza" : "balanceado";
}

// ── DATOS DE BÚSQUEDA ─────────────────────────────────────
const SEARCH_ITEMS = [
  { ico:"📊", cat:"Sección", nombre:"Mi Progreso",          url:"progreso.html" },
  { ico:"💪", cat:"Sección", nombre:"Ejercicio & Bienestar", url:"ejercicio.html" },
  { ico:"🧘", cat:"Sección", nombre:"Meditación & Bienestar",url:"meditacion.html" },
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
  { ico:"🧘", cat:"Meditación", nombre:"Yoga Básico",          url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Yoga para la Espalda", url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Yoga Restaurativo",    url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Respiración 4-7-8",   url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Escaneo Corporal",     url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Visualización Guiada", url:"meditacion.html" },
  { ico:"🧘", cat:"Meditación", nombre:"Mindfulness",          url:"meditacion.html" },
];

function _normalizar(s) {
  return (s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

function buscarEnApp(query) {
  const q = _normalizar(query);
  if (!q) return [];

  return SEARCH_ITEMS
    .filter(it => _normalizar(it.nombre).includes(q) || _normalizar(it.cat).includes(q))
    .slice(0, 9)
    .concat({ ico: "🥗", cat: "Recetas", nombre: `Buscar "${query}" en recetas`, url: "recetas.html?buscar=" + encodeURIComponent(query) });
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
      resultados.innerHTML = items.map(it => `
        <a href="${it.url}" class="search-result-item">
          <span class="search-result-ico">${it.ico}</span>
          <span class="search-result-info">
            <span class="search-result-nombre">${it.nombre.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>
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
    if (typeof checkNotificaciones === "function") return; // Mi Día tiene su propio aviso
    const config = JSON.parse(localStorage.getItem("recordatoriosMiDia") || "[]");
    if (!config.length) return;

    const ahora    = new Date();
    const hhmm     = `${String(ahora.getHours()).padStart(2,"0")}:${String(ahora.getMinutes()).padStart(2,"0")}`;

    config.forEach(r => {
      if (!r.activo || r.hora !== hhmm) return;
      if (r.diaDelMes && ahora.getDate() !== r.diaDelMes) return;
      if (r.diasSemana && !r.diasSemana.includes(ahora.getDay())) return;
      // Misma marca que usa Mi Día, para no avisar dos veces
      const llave = r.diaDelMes ? `vsRec_${r.id}_${ahora.getFullYear()}-${ahora.getMonth()}` : `vsRec_${r.id}_${ahora.toDateString()}`;
      if (localStorage.getItem(llave)) return;
      localStorage.setItem(llave, "1");

      const u    = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
      const obj  = { bajar:"bajar de peso", masa:"ganar músculo", tonificar:"tonificar", mantener:"mantenerte" };
      const meta = obj[u?.objetivo] || "tu objetivo";
      const MENS = {
        desayuno:    `Tu metabolismo lleva horas esperando. Desayuna ahora — sin desayuno, a las 11am comes el doble. 🌅`,
        once_manana: `Onces. No es lujo, es biología: glucosa estable = mejor humor + concentración. Come algo. 🍎`,
        almuerzo:    `Almuerzo. Sin esto, tu cerebro tomará malas decisiones toda la tarde. Tiene datos. ☀️`,
        once_tarde:  `Sin merienda llegas a la cena con un hambre que justifica cualquier cosa. No le des esa excusa a tu cerebro. 🧁`,
        cena:        `Cena antes de las 7:30pm. Tu hígado hace detox de noche — no lo mandes lleno. 🌙`,
        ejercicio:   `Tu sesión de hoy para ${meta} lleva un rato esperando. El sofá también. Tú decides. 💪`,
        meditacion:  `10 min de meditación = mejor humor, menos cortisol, mejores decisiones. Netflix puede esperar. 🧘`,
        mercado:     `Sábado de mercado. Si no compras hoy, el lunes comerás lo que encuentres. Ya sabes cómo termina eso. 🛒`,
        medidas:     `Primer día del mes — momento de registrar medidas. El número puede sorprenderte, para bien. 📏`,
      };

      try {
        new Notification("ViveSano 🥗", {
          body: MENS[r.id] || `¡Hora de ${r.label}!`,
          icon: _iconRec(),
          tag:  `vivesano-${r.id}`,
        });
      } catch (e) { /* Chrome en Android no permite este tipo de aviso */ }
    });
  }

  setInterval(checkRecordatorios, 60_000);
  checkRecordatorios();
})();
