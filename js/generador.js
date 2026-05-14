// ==============================
// HELPERS DE PARSEO (JSON inconsistente)
// ==============================
function parseNum(val) {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  const n = parseFloat(String(val));
  return isNaN(n) ? 0 : n;
}

function getCategorias(a) {
  return a.categorias || a.categoria || [];
}

function getProteinas(a) {
  if (a.proteinas !== undefined) return parseNum(a.proteinas);
  if (a.macronutrientes) return parseNum(a.macronutrientes.proteinas);
  return 0;
}

function getGrasas(a) {
  if (a.grasas !== undefined) return parseNum(a.grasas);
  if (a.macronutrientes) return parseNum(a.macronutrientes.grasas);
  return 0;
}

function getCalorias(a) {
  if (a.calorias !== undefined) return parseNum(a.calorias);
  if (a.macronutrientes) return parseNum(a.macronutrientes.calorias);
  return 0;
}

function getIG(a) {
  const ig = a.indice_glucemico;
  if (!ig) return 35;
  if (typeof ig === "string" && isNaN(parseFloat(ig))) {
    const l = ig.toLowerCase();
    if (l === "bajo")  return 35;
    if (l === "medio") return 60;
    if (l === "alto")  return 75;
    return 35;
  }
  return parseNum(ig);
}

function getContra(a) {
  const src = a.contraindicaciones || a.restricciones || [];
  return (Array.isArray(src) ? src : [src]).join(" ").toLowerCase();
}

// ==============================
// CARGAR ALIMENTOS
// ==============================
let alimentos = [];

fetch("data/alimentos.json")
  .then(res => res.json())
  .then(data => {
    alimentos = data;
    console.log("Alimentos cargados ✅", data.length);
    if (typeof mostrarRecetas === "function") mostrarRecetas();
  });


// ==============================
// CLASIFICADORES
// ==============================
function tieneCategoria(a, lista) {
  return getCategorias(a).some(c =>
    lista.some(k => c.toLowerCase().includes(k.toLowerCase()))
  );
}

const esProteina = a => tieneCategoria(a, ["proteína animal", "proteína vegetal", "pescado", "mariscos"]);
const esCarbo    = a => tieneCategoria(a, ["cereal", "tubérculo", "legumbre", "granos"]);
const esVerdura  = a => tieneCategoria(a, ["verdura"]);
const esFruta    = a => tieneCategoria(a, ["fruta"]);
const esGrasa    = a => tieneCategoria(a, ["grasa saludable", "grasas saludables", "frutos secos", "semilla", "aceite"]);
const esLacteo   = a => tieneCategoria(a, ["lácteo", "lácteos"]);


// ==============================
// ESTADO DEL INGREDIENTE
// ==============================
function estadoIngrediente(alimento, enfermedad) {
  if (!enfermedad || enfermedad === "ninguna") return "normal";

  const ig       = getIG(alimento);
  const grasas   = getGrasas(alimento);
  const proteinas = getProteinas(alimento);
  const calorias = getCalorias(alimento);
  const contra   = getContra(alimento);

  if (enfermedad === "diabetes"     && ig >= 55 && ig < 70)              return "moderado";
  if (enfermedad === "colesterol"   && grasas >= 8 && grasas < 15)       return "moderado";
  if (enfermedad === "hipertension" && (contra.includes("sal") || contra.includes("sodio"))) return "moderado";
  if (enfermedad === "renal"        && proteinas >= 8 && proteinas < 15)  return "moderado";
  if (enfermedad === "cardiaca"     && grasas >= 5 && grasas < 10)       return "moderado";
  if (enfermedad === "obesidad"     && calorias >= 150 && calorias < 300) return "moderado";
  return "normal";
}


// ==============================
// FILTROS POR ENFERMEDAD
// ==============================
function filtrarSalud(lista, enfermedad) {
  if (!enfermedad || enfermedad === "ninguna") return lista;

  return lista.filter(a => {
    const ig       = getIG(a);
    const grasas   = getGrasas(a);
    const proteinas = getProteinas(a);
    const calorias = getCalorias(a);
    const contra   = getContra(a);
    const cats     = getCategorias(a).map(c => c.toLowerCase()).join(" ");

    if (enfermedad === "diabetes")     return ig < 55;
    if (enfermedad === "hipertension") return !contra.includes("sal") && !contra.includes("sodio");
    if (enfermedad === "colesterol")   return grasas < 8;
    if (enfermedad === "celiaquia")    return !cats.includes("gluten") && !contra.includes("gluten");
    if (enfermedad === "digestiva")    return !esLacteo(a);
    if (enfermedad === "renal")        return proteinas < 8;
    if (enfermedad === "cardiaca")     return grasas < 5;
    if (enfermedad === "obesidad")     return calorias < 150;
    if (enfermedad === "tiroides")     return !contra.includes("tiroides") && !contra.includes("bocio");
    return true;
  });
}


// ==============================
// CREAR INGREDIENTE (objeto)
// ==============================
function crearIngrediente(alimento, porcion, enfermedad) {
  return {
    nombre:          alimento.nombre,
    calorias:        getCalorias(alimento),
    proteinas:       getProteinas(alimento),
    grasas:          getGrasas(alimento),
    porcionAjustada: porcion || alimento.porcion || "",
    estado:          estadoIngrediente(alimento, enfermedad)
  };
}


// ==============================
// IMÁGENES — mapeo keyword → foto real
// Fotos directas de Unsplash (ID específico, no endpoint random)
// onerror en el HTML hace fallback a placehold.co
// ==============================
const FOTO_POR_ALIMENTO = {
  // Proteínas animales
  "pollo":    "1604503468506-a8da13d11d36",
  "pechuga":  "1604503468506-a8da13d11d36",
  "salmón":   "1512621776951-a57ef161cb07",
  "salmon":   "1512621776951-a57ef161cb07",
  "atún":     "1512621776951-a57ef161cb07",
  "atun":     "1512621776951-a57ef161cb07",
  "tilapia":  "1467003909585-2f8a72700288",
  "mojarra":  "1467003909585-2f8a72700288",
  "trucha":   "1467003909585-2f8a72700288",
  "bagre":    "1467003909585-2f8a72700288",
  "carne":    "1558030006-450675393462",
  "res":      "1558030006-450675393462",
  "ternera":  "1558030006-450675393462",
  "lomo":     "1558030006-450675393462",
  "cordero":  "1558030006-450675393462",
  "cerdo":    "1558030006-450675393462",
  "pato":     "1558030006-450675393462",
  // Huevos
  "huevo":    "1482049016688-2d3e1b311543",
  "huevos":   "1482049016688-2d3e1b311543",
  // Cereales / carbohidratos
  "avena":    "1495214783159-3364eced4fc8",
  "arroz":    "1536304929831-ee1ca9d44906",
  "papa":     "1518977676393-b03001a3b01f",
  "yuca":     "1518977676393-b03001a3b01f",
  // Lácteos
  "yogur":    "1488477181946-6428a0291777",
  "yogurt":   "1488477181946-6428a0291777",
  "leche":    "1550583724-b2692b85b150",
  // Proteínas vegetales
  "lentejas": "1547592180-85f173990554",
  "lenteja":  "1547592180-85f173990554",
  "frijol":   "1547592180-85f173990554",
  "fríjol":   "1547592180-85f173990554",
  "garbanzo": "1547592180-85f173990554",
  "tofu":     "1546069901-ba9599a7e63c",
  "quinua":   "1546069901-ba9599a7e63c",
  "soja":     "1546069901-ba9599a7e63c",
  // Frutas
  "batido":   "1505576399279-565b52d4ac71",
  "banano":   "1571771894821-ce9b6c11b08e",
  "plátano":  "1571771894821-ce9b6c11b08e",
  "manzana":  "1579613832125-5d34a13fddf4",
  "fresa":    "1543158181-e6f9f6712055",
  "fresas":   "1543158181-e6f9f6712055",
  "aguacate": "1519162808019-7de1100098c3",
  "naranja":  "1547514701-42782101795e",
  "mango":    "1601493700640-a769c49de4a7",
  "piña":     "1550258987-190a2d41a8ba",
  "uvas":     "1516535794938-54d0f57f31e3",
  // Grasas / snacks
  "nueces":   "1508061253366-f7da158b6d46",
  "almendra": "1508061253366-f7da158b6d46",
  "maní":     "1508061253366-f7da158b6d46",
  // Verduras
  "espinaca": "1540420773420-3450ac2483d7",
  "brócoli":  "1459411621453-7b03977f4bfc",
  "zanahoria":"1447175008436-054170537434",
};

const FOTO_FALLBACK = {
  desayuno: "1533089860892-a7c6f0a88666",
  once:     "1519996529931-28324d5a630e",
  almuerzo: "1504674900247-0877df9cc836",
  cena:     "1414235077428-338989a2e8c0",
};

function imagenReceta(nombreReceta, tipo) {
  const n = (nombreReceta || "").toLowerCase();
  for (const [kw, id] of Object.entries(FOTO_POR_ALIMENTO)) {
    if (n.includes(kw)) {
      return `https://images.unsplash.com/photo-${id}?w=400&h=300&fit=crop&auto=format&q=80`;
    }
  }
  const fallId = FOTO_FALLBACK[tipo] || FOTO_FALLBACK.almuerzo;
  return `https://images.unsplash.com/photo-${fallId}?w=400&h=300&fit=crop&auto=format&q=80`;
}

// URL de placeholder cuando la imagen principal falla
function imgFallback(tipo) {
  const colores = { desayuno: "ff9800", once: "8bc34a", almuerzo: "2196f3", cena: "9c27b0" };
  const color = colores[tipo] || "4caf50";
  const label = { desayuno: "Desayuno", once: "Once", almuerzo: "Almuerzo", cena: "Cena" }[tipo] || "Receta";
  return `https://placehold.co/400x300/${color}/ffffff?text=${label}`;
}


// ==============================
// GENERAR RECETA (almuerzo / cena / desayuno)
// ==============================
function generarReceta(tipoForzado) {
  if (!alimentos || alimentos.length === 0) return null;

  const usuario    = JSON.parse(localStorage.getItem("datosUsuario")) || {};
  const enfermedad = usuario.enfermedad || "ninguna";

  let filtrados = filtrarSalud(alimentos, enfermedad);
  if (!filtrados || filtrados.length === 0) filtrados = alimentos;

  const random = l => l[Math.floor(Math.random() * l.length)];

  let proteinas = filtrados.filter(esProteina);
  let carbos    = filtrados.filter(esCarbo);
  let verduras  = filtrados.filter(esVerdura);
  let frutas    = filtrados.filter(esFruta);
  let grasas    = filtrados.filter(esGrasa);
  let lacteos   = filtrados.filter(esLacteo);

  if (!proteinas.length) proteinas = filtrados;
  if (!carbos.length)    carbos    = filtrados;
  if (!verduras.length)  verduras  = filtrados;
  if (!frutas.length)    frutas    = filtrados;

  const tipo = tipoForzado || ["almuerzo", "cena"][Math.floor(Math.random() * 2)];

  // — DESAYUNO —
  if (tipo === "desayuno") {
    const huevo  = filtrados.find(a => a.nombre.toLowerCase().includes("huevo")) || random(proteinas);
    const fruta  = random(frutas);
    const carbo  = random(carbos);
    const lacteo = lacteos.length ? random(lacteos) : null;

    const ings = [
      crearIngrediente(huevo, "2 unidades", enfermedad),
      crearIngrediente(carbo, "1 porción",  enfermedad),
      crearIngrediente(fruta, "1 porción",  enfermedad),
    ];
    if (lacteo) ings.push(crearIngrediente(lacteo, "1 porción", enfermedad));

    const nombre  = `Desayuno con ${huevo.nombre}, ${carbo.nombre} y ${fruta.nombre}`;
    const totCal  = ings.reduce((s, i) => s + i.calorias, 0);
    const totProt = ings.reduce((s, i) => s + i.proteinas, 0);

    return {
      tipo, nombre,
      imagen:     imagenReceta(nombre, tipo),
      fallback:   imgFallback(tipo),
      calorias:   Math.round(totCal),
      proteinas:  Math.round(totProt),
      vegetariano: !tieneCategoria(huevo, ["proteína animal"]),
      rapido:     true,
      ingredientes: ings,
      preparacion: [
        "Cocina los huevos al gusto (revueltos, cocidos o en omelette)",
        `Sirve con ${carbo.nombre}`,
        `Acompaña con ${fruta.nombre}`,
        lacteo ? `Añade ${lacteo.nombre}` : null,
      ].filter(Boolean),
    };
  }

  // — ALMUERZO / CENA —
  const proteina = random(proteinas);
  const carbo    = random(carbos);
  const verdura  = random(verduras);
  const grasa    = grasas.length ? random(grasas) : null;

  const ings = [
    crearIngrediente(proteina, "150 g",      enfermedad),
    crearIngrediente(carbo,    "1 porción",  enfermedad),
    crearIngrediente(verdura,  "1 taza",     enfermedad),
  ];
  if (grasa) ings.push(crearIngrediente(grasa, "1 cdta.", enfermedad));

  const nombre  = `${proteina.nombre} con ${carbo.nombre} y ${verdura.nombre}`;
  const totCal  = ings.reduce((s, i) => s + i.calorias, 0);
  const totProt = ings.reduce((s, i) => s + i.proteinas, 0);

  return {
    tipo, nombre,
    imagen:     imagenReceta(nombre, tipo),
    fallback:   imgFallback(tipo),
    calorias:   Math.round(totCal),
    proteinas:  Math.round(totProt),
    vegetariano: tieneCategoria(proteina, ["proteína vegetal", "legumbre"]),
    rapido:     false,
    ingredientes: ings,
    preparacion: [
      `Cocina ${proteina.nombre} a la plancha o al vapor`,
      `Prepara ${carbo.nombre}`,
      `Saltea ${verdura.nombre}`,
      grasa ? `Agrega ${grasa.nombre} al final` : null,
    ].filter(Boolean),
  };
}


// ==============================
// GENERAR ONCE (snack)
// ==============================
function generarOnce() {
  if (!alimentos || alimentos.length === 0) return null;

  const usuario    = JSON.parse(localStorage.getItem("datosUsuario")) || {};
  const enfermedad = usuario.enfermedad || "ninguna";

  let filtrados = filtrarSalud(alimentos, enfermedad);
  if (!filtrados || filtrados.length === 0) filtrados = alimentos;

  const random = l => l[Math.floor(Math.random() * l.length)];

  const frutas  = filtrados.filter(esFruta);
  const grasas  = filtrados.filter(esGrasa);
  const lacteos = filtrados.filter(esLacteo);

  if (!frutas.length) return null;

  const fruta  = random(frutas);
  const grasa  = grasas.length  ? random(grasas)  : null;
  const lacteo = lacteos.length ? random(lacteos) : null;

  const variantes = ["fruta-nueces", "yogur-fruta", "batido", "fruta-grasa"].filter(v => {
    if (v === "fruta-nueces" && !grasa)  return false;
    if (v === "yogur-fruta"  && !lacteo) return false;
    if (v === "batido"       && !lacteo) return false;
    return true;
  });

  const variante = variantes.length ? random(variantes) : "fruta-grasa";

  let ings  = [];
  let nombre = "";

  if (variante === "fruta-nueces" || variante === "fruta-grasa") {
    ings   = [crearIngrediente(fruta, "1 porción", enfermedad)];
    nombre = fruta.nombre;
    if (grasa) {
      ings.push(crearIngrediente(grasa, "1 puñado", enfermedad));
      nombre += ` con ${grasa.nombre}`;
    }
  } else if (variante === "yogur-fruta") {
    ings   = [
      crearIngrediente(lacteo, "1 taza",    enfermedad),
      crearIngrediente(fruta,  "1 porción", enfermedad),
    ];
    nombre = `${lacteo.nombre} con ${fruta.nombre}`;
  } else if (variante === "batido") {
    const fruta2 = frutas.length > 1 ? random(frutas.filter(f => f.nombre !== fruta.nombre)) : fruta;
    ings = [
      crearIngrediente(lacteo, "1 taza",    enfermedad),
      crearIngrediente(fruta,  "½ porción", enfermedad),
    ];
    if (fruta2 && fruta2.nombre !== fruta.nombre) {
      ings.push(crearIngrediente(fruta2, "½ porción", enfermedad));
      nombre = `Batido de ${fruta.nombre} y ${fruta2.nombre}`;
    } else {
      nombre = `Batido de ${fruta.nombre}`;
    }
  }

  const totCal  = ings.reduce((s, i) => s + i.calorias, 0);
  const totProt = ings.reduce((s, i) => s + i.proteinas, 0);

  return {
    tipo:        "once",
    nombre,
    imagen:      imagenReceta(nombre, "once"),
    fallback:    imgFallback("once"),
    calorias:    Math.round(totCal),
    proteinas:   Math.round(totProt),
    vegetariano: true,
    rapido:      true,
    ingredientes: ings,
    preparacion: [
      `Lava y corta ${fruta.nombre}`,
      ings.length > 1 ? `Combina con ${ings[1].nombre}` : "Sirve fresco",
      "Disfruta como snack a media mañana o media tarde",
    ],
  };
}
