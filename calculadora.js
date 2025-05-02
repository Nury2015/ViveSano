
document.querySelector("#formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  const peso = parseFloat(document.querySelector('input[placeholder="Peso (kg)"]').value);
  const estatura = parseFloat(document.querySelector('input[placeholder="Estatura (cm)"]').value);
  const edad = parseFloat(document.querySelector('input[placeholder="Edad"]').value);
  const sexo = document.querySelector('select:nth-of-type(1)').value;
  const actividad = document.querySelector('select:nth-of-type(2)').value;

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

  const get = tmb * (factores[actividad] || 1.2);
  const proteinas = (get * 0.15 / 4).toFixed(1);
  const carbohidratos = (get * 0.55 / 4).toFixed(1);
  const grasas = (get * 0.3 / 9).toFixed(1);

  document.getElementById("formulario").style.display = "none";

  document.getElementById("calorias").textContent = `${get.toFixed(0)}`;
  document.getElementById("proteinas").textContent = `${proteinas}`;
  document.getElementById("carbohidratos").textContent = `${carbohidratos}`;
  document.getElementById("grasas").textContent = `${grasas}`;

  document.getElementById("resultado").classList.remove("oculto");
});

document.getElementById("btn-recalcular").addEventListener("click", function() {
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("formulario").style.display = "flex";
    document.getElementById("formulario").reset(); // limpia los campos
  });
  

