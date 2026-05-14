document.addEventListener("DOMContentLoaded", function () {
  const modal    = document.getElementById("aviso-importante");
  const btnOk    = document.getElementById("btn-entendido");
  const verAviso = document.getElementById("ver-aviso");

  if (!modal || !btnOk) return;

  // Mostrar solo si el usuario no lo ha aceptado antes
  if (!localStorage.getItem("avisoEntendido")) {
    modal.classList.remove("oculto");
  }

  btnOk.addEventListener("click", () => {
    modal.classList.add("oculto");
    localStorage.setItem("avisoEntendido", "true");
  });

  verAviso?.addEventListener("click", () => {
    modal.classList.remove("oculto");
  });
});
