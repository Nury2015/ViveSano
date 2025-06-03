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

  // Ajustes por objetivo
  if (objetivo === "bajar") get -= 500;
  else if (objetivo === "subirmasa") get += 500;

  // Mensajes personalizados por enfermedad
  const mensajes = {
    obesidad: {
      titulo: "Obesidad",
      texto:
        "Te recomendamos enfocarte en una alimentación equilibrada y actividad física regular. Consulta a un profesional para un plan personalizado.",
    },
    diabetes: {
      titulo: "Diabetes",
      texto:
        "Evita azúcares simples y prioriza carbohidratos complejos. Consulta con un nutricionista para un control adecuado.",
    },
    renal: {
      titulo: "Enfermedad Renal",
      texto:
        "Es importante controlar la ingesta de proteínas, potasio, fósforo y sodio. Consulta a tu nefrólogo o nutricionista.",
    },
    hipertension: {
      titulo: "Hipertensión",
      texto:
        "Evita alimentos procesados y reduce el consumo de sal. Mantente activo y sigue el consejo médico.",
    },
    colesterol: {
      titulo: "Colesterol Alto",
      texto:
        "Reduce las grasas saturadas y aumenta el consumo de fibra. Realiza actividad física regularmente.",
    },
    celiaquia: {
      texto:
        "Evita totalmente el gluten, presente en trigo, cebada y centeno, prioriza alimentos naturales como frutas, verduras, carnes magras y granos sin gluten (como arroz o quinoa).",
    },
    tiroides: {
      texto:
        "Mantén una dieta equilibrada rica en yodo, selenio y zinc. Evita el exceso de alimentos bociógenos (como la soya cruda o el repollo en exceso). Sigue las indicaciones de tu endocrinólogo y no automediques suplementos sin supervisión.",
    },
    cardiaca: {
      texto:
        "Prioriza frutas, verduras, granos integrales y grasas saludables (como aceite de oliva y aguacate). Reduce las grasas saturadas, la sal y los azúcares añadidos. Mantente activo y controla tus niveles de colesterol y presión arterial.",
    },
    digestiva: {
      texto:
        "Evita comidas muy grasosas, picantes o muy procesadas. Aumenta el consumo de fibra soluble (como la avena y frutas suaves), y bebe suficiente agua. Realiza comidas pequeñas y frecuentes.",
    },
  };

  let tituloFinal = "";
  let contenidoFinal = "";

  // Si hay mensaje por enfermedad
  if (mensajes[enfermedad]) {
    const { titulo, texto } = mensajes[enfermedad];
    tituloFinal += `Consejos personalizados`;
    contenidoFinal += `${texto}<br><br>`;
  }

  // Si el objetivo es subir masa
  if (objetivo === "subirmasa") {
    contenidoFinal +=
      "⚠️ Para aumentar masa muscular, asegúrate de acompañar esta alimentación con ejercicios de fuerza como pesas, ligas o ejercicios con tu propio peso.";
  }

  // Solo mostramos el modal si hay algo que mostrar
  if (tituloFinal || contenidoFinal) {
    mostrarMensaje(tituloFinal, contenidoFinal);
  }

  // Macronutrientes
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

  const caloriasProteina = get * porcProte;
  const caloriasCarbohidrato = get * porcCarb;
  const caloriasGrasa = get * porcGrasa;

  const gramosProteina = caloriasProteina / 4;
  const gramosCarbohidrato = caloriasCarbohidrato / 4;
  const gramosGrasa = caloriasGrasa / 9;

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

// Volver a calcular
document.getElementById("btn-recalcular").addEventListener("click", () => {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("resultado").classList.add("oculto");
});
// Función que muestra un mensaje dependiendo de la edad del usuario
function mostrarAvisoEdad() {
  const edad = parseInt(document.getElementById("edad").value);
  const aviso = document.getElementById("aviso-envejecimiento");

  // Validación básica: si no hay edad o es negativa o no es un número, no muestra nada
  if (!edad || edad < 0 || isNaN(edad)) {
    aviso.style.display = "none";
    return;
  }

  // Si el usuario tiene 60 años o más, mostramos un mensaje sarcástico divertido
  if (edad >= 60) {
    aviso.innerHTML = `
       <div class=avisoBoton>    
      
        <h3>60 años no es mucho… si fueras un árbol. 🌳</h3>
                <button class="botonCerrar" type="button">X</button>  
                
                </div>

           <p> 
        Pero como eres humano, te toca fortalecer el esqueleto antes de que empiece a sonar como una maraca. Calcio, vitamina D y colágeno al rescate.
      </p>
    `;

    const botonCerrar = aviso.querySelector(".botonCerrar");
    if (botonCerrar) {
      botonCerrar.addEventListener("click", function () {
        aviso.style.display = "none";
      });
    }
    // Si tiene entre 30 y 59 años, mostramos otro tipo de mensaje
  } else if (edad >= 40) {
    aviso.innerHTML = `
     <div class=avisoBoton> 
          <h3>⏳ ¡A moverse que el tiempo no perdona!</h3>
                  <button class="botonCerrar" type="button">X</button>
                  </div>
          <p>Entre los 40 y 59 años, los músculos pierden tono más rápido.<br>
          Prioriza una alimentación rica en proteínas y mantén la actividad física como prioridad.</p>
        `;
    const botonCerrar = aviso.querySelector(".botonCerrar");
    if (botonCerrar) {
      botonCerrar.addEventListener("click", function () {
        aviso.style.display = "none";
      });
    }
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
    // Después de insertar el HTML que contiene el botón "X"
    const botonCerrar = aviso.querySelector(".botonCerrar");
    if (botonCerrar) {
      botonCerrar.addEventListener("click", function () {
        aviso.style.display = "none";
      });
    }

    // Si tiene menos de 30 años, no mostramos ningún mensaje
  } else {
    aviso.style.display = "none";
  }
  aviso.style.backgroundColor = "#d0f0ff";
  aviso.style.borderLeft = "5px solid #00bcd4";
  aviso.style.display = "block";
  aviso.style.padding = "10px";
}

// Este evento se ejecuta automáticamente cada vez que el usuario escribe o cambia el valor del campo edad
document.getElementById("edad").addEventListener("input", mostrarAvisoEdad);
