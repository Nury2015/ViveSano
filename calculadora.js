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
  actualizarEstadoFemenino();
  actualizarTrimestre();

  // Modal inicial
  const modal = document.getElementById("modal-aviso");
  const btnCerrar = document.getElementById("cerrar-modal");
  const verAviso = document.getElementById("ver-aviso");

  modal.style.display = "block";
  btnCerrar.onclick = () => (modal.style.display = "none");
  verAviso.onclick = () => (modal.style.display = "block");
});

// Mostrar mensajes en modal bonito
function mostrarMensaje(titulo, mensaje) {
  const modalMsj = document.getElementById("modal-mensaje");
  const modalTitulo = (document.getElementById("modal-titulo").innerHTML =
    titulo);

  const modalContenido = document.getElementById("modal-contenido");
  const modalCerrar = document.getElementById("cerrar-mensaje");

  modalTitulo.textContent = titulo;
  modalContenido.innerHTML = mensaje;
  modalMsj.style.display = "flex";

  modalCerrar.onclick = () => (modalMsj.style.display = "none");
}

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const peso = parseFloat(document.querySelector("#peso").value);
  const estatura = parseFloat(document.querySelector("#estatura").value);
  const edad = parseFloat(document.querySelector("#edad").value);
  const sexo = document.querySelector("#sexo").value;
  const actividad = document.querySelector("#actividad").value;
  const enfermedad = document.getElementById("enfermedad").value;
  const objetivo = document.getElementById("objetivo").value;
  const condicion = document.getElementById("condicionFemenina").value;

  const datos = { peso, estatura, edad, sexo, actividad, enfermedad, objetivo };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  if (!peso || !estatura || !edad || !sexo || !actividad) {
    mostrarMensaje(
      "Campos incompletos",
      "Por favor completa todos los campos obligatorios."
    );
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
  let ajusteCalorias = 0;

  if (condicion === "embarazo") {
    const trimestre = document.getElementById("trimestre").value;
    if (trimestre === "2") ajusteCalorias = 340;
    else if (trimestre === "3") ajusteCalorias = 452;
  } else if (condicion === "lactancia") {
    ajusteCalorias = 500;
  }

  get += ajusteCalorias;

  // Ajustes por objetivo (calorías)
  if (objetivo === "bajar") {
    get -= 500;
  } else if (objetivo === "masa") {
    get += 250;
  }

  // ==============================
  // PROTEÍNAS SEGÚN OBJETIVO
  // ==============================
  let proteinasMin = 0, proteinasMax = 0;

  switch (objetivo) {
    case "masa": // Aumentar masa
      proteinasMin = peso * 1.8;
      proteinasMax = peso * 2.2;
      break;
    case "tonificar": // Definir
      proteinasMin = peso * 1.6;
      proteinasMax = peso * 2.0;
      break;
    case "mantener": // Mantener
      proteinasMin = peso * 1.4;
      proteinasMax = peso * 1.6;
      break;
    case "bajar": // Bajar grasa
      proteinasMin = peso * 1.2;
      proteinasMax = peso * 1.6;
      break;
    default:
      proteinasMin = peso * 1.6;
      proteinasMax = peso * 2.0;
  }

  // Calorías de proteínas (se toma el promedio entre min y max)
  const gramosProteina = (proteinasMin + proteinasMax) / 2;
  const caloriasProteina = gramosProteina * 4;

  // Ajuste de macros
  let porcCarb = 0.55,
      porcGrasa = 0.3;

  if (objetivo === "masa") {
    porcCarb = 0.50;
    porcGrasa = 0.25;
  }

  const caloriasCarbohidrato = (get - caloriasProteina) * porcCarb;
  const caloriasGrasa = (get - caloriasProteina) * porcGrasa;

  const gramosCarbohidrato = caloriasCarbohidrato / 4;
  const gramosGrasa = caloriasGrasa / 9;

  // Mostrar resultados
  document.getElementById("calorias").textContent = Math.round(get);
  document.getElementById("proteinas").textContent =
    `${Math.round(proteinasMin)} – ${Math.round(proteinasMax)}`;
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

// Volver a calcular
document.getElementById("btn-recalcular").addEventListener("click", () => {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
});

// Avisos de edad
function mostrarAvisoEdad() {
  const edad = parseInt(document.getElementById("edad").value);
  const aviso = document.getElementById("aviso-envejecimiento");

  if (!edad || edad < 0 || isNaN(edad)) {
    aviso.style.display = "none";
    return;
  }

  if (edad >= 60) {
    aviso.innerHTML = `
       <div class=avisoBoton>    
        <h3>60 años no es mucho… si fueras un árbol. 🌳</h3>
        <button class="botonCerrar" type="button">X</button>  
      </div>
      <p>Pero como eres humano, te toca fortalecer el esqueleto antes de que empiece a sonar como una maraca. Calcio, vitamina D y colágeno al rescate.</p>
    `;
  } else if (edad >= 40) {
    aviso.innerHTML = `
     <div class=avisoBoton> 
        <h3>⏳ ¡A moverse que el tiempo no perdona!</h3>
        <button class="botonCerrar" type="button">X</button>
      </div>
      <p>Entre los 40 y 59 años, los músculos pierden tono más rápido.<br>
      Prioriza una alimentación rica en proteínas y mantén la actividad física como prioridad.</p>
    `;
  } else if (edad >= 30) {
    aviso.innerHTML = `
       <div class=avisoBoton> 
        <strong>💪 Juventud acumulada detectada:</strong>
        <button class="botonCerrar" type="button">X</button>
      </div>
      <p>
        Tu cuerpo ya no se regenera como cuando tenías 20... ¡pero aún puedes con todo!<br>
        Te recomendamos aumentar el calcio, la vitamina D y no ignorar esos “cracks” al estirarte 😅.
      </p>
    `;
  } else {
    aviso.style.display = "none";
  }

  aviso.style.backgroundColor = "#d0f0ff";
  aviso.style.borderLeft = "5px solid #00bcd4";
  aviso.style.display = "block";
  aviso.style.padding = "10px";

  const botonCerrar = aviso.querySelector(".botonCerrar");
  if (botonCerrar) {
    botonCerrar.addEventListener("click", function () {
      aviso.style.display = "none";
    });
  }
}

document.getElementById("edad").addEventListener("input", mostrarAvisoEdad);

// hamburguesa
const btnMenu = document.getElementById("btn-menu");
const menu = document.querySelector(".menu");

btnMenu.addEventListener("click", () => {
  menu.classList.toggle("activo");
});

