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
      contraindicada: ["digestiva"],
      adaptaciones: {
        diabetes: "Elige naranja o fresas (IG bajo). Reduce el arroz a ½ taza.",
        hipertension: "Prepara el hogao sin sal. Omite el chicharrón si lo hay.",
        colesterol: "Cocina el huevo pochado o hervido en lugar de frito. Reduce los frijoles a ¼ taza.",
        cardiaca: "Reduce la porción total. Cocina el huevo sin freír y omite la grasa del hogao.",
        renal: "Reduce los frijoles a ¼ taza. Porción de huevo: 1 unidad.",
        celiaquia: "Todos los ingredientes son naturalmente sin gluten. ✓",
        gastritis: "Prepara el hogao suave, sin exceso de tomate ácido. Elige papaya o banano como fruta (no cítricos). Come en porción moderada.",
        digestiva: "Cocina el huevo hervido o pochado. Reduce los frijoles. Elige papaya como fruta, no cítricos.",
        obesidad: "Reduce el arroz a ½ taza y los frijoles a ¼ taza. Es un desayuno muy calórico — elige una cena muy liviana.",
        embarazo: "Excelente ✓. Los frijoles aportan ácido fólico y el huevo proteína completa. Elige papaya como fruta.",
      },
      ingredientes: [
        { nombre: "Arroz blanco recalentado",           cantidad: "1 taza cocinada",        calorias: 195 },
        { nombre: "Frijoles rojos con caldo",            cantidad: "½ taza cocinada",        calorias: 110 },
        { nombre: "Huevo frito",                         cantidad: "1 unidad (55 g)",        calorias: 90  },
        { nombre: "Arepa de maíz",                       cantidad: "1 mediana (90 g)",       calorias: 150 },
        { nombre: "Naranja o papaya (fruta del día)",    cantidad: "1 unidad mediana (150 g)",calorias: 65 },
        { nombre: "Hogao (sofrito de tomate y cebolla)", cantidad: "2 cdas. (30 g)",         calorias: 35  },
        { nombre: "Aromática de hierbas o proteína en polvo con agua", cantidad: "1 taza (240 ml)", calorias: 35 },
      ],
      variantes: {
        bajar: {
          calorias: 420, proteinas: 22, carbohidratos: 56, grasas: 8,
          ingredientes: {
            0: { cantidad: "½ taza cocinada", calorias: 95 },
            1: { cantidad: "¼ taza cocinada", calorias: 55 },
            2: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
            3: { cantidad: "1 pequeña (60 g)", calorias: 100 },
          },
          preparacion: { 1: "Cocina el huevo en agua hirviendo por 10 min y sírvelo partido" },
        },
        masa: {
          calorias: 855, proteinas: 46, carbohidratos: 98, grasas: 24,
          ingredientes: {
            2: { cantidad: "2 unidades (110 g)", calorias: 180 },
            6: { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          },
        },
        tonificar: {
          calorias: 540, proteinas: 26, carbohidratos: 68, grasas: 12,
          ingredientes: {
            0: { cantidad: "¾ taza cocinada", calorias: 145 },
            2: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          },
          preparacion: { 1: "Cocina el huevo en agua hirviendo por 10 min y sírvelo partido" },
        },
      },
      preparacion: [
        "Calienta en sartén el arroz y los frijoles sobrantes con un poco de aceite",
        "Fríe el huevo en sartén aparte con sal al gusto",
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Sirve el calentado con el huevo encima y la arepa al lado",
        "Acompaña con hogao fresco, la fruta y una aromática caliente (o proteína en polvo si entrenas)",
      ],
    },
    {
      id: "huevos_pericos_fruta", vegano: false, pesado: false,
      nombre: "Huevos pericos con arepa y fruta",
      descripcion: "Huevos revueltos con tomate y cebolla, arepa tostada y papaya de temporada",
      calorias: 500, proteinas: 23, carbohidratos: 56, grasas: 18,
      foto: "1525184782196-8e2ded604bf7",
      contraindicada: ["digestiva"],
      adaptaciones: {
        diabetes: "Elige papaya verde o fresas. Usa 1 solo huevo si el colesterol es alto.",
        hipertension: "Sin sal adicional en los huevos. Más cilantro para el sabor.",
        colesterol: "Usa 1 solo huevo. Reemplaza el chocolate con leche por aromática. Cocina los huevos sin aceite.",
        cardiaca: "Reduce a 1 huevo. Reemplaza el chocolate con leche por aromática de hierbas.",
        renal: "Reduce a 1 huevo. Omite el queso si lo usas.",
        celiaquia: "La arepa de maíz es sin gluten. ✓",
        gastritis: "Reduce el tomate al mínimo en el sofrito. Elige papaya o banano como fruta. Evita el café de acompañamiento.",
        digestiva: "Reduce el tomate en el sofrito. Reemplaza el chocolate con leche por una aromática de manzanilla. Elige papaya como fruta.",
        embarazo: "Los huevos son esenciales en embarazo ✓. Cocínalos bien revueltos (no queden líquidos). Elige papaya como fruta.",
      },
      ingredientes: [
        { nombre: "Huevos frescos",                   cantidad: "2 unidades (110 g)", calorias: 140 },
        { nombre: "Tomate chonto y cebolla cabezona", cantidad: "½ taza (80 g)",      calorias: 30  },
        { nombre: "Arepa de maíz",                    cantidad: "1 mediana (90 g)",   calorias: 150 },
        { nombre: "Papaya o mango (fruta)",           cantidad: "1 taza picada (150 g)",calorias: 60},
        { nombre: "Chocolate caliente con leche",     cantidad: "1 taza (240 ml)",    calorias: 120 },
      ],
      variantes: {
        bajar: {
          calorias: 340, proteinas: 20, carbohidratos: 38, grasas: 10,
          ingredientes: {
            2: { cantidad: "1 pequeña (60 g)", calorias: 100 },
            4: { nombre: "Aromática de hierbas", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
          preparacion: { 1: "Saltea en sartén antiadherente SIN aceite hasta ablandar" },
        },
        masa: {
          calorias: 740, proteinas: 42, carbohidratos: 66, grasas: 26,
          ingredientes: {
            0: { cantidad: "3 unidades (165 g)", calorias: 210 },
            2: { cantidad: "1 grande (120 g)", calorias: 200 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 400, proteinas: 22, carbohidratos: 44, grasas: 12,
          ingredientes: {
            4: { nombre: "Aromática de hierbas", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
          preparacion: { 1: "Saltea en sartén antiadherente con mínimo aceite" },
        },
      },
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
      nombre: "Changua bogotana acompañada de fruta",
      descripcion: "Sopa de leche con huevo pochado y almojábana — acompañada de fruta fresca de temporada",
      calorias: 430, proteinas: 20, carbohidratos: 46, grasas: 15,
      foto: "1616501268826-ee9731c915d4",
      contraindicada: ["celiaquia", "digestiva"],
      adaptaciones: {
        diabetes: "La fruta de acompañamiento tiene IG bajo ✓. Usa leche descremada para reducir grasas.",
        hipertension: "Sin sal en la changua. Usa leche descremada.",
        colesterol: "Usa leche descremada. Solo 1 huevo.",
        cardiaca: "Usa leche descremada. Solo 1 huevo. Omite la almojábana.",
        renal: "La leche contiene fósforo. Reduce a ½ taza y usa leche baja en fósforo si es posible. Solo 1 huevo.",
        celiaquia: "Omite la almojábana, reemplaza por arepa de maíz.",
        digestiva: "La leche entera puede empeorar los síntomas digestivos. Prefiere omitir esta receta o reemplazar la leche por caldo de pollo suave.",
        gastritis: "La leche tibia puede aliviar el ardor. Usa arepa en lugar de almojábana. Evita el tinto de acompañamiento.",
        embarazo: "Excelente fuente de calcio ✓. Asegúrate de que el huevo esté bien pochado (no crudo). Usa almojábana fresca.",
      },
      ingredientes: [
        { nombre: "Leche entera",              cantidad: "1½ tazas (360 ml)",  calorias: 225 },
        { nombre: "Huevo fresco",              cantidad: "1 unidad (55 g)",    calorias: 70  },
        { nombre: "Almojábana o pan",          cantidad: "1 unidad (60 g)",    calorias: 85  },
        { nombre: "Fruta fresca de temporada",  cantidad: "1 taza (150 g)",     calorias: 50  },
        { nombre: "Cebolla larga y cilantro",  cantidad: "al gusto",           calorias: 0   },
      ],
      variantes: {
        bajar: {
          calorias: 310, proteinas: 18, carbohidratos: 32, grasas: 8,
          ingredientes: {
            0: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 120 },
            2: { nombre: "Arepa pequeña de maíz", cantidad: "1 pequeña (60 g)", calorias: 65 },
          },
        },
        masa: {
          calorias: 570, proteinas: 34, carbohidratos: 52, grasas: 20,
          ingredientes: {
            1: { cantidad: "2 unidades (110 g)", calorias: 140 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 370, proteinas: 20, carbohidratos: 40, grasas: 10,
          ingredientes: {
            0: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 120 },
          },
        },
      },
      preparacion: [
        "Hierve la leche con cebolla larga picada y sal",
        "Rompe el huevo directamente en la leche hirviendo",
        "Tapa y cocina 2-3 min hasta que el huevo esté pochado",
        "Sirve con la almojábana o pan troceado adentro",
        "Acompaña con fruta fresca lavada al lado",
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
      variantes: {
        bajar: {
          calorias: 310, proteinas: 16, carbohidratos: 48, grasas: 4,
          ingredientes: {
            1: { nombre: "Agua", cantidad: "1½ tazas (360 ml)", calorias: 0 },
            3: { cantidad: "½ unidad (60 g)", calorias: 50 },
            4: { nombre: "Stevia", cantidad: "al gusto", calorias: 0 },
          },
        },
        masa: {
          calorias: 600, proteinas: 34, carbohidratos: 72, grasas: 14,
          ingredientes: {
            2: { cantidad: "2 unidades (110 g)", calorias: 140 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo", cantidad: "1 scoop (30 g)", calorias: 120 },
            { nombre: "Mantequilla de maní", cantidad: "1 cda. (15 g)", calorias: 90 },
          ],
        },
        tonificar: {
          calorias: 370, proteinas: 18, carbohidratos: 56, grasas: 6,
          ingredientes: {
            1: { nombre: "Leche descremada o agua", cantidad: "1½ tazas (360 ml)", calorias: 40 },
            4: { nombre: "Stevia o poca panela", cantidad: "al gusto", calorias: 10 },
          },
        },
      },
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
      contraindicada: ["diabetes", "obesidad", "digestiva"],
      adaptaciones: {
        diabetes: "Elige naranja o fresas en lugar de mango (IG más bajo).",
        hipertension: "El queso campesino tiene sodio — reduce la porción. Evita agregar sal y prefiere el café tinto (sin leche).",
        colesterol: "Usa solo 1 huevo y cocínalo hervido en vez de frito.",
        cardiaca: "Cocina el huevo hervido. Omite el queso. Reemplaza el café con leche por aromática.",
        celiaquia: "La arepa de choclo es sin gluten. ✓",
        renal: "Reduce a 1 huevo. Porción de arepa: ½ unidad. Omite el queso (alto en fósforo).",
        gastritis: "Elige banano o papaya como fruta (no mango ni cítricos). Cocina el huevo hervido o pochado en lugar de frito.",
        digestiva: "Cocina el huevo hervido o pochado. Reemplaza el café con leche por aromática. Elige papaya como fruta.",
        embarazo: "Buena opción ✓. El huevo bien cocido (frito o duro). Elige banano o papaya de fruta.",
      },
      ingredientes: [
        { nombre: "Arepa de choclo",           cantidad: "1 grande (180 g)",     calorias: 220 },
        { nombre: "Huevo frito",               cantidad: "1 unidad (55 g)",      calorias: 90  },
        { nombre: "Queso blanco campesino",    cantidad: "1 tajada (20 g)",      calorias: 70  },
        { nombre: "Mango o naranja (fruta)",   cantidad: "1 unidad mediana (150 g)",calorias: 65},
        { nombre: "Café con leche o tinto",    cantidad: "1 taza (240 ml)",      calorias: 30  },
      ],
      variantes: {
        bajar: {
          calorias: 340, proteinas: 16, carbohidratos: 48, grasas: 8,
          ingredientes: {
            0: { cantidad: "1 mediana (120 g)", calorias: 150 },
            1: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
            4: { nombre: "Tinto sin azúcar", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
          preparacion: {
            2: "Cocina el huevo en agua hirviendo por 10 min; pélalo y sírvelo partido",
          },
        },
        masa: {
          calorias: 700, proteinas: 32, carbohidratos: 86, grasas: 22,
          ingredientes: {
            1: { cantidad: "2 unidades (110 g)", calorias: 180 },
            2: { cantidad: "2 tajadas (40 g)", calorias: 140 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 420, proteinas: 18, carbohidratos: 58, grasas: 10,
          ingredientes: {
            1: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
            4: { nombre: "Tinto sin azúcar", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
          preparacion: {
            2: "Cocina el huevo en agua hirviendo por 10 min; pélalo y sírvelo partido",
          },
        },
      },
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
      foto: "1703771402820-e8b0df615aab",
      contraindicada: ["diabetes", "cardiaca", "digestiva"],
      adaptaciones: {
        hipertension: "El queso campesino tiene sodio moderado — limita a 1 tajada. Sin sal adicional.",
        colesterol: "Usa chocolate amargo (>70% cacao) y reduce el queso a 1 tajada delgada. Usa leche descremada.",
        renal: "La leche y el queso son ricos en fósforo. Prefiere esta receta con muy poca frecuencia o usa leche sin lactosa y omite el queso.",
        celiaquia: "La arepa de maíz es sin gluten ✓. Verifica que el chocolate sea puro cacao.",
        obesidad: "Reduce a ½ taza de chocolate y 1 tajada delgada de queso.",
        embarazo: "Excelente fuente de calcio (leche + queso) ✓. Modera el chocolate — tiene cafeína.",
        gastritis: "La leche caliente puede aliviar el ardor ✓. Modera la cantidad de chocolate.",
        digestiva: "El chocolate y la leche entera pueden irritar el sistema digestivo. Prefiere una aromática de manzanilla con arepa y queso blanco, o usa leche sin lactosa en poca cantidad.",
      },
      ingredientes: [
        { nombre: "Chocolate de mesa (pastilla de cacao)", cantidad: "1 pastilla (30 g)", calorias: 120 },
        { nombre: "Leche entera",                          cantidad: "1 taza (240 ml)",   calorias: 150 },
        { nombre: "Arepa de maíz",                         cantidad: "1 mediana (90 g)",  calorias: 90  },
        { nombre: "Queso blanco campesino",                cantidad: "1 tajada (35 g)",   calorias: 70  },
      ],
      variantes: {
        bajar: {
          calorias: 300, proteinas: 14, carbohidratos: 38, grasas: 8,
          ingredientes: {
            0: { cantidad: "½ pastilla (15 g)", calorias: 60 },
            1: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 90 },
            3: { cantidad: "½ tajada (18 g)", calorias: 35 },
          },
        },
        masa: {
          calorias: 610, proteinas: 30, carbohidratos: 62, grasas: 24,
          ingredientes: {
            3: { cantidad: "2 tajadas (70 g)", calorias: 140 },
          },
          ingredientesExtra: [
            { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          ],
        },
        tonificar: {
          calorias: 370, proteinas: 16, carbohidratos: 44, grasas: 12,
          ingredientes: {
            1: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 90 },
            3: { cantidad: "½ tajada (18 g)", calorias: 35 },
          },
        },
      },
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
      foto: "1563690449029-d6e1b8d6003d",
      adaptaciones: {
        diabetes: "El choclo tiene IG moderado. Reduce a ½ mazorca. Evita el mango de fruta.",
        hipertension: "Sin sal adicional. El choclo es naturalmente dulce.",
        colesterol: "Usa 1 solo huevo. Cocina con mínimo aceite en sartén antiadherente.",
        cardiaca: "Usa 1 solo huevo. Cocina sin aceite añadido. Excelente opción cuando se modera el huevo.",
        renal: "Reduce a 1 huevo. El choclo tiene potasio moderado — come porción normal.",
        celiaquia: "Sin gluten ✓. Todos los ingredientes son naturales.",
        digestiva: "Reduce el tomate en el sofrito. El choclo es suave para el estómago ✓.",
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
        { nombre: "Aromática de hierbas o proteína en polvo con agua", cantidad: "1 taza (240 ml)", calorias: 35 },
      ],
      variantes: {
        bajar: {
          calorias: 340, proteinas: 20, carbohidratos: 44, grasas: 8,
          ingredientes: {
            3: { cantidad: "1 pequeña (60 g)", calorias: 100 },
            4: { nombre: "Sal y cilantro (sin aceite)", cantidad: "al gusto", calorias: 5 },
            5: { nombre: "Aromática de hierbas", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
          preparacion: { 0: "Saltea la cebolla y el tomate en sartén antiadherente SIN aceite" },
        },
        masa: {
          calorias: 660, proteinas: 38, carbohidratos: 68, grasas: 22,
          ingredientes: {
            1: { cantidad: "3 unidades (165 g)", calorias: 210 },
            5: { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          },
        },
        tonificar: {
          calorias: 410, proteinas: 22, carbohidratos: 50, grasas: 12,
          ingredientes: {
            3: { cantidad: "1 pequeña (60 g)", calorias: 100 },
            4: { nombre: "Aceite mínimo, sal y cilantro", cantidad: "al gusto", calorias: 15 },
          },
        },
      },
      preparacion: [
        "Saltea la cebolla y el tomate picado en aceite a fuego medio 2-3 min",
        "Agrega el maíz desgranado y cocina 3-4 minutos revolviendo",
        "Bate los huevos y vierte sobre el maíz; revuelve con espátula hasta cuajar",
        "Sazona con sal, pimienta y cilantro picado",
        "Calienta la arepa en comal y sirve con una aromática caliente (o proteína en polvo si entrenas)",
      ],
    },
    // ── VEGANOS ────────────────────────────────────────────
    {
      id: "avena_vegana_fruta", vegano: true, pesado: false,
      nombre: "🌱 Avena vegana con fruta y semillas",
      descripcion: "Avena en leche de avena o coco, con fruta fresca y semillas de chía — desayuno 100% vegetal",
      calorias: 390, proteinas: 12, carbohidratos: 60, grasas: 12,
      foto: "1497888329096-51c27beff665",
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
      variantes: {
        bajar: {
          calorias: 280, proteinas: 10, carbohidratos: 44, grasas: 8,
          ingredientes: {
            1: { nombre: "Agua", cantidad: "1½ tazas (360 ml)", calorias: 0 },
            2: { nombre: "Fresas (fruta)", cantidad: "½ taza (80 g)", calorias: 40 },
          },
        },
        masa: {
          calorias: 530, proteinas: 22, carbohidratos: 72, grasas: 18,
          ingredientes: { 0: { cantidad: "¾ taza (65 g)", calorias: 220 } },
          ingredientesExtra: [
            { nombre: "Proteína vegetal en polvo", cantidad: "1 scoop (30 g)", calorias: 110 },
            { nombre: "Mantequilla de maní", cantidad: "1 cda. (15 g)", calorias: 90 },
          ],
        },
        tonificar: {
          calorias: 340, proteinas: 12, carbohidratos: 52, grasas: 10,
          ingredientes: { 2: { nombre: "Fresas (fruta)", cantidad: "½ taza (80 g)", calorias: 40 } },
        },
      },
      preparacion: [
        "Hierve la leche vegetal con una pizca de canela",
        "Agrega la avena y cocina revolviendo 5 min a fuego medio",
        "Endulza con panela o stevia al gusto",
        "Sirve con la fruta en rodajas y las semillas de chía encima",
      ],
    },
    {
      id: "arepa_aguacate_vegana", vegano: false, pesado: false,
      nombre: "Arepa con aguacate, huevo y fruta",
      descripcion: "Arepa de maíz con aguacate cremoso, huevos cocidos, tomate fresco y fruta de temporada",
      calorias: 550, proteinas: 21, carbohidratos: 52, grasas: 24,
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
        { nombre: "Huevos cocidos",            cantidad: "2 unidades (110 g)",    calorias: 140 },
        { nombre: "Tomate chonto",             cantidad: "1 unidad (100 g)",      calorias: 20  },
        { nombre: "Fruta del día (fresas, mango o naranja)", cantidad: "1 porción (150 g)", calorias: 60 },
        { nombre: "Sal, limón y cilantro",     cantidad: "al gusto",              calorias: 0   },
        { nombre: "Bebida: chocolate, café o aromática", cantidad: "1 taza (240 ml)", calorias: 50 },
      ],
      variantes: {
        bajar: {
          calorias: 380, proteinas: 19, carbohidratos: 38, grasas: 14,
          ingredientes: {
            0: { cantidad: "1 pequeña (60 g)", calorias: 100 },
            1: { cantidad: "¼ aguacate (40 g)", calorias: 65 },
            2: { cantidad: "1 unidad (55 g)", calorias: 70 },
            6: { nombre: "Aromática de hierbas o té", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
        },
        masa: {
          calorias: 750, proteinas: 38, carbohidratos: 66, grasas: 32,
          ingredientes: {
            0: { cantidad: "1 grande (120 g)", calorias: 200 },
            1: { cantidad: "¾ aguacate (120 g)", calorias: 195 },
            2: { cantidad: "3 unidades (165 g)", calorias: 210 },
            6: { nombre: "Chocolate caliente con leche", cantidad: "1 taza (240 ml)", calorias: 120 },
          },
        },
        tonificar: {
          calorias: 460, proteinas: 20, carbohidratos: 44, grasas: 18,
          ingredientes: {
            1: { cantidad: "⅓ aguacate (55 g)", calorias: 90 },
            6: { nombre: "Café negro o aromática", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
        },
      },
      preparacion: [
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Machuca el aguacate con sal y limón para hacer el guacamole",
        "Unta el guacamole sobre la arepa caliente",
        "Cocina los huevos en agua hirviendo por 10 min; pélalos y córtalos en mitades",
        "Coloca los huevos y rodajas de tomate sobre la arepa con cilantro",
        "Acompaña con la fruta fresca y la bebida de tu preferencia",
      ],
    },
    {
      id: "arepa_huevo_aromatica", vegano: false, pesado: false,
      nombre: "Arepa con huevo cocido y aromática",
      descripcion: "Arepa de maíz tostada con huevo cocido partido, aguacate y aromática — suave y sin lácteos",
      calorias: 380, proteinas: 18, carbohidratos: 38, grasas: 16,
      foto: null,
      adaptaciones: {
        diabetes: "El aguacate tiene IG = 0 ✓. Excelente opción baja en azúcar.",
        hipertension: "Sin sal adicional. El aguacate es rico en potasio ✓.",
        colesterol: "El aguacate tiene grasas monoinsaturadas beneficiosas ✓. Solo 1 huevo.",
        cardiaca: "Sin grasa saturada ✓. Excelente opción cardíaca.",
        renal: "Reduce a 1 huevo. El aguacate tiene potasio — limita a ¼.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Suave y sin irritantes ✓. Muy recomendado.",
        digestiva: "Sin lácteos, sin frijoles, sin frituras ✓. Una de las mejores opciones digestivas.",
        embarazo: "El huevo aporta proteína y colina ✓. El aguacate tiene ácido fólico.",
        obesidad: "Moderada en calorías ✓. Reduce el aguacate a ¼ para bajar más.",
      },
      ingredientes: [
        { nombre: "Arepa de maíz",      cantidad: "1 mediana (90 g)",   calorias: 150 },
        { nombre: "Huevos cocidos",     cantidad: "2 unidades (110 g)", calorias: 140 },
        { nombre: "Aguacate hass",      cantidad: "¼ aguacate (40 g)",  calorias: 65  },
        { nombre: "Sal y cilantro",     cantidad: "al gusto",           calorias: 0   },
        { nombre: "Aromática de hierbas", cantidad: "1 taza (240 ml)",  calorias: 5   },
      ],
      variantes: {
        bajar: {
          calorias: 290, proteinas: 14, carbohidratos: 28, grasas: 10,
          ingredientes: {
            0: { cantidad: "1 pequeña (60 g)", calorias: 100 },
            1: { cantidad: "1 unidad (55 g)", calorias: 70 },
          },
        },
        masa: {
          calorias: 540, proteinas: 32, carbohidratos: 44, grasas: 22,
          ingredientes: {
            1: { cantidad: "3 unidades (165 g)", calorias: 210 },
            2: { cantidad: "½ aguacate (80 g)", calorias: 130 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 330, proteinas: 16, carbohidratos: 32, grasas: 12,
          ingredientes: {
            0: { cantidad: "1 pequeña (60 g)", calorias: 100 },
          },
        },
      },
      preparacion: [
        "Calienta la arepa en comal hasta dorar por ambos lados",
        "Cocina los huevos en agua hirviendo por 10 min; pélalos y córtalos en mitades",
        "Unta un poco de aguacate sobre la arepa",
        "Coloca los huevos encima con sal y cilantro",
        "Acompaña con aromática de hierbas caliente",
      ],
    },
    {
      id: "caldo_huevo_papa", vegano: false, pesado: false,
      nombre: "Caldo de huevo con papa y cilantro",
      descripcion: "Caldo casero con huevo pochado, papa criolla y cilantro — reconfortante y suave para el estómago",
      calorias: 250, proteinas: 14, carbohidratos: 30, grasas: 6,
      foto: null,
      adaptaciones: {
        diabetes: "Bajo en azúcar ✓. La papa criolla tiene IG moderado — limita a 1 pequeña.",
        hipertension: "Sin sal o con muy poca. Usa cilantro y cebolla para sazón ✓.",
        colesterol: "Solo 1 huevo. El caldo claro es muy bajo en grasa ✓.",
        cardiaca: "Sin grasa saturada ✓. Excelente opción cardíaca.",
        renal: "La papa tiene potasio. Reduce a ½ papa. Solo 1 huevo.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Excelente para gastritis ✓. El caldo caliente es alcalino y reconfortante.",
        digestiva: "Una de las mejores opciones para problemas digestivos ✓. Suave, sin irritantes, fácil de digerir.",
        embarazo: "El huevo aporta proteína ✓. Agrega espinaca para más hierro y ácido fólico.",
        obesidad: "Muy bajo en calorías ✓. Excelente opción ligera.",
      },
      ingredientes: [
        { nombre: "Huevos frescos",            cantidad: "2 unidades (110 g)", calorias: 140 },
        { nombre: "Papa criolla",              cantidad: "2 pequeñas (120 g)", calorias: 80  },
        { nombre: "Cebolla larga y cilantro",  cantidad: "al gusto",           calorias: 10  },
        { nombre: "Sal",                       cantidad: "al gusto",           calorias: 0   },
        { nombre: "Aromática de hierbas",      cantidad: "1 taza (240 ml)",    calorias: 5   },
      ],
      variantes: {
        bajar: {
          calorias: 190, proteinas: 10, carbohidratos: 22, grasas: 4,
          ingredientes: {
            0: { cantidad: "1 unidad (55 g)", calorias: 70 },
            1: { cantidad: "1 pequeña (60 g)", calorias: 40 },
          },
        },
        masa: {
          calorias: 380, proteinas: 26, carbohidratos: 36, grasas: 10,
          ingredientes: {
            0: { cantidad: "3 unidades (165 g)", calorias: 210 },
          },
          ingredientesExtra: [
            { nombre: "Arepa de maíz", cantidad: "1 mediana (90 g)", calorias: 150 },
          ],
        },
        tonificar: {
          calorias: 220, proteinas: 14, carbohidratos: 26, grasas: 5,
          ingredientes: {
            1: { cantidad: "1 pequeña (60 g)", calorias: 40 },
          },
        },
      },
      preparacion: [
        "Hierve agua con cebolla larga picada y sal",
        "Agrega las papas criollas peladas y cocina 15 min",
        "Rompe los huevos directamente en el caldo hirviendo",
        "Cocina 3 min hasta que los huevos estén pochados",
        "Sirve caliente con abundante cilantro fresco y aromática al lado",
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
      foto: "1611080626919-7cf5a9dbab5b",
      adaptaciones: {
        diabetes: "El chontaduro tiene carbohidratos moderados. Limita a 3-4 unidades y omite la sal.",
        hipertension: "Omite la sal — el chontaduro con sal puede ser alto en sodio. Usa limón solo para el sabor.",
        colesterol: "Sin grasa saturada ✓. Las grasas del chontaduro son saludables (omega-6).",
        renal: "El chontaduro tiene potasio moderado. Come 2-3 unidades máximo.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "Rico en betacaroteno y grasas saludables ✓. Excelente once en embarazo.",
        gastritis: "Sin ácidos ni irritantes ✓. El chontaduro es suave para el estómago. Reduce el limón.",
        digestiva: "Muy suave y fácil de digerir ✓. Usa poco limón y omite la sal.",
        obesidad: "Muy nutritivo y relativamente bajo en calorías ✓. Porción de 3-4 unidades.",
      },
      ingredientes: [
        { nombre: "Chontaduro cocido",  cantidad: "4 unidades (160 g)", calorias: 150 },
        { nombre: "Sal y limón",        cantidad: "al gusto",           calorias: 0   },
      ],
      variantes: {
        bajar: {
          calorias: 100, proteinas: 2, carbohidratos: 16, grasas: 3,
          ingredientes: { 0: { cantidad: "3 unidades (120 g)", calorias: 100 } },
        },
        masa: {
          calorias: 200, proteinas: 4, carbohidratos: 32, grasas: 7,
          ingredientes: { 0: { cantidad: "6 unidades (240 g)", calorias: 200 } },
        },
        tonificar: {
          calorias: 130, proteinas: 3, carbohidratos: 20, grasas: 4,
          ingredientes: { 0: { cantidad: "3-4 unidades (140 g)", calorias: 130 } },
        },
      },
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
      foto: "1605613160690-4606345d5d39",
      contraindicada: ["diabetes", "digestiva"],
      adaptaciones: {
        hipertension: "El queso campesino tiene sodio. Reduce a ½ tajada. El agua de panela es naturalmente libre de sodio ✓.",
        colesterol: "El queso tiene grasa saturada. Reduce a ½ tajada o usa quesito bajo en grasa.",
        renal: "El queso tiene fósforo y el agua de panela tiene potasio. Reduce el queso a ½ tajada y come con poca frecuencia.",
        celiaquia: "La arepa de maíz es sin gluten ✓. Verifica que el queso no tenga aditivos con gluten.",
        gastritis: "El queso y la arepa son neutros ✓. El agua de panela caliente puede ser reconfortante.",
        digestiva: "Opción suave ✓. Come lentamente y en porción pequeña.",
        embarazo: "El queso aporta calcio ✓. Limita el agua de panela a ½ taza por el azúcar.",
        obesidad: "Una once calórica. Limita a ½ arepa con 1 tajada delgada de queso.",
      },
      ingredientes: [
        { nombre: "Arepa de maíz pequeña", cantidad: "1 unidad (70 g)",  calorias: 160 },
        { nombre: "Queso campesino",       cantidad: "1 tajada (25 g)",  calorias: 80  },
        { nombre: "Agua de panela",        cantidad: "½ taza (120 ml)",  calorias: 30  },
      ],
      variantes: {
        bajar: {
          calorias: 190, proteinas: 7, carbohidratos: 28, grasas: 6,
          ingredientes: {
            0: { cantidad: "½ unidad (35 g)", calorias: 80 },
            1: { cantidad: "½ tajada (12 g)", calorias: 40 },
            2: { nombre: "Aromática sin azúcar", cantidad: "1 taza (240 ml)", calorias: 0 },
          },
        },
        masa: {
          calorias: 380, proteinas: 16, carbohidratos: 52, grasas: 14,
          ingredientes: {
            0: { cantidad: "1 unidad grande (100 g)", calorias: 230 },
            1: { cantidad: "2 tajadas (50 g)", calorias: 160 },
          },
        },
        tonificar: {
          calorias: 230, proteinas: 8, carbohidratos: 34, grasas: 7,
          ingredientes: {
            2: { nombre: "Aromática sin azúcar", cantidad: "1 taza (240 ml)", calorias: 0 },
          },
        },
      },
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
      contraindicada: ["gastritis", "digestiva"],
      ingredientes: [
        { nombre: "Mango Tommy",                  cantidad: "½ unidad (120 g)",  calorias: 60  },
        { nombre: "Papaya o piña",                cantidad: "1 taza picada (150 g)",calorias: 55},
        { nombre: "Sal, limón, ají (opcional)",   cantidad: "al gusto",          calorias: 15  },
      ],
      variantes: {
        bajar: {
          calorias: 90, proteinas: 1, carbohidratos: 22, grasas: 0,
          ingredientes: {
            0: { cantidad: "⅓ unidad (80 g)", calorias: 40 },
            1: { cantidad: "½ taza (100 g)", calorias: 35 },
          },
        },
        masa: {
          calorias: 180, proteinas: 3, carbohidratos: 42, grasas: 1,
          ingredientes: {
            0: { cantidad: "¾ unidad (180 g)", calorias: 90 },
            1: { cantidad: "1½ tazas (220 g)", calorias: 80 },
          },
        },
        tonificar: {
          calorias: 110, proteinas: 2, carbohidratos: 26, grasas: 1,
          ingredientes: {
            0: { cantidad: "½ unidad (100 g)", calorias: 50 },
          },
        },
      },
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
      contraindicada: ["diabetes", "digestiva"],
      adaptaciones: {
        diabetes: "La yuca tiene almidón de IG alto. Si lo comes, limita a 1 unidad y acompáñala con proteína adicional.",
        hipertension: "El queso del pandebono tiene sodio. Come con moderación (máx. 2 unidades).",
        colesterol: "El queso blanco es moderado en grasa saturada ✓. Limita a 2 unidades.",
        renal: "El queso tiene fósforo. Limita a 1 unidad si hay restricción de fósforo.",
        celiaquia: "La yuca es naturalmente sin gluten ✓.",
        gastritis: "Neutro para el estómago ✓. Come tibio y en poca cantidad.",
        digestiva: "Fácil de digerir si se come tibio ✓. Máximo 1-2 unidades.",
        embarazo: "Aporta energía y calcio (del queso) ✓. Máximo 2 unidades como once.",
        obesidad: "Alta densidad calórica. Limita a 1 unidad y acompaña con fruta.",
      },
      ingredientes: [
        { nombre: "Pandebono",         cantidad: "2 unidades (80 g)", calorias: 210 },
        { nombre: "Aromática o tinto", cantidad: "1 taza (240 ml)",   calorias: 0   },
      ],
      variantes: {
        bajar: {
          calorias: 110, proteinas: 3, carbohidratos: 15, grasas: 4,
          ingredientes: { 0: { cantidad: "1 unidad (40 g)", calorias: 110 } },
        },
        masa: {
          calorias: 320, proteinas: 9, carbohidratos: 45, grasas: 12,
          ingredientes: { 0: { cantidad: "3 unidades (120 g)", calorias: 320 } },
        },
        tonificar: {
          calorias: 160, proteinas: 5, carbohidratos: 22, grasas: 6,
          ingredientes: { 0: { cantidad: "1½ unidades (60 g)", calorias: 160 } },
        },
      },
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
      contraindicada: ["celiaquia", "digestiva"],
      adaptaciones: {
        diabetes: "Elige yogur griego natural sin azúcar. Usa granola sin azúcar o reemplaza por semillas de chía. Fresas en lugar de banano (IG más bajo).",
        hipertension: "El yogur natural no tiene sodio significativo ✓. Excelente once.",
        colesterol: "Usa yogur descremado para reducir la grasa láctea ✓.",
        renal: "El yogur tiene fósforo. Reduce a ½ taza. Omite la granola si hay restricción severa.",
        celiaquia: "Usa granola certificada sin gluten o reemplaza por semillas de chía ✓.",
        gastritis: "El yogur natural protege la mucosa estomacal ✓. Usa granola suave, sin nueces duras.",
        digestiva: "El yogur natural con probióticos es excelente para el sistema digestivo ✓. Prefiere la granola sin azúcar.",
        embarazo: "Excelente fuente de calcio y probióticos ✓. Usa yogur natural pasteurizado.",
        obesidad: "Muy nutritivo y saciante ✓. Reduce la granola a 1 cda. por las calorías.",
      },
      ingredientes: [
        { nombre: "Yogur natural sin azúcar", cantidad: "1 taza (200 g)", calorias: 150 },
        { nombre: "Granola",                  cantidad: "3 cdas. (30 g)", calorias: 90  },
        { nombre: "Fresas o banano",          cantidad: "½ porción (80 g)",calorias: 40 },
      ],
      variantes: {
        bajar: {
          calorias: 180, proteinas: 10, carbohidratos: 26, grasas: 3,
          ingredientes: {
            0: { nombre: "Yogur griego descremado", cantidad: "¾ taza (150 g)", calorias: 100 },
            1: { cantidad: "1 cda. (10 g)", calorias: 40 },
          },
        },
        masa: {
          calorias: 400, proteinas: 20, carbohidratos: 52, grasas: 12,
          ingredientes: {
            0: { nombre: "Yogur griego entero", cantidad: "1½ tazas (300 g)", calorias: 250 },
            1: { cantidad: "4 cdas. (40 g)", calorias: 120 },
          },
        },
        tonificar: {
          calorias: 240, proteinas: 14, carbohidratos: 34, grasas: 4,
          ingredientes: {
            0: { nombre: "Yogur griego descremado", cantidad: "1 taza (200 g)", calorias: 130 },
            1: { cantidad: "2 cdas. (20 g)", calorias: 60 },
          },
        },
      },
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
      foto: "1611835116500-03c9eb3c7200",
      contraindicada: ["diabetes", "colesterol", "obesidad", "gastritis", "digestiva"],
      ingredientes: [
        { nombre: "Obleas",                    cantidad: "2 unidades (30 g)",  calorias: 80  },
        { nombre: "Arequipe (dulce de leche)", cantidad: "2 cdas. (40 g)",    calorias: 120 },
        { nombre: "Queso rallado o bocadillo", cantidad: "1 cda. (15 g)",     calorias: 20  },
      ],
      variantes: {
        bajar: {
          calorias: 140, proteinas: 3, carbohidratos: 24, grasas: 3,
          ingredientes: {
            0: { cantidad: "1 unidad (15 g)", calorias: 40 },
            1: { cantidad: "1 cda. (20 g)", calorias: 60 },
            2: { cantidad: "½ cda. (8 g)", calorias: 10 },
          },
        },
        masa: {
          calorias: 320, proteinas: 6, carbohidratos: 54, grasas: 9,
          ingredientes: {
            0: { cantidad: "3 unidades (45 g)", calorias: 120 },
            1: { cantidad: "3 cdas. (60 g)", calorias: 180 },
          },
        },
        tonificar: {
          calorias: 180, proteinas: 4, carbohidratos: 30, grasas: 5,
          ingredientes: {
            1: { cantidad: "1½ cdas. (30 g)", calorias: 90 },
          },
        },
      },
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
      foto: "1671731476488-776233e000e0",
      contraindicada: ["diabetes", "obesidad", "gastritis", "digestiva"],
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
      variantes: {
        bajar: {
          calorias: 130, proteinas: 4, carbohidratos: 20, grasas: 4,
          ingredientes: {
            0: { cantidad: "1 tajada (30 g)", calorias: 65 },
            1: { cantidad: "½ tajada (15 g)", calorias: 35 },
          },
        },
        masa: {
          calorias: 280, proteinas: 10, carbohidratos: 40, grasas: 10,
          ingredientes: {
            0: { cantidad: "3 tajadas (90 g)", calorias: 195 },
            1: { cantidad: "1½ tajadas (45 g)", calorias: 105 },
          },
        },
        tonificar: {
          calorias: 170, proteinas: 5, carbohidratos: 26, grasas: 5,
          ingredientes: {
            0: { cantidad: "1½ tajadas (45 g)", calorias: 100 },
          },
        },
      },
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
      foto: "1666613710176-2596ff0c844b",
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
      variantes: {
        bajar: {
          calorias: 180, proteinas: 5, carbohidratos: 24, grasas: 6,
          ingredientes: { 0: { cantidad: "60 g", calorias: 105 } },
          preparacion: { 4: "Hornea a 200°C por 20 min en lugar de freír" },
        },
        masa: {
          calorias: 350, proteinas: 10, carbohidratos: 46, grasas: 14,
          ingredientes: {
            1: { cantidad: "150 g", calorias: 105 },
            2: { cantidad: "2 cdas. (30 g)", calorias: 80 },
          },
        },
        tonificar: {
          calorias: 210, proteinas: 6, carbohidratos: 28, grasas: 8,
          preparacion: { 4: "Hornea a 200°C por 20 min en lugar de freír" },
        },
      },
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
      foto: "1646340925478-844ca7a38e9c",
      ingredientes: [
        { nombre: "Fruta mixta (mango, banano, fresas)", cantidad: "1 taza (150 g)",   calorias: 120 },
        { nombre: "Maní tostado sin sal",                cantidad: "1 puñado (25 g)",  calorias: 80  },
      ],
      variantes: {
        bajar: {
          calorias: 140, proteinas: 4, carbohidratos: 20, grasas: 5,
          ingredientes: {
            0: { cantidad: "¾ taza (110 g)", calorias: 90 },
            1: { cantidad: "½ puñado (12 g)", calorias: 50 },
          },
        },
        masa: {
          calorias: 300, proteinas: 12, carbohidratos: 34, grasas: 16,
          ingredientes: {
            0: { cantidad: "1½ tazas (220 g)", calorias: 180 },
            1: { cantidad: "2 puñados (50 g)", calorias: 160 },
          },
        },
        tonificar: {
          calorias: 170, proteinas: 6, carbohidratos: 22, grasas: 7,
          ingredientes: {
            0: { cantidad: "¾ taza (110 g)", calorias: 90 },
          },
        },
      },
      preparacion: [
        "Pica las frutas y mézclalas en un recipiente",
        "Agrega el maní tostado encima",
        "Opcional: semillas de chía o linaza",
      ],
    },
    {
      id: "galletas_arroz_mani", vegano: true, pesado: false,
      nombre: "🌱 Galletas de arroz con mantequilla de maní",
      descripcion: "Galletas de arroz inflado con mantequilla de maní y banano — sin lácteos, sin gluten, fácil de digerir",
      calorias: 220, proteinas: 7, carbohidratos: 28, grasas: 10,
      foto: null,
      adaptaciones: {
        diabetes: "La mantequilla de maní tiene IG bajo ✓. Usa ½ banano para reducir azúcar.",
        hipertension: "Elige mantequilla de maní sin sal ✓.",
        colesterol: "La grasa del maní es monoinsaturada ✓. Beneficiosa para el colesterol.",
        cardiaca: "Grasas saludables del maní ✓. Sin sodio si se elige sin sal.",
        renal: "El maní tiene fósforo. Reduce a ½ cda.",
        celiaquia: "Sin gluten ✓. Verifica que las galletas sean de arroz puro.",
        gastritis: "Suave para el estómago ✓. El banano es alcalino y protector.",
        digestiva: "Excelente para problemas digestivos ✓. Sin lácteos, sin gluten, sin irritantes. Fácil de digerir.",
        embarazo: "La mantequilla de maní aporta ácido fólico y proteína vegetal ✓.",
        obesidad: "Porción controlada. Limita a 1 cda. de mantequilla de maní.",
      },
      ingredientes: [
        { nombre: "Galletas de arroz inflado", cantidad: "3 unidades (30 g)", calorias: 105 },
        { nombre: "Mantequilla de maní",       cantidad: "1 cda. (15 g)",     calorias: 90  },
        { nombre: "Banano en rodajas",         cantidad: "½ unidad (60 g)",   calorias: 50  },
      ],
      variantes: {
        bajar: {
          calorias: 160, proteinas: 5, carbohidratos: 22, grasas: 6,
          ingredientes: {
            0: { cantidad: "2 unidades (20 g)", calorias: 70 },
            1: { cantidad: "½ cda. (8 g)", calorias: 45 },
            2: { cantidad: "¼ unidad (30 g)", calorias: 25 },
          },
        },
        masa: {
          calorias: 340, proteinas: 12, carbohidratos: 36, grasas: 16,
          ingredientes: {
            0: { cantidad: "4 unidades (40 g)", calorias: 140 },
            1: { cantidad: "2 cdas. (30 g)", calorias: 180 },
          },
        },
        tonificar: {
          calorias: 190, proteinas: 6, carbohidratos: 24, grasas: 8,
          ingredientes: {
            2: { cantidad: "¼ unidad (30 g)", calorias: 25 },
          },
        },
      },
      preparacion: [
        "Unta la mantequilla de maní sobre las galletas de arroz",
        "Coloca rodajas de banano encima",
        "Come de inmediato para que queden crujientes",
      ],
    },
    {
      id: "compota_natural", vegano: true, pesado: false,
      nombre: "🌱 Compota natural de manzana y pera",
      descripcion: "Fruta cocida suave con canela — ideal para estómagos sensibles, sin azúcar añadida",
      calorias: 130, proteinas: 1, carbohidratos: 32, grasas: 0,
      foto: null,
      adaptaciones: {
        diabetes: "Sin azúcar añadida ✓. La fibra de la fruta cocida ralentiza la absorción. Porción moderada.",
        hipertension: "Sin sodio ✓. Las frutas cocidas son excelentes.",
        colesterol: "Sin grasa ✓. La pectina de la manzana ayuda a reducir colesterol.",
        cardiaca: "Sin grasa, sin sodio ✓. Excelente once cardíaca.",
        renal: "La manzana es baja en potasio ✓. Prefiere manzana sobre la pera.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Excelente para gastritis ✓. La manzana cocida es alcalina y protectora de la mucosa.",
        digestiva: "Una de las mejores opciones digestivas ✓. La fruta cocida es suavísima, sin irritantes, sin fibra cruda.",
        embarazo: "Suave y rica en fibra ✓. La pera ayuda con el estreñimiento del embarazo.",
        obesidad: "Muy baja en calorías ✓. Sin grasa. Saciante por la fibra.",
      },
      ingredientes: [
        { nombre: "Manzana roja pelada",  cantidad: "1 unidad (150 g)", calorias: 70  },
        { nombre: "Pera pelada",          cantidad: "1 unidad (150 g)", calorias: 55  },
        { nombre: "Canela en rama",       cantidad: "1 rama",           calorias: 5   },
      ],
      variantes: {
        bajar: {
          calorias: 100, proteinas: 1, carbohidratos: 24, grasas: 0,
          ingredientes: {
            0: { cantidad: "½ unidad (75 g)", calorias: 35 },
            1: { cantidad: "½ unidad (75 g)", calorias: 28 },
          },
        },
        masa: {
          calorias: 230, proteinas: 4, carbohidratos: 40, grasas: 6,
          ingredientesExtra: [
            { nombre: "Granola sin azúcar", cantidad: "3 cdas. (30 g)", calorias: 90 },
          ],
        },
        tonificar: {
          calorias: 120, proteinas: 1, carbohidratos: 28, grasas: 0,
          ingredientes: {
            0: { cantidad: "¾ unidad (110 g)", calorias: 50 },
          },
        },
      },
      preparacion: [
        "Pela y corta la manzana y la pera en cubos pequeños",
        "Cocina en olla con ½ taza de agua y la canela a fuego bajo por 15 min",
        "Machaca suavemente con tenedor (no licuar — dejar textura)",
        "Sirve tibia o a temperatura ambiente",
      ],
    },
    {
      id: "arepa_aguacate_once", vegano: true, pesado: false,
      nombre: "🌱 Arepa con aguacate",
      descripcion: "Mini arepa de maíz con aguacate untado — sin queso, sin lácteos, suave para el estómago",
      calorias: 230, proteinas: 4, carbohidratos: 28, grasas: 10,
      foto: null,
      adaptaciones: {
        diabetes: "El aguacate tiene IG = 0 ✓. La arepa de maíz tiene IG moderado.",
        hipertension: "Sin sal adicional. El aguacate aporta potasio ✓.",
        colesterol: "El aguacate tiene grasas monoinsaturadas que bajan el LDL ✓.",
        cardiaca: "Sin grasa saturada ✓. El aguacate es cardioprotector.",
        renal: "El aguacate tiene potasio. Limita a ¼ aguacate.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Suave y sin irritantes ✓. El aguacate es neutro para el estómago.",
        digestiva: "Sin lácteos, sin queso, sin irritantes ✓. Fácil de digerir. Excelente opción.",
        embarazo: "El aguacate aporta ácido fólico y grasas saludables ✓.",
        obesidad: "El aguacate es calórico. Limita a ¼ aguacate para reducir calorías.",
      },
      ingredientes: [
        { nombre: "Arepa de maíz pequeña", cantidad: "1 unidad (70 g)",  calorias: 120 },
        { nombre: "Aguacate hass",         cantidad: "¼ aguacate (40 g)", calorias: 65 },
        { nombre: "Sal, limón y cilantro", cantidad: "al gusto",          calorias: 0  },
        { nombre: "Aromática de hierbas",  cantidad: "1 taza (240 ml)",   calorias: 5  },
      ],
      variantes: {
        bajar: {
          calorias: 170, proteinas: 3, carbohidratos: 22, grasas: 7,
          ingredientes: {
            0: { cantidad: "½ unidad (35 g)", calorias: 60 },
          },
        },
        masa: {
          calorias: 350, proteinas: 10, carbohidratos: 38, grasas: 18,
          ingredientes: {
            0: { cantidad: "1 mediana (90 g)", calorias: 150 },
            1: { cantidad: "½ aguacate (80 g)", calorias: 130 },
          },
          ingredientesExtra: [
            { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          ],
        },
        tonificar: {
          calorias: 200, proteinas: 4, carbohidratos: 24, grasas: 8,
          ingredientes: {
            0: { cantidad: "1 pequeña (60 g)", calorias: 100 },
          },
        },
      },
      preparacion: [
        "Calienta la arepa en comal hasta dorar",
        "Machuca el aguacate con sal, limón y cilantro",
        "Unta el guacamole sobre la arepa caliente",
        "Acompaña con aromática de hierbas",
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
        colesterol: "Usa pechuga sin piel. Retira la grasa superficial del caldo antes de servir ✓.",
        cardiaca: "Usa pechuga sin piel y retira la grasa del caldo. El caldo de pollo desgrasado es cardioprotector ✓. Evita el arroz de acompañamiento.",
        renal: "Reduce la porción de pollo a 80g. Omite la yuca.",
        celiaquia: "Sin gluten ✓. El sancocho es naturalmente libre de gluten.",
        gastritis: "El sancocho es una de las mejores opciones ✓. Evita el ají casero de acompañamiento. Come en porciones moderadas.",
        digestiva: "Excelente opción ✓. Caldo suave, bien cocido y sin grasas. Omite el ají casero.",
        embarazo: "Excelente ✓. El pollo aporta proteína completa y el caldo hidrata. Muy recomendado en embarazo.",
      },
      ingredientes: [
        { nombre: "Muslo de pollo",              cantidad: "150 g",          calorias: 200 },
        { nombre: "Papa criolla y pastusa",      cantidad: "1 c/u (200 g)",  calorias: 130 },
        { nombre: "Yuca",                        cantidad: "50 g",           calorias: 65  },
        { nombre: "Mazorca (choclo)",            cantidad: "½ mazorca (80 g)",calorias: 70 },
        { nombre: "Hogao, cilantro, comino",     cantidad: "al gusto",       calorias: 25  },
      ],
      variantes: {
        bajar: {
          calorias: 350, proteinas: 32, carbohidratos: 36, grasas: 6,
          ingredientes: {
            0: { nombre: "Pechuga de pollo sin piel", cantidad: "120 g", calorias: 140 },
            1: { cantidad: "1 c/u (150 g)", calorias: 100 },
            2: { cantidad: "30 g", calorias: 40 },
          },
        },
        masa: {
          calorias: 650, proteinas: 48, carbohidratos: 62, grasas: 18,
          ingredientes: {
            0: { cantidad: "200 g", calorias: 270 },
            1: { cantidad: "1 c/u (250 g)", calorias: 160 },
          },
          ingredientesExtra: [
            { nombre: "Arroz blanco", cantidad: "½ taza cocinada", calorias: 95 },
          ],
        },
        tonificar: {
          calorias: 420, proteinas: 36, carbohidratos: 44, grasas: 8,
          ingredientes: {
            0: { nombre: "Pechuga de pollo sin piel", cantidad: "140 g", calorias: 165 },
          },
        },
      },
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
      foto: "1714383611437-485d97141913",
      adaptaciones: {
        diabetes: "Reduce el arroz a ½ taza. Añade más verduras al arroz.",
        hipertension: "Cocina sin sal; usa comino, ajo y cúrcuma para sazón.",
        colesterol: "Usa pechuga sin piel. Omite los patacones (fritura). Cocina el arroz con mínimo aceite.",
        cardiaca: "Usa pechuga sin piel. Omite los patacones. Reduce el arroz a ½ taza y aumenta las verduras.",
        renal: "Reduce el pollo a 80g. Omite los patacones.",
        celiaquia: "Sin gluten ✓. El arroz y el pollo son naturalmente sin gluten.",
        gastritis: "Omite los patacones (fritura). Prepara el hogao con poco tomate. Come despacio y en porción moderada.",
        digestiva: "Omite los patacones (fritura). Prepara el hogao suave con poco tomate. Come en porción moderada y despacio.",
        embarazo: "Buena fuente de proteína ✓. Agrega zanahoria extra por betacaroteno. Omite los patacones si hay náuseas.",
      },
      ingredientes: [
        { nombre: "Pechuga de pollo desmechada", cantidad: "120 g",          calorias: 200 },
        { nombre: "Arroz blanco",                cantidad: "1 taza (185 g)", calorias: 200 },
        { nombre: "Arveja y zanahoria",          cantidad: "½ taza (80 g)",  calorias: 60  },
        { nombre: "Patacones (plátano verde)",   cantidad: "2 und. (80 g)",  calorias: 100 },
      ],
      variantes: {
        bajar: {
          calorias: 380, proteinas: 32, carbohidratos: 46, grasas: 5,
          ingredientes: {
            1: { cantidad: "½ taza (95 g)", calorias: 100 },
            3: { nombre: "Ensalada verde", cantidad: "1 taza (80 g)", calorias: 20 },
          },
        },
        masa: {
          calorias: 720, proteinas: 50, carbohidratos: 82, grasas: 16,
          ingredientes: {
            0: { cantidad: "180 g", calorias: 300 },
            1: { cantidad: "1¼ tazas (230 g)", calorias: 250 },
          },
        },
        tonificar: {
          calorias: 470, proteinas: 36, carbohidratos: 56, grasas: 8,
          ingredientes: {
            1: { cantidad: "¾ taza (140 g)", calorias: 150 },
            3: { nombre: "Ensalada verde", cantidad: "1 taza (80 g)", calorias: 20 },
          },
        },
      },
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
        colesterol: "Omite la crema de leche o usa crema descremada. El caldo de pollo desengrasado es excelente ✓.",
        cardiaca: "Omite la crema de leche. Usa pechuga sin piel y retira la grasa del caldo. Muy buena opción sin crema.",
        renal: "Reduce el pollo a 60g. Omite la crema de leche.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Excelente opción ✓. Omite la crema de leche. Evita el ají. La papa criolla suaviza el caldo.",
        digestiva: "Excelente opción ✓. Omite la crema de leche y el ají. El caldo de papa criolla es muy suave y alcalino.",
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
      variantes: {
        bajar: {
          calorias: 340, proteinas: 28, carbohidratos: 42, grasas: 4,
          ingredientes: {
            0: { cantidad: "½ mediana (65 g)", calorias: 40 },
            2: { cantidad: "50 g", calorias: 40 },
            3: { nombre: "Pechuga sin piel", cantidad: "100 g", calorias: 130 },
            5: { nombre: "Guascas (sin crema)", cantidad: "al gusto", calorias: 5 },
          },
        },
        masa: {
          calorias: 620, proteinas: 44, carbohidratos: 68, grasas: 14,
          ingredientes: {
            3: { cantidad: "150 g", calorias: 250 },
          },
          ingredientesExtra: [
            { nombre: "Arroz blanco", cantidad: "½ taza cocinada", calorias: 95 },
          ],
        },
        tonificar: {
          calorias: 400, proteinas: 32, carbohidratos: 48, grasas: 6,
          ingredientes: {
            2: { cantidad: "60 g", calorias: 50 },
            5: { nombre: "Guascas (sin crema)", cantidad: "al gusto", calorias: 5 },
          },
        },
      },
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
      contraindicada: ["cardiaca"],
      adaptaciones: {
        hipertension: "Sin sal; usa vinagre y hierbas para marinar la carne.",
        colesterol: "Usa corte magro (lomo). Cocina en sartén antiadherente sin aceite extra.",
        renal: "Reduce la carne a 80g. Omite la sal. Aumenta la papa.",
        celiaquia: "Sin gluten ✓. El hogao y los condimentos son naturalmente libres de gluten.",
        gastritis: "Usa corte magro de res. Cocina bien cocido, no término medio. Reduce el hogao y evita condimentos fuertes.",
        digestiva: "La carne de res puede ser pesada. Usa corte magro bien cocido. Come porción pequeña. Si hay síntomas, prefiere pollo.",
        embarazo: "La carne de res es la mejor fuente de hierro hemo ✓. Fundamental en embarazo. Cocina bien cocida, nunca término medio.",
        obesidad: "Usa corte magro (lomo de res). Reduce la porción a 100g y aumenta la papa y zanahoria.",
      },
      ingredientes: [
        { nombre: "Carne de res (murillo)",  cantidad: "150 g",           calorias: 250 },
        { nombre: "Papa pastusa",            cantidad: "2 medianas (300 g)",calorias: 160},
        { nombre: "Zanahoria",               cantidad: "1 unidad (70 g)", calorias: 35  },
        { nombre: "Hogao, comino, sal",      cantidad: "al gusto",        calorias: 25  },
        { nombre: "Arroz blanco (acomp.)",   cantidad: "½ taza (90 g)",   calorias: 100 },
      ],
      variantes: {
        bajar: {
          calorias: 360, proteinas: 32, carbohidratos: 30, grasas: 8,
          ingredientes: {
            0: { nombre: "Lomo de res magro", cantidad: "120 g", calorias: 180 },
            1: { cantidad: "1 mediana (150 g)", calorias: 80 },
            4: { nombre: "Ensalada verde", cantidad: "1 taza", calorias: 20 },
          },
        },
        masa: {
          calorias: 700, proteinas: 52, carbohidratos: 56, grasas: 22,
          ingredientes: {
            0: { cantidad: "200 g", calorias: 330 },
            4: { cantidad: "1 taza (185 g)", calorias: 200 },
          },
        },
        tonificar: {
          calorias: 440, proteinas: 38, carbohidratos: 36, grasas: 10,
          ingredientes: {
            0: { nombre: "Lomo de res magro", cantidad: "140 g", calorias: 210 },
            4: { cantidad: "⅓ taza (60 g)", calorias: 65 },
          },
        },
      },
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
        digestiva: "Las lentejas BIEN COCIDAS son más suaves que los frijoles ✓. Cocínalas hasta que estén muy blandas (mínimo 40 min). Omite el aguacate y come despacio en porción moderada.",
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
      variantes: {
        bajar: {
          calorias: 290, proteinas: 18, carbohidratos: 50, grasas: 2,
          ingredientes: {
            1: { cantidad: "½ mediana (65 g)", calorias: 45 },
            3: { cantidad: "⅓ unidad (50 g)", calorias: 40 },
            5: { nombre: "Limón", cantidad: "al gusto", calorias: 0 },
          },
        },
        masa: {
          calorias: 550, proteinas: 30, carbohidratos: 88, grasas: 10,
          ingredientes: {
            0: { cantidad: "¾ taza seca (135 g)", calorias: 240 },
            5: { cantidad: "½ unidad (80 g)", calorias: 120 },
          },
          ingredientesExtra: [
            { nombre: "Arroz blanco", cantidad: "½ taza cocinada", calorias: 95 },
          ],
        },
        tonificar: {
          calorias: 340, proteinas: 20, carbohidratos: 58, grasas: 3,
          ingredientes: {
            1: { cantidad: "½ mediana (65 g)", calorias: 45 },
            5: { cantidad: "⅛ unidad (20 g)", calorias: 30 },
          },
        },
      },
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
      contraindicada: ["cardiaca", "colesterol", "diabetes", "obesidad", "gastritis", "digestiva"],
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
        { nombre: "Hogao y aguacate",         cantidad: "al gusto",        calorias: 40  },
      ],
      variantes: {
        bajar: {
          calorias: 480, proteinas: 34, carbohidratos: 56, grasas: 10,
          ingredientes: {
            0: { cantidad: "½ taza (95 g)", calorias: 100 },
            2: { nombre: "Carne molida magra", cantidad: "60 g", calorias: 120 },
            3: { nombre: "Plátano verde asado", cantidad: "½ unidad (80 g)", calorias: 70 },
            4: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          },
          preparacion: { 4: "Cocina el huevo en agua hirviendo por 10 min" },
        },
        masa: {
          calorias: 950, proteinas: 58, carbohidratos: 100, grasas: 30,
          ingredientes: {
            2: { cantidad: "120 g", calorias: 270 },
            4: { cantidad: "2 unidades (110 g)", calorias: 180 },
          },
        },
        tonificar: {
          calorias: 600, proteinas: 42, carbohidratos: 68, grasas: 14,
          ingredientes: {
            0: { cantidad: "¾ taza (140 g)", calorias: 150 },
            4: { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          },
          preparacion: { 4: "Cocina el huevo en agua hirviendo por 10 min" },
        },
      },
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
      foto: "1775229910950-0b7a99bf8674",
      contraindicada: ["renal"],
      adaptaciones: {
        diabetes: "Sopa de IG moderado. Reduce la porción de papa a la mitad.",
        hipertension: "Sin sal. Los tubérculos tienen sabor natural suficiente con el hogao.",
        colesterol: "Usa pollo en lugar de costilla de res para reducir la grasa saturada.",
        cardiaca: "Usa pollo o pechuga en lugar de costilla de res. El caldo desgrasado es excelente ✓.",
        celiaquia: "Sin gluten ✓. Todos los ingredientes son naturalmente libres de gluten.",
        embarazo: "Riquísima en vitaminas andinas ✓. Las habas aportan ácido fólico esencial.",
        gastritis: "Sopa suave y nutritiva ✓. Bien cocida es fácil de digerir.",
        digestiva: "El cocido boyacense bien cocido es muy suave ✓. Evita el ají. Come en porciones moderadas.",
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
      variantes: {
        bajar: {
          calorias: 320, proteinas: 20, carbohidratos: 40, grasas: 6,
          ingredientes: {
            0: { nombre: "Pechuga de pollo sin piel", cantidad: "80 g", calorias: 100 },
            1: { cantidad: "1 c/u (130 g)", calorias: 85 },
            2: { cantidad: "50 g c/u", calorias: 40 },
          },
        },
        masa: {
          calorias: 560, proteinas: 34, carbohidratos: 66, grasas: 14,
          ingredientes: {
            0: { cantidad: "150 g", calorias: 240 },
            3: { cantidad: "¾ taza (90 g)", calorias: 75 },
          },
          ingredientesExtra: [
            { nombre: "Arroz blanco", cantidad: "½ taza cocinada", calorias: 95 },
          ],
        },
        tonificar: {
          calorias: 380, proteinas: 24, carbohidratos: 48, grasas: 8,
          ingredientes: {
            0: { nombre: "Pechuga de pollo sin piel", cantidad: "100 g", calorias: 130 },
          },
        },
      },
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
      foto: "1584946763546-5db5e2468fbf",
      adaptaciones: {
        diabetes: "El arroz atollado tiene más caldo que el seco — mejor tolerado. Reduce la porción de arroz.",
        hipertension: "Sin sal adicional. Usa achiote y comino para el color y sabor.",
        colesterol: "Usa pechuga sin piel. Cocina con mínimo aceite.",
        cardiaca: "Usa pechuga sin piel y cocina con mínimo aceite. El caldo desgrasado de pollo es excelente ✓.",
        renal: "Reduce el pollo a 80g. Omite la zanahoria si hay restricción de potasio.",
        celiaquia: "Sin gluten ✓.",
        embarazo: "Excelente fuente de proteína ✓. La zanahoria aporta betacaroteno para el bebé.",
        gastritis: "El arroz caldoso es ideal para gastritis ✓. Suave y muy digestivo.",
        digestiva: "El arroz atollado caldoso es fácil de digerir ✓. Cocina bien el pollo y reduce el hogao.",
        obesidad: "Reduce la porción de arroz a ½ taza. Agrega más verduras al caldo.",
      },
      ingredientes: [
        { nombre: "Pechuga de pollo",            cantidad: "120 g",           calorias: 200 },
        { nombre: "Arroz blanco",                cantidad: "¾ taza (140 g)",  calorias: 185 },
        { nombre: "Papa pastusa en cubos",        cantidad: "1 mediana (130 g)",calorias: 80 },
        { nombre: "Zanahoria y arveja",           cantidad: "½ taza c/u (80 g)",calorias: 50},
        { nombre: "Hogao, achiote, comino",       cantidad: "al gusto",        calorias: 25  },
      ],
      variantes: {
        bajar: {
          calorias: 360, proteinas: 28, carbohidratos: 46, grasas: 6,
          ingredientes: {
            1: { cantidad: "½ taza (95 g)", calorias: 125 },
            2: { cantidad: "½ mediana (65 g)", calorias: 40 },
          },
        },
        masa: {
          calorias: 680, proteinas: 46, carbohidratos: 78, grasas: 18,
          ingredientes: {
            0: { cantidad: "180 g", calorias: 300 },
            1: { cantidad: "1 taza (185 g)", calorias: 245 },
          },
        },
        tonificar: {
          calorias: 440, proteinas: 32, carbohidratos: 56, grasas: 8,
          ingredientes: {
            1: { cantidad: "½ taza (95 g)", calorias: 125 },
          },
        },
      },
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
      foto: "1730112696140-19e61bb43d36",
      contraindicada: ["colesterol", "cardiaca", "digestiva"],
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
      variantes: {
        bajar: {
          calorias: 270, proteinas: 24, carbohidratos: 30, grasas: 5,
          ingredientes: {
            0: { cantidad: "120 g", calorias: 130 },
            1: { cantidad: "½ mediana (65 g)", calorias: 40 },
            2: { cantidad: "30 g", calorias: 40 },
          },
        },
        masa: {
          calorias: 520, proteinas: 40, carbohidratos: 52, grasas: 14,
          ingredientes: {
            0: { cantidad: "200 g", calorias: 210 },
          },
          ingredientesExtra: [
            { nombre: "Arroz blanco", cantidad: "½ taza cocinada", calorias: 95 },
          ],
        },
        tonificar: {
          calorias: 330, proteinas: 28, carbohidratos: 36, grasas: 8,
          ingredientes: {
            1: { cantidad: "½ mediana (65 g)", calorias: 40 },
          },
        },
      },
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
      foto: "1636777408340-e053c0b5ba2a",
      contraindicada: ["digestiva"],
      adaptaciones: {
        diabetes: "El arroz blanco tiene IG alto. Reduce a ½ taza y aumenta los frijoles. Los frijoles tienen IG bajo y mucha fibra ✓.",
        hipertension: "Cocina todo sin sal adicional. Hogao sin sal. El aguacate y los frijoles son cardioprotectores ✓.",
        colesterol: "Los frijoles reducen el colesterol LDL ✓. El aguacate tiene grasas monoinsaturadas beneficiosas ✓.",
        cardiaca: "Sin grasa saturada ✓. Los frijoles y el aguacate son excelentes para el corazón. Reduce el arroz y agrega más frijoles.",
        renal: "Los frijoles son ricos en potasio y fósforo. Reduce a ¼ taza. Reduce el aguacate a 1 cda. (también tiene potasio).",
        celiaquia: "Sin gluten ✓.",
        gastritis: "El plátano maduro es suave para el estómago ✓. El aguacate es neutro. Come despacio.",
        digestiva: "El plátano maduro es muy suave ✓. Come los frijoles en porción moderada. El aguacate es muy fácil de digerir.",
        embarazo: "Los frijoles aportan ácido fólico esencial ✓. El aguacate aporta ácido fólico adicional. Una de las mejores opciones veganas.",
        obesidad: "Muy completo y nutritivo. Reduce el arroz a ½ taza. El aguacate: máximo ¼ unidad.",
      },
      ingredientes: [
        { nombre: "Arroz blanco",              cantidad: "1 taza (185 g)",  calorias: 200 },
        { nombre: "Frijoles rojos cocinados",  cantidad: "½ taza (100 g)", calorias: 130 },
        { nombre: "Aguacate hass",             cantidad: "¼ aguacate (50 g)",calorias: 80},
        { nombre: "Plátano maduro asado",      cantidad: "½ unidad (90 g)", calorias: 90  },
        { nombre: "Hogao y ensalada verde",    cantidad: "al gusto",        calorias: 20  },
      ],
      variantes: {
        bajar: {
          calorias: 360, proteinas: 16, carbohidratos: 58, grasas: 6,
          ingredientes: {
            0: { cantidad: "½ taza (95 g)", calorias: 100 },
            3: { nombre: "Plátano verde asado", cantidad: "½ unidad (80 g)", calorias: 70 },
          },
        },
        masa: {
          calorias: 700, proteinas: 28, carbohidratos: 104, grasas: 20,
          ingredientes: {
            1: { cantidad: "¾ taza (150 g)", calorias: 195 },
            2: { cantidad: "½ aguacate (80 g)", calorias: 130 },
          },
          ingredientesExtra: [
            { nombre: "Proteína vegetal en polvo", cantidad: "1 scoop (30 g)", calorias: 110 },
          ],
        },
        tonificar: {
          calorias: 440, proteinas: 18, carbohidratos: 70, grasas: 8,
          ingredientes: {
            0: { cantidad: "¾ taza (140 g)", calorias: 150 },
          },
        },
      },
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
      foto: "1519202270721-a737823482cc",
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
      variantes: {
        bajar: {
          calorias: 210, proteinas: 4, carbohidratos: 40, grasas: 3,
          ingredientes: {
            0: { cantidad: "4 unidades (200 g)", calorias: 120 },
            4: { cantidad: "½ cda. (7 g)", calorias: 25 },
          },
        },
        masa: {
          calorias: 420, proteinas: 12, carbohidratos: 68, grasas: 12,
          ingredientes: {
            0: { cantidad: "8 unidades (400 g)", calorias: 240 },
          },
          ingredientesExtra: [
            { nombre: "Proteína vegetal en polvo", cantidad: "1 scoop (30 g)", calorias: 110 },
          ],
        },
        tonificar: {
          calorias: 260, proteinas: 6, carbohidratos: 46, grasas: 5,
          ingredientes: {
            0: { cantidad: "5 unidades (250 g)", calorias: 150 },
          },
        },
      },
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
      adaptaciones: {
        diabetes: "Tiene papa, yuca y mazorca — todos de IG moderado-alto. Reduce las porciones de papa y yuca. Agrega aguacate al servir (grasa que baja el IG).",
        hipertension: "Cocina sin sal. El ajo y el hogao dan sabor suficiente ✓. Excelente opción baja en sodio.",
        colesterol: "Sin grasa saturada ✓. Excelente opción vegetal y cardioprotectora.",
        cardiaca: "Sin grasa saturada ✓. La ahuyama es cardioprotectora. Excelente almuerzo cardíaco.",
        renal: "La yuca y la papa tienen potasio. Reduce la papa a ½ porción y omite la yuca si hay restricción severa.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Sopa suave y fácil de digerir ✓. El caldo vegetal es alcalino. Omite el aguacate si hay acidez activa.",
        digestiva: "Una de las mejores opciones para el sistema digestivo ✓. Sin grasa, sin ácidos, bien cocido. Muy recomendado.",
        embarazo: "Excelente fuente de vitaminas y minerales ✓. Agrega frijoles al servir para aumentar el ácido fólico.",
        obesidad: "Muy baja en calorías y sin grasa ✓. Muy saciante por la fibra de las verduras.",
      },
      ingredientes: [
        { nombre: "Papa pastusa y criolla",    cantidad: "1 c/u (200 g)", calorias: 130 },
        { nombre: "Yuca",                      cantidad: "60 g",          calorias: 75  },
        { nombre: "Mazorca",                   cantidad: "½ mazorca (80 g)",calorias: 70 },
        { nombre: "Ahuyama",                   cantidad: "80 g",          calorias: 30  },
        { nombre: "Plátano verde",             cantidad: "½ und. (80 g)", calorias: 60  },
        { nombre: "Hogao, cilantro, ajo",      cantidad: "al gusto",      calorias: 15  },
      ],
      variantes: {
        bajar: {
          calorias: 240, proteinas: 6, carbohidratos: 50, grasas: 2,
          ingredientes: {
            0: { cantidad: "1 c/u (150 g)", calorias: 100 },
            1: { cantidad: "40 g", calorias: 50 },
          },
        },
        masa: {
          calorias: 480, proteinas: 16, carbohidratos: 92, grasas: 6,
          ingredientes: {
            0: { cantidad: "1 c/u (250 g)", calorias: 165 },
          },
          ingredientesExtra: [
            { nombre: "Frijoles cocinados", cantidad: "½ taza (100 g)", calorias: 130 },
          ],
        },
        tonificar: {
          calorias: 290, proteinas: 8, carbohidratos: 60, grasas: 2,
          ingredientes: {
            0: { cantidad: "1 c/u (170 g)", calorias: 110 },
            1: { cantidad: "45 g", calorias: 55 },
          },
        },
      },
      preparacion: [
        "Prepara hogao base con tomate, cebolla, ajo y cilantro",
        "Agrega agua y lleva a hervor",
        "Incorpora todas las verduras y tubérculos pelados y troceados",
        "Cocina 30 min hasta que todo esté blando",
        "Sirve caliente con cilantro fresco",
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
      adaptaciones: {
        diabetes: "La pasta blanca tiene IG alto. Usa pasta integral (IG más bajo) o reduce a 30g y añade más verduras.",
        hipertension: "Sin sal adicional. Usa caldo casero bajo en sodio ✓.",
        colesterol: "Sin grasa saturada ✓. Caldo de verduras es excelente.",
        cardiaca: "Cena liviana y cardioprotectora ✓. Usa caldo de verduras en lugar de caldo de pollo con grasa.",
        renal: "Reduce la papa a ½ unidad. La pasta tiene fósforo moderado — porción normal está bien.",
        celiaquia: "Usa pasta sin gluten ✓.",
        gastritis: "La sopa de pasta es muy suave ✓. Excelente cena para gastritis. Evita el limón al servir.",
        digestiva: "Sopa ligera y fácil de digerir ✓. Una de las mejores cenas para el sistema digestivo.",
        embarazo: "Buena fuente de energía ✓. Añade pollo desmechado para más proteína.",
        obesidad: "Cena baja en calorías ✓. Reduce la pasta a 30g y agrega más verduras.",
      },
      ingredientes: [
        { nombre: "Pasta o fideos",          cantidad: "50 g",           calorias: 175 },
        { nombre: "Zanahoria y habichuela",  cantidad: "½ taza c/u (80 g)",calorias: 50},
        { nombre: "Papa pequeña",            cantidad: "1 unidad (90 g)", calorias: 60  },
        { nombre: "Caldo de pollo, cilantro",cantidad: "al gusto",        calorias: 15  },
      ],
      variantes: {
        bajar: {
          calorias: 210, proteinas: 8, carbohidratos: 36, grasas: 3,
          ingredientes: {
            0: { cantidad: "30 g", calorias: 105 },
            2: { cantidad: "½ unidad (45 g)", calorias: 30 },
          },
        },
        masa: {
          calorias: 420, proteinas: 22, carbohidratos: 60, grasas: 8,
          ingredientes: { 0: { cantidad: "70 g", calorias: 245 } },
          ingredientesExtra: [
            { nombre: "Pollo desmechado extra", cantidad: "50 g", calorias: 85 },
          ],
        },
        tonificar: {
          calorias: 260, proteinas: 12, carbohidratos: 42, grasas: 4,
          ingredientes: { 0: { cantidad: "40 g", calorias: 140 } },
        },
      },
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
        diabetes: "La ahuyama cocida tiene IG alto. Come porción moderada (1 taza) y acompaña con arepa pequeña.",
        hipertension: "Sin sal adicional. La ahuyama es baja en sodio ✓. Usa leche descremada.",
        colesterol: "Usa leche descremada o leche vegetal (avena/arroz). La ahuyama en sí es libre de grasa ✓.",
        cardiaca: "Usa leche descremada o leche vegetal. La ahuyama es cardioprotectora ✓. Sin grasa y rica en antioxidantes.",
        renal: "La leche entera tiene fósforo. Usa leche vegetal (avena o arroz) en su lugar. La ahuyama tiene potasio moderado.",
        celiaquia: "Sin gluten ✓. Acompaña con arepa en lugar de pan tostado.",
        gastritis: "Una de las mejores cenas para gastritis ✓. La ahuyama es suave y alcalina. Usa leche descremada y come caliente.",
        digestiva: "La crema de ahuyama es una de las mejores cenas digestivas ✓. Usa leche sin lactosa o leche vegetal. Sirve caliente.",
        embarazo: "La ahuyama aporta vitamina A y hierro ✓. Excelente cena. Usa leche pasteurizada.",
        obesidad: "Muy baja en calorías ✓. La ahuyama es muy saciante. Omite el pan tostado.",
      },
      ingredientes: [
        { nombre: "Ahuyama (zapallo) pelada",  cantidad: "250 g",          calorias: 100 },
        { nombre: "Leche entera",              cantidad: "½ taza (120 ml)",calorias: 75  },
        { nombre: "Cebolla, ajo, sal",         cantidad: "al gusto",       calorias: 15  },
        { nombre: "Pan tostado o arepa",       cantidad: "1 porción (60 g)",calorias: 70 },
      ],
      variantes: {
        bajar: {
          calorias: 180, proteinas: 6, carbohidratos: 28, grasas: 3,
          ingredientes: {
            1: { nombre: "Leche descremada", cantidad: "¼ taza (60 ml)", calorias: 25 },
            3: { nombre: "Sin acompañamiento", cantidad: "—", calorias: 0 },
          },
        },
        masa: {
          calorias: 370, proteinas: 16, carbohidratos: 48, grasas: 12,
          ingredientes: {
            3: { cantidad: "1 porción grande (90 g)", calorias: 105 },
          },
          ingredientesExtra: [
            { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          ],
        },
        tonificar: {
          calorias: 220, proteinas: 8, carbohidratos: 32, grasas: 5,
          ingredientes: {
            1: { nombre: "Leche descremada", cantidad: "½ taza (120 ml)", calorias: 45 },
          },
        },
      },
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
      foto: "1647093953000-9065ed6f85ef",
      adaptaciones: {
        diabetes: "El arroz blanco tiene IG alto. Reduce a ½ taza o usa arroz integral. Usa 1 solo huevo.",
        hipertension: "Sin sal en el arroz. El limón de la ensalada realza el sabor sin sodio ✓.",
        colesterol: "Usa 1 solo huevo cocido hervido (sin aceite). El aceite de oliva en la ensalada es beneficioso ✓.",
        cardiaca: "Usa 1 solo huevo hervido. Reduce el arroz a ½ taza. La ensalada verde es cardioprotectora ✓.",
        renal: "Usa 1 solo huevo. Reduce el arroz a ½ taza. La ensalada tiene potasio moderado.",
        celiaquia: "Sin gluten ✓.",
        gastritis: "Huevo hervido (no frito). El arroz es suave ✓. Omite el limón de la ensalada si hay acidez activa.",
        digestiva: "Cocina el huevo hervido. La lechuga y el pepino son muy suaves ✓. Come despacio.",
        embarazo: "Los huevos bien cocidos son esenciales ✓. Añade más verduras de color a la ensalada.",
        obesidad: "Cena equilibrada ✓. Usa 1 solo huevo y reduce el arroz a ½ taza. Aumenta la ensalada.",
      },
      ingredientes: [
        { nombre: "Arroz blanco",               cantidad: "1 taza (185 g)",   calorias: 200 },
        { nombre: "Huevos cocidos o fritos",    cantidad: "2 unidades (110 g)",calorias: 140},
        { nombre: "Lechuga, tomate, pepino",    cantidad: "1 taza mix (120 g)",calorias: 30 },
        { nombre: "Limón, aceite de oliva, sal",cantidad: "aderezo",           calorias: 20  },
      ],
      variantes: {
        bajar: {
          calorias: 260, proteinas: 16, carbohidratos: 34, grasas: 6,
          ingredientes: {
            0: { cantidad: "½ taza (95 g)", calorias: 100 },
            1: { nombre: "Huevos cocidos", cantidad: "2 unidades (110 g)", calorias: 140 },
          },
          preparacion: { 1: "Cocina los huevos en agua hirviendo por 10 min; pela y parte" },
        },
        masa: {
          calorias: 550, proteinas: 34, carbohidratos: 62, grasas: 18,
          ingredientes: {
            1: { cantidad: "3 unidades (165 g)", calorias: 210 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo con agua", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 320, proteinas: 20, carbohidratos: 42, grasas: 8,
          ingredientes: {
            0: { cantidad: "¾ taza (140 g)", calorias: 150 },
            1: { nombre: "Huevos cocidos", cantidad: "2 unidades (110 g)", calorias: 140 },
          },
          preparacion: { 1: "Cocina los huevos en agua hirviendo por 10 min; pela y parte" },
        },
      },
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
      descripcion: "Caldo reconfortante de costilla con papa criolla, cilantro y bebida caliente",
      calorias: 340, proteinas: 22, carbohidratos: 32, grasas: 12,
      foto: "1652088079703-38f4a8d6b981",
      adaptaciones: {
        diabetes: "El caldo de costilla no tiene carbohidratos significativos ✓. Excelente opción. Acompaña con arepa pequeña.",
        hipertension: "Cocina sin sal. Retira toda la grasa superficial del caldo. Sin sal al servir.",
        colesterol: "Retira toda la grasa superficial del caldo antes de servir. Consume solo el caldo claro con poca carne.",
        cardiaca: "La costilla tiene grasa saturada. Retira toda la grasa superficial del caldo. Prefiere pechuga de pollo como alternativa más cardiosaludable.",
        renal: "Reduce la carne a 60g. El caldo solo (sin la carne) es bajo en proteína y mejor para el riñón.",
        celiaquia: "Sin gluten ✓. Acompaña con arepa en lugar de pan.",
        gastritis: "El caldo claro es excelente para gastritis ✓. Cocina bien la costilla y retira la grasa superficial. Sin sal excesiva.",
        digestiva: "El caldo claro de costilla es excelente para el sistema digestivo ✓. Retira la grasa y sirve caliente. Bebida: aromática o té (la leche y el chocolate NO se recomiendan para problemas digestivos).",
        embarazo: "El caldo aporta colágeno y minerales ✓. Cocina bien cocida la costilla. Retira la grasa de la superficie.",
        obesidad: "El caldo claro tiene pocas calorías ✓. Limita la carne a 60g. Sin arepa si se busca reducir calorías.",
      },
      ingredientes: [
        { nombre: "Costilla de res",               cantidad: "100 g (2 trozos)", calorias: 180 },
        { nombre: "Papa criolla o pastusa",        cantidad: "1 pequeña (90 g)", calorias: 80  },
        { nombre: "Cilantro, cebolla larga, sal",  cantidad: "al gusto",         calorias: 15  },
        { nombre: "Arepa pequeña (opcional)",      cantidad: "½ unidad (45 g)",  calorias: 75  },
        { nombre: "Bebida: chocolate, café o aromática", cantidad: "1 taza (240 ml)", calorias: 50 },
      ],
      variantes: {
        bajar: {
          calorias: 225, proteinas: 18, carbohidratos: 20, grasas: 5,
          ingredientes: {
            0: { cantidad: "70 g (1 trozo)", calorias: 125 },
            3: { nombre: "Sin arepa", cantidad: "—", calorias: 0 },
            4: { nombre: "Aromática de hierbas o té", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
        },
        masa: {
          calorias: 530, proteinas: 36, carbohidratos: 42, grasas: 18,
          ingredientes: {
            0: { cantidad: "150 g (3 trozos)", calorias: 270 },
            3: { cantidad: "1 unidad (90 g)", calorias: 150 },
            4: { nombre: "Chocolate caliente con leche", cantidad: "1 taza (240 ml)", calorias: 120 },
          },
        },
        tonificar: {
          calorias: 270, proteinas: 22, carbohidratos: 24, grasas: 7,
          ingredientes: {
            0: { cantidad: "80 g (2 trozos pequeños)", calorias: 145 },
            4: { nombre: "Café negro o aromática", cantidad: "1 taza (240 ml)", calorias: 5 },
          },
        },
      },
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
      foto: "1555126634-323283e090fa",
      contraindicada: ["celiaquia"],
      ingredientes: [
        { nombre: "Fideos delgados",          cantidad: "60 g",           calorias: 210 },
        { nombre: "Pollo desmechado",         cantidad: "50 g",           calorias: 85  },
        { nombre: "Caldo de pollo, cilantro", cantidad: "al gusto",       calorias: 15  },
        { nombre: "Papa (opcional)",          cantidad: "½ unidad (45 g)",calorias: 45  },
      ],
      variantes: {
        bajar: {
          calorias: 190, proteinas: 14, carbohidratos: 26, grasas: 3,
          ingredientes: {
            0: { cantidad: "40 g", calorias: 140 },
            3: { nombre: "Sin papa", cantidad: "—", calorias: 0 },
          },
        },
        masa: {
          calorias: 380, proteinas: 28, carbohidratos: 44, grasas: 8,
          ingredientes: {
            0: { cantidad: "80 g", calorias: 280 },
            1: { cantidad: "80 g", calorias: 135 },
          },
        },
        tonificar: {
          calorias: 230, proteinas: 16, carbohidratos: 30, grasas: 4,
          ingredientes: { 0: { cantidad: "50 g", calorias: 175 } },
        },
      },
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
      foto: "1665594051407-7385d281ad76",
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
      variantes: {
        bajar: {
          calorias: 190, proteinas: 14, carbohidratos: 30, grasas: 2,
          ingredientes: {
            0: { cantidad: "½ unidad (100 g)", calorias: 60 },
            2: { cantidad: "½ pequeña (40 g)", calorias: 30 },
          },
        },
        masa: {
          calorias: 380, proteinas: 28, carbohidratos: 48, grasas: 8,
          ingredientes: {
            1: { cantidad: "100 g", calorias: 170 },
          },
          ingredientesExtra: [
            { nombre: "Huevo cocido", cantidad: "1 unidad (55 g)", calorias: 70 },
          ],
        },
        tonificar: {
          calorias: 220, proteinas: 16, carbohidratos: 34, grasas: 3,
          ingredientes: {
            0: { cantidad: "¾ unidad (150 g)", calorias: 90 },
          },
        },
      },
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
      foto: "1665529545347-8eac2abf7f41",
      contraindicada: ["diabetes", "digestiva"],
      adaptaciones: {
        hipertension: "Sin sal adicional. La leche tiene sodio natural moderado.",
        colesterol: "Usa leche descremada para reducir la grasa.",
        cardiaca: "Usa leche descremada. Come ½ porción. La panela es preferible al azúcar refinada.",
        renal: "La leche entera tiene fósforo y potasio. Reduce la porción a ½ taza. Usa leche vegetal de arroz (la más baja en fósforo).",
        celiaquia: "Sin gluten ✓.",
        embarazo: "Aporta calcio y energía ✓. Porción moderada — no como cena principal.",
        gastritis: "Excelente opción ✓. Suave, alcalino y reconfortante. Muy recomendado.",
        digestiva: "La leche entera puede irritar el sistema digestivo. Usa leche sin lactosa o leche de avena. El arroz en sí es muy suave ✓.",
        obesidad: "Reduce la porción a ½ taza. Endulza con stevia en lugar de panela.",
      },
      ingredientes: [
        { nombre: "Arroz blanco",       cantidad: "½ taza seca (90 g)",  calorias: 150 },
        { nombre: "Leche entera",       cantidad: "1½ tazas (360 ml)",   calorias: 110 },
        { nombre: "Canela en rama",     cantidad: "1 rama",               calorias: 5   },
        { nombre: "Panela raspada",     cantidad: "1 cda. (15 g)",        calorias: 45  },
      ],
      variantes: {
        bajar: {
          calorias: 210, proteinas: 6, carbohidratos: 40, grasas: 2,
          ingredientes: {
            0: { cantidad: "⅓ taza seca (60 g)", calorias: 100 },
            1: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 60 },
            3: { nombre: "Stevia", cantidad: "al gusto", calorias: 0 },
          },
        },
        masa: {
          calorias: 430, proteinas: 14, carbohidratos: 72, grasas: 10,
          ingredientes: {
            0: { cantidad: "¾ taza seca (135 g)", calorias: 225 },
          },
          ingredientesExtra: [
            { nombre: "Proteína en polvo", cantidad: "1 scoop (30 g)", calorias: 120 },
          ],
        },
        tonificar: {
          calorias: 260, proteinas: 8, carbohidratos: 48, grasas: 4,
          ingredientes: {
            1: { nombre: "Leche descremada", cantidad: "1 taza (240 ml)", calorias: 60 },
            3: { nombre: "Stevia o poca panela", cantidad: "al gusto", calorias: 10 },
          },
        },
      },
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
      variantes: {
        bajar: {
          calorias: 170, proteinas: 3, carbohidratos: 24, grasas: 6,
          ingredientes: {
            1: { cantidad: "¼ taza (60 ml)", calorias: 45 },
            3: { nombre: "Sin arepa", cantidad: "—", calorias: 0 },
          },
        },
        masa: {
          calorias: 360, proteinas: 12, carbohidratos: 42, grasas: 16,
          ingredientes: {
            3: { cantidad: "1 mediana (90 g)", calorias: 150 },
          },
          ingredientesExtra: [
            { nombre: "Proteína vegetal en polvo", cantidad: "1 scoop (30 g)", calorias: 110 },
          ],
        },
        tonificar: {
          calorias: 200, proteinas: 4, carbohidratos: 28, grasas: 8,
          ingredientes: {
            1: { cantidad: "⅓ taza (80 ml)", calorias: 60 },
          },
        },
      },
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
      variantes: {
        bajar: {
          calorias: 160, proteinas: 5, carbohidratos: 32, grasas: 1,
          ingredientes: {
            0: { cantidad: "½ mediana (65 g)", calorias: 45 },
            3: { nombre: "Sin plátano", cantidad: "—", calorias: 0 },
          },
        },
        masa: {
          calorias: 340, proteinas: 14, carbohidratos: 58, grasas: 4,
          ingredientes: {
            0: { cantidad: "1½ medianas (200 g)", calorias: 135 },
            3: { cantidad: "½ unidad (80 g)", calorias: 60 },
          },
          ingredientesExtra: [
            { nombre: "Frijoles cocinados", cantidad: "¼ taza (50 g)", calorias: 65 },
          ],
        },
        tonificar: {
          calorias: 190, proteinas: 7, carbohidratos: 38, grasas: 2,
          ingredientes: {
            0: { cantidad: "¾ mediana (100 g)", calorias: 70 },
          },
        },
      },
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

// ─── APLICAR VARIANTE POR OBJETIVO ──────────────────────────
function aplicarVariante(receta, objetivo) {
  if (!objetivo || objetivo === "mantener" || !receta.variantes?.[objetivo]) return receta;
  const v = receta.variantes[objetivo];
  const m = { ...receta };
  if (v.calorias !== undefined)      m.calorias      = v.calorias;
  if (v.proteinas !== undefined)     m.proteinas     = v.proteinas;
  if (v.carbohidratos !== undefined) m.carbohidratos = v.carbohidratos;
  if (v.grasas !== undefined)        m.grasas        = v.grasas;
  m.ingredientes = receta.ingredientes.map((ing, i) =>
    v.ingredientes?.[i] ? { ...ing, ...v.ingredientes[i] } : { ...ing }
  );
  if (v.ingredientesExtra?.length) m.ingredientes = [...m.ingredientes, ...v.ingredientesExtra];
  if (v.preparacion) {
    m.preparacion = receta.preparacion.map((paso, i) =>
      v.preparacion[i] !== undefined ? v.preparacion[i] : paso
    );
  }
  return m;
}

// ─── RECETA FINAL PARA LA PERSONA ───────────────────────────
// objetivo (variante) → condición médica → tope de proteína de esa comida
function prepararReceta(receta, tipo) {
  const d = JSON.parse(localStorage.getItem("datosUsuario") || "{}") || {};
  let m = aplicarVariante(receta, Nutricion.objetivoSeguro(d));
  // Proteína en polvo opcional: solo para quien busca masa
  if (d.objetivo !== "masa" && m.ingredientes?.some(i => / o proteína en polvo/.test(i.nombre))) {
    m = { ...m,
      ingredientes: m.ingredientes.map(i => / o proteína en polvo/.test(i.nombre)
        ? { ...i, nombre: "Aromática de hierbas", calorias: 5 } : i),
      preparacion: (m.preparacion || []).map(p => p.replace(" (o proteína en polvo si entrenas)", "")) };
  }
  m = Nutricion.adaptar(m, d);
  if (d.peso > 0) {
    const max = Nutricion.macros(d, caloriasObjetivo()).protMax * (DISTRIBUCION_KCAL[tipo] || 0.20) * 1.1;
    m = Nutricion.limitarProteina(m, max);
  }
  return Nutricion.conMedidas(m);
}
function esAptaParaMi(receta) {
  return Nutricion.esApta(receta, JSON.parse(localStorage.getItem("datosUsuario") || "{}") || {});
}

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

// ─── DISTRIBUCIÓN CALÓRICA POR SLOT ─────────────────────────
// Porcentaje del total diario asignado a cada comida
const DISTRIBUCION_KCAL = {
  desayuno:    0.25,   // 25 %
  once:        0.10,   // 10 % cada onces (se busca por tipo)
  once_manana: 0.10,   // 10 %
  almuerzo:    0.35,   // 35 %
  once_tarde:  0.10,   // 10 %
  cena:        0.20,   // 20 %
};

function targetKcalSlot(slotTipo) {
  return Math.round(caloriasObjetivo() * (DISTRIBUCION_KCAL[slotTipo] || 0.20));
}

function textoEstadoInicial(slotId) {
  const slot = SLOTS.find(s => s.id === slotId);
  if (!slot) return "Toca para elegir";
  const t = targetKcalSlot(slot.tipo);
  return `Toca para elegir · ~${t} kcal`;
}

// ─── NUTRICIÓN EMBARAZO ───────────────────────────────────────
const NUTRIENTES_EMBARAZO = {
  acidoFolico: ["lentejas", "frijoles", "espinaca", "brócoli", "habas", "aguacate", "naranja", "fresas", "lechuga"],
  hierro:      ["carne de res", "costilla", "menudo", "pollo", "lentejas", "frijoles", "espinaca", "sardinas", "huevo"],
  calcio:      ["leche", "queso", "yogur", "chocolate", "changua"],
  proteina:    ["pollo", "carne de res", "huevo", "lentejas", "frijoles", "sardinas", "atún", "tofu", "costilla", "menudo"],
};

// Nutrientes prioritarios por trimestre + info calórica (OMS)
const PRIORIDAD_TRIMESTRE = {
  "1": { nutrientes: ["acidoFolico", "hierro",   "proteina"],  kcal: "+0 kcal/día",   tip: "Ácido fólico esencial para el tubo neural" },
  "2": { nutrientes: ["hierro",      "calcio",   "proteina"],  kcal: "+340 kcal/día", tip: "Hierro y calcio para el crecimiento" },
  "3": { nutrientes: ["calcio",      "proteina", "acidoFolico"], kcal: "+452 kcal/día", tip: "Calcio y proteína para el desarrollo óseo final" },
};

const LABELS_NUTRIENTE = {
  acidoFolico: "🍃 Ác. fólico",
  hierro:      "🩸 Hierro",
  calcio:      "🦴 Calcio",
  proteina:    "💪 Proteína",
};

function _scoreEmbarazo(receta, trimestre) {
  const cfg = PRIORIDAD_TRIMESTRE[trimestre] || PRIORIDAD_TRIMESTRE["1"];
  const noms = (receta.ingredientes || []).map(i => i.nombre.toLowerCase());
  let score = 0;
  cfg.nutrientes.forEach((nut, idx) => {
    const kws = NUTRIENTES_EMBARAZO[nut] || [];
    if (kws.some(kw => noms.some(n => n.includes(kw.toLowerCase())))) score += (3 - idx);
  });
  return score;
}

function _badgesEmbarazo(receta, trimestre) {
  const cfg = PRIORIDAD_TRIMESTRE[trimestre] || PRIORIDAD_TRIMESTRE["1"];
  const noms = (receta.ingredientes || []).map(i => i.nombre.toLowerCase());
  return cfg.nutrientes.filter(nut => {
    const kws = NUTRIENTES_EMBARAZO[nut] || [];
    return kws.some(kw => noms.some(n => n.includes(kw.toLowerCase())));
  }).map(nut => LABELS_NUTRIENTE[nut]);
}

function cambiarTrimestre(t) {
  const datos = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  datos.trimestre = t;
  localStorage.setItem("datosUsuario", JSON.stringify(datos));
  document.querySelectorAll(".trimestre-chip").forEach(c => c.classList.toggle("activo", c.dataset.t === t));
  const cfg = PRIORIDAD_TRIMESTRE[t];
  const extraEl = document.getElementById("banner-trimestre-info");
  if (extraEl) extraEl.textContent = `${cfg.kcal} · ${cfg.tip}`;
  const priEl = document.getElementById("banner-trimestre-pri");
  if (priEl) priEl.textContent = "Priorizando: " + cfg.nutrientes.map(n => LABELS_NUTRIENTE[n]).join(" · ");
  SLOTS.forEach(s => renderSeccion(s));
}

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
  if (!isNaN(valor) && (valor < 1200 || valor > 5000)) {
    alert("La meta debe estar entre 1200 y 5000 kcal. Para otros valores consulta a un profesional.");
    return;
  }
  if (!isNaN(valor)) {
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
  const meta     = caloriasObjetivo();
  const usuario  = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  // Mismas fórmulas que la calculadora (js/nutricion.js)
  const m = Nutricion.macros({ ...usuario, peso: parseFloat(usuario.peso) || 70 }, meta);
  return { prot: Math.round(m.prot), carbs: Math.round(m.carbs), grasas: Math.round(m.grasas) };
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

const FOTOS_LOCAL = {
  calentado_fruta:       "Desayunos/calentado bandeja paisa.png",
  huevos_pericos_fruta:  "Desayunos/huevos pericos con arepa.jpeg",
  changua_fruta:         "Desayunos/changua acompañada de fruta.png",
  avena_huevo_fruta:     "Desayunos/avena con banano y huevo.png",
  arepa_huevo_fruta:     "Desayunos/Arepa de choclo con huevo y fruta.png",
  chocolate_queso_arepa: "Desayunos/chocolate santafereño con huevo y arepa.png",
  revuelto_choclo_arepa: "Desayunos/Revuelto de choclo con huevo y arepa.png",
  avena_vegana_fruta:    "Desayunos/Avema vegana con fruta y semillas.png",
  arepa_aguacate_vegana: "Desayunos/arepa con aguacate y tomate.png",
  chontaduro:            "onces/Chontaduro con sal y limon.png",
  arepa_quesito:         "onces/Arepa con agua de panela.png",
  frutas_limon:          "onces/fruta con sal y limon.png",
  pandebono:             "onces/Pandebono vallecaucano.png",
  yogur_granola:         "onces/Yogur con granola y fruta.png",
  obleas_arequipe:       "onces/Obleas con arequipe.png",
  bocadillo_queso:       "onces/Bocadillo veleño con queso blanco.png",
  empanada_pipian:       "onces/Empanada de pipián vallecaucana.png",
  once_vegana_semillas:  "onces/Frutas con semillas y maní.png",
  sancocho_pollo:        "Almuerzo/Sancocho de pollo.png",
  arroz_pollo:           "Almuerzo/Arroz con pollo colombiano.png",
  ajiaco:                "Almuerzo/Ajiaco bogotano.png",
  sudado_res:            "Almuerzo/sudado de carne.jpeg",
  sopa_lentejas:         "Almuerzo/Sopa de lentejas con plátano.png",
  bandeja_paisa:         "Almuerzo/Bandeja paisa.png",
  cocido_boyacense:      "Almuerzo/Cocido boyacense.png",
  arroz_atollado:        "Almuerzo/Arroz atollado con pollo.jpg",
  "mondongo_antioqueño": "Almuerzo/Mondongo antioqueño.jpeg",
  arroz_frijoles_vegano: "Almuerzo/Arroz con frijoles, aguacate y plátano.jpeg",
  crema_papa_criolla:    "Almuerzo/crema de papa criolla.jpg",
  sancocho_verduras:     "Almuerzo/sopa de verduras.jpg",
  sopa_pasta:            "Cena/Sopa de pasta con verduras.png",
  crema_ahuyama:         "Cena/Crema de ahuyama.png",
  arroz_huevo:           "Cena/Arroz con huevo y ensalada verde.png",
  caldo_costilla:        "Cena/Caldo de costilla bogotano.png",
  sopa_fideo:            "Cena/Sopa de fideo con pollo.jpg",
  sopa_guineo:           "Cena/Sopa de guineo con pollo.png",
  arroz_leche:           "Cena/Arroz con leche santafereño.webp",
  crema_ahuyama_vegana:  "Cena/Crema de ahuyama con leche de coco.png",
  sopa_verduras_vegana:  "Cena/Sopa de verduras colombiana.jpg",
  caldo_huevo_papa:      "caldo de huevo papa y cilantro.png",
  arepa_huevo_aromatica: "arepa con huevo cocido y aromatica.png",
  galletas_arroz_mani:   "galletas de arroz con mantequilla de mani.png",
  arepa_aguacate_once:   "Arepa con aguacate.png",
  compota_natural:       "compota de manzana o pera.png",
};

function urlFoto(receta) {
  if (FOTOS_LOCAL[receta.id]) return `img/recetas/${FOTOS_LOCAL[receta.id]}`;
  if (!receta.foto) return null;
  if (receta.foto.startsWith('http')) return receta.foto;
  if (receta.foto.startsWith('premium_photo-'))
    return `https://plus.unsplash.com/${receta.foto}?w=400&h=150&fit=crop&auto=format&q=80`;
  return `https://images.unsplash.com/photo-${receta.foto}?w=400&h=150&fit=crop&auto=format&q=80`;
}

// urlFallback ya no se usa en cards principales; se mantiene para el plan del día
function urlFallback(tipo) {
  const col = { desayuno: "e07a5f", once: "52b788", almuerzo: "2d6a4f", cena: "264653" };
  return `https://placehold.co/90x50/${col[tipo]||"2d6a4f"}/ffffff?text=+`;
}

// ─── MATCH INGREDIENTES FAVORITOS ────────────────────────────
function _ingMatch(nombreIng, favItem) {
  const ni = nombreIng.toLowerCase();
  const np = favItem.toLowerCase();
  if (ni.includes(np)) return true;
  if (np.endsWith("s") && np.length > 3 && ni.includes(np.slice(0, -1))) return true;
  const palabras = np.split(/[\s/,]+/).filter(p => p.length >= 4);
  for (const p of palabras) {
    if (ni.includes(p)) return true;
    if (p.endsWith("s") && p.length > 4 && ni.includes(p.slice(0, -1))) return true;
  }
  return false;
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
    setTimeout(() => seccion.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
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
    el.textContent = textoEstadoInicial(slotId);
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

  // Contar cuántas se ocultan por condición médica (antes de filtrar)
  let nOcultas = 0;
  const nAntes = recetas.length;
  recetas = recetas.filter(esAptaParaMi);
  nOcultas = nAntes - recetas.length;
  // ── Scoring combinado: salud (10×) + favoritos (5×) + calorías apropiadas (3×) ──
  const trimestre   = usuario.trimestre || "1";
  const _targetKcal = targetKcalSlot(slot.tipo);
  const _favIngrs   = JSON.parse(localStorage.getItem("ingredientesFavoritos") || "[]");
  const _scoreMap   = new Map();
  const _embMap     = new Map();

  recetas.forEach(r => {
    const favScore = _favIngrs.length > 0
      ? (r.ingredientes || []).filter(ing => _favIngrs.some(f => _ingMatch(ing.nombre, f))).length
      : 0;
    _scoreMap.set(r.id, favScore);
    if (condicion === "embarazo") _embMap.set(r.id, _scoreEmbarazo(r, trimestre));
  });

  // Aplicar variante por objetivo antes de ordenar y mostrar
  recetas = recetas.map(r => prepararReceta(r, slot.tipo));

  // Siempre ordenar: salud > favoritos > calorías adecuadas al slot > proteína (masa)
  recetas = [...recetas].sort((a, b) => {
    const kcalDiffA = Math.abs((a.calorias || 0) - _targetKcal);
    const kcalDiffB = Math.abs((b.calorias || 0) - _targetKcal);
    const kcalA = Math.max(0, 5 - Math.floor(kcalDiffA / 50)); // 0–5 pts por proximidad
    const kcalB = Math.max(0, 5 - Math.floor(kcalDiffB / 50));

    const sA = (_embMap.get(a.id)||0)*10 + (_scoreMap.get(a.id)||0)*5 + kcalA*3;
    const sB = (_embMap.get(b.id)||0)*10 + (_scoreMap.get(b.id)||0)*5 + kcalB*3;
    const diff = sB - sA;
    if (diff !== 0) return diff;
    if (objetivo === "masa") return (b.proteinas || 0) - (a.proteinas || 0);
    return kcalDiffA - kcalDiffB; // tiebreaker final: más cercano al objetivo calórico
  });

  // Razones educativas por condición médica
  const RAZON_ENF = {
    diabetes:     "La diabetes requiere controlar el índice glucémico para evitar picos de azúcar en sangre.",
    hipertension: "La hipertensión exige limitar el sodio para mantener la presión arterial bajo control.",
    colesterol:   "El colesterol alto requiere reducir grasas saturadas y trans para proteger el corazón.",
    renal:        "La enfermedad renal necesita controlar proteína, potasio y fósforo para no sobrecargar los riñones.",
    celiaquia:    "La celiaquía requiere eliminar el gluten (trigo, cebada, centeno) para proteger el intestino.",
    gastritis:    "La gastritis exige evitar alimentos irritantes y ácidos para proteger la mucosa gástrica.",
    tiroides:     "Los problemas de tiroides requieren equilibrar nutrientes clave como el yodo y el selenio.",
    cardiaca:     "La enfermedad cardiovascular exige limitar sodio y grasas saturadas para cuidar el corazón.",
    digestiva:    "Los problemas digestivos requieren priorizar alimentos de fácil digestión.",
    obesidad:     "Para el sobrepeso se priorizan alimentos saciantes con menor densidad calórica.",
  };

  const grid = seccion.querySelector(".recetas-opciones");
  grid.innerHTML = "";

  if (!recetas.length) {
    grid.innerHTML = `<p style="padding:16px;color:#aaa;font-size:12px">No hay opciones disponibles para tu condición en esta categoría.</p>`;
    return;
  }

  // Aviso de recetas ocultas por condición
  if (nOcultas > 0) {
    const cond = enfermedad && enfermedad !== "ninguna" ? enfermedad : "embarazo";
    const razon = RAZON_ENF[cond] || "";
    grid.innerHTML = `<div class="aviso-ocultas">
      🔒 ${nOcultas} receta${nOcultas > 1 ? "s" : ""} no recomendada${nOcultas > 1 ? "s" : ""} para tu condición están ocultas.
      ${razon ? `<span class="aviso-ocultas-razon">${razon}</span>` : ""}
    </div>`;
  }

  const bgColor = SIN_FOTO_COLOR[slot.tipo] || "#2d6a4f";

  recetas.forEach(r => {
    const sel = selecciones[slot.id]?.id === r.id;

    const msgs = [];
    if (r._razon) {
      msgs.push(`💊 <strong>Diseñada para tu condición:</strong> ${r._razon}` +
        (r._cambios.length ? `<span class="adapt-razon">${r._cambios.join(" · ")}</span>` : ""));
    }
    if (condicion === "embarazo" && r.adaptaciones?.embarazo)
      msgs.push(`🤰 ${r.adaptaciones.embarazo}`);
    if (objetivo === "masa" && (r.proteinas || 0) >= 25)
      msgs.push(`💪 ${r.proteinas}g proteína — ideal para ganar músculo`);
    const adaptacion = msgs.map(m => `<p class="adaptacion-msg">${m}</p>`).join("");
    const esVeg     = r.vegano ? '<span class="badge-vegano">🌱 Vegano</span>' : "";
    const favScore  = _scoreMap.get(r.id) || 0;
    const favBadge  = favScore > 0
      ? `<span class="badge-fav-ing">⭐ ${favScore} de tus ingredientes</span>`
      : "";
    const embBadgesList = condicion === "embarazo" ? _badgesEmbarazo(r, trimestre) : [];
    const embBadgesHTML = embBadgesList.length > 0
      ? `<div class="badges-embarazo">${embBadgesList.map(b => `<span class="badge-embarazo">${b}</span>`).join("")}</div>`
      : "";
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
          ${esVeg}${favBadge}
          ${embBadgesHTML}
          <p class="opcion-desc">${r.descripcion}</p>
          ${adaptacion}
          <div class="opcion-macros">
            <span class="macro-kcal"><span class="macro-ico">🔥</span>${r.calorias} kcal</span>
            <span class="macro-prot"><span class="macro-ico">🌿</span>${r.proteinas}g prot.</span>
          </div>
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
  const rv = prepararReceta(receta, slot.tipo);
  selecciones[slotId] = fueDeseleccion ? null : { ...rv, tipo: slot.tipo };

  if (receta?.pesado && !fueDeseleccion) mostrarAvisoHeavy(receta.nota);

  renderSeccion(slot);
  actualizarProgreso();
  actualizarResumen();
  actualizarPlanDelDia();
  if (typeof actualizarListaCompras === "function") actualizarListaCompras();

  const check = document.getElementById(`check-${slotId}`);
  if (check) check.textContent = selecciones[slotId] ? "✅" : "";
  actualizarEstadoSeccion(slotId);

  if (!fueDeseleccion) {
    // Cerrar la sección actual
    document.getElementById(`sec-${slotId}`)?.classList.remove("abierta");
    const arrow = document.getElementById(`arrow-${slotId}`);
    if (arrow) arrow.textContent = "▼";

    // Abrir la siguiente sección que aún no tiene receta elegida
    const idxActual = SLOTS.findIndex(s => s.id === slotId);
    const siguiente = SLOTS.slice(idxActual + 1).find(s => !selecciones[s.id]);
    if (siguiente) {
      setTimeout(() => toggleSeccion(siguiente.id), 250);
    }
  }
}

// ─── SWAP DIRECTO SIN ABRIR SECCIÓN ─────────────────────────
function swapReceta(slotId, nuevaRecetaId) {
  const slot   = SLOTS.find(s => s.id === slotId);
  const receta = (RECETAS[slot.tipo] || []).find(r => r.id === nuevaRecetaId);
  if (!receta) return;

  const rv = prepararReceta(receta, slot.tipo);
  selecciones[slotId] = { ...rv, tipo: slot.tipo };
  const check = document.getElementById(`check-${slotId}`);
  if (check) check.textContent = "✅";

  actualizarEstadoSeccion(slotId);
  renderSeccion(slot);
  actualizarProgreso();
  actualizarResumen();
  actualizarPlanDelDia();
  if (typeof actualizarListaCompras === "function") actualizarListaCompras();
}

// ─── VER RECETA DESDE TARJETA ────────────────────────────────
function verRecetaDetalle(slotId, recetaId) {
  const slot   = SLOTS.find(s => s.id === slotId);
  const receta = RECETAS[slot.tipo].find(r => r.id === recetaId);
  if (receta) {
    const rv = { ...prepararReceta(receta, slot.tipo), tipo: slot.tipo };
    if (FOTOS_LOCAL[receta.id]) rv._fotoLocal = `img/recetas/${FOTOS_LOCAL[receta.id]}`;
    localStorage.setItem("recetaActual", JSON.stringify(rv));
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
  if (typeof abrirBottomSheet === "function") { abrirBottomSheet(); return; }
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

    const usuario    = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
    const enfermedad = usuario.enfermedad;
    const condicion  = usuario.condicion || "";

    // Top 2 comidas más calóricas
    const pesadas = SLOTS
      .map(s => ({ slot: s, receta: selecciones[s.id] }))
      .filter(x => x.receta)
      .sort((a, b) => (b.receta.calorias || 0) - (a.receta.calorias || 0))
      .slice(0, 2);

    document.getElementById("alerta-opciones").innerHTML = pesadas.map(({ slot, receta }) => {
      // Buscar alternativas más livianas del mismo tipo
      const alts = (RECETAS[slot.tipo] || [])
        .filter(r => r.id !== receta.id && (!modoVegano || r.vegano) && esAptaParaMi(r))
        .map(r => prepararReceta(r, slot.tipo))
        .filter(r => r.calorias < receta.calorias)
        .sort((a, b) => b.calorias - a.calorias) // más cercanas en calorías primero
        .slice(0, 3);

      const altsHTML = alts.length
        ? `<div class="alerta-alts-label">Cambia por:</div>
           <div class="alerta-alts">${alts.map(alt => `
             <button class="btn-alt-swap" onclick="swapReceta('${slot.id}','${alt.id}')">
               <span class="alt-nombre">${alt.nombre.replace(/🌱 /g,"")}</span>
               <span class="alt-kcal">${alt.calorias} kcal · <strong style="color:#2e7d32">-${receta.calorias - alt.calorias}</strong></span>
             </button>`).join("")}
           </div>`
        : `<p style="font-size:11px;color:#aaa;margin:4px 0 0">No hay alternativas más livianas disponibles.</p>`;

      return `
        <div class="alerta-opcion">
          <div class="alerta-opcion-info">
            <span class="alerta-slot">${slot.label}</span>
            <span class="alerta-nombre">${receta.nombre.replace(/🌱 /g, "")}</span>
            <span class="alerta-kcal">${receta.calorias} kcal</span>
          </div>
          ${altsHTML}
        </div>`;
    }).join("");

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
        return r ? `<li><span>${s.label}</span> <strong>${r.nombre.replace(/🌱 /g,"")}</strong> — ${r.calorias} kcal</li>` : "";
      }).join("")}</ul>
      <p class="resumen-total">Total: <strong>${caloriasSeleccionadas()} kcal</strong> / ${caloriasObjetivo()} kcal objetivo</p>`;

    // Plan completo → volver al tope para ver el resumen de macros
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 350);
  } else {
    resumen.style.display = "none";
  }
}

// ─── PANEL "MI PLAN DEL DÍA" (ver recetas seleccionadas) ────
function togglePlanDia() {
  const panel = document.getElementById("panel-plan-dia");
  if (!panel) return;
  panel.classList.toggle("expandido");
}

function actualizarPlanDelDia() {
  const panel = document.getElementById("panel-plan-dia");
  if (!panel) return;

  const selArr = SLOTS.map(s => ({ slot: s, receta: selecciones[s.id] })).filter(x => x.receta);
  if (!selArr.length) {
    panel.style.display = "none";
    panel.classList.remove("expandido");
    return;
  }

  panel.style.display = "block";

  // Actualizar label con conteo y flecha
  const label = panel.querySelector(".plan-dia-label");
  if (label) {
    label.innerHTML = `<span>📋 Mi plan · ${selArr.length} de ${SLOTS.length} comidas</span><span class="plan-dia-arrow">▼</span>`;
    label.onclick = togglePlanDia;
  }

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
    const rv = { ...prepararReceta(receta, tipo), tipo };
    if (FOTOS_LOCAL[receta.id]) rv._fotoLocal = `img/recetas/${FOTOS_LOCAL[receta.id]}`;
    localStorage.setItem("recetaActual", JSON.stringify(rv));
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
  if (!document.getElementById("meta-header")) return; // solo en recetas.html
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
    const RAZON_BANNER = {
      diabetes:     "controlando el índice glucémico para estabilizar tu azúcar en sangre",
      hipertension: "limitando el sodio para cuidar tu presión arterial",
      colesterol:   "reduciendo grasas saturadas para proteger tu corazón",
      renal:        "controlando proteína y minerales para cuidar tus riñones",
      celiaquia:    "eliminando gluten para proteger tu intestino",
      gastritis:    "evitando irritantes para proteger tu mucosa gástrica",
      tiroides:     "equilibrando nutrientes clave para tu metabolismo",
      cardiaca:     "limitando sodio y grasas saturadas para tu corazón",
      digestiva:    "priorizando alimentos de fácil digestión",
      obesidad:     "priorizando saciedad con menor densidad calórica",
    };
    if (enfermedad && enfermedad !== "ninguna") {
      const razon = RAZON_BANNER[enfermedad] ? ` — ${RAZON_BANNER[enfermedad]}` : "";
      lineas.push(`🩺 Recetas adaptadas para: <strong>${etiquetas[enfermedad]||enfermedad}</strong>${razon}`);
    }
    if (condicion === "embarazo") {
      const t   = usuario.trimestre || "1";
      const cfg = PRIORIDAD_TRIMESTRE[t];
      const chips = ["1","2","3"].map(tr =>
        `<button class="trimestre-chip${tr===t?" activo":""}" data-t="${tr}" onclick="cambiarTrimestre('${tr}')">T${tr}</button>`
      ).join("");
      lineas.push(
        `🤰 <strong>Embarazo</strong> &nbsp;${chips}` +
        `<br><span id="banner-trimestre-info" style="font-size:11px;opacity:0.85">${cfg.kcal} · ${cfg.tip}</span>` +
        `<br><span id="banner-trimestre-pri" style="font-size:11px;opacity:0.85">Priorizando: ${cfg.nutrientes.map(n=>LABELS_NUTRIENTE[n]).join(" · ")}</span>`
      );
    }
    if (condicion === "lactancia")
      lineas.push(`🍼 Recetas adaptadas para: <strong>Lactancia</strong> — mayor aporte calórico recomendado`);

    if (lineas.length)
      banner.innerHTML = `<div class="banner-salud"><span>ℹ️</span><div>${lineas.join("<br>")}</div></div>`;
  }

  shufflearRecetas();
  document.getElementById("meta-header").textContent = caloriasObjetivo();

  // Mostrar objetivo calórico personalizado por slot
  SLOTS.forEach(s => {
    const el = document.getElementById(`estado-${s.id}`);
    if (el && !selecciones[s.id]) el.textContent = textoEstadoInicial(s.id);
  });

  SLOTS.forEach(s => renderSeccion(s));
  actualizarProgreso();

  // Abrir desayuno por defecto
  toggleSeccion("desayuno");

  // Hint de scroll en los chips: desliza lento y vuelve, se cancela al tocar
  setTimeout(_hintChipScroll, 900);
}

function _hintChipScroll() {
  const el = document.querySelector(".controles-globales");
  if (!el || el.scrollWidth <= el.clientWidth) return;

  const maxDesplaz = Math.min(48, el.scrollWidth - el.clientWidth);
  const duracion   = 1400; // ms total (ida + vuelta)
  let animId;
  let cancelado = false;

  const cancelar = () => { cancelado = true; cancelAnimationFrame(animId); el.scrollLeft = 0; };
  el.addEventListener("touchstart", cancelar, { once: true, passive: true });
  el.addEventListener("mousedown",  cancelar, { once: true });

  const inicio = performance.now();
  function step(ahora) {
    if (cancelado) return;
    const t = (ahora - inicio) / duracion;
    if (t < 0.45) {
      el.scrollLeft = maxDesplaz * (t / 0.45);       // va a la derecha
    } else if (t < 1) {
      el.scrollLeft = maxDesplaz * (1 - (t - 0.45) / 0.55); // regresa
    } else {
      el.scrollLeft = 0;
      return;
    }
    animId = requestAnimationFrame(step);
  }
  animId = requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", initPlaneador);
