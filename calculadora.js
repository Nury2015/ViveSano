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
  let tmb = sexo === "f"
    ? 10 * peso + 6.25 * estatura - 5 * edad - 161
    : 10 * peso + 6.25 * estatura - 5 * edad + 5;

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
  if (objetivo === "subirmasa") get += 500;
  if (objetivo === "subirmasa") {
    get += 500;
    alert("Recuerda que para aumentar masa muscular debes acompañar tu alimentación con ejercicios de fuerza.");
  }

   // Ajustes de distribución de macronutrientes
   let porcProte = 0.15, porcCarb = 0.55, porcGrasa = 0.3;

   if (enfermedad === "obesidad") {
     if (objetivo === "subir") {
       porcProte = 0.30;
       porcCarb = 0.40;
       porcGrasa = 0.30;
     } else if (objetivo === "bajar") {
       porcProte = 0.30;
       porcCarb = 0.35;
       porcGrasa = 0.35;
     } else {
       porcProte = 0.25;
       porcCarb = 0.40;
       porcGrasa = 0.35;
     }
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
