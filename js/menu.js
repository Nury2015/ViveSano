// hamburguesa
function iniciarMenu() {

  const boton = document.querySelector("#btn-menu");
  const menu = document.querySelector(".menu");
  const icono = boton.querySelector("i");

  if (!boton || !menu) return;

  // abrir / cerrar con botón
  boton.addEventListener("click", (e) => {

    e.stopPropagation();

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      icono.classList.remove("fa-bars");
      icono.classList.add("fa-xmark");
    } else {
      icono.classList.remove("fa-xmark");
      icono.classList.add("fa-bars");
    }

  });

  // cerrar tocando fuera
  document.addEventListener("click", (e) => {

    if (!menu.contains(e.target) && !boton.contains(e.target)) {

      menu.classList.remove("active");

      icono.classList.remove("fa-xmark");
      icono.classList.add("fa-bars");

    }

  });

  // cerrar al tocar opción
  const opciones = document.querySelectorAll(".menu li");

  opciones.forEach(op => {
    op.addEventListener("click", () => {

      menu.classList.remove("active");

      icono.classList.remove("fa-xmark");
      icono.classList.add("fa-bars");

    });
  });

  // Actualizar nombre de usuario en nav si Firebase está cargado
  if (typeof auth !== "undefined" && auth.currentUser) {
    if (typeof actualizarNavUsuario === "function")
      actualizarNavUsuario(auth.currentUser);
  }

}
const links = document.querySelectorAll(".menu a");
let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") {
  currentPage = "index.html";
}

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

window.iniciarMenu = iniciarMenu;

// ── Checker de recordatorios (se ejecuta en todas las páginas) ──
(function () {
  function _iconRec() {
    try { return new URL("assets/img/logofondoblanco.png", location.href).href; }
    catch { return ""; }
  }

  function checkRecordatorios() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const config = JSON.parse(localStorage.getItem("recordatorios") || "[]");
    if (!config.length) return;

    const ahora  = new Date();
    const hhmm   = `${String(ahora.getHours()).padStart(2,"0")}:${String(ahora.getMinutes()).padStart(2,"0")}`;
    const claveHoy = `rec_mostrado_${new Date().toDateString()}`;
    const yaVistos = JSON.parse(sessionStorage.getItem(claveHoy) || "[]");

    config.forEach(r => {
      if (!r.activo || r.hora !== hhmm) return;
      if (yaVistos.includes(r.id)) return;           // evitar duplicados en la misma sesión

      const MENS = {
        desayuno:    "¡Hora del desayuno! Empieza el día con energía 💪",
        once_manana: "¡Hora de tus onces! Un snack saludable te espera 🍎",
        almuerzo:    "¡Hora del almuerzo! Recarga energías para la tarde ☀️",
        once_tarde:  "¡Merienda! Mantén tu metabolismo activo 🧁",
        cena:        "¡Hora de cenar! Una cena liviana es lo ideal 🌙",
      };

      new Notification("ViveSano 🥗", {
        body: MENS[r.id] || `¡Hora de ${r.label}!`,
        icon: _iconRec(),
        tag:  `vivesano-${r.id}`,                    // colapsa si ya hay una igual
      });

      yaVistos.push(r.id);
      sessionStorage.setItem(claveHoy, JSON.stringify(yaVistos));
    });
  }

  // Verificar cada minuto
  setInterval(checkRecordatorios, 60_000);
  // También al cargar la página (por si coincide la hora)
  checkRecordatorios();
})();