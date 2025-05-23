document.addEventListener("DOMContentLoaded", function () {
  const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
  if (datosGuardados) {
    document.querySelector("#peso").value = datosGuardados.peso || "";
    document.querySelector("#estatura").value = datosGuardados.estatura || "";
    document.querySelector("#edad").value = datosGuardados.edad || "";
    document.querySelector("#sexo").value = datosGuardados.sexo || "";
    document.querySelector("#actividad").value = datosGuardados.actividad || "";
    document.querySelector("#enfermedad").value =
      datosGuardados.enfermedad || "";
    document.querySelector("#objetivo").value = datosGuardados.objetivo || "";
  }

  // Mostrar/ocultar campos según sexo
  const sexoSelect = document.getElementById("sexo");
  const estadoFemenino = document.getElementById("estadoFemenino");
  const condicionFemenina = document.getElementById("condicionFemenina");
  const trimestreEmbarazo = document.getElementById("trimestreEmbarazo");

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
    if (condicionFemenina.value === "embarazo") {
      trimestreEmbarazo.style.display = "block";
    } else {
      trimestreEmbarazo.style.display = "none";
    }
  }

  sexoSelect.addEventListener("change", actualizarEstadoFemenino);
  condicionFemenina.addEventListener("change", actualizarTrimestre);

  // Llama a la función para mostrar correctamente si ya hay valores seleccionados
  actualizarEstadoFemenino();
  actualizarTrimestre();

  // Modal
  const modal = document.getElementById("modal-aviso");
  const btnCerrar = document.getElementById("cerrar-modal");
  const verAviso = document.getElementById("ver-aviso");

  modal.style.display = "block";
  btnCerrar.onclick = () => (modal.style.display = "none");
  verAviso.onclick = () => (modal.style.display = "block");
});

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const peso = parseFloat(document.querySelector("#peso").value);
  const estatura = parseFloat(document.querySelector("#estatura").value);
  const edad = parseFloat(document.querySelector("#edad").value);
  const sexo = document.querySelector("#sexo").value;
  const actividad = document.querySelector("#actividad").value;
  const enfermedad = document.getElementById("enfermedad").value;
  const objetivo = document.getElementById("objetivo").value;

  const sexoSelect = document.getElementById("sexo");
  const estadoFemenino = document.getElementById("estadoFemenino");
  const condicionFemenina = document.getElementById("condicionFemenina");
  const trimestreEmbarazo = document.getElementById("trimestreEmbarazo");

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  if (!peso || !estatura || !edad || !sexo || !actividad) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Cálculo del TMB
  let tmb =
    sexo === "f"
      ? 10 * peso + 6.25 * estatura - 5 * edad - 161
      : 10 * peso + 6.25 * estatura - 5 * edad + 5;

  const factores = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    activo: 1.725,
    muy_activo: 1.9,
  };

  let get = tmb * (factores[actividad] || 1.2) * 1.1;

  let condicion = condicionFemenina.value;
  let ajusteCalorias = 0;

  //   //embarzazo
  if (condicion === "embarazo") {
    const trimestre = document.getElementById("trimestre").value;
    if (trimestre === "2") ajusteCalorias = 340;
    else if (trimestre === "3") ajusteCalorias = 452;
  } else if (condicion === "lactancia") {
    ajusteCalorias = 500;
  }

  get += ajusteCalorias; // Aplica el ajuste

  // Ajustes por objetivo
  if (objetivo === "bajar") {
    get -= 500;
  } else if (objetivo === "subirmasa") {
    get += 500;
  }

  // Mensajes según enfermedad
  const mensajes = {
    obesidad:
      "Te recomendamos enfocarte en una alimentación equilibrada y actividad física regular. Consulta a un profesional para un plan personalizado.",
    diabetes:
      "Evita azúcares simples y prioriza carbohidratos complejos. Consulta con un nutricionista para un control adecuado.",
    renal:
      "Es importante controlar la ingesta de proteínas, potasio, fósforo y sodio. Consulta a tu nefrólogo o nutricionista.",
    hipertension:
      "Evita alimentos procesados y reduce el consumo de sal. Mantente activo y sigue el consejo médico.",
    colesterol:
      "Reduce las grasas saturadas y aumenta el consumo de fibra. Realiza actividad física regularmente.",
  };
  if (mensajes[enfermedad]) alert(mensajes[enfermedad]);

  // Distribución de macronutrientes
  let porcProte = 0.15,
    porcCarb = 0.55,
    porcGrasa = 0.3;

  if (enfermedad === "obesidad") {
    porcProte = objetivo === "bajar" ? 0.3 : 0.25;
    porcCarb = objetivo === "bajar" ? 0.35 : 0.4;
    porcGrasa = 0.35;
  } else if (enfermedad === "diabetes") {
    porcProte = 0.25;
    porcCarb = 0.4;
    porcGrasa = 0.35;
  } else if (enfermedad === "renal") {
    porcProte = 0.12;
    porcCarb = 0.58;
    porcGrasa = 0.3;
  } else if (enfermedad === "hipertension") {
    porcProte = 0.2;
    porcCarb = 0.55;
    porcGrasa = 0.25;
  } else if (enfermedad === "colesterol") {
    porcProte = 0.2;
    porcCarb = 0.5;
    porcGrasa = 0.3;
  }

  // Calorías por macronutriente
  const caloriasProteina = get * porcProte;
  const caloriasCarbohidrato = get * porcCarb;
  const caloriasGrasa = get * porcGrasa;

  const gramosProteina = caloriasProteina / 4;
  const gramosCarbohidrato = caloriasCarbohidrato / 4;
  const gramosGrasa = caloriasGrasa / 9;

  // Mostrar resultados
  document.getElementById("calorias").textContent = Math.round(get);
  document.getElementById("proteinas").textContent = Math.round(gramosProteina);
  document.getElementById("carbohidratos").textContent =
    Math.round(gramosCarbohidrato);
  document.getElementById("grasas").textContent = Math.round(gramosGrasa);

  document.getElementById("caloriasProteina").textContent =
    Math.round(caloriasProteina);
  document.getElementById("caloriasCarbohidrato").textContent =
    Math.round(caloriasCarbohidrato);
  document.getElementById("caloriasGrasa").textContent =
    Math.round(caloriasGrasa);

  document.querySelector("#resultado").classList.remove("oculto");
  document.querySelector("#formulario").classList.add("oculto");
});

// Botón volver a calcular
document.getElementById("btn-recalcular").addEventListener("click", () => {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
});
