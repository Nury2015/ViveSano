document.addEventListener("DOMContentLoaded", function () {
  const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
  if (datosGuardados) {
    document.querySelector('input[placeholder="Peso (kg)"]').value = datosGuardados.peso || "";
    document.querySelector('input[placeholder="Estatura (cm)"]').value = datosGuardados.estatura || "";
    document.querySelector('input[placeholder="Edad"]').value = datosGuardados.edad || "";
    document.querySelector('select:nth-of-type(1)').value = datosGuardados.sexo || "";
    document.querySelector('select:nth-of-type(2)').value = datosGuardados.actividad || "";

    if (datosGuardados.enfermedad) {
      document.getElementById("enfermedad").value = datosGuardados.enfermedad;
    }
    if (datosGuardados.objetivo) {
      document.getElementById("objetivo").value = datosGuardados.objetivo;
    }
  }
});

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const peso = parseFloat(document.querySelector('input[placeholder="Peso (kg)"]').value);
  const estatura = parseFloat(document.querySelector('input[placeholder="Estatura (cm)"]').value);
  const edad = parseFloat(document.querySelector('input[placeholder="Edad"]').value);
  const sexo = document.querySelector('select:nth-of-type(1)').value;
  const actividad = document.querySelector('select:nth-of-type(2)').value;
  const enfermedad = document.getElementById("enfermedad")?.value || "";
  const objetivo = document.getElementById("objetivo")?.value || "";

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  // Calcular TMB
  let tmb;
if (sexo === "f") {
  tmb = 10 * peso + 6.25 * estatura - 5 * edad - 161; //mujeres
} else {
  tmb = 10 * peso + 6.25 * estatura - 5 * edad + 5;  //hombres
}

  const factores = {
    "sedentario": 1.2,
    "ligero": 1.375,
    "moderado": 1.55,
    "activo": 1.725,
    "muy_activo": 1.9
  };

  let get = tmb * (factores[actividad] || 1.2);

  // Ajustes por objetivo
  if (objetivo === "bajar") get -= 500;

if (objetivo === "subirmasa") {
  get += 500;
  alert("Recuerda que para aumentar masa muscular debes acompañar tu alimentación con ejercicios de fuerza.");
}

  // Mensajes personalizados
let mensaje = "";

if (objetivo === "subirmasa") {
  mensaje = "Recuerda que para aumentar masa muscular debes acompañar tu alimentación con ejercicios de fuerza.";
}

if (enfermedad === "obesidad") {
  mensaje = "Te recomendamos enfocarte en una alimentación equilibrada y actividad física regular. Consulta a un profesional para un plan personalizado.";
}
if (enfermedad === "diabetes") {
  mensaje = "Evita azúcares simples y prioriza carbohidratos complejos. Consulta con un nutricionista para un control adecuado.";
}
if (enfermedad === "renal") {
  mensaje = "Es importante controlar la ingesta de proteínas, potasio, fósforo y sodio. Consulta a tu nefrólogo o nutricionista.";
}
if (enfermedad === "hipertension") {
  mensaje = "Evita alimentos procesados y reduce el consumo de sal. Mantente activo y sigue el consejo médico.";
}
if (enfermedad === "colesterol") {
  mensaje = "Reduce las grasas saturadas y aumenta el consumo de fibra. Realiza actividad física regularmente.";
}
// Mostrar el mensaje si existe
if (mensaje) alert(mensaje);


   // Ajustes de distribución de macronutrientes
   // Ajustes de distribución de macronutrientes
let porcProte = 0.15, porcCarb = 0.55, porcGrasa = 0.3;

if (enfermedad === "obesidad") {
  if (objetivo === "bajar") {
    porcProte = 0.30;
    porcCarb = 0.35;
    porcGrasa = 0.35;
  } else {
    porcProte = 0.25;
    porcCarb = 0.40;
    porcGrasa = 0.35;
  }
} else if (enfermedad === "diabetes") {
  // Control de carbohidratos
  porcProte = 0.25;
  porcCarb = 0.40;
  porcGrasa = 0.35;
} else if (enfermedad === "renal") {
  // Reducir proteína y potasio (aunque el potasio lo controlarás por recetas)
  porcProte = 0.12;
  porcCarb = 0.58;
  porcGrasa = 0.30;
} else if (enfermedad === "hipertension") {
  // Menos grasas saturadas, más carbohidratos complejos
  porcProte = 0.20;
  porcCarb = 0.55;
  porcGrasa = 0.25;
} else if (enfermedad === "colesterol") {
  // Menos grasa total y más fibra (carbs buenos)
  porcProte = 0.20;
  porcCarb = 0.60;
  porcGrasa = 0.20;
} else if (objetivo === "subir") {
  porcProte = 0.25;
  porcCarb = 0.50;
  porcGrasa = 0.25;
} else if (objetivo === "bajar") {
  porcProte = 0.25;
  porcCarb = 0.45;
  porcGrasa = 0.30;
} else if (objetivo === "saludable") {
  porcProte = 0.20;
  porcCarb = 0.50;
  porcGrasa = 0.30;
} else if (objetivo === "enfermedad") {
  porcProte = 0.25;
  porcCarb = 0.45;
  porcGrasa = 0.30;
}

  // Cálculo de macronutrientes
  const proteinas = (get * porcProte / 4).toFixed(1);
  const carbohidratos = (get * porcCarb / 4).toFixed(1);
  const grasas = (get * porcGrasa / 9).toFixed(1);

  // Mostrar resultados
  document.getElementById("formulario").style.display = "none";
  document.getElementById("calorias").textContent = `${get.toFixed(0)}`;
  document.getElementById("proteinas").textContent = `${proteinas}`;
  document.getElementById("carbohidratos").textContent = `${carbohidratos}`;
  document.getElementById("grasas").textContent = `${grasas}`;
  document.getElementById("resultado").classList.remove("oculto");
});

document.getElementById("btn-recalcular").addEventListener("click", function () {
  document.getElementById("resultado").classList.add("oculto");
  document.getElementById("formulario").style.display = "flex";
});



document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-aviso");
  const cerrar = document.getElementById("cerrar-modal");
  const verAviso = document.getElementById("ver-aviso");

  const aceptoAviso = localStorage.getItem("aceptoAvisoLegal");
  console.log("holaa")
  console.log(aceptoAviso)

  if (!aceptoAviso) {
    modal.style.display = "flex";
  }
  else{
    modal.style.display = "none";
  }

  cerrar.addEventListener("click", function () {
    modal.style.display = "none";
    console.log("Hola");
    localStorage.setItem("aceptoAvisoLegal", "true");
  });

  verAviso.addEventListener("click", function () {
    modal.style.display = "flex";
  });
});

