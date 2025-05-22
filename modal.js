
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("aviso-importante");
  const btn = document.getElementById("btn-entendido");

  const avisoVisto = localStorage.getItem("avisoEntendido");

  if (!avisoVisto) {
    modal.classList.remove("oculto");
  }

  btn.addEventListener("click", () => {
    modal.classList.add("oculto");
    localStorage.setItem("avisoEntendido", "true");
  });
});


  const modal = document.getElementById("aviso-importante");
  const cerrar = document.getElementById("btn-entendido");
  const verAviso = document.getElementById("ver-aviso");

  const aceptoAviso = localStorage.getItem("aceptoAvisoLegal");

  if (!aceptoAviso) {
    modal.style.display = "flex";
  }

  cerrar.addEventListener("click", function () {
    modal.style.display = "none";
    localStorage.setItem("aceptoAvisoLegal", "true");
  });

  verAviso.addEventListener("click", function () {
    modal.style.display = "flex";
  });



