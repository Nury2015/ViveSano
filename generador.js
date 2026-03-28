// ===============================
// CARGAR INGREDIENTES
// ===============================
let alimentos = [];
fetch("alimentos.json")
  .then(res => res.json())
  .then(data => {
    alimentos = data;
    console.log("Alimentos cargados ✅");

    // 👇 GENERAR RECETAS AQUÍ (CLAVE)
    if (typeof mostrarRecetas === "function") {
      mostrarRecetas();
    }
  });


// ===============================
// FILTRAR POR ENFERMEDAD (INTELIGENTE)
// ===============================
function filtrarPorEnfermedad(lista, enfermedad) {
  if (!enfermedad || enfermedad === "ninguna") return lista;

  return lista
    .map(alimento => {
      let estado = "seguro"; // por defecto

      if (enfermedad === "diabetes") {

        const contra = alimento.contraindicaciones.join(" ").toLowerCase();

        // ❌ eliminar solo los extremos
        if (alimento.indice_glucemico >= 70) return null;

        // ⚠️ marcar como moderado
        if (contra.includes("moderar") || contra.includes("diabetes")) {
          estado = "moderado";
        }
    }

      return { ...alimento, estado };
    })
    .filter(Boolean); // elimina los null
}

// ===============================
// GENERAR RECETA AUTOMÁTICA
// ===============================
function generarReceta() {
  const usuario = JSON.parse(localStorage.getItem("datosUsuario"));

  if (!usuario) {
    alert("Primero debes usar la calculadora 😅");
    return null;
  }

  // Filtrar alimentos según enfermedad
let filtrados = filtrarPorEnfermedad(alimentos, usuario.enfermedad);

 if (filtrados.length === 0) {
  console.warn("Filtro muy estricto, usando todos los alimentos");
  filtrados = alimentos;
}

 // ===============================
// SEPARAR POR TIPO (MÁS FLEXIBLE)
// ===============================
const proteinas = filtrados.filter(a => a.proteinas > 1);
const carbos = filtrados.filter(a => a.carbohidratos > 5);
const grasas = filtrados.filter(a => a.grasas > 1);

// Función para elegir aleatorio seguro
function random(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// ===============================
// ELEGIR INGREDIENTES SIN FALLAR
// ===============================
const proteina = proteinas.length ? random(proteinas) : random(filtrados);
const carbo = carbos.length ? random(carbos) : random(filtrados);
const grasa = grasas.length ? random(grasas) : random(filtrados);

// ===============================
// CREAR RECETA
// ===============================
const receta = {
  nombre: `${proteina.nombre} con ${carbo.nombre}`,
  ingredientes: [proteina, carbo, grasa],
  calorias: proteina.calorias + carbo.calorias + grasa.calorias
};
  return receta;
}


// ===============================
// AJUSTAR PORCIONES SEGÚN USUARIO
// ===============================
function ajustarPorciones(receta, usuario) {
  const objetivoCalorias = parseInt(document.getElementById("calorias")?.textContent) || 2000;

  const factor = objetivoCalorias / receta.calorias;

  receta.ingredientes = receta.ingredientes.map(ing => ({
    ...ing,
    porcionAjustada: `x${factor.toFixed(1)}`
  }));

  receta.calorias = Math.round(receta.calorias * factor);

  return receta;
}


// ===============================
// CREAR RECETA (BOTÓN)
// ===============================
function crearReceta() {
  if (alimentos.length === 0) {
    alert("Espera un momento, cargando alimentos...");
    return;
  }

  let receta = generarReceta();
  if (!receta) return;

  const usuario = JSON.parse(localStorage.getItem("datosUsuario"));

  receta = ajustarPorciones(receta, usuario);

  // Guardar receta actual
  localStorage.setItem("recetaActual", JSON.stringify(receta));

  // Ir a la página de receta
  window.location.href = "detalleDeReceta.html";
}


// ===============================
// GUARDAR EN HISTORIAL
// ===============================
function guardarReceta() {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  const receta = JSON.parse(localStorage.getItem("recetaActual"));

  historial.push(receta);

  localStorage.setItem("historial", JSON.stringify(historial));

  alert("Receta guardada 💚");
}