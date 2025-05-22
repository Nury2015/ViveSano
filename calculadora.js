document.addEventListener("DOMContentLoaded", function () {
  const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
  if (datosGuardados) {
    document.querySelector("#peso").value = datosGuardados.peso || "";
    document.querySelector("#estatura").value = datosGuardados.estatura || "";
    document.querySelector("#edad").value = datosGuardados.edad || "";
    document.querySelector("#sexo").value = datosGuardados.sexo || "";
    document.querySelector("#actividad").value = datosGuardados.actividad || "";
    document.querySelector("#enfermedad").value = datosGuardados.enfermedad || "";
    document.querySelector("#objetivo").value = datosGuardados.objetivo || "";
  }

  // Modal
  const modal = document.getElementById("modal-aviso");
  const btnCerrar = document.getElementById("cerrar-modal");
  const verAviso = document.getElementById("ver-aviso");

  modal.style.display = "block";
  btnCerrar.onclick = () => modal.style.display = "none";
  verAviso.onclick = () => modal.style.display = "block";
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

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  if (!peso || !estatura || !edad || !sexo || !actividad) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Cálculo del TMB
  let tmb = (sexo === "f")
    ? 10 * peso + 6.25 * estatura - 5 * edad - 161
    : 10 * peso + 6.25 * estatura - 5 * edad + 5;

  const factores = {
    "sedentario": 1.2,
    "ligero": 1.375,
    "moderado": 1.55,
    "activo": 1.725,
    "muy_activo": 1.9
  };

  let get = tmb * (factores[actividad] || 1.2) * 1.1;

  // Ajustes por objetivo
  if (objetivo === "bajar") {
    get -= 500;
  } else if (objetivo === "subirmasa") {
    get += 500;
  }

  // Mensajes según enfermedad
  const mensajes = {
    obesidad: "Te recomendamos enfocarte en una alimentación equilibrada y actividad física regular. Consulta a un profesional para un plan personalizado.",
    diabetes: "Evita azúcares simples y prioriza carbohidratos complejos. Consulta con un nutricionista para un control adecuado.",
    renal: "Es importante controlar la ingesta de proteínas, potasio, fósforo y sodio. Consulta a tu nefrólogo o nutricionista.",
    hipertension: "Evita alimentos procesados y reduce el consumo de sal. Mantente activo y sigue el consejo médico.",
    colesterol: "Reduce las grasas saturadas y aumenta el consumo de fibra. Realiza actividad física regularmente.",
  };
  if (mensajes[enfermedad]) alert(mensajes[enfermedad]);

  // Distribución de macronutrientes
  let porcProte = 0.15, porcCarb = 0.55, porcGrasa = 0.3;

  if (enfermedad === "obesidad") {
    porcProte = objetivo === "bajar" ? 0.30 : 0.25;
    porcCarb = objetivo === "bajar" ? 0.35 : 0.40;
    porcGrasa = 0.35;
  } else if (enfermedad === "diabetes") {
    porcProte = 0.25; porcCarb = 0.40; porcGrasa = 0.35;
  } else if (enfermedad === "renal") {
    porcProte = 0.12; porcCarb = 0.58; porcGrasa = 0.30;
  } else if (enfermedad === "hipertension") {
    porcProte = 0.20; porcCarb = 0.55; porcGrasa = 0.25;
  } else if (enfermedad === "colesterol") {
    porcProte = 0.20; porcCarb = 0.50; porcGrasa = 0.30;
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
  document.getElementById("carbohidratos").textContent = Math.round(gramosCarbohidrato);
  document.getElementById("grasas").textContent = Math.round(gramosGrasa);

  document.getElementById("caloriasProteina").textContent = Math.round(caloriasProteina);
  document.getElementById("caloriasCarbohidrato").textContent = Math.round(caloriasCarbohidrato);
  document.getElementById("caloriasGrasa").textContent = Math.round(caloriasGrasa);

  document.querySelector("#resultado").classList.remove("oculto");
  document.querySelector("#formulario").classList.add("oculto");
});

// Botón volver a calcular
document.getElementById("btn-recalcular").addEventListener("click", () => {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
});


