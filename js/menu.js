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