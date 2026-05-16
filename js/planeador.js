// ============================================================
// RECETAS COLOMBIANAS — adaptaciones por condición médica
// Desayunos: SIEMPRE huevo + fruta + carbohidrato
// ============================================================

const RECETAS = {

  // ════ DESAYUNOS (huevo + fruta + carbohidrato) ═══════════
  desayuno: [
    {
      id: "calentado_fruta", vegano: false, pesado: false,
      nombre: "Calentado paisa con fruta",
      descripcion: "Arroz con frijoles y huevo frito, arepa y fruta fresca — el desayuno más colombiano",
      calorias: 645, proteinas: 28, carbohidratos: 84, grasas: 16,
      foto: "1723693407562-bb4fcae76797",
      adaptaciones: {
        diabetes: "Elige naranja o fresas (IG bajo). Reduce el arroz a ½ taza.",
        hipertension: "Prepara el hogao sin sal. Omite el chicharrón si lo hay.",
        renal: "Reduce los frijoles a ¼ taza. Porción de huevo: 1 unidad.",
        celiaquia: "Todos los ingredientes son naturalmente sin gluten. ✓",
        gastritis: "Prepara el hogao suave, sin exceso de tomate ácido. Elige papaya o banano como fruta (no cítricos). Come en porción moderada.",
        embarazo: "Excelente ✓. Los frijoles aportan ácido fólico y el huevo proteína completa. Elige papaya como fruta.",
      },
      ingredientes: [
        { nombre: "Arroz blanco recalentado",           cantidad: "1 taza cocinada",        calorias: 195 },
        { nombre: "Frijoles rojos con caldo",            cantidad: "½ taza cocinada",        calorias: 110 },
        { nombre: "Huevo frito",                         cantidad: "1 unidad (55 g)",        calorias: 90  },
        { nombre: "Arepa de maíz",                       cantidad: "1 mediana (90 g)",       calorias: 150 },
        { nombre: "Naranja o papaya (fruta del día)",    cantidad: "1 unidad mediana (150 g)",calorias: 65 },
        { nombre: "Hogao (sofrito de tomate y cebolla)", cantidad: "2 cdas. (30 g)",         calorias: 35  },
      ],
      preparacion: [
        "Calienta en sartén el arroz y los frijoles sobrantes con un poco de aceite",
        "Fríe el huevo en sartén aparte con sal al gusto",
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Sirve el calentado con el huevo encima y la arepa al lado",
        "Acompaña con hogao fresco y la fruta picada o entera",
      ],
    },
    {
      id: "huevos_pericos_fruta", vegano: false, pesado: false,
      nombre: "Huevos pericos con arepa y fruta",
      descripcion: "Huevos revueltos con tomate y cebolla, arepa tostada y papaya de temporada",
      calorias: 500, proteinas: 23, carbohidratos: 56, grasas: 18,
      foto: "1525184782196-8e2ded604bf7",
      adaptaciones: {
        diabetes: "Elige papaya verde o fresas. Usa 1 solo huevo si el colesterol es alto.",
        hipertension: "Sin sal adicional en los huevos. Más cilantro para el sabor.",
        renal: "Reduce a 1 huevo. Omite el queso si lo usas.",
        celiaquia: "La arepa de maíz es sin gluten. ✓",
        gastritis: "Reduce el tomate al mínimo en el sofrito. Elige papaya o banano como fruta. Evita el café de acompañamiento.",
        embarazo: "Los huevos son esenciales en embarazo ✓. Cocínalos bien revueltos (no queden líquidos). Elige papaya como fruta.",
      },
      ingredientes: [
        { nombre: "Huevos frescos",                   cantidad: "2 unidades (110 g)", calorias: 140 },
        { nombre: "Tomate chonto y cebolla cabezona", cantidad: "½ taza (80 g)",      calorias: 30  },
        { nombre: "Arepa de maíz",                    cantidad: "1 mediana (90 g)",   calorias: 150 },
        { nombre: "Papaya o mango (fruta)",           cantidad: "1 taza picada (150 g)",calorias: 60},
        { nombre: "Chocolate caliente con leche",     cantidad: "1 taza (240 ml)",    calorias: 120 },
      ],
      preparacion: [
        "Pica el tomate y la cebolla en cuadros pequeños",
        "Saltea en aceite a fuego medio hasta ablandar (2-3 min)",
        "Bate los huevos y vierte sobre el sofrito; revuelve con espátula",
        "Sazona con sal y cilantro picado al gusto",
        "Calienta la arepa y sirve con la fruta picada al lado",
      ],
    },
    {
      id: "changua_fruta", vegano: false, pesado: false,
      nombre: "Changua bogotana con fresas",
      descripcion: "Sopa de leche con huevo pochado y almojábana — con fresas frescas de temporada",
      calorias: 430, proteinas: 20, carbohidratos: 46, grasas: 15,
      foto: "1616501268826-ee9731c915d4",
      contraindicada: ["celiaquia", "embarazo"],
      adaptaciones: {
        diabetes: "Fresas = IG bajo ✓. Usa leche descremada para reducir grasas.",
        hipertension: "Sin sal en la changua. La leche tiene sodio natural bajo.",
        digestiva: "Reemplaza la leche por caldo de pollo suave + crema de coco.",
        celiaquia: "Omite la almojábana, reemplaza por arepa de maíz.",
        gastritis: "La leche fría puede aliviar el ardor. Usa arepa en lugar de almojábana. Evita el tinto de acompañamiento.",
      },
      ingredientes: [
        { nombre: "Leche entera",              cantidad: "1½ tazas (360 ml)",  calorias: 225 },
        { nombre: "Huevo fresco",              cantidad: "1 unidad (55 g)",    calorias: 70  },
        { nombre: "Almojábana o pan",          cantidad: "1 unidad (60 g)",    calorias: 85  },
        { nombre: "Fresas frescas (fruta)",    cantidad: "1 taza (150 g)",     calorias: 50  },
        { nombre: "Cebolla larga y cilantro",  cantidad: "al gusto",           calorias: 0   },
      ],
      preparacion: [
        "Hierve la leche con cebolla larga picada y sal",
        "Rompe el huevo directamente en la leche hirviendo",
        "Tapa y cocina 2-3 min hasta que el huevo esté pochado",
        "Sirve con la almojábana o pan troceado adentro",
        "Acompaña con las fresas frescas lavadas al lado",
      ],
    },
    {
      id: "avena_huevo_fruta", vegano: false, pesado: false,
      nombre: "Avena con huevo cocido y banano",
      descripcion: "Avena cremosa con canela y panela, huevo cocido y banano fresco — energía sostenida",
      calorias: 430, proteinas: 18, carbohidratos: 64, grasas: 10,
      foto: "1581559178851-b99664da71ba",
      contraindicada: ["celiaquia", "diabetes"],
      adaptaciones: {
        diabetes: "Usa stevia en lugar de panela. Cambia banano por fresas o manzana (IG bajo).",
        hipertension: "Sin sal. La avena ayuda a reducir la presión arterial. ✓",
        celiaquia: "Verifica que la avena sea certificada sin gluten.",
        renal: "Solo 1 huevo. Reduce el banano a ½ unidad.",
        gastritis: "La avena protege la mucosa estomacal ✓. Usa banano como fruta (no cítricos). Endulza con poca panela o stevia.",
        embarazo: "La avena aporta hierro y fibra ✓. Asegura que el huevo esté bien cocido. Prefiere fresas ricas en vitamina C.",
      },
      ingredientes: [
        { nombre: "Avena en hojuelas",     cantidad: "½ taza seca (45 g)",    calorias: 150 },
        { nombre: "Leche o agua",          cantidad: "1½ tazas (360 ml)",     calorias: 75  },
        { nombre: "Huevo cocido",          cantidad: "1 unidad (55 g)",       calorias: 70  },
        { nombre: "Banano maduro (fruta)", cantidad: "1 unidad mediana (120 g)",calorias: 105},
        { nombre: "Canela y panela raspada",cantidad: "al gusto",             calorias: 30  },
      ],
      preparacion: [
        "Hierve la leche con un palito de canela; agrega la avena y revuelve 5 min",
        "Endulza con panela raspada al gusto",
        "Cocina aparte el huevo en agua hirviendo 10 min (duro) o 7 min (suave)",
        "Sirve la avena caliente con el banano en rodajas encima",
        "Acompaña con el huevo cocido pelado al lado",
      ],
    },
    {
      id: "arepa_huevo_fruta", vegano: false, pesado: false,
      nombre: "Arepa de choclo con huevo y fruta",
      descripcion: "Arepa dulce de maíz tierno con huevo frito y mango fresco — sabor del Valle del Cauca",
      calorias: 510, proteinas: 16, carbohidratos: 70, grasas: 16,
      foto: "1644753787071-8933b5daed2d",
      contraindicada: ["diabetes", "obesidad"],
      adaptaciones: {
        diabetes: "Elige naranja o fresas en lugar de mango (IG más bajo).",
        colesterol: "Usa solo 1 huevo y cocínalo hervido en vez de frito.",
        celiaquia: "La arepa de choclo es sin gluten. ✓",
        renal: "Reduce a 1 huevo. Porción de arepa: ½ unidad.",
        gastritis: "Elige banano o papaya como fruta (no mango ni cítricos). Cocina el huevo hervido o pochado en lugar de frito.",
        embarazo: "Buena opción ✓. El huevo bien cocido (frito o duro). Elige banano o papaya de fruta.",
      },
      ingredientes: [
        { nombre: "Arepa de choclo",           cantidad: "1 grande (180 g)",     calorias: 220 },
        { nombre: "Huevo frito",               cantidad: "1 unidad (55 g)",      calorias: 90  },
        { nombre: "Queso blanco campesino",    cantidad: "1 tajada (20 g)",      calorias: 70  },
        { nombre: "Mango o naranja (fruta)",   cantidad: "1 unidad mediana (150 g)",calorias: 65},
        { nombre: "Café con leche o tinto",    cantidad: "1 taza (240 ml)",      calorias: 30  },
      ],
      preparacion: [
        "Calienta la arepa de choclo en comal a fuego medio hasta dorar",
        "Coloca el queso encima y tapa para que se derrita",
        "Fríe el huevo en sartén con aceite mínimo y sal al gusto",
        "Sirve la arepa con el huevo encima",
        "Acompaña con la fruta fresca y el café",
      ],
    },
    {
      id: "chocolate_queso_arepa", vegano: false, pesado: false,
      nombre: "Chocolate santafereño con queso y arepa",
      descripcion: "Chocolate de mesa en leche, queso blanco campesino y arepa de maíz — desayuno de las abuelas bogotanas",
      calorias: 430, proteinas: 14, carbohidratos: 52, grasas: 18,
      foto: null,
      contraindicada: ["diabetes"],
      adaptaciones: {
        hipertension: "El queso campesino es moderado en sodio. Sin sal adicional.",
        colesterol: "Usa chocolate amargo y reduce el queso a 1 tajada delgada.",
        celiaquia: "La arepa de maíz es sin gluten ✓. Verifica que el chocolate sea puro cacao.",
        embarazo: "Excelente fuente de calcio (leche + queso) ✓. Modera el chocolate — tiene cafeína.",
        gastritis: "La leche caliente puede aliviar el ardor ✓. Modera la cantidad de chocolate.",
      },
      ingredientes: [
        { nombre: "Chocolate de mesa (pastilla de cacao)", cantidad: "1 pastilla (30 g)", calorias: 120 },
        { nombre: "Leche entera",                          cantidad: "1 taza (240 ml)",   calorias: 150 },
        { nombre: "Arepa de maíz",                         cantidad: "1 mediana (90 g)",  calorias: 90  },
        { nombre: "Queso blanco campesino",                cantidad: "1 tajada (35 g)",   calorias: 70  },
      ],
      preparacion: [
        "Ralla o pica la pastilla de chocolate en una olla pequeña",
        "Agrega la leche y calienta a fuego medio revolviendo constantemente",
        "Bate con molinillo hasta hacer espuma — el toque bogotano",
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Sirve el chocolate caliente con la arepa y el queso al lado",
      ],
    },
    {
      id: "revuelto_choclo_arepa", vegano: false, pesado: false,
      nombre: "Revuelto de choclo con huevo y arepa",
      descripcion: "Maíz tierno desgranado revuelto con huevo, tomate y cebolla — sabor del campo colombiano",
      calorias: 480, proteinas: 22, carbohidratos: 58, grasas: 16,
      foto: null,
      adaptaciones: {
        diabetes: "El choclo tiene IG moderado. Reduce a ½ mazorca. Evita el mango de fruta.",
        hipertension: "Sin sal adicional. El choclo es naturalmente dulce.",
        celiaquia: "Sin gluten ✓. Todos los ingredientes son naturales.",
        embarazo: "Los huevos bien cocidos aportan proteína y colina esencial ✓. Muy nutritivo.",
        gastritis: "Reduce el tomate. El choclo es suave para el estómago. Huevos bien cocidos.",
        obesidad: "Rica en proteína y baja en grasa ✓. Limita la arepa a 1 pequeña.",
      },
      ingredientes: [
        { nombre: "Maíz tierno desgranado (choclo)", cantidad: "1 mazorca (120 g)",    calorias: 130 },
        { nombre: "Huevos frescos",                   cantidad: "2 unidades (110 g)",   calorias: 140 },
        { nombre: "Tomate chonto y cebolla cabezona", cantidad: "½ taza (80 g)",        calorias: 30  },
        { nombre: "Arepa de maíz",                    cantidad: "1 mediana (90 g)",     calorias: 150 },
        { nombre: "Aceite, sal y cilantro",           cantidad: "al gusto",             calorias: 30  },
      ],
      preparacion: [
        "Saltea la cebolla y el tomate picado en aceite a fuego medio 2-3 min",
        "Agrega el maíz desgranado y cocina 3-4 minutos revolviendo",
        "Bate los huevos y vierte sobre el maíz; revuelve con espátula hasta cuajar",
        "Sazona con sal, pimienta y cilantro picado",
        "Calienta la arepa en comal y sirve al lado del revuelto",
      ],
    },
    // ── VEGANOS ────────────────────────────────────────────
    {
      id: "avena_vegana_fruta", vegano: true, pesado: false,
      nombre: "🌱 Avena vegana con fruta y semillas",
      descripcion: "Avena en leche de avena o coco, con fruta fresca y semillas de chía — desayuno 100% vegetal",
      calorias: 390, proteinas: 12, carbohidratos: 60, grasas: 12,
      foto: "1581559178851-b99664da71ba",
      contraindicada: ["celiaquia"],
      adaptaciones: {
        diabetes: "Usa fresas o arándanos (IG bajo). Endulza con stevia.",
        celiaquia: "Avena certificada sin gluten + semillas de chía. ✓",
      },
      ingredientes: [
        { nombre: "Avena en hojuelas",          cantidad: "½ taza (45 g)",         calorias: 150 },
        { nombre: "Leche de avena o de coco",   cantidad: "1½ tazas (360 ml)",     calorias: 90  },
        { nombre: "Banano o fresas (fruta)",    cantidad: "1 unidad mediana (120 g)",calorias: 100 },
        { nombre: "Semillas de chía o linaza",  cantidad: "1 cda. (10 g)",         calorias: 50  },
      ],
      preparacion: [
        "Hierve la leche vegetal con una pizca de canela",
        "Agrega la avena y cocina revolviendo 5 min a fuego medio",
        "Endulza con panela o stevia al gusto",
        "Sirve con la fruta en rodajas y las semillas de chía encima",
      ],
    },
    {
      id: "arepa_aguacate_vegana", vegano: true, pesado: false,
      nombre: "🌱 Arepa con aguacate, tomate y fruta",
      descripcion: "Arepa de maíz con aguacate cremoso, tomate fresco y fruta de temporada — vegetariano y saciante",
      calorias: 410, proteinas: 9, carbohidratos: 52, grasas: 18,
      foto: "1587603366933-aa6947174c65",
      adaptaciones: {
        diabetes: "El aguacate tiene IG = 0. Fruta: fresas o guanábana.",
        colesterol: "El aguacate tiene grasas monoinsaturadas beneficiosas. ✓",
        celiaquia: "Arepa de maíz sin gluten. ✓",
        embarazo: "El aguacate aporta ácido fólico esencial ✓. Muy recomendada en embarazo.",
      },
      ingredientes: [
        { nombre: "Arepa de maíz",             cantidad: "1 mediana (90 g)",      calorias: 150 },
        { nombre: "Aguacate hass maduro",       cantidad: "½ aguacate (80 g)",     calorias: 130 },
        { nombre: "Tomate chonto",             cantidad: "1 unidad (100 g)",      calorias: 20  },
        { nombre: "Fruta del día (fresas, mango o naranja)", cantidad: "1 porción (150 g)", calorias: 60 },
        { nombre: "Sal, limón y cilantro",     cantidad: "al gusto",              calorias: 0   },
      ],
      preparacion: [
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Machuca el aguacate con sal y limón para hacer el guacamole",
        "Unta el guacamole sobre la arepa caliente",
        "Coloca rodajas de tomate encima con sal y cilantro",
        "Acompaña con la fruta fresca picada al lado",
      ],
    },
  ],

  // ════ ONCES ══════════════════════════════════════════════
  once: [
    {
      id: "chontaduro", vegano: true, pesado: false,
      nombre: "Chontaduro con sal y limón",
      descripcion: "Fruto energético del Pacífico — rico en betacaroteno y grasas saludables",
      calorias: 150, proteinas: 3, carbohidratos: 24, grasas: 5,
      foto: null,
      ingredientes: [
        { nombre: "Chontaduro cocido",  cantidad: "4 unidades (160 g)", calorias: 150 },
        { nombre: "Sal y limón",        cantidad: "al gusto",           calorias: 0   },
      ],
      preparacion: [
        "Selecciona chontaduros de color anaranjado maduro",
        "Si están crudos cocina en agua con sal por 45 min",
        "Sirve tibios con sal y gotas de limón",
      ],
    },
    {
      id: "arepa_quesito", vegano: false, pesado: false,
      nombre: "Arepa con quesito y agua de panela",
      descripcion: "Mini arepa paisa con queso campesino y agua de panela caliente",
      calorias: 270, proteinas: 9, carbohidratos: 40, grasas: 9,
      foto: null,
      contraindicada: ["diabetes"],
      ingredientes: [
        { nombre: "Arepa de maíz pequeña", cantidad: "1 unidad (70 g)",  calorias: 160 },
        { nombre: "Queso campesino",       cantidad: "1 tajada (25 g)",  calorias: 80  },
        { nombre: "Agua de panela",        cantidad: "½ taza (120 ml)",  calorias: 30  },
      ],
      preparacion: [
        "Calienta la arepa en comal por ambos lados hasta dorar",
        "Coloca el queso campesino encima",
        "Prepara el agua de panela diluyendo panela en agua caliente",
      ],
    },
    {
      id: "frutas_limon", vegano: true, pesado: false,
      nombre: "Frutas colombianas con sal y limón",
      descripcion: "Mix tropical de mango, papaya y piña con sal, limón y ají",
      calorias: 130, proteinas: 2, carbohidratos: 31, grasas: 1,
      foto: "1519996529931-28324d5a630e",
      contraindicada: ["gastritis"],
      ingredientes: [
        { nombre: "Mango Tommy",                  cantidad: "½ unidad (120 g)",  calorias: 60  },
        { nombre: "Papaya o piña",                cantidad: "1 taza picada (150 g)",calorias: 55},
        { nombre: "Sal, limón, ají (opcional)",   cantidad: "al gusto",          calorias: 15  },
      ],
      preparacion: [
        "Pela y pica la fruta en trozos medianos",
        "Espolvorea sal al gusto y exprime limón fresco",
        "Opcional: agrega ají en polvo para el toque colombiano",
      ],
    },
    {
      id: "pandebono", vegano: false, pesado: false,
      nombre: "Pandebono vallecaucano",
      descripcion: "Pan de yuca y queso del Valle del Cauca — esponjoso y recién horneado",
      calorias: 210, proteinas: 6, carbohidratos: 30, grasas: 8,
      foto: "1559141680-d0bd7bc5af84",
      ingredientes: [
        { nombre: "Pandebono",         cantidad: "2 unidades (80 g)", calorias: 210 },
        { nombre: "Aromática o tinto", cantidad: "1 taza (240 ml)",   calorias: 0   },
      ],
      preparacion: [
        "Calienta en horno a 150°C por 5 min si está frío",
        "Sirve recién tibio con aromática de hierbas",
      ],
    },
    {
      id: "yogur_granola", vegano: false, pesado: false,
      nombre: "Yogur con granola y fruta",
      descripcion: "Yogur natural con granola crujiente y fruta fresca de temporada",
      calorias: 280, proteinas: 11, carbohidratos: 42, grasas: 7,
      foto: "1488477181946-6428a0291777",
      contraindicada: ["celiaquia"],
      ingredientes: [
        { nombre: "Yogur natural sin azúcar", cantidad: "1 taza (200 g)", calorias: 150 },
        { nombre: "Granola",                  cantidad: "3 cdas. (30 g)", calorias: 90  },
        { nombre: "Fresas o banano",          cantidad: "½ porción (80 g)",calorias: 40 },
      ],
      preparacion: [
        "Sirve el yogur frío en un recipiente",
        "Añade la granola justo antes para que quede crujiente",
        "Incorpora la fruta picada fresca encima",
      ],
    },
    {
      id: "obleas_arequipe", vegano: false, pesado: false,
      nombre: "Obleas con arequipe",
      descripcion: "Clásico colombiano: obleas crocantes con arequipe y bocadillo",
      calorias: 220, proteinas: 4, carbohidratos: 38, grasas: 6,
      foto: null,
      contraindicada: ["diabetes", "colesterol", "obesidad", "gastritis"],
      ingredientes: [
        { nombre: "Obleas",                    cantidad: "2 unidades (30 g)",  calorias: 80  },
        { nombre: "Arequipe (dulce de leche)", cantidad: "2 cdas. (40 g)",    calorias: 120 },
        { nombre: "Queso rallado o bocadillo", cantidad: "1 cda. (15 g)",     calorias: 20  },
      ],
      preparacion: [
        "Extiende arequipe sobre una oblea",
        "Añade queso rallado o bocadillo de guayaba",
        "Coloca la segunda oblea encima y sirve de inmediato",
      ],
    },
    {
      id: "bocadillo_queso", vegano: false, pesado: false,
      nombre: "Bocadillo veleño con queso blanco",
      descripcion: "Bocadillo de guayaba de Vélez con queso campesino — el clásico dulce-salado colombiano",
      calorias: 200, proteinas: 6, carbohidratos: 30, grasas: 7,
      foto: null,
      contraindicada: ["diabetes", "obesidad", "gastritis"],
      adaptaciones: {
        colesterol: "Reduce a 1 tajada de bocadillo. El queso blanco es moderado en grasa.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "El queso aporta calcio ✓. Limita el bocadillo a 1 tajada por el azúcar.",
        hipertension: "Come con moderación. El queso campesino tiene sodio natural.",
      },
      ingredientes: [
        { nombre: "Bocadillo de guayaba (Vélez)", cantidad: "2 tajadas (60 g)", calorias: 130 },
        { nombre: "Queso blanco campesino",       cantidad: "1 tajada (30 g)", calorias: 70  },
      ],
      preparacion: [
        "Corta el bocadillo en tajadas medianas",
        "Acompaña con el queso campesino fresco",
        "Sirve como once dulce-salado a media mañana o tarde",
      ],
    },
    // ── VEGANOS ────────────────────────────────────────────
    {
      id: "empanada_pipian", vegano: true, pesado: false,
      nombre: "🌱 Empanada de pipián vallecaucana",
      descripcion: "Empanada de masa de maíz rellena de papa criolla con salsa de maní — tradicional del Valle del Cauca",
      calorias: 250, proteinas: 7, carbohidratos: 34, grasas: 10,
      foto: null,
      adaptaciones: {
        diabetes: "El maíz tiene IG moderado. Limita a 1 empanada y acompaña con agua.",
        hipertension: "Sin sal extra en el relleno. Prefiere la versión horneada.",
        celiaquia: "La masa de maíz es sin gluten ✓. Verifica que la masarepa sea certificada.",
        embarazo: "Fuente de carbohidratos y grasa vegetal ✓. Prefiere la versión al horno.",
        gastritis: "Hornea en lugar de freír. Evita el ají de acompañamiento.",
        obesidad: "Hornea en vez de freír para reducir calorías. Limita a 1 unidad.",
        renal: "El maní aporta proteína vegetal moderada. Limita a 1 empanada.",
      },
      ingredientes: [
        { nombre: "Masarepa (harina de maíz)",        cantidad: "80 g",          calorias: 140 },
        { nombre: "Papa criolla cocinada y machacada", cantidad: "100 g",         calorias: 70  },
        { nombre: "Maní tostado molido",              cantidad: "1 cda. (15 g)", calorias: 40  },
      ],
      preparacion: [
        "Mezcla la masarepa con agua tibia y sal hasta obtener masa suave",
        "Cocina la papa criolla, máchacala con sal y sofrito de hogao",
        "Añade el maní molido tostado al relleno de papa y mezcla bien",
        "Forma discos de masa, rellena con la mezcla y sella los bordes",
        "Fríe en aceite caliente 3-4 min por lado, o hornea a 200°C 20 min",
      ],
    },
    {
      id: "once_vegana_semillas", vegano: true, pesado: false,
      nombre: "🌱 Frutas con semillas y maní",
      descripcion: "Mix de frutas frescas con maní tostado y semillas — proteína vegetal y energía",
      calorias: 200, proteinas: 7, carbohidratos: 26, grasas: 9,
      foto: "1519996529931-28324d5a630e",
      ingredientes: [
        { nombre: "Fruta mixta (mango, banano, fresas)", cantidad: "1 taza (150 g)",   calorias: 120 },
        { nombre: "Maní tostado sin sal",                cantidad: "1 puñado (25 g)",  calorias: 80  },
      ],
      preparacion: [
        "Pica las frutas y mézclalas en un recipiente",
        "Agrega el maní tostado encima",
        "Opcional: semillas de chía o linaza",
      ],
    },
  ],

  // ════ ALMUERZOS ══════════════════════════════════════════
  almuerzo: [
    {
      id: "sancocho_pollo", vegano: false, pesado: false,
      nombre: "Sancocho de pollo",
      descripcion: "Sopa contundente con pollo, papa, yuca y mazorca — corazón de la cocina colombiana",
      calorias: 490, proteinas: 34, carbohidratos: 52, grasas: 12,
      foto: "1644753787097-37de1f3fc9b4",
      adaptaciones: {
        diabetes: "El sancocho es de IG moderado. Evita el arroz de acompañamiento.",
        hipertension: "Sin sal adicional. Usa ajo y comino para el sabor.",
        renal: "Reduce la porción de pollo a 80g. Omite la yuca.",
        gastritis: "El sancocho es una de las mejores opciones ✓. Evita el ají casero de acompañamiento. Come en porciones moderadas.",
        embarazo: "Excelente ✓. El pollo aporta proteína completa y el caldo hidrata. Muy recomendado en embarazo.",
      },
      ingredientes: [
        { nombre: "Muslo de pollo",              cantidad: "150 g",          calorias: 200 },
        { nombre: "Papa criolla y pastusa",      cantidad: "1 c/u (200 g)",  calorias: 130 },
        { nombre: "Yuca",                        cantidad: "50 g",           calorias: 65  },
        { nombre: "Mazorca (choclo)",            cantidad: "½ mazorca (80 g)",calorias: 70 },
        { nombre: "Hogao, cilantro, comino",     cantidad: "al gusto",       calorias: 25  },
      ],
      preparacion: [
        "Sofríe cebolla y tomate para el hogao base",
        "Agrega el pollo troceado y sella por todos lados",
        "Cubre con agua fría, hierve y retira la espuma",
        "Añade papa, yuca y mazorca partida",
        "Cocina 25 min hasta que todo esté tierno",
        "Sirve con cilantro fresco y ají casero",
      ],
    },
    {
      id: "arroz_pollo", vegano: false, pesado: false,
      nombre: "Arroz con pollo colombiano",
      descripcion: "Arroz amarillo con pollo guisado, arveja y patacones",
      calorias: 560, proteinas: 36, carbohidratos: 68, grasas: 11,
      foto: "1664992960082-0ea299a9c53e",
      adaptaciones: {
        diabetes: "Reduce el arroz a ½ taza. Añade más verduras al arroz.",
        hipertension: "Cocina sin sal; usa comino, ajo y cúrcuma para sazón.",
        renal: "Reduce el pollo a 80g. Omite los patacones.",
        gastritis: "Omite los patacones (fritura). Prepara el hogao con poco tomate. Come despacio y en porción moderada.",
        embarazo: "Buena fuente de proteína ✓. Agrega zanahoria extra por betacaroteno. Omite los patacones si hay náuseas.",
      },
      ingredientes: [
        { nombre: "Pechuga de pollo desmechada", cantidad: "120 g",          calorias: 200 },
        { nombre: "Arroz blanco",                cantidad: "1 taza (185 g)", calorias: 200 },
        { nombre: "Arveja y zanahoria",          cantidad: "½ taza (80 g)",  calorias: 60  },
        { nombre: "Patacones (plátano verde)",   cantidad: "2 und. (80 g)",  calorias: 100 },
      ],
      preparacion: [
        "Cocina el pollo en caldo con sal, comino y color (achiote)",
        "Desmecha y reserva el caldo para el arroz",
        "Sofríe el arroz con hogao, agrega el caldo y cocina tapado",
        "Mezcla el pollo y verduras al arroz a mitad de cocción",
        "Aplasta el plátano verde y fríe (patacones)",
      ],
    },
    {
      id: "ajiaco", vegano: false, pesado: false,
      nombre: "Ajiaco bogotano",
      descripcion: "Las tres papas, pollo y mazorca con guascas — patrimonio de Bogotá",
      calorias: 470, proteinas: 30, carbohidratos: 58, grasas: 9,
      foto: "1644753787064-9f2846d6c995",
      adaptaciones: {
        diabetes: "Las tres papas son de IG alto. Reduce la porción a ½ plato.",
        hipertension: "Sin sal. Las guascas dan sabor sin sodio. ✓",
        renal: "Reduce el pollo a 60g. Omite la crema de leche.",
        gastritis: "Excelente opción ✓. Omite la crema de leche. Evita el ají. La papa criolla suaviza el caldo.",
        embarazo: "Excelente ✓. La papa criolla aporta vitamina C y el pollo proteína completa. Una de las mejores opciones.",
      },
      ingredientes: [
        { nombre: "Papa pastusa",            cantidad: "1 mediana (130 g)", calorias: 80  },
        { nombre: "Papa criolla",            cantidad: "100 g",             calorias: 75  },
        { nombre: "Papa sabanera",           cantidad: "80 g",              calorias: 65  },
        { nombre: "Pechuga de pollo",        cantidad: "100 g",             calorias: 165 },
        { nombre: "Mazorca",                 cantidad: "½ mazorca (80 g)",  calorias: 70  },
        { nombre: "Guascas y crema (1 cda.)",cantidad: "al gusto",          calorias: 15  },
      ],
      preparacion: [
        "Cocina el pollo en agua con sal hasta que esté tierno; desmecha",
        "En el mismo caldo agrega las tres papas y la mazorca",
        "Añade las guascas secas (hierba esencial del ajiaco)",
        "La papa criolla se desbarata y espesa el caldo naturalmente",
        "Regresa el pollo, cocina 10 min más y sirve con crema",
      ],
    },
    {
      id: "sudado_res", vegano: false, pesado: false,
      nombre: "Sudado de carne de res",
      descripcion: "Carne guisada lentamente con papa, zanahoria y hogao",
      calorias: 520, proteinas: 38, carbohidratos: 44, grasas: 15,
      foto: "1558030006-450675393462",
      adaptaciones: {
        hipertension: "Sin sal; usa vinagre y hierbas para marinar la carne.",
        colesterol: "Usa corte magro (lomo). Cocina en sartén antiadherente.",
        renal: "Reduce la carne a 80g. Omite la sal. Aumenta la papa.",
        gastritis: "Usa corte magro de res. Cocina bien cocido, no término medio. Reduce el hogao y evita condimentos fuertes.",
        embarazo: "La carne de res es la mejor fuente de hierro hemo ✓. Fundamental en embarazo. Cocina bien cocida, nunca término medio.",
      },
      ingredientes: [
        { nombre: "Carne de res (murillo)",  cantidad: "150 g",           calorias: 250 },
        { nombre: "Papa pastusa",            cantidad: "2 medianas (300 g)",calorias: 160},
        { nombre: "Zanahoria",               cantidad: "1 unidad (70 g)", calorias: 35  },
        { nombre: "Hogao, comino, sal",      cantidad: "al gusto",        calorias: 25  },
        { nombre: "Arroz blanco (acomp.)",   cantidad: "½ taza (90 g)",   calorias: 100 },
      ],
      preparacion: [
        "Adoba la carne con sal, comino, ajo y color 15 min",
        "Sella la carne en olla con aceite caliente",
        "Agrega hogao y cubre con agua; cocina tapado 45 min",
        "Añade papa y zanahoria en trozos; cocina 20 min más",
        "Sirve con arroz blanco y aguacate al lado",
      ],
    },
    {
      id: "sopa_lentejas", vegano: true, pesado: false,
      nombre: "🌱 Sopa de lentejas con plátano",
      descripcion: "Lentejas con papa, zanahoria y plátano verde — proteína vegetal completa",
      calorias: 400, proteinas: 20, carbohidratos: 68, grasas: 5,
      foto: "1621179817588-f4a923daa3ef",
      adaptaciones: {
        diabetes: "Lentejas IG bajo ✓. Omite el plátano, agrega más verduras.",
        hipertension: "Sin sal. Las lentejas tienen potasio que ayuda. ✓",
        renal: "Las lentejas son ricas en potasio; reduce a ¼ taza.",
        gastritis: "Excelente opción ✓. Cocina bien las lentejas. Evita el aguacate si hay acidez activa. Come despacio.",
        embarazo: "Las lentejas son la fuente más rica en ácido fólico ✓. Esenciales en el 1er trimestre. Muy recomendadas.",
      },
      ingredientes: [
        { nombre: "Lentejas",            cantidad: "½ taza seca (90 g)", calorias: 160 },
        { nombre: "Papa pastusa",        cantidad: "1 mediana (130 g)",  calorias: 90  },
        { nombre: "Zanahoria y cebolla", cantidad: "½ taza c/u (80 g)", calorias: 40  },
        { nombre: "Plátano verde",       cantidad: "½ unidad (80 g)",    calorias: 60  },
        { nombre: "Hogao, comino, sal",  cantidad: "al gusto",           calorias: 25  },
        { nombre: "Aguacate (acomp.)",   cantidad: "¼ unidad (40 g)",    calorias: 60  },
      ],
      preparacion: [
        "Remoja las lentejas 30 min y escúrrelas",
        "Prepara hogao base con tomate, cebolla y ajo",
        "Agrega las lentejas con agua suficiente (1:3)",
        "Incorpora papa, zanahoria y plátano picado",
        "Cocina 35-40 min; sirve con aguacate",
      ],
    },
    {
      id: "bandeja_paisa", vegano: false, pesado: true,
      nombre: "Bandeja paisa (liviana)",
      descripcion: "El plato emblema antioqueño: arroz, frijoles, carne, plátano, huevo y hogao",
      calorias: 730, proteinas: 42, carbohidratos: 84, grasas: 22,
      foto: "1504674900247-0877df9cc836",
      contraindicada: ["cardiaca", "colesterol", "diabetes", "obesidad", "gastritis"],
      nota: "⚠️ Almuerzo muy completo — elige onces y cena livianos este día",
      adaptaciones: {
        diabetes: "Reduce arroz a ½ taza. Omite el chicharrón o el plátano.",
        renal: "Reduce los frijoles a ¼ taza y la carne a 60g.",
        hipertension: "Prepara todos los componentes sin sal. Hogao sin sal.",
      },
      ingredientes: [
        { nombre: "Arroz blanco",               cantidad: "1 taza (185 g)",  calorias: 200 },
        { nombre: "Frijoles rojos antioqueños", cantidad: "½ taza (100 g)",  calorias: 130 },
        { nombre: "Carne molida o chicharrón",  cantidad: "80 g",            calorias: 180 },
        { nombre: "Plátano maduro asado",       cantidad: "½ unidad (90 g)", calorias: 90  },
        { nombre: "Huevo frito",                cantidad: "1 unidad (55 g)", calorias: 90  },
        { nombre: "Hogao y aguacate ¼",         cantidad: "al gusto",        calorias: 40  },
      ],
      preparacion: [
        "Cocina los frijoles rojos con tocino y hogao hasta suavizar",
        "Prepara arroz blanco suelto con sal",
        "Guisa la carne molida con hogao, sal y comino",
        "Asa el plátano maduro en sartén con poca grasa",
        "Fríe el huevo al gusto",
        "Sirve todo en plato grande con hogao y aguacate",
      ],
    },
    {
      id: "cocido_boyacense", vegano: false, pesado: false,
      nombre: "Cocido boyacense",
      descripcion: "Sopa andina con papas nativas, cubios, chuguas, habas, mazorca y costilla — herencia de Boyacá",
      calorias: 420, proteinas: 22, carbohidratos: 58, grasas: 10,
      foto: null,
      contraindicada: ["renal"],
      adaptaciones: {
        diabetes: "Sopa de IG moderado. Reduce la porción de papa a la mitad.",
        hipertension: "Sin sal. Los tubérculos tienen sabor natural suficiente con el hogao.",
        colesterol: "Usa pollo en lugar de costilla de res para reducir la grasa saturada.",
        celiaquia: "Sin gluten ✓. Todos los ingredientes son naturalmente libres de gluten.",
        embarazo: "Riquísima en vitaminas andinas ✓. Las habas aportan ácido fólico esencial.",
        gastritis: "Sopa suave y nutritiva ✓. Bien cocida es fácil de digerir.",
        obesidad: "Muy nutritiva y baja en grasa ✓. Porción moderada de papa.",
      },
      ingredientes: [
        { nombre: "Costilla de res o pollo",      cantidad: "100 g",           calorias: 160 },
        { nombre: "Papa pastusa y criolla",        cantidad: "1 c/u (180 g)",   calorias: 120 },
        { nombre: "Cubios y chuguas (tubérculos)", cantidad: "80 g c/u",        calorias: 60  },
        { nombre: "Habas frescas",                 cantidad: "½ taza (60 g)",   calorias: 50  },
        { nombre: "Mazorca",                       cantidad: "½ mazorca (80 g)",calorias: 70  },
        { nombre: "Hogao, cilantro, comino",       cantidad: "al gusto",        calorias: 20  },
      ],
      preparacion: [
        "Cocina la costilla en agua con sal hasta ablandar (45 min en olla a presión)",
        "Agrega los tubérculos (papa, cubios, chuguas) pelados y troceados",
        "Añade la mazorca partida y las habas frescas",
        "Cocina 25 min hasta que todo esté tierno",
        "Sirve con hogao aparte y abundante cilantro fresco",
      ],
    },
    {
      id: "arroz_atollado", vegano: false, pesado: false,
      nombre: "Arroz atollado con pollo",
      descripcion: "Arroz caldoso y cremoso con pollo desmechado, papa y zanahoria — especialidad del Valle del Cauca",
      calorias: 510, proteinas: 30, carbohidratos: 66, grasas: 12,
      foto: null,
      adaptaciones: {
        diabetes: "El arroz atollado tiene más caldo que el seco — mejor tolerado. Reduce la porción de arroz.",
        hipertension: "Sin sal adicional. Usa achiote y comino para el color y sabor.",
        renal: "Reduce el pollo a 80g. Omite la zanahoria si hay restricción de potasio.",
        colesterol: "Usa pechuga sin piel. Cocina con mínimo aceite.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "Excelente fuente de proteína ✓. La zanahoria aporta betacaroteno para el bebé.",
        gastritis: "El arroz caldoso es ideal para gastritis ✓. Suave y muy digestivo.",
        obesidad: "Reduce la porción de arroz a ½ taza. Agrega más verduras al caldo.",
      },
      ingredientes: [
        { nombre: "Pechuga de pollo",            cantidad: "120 g",           calorias: 200 },
        { nombre: "Arroz blanco",                cantidad: "¾ taza (140 g)",  calorias: 185 },
        { nombre: "Papa pastusa en cubos",        cantidad: "1 mediana (130 g)",calorias: 80 },
        { nombre: "Zanahoria y arveja",           cantidad: "½ taza c/u (80 g)",calorias: 50},
        { nombre: "Hogao, achiote, comino",       cantidad: "al gusto",        calorias: 25  },
      ],
      preparacion: [
        "Cocina el pollo en caldo con sal y comino hasta tierno; desméchalo y reserva el caldo",
        "Sofríe el hogao en la olla, agrega el arroz y revuelve 2 min",
        "Cubre con caldo (3 tazas por 1 de arroz — más caldoso que el arroz seco)",
        "Añade papa, zanahoria, arveja y achiote; cocina tapado 20 min",
        "Agrega el pollo desmechado al final. Debe quedar cremoso, no seco",
      ],
    },
    {
      id: "mondongo_antioqueño", vegano: false, pesado: false,
      nombre: "Mondongo antioqueño",
      descripcion: "Sopa de menudo con papa, yuca, zanahoria y hogao — plato emblema de Antioquia",
      calorias: 380, proteinas: 28, carbohidratos: 42, grasas: 10,
      foto: null,
      contraindicada: ["colesterol", "cardiaca"],
      adaptaciones: {
        diabetes: "IG moderado. Reduce la papa a ½ porción y omite la yuca.",
        hipertension: "Sin sal. El menudo tiene sabor natural suficiente con el hogao y comino.",
        renal: "Reduce la porción de menudo a 80g. Omite la yuca.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "El menudo es rico en hierro y zinc ✓. Cocina muy bien (mínimo 2 horas). Muy recomendado.",
        gastritis: "Puede ser pesado. Come porción pequeña y bien cocido. Omite el ají.",
      },
      ingredientes: [
        { nombre: "Menudo (panza de res) limpio", cantidad: "150 g",            calorias: 160 },
        { nombre: "Papa pastusa",                 cantidad: "1 mediana (130 g)",calorias: 80  },
        { nombre: "Yuca",                         cantidad: "50 g",             calorias: 65  },
        { nombre: "Zanahoria y maíz",             cantidad: "½ taza c/u (80 g)",calorias: 60 },
        { nombre: "Hogao, comino, cilantro",      cantidad: "al gusto",         calorias: 25  },
      ],
      preparacion: [
        "Limpia y corta el menudo en trozos pequeños; cocina en olla a presión 45 min con sal",
        "En una olla grande prepara hogao con tomate, cebolla, ajo y comino",
        "Agrega el menudo cocido y caldo; hierve 20 min más",
        "Incorpora papa, yuca y zanahoria en trozos; cocina hasta ablandar",
        "Sirve con cilantro fresco, hogao aparte y arepa",
      ],
    },
    // ── VEGANO ─────────────────────────────────────────────
    {
      id: "arroz_frijoles_vegano", vegano: true, pesado: false,
      nombre: "🌱 Arroz con frijoles, aguacate y plátano",
      descripcion: "Combo vegano completo: proteína vegetal + carbos + grasa saludable — típico colombiano",
      calorias: 520, proteinas: 18, carbohidratos: 84, grasas: 12,
      foto: "1698917467449-08bcd1d9014b",
      ingredientes: [
        { nombre: "Arroz blanco",              cantidad: "1 taza (185 g)",  calorias: 200 },
        { nombre: "Frijoles rojos cocinados",  cantidad: "½ taza (100 g)", calorias: 130 },
        { nombre: "Aguacate hass",             cantidad: "¼ aguacate (50 g)",calorias: 80},
        { nombre: "Plátano maduro asado",      cantidad: "½ unidad (90 g)", calorias: 90  },
        { nombre: "Hogao y ensalada verde",    cantidad: "al gusto",        calorias: 20  },
      ],
      preparacion: [
        "Cocina el arroz y los frijoles por separado con hogao y sal",
        "Asa el plátano maduro en sartén con poco aceite",
        "Prepara el aguacate con sal y limón",
        "Sirve arroz con frijoles, plátano y aguacate al lado",
      ],
    },
    {
      id: "crema_papa_criolla", vegano: true, pesado: false,
      nombre: "🌱 Crema de papa criolla",
      descripcion: "Papa criolla licuada con hogao y caldo vegetal — cremosa, sabrosa y 100% colombiana",
      calorias: 300, proteinas: 6, carbohidratos: 54, grasas: 8,
      foto: null,
      adaptaciones: {
        diabetes: "La papa criolla tiene IG alto. Reduce la porción a ½ plato y añade más caldo.",
        hipertension: "Sin sal. El hogao y las hierbas dan sabor suficiente. ✓",
        celiaquia: "Sin gluten ✓.",
        embarazo: "La papa criolla aporta vitamina C y potasio ✓. Nutritiva y digestiva.",
        gastritis: "Excelente opción ✓. La crema de papa es muy suave para el estómago.",
        obesidad: "Reduce la porción a ½ taza. Agrega caldo extra para mayor volumen.",
        renal: "Modera la porción — la papa criolla tiene potasio moderado.",
      },
      ingredientes: [
        { nombre: "Papa criolla",             cantidad: "6 unidades (300 g)",  calorias: 180 },
        { nombre: "Cebolla larga y ajo",      cantidad: "al gusto",            calorias: 20  },
        { nombre: "Hogao (tomate + cebolla)", cantidad: "2 cdas. (30 g)",      calorias: 35  },
        { nombre: "Caldo vegetal",            cantidad: "2 tazas (480 ml)",    calorias: 15  },
        { nombre: "Aceite de oliva",          cantidad: "1 cda. (14 g)",       calorias: 50  },
      ],
      preparacion: [
        "Cocina la papa criolla con cebolla larga y ajo hasta ablandar (15-20 min)",
        "Reserva un poco del caldo de cocción",
        "Licúa la papa con el caldo hasta obtener una crema suave",
        "Calienta en olla, agrega el hogao y ajusta la consistencia con más caldo",
        "Sirve caliente con un hilo de aceite de oliva y cilantro fresco",
      ],
    },
    {
      id: "sancocho_verduras", vegano: true, pesado: false,
      nombre: "🌱 Sancocho de verduras",
      descripcion: "Sancocho sin carne con papa, yuca, mazorca, plátano y ahuyama — nutritivo y abundante",
      calorias: 340, proteinas: 8, carbohidratos: 70, grasas: 3,
      foto: "1612108438004-257c47560118",
      ingredientes: [
        { nombre: "Papa pastusa y criolla",    cantidad: "1 c/u (200 g)", calorias: 130 },
        { nombre: "Yuca",                      cantidad: "60 g",          calorias: 75  },
        { nombre: "Mazorca",                   cantidad: "½ mazorca (80 g)",calorias: 70 },
        { nombre: "Ahuyama",                   cantidad: "80 g",          calorias: 30  },
        { nombre: "Plátano verde",             cantidad: "½ und. (80 g)", calorias: 60  },
        { nombre: "Hogao, cilantro, ajo",      cantidad: "al gusto",      calorias: 15  },
      ],
      preparacion: [
        "Prepara hogao base con tomate, cebolla, ajo y cilantro",
        "Agrega agua y lleva a hervor",
        "Incorpora todas las verduras y tubérculos pelados y troceados",
        "Cocina 30 min hasta que todo esté blando",
        "Sirve con arroz blanco y aguacate al lado",
      ],
    },
  ],

  // ════ CENAS ══════════════════════════════════════════════
  cena: [
    {
      id: "sopa_pasta", vegano: false, pesado: false,
      nombre: "Sopa de pasta con verduras",
      descripcion: "Sopa liviana de fideos con zanahoria, habichuela y papa",
      calorias: 300, proteinas: 10, carbohidratos: 52, grasas: 6,
      foto: "1563379926046-8fc73d2e75fb",
      contraindicada: ["celiaquia"],
      ingredientes: [
        { nombre: "Pasta o fideos",          cantidad: "50 g",           calorias: 175 },
        { nombre: "Zanahoria y habichuela",  cantidad: "½ taza c/u (80 g)",calorias: 50},
        { nombre: "Papa pequeña",            cantidad: "1 unidad (90 g)", calorias: 60  },
        { nombre: "Caldo de pollo, cilantro",cantidad: "al gusto",        calorias: 15  },
      ],
      preparacion: [
        "Prepara hogao con cebolla, tomate y ajo",
        "Agrega caldo y lleva a hervor",
        "Incorpora papa y zanahoria en cubos; cocina 10 min",
        "Añade pasta y habichuela; cocina 8-10 min más",
        "Sirve con cilantro y limón",
      ],
    },
    {
      id: "crema_ahuyama", vegano: false, pesado: false,
      nombre: "Crema de ahuyama",
      descripcion: "Sopa crema de zapallo con leche — suave, cálida y fácil de preparar",
      calorias: 260, proteinas: 8, carbohidratos: 38, grasas: 8,
      foto: "1604152135912-04a022e23696",
      adaptaciones: {
        gastritis: "Una de las mejores cenas para gastritis ✓. La ahuyama es suave y alcalina. Usa leche descremada y come caliente.",
        embarazo: "La ahuyama aporta vitamina A y hierro ✓. Excelente cena. Usa leche pasteurizada.",
      },
      ingredientes: [
        { nombre: "Ahuyama (zapallo) pelada",  cantidad: "250 g",          calorias: 100 },
        { nombre: "Leche entera",              cantidad: "½ taza (120 ml)",calorias: 75  },
        { nombre: "Cebolla, ajo, sal",         cantidad: "al gusto",       calorias: 15  },
        { nombre: "Pan tostado o arepa",       cantidad: "1 porción (60 g)",calorias: 70 },
      ],
      preparacion: [
        "Trocea la ahuyama y cocina con cebolla y ajo hasta ablandar",
        "Licúa hasta obtener consistencia suave",
        "Regresa al fuego, agrega la leche y sazona",
        "Cocina 5 min más sin hervir",
        "Sirve con pan tostado o arepa al lado",
      ],
    },
    {
      id: "arroz_huevo", vegano: false, pesado: false,
      nombre: "Arroz con huevo y ensalada verde",
      descripcion: "Cena sencilla: arroz blanco, huevos y ensalada fresca con limón",
      calorias: 390, proteinas: 20, carbohidratos: 52, grasas: 12,
      foto: null,
      ingredientes: [
        { nombre: "Arroz blanco",               cantidad: "1 taza (185 g)",   calorias: 200 },
        { nombre: "Huevos cocidos o fritos",    cantidad: "2 unidades (110 g)",calorias: 140},
        { nombre: "Lechuga, tomate, pepino",    cantidad: "1 taza mix (120 g)",calorias: 30 },
        { nombre: "Limón, aceite de oliva, sal",cantidad: "aderezo",           calorias: 20  },
      ],
      preparacion: [
        "Cocina el arroz con sal y un toque de aceite",
        "Prepara los huevos al gusto (cocidos, fritos o revueltos)",
        "Mezcla lechuga, tomate y pepino para la ensalada",
        "Adereza con limón, aceite de oliva y sal",
        "Sirve el arroz con los huevos encima y la ensalada al lado",
      ],
    },
    {
      id: "caldo_costilla", vegano: false, pesado: false,
      nombre: "Caldo de costilla bogotano",
      descripcion: "Caldo reconfortante de costilla con papa criolla y cilantro",
      calorias: 290, proteinas: 22, carbohidratos: 28, grasas: 10,
      foto: null,
      adaptaciones: {
        gastritis: "El caldo claro es excelente para gastritis ✓. Cocina bien la costilla y retira la grasa superficial. Sin sal excesiva.",
        embarazo: "El caldo aporta colágeno y minerales ✓. Cocina bien cocida la costilla. Retira la grasa de la superficie.",
      },
      ingredientes: [
        { nombre: "Costilla de res",               cantidad: "100 g (2 trozos)", calorias: 180 },
        { nombre: "Papa criolla o pastusa",        cantidad: "1 pequeña (90 g)", calorias: 80  },
        { nombre: "Cilantro, cebolla larga, sal",  cantidad: "al gusto",         calorias: 15  },
        { nombre: "Arepa pequeña (opcional)",      cantidad: "½ unidad (45 g)",  calorias: 75  },
      ],
      preparacion: [
        "Lava bien las costillas con agua fría",
        "Coloca en olla con agua fría, cebolla y ajo",
        "Hierve, retira la espuma y baja el fuego",
        "Cocina 1 hora; añade papa y cocina 20 min más",
        "Sirve caliente con abundante cilantro fresco",
      ],
    },
    {
      id: "sopa_fideo", vegano: false, pesado: false,
      nombre: "Sopa de fideo con pollo",
      descripcion: "Sopa ligera de fideos con pollo desmechado — liviana y digestiva para la noche",
      calorias: 270, proteinas: 18, carbohidratos: 36, grasas: 5,
      foto: null,
      contraindicada: ["celiaquia"],
      ingredientes: [
        { nombre: "Fideos delgados",          cantidad: "60 g",           calorias: 210 },
        { nombre: "Pollo desmechado",         cantidad: "50 g",           calorias: 85  },
        { nombre: "Caldo de pollo, cilantro", cantidad: "al gusto",       calorias: 15  },
        { nombre: "Papa (opcional)",          cantidad: "½ unidad (45 g)",calorias: 45  },
      ],
      preparacion: [
        "Calienta caldo de pollo en olla",
        "Agrega fideos y papa al hervir; cocina 8 min",
        "Añade el pollo desmechado; sazona con sal y comino",
        "Sirve caliente con cilantro y limón",
      ],
    },
    {
      id: "sopa_guineo", vegano: false, pesado: false,
      nombre: "Sopa de guineo con pollo",
      descripcion: "Plátano verde en cubos con pollo desmechado, papa criolla y hogao — cena liviana y reconfortante",
      calorias: 260, proteinas: 16, carbohidratos: 40, grasas: 5,
      foto: null,
      adaptaciones: {
        diabetes: "El guineo verde tiene almidón resistente de IG bajo ✓. Excelente opción.",
        hipertension: "Sin sal adicional. El plátano verde es naturalmente bajo en sodio.",
        renal: "Reduce el pollo a 50g. El plátano verde es moderado en potasio.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "El guineo verde aporta potasio y fibra ✓. Cena nutritiva y digestiva.",
        gastritis: "El plátano verde es suave y alcalino ✓. Excelente para gastritis.",
        obesidad: "Muy baja en calorías y grasa ✓. Muy saciante por el almidón resistente.",
        colesterol: "Sin grasa saturada ✓. El caldo claro es cardioprotector.",
      },
      ingredientes: [
        { nombre: "Plátano verde",              cantidad: "1 unidad mediana (200 g)", calorias: 120 },
        { nombre: "Pollo desmechado",           cantidad: "60 g",                    calorias: 100 },
        { nombre: "Papa criolla",               cantidad: "1 pequeña (80 g)",         calorias: 55  },
        { nombre: "Hogao, cilantro, caldo",     cantidad: "al gusto",                 calorias: 20  },
      ],
      preparacion: [
        "Pela y corta el plátano verde en cubos medianos",
        "Hierve con caldo de pollo, hogao y sal a fuego medio 15 min",
        "Agrega la papa criolla y cocina 10 min más hasta ablandar",
        "Incorpora el pollo desmechado los últimos 3 minutos",
        "Sirve caliente con abundante cilantro fresco picado",
      ],
    },
    {
      id: "arroz_leche", vegano: false, pesado: false,
      nombre: "Arroz con leche santafereño",
      descripcion: "Arroz cremoso cocinado en leche con canela y panela — cena dulce y reconfortante de las abuelas",
      calorias: 310, proteinas: 8, carbohidratos: 56, grasas: 6,
      foto: null,
      contraindicada: ["diabetes"],
      adaptaciones: {
        hipertension: "Sin sal adicional. La leche tiene sodio natural moderado.",
        colesterol: "Usa leche descremada para reducir la grasa.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "Aporta calcio y energía ✓. Porción moderada — no como cena principal.",
        gastritis: "Excelente opción ✓. Suave, alcalino y reconfortante. Muy recomendado.",
        obesidad: "Reduce la porción a ½ taza. Endulza con stevia en lugar de panela.",
      },
      ingredientes: [
        { nombre: "Arroz blanco",       cantidad: "½ taza seca (90 g)",  calorias: 150 },
        { nombre: "Leche entera",       cantidad: "1½ tazas (360 ml)",   calorias: 110 },
        { nombre: "Canela en rama",     cantidad: "1 rama",               calorias: 5   },
        { nombre: "Panela raspada",     cantidad: "1 cda. (15 g)",        calorias: 45  },
      ],
      preparacion: [
        "Cocina el arroz con 1 taza de agua y la canela a fuego medio hasta absorber (15 min)",
        "Agrega la leche caliente poco a poco revolviendo constantemente",
        "Endulza con panela al gusto; cocina 10 min más a fuego bajo sin dejar de revolver",
        "Debe quedar cremoso — retira antes de que se seque del todo",
        "Sirve caliente o tibio con canela en polvo espolvoreada encima",
      ],
    },
    // ── VEGANOS ────────────────────────────────────────────
    {
      id: "crema_ahuyama_vegana", vegano: true, pesado: false,
      nombre: "🌱 Crema de ahuyama con leche de coco",
      descripcion: "Sopa crema de zapallo con leche de coco — suave, tropical y 100% vegetal",
      calorias: 240, proteinas: 4, carbohidratos: 32, grasas: 11,
      foto: "1510431198580-7727c9fa1e3a",
      adaptaciones: {
        gastritis: "Excelente opción ✓. La ahuyama protege el estómago. La leche de coco es suave. Come caliente y despacio.",
        embarazo: "Excelente ✓. Betacaroteno de la ahuyama beneficia al bebé. 100% vegetal y muy nutritiva.",
      },
      ingredientes: [
        { nombre: "Ahuyama pelada",        cantidad: "250 g",           calorias: 100 },
        { nombre: "Leche de coco",         cantidad: "½ taza (120 ml)", calorias: 90  },
        { nombre: "Cebolla, ajo, jengibre",cantidad: "al gusto",        calorias: 15  },
        { nombre: "Arepa de maíz",         cantidad: "1 pequeña (70 g)",calorias: 110 },
      ],
      preparacion: [
        "Cocina la ahuyama con cebolla y ajo hasta ablandar",
        "Licúa con la leche de coco hasta obtener crema suave",
        "Calienta sin hervir y sazona con sal y jengibre",
        "Sirve con arepa de maíz al lado",
      ],
    },
    {
      id: "sopa_verduras_vegana", vegano: true, pesado: false,
      nombre: "🌱 Sopa de verduras colombiana",
      descripcion: "Sopa nutritiva de papa, zanahoria, espinaca y plátano — completamente vegetal",
      calorias: 220, proteinas: 7, carbohidratos: 44, grasas: 2,
      foto: "1546069901-ba9599a7e63c",
      adaptaciones: {
        gastritis: "La mejor cena posible para gastritis ✓. Sin grasa, sin ácidos. Omite el limón al servir.",
        embarazo: "Excelente ✓. Rica en vitaminas y minerales. Agrega frijoles para aumentar el ácido fólico.",
      },
      ingredientes: [
        { nombre: "Papa pastusa",          cantidad: "1 mediana (130 g)", calorias: 90  },
        { nombre: "Zanahoria",             cantidad: "1 unidad (70 g)",   calorias: 30  },
        { nombre: "Espinaca o acelga",     cantidad: "1 taza (30 g)",     calorias: 15  },
        { nombre: "Plátano verde",         cantidad: "¼ unidad (40 g)",   calorias: 30  },
        { nombre: "Cebolla, ajo, cilantro",cantidad: "al gusto",          calorias: 15  },
      ],
      preparacion: [
        "Prepara hogao vegetal con cebolla, tomate y ajo",
        "Agrega agua y lleva a hervor",
        "Incorpora papa, zanahoria y plátano en cubos",
        "Cocina 20 min; agrega espinaca los últimos 3 min",
        "Sirve con cilantro y limón al gusto",
      ],
    },
  ],
};


// ============================================================
// PLANEADOR DEL DÍA
// ============================================================
const SLOTS = [
  { id: "desayuno",    label: "🌅 Desayuno",      tipo: "desayuno" },
  { id: "once_manana", label: "🍎 Onces mañana",   tipo: "once"     },
  { id: "almuerzo",    label: "☀️ Almuerzo",       tipo: "almuerzo" },
  { id: "once_tarde",  label: "🍊 Onces tarde",    tipo: "once"     },
  { id: "cena",        label: "🌙 Cena",            tipo: "cena"     },
];

const selecciones = { desayuno: null, once_manana: null, almuerzo: null, once_tarde: null, cena: null };

let modoVegano = false;

// ─── MEZCLA ALEATORIA (una vez por carga de página) ──────────
let RECETAS_MEZCLADAS = {};
function shufflearRecetas() {
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  Object.keys(RECETAS).forEach(tipo => {
    RECETAS_MEZCLADAS[tipo] = shuffle(RECETAS[tipo]);
  });
}

function caloriasObjetivo()    { return parseInt(localStorage.getItem("caloriasObjetivo")) || 2000; }

function editarMeta() {
  const actual = caloriasObjetivo();
  const nueva = prompt("Nueva meta calórica diaria (kcal):", actual);
  if (nueva === null) return;
  const valor = parseInt(nueva);
  if (!isNaN(valor) && valor > 0) {
    localStorage.setItem("caloriasObjetivo", valor);
    actualizarProgreso();
  }
}
function caloriasSeleccionadas() { return Object.values(selecciones).reduce((s, r) => s + (r ? r.calorias : 0), 0); }

function macrosSeleccionados() {
  return Object.values(selecciones).reduce((acc, r) => {
    if (!r) return acc;
    return {
      prot:   acc.prot   + (r.proteinas     || 0),
      carbs:  acc.carbs  + (r.carbohidratos || 0),
      grasas: acc.grasas + (r.grasas        || 0),
    };
  }, { prot: 0, carbs: 0, grasas: 0 });
}

function macrosObjetivo() {
  const meta = caloriasObjetivo();
  return {
    prot:   Math.round(meta * 0.20 / 4),
    carbs:  Math.round(meta * 0.50 / 4),
    grasas: Math.round(meta * 0.30 / 9),
  };
}

// ─── EMOJI POR NOMBRE DE RECETA ──────────────────────────────
function getEmoji(receta) {
  const n = (receta.nombre || "").toLowerCase().replace(/🌱 /g, "");
  if (n.includes("changua"))             return "🥛";
  if (n.includes("avena"))               return "🥣";
  if (n.includes("arepa"))               return "🫓";
  if (n.includes("calentado"))           return "🍳";
  if (n.includes("perico") || n.includes("huevo revuelto")) return "🍳";
  if (n.includes("chontaduro"))          return "🌴";
  if (n.includes("pandebono"))           return "🥐";
  if (n.includes("oblea") || n.includes("arequipe")) return "🍪";
  if (n.includes("yogur"))               return "🫙";
  if (n.includes("fruta"))               return "🍊";
  if (n.includes("sancocho"))            return "🫕";
  if (n.includes("ajiaco"))              return "🥣";
  if (n.includes("arroz"))               return "🍚";
  if (n.includes("sopa") || n.includes("crema") || n.includes("caldo")) return "🍲";
  if (n.includes("bandeja"))             return "🍽️";
  if (n.includes("lenteja"))             return "🫘";
  if (n.includes("frijol"))              return "🫘";
  if (n.includes("aguacate"))            return "🥑";
  if (n.includes("sudado"))              return "🥩";
  if (n.includes("pasta") || n.includes("fideo")) return "🍝";
  if (n.includes("verdura"))             return "🥦";
  return "🍴";
}

// Colores de fondo para tarjetas sin foto (por tipo de comida)
const SIN_FOTO_COLOR = { desayuno: "#e07a5f", once: "#52b788", almuerzo: "#2d6a4f", cena: "#264653" };

function urlFoto(receta) {
  if (!receta.foto) return null;
  return `https://images.unsplash.com/photo-${receta.foto}?w=400&h=150&fit=crop&auto=format&q=80`;
}

// urlFallback ya no se usa en cards principales; se mantiene para el plan del día
function urlFallback(tipo) {
  const col = { desayuno: "e07a5f", once: "52b788", almuerzo: "2d6a4f", cena: "264653" };
  return `https://placehold.co/90x50/${col[tipo]||"2d6a4f"}/ffffff?text=+`;
}

// ─── ACORDEÓN ────────────────────────────────────────────────
function toggleSeccion(slotId) {
  const seccion = document.getElementById(`sec-${slotId}`);
  if (!seccion) return;

  const estaAbierta = seccion.classList.contains("abierta");

  // Cerrar todas
  SLOTS.forEach(s => {
    document.getElementById(`sec-${s.id}`)?.classList.remove("abierta");
    const a = document.getElementById(`arrow-${s.id}`);
    if (a) a.textContent = "▼";
  });

  // Abrir la tocada (si no estaba abierta)
  if (!estaAbierta) {
    seccion.classList.add("abierta");
    const arrow = document.getElementById(`arrow-${slotId}`);
    if (arrow) arrow.textContent = "▲";
    setTimeout(() => seccion.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
  }
}

function actualizarEstadoSeccion(slotId) {
  const el = document.getElementById(`estado-${slotId}`);
  if (!el) return;
  const r = selecciones[slotId];
  if (r) {
    el.textContent = `✓ ${r.nombre.replace(/🌱 /g, "")} · ${r.calorias} kcal`;
    el.classList.add("elegida");
  } else {
    el.classList.remove("elegida");
  }
}

// ─── FAVORITOS DE RECETAS ────────────────────────────────────
function getFavsRecetas() {
  return new Set(JSON.parse(localStorage.getItem("favoritosRecetas") || "[]"));
}

function toggleFavReceta(recetaId, btn) {
  const favs = getFavsRecetas();
  if (favs.has(recetaId)) {
    favs.delete(recetaId);
    btn.textContent = "♡";
    btn.classList.remove("fav-activo");
  } else {
    favs.add(recetaId);
    btn.textContent = "♥";
    btn.classList.add("fav-activo");
  }
  localStorage.setItem("favoritosRecetas", JSON.stringify([...favs]));
}

// ─── RENDER SECCIÓN ──────────────────────────────────────────
function renderSeccion(slot) {
  const seccion = document.getElementById(`sec-${slot.id}`);
  if (!seccion) return;

  const usuario    = JSON.parse(localStorage.getItem("datosUsuario")) || {};
  const enfermedad = usuario.enfermedad;
  const condicion  = usuario.condicion  || "";
  const objetivo   = usuario.objetivo   || "";

  let recetas = RECETAS_MEZCLADAS[slot.tipo] || RECETAS[slot.tipo] || [];
  if (modoVegano) recetas = recetas.filter(r => r.vegano);
  if (enfermedad && enfermedad !== "ninguna") {
    recetas = recetas.filter(r => !r.contraindicada?.includes(enfermedad));
  }
  if (condicion === "embarazo") {
    recetas = recetas.filter(r => !r.contraindicada?.includes("embarazo"));
  }
  if (objetivo === "masa") {
    recetas = [...recetas].sort((a, b) => (b.proteinas || 0) - (a.proteinas || 0));
  }

  const grid = seccion.querySelector(".recetas-opciones");
  grid.innerHTML = "";

  if (!recetas.length) {
    grid.innerHTML = `<p style="padding:16px;color:#aaa;font-size:12px">No hay opciones disponibles para tu condición en esta categoría.</p>`;
    return;
  }

  const bgColor = SIN_FOTO_COLOR[slot.tipo] || "#2d6a4f";

  recetas.forEach(r => {
    const sel = selecciones[slot.id]?.id === r.id;

    const msgs = [];
    if (enfermedad && enfermedad !== "ninguna" && r.adaptaciones?.[enfermedad])
      msgs.push(`💊 ${r.adaptaciones[enfermedad]}`);
    if (condicion === "embarazo" && r.adaptaciones?.embarazo)
      msgs.push(`🤰 ${r.adaptaciones.embarazo}`);
    if (objetivo === "masa" && (r.proteinas || 0) >= 25)
      msgs.push(`💪 ${r.proteinas}g proteína — ideal para ganar músculo`);
    const adaptacion = msgs.map(m => `<p class="adaptacion-msg">${m}</p>`).join("");
    const esVeg     = r.vegano ? '<span class="badge-vegano">🌱 Vegano</span>' : "";
    const fotoUrl   = urlFoto(r);
    const emoji     = getEmoji(r);

    // Imagen: si hay foto real, mostrar img (con fallback a sin-foto si falla)
    // Si no hay foto: mostrar sin-foto directamente
    const imgHTML = fotoUrl
      ? `<img src="${fotoUrl}" alt="${r.nombre}" loading="lazy" class="img-receta-clickable"
             onclick="verRecetaDetalle('${slot.id}','${r.id}')"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";
    const sinFotoHTML = `<div class="sin-foto"
         style="display:${fotoUrl ? "none" : "flex"};background:${bgColor}"
         onclick="verRecetaDetalle('${slot.id}','${r.id}')">
      <span class="sin-foto-emoji">${emoji}</span>
      <p>${r.nombre.replace(/🌱 /g, "")}</p>
    </div>`;

    grid.innerHTML += `
      <div class="opcion-card ${sel ? "seleccionada" : ""}" id="card-${slot.id}-${r.id}" data-kcal="${r.calorias}">
        <div class="card-img-wrap">
          ${imgHTML}${sinFotoHTML}
          <button class="btn-fav-heart${getFavsRecetas().has(r.id) ? ' fav-activo' : ''}"
                  onclick="toggleFavReceta('${r.id}',this)" aria-label="Favorito">
            ${getFavsRecetas().has(r.id) ? "♥" : "♡"}
          </button>
        </div>
        <div class="opcion-info">
          <h4>${r.nombre.replace(/🌱 /g, "")}</h4>
          ${esVeg}
          <p class="opcion-desc">${r.descripcion}</p>
          <div class="opcion-macros">
            <span class="macro-kcal">  <span class="macro-ico">🔥</span>${r.calorias} kcal</span>
            <span class="macro-prot">  <span class="macro-ico">🌿</span>${r.proteinas}g prot.</span>
            <span class="macro-carbs"> <span class="macro-ico">🌾</span>${r.carbohidratos}g carbs</span>
            <span class="macro-grasas"><span class="macro-ico">💧</span>${r.grasas}g grasas</span>
          </div>
          ${adaptacion}
          ${r.nota ? `<p class="nota-aviso">${r.nota}</p>` : ""}
          <div class="opcion-botones">
            <button class="btn-seleccionar" onclick="seleccionarReceta('${slot.id}','${r.id}')">
              ${sel ? "✓ Seleccionada" : "Seleccionar"}
            </button>
            <button class="btn-ver-receta" onclick="verRecetaDetalle('${slot.id}','${r.id}')">👁 Ver</button>
          </div>
        </div>
      </div>`;
  });
}

// ─── SELECCIONAR ─────────────────────────────────────────────
function seleccionarReceta(slotId, recetaId) {
  const slot   = SLOTS.find(s => s.id === slotId);
  const receta = RECETAS[slot.tipo].find(r => r.id === recetaId);
  const fueDeseleccion = selecciones[slotId]?.id === recetaId;

  // Agrega tipo del slot para que los filtros de historial funcionen
  selecciones[slotId] = fueDeseleccion ? null : { ...receta, tipo: slot.tipo };

  if (receta?.pesado && !fueDeseleccion) mostrarAvisoHeavy(receta.nota);

  renderSeccion(slot);
  actualizarProgreso();
  actualizarResumen();
  actualizarPlanDelDia();

  const check = document.getElementById(`check-${slotId}`);
  if (check) check.textContent = selecciones[slotId] ? "✅" : "";
  actualizarEstadoSeccion(slotId);

  if (!fueDeseleccion) {
    document.getElementById(`sec-${slotId}`)?.classList.remove("abierta");
    const arrow = document.getElementById(`arrow-${slotId}`);
    if (arrow) arrow.textContent = "▼";
  }
}

// ─── VER RECETA DESDE TARJETA ────────────────────────────────
function verRecetaDetalle(slotId, recetaId) {
  const slot   = SLOTS.find(s => s.id === slotId);
  const receta = RECETAS[slot.tipo].find(r => r.id === recetaId);
  if (receta) {
    localStorage.setItem("recetaActual", JSON.stringify(receta));
    window.location.href = "detalle.html";
  }
}

// ─── MODO VEGANO ─────────────────────────────────────────────
function toggleVegano() {
  modoVegano = !modoVegano;
  const btn = document.getElementById("btn-vegano");
  if (btn) {
    btn.classList.toggle("activo", modoVegano);
    btn.textContent = modoVegano ? "🌱 Modo Vegano ON" : "🌱 Modo Vegano";
  }
  const badge = document.getElementById("nav-user-badge");
  if (badge) badge.style.display = modoVegano ? "block" : "none";
  SLOTS.forEach(s => renderSeccion(s));
}

function _abrirTodasSecciones() {
  SLOTS.forEach(s => {
    const sec = document.getElementById("sec-" + s.id);
    if (sec && !sec.classList.contains("abierta")) {
      sec.classList.add("abierta");
      const arrow = document.getElementById("arrow-" + s.id);
      if (arrow) arrow.textContent = "▲";
    }
  });
}

function buscarRecetas(q) {
  const texto = q.toLowerCase().trim();

  if (!texto) {
    // Limpiar filtro de búsqueda, restaurar visibilidad
    document.querySelectorAll(".opcion-card").forEach(c => c.style.display = "");
    document.querySelectorAll(".meal-section").forEach(s => s.style.display = "");
    return;
  }

  // Abrir todas las secciones para que los cards estén visibles
  _abrirTodasSecciones();

  // Filtrar por nombre o descripción
  SLOTS.forEach(s => {
    const sec = document.getElementById("sec-" + s.id);
    if (!sec) return;
    let hayMatch = false;
    sec.querySelectorAll(".opcion-card").forEach(card => {
      const nombre = (card.querySelector("h4")?.textContent || "").toLowerCase();
      const desc   = (card.querySelector(".opcion-desc")?.textContent || "").toLowerCase();
      const match  = nombre.includes(texto) || desc.includes(texto);
      card.style.display = match ? "" : "none";
      if (match) hayMatch = true;
    });
    sec.style.display = hayMatch ? "" : "none";
  });
}

let filtroKcal = "todas";

function toggleFiltros() {
  const panel = document.getElementById("panel-filtros");
  const btn   = document.querySelector(".ctrl-filtros");
  if (!panel) return;
  const visible = panel.style.display !== "none";
  panel.style.display = visible ? "none" : "flex";
  if (btn) btn.classList.toggle("activo", !visible);
}

function aplicarFiltroKcal(rango, btn) {
  filtroKcal = rango;
  document.querySelectorAll(".filtro-chip").forEach(c => c.classList.remove("activo"));
  if (btn) btn.classList.add("activo");

  if (rango === "todas") {
    document.querySelectorAll(".opcion-card").forEach(c => c.style.display = "");
    document.querySelectorAll(".meal-section").forEach(s => s.style.display = "");
    return;
  }

  _abrirTodasSecciones();

  SLOTS.forEach(s => {
    const sec = document.getElementById("sec-" + s.id);
    if (!sec) return;
    let hayMatch = false;
    sec.querySelectorAll(".opcion-card").forEach(card => {
      const kcal = parseInt(card.dataset.kcal) || 0;
      const match = rango === "low"  ? kcal <= 400
                  : rango === "mid"  ? kcal > 400 && kcal <= 600
                  :                    kcal > 600;
      card.style.display = match ? "" : "none";
      if (match) hayMatch = true;
    });
    sec.style.display = hayMatch ? "" : "none";
  });
}

// ─── PROGRESO ────────────────────────────────────────────────
function actualizarProgreso() {
  const meta    = caloriasObjetivo();
  const sel     = caloriasSeleccionadas();
  const pct     = Math.round((sel / meta) * 100);
  const pctCap  = Math.min(pct, 100);
  const C       = 251.3; // 2π × r40

  // Kcal counters
  const elSel  = document.getElementById("kcal-sel");
  const elMeta = document.getElementById("kcal-meta");
  const elMH   = document.getElementById("meta-header");
  if (elSel)  elSel.textContent  = sel;
  if (elMeta) elMeta.textContent = meta;
  if (elMH)   elMH.textContent   = meta;

  // Circular ring
  const ring    = document.getElementById("ring-fill");
  const ringPct = document.getElementById("ring-pct");
  if (ring) {
    ring.style.strokeDashoffset = C - (pctCap / 100) * C;
    ring.style.stroke = pct > 110 ? "#f44336" : "#4caf50";
  }
  if (ringPct) ringPct.textContent = pct + "%";

  // Kcal horizontal bar
  const kcalBar = document.getElementById("kcal-bar-fill");
  if (kcalBar) {
    kcalBar.style.width = pctCap + "%";
    kcalBar.style.background = pct > 110 ? "#f44336" : "#4caf50";
  }

  // Macro bars
  const macros  = macrosSeleccionados();
  const targets = macrosObjetivo();

  const setMacro = (barId, valId, goalId, val, target) => {
    const b = document.getElementById(barId);
    const v = document.getElementById(valId);
    const g = document.getElementById(goalId);
    if (b) b.style.width = Math.min(Math.round((val / target) * 100), 100) + "%";
    if (v) v.textContent = Math.round(val);
    if (g) g.textContent = target;
  };
  setMacro("bar-prot",   "macro-prot",   "macro-prot-goal",   macros.prot,   targets.prot);
  setMacro("bar-carbs",  "macro-carbs",  "macro-carbs-goal",  macros.carbs,  targets.carbs);
  setMacro("bar-grasas", "macro-grasas", "macro-grasas-goal", macros.grasas, targets.grasas);

  // Mensaje (kcal restantes)
  let msg = "";
  if (sel === 0)       msg = "Empieza eligiendo tu desayuno";
  else if (sel < meta) msg = (meta - sel) + " kcal restantes";
  else if (pct <= 110) msg = "¡Meta completada! 🎉";
  else                  msg = "⚠️ +" + (sel - meta) + " kcal de más";
  const msgEl = document.getElementById("progreso-msg");
  if (msgEl) msgEl.textContent = msg;

  // ── Alerta visible cuando se supera la meta ──────────────
  const alertaEl  = document.getElementById("alerta-calorias");
  if (!alertaEl) return;

  if (sel > meta) {
    const exceso = sel - meta;
    document.getElementById("alerta-exceso").textContent = exceso;

    // Ordenar comidas seleccionadas de mayor a menor caloría
    const pesadas = SLOTS
      .map(s => ({ slot: s, receta: selecciones[s.id] }))
      .filter(x => x.receta)
      .sort((a, b) => (b.receta.calorias || 0) - (a.receta.calorias || 0))
      .slice(0, 2);

    document.getElementById("alerta-opciones").innerHTML = pesadas.map(({ slot, receta }) => `
      <div class="alerta-opcion">
        <div class="alerta-opcion-info">
          <span class="alerta-slot">${slot.label}</span>
          <span class="alerta-nombre">${receta.nombre.replace(/🌱 /g, "")}</span>
          <span class="alerta-kcal">${receta.calorias} kcal</span>
        </div>
        <button class="alerta-btn-cambiar"
          onclick="seleccionarReceta('${slot.id}','${receta.id}');toggleSeccion('${slot.id}')">
          ↩ Cambiar
        </button>
      </div>`).join("");

    alertaEl.style.display = "block";
  } else {
    alertaEl.style.display = "none";
  }
}

// ─── AVISO PESADO ────────────────────────────────────────────
function mostrarAvisoHeavy(nota) {
  const el = document.getElementById("aviso-heavy");
  if (!el || !nota) return;
  el.textContent = nota;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 6000);
}

// ─── RESUMEN COMPACTO ────────────────────────────────────────
function actualizarResumen() {
  const total   = Object.values(selecciones).filter(Boolean).length;
  const resumen = document.getElementById("resumen-plan");
  if (!resumen) return;

  if (total === SLOTS.length) {
    resumen.style.display = "block";
    document.getElementById("resumen-contenido").innerHTML =
      `<ul class="resumen-lista">${SLOTS.map(s => {
        const r = selecciones[s.id];
        return r ? `<li><span>${s.label}</span> <strong>${r.nombre}</strong> — ${r.calorias} kcal</li>` : "";
      }).join("")}</ul>
      <p class="resumen-total">Total: <strong>${caloriasSeleccionadas()} kcal</strong> / ${caloriasObjetivo()} kcal objetivo</p>`;
  } else {
    resumen.style.display = "none";
  }
}

// ─── PANEL "MI PLAN DEL DÍA" (ver recetas seleccionadas) ────
function actualizarPlanDelDia() {
  const panel = document.getElementById("panel-plan-dia");
  if (!panel) return;

  const selArr = SLOTS.map(s => ({ slot: s, receta: selecciones[s.id] })).filter(x => x.receta);
  if (!selArr.length) {
    panel.style.display = "none";
    return;
  }

  panel.style.display = "block";
  const grid = panel.querySelector(".plan-dia-grid");
  grid.innerHTML = selArr.map(({ slot, receta }) => {
    const fotoUrl = urlFoto(receta);
    const imgHTML = fotoUrl
      ? `<img src="${fotoUrl}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";
    const efHTML = `<div class="plan-card-ef" style="display:${fotoUrl?"none":"flex"}">${getEmoji(receta)}</div>`;
    return `<div class="plan-card" onclick="abrirPlanReceta('${slot.tipo}','${receta.id}')">
      ${imgHTML}${efHTML}
      <div class="plan-card-info">
        <span class="plan-tipo">${slot.label}</span>
        <p>${receta.nombre.replace(/🌱 /g,"")}</p>
        <span class="plan-kcal">${receta.calorias} kcal</span>
      </div>
    </div>`;
  }).join("");
}

function abrirPlanReceta(tipo, id) {
  const receta = RECETAS[tipo]?.find(r => r.id === id);
  if (receta) {
    localStorage.setItem("recetaActual", JSON.stringify(receta));
    window.location.href = "detalle.html";
  }
}

// ─── GUARDAR PLAN ────────────────────────────────────────────
function guardarPlan() {
  verificarYProceder(_guardarPlan);
}

function _guardarPlan() {
  const hoy   = new Date();
  const DIAS  = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const plan  = {
    fecha:     hoy.toLocaleDateString("es-CO"),
    fechaISO:  hoy.toISOString().split("T")[0],   // "2026-05-14" para ordenar
    diaSemana: DIAS[hoy.getDay()],
    tipo:      "plan_dia",
    calorias:  caloriasSeleccionadas(),
    objetivo:  caloriasObjetivo(),
    comidas:   {}
  };
  SLOTS.forEach(s => { if (selecciones[s.id]) plan.comidas[s.id] = selecciones[s.id]; });

  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push(plan);
  localStorage.setItem("historial", JSON.stringify(historial));

  const btn = document.getElementById("btn-guardar-plan");
  if (btn) {
    btn.innerHTML = `✓ Plan guardado &nbsp;·&nbsp; <a href="historial.html" style="color:white;text-decoration:underline">Ver en Mi Historial →</a>`;
    setTimeout(() => { btn.textContent = "Guardar mi plan del día"; }, 5000);
  }
}

// ─── INICIALIZAR ─────────────────────────────────────────────
function initPlaneador() {
  const usuario    = JSON.parse(localStorage.getItem("datosUsuario")) || {};
  const enfermedad = usuario.enfermedad;
  const condicion  = usuario.condicion  || "";
  const objetivo   = usuario.objetivo   || "";
  const etiquetas  = {
    diabetes:"Diabetes", hipertension:"Hipertensión", colesterol:"Colesterol alto",
    obesidad:"Obesidad", celiaquia:"Celiaquía", tiroides:"Tiroides",
    renal:"Enfermedad renal", cardiaca:"Cardiovascular", digestiva:"Digestivo",
    gastritis:"Gastritis"
  };
  const banner = document.getElementById("banner-condicion");
  if (banner) {
    const lineas = [];
    if (enfermedad && enfermedad !== "ninguna")
      lineas.push(`🩺 Recetas adaptadas para: <strong>${etiquetas[enfermedad]||enfermedad}</strong>`);
    if (condicion === "embarazo")
      lineas.push(`🤰 Recetas adaptadas para: <strong>Embarazo</strong> — algunas opciones de riesgo están ocultas`);
    if (condicion === "lactancia")
      lineas.push(`🍼 Recetas adaptadas para: <strong>Lactancia</strong> — mayor aporte calórico recomendado`);
    if (objetivo === "masa")
      lineas.push(`💪 Recetas ordenadas por <strong>mayor proteína</strong> — ideal para ganar músculo`);
    if (lineas.length)
      banner.innerHTML = `<div class="banner-salud"><span>ℹ️</span><div>${lineas.join("<br>")}</div></div>`;
  }

  shufflearRecetas();
  document.getElementById("meta-header").textContent = caloriasObjetivo();
  SLOTS.forEach(s => renderSeccion(s));
  actualizarProgreso();

  // Abrir desayuno por defecto
  toggleSeccion("desayuno");
}

document.addEventListener("DOMContentLoaded", initPlaneador);
