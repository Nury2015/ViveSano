// ── Wizard ───────────────────────────────
function irPaso(n) {
  if (n === 2) {
    const edad     = document.getElementById("edad").value;
    const peso     = document.getElementById("peso").value;
    const estatura = document.getElementById("estatura").value;
    const sexo     = document.getElementById("sexo").value;
    if (!edad || !peso || !estatura || !sexo) {
      mostrarMensaje("Campos incompletos", "Completa edad, peso, estatura y sexo para continuar.");
      return;
    }
    const error = Nutricion.validar({ edad: +edad, peso: +peso, estatura: +estatura });
    if (error) { mostrarMensaje("Revisa tus datos", error); return; }
  }
  if (n === 3) {
    if (!document.getElementById("actividad").value) {
      mostrarMensaje("Falta un dato", "Selecciona tu nivel de actividad física.");
      return;
    }
  }

  [1, 2, 3].forEach(i => {
    const panel = document.getElementById(`panel-${i}`);
    if (panel) panel.classList.toggle("oculto", i !== n);
  });

  [1, 2, 3].forEach(i => {
    const stepEl = document.getElementById(`step-${i}`);
    const circle = stepEl?.querySelector(".step-circle");
    if (!stepEl || !circle) return;
    stepEl.classList.remove("active", "done");
    if (i < n) {
      stepEl.classList.add("done");
      circle.textContent = "✓";
    } else {
      if (i === n) stepEl.classList.add("active");
      circle.textContent = i;
    }
  });

  document.getElementById("line-1-2")?.classList.toggle("done", n > 1);
  document.getElementById("line-2-3")?.classList.toggle("done", n > 2);

  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.irPaso = irPaso;

document.addEventListener("DOMContentLoaded", function () {
  const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
  if (datosGuardados) {
    document.querySelector("#peso").value      = datosGuardados.peso       || "";
    document.querySelector("#estatura").value  = datosGuardados.estatura   || "";
    document.querySelector("#edad").value      = datosGuardados.edad       || "";
    document.querySelector("#sexo").value      = datosGuardados.sexo       || "";
    document.querySelector("#actividad").value = datosGuardados.actividad  || "";
    document.querySelector("#enfermedad").value= datosGuardados.enfermedad || "";
    document.querySelector("#objetivo").value  = datosGuardados.objetivo   || "";
  }

  const sexoSelect       = document.getElementById("sexo");
  const estadoFemenino   = document.getElementById("estadoFemenino");
  const condicionFemenina= document.getElementById("condicionFemenina");
  const trimestreEmbarazo= document.getElementById("trimestreEmbarazo");

  function actualizarEstadoFemenino() {
    if (sexoSelect.value === "f") {
      estadoFemenino.style.display = "block";
    } else {
      estadoFemenino.style.display = "none";
      trimestreEmbarazo.style.display = "none";
      condicionFemenina.value = "ninguna";
    }
  }

  function actualizarTrimestre() {
    trimestreEmbarazo.style.display =
      condicionFemenina.value === "embarazo" ? "block" : "none";
  }

  sexoSelect.addEventListener("change", actualizarEstadoFemenino);
  condicionFemenina.addEventListener("change", actualizarTrimestre);
  actualizarEstadoFemenino();
  actualizarTrimestre();

});

// ==============================
// MODAL DE MENSAJES
// ==============================
function mostrarMensaje(titulo, mensaje) {
  const modal    = document.getElementById("modal-mensaje");
  const tituloEl = document.getElementById("modal-titulo");
  const cuerpoEl = document.getElementById("modal-contenido");
  const btnCierra= document.getElementById("cerrar-mensaje");

  tituloEl.textContent = titulo;
  cuerpoEl.innerHTML   = mensaje;
  modal.style.display  = "flex";

  btnCierra.onclick = () => (modal.style.display = "none");
}

// ==============================
// SUBMIT FORMULARIO
// ==============================
document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const peso     = parseFloat(document.querySelector("#peso").value);
  const estatura = parseFloat(document.querySelector("#estatura").value);
  const edad     = parseFloat(document.querySelector("#edad").value);
  const sexo     = document.querySelector("#sexo").value;
  const actividad= document.querySelector("#actividad").value;
  const enfermedad = document.getElementById("enfermedad").value;
  const objetivo   = document.getElementById("objetivo").value;
  const condicion  = document.getElementById("condicionFemenina").value;
  const trimestre  = document.getElementById("trimestre")?.value || "1";

  if (!peso || !estatura || !edad || !sexo || !actividad) {
    mostrarMensaje("Campos incompletos", "Por favor completa todos los campos obligatorios.");
    return;
  }

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo, condicion, trimestre };
  const error = Nutricion.validar(datos);
  if (error) { mostrarMensaje("Revisa tus datos", error); return; }

  // Se conservan nombre, correo, etc. si ya había sesión
  const previo = JSON.parse(localStorage.getItem("datosUsuario") || "{}") || {};
  localStorage.setItem("datosUsuario", JSON.stringify({ ...previo, ...datos }));

  // Todas las fórmulas están en js/nutricion.js
  const res = Nutricion.calcular(datos);
  const get = res.kcal;
  const proteinaMin = res.protMin, proteinaMax = res.protMax;
  const gramosCarbohidrato = res.carbs, gramosGrasa = res.grasas;
  const kcalProteina = res.prot * 4, kcalCarbohidrato = res.carbs * 4, kcalGrasa = res.grasas * 9;

  document.getElementById("res-avisos").replaceChildren(...res.avisos.map(t => {
    const li = document.createElement("li");
    li.textContent = t;
    return li;
  }));

  // ==============================
  // MOSTRAR RESULTADOS
  // ==============================
  localStorage.setItem("caloriasObjetivo", Math.round(get));
  document.getElementById("calorias").textContent         = Math.round(get);
  document.getElementById("proteinas").textContent        = `${Math.round(proteinaMin)} – ${Math.round(proteinaMax)}`;
  document.getElementById("carbohidratos").textContent    = Math.round(gramosCarbohidrato);
  document.getElementById("grasas").textContent           = Math.round(gramosGrasa);

  document.getElementById("caloriasProteina").textContent     = Math.round(kcalProteina);
  document.getElementById("caloriasCarbohidrato").textContent = Math.round(kcalCarbohidrato);
  document.getElementById("caloriasGrasa").textContent        = Math.round(kcalGrasa);

  document.querySelector("#resultado").classList.remove("oculto");
  document.querySelector("#formulario").classList.add("oculto");
});

// Volver a calcular
document.getElementById("btn-recalcular").addEventListener("click", () => {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
  irPaso(1);
});

// ==============================
// AVISOS POR EDAD
// ==============================
function mostrarAvisoEdad() {
  const edad  = parseInt(document.getElementById("edad").value);
  const aviso = document.getElementById("aviso-envejecimiento");

  if (!edad || edad < 0 || isNaN(edad)) { aviso.style.display = "none"; return; }

  if (edad >= 60) {
    aviso.innerHTML = `
      <div class="avisoBoton">
        <h3>60 años: ¡momento de fortalecer huesos!</h3>
        <button class="botonCerrar" type="button">X</button>
      </div>
      <p>Prioriza calcio, vitamina D y proteína para proteger masa ósea y muscular.</p>`;
  } else if (edad >= 40) {
    aviso.innerHTML = `
      <div class="avisoBoton">
        <h3>Entre 40 y 59: cuida tu metabolismo</h3>
        <button class="botonCerrar" type="button">X</button>
      </div>
      <p>La pérdida de masa muscular se acelera. Proteínas y ejercicio de fuerza son clave.</p>`;
  } else if (edad >= 30) {
    aviso.innerHTML = `
      <div class="avisoBoton">
        <strong>30+: el mejor momento para construir hábitos</strong>
        <button class="botonCerrar" type="button">X</button>
      </div>
      <p>Incorpora calcio y vitamina D. Pequeños ajustes ahora generan grandes resultados a futuro.</p>`;
  } else {
    aviso.style.display = "none";
    return;
  }

  aviso.style.cssText = "background:#d0f0ff;border-left:5px solid #00bcd4;display:block;padding:10px;";

  aviso.querySelector(".botonCerrar")?.addEventListener("click", () => {
    aviso.style.display = "none";
  });
}

document.getElementById("edad").addEventListener("input", mostrarAvisoEdad);
