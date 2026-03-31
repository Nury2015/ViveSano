// ===============================
// LIMPIAR NÚMEROS
// ===============================
function limpiarNumero(valor) {
  if (!valor) return 0;
  return parseFloat(valor.toString().replace(",", "."));
}

// ===============================
// CARGAR Y NORMALIZAR
// ===============================
let alimentos = [];

fetch("alimentos.json")
  .then(res => res.json())
  .then(data => {
    alimentos = data;
    console.log("Alimentos cargados ✅");

    // 🔥 GENERAR RECETAS AQUÍ (CUANDO YA ESTÁ TODO LISTO)
    if (typeof mostrarRecetas === "function") {
      mostrarRecetas();
    }
  });


// ===============================
// CLASIFICADORES
// ===============================
const esProteina = a => a.categoria.some(c => c.toLowerCase().includes("prote"));
const esCarbo = a => a.categoria.some(c =>
  c.toLowerCase().includes("cereal") ||
  c.toLowerCase().includes("tuberc") ||
  c.toLowerCase().includes("grano")
);
const esGrasa = a => a.categoria.some(c => c.toLowerCase().includes("grasa") || c.toLowerCase().includes("semilla"));
const esVerdura = a => a.categoria.some(c =>
  c.toLowerCase().includes("verdura") ||
  c.toLowerCase().includes("hoja") ||
  c.toLowerCase().includes("bulbo")
);
const esFruta = a => a.categoria.some(c => c.toLowerCase().includes("fruta"));
const esLacteo = a => a.categoria.some(c => c.toLowerCase().includes("lácteo"));


// ===============================
// FILTROS POR ENFERMEDAD
// ===============================
function filtrarSalud(lista, enfermedad) {

  if (!enfermedad || enfermedad === "ninguna") return lista;

  return lista.filter(a => {

    const contra = a.contraindicaciones?.join(" ").toLowerCase() || "";

    if (enfermedad.includes("diabetes")) {
      return a.indice_glucemico < 55;
    }

    if (enfermedad.includes("hipertension")) {
      return !contra.includes("sal");
    }

    if (enfermedad.includes("colesterol")) {
      return a.grasas < 20;
    }

    if (enfermedad.includes("celiaca")) {
      return !a.categoria.some(c => c.toLowerCase().includes("gluten"));
    }

    if (enfermedad.includes("digestivos")) {
      return !esLacteo(a);
    }

    if (enfermedad.includes("renal")) {
      return a.proteinas < 20;
    }

    return true;
  });
}


// ===============================
// DESAYUNOS CON HUEVO 🍳
// ===============================
function generarDesayuno() {

  const recetas = [

    {
      nombre: "Huevos revueltos con pan integral y fruta",
      ingredientes: [
        "2 huevos",
        "2 rebanadas de pan integral",
        "1 fruta (manzana o papaya)"
      ],
      preparacion: [
        "Bate los huevos con un poco de sal",
        "Cocínalos en sartén antiadherente",
        "Sirve con pan tostado",
        "Acompaña con fruta fresca"
      ]
    },

    {
      nombre: "Omelette con verduras y arepa",
      ingredientes: [
        "2 huevos",
        "½ taza de verduras (espinaca, tomate)",
        "1 arepa pequeña"
      ],
      preparacion: [
        "Bate los huevos",
        "Agrega verduras picadas",
        "Cocina tipo omelette",
        "Sirve con arepa caliente"
      ]
    },

    {
      nombre: "Huevos cocidos con avena y banano",
      ingredientes: [
        "2 huevos cocidos",
        "½ taza de avena",
        "1 banano"
      ],
      preparacion: [
        "Hierve los huevos por 10 minutos",
        "Prepara la avena con agua o leche vegetal",
        "Sirve con rodajas de banano"
      ]
    }

  ];

  return recetas[Math.floor(Math.random() * recetas.length)];
}


// ===============================
// ALMUERZO / CENA INTELIGENTE
// ===============================
function generarComida(tipo) {

  const usuario = JSON.parse(localStorage.getItem("datosUsuario"));
  let filtrados = filtrarSalud(alimentos, usuario.enfermedad);

  const proteina = filtrados.find(esProteina);
  const carbo = filtrados.find(esCarbo);
  const verdura = filtrados.find(esVerdura);
  const grasa = filtrados.find(esGrasa);

  if (!proteina || !carbo || !verdura) return null;

  return {
    nombre: `${proteina.nombre} con ${carbo.nombre} y ${verdura.nombre}`,
    ingredientes: [
      `150g de ${proteina.nombre}`,
      `1 porción de ${carbo.nombre}`,
      `1 taza de ${verdura.nombre}`,
      grasa ? `1 cucharada de ${grasa.nombre}` : ""
    ],
    preparacion: [
      `Cocina ${proteina.nombre} a la plancha`,
      `Prepara ${carbo.nombre} (hervido o asado)`,
      `Saltea ${verdura.nombre}`,
      `Mezcla todo y sirve`
    ]
  };
}


// ===============================
// PLAN DIARIO COMPLETO
// ===============================
function generarPlanDiario() {

  return {
    desayuno: generarDesayuno(),
    almuerzo: generarComida("almuerzo"),
    cena: generarComida("cena")
  };
}


// ===============================
// IMAGEN AUTOMÁTICA
// ===============================
function imagenReceta(nombre) {
  return `https://source.unsplash.com/400x300/?${nombre},food`;
}

function macrosPorComida() {
  const calorias = parseInt(document.getElementById("calorias").textContent);
  const proteinas = parseInt(document.getElementById("proteinas").textContent);
  const carbs = parseInt(document.getElementById("carbohidratos").textContent);
  const grasas = parseInt(document.getElementById("grasas").textContent);

  return {
    desayuno: {
      proteinas: proteinas * 0.3,
      carbs: carbs * 0.3,
      grasas: grasas * 0.3
    },
    almuerzo: {
      proteinas: proteinas * 0.4,
      carbs: carbs * 0.4,
      grasas: grasas * 0.4
    },
    cena: {
      proteinas: proteinas * 0.3,
      carbs: carbs * 0.3,
      grasas: grasas * 0.3
    }
  };
}
function macrosPorComida() {
  const calorias = parseInt(document.getElementById("calorias").textContent);
  const proteinas = parseInt(document.getElementById("proteinas").textContent);
  const carbs = parseInt(document.getElementById("carbohidratos").textContent);
  const grasas = parseInt(document.getElementById("grasas").textContent);

  return {
    desayuno: {
      proteinas: proteinas * 0.3,
      carbs: carbs * 0.3,
      grasas: grasas * 0.3
    },
    almuerzo: {
      proteinas: proteinas * 0.4,
      carbs: carbs * 0.4,
      grasas: grasas * 0.4
    },
    cena: {
      proteinas: proteinas * 0.3,
      carbs: carbs * 0.3,
      grasas: grasas * 0.3
    }
  };
}

function ajustarIngredientes(proteina, carbo, grasa, objetivos) {

  const gramosProteina = calcularCantidad(
    objetivos.proteinas,
    proteina.proteinas
  );

  const gramosCarbo = calcularCantidad(
    objetivos.carbs,
    carbo.carbohidratos
  );

  const gramosGrasa = calcularCantidad(
    objetivos.grasas,
    grasa.grasas
  );

  return [
    `${Math.round(gramosProteina)}g de ${proteina.nombre}`,
    `${Math.round(gramosCarbo)}g de ${carbo.nombre}`,
    `${Math.round(gramosGrasa)}g de ${grasa.nombre}`
  ];
}
function ajustarIngredientes(proteina, carbo, grasa, objetivos) {

  const gramosProteina = calcularCantidad(
    objetivos.proteinas,
    proteina.proteinas
  );

  const gramosCarbo = calcularCantidad(
    objetivos.carbs,
    carbo.carbohidratos
  );

  const gramosGrasa = calcularCantidad(
    objetivos.grasas,
    grasa.grasas
  );

  return [
    `${Math.round(gramosProteina)}g de ${proteina.nombre}`,
    `${Math.round(gramosCarbo)}g de ${carbo.nombre}`,
    `${Math.round(gramosGrasa)}g de ${grasa.nombre}`
  ];
}

function generarComidaConMacros(tipo) {

  const usuario = JSON.parse(localStorage.getItem("datosUsuario"));
  const macros = macrosPorComida()[tipo];

  let filtrados = filtrarSalud(alimentos, usuario.enfermedad);

  const proteina = filtrados.find(esProteina);
  const carbo = filtrados.find(esCarbo);
  const grasa = filtrados.find(esGrasa);
  const verdura = filtrados.find(esVerdura);

  if (!proteina || !carbo || !grasa || !verdura) return null;

  const ingredientes = ajustarIngredientes(
    proteina,
    carbo,
    grasa,
    macros
  );

  ingredientes.push(`1 taza de ${verdura.nombre}`);

  return {
    nombre: `${proteina.nombre} con ${carbo.nombre}`,
    ingredientes,
    preparacion: [
      `Cocina ${proteina.nombre} según preferencia`,
      `Prepara ${carbo.nombre}`,
      `Añade ${verdura.nombre}`,
      `Agrega la grasa saludable al final`
    ]
  };
}

// ===============================
// GENERAR RECETA (AGREGAR)
// ===============================
function generarReceta() {

  if (!alimentos || alimentos.length === 0) {
    console.warn("No hay alimentos");
    return null;
  }

  const random = (lista) => lista[Math.floor(Math.random() * lista.length)];

  const proteina = random(alimentos);
  const carbo = random(alimentos);
  const grasa = random(alimentos);

  return {
    nombre: `${proteina.nombre} con ${carbo.nombre}`,
    ingredientes: [proteina, carbo, grasa],
    calorias: parseFloat(proteina.calorias || 0) +
              parseFloat(carbo.calorias || 0) +
              parseFloat(grasa.calorias || 0)
  };
}