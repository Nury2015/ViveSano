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

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  if (!peso || !estatura || !edad || !sexo || !actividad) {
    mostrarMensaje("Campos incompletos", "Por favor completa todos los campos obligatorios.");
    return;
  }

  // ==============================
  // TMB — Mifflin-St Jeor (1990)
  // La ecuación más precisa para población general
  // Hombre : (10 × kg) + (6.25 × cm) - (5 × años) + 5
  // Mujer  : (10 × kg) + (6.25 × cm) - (5 × años) - 161
  // ==============================
  const tmb = sexo === "f"
    ? 10 * peso + 6.25 * estatura - 5 * edad - 161
    : 10 * peso + 6.25 * estatura - 5 * edad + 5;

  // ==============================
  // GET — Gasto energético total
  // Factor de actividad según Ainsworth et al.
  // ==============================
  const factores = {
    sedentario: 1.2,
    ligero:     1.375,
    moderado:   1.55,
    activo:     1.725,
    muy_activo: 1.9,
  };

  let get = tmb * (factores[actividad] || 1.2);

  // Ajuste embarazo / lactancia (OMS, 2004)
  if (condicion === "embarazo") {
    if (trimestre === "2") get += 340;
    else if (trimestre === "3") get += 452;
    // 1er trimestre: sin ajuste calórico (OMS)
  } else if (condicion === "lactancia") {
    get += 500;
  }

  // ==============================
  // AJUSTE POR OBJETIVO
  // ==============================
  if (objetivo === "bajar")      get -= 500; // Déficit ~500 kcal → pierde ~0.5 kg/semana
  else if (objetivo === "masa")  get += 300; // Superávit limpio → mínimo acúmulo de grasa
  else if (objetivo === "tonificar") get -= 200; // Déficit leve → preserva músculo

  // ==============================
  // PROTEÍNAS (ISSN Position Stand 2017 + Helms et al. 2014)
  // Rango según objetivo expresado en g/kg de peso corporal
  // ==============================
  let proteinaMin, proteinaMax;

  switch (objetivo) {
    case "masa":
      proteinaMin = peso * 1.8; // 1.8–2.2 g/kg: hipertrofia
      proteinaMax = peso * 2.2;
      break;
    case "tonificar":
      proteinaMin = peso * 2.0; // 2.0–2.4 g/kg: definición muscular
      proteinaMax = peso * 2.4;
      break;
    case "bajar":
      proteinaMin = peso * 1.8; // 1.8–2.2 g/kg: preservar masa en déficit
      proteinaMax = peso * 2.2;
      break;
    case "mantener":
    default:
      proteinaMin = peso * 1.6; // 1.6–2.0 g/kg: mantenimiento
      proteinaMax = peso * 2.0;
  }

  const gramosProteina  = (proteinaMin + proteinaMax) / 2;
  const kcalProteina    = gramosProteina * 4;

  // ==============================
  // GRASAS (AMDR / Dietary Guidelines 2020-2025)
  // 25–30 % de las calorías totales
  // ==============================
  const porcGrasa  = (objetivo === "mantener") ? 0.30 : 0.25;
  const kcalGrasa  = get * porcGrasa;
  const gramosGrasa= kcalGrasa / 9;

  // ==============================
  // CARBOHIDRATOS — calorías restantes
  // Garantiza que los 3 macros sumen exactamente al 100 %
  // ==============================
  const kcalCarbohidrato  = Math.max(0, get - kcalProteina - kcalGrasa);
  const gramosCarbohidrato = kcalCarbohidrato / 4;

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
