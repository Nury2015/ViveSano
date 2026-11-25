// ============================================================
// NUTRICIÓN — única fuente de fórmulas y adaptaciones por condición
// Lo usan: calculadora, recetas, plan semanal y perfil.
// Guía educativa: no reemplaza a un profesional de salud.
// ============================================================
const Nutricion = (() => {

  const FACTOR_ACTIVIDAD = { sedentario: 1.2, ligero: 1.375, leve: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9 };

  // g de proteína por kg de peso de referencia, según objetivo y actividad.
  // El piso es la RDA (0.8); 1.6–2.0 solo con entrenamiento frecuente (ISSN 2017).
  const PROTEINA = {
    mantener:  { baja: [0.8, 1.0], media: [1.0, 1.2], alta: [1.2, 1.6] },
    bajar:     { baja: [1.0, 1.2], media: [1.2, 1.5], alta: [1.4, 1.8] },
    tonificar: { baja: [1.0, 1.2], media: [1.2, 1.6], alta: [1.6, 2.0] },
    masa:      { baja: [1.0, 1.2], media: [1.4, 1.6], alta: [1.6, 2.0] },
  };
  const NIVEL = { sedentario: "baja", ligero: "baja", leve: "baja", moderado: "media", activo: "alta", muy_activo: "alta" };

  const imc = d => d.peso / Math.pow(d.estatura / 100, 2);

  // Con IMC ≥ 30 se usa peso ajustado para no inflar la proteína
  function pesoReferencia(d) {
    if (!d.estatura || imc(d) < 30) return d.peso;
    const pesoIMC25 = 25 * Math.pow(d.estatura / 100, 2);
    return pesoIMC25 + 0.25 * (d.peso - pesoIMC25);
  }

  function validar(d) {
    if (!(d.edad >= 14 && d.edad <= 100)) return "La calculadora es para personas de 14 a 100 años. Los niños necesitan valoración pediátrica.";
    if (!(d.peso >= 30 && d.peso <= 300)) return "Revisa el peso: debe estar entre 30 y 300 kg.";
    if (!(d.estatura >= 120 && d.estatura <= 230)) return "Revisa la estatura en centímetros: debe estar entre 120 y 230.";
    return null;
  }

  // Objetivo que es seguro aplicar a esta persona
  function objetivoSeguro(d) {
    const o = PROTEINA[d.objetivo] ? d.objetivo : "mantener";
    if (o === "mantener") return o;
    if (d.condicion === "embarazo" || d.condicion === "lactancia") return "mantener";
    if (d.edad && d.edad < 18) return "mantener";
    if (d.enfermedad === "renal") return "mantener";
    if (d.enfermedad === "obesidad" && o === "masa") return "mantener";
    if (o === "masa" && (d.actividad || "sedentario") === "sedentario") return "mantener"; // sin entrenar, el superávit es grasa
    if (d.peso && d.estatura) {
      if (imc(d) < 18.5 && (o === "bajar" || o === "tonificar")) return "mantener";
      if (imc(d) >= 30 && o === "masa") return "mantener";
    }
    return o;
  }

  function rangoProteinaKg(d) {
    // Embarazo y lactancia van primero: nunca restringir proteína ahí sin supervisión
    if (d.condicion === "lactancia") return [1.1, 1.3];         // RDA 1.3
    if (d.condicion === "embarazo") return String(d.trimestre || 1) === "1" ? [0.8, 1.1] : [1.1, 1.3]; // RDA 1.1
    if (d.edad && d.edad < 18) return [0.85, 1.2];              // RDA adolescente 0.85
    if (d.enfermedad === "renal") return [0.6, 0.8];            // KDOQI 2020 / KDIGO 2024, sin diálisis
    let [a, b] = PROTEINA[objetivoSeguro(d)][NIVEL[d.actividad] || "baja"];
    if (d.edad >= 65) { a = Math.max(a, 1.0); b = Math.max(b, 1.2); } // PROT-AGE
    return [a, b];
  }

  function macros(d, kcal) {
    const ref = pesoReferencia(d);
    const [a, b] = rangoProteinaKg(d);
    const tope = kcal * 0.35 / 4;                               // máximo AMDR
    const protMin = Math.min(a * ref, tope), protMax = Math.min(b * ref, tope);
    const prot = (protMin + protMax) / 2;

    let pg = 0.30;
    if (d.enfermedad === "colesterol" || d.enfermedad === "cardiaca") pg = 0.27;
    if (d.enfermedad === "diabetes" || d.enfermedad === "renal") pg = 0.35; // menos carbohidrato / menos proteína
    // Al menos 130 g de carbohidrato si cabe, sin bajar de 20 % de grasa
    const maxGrasa = (kcal - prot * 4 - 130 * 4) / kcal;
    pg = Math.max(0.20, Math.min(pg, maxGrasa));

    const grasas = kcal * pg / 9;
    const carbs = Math.max(0, kcal - prot * 4 - grasas * 9) / 4;
    return { prot, protMin, protMax, grasas, carbs };
  }

  const LIMITES = {
    diabetes:     "Reparte los carbohidratos entre las comidas, prefiere integrales y al menos 25 g de fibra al día.",
    hipertension: "Límite de sodio: menos de 2000 mg al día (unos 5 g de sal en total).",
    colesterol:   "Grasa saturada: menos del 7 % de tus calorías.",
    obesidad:     "Prioriza verduras y fibra en cada comida; baja de peso de forma gradual.",
    celiaquia:    "Cero gluten: revisa el sello «sin gluten» y evita la contaminación cruzada.",
    tiroides:     "Si tomas levotiroxina, hazlo en ayunas 30–60 min antes de comer, y separa calcio y hierro 4 horas.",
    renal:        "Sodio menor a 2000 mg al día. El potasio y el fósforo se ajustan según tus exámenes.",
    cardiaca:     "Sodio menor a 2000 mg al día y grasa saturada menor al 6 % de tus calorías.",
    digestiva:    "Come porciones pequeñas, sin picante ni frituras, y observa qué alimentos te caen mal.",
  };

  function calcular(d) {
    // Mifflin-St Jeor (1990); sin sexo indicado se usa el punto medio
    const k = d.sexo === "f" ? -161 : d.sexo === "m" ? 5 : -78;
    const tmb = 10 * d.peso + 6.25 * d.estatura - 5 * d.edad + k;
    let get = tmb * (FACTOR_ACTIVIDAD[d.actividad] || 1.2);
    if (d.condicion === "embarazo") get += ({ 2: 340, 3: 452 })[d.trimestre] || 0;
    else if (d.condicion === "lactancia") get += 500;

    const obj = objetivoSeguro(d);
    let kcal = get;
    if (obj === "bajar")          kcal -= Math.min(500, get * 0.20);
    else if (obj === "tonificar") kcal -= Math.min(200, get * 0.10);
    else if (obj === "masa")      kcal += 300;

    // Nunca por debajo del piso (ni por encima del gasto solo por el piso)
    const piso = Math.max(tmb, d.sexo === "m" ? 1500 : 1200);
    if (kcal < get) kcal = Math.max(kcal, Math.min(piso, get));
    kcal = Math.round(kcal);

    const avisos = [];
    if (obj !== (d.objetivo || "mantener"))
      avisos.push("Por seguridad, con tus datos calculamos un plan de mantenimiento en lugar del objetivo elegido." +
        (d.objetivo === "masa" && d.actividad === "sedentario" ? " Para ganar músculo necesitas entrenar fuerza." : ""));
    if (d.enfermedad === "renal" && (d.condicion === "embarazo" || d.condicion === "lactancia"))
      avisos.push("Enfermedad renal con embarazo o lactancia necesita un plan médico individual. No uses estos valores sin tu especialista.");
    else if (d.enfermedad === "renal")
      avisos.push("La proteína está calculada para enfermedad renal sin diálisis. En diálisis se necesita más: confírmala con tu nefrólogo.");
    if (d.enfermedad === "diabetes")
      avisos.push("Si usas insulina u otros medicamentos para el azúcar, no cambies tus carbohidratos sin consultar a tu médico.");
    if (d.edad < 18)
      avisos.push("Eres menor de edad: esta es una estimación. Consulta con pediatría o nutrición.");
    if (imc(d) < 18.5 && d.edad >= 18)
      avisos.push("Tu IMC indica bajo peso. Te recomendamos una valoración profesional.");
    if (LIMITES[d.enfermedad]) avisos.push(LIMITES[d.enfermedad]);
    return { tmb, get, kcal, objetivo: obj, avisos, ...macros(d, kcal) };
  }

  // ── PERFIL DE CADA INGREDIENTE ─────────────────────────────
  // Fracción de sus kcal en [proteína, carbohidrato, grasa]
  const PERFIL = [
    [/prote[ií]na en polvo con|^prote[ií]na en polvo|^\+?prote/i, [0.85, 0.12, 0.03]],
    [/clara/i,                                         [0.50, 0.03, 0.47]],
    [/pechuga|menudo|pollo desmechado/i,               [0.75, 0, 0.25]],
    [/tofu/i,                                           [0.40, 0.10, 0.50]],
    [/lomo|magra/i,                                    [0.60, 0, 0.40]],
    [/pollo|muslo|carne|costilla|chicharr/i,           [0.48, 0, 0.52]],
    [/huevo/i,                                         [0.34, 0.03, 0.63]],
    [/queso|cuajada/i,                                 [0.25, 0.05, 0.70]],
    [/leche de coco|aguacate|aceite/i,                 [0.04, 0.14, 0.82]],
    [/bebida|leche de avena/i,                         [0.08, 0.72, 0.20]],
    [/descremad/i,                                     [0.40, 0.55, 0.05]],
    [/leche|yogur/i,                                   [0.22, 0.32, 0.46]],
    [/man[ií](?!z)|semillas|nueces|almendra/i,         [0.16, 0.14, 0.70]],
    [/lenteja|frijol|habas/i,                          [0.27, 0.69, 0.04]],
    [/arveja/i,                                        [0.22, 0.74, 0.04]],
    [/chocolate|cacao/i,                               [0.07, 0.40, 0.53]],
    [/avena|granola|pasta(?!$)|fideo|pan |obleas/i,    [0.13, 0.75, 0.12]],
    [/pandebono|almoj/i,                               [0.11, 0.57, 0.32]],
    [/arroz|arepa|masarepa|choclo|mazorca|ma[ií]z/i,   [0.08, 0.86, 0.06]],
    [/./,                                              [0.06, 0.90, 0.04]],
  ];
  const perfil = n => PERFIL.find(([re]) => re.test(n))[1];
  const gr = i => { const p = perfil(i.nombre), k = i.calorias || 0; return [p[0] * k / 4, p[1] * k / 4, p[2] * k / 9]; };

  // ── PORCIONES ──────────────────────────────────────────────
  const FR = { "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3 };
  function escalar(cantidad, f) {
    if (!cantidad || f === 1) return cantidad;
    return cantidad.replace(/(\d+)?([½¼¾⅓⅔])|\d+(?:[.,]\d+)?/g, (m, ent, fr, pos) => {
      const n = fr ? (+(ent || 0)) + FR[fr] : parseFloat(m.replace(",", "."));
      const v = n * f;
      if (/^\s*(g|ml)\b/.test(cantidad.slice(pos + m.length))) return String(Math.max(5, Math.round(v / 5) * 5));
      const q = Math.max(0.25, Math.round(v * 4) / 4), e = Math.floor(q);
      return (e || "") + ({ 0: "", 0.25: "¼", 0.5: "½", 0.75: "¾" })[q - e];
    });
  }

  // ── REGLAS POR CONDICIÓN ───────────────────────────────────
  // r(patrón, nombre nuevo o null, opciones). Se aplica la PRIMERA regla que coincide.
  //   q: factor de porción · k: factor de kcal (por defecto q) · cant: cantidad fija
  //   txt: cambios en nombre, descripción y pasos. "+ x" añade x al nombre original.
  const r = (re, nombre, o = {}) => ({ re, nombre, q: o.q ?? 1, k: o.k ?? o.q ?? 1, cant: o.cant, txt: o.txt || [] });

  const LECHE_T = [[/\bleche\b(?! de| descr| sin)( entera)?/gi, "leche descremada"]];
  const SIN_CREMA = [[/ y sirve con crema/g, " y sirve"]];
  const COSTILLA_T = [[/(la |las )?costillas?( de res)?/gi, "pechuga de pollo"]];
  const CHICHARRON_T = [[/con tocino y hogao/g, "con hogao"]];
  const FRITO_T = [
    [/Fríe el huevo[^;]*/g, "Cocina el huevo en agua hirviendo 10 min (sin freír)"],
    [/y fríe \(patacones\)/g, "y hornéalo a 200°C hasta dorar"],
    [/patacones/gi, "plátano verde al horno"],
    [/Fríe en aceite caliente 3-4 min por lado, o hornea/g, "Hornea"],
    [/Prepara los huevos al gusto \([^)]*\)/g, "Cocina los huevos en agua hirviendo 10 min"],
    [/huevo frito/gi, "huevo cocido"],
    [/con tocino y hogao/g, "con hogao"], [/ con un poco de aceite/g, " sin aceite"],
  ];
  const SIN_FRITO = [
    r(/^Huevo frito/i, "Huevo cocido", { k: 0.78 }),
    r(/^Huevos cocidos o fritos/i, "Huevos cocidos"),
    r(/patacones/i, "Plátano verde al horno", { k: 0.8 }),
  ];
  const CARNE_MAGRA = r(/^Carne molida/i, "Carne molida magra (sin chicharrón)", { k: 0.75, txt: CHICHARRON_T });
  const MAGRAS = [
    r(/^Muslo de pollo/i, "Pechuga de pollo sin piel", { k: 0.8 }),
    r(/^Costilla/i, "Pechuga de pollo sin piel", { k: 0.85, txt: COSTILLA_T }),
    CARNE_MAGRA,
    r(/^Carne de res/i, "Lomo de res magro", { k: 0.8 }),
  ];
  const LECHE = [
    r(/^Leche entera/i, "Leche descremada", { k: 0.57, txt: LECHE_T }),
    r(/^Leche o agua/i, "Leche descremada", { txt: LECHE_T }),
    r(/^Yogur (natural|griego entero)/i, "Yogur natural descremado sin azúcar", { k: 0.6 }),
  ];
  const DULCE = [
    r(/^Canela y panela/i, "Canela y stevia", { k: 0.17, txt: [[/panela o stevia|panela raspada|panela/gi, "stevia"]] }),
    r(/^Panela raspada|^Stevia o poca panela/i, "Stevia", { k: 0, cant: "al gusto", txt: [[/panela/gi, "stevia"]] }),
    r(/^Agua de panela/i, "Aromática sin azúcar", { k: 0.1, txt: [[/Prepara el agua de panela.*/g, "Prepara la aromática sin endulzar"], [/agua de panela( caliente)?/gi, "aromática sin azúcar"]] }),
    r(/^Chocolate caliente con leche/i, "Cacao sin azúcar con leche descremada", { k: 0.65 }),
    r(/^Bebida:/i, "Aromática sin azúcar", { k: 0.1 }),
  ];
  const SAL = [
    r(/^Aceite, sal y cilantro/i, "Aceite y cilantro (sin sal)"),
    r(/^Aceite mínimo, sal/i, "Aceite mínimo y cilantro (sin sal)"),
    r(/^Sal y cilantro/i, "Cilantro (sin sal)"),
    r(/^Sal y limón/i, "Limón (sin sal)"),
    r(/^Sal, limón y cilantro/i, "Limón y cilantro (sin sal)"),
    r(/^Sal, limón, ají/i, "Limón (sin sal)", { k: 0.5 }),
    r(/^Sal$/i, "Cilantro (sin sal)"),
    r(/^Cilantro, cebolla larga, sal/i, "Cilantro y cebolla larga (sin sal)"),
    r(/^Cebolla, ajo, sal/i, "Cebolla y ajo (sin sal)"),
    r(/^Hogao, comino, sal/i, "Hogao y comino (sin sal)"),
    r(/^Limón, aceite de oliva, sal/i, "Limón y aceite de oliva (sin sal)"),
    r(/^Caldo de pollo, cilantro/i, "Caldo casero de pollo sin sal y cilantro"),
    r(/^Caldo vegetal/i, "Caldo vegetal casero sin sal"),
    r(/^Hogao, cilantro, caldo/i, "Hogao, cilantro y caldo casero sin sal"),
    r(/^Maní tostado molido/i, "Maní tostado molido sin sal"),
    r(/^Mantequilla de maní/i, "Mantequilla de maní 100 % natural sin sal"),
    r(/^Almojábana/i, "Arepa de maíz sin sal", { txt: [[/almojábana o pan|almojábana/gi, "arepa de maíz"]] }),
  ];
  // En renal estas bases llevan tomate (potasio): se omite
  const SAL_RENAL = SAL.map(x => ({ ...x, nombre: x.nombre.replace(/^Hogao/, "Sofrito de cebolla y pimentón") }));
  const QUESO_SIN_SAL = r(/^Queso (blanco )?campesino/i, "Cuajada fresca sin sal");
  const QUESO_LIGHT   = r(/^Queso (blanco )?campesino/i, "Cuajada baja en grasa", { k: 0.6 });
  const QUESO_AMBOS   = r(/^Queso (blanco )?campesino/i, "Cuajada baja en grasa y sin sal", { k: 0.6 });
  const UN_HUEVO = [
    r(/^Huevos (frescos|cocidos)/i, "Huevo entero y claras", { k: 0.75, cant: "1 huevo + 2 claras" }),
  ];
  const COCO = r(/^Leche de (coco|avena)/i, "Bebida vegetal de avena o almendra sin azúcar", { k: 0.6, txt: [[/leche de avena o coco|leche de coco|leche vegetal/gi, "bebida vegetal sin azúcar"]] });
  const PAN_ARROZ = [[/pan tostado o arepa/gi, "arepa de maíz"]];
  const FRUTA_BAJA = [
    r(/mango|banano maduro|^Banano|^Fruta/i, "Fresas o manzana con cáscara", { k: 0.75, txt: [
      [/(mango|banano) fresco/gi, "fresas frescas"], [/mango, papaya y piña/gi, "fresas, papaya y manzana"],
      [/el banano/gi, "las fresas"], [/\b(mango|banano)\b/gi, "fresas"]] }),
    r(/^Naranja o papaya/i, "Naranja entera (no en jugo)"),
    r(/^Papaya o piña/i, "Papaya", { q: 0.75 }),
    r(/^Fresas o banano/i, "Fresas"),
  ];
  const GUASCAS = r(/^Guascas y crema/i, "Guascas (sin crema)", { k: 0.5, txt: SIN_CREMA });
  const GUASCAS_SIN_SAL = r(/^Guascas y crema/i, "Guascas (sin crema ni alcaparras)", { k: 0.5, txt: SIN_CREMA });
  const TUBERCULO = /papa\b|^Papa |^Yuca|^Cubios/i;

  const REGLAS = {
    diabetes: { frito: true, reglas: [
      ...SIN_FRITO, ...DULCE, ...LECHE, ...FRUTA_BAJA,
      r(/^Arroz blanco/i, "Arroz integral", { q: 0.6, txt: [[/arroz blanco/gi, "arroz integral"]] }),
      r(/^Plátano/i, "Plátano verde cocido", { q: 0.5, txt: [[/Asa el plátano maduro en sartén[^;]*/g, "Cocina el plátano verde en agua"], [/plátano maduro/gi, "plátano verde"]] }),
      r(/^Avena/i, "Avena en hojuelas enteras (no instantánea)", { q: 0.7 }),
      r(/^Granola/i, "Nueces picadas sin azúcar", { q: 0.5, txt: [[/granola/gi, "nueces"]] }),
      r(/^Pasta|^Fideos/i, "Pasta integral", { q: 0.6, txt: [[/fideos( delgados)?/gi, "pasta integral"]] }),
      r(/^Pan tostado/i, "Pan integral o arepa pequeña", { q: 0.6 }),
      r(/^Arepa|^Masarepa/i, null, { q: 0.6 }),
      r(TUBERCULO, null, { q: 0.6 }),
      r(/^Mazorca|^Maíz/i, null, { q: 0.6 }),
      r(/^Frijoles|^Lentejas/i, null, { q: 0.8 }),
      r(/^Chontaduro|^Manzana roja|^Pera/i, null, { q: 0.6 }),
      r(/^Leche de (coco|avena)/i, "Bebida de almendra sin azúcar", { k: 0.4, txt: [[/leche de avena o coco|leche de coco|leche vegetal/gi, "bebida de almendra"]] }),
      r(/^Café con leche/i, "Tinto sin azúcar", { k: 0.15 }),
    ]},
    hipertension: { sal: true, frito: true, reglas: [
      ...SIN_FRITO, ...SAL, ...LECHE, CARNE_MAGRA, QUESO_SIN_SAL,
      r(/^Café con leche/i, "Aromática o café descafeinado", { k: 0.3 }),
      r(/^Bebida:/i, "Aromática sin azúcar", { k: 0.1 }),
      r(/^Galletas de arroz/i, "Galletas de arroz sin sal"),
      r(/^Pan tostado/i, "Arepa de maíz sin sal", { txt: PAN_ARROZ }),
      GUASCAS_SIN_SAL,
      r(/^Arepa/i, "+ sin sal"),
    ]},
    colesterol: { frito: true, reglas: [
      ...SIN_FRITO, ...UN_HUEVO, ...MAGRAS, ...LECHE, QUESO_LIGHT, COCO,
      r(/^Chocolate/i, "Cacao sin azúcar (70 % o más)", { q: 0.6 }),
      r(/^Bebida:|^Café con leche/i, "Aromática sin azúcar", { k: 0.1 }),
      GUASCAS,
      r(/^Almojábana/i, "Arepa de maíz", { txt: [[/almojábana o pan|almojábana/gi, "arepa de maíz"]] }),
      r(/^Arroz blanco/i, "Arroz integral", { txt: [[/arroz blanco/gi, "arroz integral"]] }),
    ]},
    obesidad: { frito: true, reglas: [
      ...SIN_FRITO, ...DULCE, ...LECHE, ...MAGRAS, QUESO_LIGHT, COCO,
      r(/^Arroz blanco|^Arepa|^Pasta|^Fideos|^Masarepa/i, null, { q: 0.65 }),
      r(TUBERCULO, null, { q: 0.65 }),
      r(/^Mazorca|^Maíz|^Plátano|^Pan tostado/i, null, { q: 0.65 }),
      r(/aguacate|^Maní|^Mantequilla de maní|^Aceite/i, null, { q: 0.6 }),
      r(/^Avena|^Granola|^Galletas|^Chontaduro/i, null, { q: 0.7 }),
      r(/^Café con leche/i, "Tinto sin azúcar", { k: 0.15 }),
      GUASCAS,
    ]},
    celiaquia: { reglas: [
      r(/^Pan tostado/i, "Arepa de maíz", { txt: PAN_ARROZ }),
      r(/^Almojábana/i, "Arepa de maíz", { txt: [[/almojábana o pan troceado|almojábana o pan|almojábana/gi, "arepa de maíz"]] }),
      r(/^Pasta|^Fideos/i, "Pasta de arroz sin gluten", { txt: [[/fideos( delgados)?/gi, "pasta de arroz"]] }),
      r(/^Avena/i, "Avena certificada sin gluten"),
      r(/^Granola/i, "Granola certificada sin gluten"),
      r(/^Pandebono/i, "Pandebono con sello sin gluten"),
      r(/^Galletas de arroz/i, "Galletas de arroz con sello sin gluten"),
      r(/^Caldo/i, "+ casero (sin cubos ni sazonadores con gluten)"),
      r(/caldo$/i, "Hogao, cilantro y caldo casero (sin cubos)"),
      r(/^Chocolate|^Bebida:/i, "+ (chocolate con sello sin gluten)"),
      r(/o prote[ií]na en polvo/i, "Aromática de hierbas", { k: 0.15 }),
      r(/^Masarepa/i, "Masarepa con sello sin gluten"),
      r(/^Leche de (avena|coco)/i, "Leche de coco", { txt: [[/leche de avena o coco/gi, "leche de coco"]] }),
      r(/achiote|comino|color/i, "+ (especias puras, sin sazonador)"),
    ]},
    tiroides: { reglas: [
      r(/^Cubios/i, "Zanahoria y ahuyama", { txt: [[/cubios, chuguas/gi, "zanahoria, ahuyama"]] }),
      r(/^Yuca/i, "Papa pastusa", { k: 0.6, txt: [[/papa, yuca/gi, "papa"], [/\byuca\b/gi, "papa pastusa"]] }),
      r(/^Café con leche|^Bebida:|^Chocolate caliente/i, "Aromática (café o lácteos lejos del medicamento)", { k: 0.3 }),
      r(/^Sal y |^Sal$|^Sal,/i, "+ (sal yodada, una pizca)"),
      r(/^Maní|^Mantequilla de maní/i, null, { q: 0.6 }),
      r(/^Chocolate de mesa/i, null, { q: 0.6 }),
      r(/^Pandebono/i, null, { q: 0.75 }),
    ]},
    renal: { sal: true, frito: true, reglas: [
      ...SIN_FRITO.slice(0, 1).map(x => ({ ...x })),
      r(/^Huevos/i, "Huevo", { k: 0.5, cant: "1 unidad (55 g)" }),
      r(/patacones/i, "Plátano verde hervido en dos aguas y horneado", { q: 0.5 }),
      ...SAL_RENAL,
      r(/^Pollo|^Pechuga|^Carne|^Costilla|^Lomo|^Muslo/i, null, { q: 0.5 }),
      r(/^Queso/i, "Cuajada fresca sin sal", { q: 0.5 }),
      r(/^Leche/i, "Bebida de arroz sin fosfatos añadidos", { k: 0.6, txt: [[/leche de avena o coco|leche de coco|leche vegetal|\bleche\b/gi, "bebida de arroz"]] }),
      r(/^Yogur/i, "Yogur natural sin azúcar", { q: 0.5 }),
      r(/^Lentejas|^Frijoles|^Habas/i, null, { q: 0.4 }),
      r(/^Maní|^Mantequilla de maní|^Semillas/i, null, { q: 0.5 }),
      r(/mango|banano|^Fruta|^Naranja|papaya|piña/i, "Manzana, pera o fresas", { txt: [
        [/(mango|banano) fresco|papaya de temporada/gi, "manzana fresca"], [/mango, papaya y piña/gi, "manzana, pera y fresas"],
        [/el banano/gi, "la manzana"], [/\b(mango|banano|papaya)\b/gi, "manzana"]] }),
      r(/aguacate/i, "Aceite de oliva", { k: 0.6, cant: "1 cdta. (5 ml)", txt: [
        [/(Machuca|Prepara) el aguacate[^;]*/g, "Mezcla el aceite de oliva con limón y cilantro"],
        [/Unta (el guacamole|un poco de aguacate)/g, "Rocía el aceite de oliva"],
        [/aguacate untado|aguacate cremoso|guacamole|\baguacate\b/gi, "aceite de oliva"]] }),
      r(/^Tomate|hogao|^Lechuga, tomate/i, null, {}),
      r(TUBERCULO, "+ (remojada y hervida en dos aguas)", { q: 0.5 }),
      r(/^Plátano/i, "Plátano verde (hervido en dos aguas)", { q: 0.5 }),
      r(/^Ahuyama/i, "+ (hervida en dos aguas)", { q: 0.6 }),
      r(/^Espinaca/i, "Repollo cocido", { txt: [[/espinaca/gi, "repollo"]] }),
      r(/^Mazorca|^Maíz/i, null, { q: 0.6 }),
      r(/^Chocolate|^Bebida:|^Café/i, "Aromática de hierbas", { k: 0.15, txt: [[/el café/gi, "la aromática"]] }),
      r(/prote[ií]na en polvo/i, "Aromática de hierbas", { k: 0.15 }),
      r(/^Avena/i, null, { q: 0.7 }),
      r(/^Granola/i, "Hojuelas de maíz sin azúcar", { txt: [[/granola/gi, "hojuelas de maíz"]] }),
      r(/^Galletas de arroz/i, "Galletas de arroz sin sal"),
      r(/^Pan tostado/i, "Arepa de maíz sin sal", { txt: PAN_ARROZ }),
      GUASCAS_SIN_SAL,
      r(/^Arepa/i, "+ sin sal"),
    ]},
    cardiaca: { sal: true, frito: true, reglas: [
      ...SIN_FRITO, ...SAL, ...UN_HUEVO, ...MAGRAS, ...LECHE, QUESO_AMBOS, COCO,
      r(/^Chocolate/i, "Cacao sin azúcar", { q: 0.5 }),
      r(/^Bebida:|^Café con leche/i, "Aromática sin azúcar", { k: 0.1 }),
      GUASCAS_SIN_SAL,
      r(/^Galletas de arroz/i, "Galletas de arroz sin sal"),
      r(/^Pan tostado/i, "Arepa de maíz sin sal", { txt: PAN_ARROZ }),
      r(/^Arepa/i, "+ sin sal"),
      r(/^Arroz blanco/i, "Arroz integral", { txt: [[/arroz blanco/gi, "arroz integral"]] }),
    ]},
    digestiva: { frito: true, picante: true, reglas: [
      ...SIN_FRITO,
      r(/^Leche de (coco|avena)/i, "Bebida de arroz", { k: 0.7, txt: [[/leche de avena o coco|leche de coco|leche vegetal/gi, "bebida de arroz"]] }),
      r(/^Leche|^Yogur/i, "+ sin lactosa", { txt: [[/\bleche\b(?! sin| de)/gi, "leche sin lactosa"]] }),
      r(/^Queso/i, "Cuajada sin lactosa", { q: 0.7 }),
      r(/^Chocolate|^Café|^Bebida:|tinto/i, "Aromática de manzanilla", { k: 0.15, txt: [[/el café/gi, "la manzanilla"]] }),
      r(/mango|^Naranja|^Fruta|piña|^Fresas/i, "Papaya madura", { txt: [[/mango fresco/gi, "papaya fresca"], [/\b(mango|naranja)\b/gi, "papaya"]] }),
      r(/^Frijoles/i, "Tofu suave", { k: 0.8 }),
      r(/^Hogao|^Tomate/i, "Cebolla cocida, zanahoria y cilantro (sin tomate)", { k: 0.8 }),
      r(/^Lechuga, tomate/i, "Zanahoria y calabacín cocidos", { txt: [
        [/Mezcla lechuga, tomate y pepino para la ensalada/gi, "Cocina zanahoria y calabacín al vapor"], [/ensalada fresca con limón|ensalada fresca|ensalada verde/gi, "verdura cocida"], [/la ensalada/gi, "la verdura"], [/Adereza con limón, aceite/gi, "Adereza con aceite"]] }),
      r(/aguacate|^Maíz|^Mazorca/i, null, { q: 0.6 }),
      r(/^Maní|^Mantequilla de maní/i, null, { q: 0.5 }),
      r(/arveja/i, "Zanahoria y calabacín cocidos", { k: 0.6, txt: [[/arveja/gi, "calabacín"]] }),
      r(/^Muslo|^Costilla/i, "Pechuga de pollo sin piel", { k: 0.8, txt: COSTILLA_T }),
      r(/^Carne de res/i, "Lomo de res magro bien cocido", { k: 0.8 }),
      GUASCAS,
      r(/^Limón, aceite/i, "Aceite de oliva y una pizca de sal"),
      r(/^Sal.*limón/i, "Una pizca de sal y cilantro", { txt: [[/ y gotas de limón|, limón y cilantro| y limón/gi, ""]] }),
    ]},
  };
  // El tomate / hogao en renal necesita además cambiar los pasos
  REGLAS.renal.reglas = REGLAS.renal.reglas.map(x => String(x.re) === String(/^Tomate|hogao|^Lechuga, tomate/i)
    ? r(x.re, "Cebolla, pimentón, pepino y cilantro (sin tomate)", { k: 0.8 }) : x);
  const TEXTO_FIJO = {
    diabetes: [[/panela o stevia/gi, "stevia"]],
    obesidad: [[/panela o stevia/gi, "stevia"]],
    renal: [[/ y aguacate al lado/g, " al lado"], [/tomate y cebolla/gi, "pimentón y cebolla"], [/(la )?cebolla y (el )?tomate/gi, "la cebolla y el pimentón"],
            [/el tomate y la cebolla/gi, "el pimentón y la cebolla"], [/\bhogao\b/gi, "sofrito de pimentón"], [/\btomate\b/gi, "pimentón"]],
    digestiva: [[/tomate y cebolla/gi, "zanahoria y cebolla"], [/(la )?cebolla y (el )?tomate/gi, "la cebolla y la zanahoria"],
            [/el tomate y la cebolla/gi, "la zanahoria y la cebolla"], [/\bhogao\b/gi, "sofrito suave"], [/\btomate\b/gi, "zanahoria"]],
  };

  const RAZON = {
    diabetes:     "porciones de carbohidrato medidas, sin azúcar añadida y de menor índice glucémico",
    hipertension: "sin sal añadida ni ingredientes salados",
    colesterol:   "carnes magras, lácteos descremados y sin frituras",
    obesidad:     "menos densidad calórica conservando la proteína",
    celiaquia:    "sin trigo, cebada ni centeno",
    tiroides:     "sin exceso de bociógenos; toma tu medicamento 30–60 min antes de comer",
    renal:        "proteína controlada, sin sal añadida y con menos potasio y fósforo",
    cardiaca:     "sin sal añadida y con poca grasa saturada",
    digestiva:    "suave, sin picante, sin lactosa y sin frituras",
  };

  // Recetas que no se arreglan con sustituciones (se suman a receta.contraindicada)
  const NO_APTAS = {
    diabetes:     ["galletas_arroz_mani"],
    hipertension: ["pandebono", "obleas_arequipe"],
    colesterol:   ["caldo_costilla", "chocolate_queso_arepa", "pandebono"],
    obesidad:     ["pandebono", "calentado_fruta", "arroz_leche", "chocolate_queso_arepa"],
    celiaquia:    ["obleas_arequipe"],
    tiroides:     [],
    renal:        ["bandeja_paisa", "mondongo_antioqueño", "sopa_lentejas", "arroz_frijoles_vegano", "chocolate_queso_arepa",
                   "once_vegana_semillas", "crema_papa_criolla", "changua_fruta", "calentado_fruta", "chontaduro", "pandebono"],
    cardiaca:     ["caldo_costilla", "pandebono", "obleas_arequipe", "bocadillo_queso"],
    digestiva:    ["empanada_pipian", "sopa_lentejas", "cocido_boyacense", "once_vegana_semillas", "caldo_costilla", "mondongo_antioqueño"],
  };
  function esApta(receta, d) {
    const e = d.enfermedad;
    if (e && e !== "ninguna" && (receta.contraindicada?.includes(e) || NO_APTAS[e]?.includes(receta.id))) return false;
    return !(d.condicion === "embarazo" && receta.contraindicada?.includes("embarazo"));
  }

  const quitarSal = t => t
    .replace(/Espolvorea sal al gusto y exprime/g, "Exprime")
    .replace(/con sal, limón y ají/gi, "con limón")
    .replace(/con sal (y|e) /gi, "con ").replace(/con sal, /gi, "con ")
    .replace(/, sal y /gi, " y ")
    .replace(/ (y|con) sal\b( al gusto)?/gi, "")
    .replace(/caldo de pollo/gi, "caldo casero de pollo sin sal");
  const quitarPicante = t => t
    .replace(/ y ají casero/g, "").replace(/Opcional: agrega ají.*/g, "Sirve sin ají")
    .replace(/, pimienta/g, "").replace(/(cilantro) y limón( al gusto)?/g, "$1");

  function sumar(m, delta, dk) {
    m.proteinas     = Math.max(0, Math.round((m.proteinas || 0) + delta[0]));
    m.carbohidratos = Math.max(0, Math.round((m.carbohidratos || 0) + delta[1]));
    m.grasas        = Math.max(0, Math.round((m.grasas || 0) + delta[2]));
    m.calorias      = Math.max(20, Math.round((m.calorias || 0) + dk));
    // Si las kcal quedan lejos de sus macros (4/4/9), mandan los macros
    const k = 4 * m.proteinas + 4 * m.carbohidratos + 9 * m.grasas;
    if (k > 0 && Math.abs(k - m.calorias) / m.calorias > 0.12) m.calorias = k;
  }

  function adaptar(receta, d) {
    const cfg = REGLAS[d.enfermedad];
    if (!cfg) return receta;
    const m = { ...receta, _cambios: [], _razon: RAZON[d.enfermedad] };
    const delta = [0, 0, 0], txts = [];
    let dk = 0;

    m.ingredientes = receta.ingredientes.map(ing => {
      if (/^Sin /.test(ing.nombre)) return ing;
      const regla = cfg.reglas.find(x => x.re.test(ing.nombre));
      if (!regla) return ing;
      const n = { ...ing };
      if (regla.nombre) n.nombre = regla.nombre.startsWith("+ ") ? `${ing.nombre} ${regla.nombre.slice(2)}` : regla.nombre;
      n.cantidad = regla.cant || escalar(ing.cantidad, regla.q);
      n.calorias = Math.round((ing.calorias || 0) * regla.k);
      txts.push(...regla.txt);
      if (n.nombre !== ing.nombre)
        m._cambios.push(`${ing.nombre} → ${n.nombre}${n.cantidad !== ing.cantidad ? ` (${n.cantidad})` : ""}`);
      else if (n.cantidad !== ing.cantidad)
        m._cambios.push(`${ing.nombre}: ${n.cantidad} en vez de ${ing.cantidad}`);
      const a = gr(ing), b = gr(n);
      [0, 1, 2].forEach(i => { delta[i] += b[i] - a[i]; });
      dk += n.calorias - (ing.calorias || 0);
      return n;
    });

    if (cfg.frito) txts.push(...FRITO_T);
    if (TEXTO_FIJO[d.enfermedad]) txts.push(...TEXTO_FIJO[d.enfermedad]);
    if (!/masa/.test(d.objetivo || "") || d.enfermedad === "renal" || d.enfermedad === "celiaquia")
      txts.push([/ \(o proteína en polvo si entrenas\)/g, ""]);
    const cambiar = t => {
      let s = t;
      txts.forEach(([re, a]) => { s = s.replace(re, a); });
      if (cfg.sal) s = quitarSal(s);
      if (cfg.picante) s = quitarPicante(s);
      return s === t ? t : s.charAt(0).toUpperCase() + s.slice(1);
    };
    m.nombre = cambiar(receta.nombre);
    m.descripcion = cambiar(receta.descripcion || "");
    m.preparacion = (receta.preparacion || []).map(cambiar);
    sumar(m, delta, dk);
    return m;
  }

  // Reduce las fuentes de proteína si la comida pasa de lo que le toca a la persona
  function limitarProteina(receta, maxG) {
    if (!(maxG > 0) || (receta.proteinas || 0) <= maxG) return receta;
    const esFuente = i => perfil(i.nombre)[0] >= 0.15 && !/^Sin /.test(i.nombre);
    const deFuentes = receta.ingredientes.filter(esFuente).reduce((s, i) => s + gr(i)[0], 0);
    if (deFuentes < 1) return receta;
    const f = Math.max(0.3, 1 - (receta.proteinas - maxG) / deFuentes);
    const m = { ...receta, _cambios: [...(receta._cambios || [])] };
    const delta = [0, 0, 0];
    let dk = 0;
    m.ingredientes = receta.ingredientes.map(ing => {
      if (!esFuente(ing)) return ing;
      const n = { ...ing, cantidad: escalar(ing.cantidad, f), calorias: Math.round((ing.calorias || 0) * f) };
      const a = gr(ing), b = gr(n);
      [0, 1, 2].forEach(i => { delta[i] += b[i] - a[i]; });
      dk += n.calorias - (ing.calorias || 0);
      return n;
    });
    m._cambios.push("Porción de proteína ajustada a lo que necesitas al día");
    sumar(m, delta, dk);
    return m;
  }

  return { calcular, macros, validar, objetivoSeguro, rangoProteinaKg, pesoReferencia, adaptar, limitarProteina, esApta, escalar, RAZON, REGLAS };
})();
if (typeof module !== "undefined") module.exports = Nutricion;
