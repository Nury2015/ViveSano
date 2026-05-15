// ============================================================
// REGISTRO — modal de datos del usuario
// Solo aparece cuando intenta guardar sin tener datos previos
// ============================================================

function _calcularCalorias(d) {
  let tmb = d.sexo === "m"
    ? 10 * d.peso + 6.25 * d.estatura - 5 * d.edad + 5
    : 10 * d.peso + 6.25 * d.estatura - 5 * d.edad - 161;

  const f = { sedentario:1.2, leve:1.375, moderado:1.55, activo:1.725, muy_activo:1.9 };
  let kcal = tmb * (f[d.actividad] || 1.2);

  if (d.condicion === "embarazo")       kcal += 340;
  else if (d.condicion === "lactancia") kcal += 500;
  if (d.objetivo === "bajar")           kcal -= 500;
  else if (d.objetivo === "masa")       kcal += 300;
  else if (d.objetivo === "tonificar")  kcal -= 200;

  return Math.max(Math.round(kcal), 1200);
}

function mostrarModalRegistro(onSuccess) {
  const modal = document.getElementById("modal-registro");
  if (!modal) { onSuccess?.(); return; }
  modal.style.display = "flex";

  // Pre-rellenar si ya tiene datos parciales
  const prev = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  ["peso","estatura","edad"].forEach(k => {
    const el = document.getElementById("reg-" + k);
    if (el && prev[k]) el.value = prev[k];
  });
  ["sexo","actividad","enfermedad","objetivo"].forEach(k => {
    const el = document.getElementById("reg-" + k);
    if (el && prev[k]) el.value = prev[k];
  });

  document.getElementById("reg-form").onsubmit = function(e) {
    e.preventDefault();
    const datos = {
      peso:       parseFloat(document.getElementById("reg-peso").value),
      estatura:   parseFloat(document.getElementById("reg-estatura").value),
      edad:       parseFloat(document.getElementById("reg-edad").value),
      sexo:       document.getElementById("reg-sexo").value,
      actividad:  document.getElementById("reg-actividad").value,
      enfermedad: document.getElementById("reg-enfermedad").value,
      objetivo:   document.getElementById("reg-objetivo").value,
      condicion:  "ninguna",
    };
    const kcal = _calcularCalorias(datos);
    localStorage.setItem("datosUsuario",     JSON.stringify(datos));
    localStorage.setItem("caloriasObjetivo", kcal);
    cerrarModalRegistro();

    // Actualiza la barra de meta si estamos en recetas.html
    const mh = document.getElementById("meta-header");
    if (mh) mh.textContent = kcal;
    const mk = document.getElementById("kcal-meta");
    if (mk) mk.textContent = kcal;
    if (typeof actualizarProgreso === "function") actualizarProgreso();

    onSuccess?.();
  };
}

function cerrarModalRegistro() {
  const modal = document.getElementById("modal-registro");
  if (modal) modal.style.display = "none";
}

function verificarYProceder(accion) {
  const d = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  if (d.peso && d.estatura) accion();
  else mostrarModalRegistro(accion);
}
