// ══════════════════════════════════════════════════════
// EJERCICIO & BIENESTAR — ViveSano
// Plan semanal personalizado: circuitos, calistenia,
// yoga, meditación guiada y descanso activo.
// ══════════════════════════════════════════════════════

const DIAS_CORTO   = ["L","M","X","J","V","S","D"];
const DIAS_LARGO   = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// ─── BASE DE SESIONES ─────────────────────────────────
const SESIONES = {

  // ── CIRCUITOS ────────────────────────────────────────
  circ_fuerza: {
    nombre:"Circuito de Fuerza", tipo:"circuito", emoji:"💪", color:"#c62828",
    duracion:30, dificultad:"Moderado",
    descripcion:"Trabaja todo el cuerpo combinando fuerza y resistencia muscular.",
    pasos:[
      { n:"Calentamiento", tipo:"calentamiento", d:120,
        i:"2 min de marcha en sitio elevando rodillas. Agrega rotaciones de brazos, caderas y tobillos." },
      { n:"Sentadillas", tipo:"fuerza", s:3, r:"15 reps", ds:45,
        i:"Pies al ancho de hombros, baja como si te fueras a sentar. Rodillas alineadas con los pies, espalda recta. Talones en el piso.\n💡 Modificación: Sentadilla parcial si hay molestia en rodillas." },
      { n:"Flexiones de brazos", tipo:"fuerza", s:3, r:"10–12 reps", ds:45,
        i:"Manos al ancho de hombros, cuerpo en línea recta. Baja hasta casi tocar el piso, empuja hacia arriba.\n💡 Modificación: Flexiones en rodillas." },
      { n:"Zancadas alternadas", tipo:"fuerza", s:3, r:"12 por pierna", ds:45,
        i:"Da un gran paso adelante. La rodilla delantera a 90°, la trasera casi toca el piso. Empuja con el talón para volver." },
      { n:"Plancha frontal", tipo:"core", s:3, r:"35–45 seg", ds:30,
        i:"Apoya antebrazos y puntas de los pies. Cuerpo recto como tabla, abdomen activo. No dejes caer la cadera.\n💡 Modificación: Plancha en rodillas." },
      { n:"Puente de glúteos", tipo:"glúteos", s:3, r:"20 reps", ds:30,
        i:"Acostado boca arriba, pies planos, rodillas dobladas. Sube las caderas contrayendo glúteos al máximo. Aguanta 1 seg arriba." },
      { n:"Abdominales crunches", tipo:"core", s:3, r:"20 reps", ds:30,
        i:"Solo despega los hombros del piso, no el lumbar. Mirada al techo, manos en las sienes sin jalar el cuello." },
      { n:"Enfriamiento", tipo:"enfriamiento", d:180,
        i:"3 min de estiramientos: cuádriceps (pie al glúteo), isquiotibiales (pie estirado), hombros (brazo al pecho) y espalda (rodillas al pecho)." },
    ]
  },

  circ_cardio: {
    nombre:"Circuito Cardio HIIT", tipo:"circuito", emoji:"🔥", color:"#c62828",
    duracion:25, dificultad:"Intenso",
    descripcion:"Quema calorías con intervalos de alta intensidad. Sube la frecuencia cardíaca rápido.",
    pasos:[
      { n:"Calentamiento", tipo:"calentamiento", d:120,
        i:"2 min de marcha en sitio aumentando progresivamente la velocidad. Mueve los brazos con energía." },
      { n:"Saltos de tijera", tipo:"cardio", s:3, r:"30 seg / 15 seg descanso", ds:15,
        i:"Pies juntos → salta abriendo pies y brazos simultáneamente → vuelve. Ritmo continuo." },
      { n:"Mountain climbers", tipo:"cardio", s:3, r:"30 seg / 15 seg descanso", ds:15,
        i:"En posición de plancha alta, lleva rodillas alternadas al pecho lo más rápido que puedas. Mantén las caderas abajo." },
      { n:"Burpees", tipo:"cardio", s:3, r:"30 seg / 15 seg descanso", ds:15,
        i:"Plancha → salta los pies al pecho → salta arriba con brazos al cielo.\n💡 Modificación: Omite el salto, solo lleva pies al pecho y párate." },
      { n:"High knees", tipo:"cardio", s:3, r:"30 seg / 15 seg descanso", ds:15,
        i:"Corre en el mismo sitio elevando las rodillas al nivel de la cadera. Brazos activos, codo a 90°." },
      { n:"Sentadillas con salto", tipo:"cardio", s:3, r:"30 seg / 15 seg descanso", ds:15,
        i:"Baja en sentadilla profunda, sube con un salto explosivo. Aterriza suavemente con rodillas semiflexionadas.\n💡 Modificación: Sentadilla rápida sin salto." },
      { n:"Enfriamiento", tipo:"enfriamiento", d:180,
        i:"3 min de marcha suave + estiramientos: piernas, espalda y hombros. Baja la frecuencia cardíaca gradualmente." },
    ]
  },

  circ_core: {
    nombre:"Circuito Core y Estabilidad", tipo:"circuito", emoji:"⚡", color:"#c62828",
    duracion:25, dificultad:"Moderado",
    descripcion:"Fortalece el núcleo del cuerpo. Mejora la postura, el equilibrio y previene lesiones.",
    pasos:[
      { n:"Calentamiento", tipo:"calentamiento", d:120,
        i:"2 min de rotaciones suaves: columna vertebral, pelvis y caderas. Respira profundo en cada rotación." },
      { n:"Plancha frontal", tipo:"core", s:3, r:"40 seg", ds:20,
        i:"Antebrazos en el suelo. Cuerpo perfectamente horizontal. Mira al piso, no adelante. Activa abdomen y glúteos." },
      { n:"Plancha lateral derecha", tipo:"core", s:3, r:"30 seg", ds:15,
        i:"Apoya el antebrazo derecho y el borde externo del pie derecho. Caderas arriba, cuerpo en línea recta. Izquierda libre o en la cadera." },
      { n:"Plancha lateral izquierda", tipo:"core", s:3, r:"30 seg", ds:15,
        i:"Igual que el otro lado. Respira con calma, no aguantes la respiración." },
      { n:"Bicicleta abdominal", tipo:"core", s:3, r:"20 por lado", ds:20,
        i:"Acostado, codo derecho → rodilla izquierda al mismo tiempo. Lento y controlado. La espalda baja NO se despega del piso." },
      { n:"Superman", tipo:"espalda", s:3, r:"15 reps", ds:20,
        i:"Boca abajo, brazos extendidos. Levanta simultáneamente brazos y piernas. Aguanta 2 seg en la cima. Siente el trabajo en la zona lumbar." },
      { n:"Bird dog", tipo:"core", s:3, r:"12 por lado", ds:20,
        i:"En cuatro puntos, extiende el brazo derecho y la pierna izquierda al mismo tiempo. Espalda plana. Luego cambia de lado." },
      { n:"Enfriamiento", tipo:"enfriamiento", d:180,
        i:"3 min: Postura del niño (balasana) → torsión de columna acostado D/I → gato-vaca suave." },
    ]
  },

  // ── CALISTENIA ────────────────────────────────────────
  cali_superior: {
    nombre:"Calistenia: Tren Superior", tipo:"calistenia", emoji:"🏋️", color:"#1565c0",
    duracion:35, dificultad:"Moderado–Intenso",
    descripcion:"Fuerza de brazos, pecho, hombros y espalda usando solo el peso corporal.",
    pasos:[
      { n:"Calentamiento", tipo:"calentamiento", d:180,
        i:"3 min: rotaciones de hombros hacia adelante y atrás, rotaciones de muñecas, entrelaza los dedos y estira los brazos hacia arriba." },
      { n:"Flexiones estándar", tipo:"fuerza", s:4, r:"8–12 reps", ds:60,
        i:"Manos al ancho de hombros. Baja en 3 segundos, sube en 1. Cuerpo completamente recto — no hundas la cadera.\n💡 Modificación: Flexiones en rodillas con plena extensión de brazos." },
      { n:"Flexiones diamante", tipo:"fuerza", s:3, r:"6–10 reps", ds:60,
        i:"Manos juntas formando un diamante bajo el pecho. Trabajan principalmente los tríceps. Codos hacia atrás, no hacia los lados." },
      { n:"Pike push-ups", tipo:"fuerza", s:3, r:"8–10 reps", ds:60,
        i:"Caderas muy arriba (como una V invertida). Dobla los codos para bajar la cabeza entre las manos. Trabajan los hombros." },
      { n:"Dips en silla", tipo:"fuerza", s:3, r:"10–15 reps", ds:45,
        i:"Manos en el borde de una silla resistente, pies extendidos. Dobla los codos hasta llegar a 90° y vuelve. Trabajan tríceps." },
      { n:"Remo bajo mesa", tipo:"fuerza", s:3, r:"10 reps", ds:60,
        i:"Acuéstate bajo una mesa resistente. Agárrate del borde y tira del pecho hacia la superficie. Trabaja la espalda (dorsal y romboides)." },
      { n:"Enfriamiento", tipo:"enfriamiento", d:240,
        i:"4 min: Estiramiento de pecho (brazos abiertos en pared) → hombros (brazo cruzado al pecho) → tríceps (codo arriba) → espalda (abrazarte y redondear)." },
    ]
  },

  cali_inferior: {
    nombre:"Calistenia: Tren Inferior", tipo:"calistenia", emoji:"🦵", color:"#1565c0",
    duracion:35, dificultad:"Moderado",
    descripcion:"Piernas y glúteos fuertes. Las piernas son el motor del cuerpo — trabájalas bien.",
    pasos:[
      { n:"Calentamiento", tipo:"calentamiento", d:180,
        i:"3 min: Rotaciones de rodillas (manos en rodillas, círculos), rotaciones de cadera, elevaciones de talones, marcha en sitio." },
      { n:"Sentadilla profunda", tipo:"fuerza", s:4, r:"15 reps", ds:45,
        i:"Pies al ancho de hombros, puntas ligeramente hacia afuera. Baja hasta que los muslos queden paralelos al piso. Talones SIEMPRE en el suelo." },
      { n:"Zancada estática D/I", tipo:"fuerza", s:3, r:"12 por pierna", ds:45,
        i:"Pie delantero fijo, rodilla a 90°. La rodilla trasera baja casi hasta tocar el piso. Mantén el torso erguido. 12 reps de cada pierna." },
      { n:"Sentadilla sumo", tipo:"fuerza", s:3, r:"15 reps", ds:45,
        i:"Pies muy separados, puntas hacia afuera. Baja y siente el trabajo en el aductor (interior del muslo) y glúteos. Rodillas hacia afuera." },
      { n:"Hip thrust en el suelo", tipo:"glúteos", s:4, r:"20 reps", ds:30,
        i:"Espalda en el piso, pies planos. Empuja las caderas tan arriba como puedas contrayendo glúteos al máximo. 1 seg de pausa arriba." },
      { n:"Elevaciones de talón", tipo:"pantorrillas", s:3, r:"25 reps", ds:20,
        i:"De pie, pies paralelos. Sube en 1 seg, baja en 2 seg. Para mayor dificultad: hazlo en un escalón con el talón por debajo." },
      { n:"Sentadilla pistol asistida", tipo:"fuerza", s:2, r:"5 por pierna", ds:60,
        i:"Una pierna, apóyate en la pared o en una silla con un dedo. Baja lentamente en una sola pierna.\n💡 Si no puedes: Sentadilla normal hasta dominar el movimiento." },
      { n:"Enfriamiento", tipo:"enfriamiento", d:240,
        i:"4 min: Cuádriceps de pie (pie al glúteo) → isquiotibiales sentado → paloma en el suelo D/I → estiramiento de cadera." },
    ]
  },

  // ── YOGA ─────────────────────────────────────────────
  yoga_basico: {
    nombre:"Yoga Básico", tipo:"yoga", emoji:"🧘", color:"#6a1b9a",
    duracion:30, dificultad:"Suave",
    descripcion:"Posturas esenciales y respiración consciente. Perfecto para comenzar o para un día de recuperación.",
    pasos:[
      { n:"Respiración de llegada", tipo:"respiracion", d:120,
        i:"Siéntate cómodamente. 10 respiraciones profundas. Inhala por la nariz en 4 tiempos, exhala por la boca en 6 tiempos. Cierra los ojos." },
      { n:"Saludo al sol × 2", tipo:"flujo", d:240,
        i:"Montaña (de pie) → Brazos arriba → Flexión hacia adelante → Postura a media altura → Tabla → Perro boca abajo → Cobra → Perro boca abajo → repite al otro lado. Fluye con la respiración." },
      { n:"Guerrero I (D + I)", tipo:"postura", d:60,
        i:"Pie derecho adelante, rodilla doblada a 90°. Pie trasero en ángulo de 45°. Brazos arriba, mirada al frente. 5 respiraciones → repite con pie izquierdo." },
      { n:"Guerrero II (D + I)", tipo:"postura", d:60,
        i:"Pies muy separados. Brazo delantero mirando adelante, brazo trasero mirando atrás. Mira sobre la mano delantera. Hombros bajos. 5 respiraciones c/lado." },
      { n:"Perro boca abajo", tipo:"postura", d:60,
        i:"Caderas hacia arriba y atrás. Brazos y piernas estirados, forma una V invertida. Empuja el suelo con las manos. Alterna talones hacia el piso." },
      { n:"Postura del niño (Balasana)", tipo:"descanso", d:60,
        i:"Siéntate sobre los talones. Abre levemente las rodillas, lleva el torso hacia adelante. Brazos extendidos o al lado del cuerpo. Frente en el piso. Respira hacia la espalda." },
      { n:"Torsión sentada (D + I)", tipo:"postura", d:60,
        i:"Sentado con piernas extendidas. Cruza la pierna derecha. Coloca el codo izquierdo en la rodilla derecha y gira el torso. 5 respiraciones → repite al otro lado." },
      { n:"Savasana", tipo:"relajacion", d:300,
        i:"Acostado boca arriba. Piernas y brazos ligeramente separados. Palmas hacia arriba. Cierra los ojos y suelta completamente cada parte del cuerpo. 5 minutos de relajación total." },
    ]
  },

  yoga_espalda: {
    nombre:"Yoga para la Espalda", tipo:"yoga", emoji:"🌿", color:"#6a1b9a",
    duracion:30, dificultad:"Suave",
    descripcion:"Alivia la tensión lumbar y cervical. Ideal para quienes pasan muchas horas sentados.",
    pasos:[
      { n:"Respiración de apertura", tipo:"respiracion", d:90,
        i:"Acostado. 8 respiraciones expandiendo el pecho hacia los lados y la parte trasera de las costillas. Siente cómo se abre la caja torácica." },
      { n:"Gato-Vaca (Cat-Cow)", tipo:"flujo", d:120,
        i:"En cuatro puntos. Inhala: arquea la espalda hacia abajo (vaca, cabeza y cóccix arriba). Exhala: redondea la espalda hacia arriba (gato, cabeza abajo). 10 repeticiones lentas." },
      { n:"Cobra (Bhujangasana)", tipo:"postura", d:60,
        i:"Boca abajo, manos bajo los hombros. Sube el torso con los codos ligeramente doblados (no los bloquees). Hombros alejados de las orejas. 3 repeticiones de 10 seg." },
      { n:"Perro boca abajo", tipo:"postura", d:60,
        i:"Caderas arriba, piernas y brazos estirados. Lleva los talones hacia el piso. Cabeza entre los brazos, cuello relajado. 8 respiraciones." },
      { n:"Paloma (D + I)", tipo:"postura", d:180,
        i:"Rodilla derecha adelante en ángulo, pierna izquierda extendida atrás. Inclina el torso hacia adelante. Siente el estiramiento en la cadera. 5 respiraciones → cambia." },
      { n:"Torsión supina (D + I)", tipo:"postura", d:120,
        i:"Acostado. Lleva la rodilla derecha al piso del lado izquierdo, brazo derecho extendido. Mira hacia la derecha. 5 respiraciones → cambia." },
      { n:"Piernas en pared", tipo:"postura", d:120,
        i:"Acostado cerca de una pared. Levanta las piernas rectas apoyándolas en la pared. Cierra los ojos. Siente cómo el flujo sanguíneo regresa de las piernas. 2 min." },
      { n:"Savasana", tipo:"relajacion", d:240,
        i:"4 minutos de relajación total. Siente la espalda pesada contra el suelo, completamente apoyada. Suelta toda la musculatura paraespinal." },
    ]
  },

  yoga_restaurativo: {
    nombre:"Yoga Restaurativo", tipo:"yoga", emoji:"🌙", color:"#6a1b9a",
    duracion:40, dificultad:"Muy suave",
    descripcion:"Posturas largas y pasivas con apoyos (almohadas, cobijas). Profundo descanso activo.",
    pasos:[
      { n:"Mariposa reclinada", tipo:"postura", d:300,
        i:"Acostado. Une las plantas de los pies, rodillas abiertas hacia los lados. Coloca almohadas bajo las rodillas si las sientes suspendidas. Cierra los ojos. 5 minutos." },
      { n:"Torsión restaurativa derecha", tipo:"postura", d:180,
        i:"Lleva las rodillas al lado derecho (usa una almohada entre las rodillas si lo deseas). Brazo izquierdo extendido. Ojos cerrados. 3 minutos de respiración profunda." },
      { n:"Torsión restaurativa izquierda", tipo:"postura", d:180,
        i:"Lo mismo al otro lado. Tu columna agradecerá esta torsión suave que libera la tensión acumulada." },
      { n:"Piernas en pared", tipo:"postura", d:300,
        i:"Siéntate contra la pared y levanta las piernas. Cierra los ojos. Siente cómo se drena la fatiga de las piernas y regresa al corazón. 5 minutos." },
      { n:"Postura del niño amplia", tipo:"postura", d:180,
        i:"Rodillas muy separadas, torso hacia adelante. Brazos extendidos o apoyados en una almohada bajo la cabeza. 3 minutos de respiración consciente." },
      { n:"Savasana extendido", tipo:"relajacion", d:300,
        i:"5 minutos. Si quieres: almohada bajo las rodillas. Cubre los ojos con una tela suave. Suelta cada músculo con la exhalación. Permítete estar aquí por completo." },
    ]
  },

  yoga_prenatal: {
    nombre:"Yoga Prenatal", tipo:"yoga", emoji:"🤱", color:"#6a1b9a",
    duracion:30, dificultad:"Muy suave",
    descripcion:"Secuencia segura para el embarazo. Alivia molestias, abre la pelvis y conecta con el bebé.",
    pasos:[
      { n:"Respiración consciente", tipo:"respiracion", d:180,
        i:"Siéntate cómodamente (sobre almohadas si necesitas). Una mano en el corazón, otra en el vientre. Inhala en 4 tiempos, exhala en 6 tiempos. 10 ciclos. Esta respiración calma a mamá y al bebé." },
      { n:"Gato-Vaca prenatal", tipo:"flujo", d:120,
        i:"En cuatro puntos con muñecas bien apoyadas. Movimiento MUY suave. Inhala: pequeño arco hacia abajo. Exhala: redondea suavemente. Alivia el dolor de espalda del embarazo. 10 repeticiones." },
      { n:"Guerrero II (modificado)", tipo:"postura", d:90,
        i:"Pies separados, brazos extendidos. Dobla MUY ligeramente la rodilla delantera. No profundices como en yoga regular. 3 respiraciones c/lado. Fortalece piernas y abre caderas." },
      { n:"Mariposa sentada", tipo:"postura", d:180,
        i:"Sentada, plantas de los pies juntas, rodillas abiertas. Inclínate suavemente hacia adelante sin comprimir el vientre. Ayuda a preparar la pelvis. 3 minutos." },
      { n:"Estiramiento lateral sentada", tipo:"postura", d:120,
        i:"Sentada, piernas abiertas. Inclina el torso a cada lado levantando un brazo sobre la cabeza. Abre los costados donde hay más compresión. 5 respiraciones c/lado." },
      { n:"Savasana lateral", tipo:"relajacion", d:180,
        i:"Acostada sobre el lado izquierdo (mejor para la circulación). Almohada entre las rodillas. Mano en el vientre. Envía amor a tu bebé con cada exhalación." },
      { n:"Conexión con el bebé", tipo:"meditacion", d:120,
        i:"Coloca ambas manos en el vientre. Visualiza a tu bebé sano, cómodo y rodeado de luz. Dile mentalmente: 'Estoy aquí, todo está bien, te amo.' 2 minutos." },
    ]
  },

  // ── MEDITACIONES GUIADAS ──────────────────────────────
  med_respiracion: {
    nombre:"Respiración 4-7-8", tipo:"meditacion", emoji:"🌬️", color:"#2e7d32",
    duracion:10, dificultad:"Suave",
    descripcion:"Técnica de respiración que activa el sistema nervioso parasimpático. Reduce el estrés y mejora el sueño.",
    pasos:[
      { titulo:"Preparación", tipo:"instruccion", duracion:60,
        texto:"Siéntate cómodamente con la espalda recta o acuéstate boca arriba.\n\nSuelta la tensión de los hombros... de la mandíbula... de las manos.\n\nCierra los ojos suavemente." },
      { titulo:"Observa tu respiración", tipo:"observacion", duracion:45,
        texto:"Por un momento, solo observa tu respiración natural.\n\nSin cambiar nada. Sin forzar. Solo nota el aire entrando y saliendo." },
      { titulo:"La técnica 4-7-8", tipo:"instruccion", duracion:60,
        texto:"Esta técnica tiene tres fases:\n\n🌬️ INHALA por la nariz contando 4\n⏸ RETÉN el aire contando 7\n💨 EXHALA por la boca contando 8\n\nCada ciclo dura 19 segundos." },
      { titulo:"Respiración — Ronda 1", tipo:"respiracion", duracion:30,
        texto:"Inhala... 1... 2... 3... 4...\n\nRetén... 1... 2... 3... 4... 5... 6... 7...\n\nExhala lentamente... 1... 2... 3... 4... 5... 6... 7... 8..." },
      { titulo:"Respiración — Ronda 2", tipo:"respiracion", duracion:30,
        texto:"Siente cómo el cuerpo se calma.\n\nInhala... 1... 2... 3... 4...\nRetén... 1... 2... 3... 4... 5... 6... 7...\nExhala... 1... 2... 3... 4... 5... 6... 7... 8..." },
      { titulo:"Respiración — Ronda 3", tipo:"respiracion", duracion:30,
        texto:"Cada exhalación libera tensión acumulada.\n\nInhala... 1... 2... 3... 4...\nRetén... 1... 2... 3... 4... 5... 6... 7...\nExhala... 1... 2... 3... 4... 5... 6... 7... 8..." },
      { titulo:"Respiración — Ronda 4", tipo:"respiracion", duracion:30,
        texto:"Tu mente se aquieta. La respiración es tu ancla al presente.\n\nInhala... 1... 2... 3... 4...\nRetén... 1... 2... 3... 4... 5... 6... 7...\nExhala... 1... 2... 3... 4... 5... 6... 7... 8..." },
      { titulo:"Práctica libre", tipo:"libre", duracion:195,
        texto:"Continúa a tu propio ritmo durante los próximos 3 minutos.\n\nNo hay forma incorrecta.\n\nSolo respira." },
      { titulo:"Cierre", tipo:"cierre", duracion:40,
        texto:"Suavemente vuelve al entorno.\n\nMueve los dedos de manos y pies.\n\nAbre los ojos lentamente.\n\nLlevas esta calma contigo." },
    ]
  },

  med_corporal: {
    nombre:"Escaneo Corporal", tipo:"meditacion", emoji:"🧠", color:"#2e7d32",
    duracion:15, dificultad:"Suave",
    descripcion:"Recorre mentalmente cada parte del cuerpo para liberar tensión y reconectar con las sensaciones físicas.",
    pasos:[
      { titulo:"Posición inicial", tipo:"instruccion", duracion:60,
        texto:"Acuéstate boca arriba. Piernas ligeramente separadas, brazos junto al cuerpo con las palmas hacia arriba.\n\nCierra los ojos. Tómate un momento para llegar aquí." },
      { titulo:"Respiración de llegada", tipo:"respiracion", duracion:45,
        texto:"Tres respiraciones profundas para soltar el día.\n\nInhala profundamente...\nExhala despacio.\n\nInhala...\nExhala.\n\nUna vez más..." },
      { titulo:"Pies y tobillos", tipo:"escaneo", duracion:60,
        texto:"Lleva tu atención a los pies. Siente los dedos del pie... la planta... el talón.\n\nSin juzgar. Solo observa. Si hay tensión, invita a esa zona a soltarse con la exhalación." },
      { titulo:"Piernas", tipo:"escaneo", duracion:60,
        texto:"Sube la atención a las pantorrillas... las rodillas... los muslos.\n\nSi sientes algún punto tenso, respira directamente hacia él. Imagina que el aire llega a esa zona." },
      { titulo:"Caderas y abdomen", tipo:"escaneo", duracion:60,
        texto:"Caderas y pelvis: permite que se hundan en el suelo.\n\nAhora el abdomen: ¿está tenso? Con cada exhalación, invítalo a suavizarse." },
      { titulo:"Espalda y pecho", tipo:"escaneo", duracion:60,
        texto:"Siente el contacto de tu espalda con el suelo. El pecho expandiéndose con cada inhalación.\n\nLos hombros: ¿están tensos? Invítalos a bajar, a alejarse de las orejas." },
      { titulo:"Brazos y manos", tipo:"escaneo", duracion:45,
        texto:"Baja la atención por los brazos hasta las manos. Los dedos.\n\n¿Están apretados? Suéltalos. Las manos abiertas y pesadas, cayendo hacia el suelo." },
      { titulo:"Cuello y cabeza", tipo:"escaneo", duracion:60,
        texto:"El cuello soltándose. La mandíbula — uno de los lugares donde más guardamos tensión — separa levemente los dientes.\n\nEl cuero cabelludo relajándose. Los párpados pesados." },
      { titulo:"Cuerpo completo", tipo:"escaneo", duracion:90,
        texto:"Observa tu cuerpo completo. Siente su peso.\n\nEl suelo te sostiene completamente. No necesitas hacer nada.\n\nSolo estar aquí." },
      { titulo:"Descanso profundo", tipo:"libre", duracion:180,
        texto:"Permanece en este estado de quietud.\n\nSi la mente se va a pensamientos, está bien. Vuelve suavemente a las sensaciones del cuerpo.\n\nSolo estar..." },
      { titulo:"Regreso", tipo:"cierre", duracion:45,
        texto:"Comienza a mover los dedos...\nMueve las manos y los pies...\nEstira los brazos sobre la cabeza...\nBosteza si quieres.\n\nAbre los ojos lentamente. Bienvenido/a de vuelta." },
    ]
  },

  med_visualizacion: {
    nombre:"Visualización Guiada", tipo:"meditacion", emoji:"✨", color:"#2e7d32",
    duracion:15, dificultad:"Suave",
    descripcion:"Usa el poder de la mente para programar metas y reducir el estrés. La mente no distingue entre lo real y lo vividamente imaginado.",
    pasos:[
      { titulo:"Acomódate", tipo:"instruccion", duracion:45,
        texto:"Cierra los ojos. Tres respiraciones profundas.\n\nEl mundo exterior se aleja por unos momentos.\n\nEstás completamente seguro/a aquí." },
      { titulo:"Tu lugar seguro", tipo:"visualizacion", duracion:120,
        texto:"Imagina un lugar donde te sientes completamente en paz.\n\nPuede ser real o imaginado: una playa, un bosque, las montañas, un jardín.\n\nVisualiza los colores... los sonidos... la temperatura del aire." },
      { titulo:"Explora ese lugar", tipo:"visualizacion", duracion:120,
        texto:"Camina por ese lugar.\n\n¿Qué ves? ¿Qué escuchas? ¿Hay algún aroma?\n\n¿Cómo se siente el suelo bajo tus pies?\n\nMientras más detalles añadas, más real se vuelve." },
      { titulo:"Tu versión más saludable", tipo:"visualizacion", duracion:120,
        texto:"En ese lugar, visualízate en tu versión más saludable.\n\nCon energía. Con vitalidad. Con paz interior.\n\nEsa versión ya existe dentro de ti. Solo estás recordándola." },
      { titulo:"Siente la transformación", tipo:"visualizacion", duracion:120,
        texto:"Imagina cómo se siente estar en ese cuerpo saludable.\n\nMovimientos fluidos. Energía al despertar. La satisfacción después de una comida nutritiva.\n\nSiente eso ahora, en este momento." },
      { titulo:"Gratitud por tu cuerpo", tipo:"gratitud", duracion:90,
        texto:"Siente gratitud por tu cuerpo tal como está hoy.\n\nEstá haciendo un esfuerzo increíble. Cada célula trabaja para mantenerte vivo/a.\n\nDi mentalmente: 'Gracias, cuerpo.'" },
      { titulo:"Tu intención de hoy", tipo:"intencion", duracion:60,
        texto:"Una frase simple para el resto del día:\n\n'Hoy elijo bien.'\n'Me muevo con alegría.'\n'Cuido mi cuerpo con amor.'\n\nRepítela tres veces mentalmente." },
      { titulo:"Cierre", tipo:"cierre", duracion:45,
        texto:"Regresa suavemente. Siente tu cuerpo.\n\nMueve los dedos. Respira profundo.\n\nAbre los ojos.\n\nLlevas la energía de esta visualización contigo." },
    ]
  },

  med_mindfulness: {
    nombre:"Mindfulness: Momento Presente", tipo:"meditacion", emoji:"🌸", color:"#2e7d32",
    duracion:10, dificultad:"Suave",
    descripcion:"Entrena la atención plena: la capacidad de estar completamente en el presente, sin juzgar.",
    pasos:[
      { titulo:"Posición y llegada", tipo:"instruccion", duracion:45,
        texto:"Siéntate en una silla o en el suelo. Espalda recta pero no rígida.\n\nManos sobre las rodillas. Cierra los ojos o baja la mirada al suelo." },
      { titulo:"La respiración como ancla", tipo:"instruccion", duracion:60,
        texto:"Tu respiración siempre está en el presente.\n\nNo en ayer. No en mañana.\n\nLleva toda tu atención al momento exacto en que el aire entra... y al momento en que sale." },
      { titulo:"Observa sin cambiar", tipo:"observacion", duracion:60,
        texto:"No controles la respiración. Solo obsérvala.\n\n¿Es larga o corta? ¿Superficial o profunda? ¿Cálida o fría al entrar?\n\nSolo nota." },
      { titulo:"Cuando la mente se va", tipo:"instruccion", duracion:75,
        texto:"La mente se distraerá con pensamientos, recuerdos, planes.\n\nEso es completamente normal. No es un error.\n\nCuando lo notes, di mentalmente 'pensamiento' y vuelve a la respiración. Sin juzgarte." },
      { titulo:"Práctica central", tipo:"libre", duracion:240,
        texto:"Permanece con la respiración.\n\nCada vez que la mente se vaya, vuelve.\n\nEse acto de volver ES la meditación.\n\nNo el estado de no pensar." },
      { titulo:"Sensaciones del cuerpo", tipo:"observacion", duracion:60,
        texto:"Expande la atención al cuerpo.\n\n¿Qué sensaciones hay ahora mismo?\n\nTemperatura. Contacto. Peso. Tensión. Ligereza.\n\nSin juzgarlas." },
      { titulo:"Los sonidos", tipo:"observacion", duracion:60,
        texto:"Abre la atención a los sonidos del entorno.\n\nCercanos y lejanos. Sin etiquetarlos.\n\nSolo sonidos que llegan y se van." },
      { titulo:"Gratitud y cierre", tipo:"cierre", duracion:45,
        texto:"Aprecia que te diste este tiempo.\n\nLa mente entrenada en la atención toma mejores decisiones y sufre menos.\n\nAbre los ojos suavemente." },
    ]
  },

  // ── DESCANSO ACTIVO ───────────────────────────────────
  descanso: {
    nombre:"Descanso Activo", tipo:"descanso", emoji:"🚶", color:"#455a64",
    duracion:20, dificultad:"Muy suave",
    descripcion:"El descanso es parte del entrenamiento. Hoy: caminata suave y estiramientos completos.",
    pasos:[
      { n:"Caminata consciente", tipo:"cardio", d:900,
        i:"15 min de caminata suave. En casa, en el barrio o en un parque. Presta atención a la postura: espalda erguida, pasos firmes, hombros relajados." },
      { n:"Estiramientos generales", tipo:"enfriamiento", d:300,
        i:"5 min: Cuello (oreja al hombro) → Hombros (brazo cruzado) → Triceps (codo arriba) → Espalda (rodillas al pecho) → Cuádriceps (pie al glúteo) → Isquiotibiales (pie estirado). 20–30 seg c/u." },
    ]
  },
};

// ─── PLANES SEMANALES (4 ROTACIONES) ──────────────────
// Cada plan tiene 4 semanas de rotación para que sea siempre diferente.
const PLANES = {
  cardio: [
    ["circ_cardio",    "yoga_basico",      "cali_inferior", "med_respiracion",  "circ_fuerza",     "yoga_restaurativo", "descanso"],
    ["cali_inferior",  "circ_cardio",      "med_corporal",  "circ_fuerza",      "yoga_espalda",    "circ_core",         "descanso"],
    ["circ_fuerza",    "med_visualizacion","circ_cardio",   "yoga_basico",      "cali_inferior",   "med_mindfulness",   "descanso"],
    ["yoga_basico",    "circ_cardio",      "cali_inferior", "circ_core",        "med_respiracion", "circ_fuerza",       "descanso"],
  ],
  fuerza: [
    ["cali_superior",  "cali_inferior",    "circ_core",     "med_respiracion",  "cali_superior",   "yoga_espalda",      "descanso"],
    ["cali_inferior",  "circ_fuerza",      "cali_superior", "med_corporal",     "cali_inferior",   "yoga_restaurativo", "descanso"],
    ["circ_fuerza",    "cali_superior",    "med_visualizacion","cali_inferior", "circ_core",       "yoga_basico",       "descanso"],
    ["cali_superior",  "med_mindfulness",  "cali_inferior", "circ_fuerza",      "cali_superior",   "yoga_espalda",      "descanso"],
  ],
  balanceado: [
    ["circ_fuerza",    "yoga_basico",      "cali_superior", "med_respiracion",  "cali_inferior",   "yoga_restaurativo", "descanso"],
    ["yoga_espalda",   "circ_cardio",      "med_corporal",  "cali_superior",    "circ_core",       "yoga_basico",       "descanso"],
    ["cali_inferior",  "med_visualizacion","circ_fuerza",   "yoga_restaurativo","cali_superior",   "med_mindfulness",   "descanso"],
    ["circ_core",      "yoga_basico",      "circ_cardio",   "med_respiracion",  "cali_inferior",   "yoga_espalda",      "descanso"],
  ],
  prenatal: [
    ["yoga_prenatal",  "descanso",         "med_respiracion","yoga_prenatal",   "descanso",        "med_visualizacion", "descanso"],
    ["med_corporal",   "yoga_prenatal",    "descanso",      "med_mindfulness",  "yoga_prenatal",   "descanso",          "med_respiracion"],
    ["yoga_prenatal",  "med_respiracion",  "descanso",      "yoga_prenatal",    "med_corporal",    "descanso",          "med_visualizacion"],
    ["descanso",       "yoga_prenatal",    "med_mindfulness","descanso",        "yoga_prenatal",   "med_respiracion",   "descanso"],
  ],
  // Plan seguro para condiciones cardíacas e hipertensión:
  // SIN HIIT (circ_cardio), SIN saltos, intensidad baja-moderada.
  cardiaco: [
    ["yoga_basico",    "cali_inferior",    "med_respiracion","yoga_espalda",    "cali_superior",   "yoga_restaurativo", "descanso"],
    ["cali_inferior",  "yoga_basico",      "med_corporal",   "cali_superior",   "yoga_espalda",    "med_mindfulness",   "descanso"],
    ["yoga_espalda",   "cali_superior",    "med_visualizacion","yoga_basico",   "cali_inferior",   "yoga_restaurativo", "descanso"],
    ["cali_superior",  "med_respiracion",  "yoga_basico",    "cali_inferior",   "med_mindfulness", "yoga_espalda",      "descanso"],
  ],
};

// ─── FOTOS POR TIPO Y NOMBRE (Unsplash, sin API key) ──
const FOTOS_EJ = {
  calentamiento: "VHXFbNTbdFo",
  enfriamiento:  "VHXFbNTbdFo",
  fuerza:        "Lx_GDv7VA9M",
  cardio:        "0v0LVwRVfYg",
  core:          "hGSfJsBEWwc",
  glúteos:       "LJ36url5Y8c",
  espalda:       "pFG4MGQRQXI",
  pantorrillas:  "LJ36url5Y8c",
  postura:       "WFYkgMJ0JIA",
  flujo:         "WFYkgMJ0JIA",
  relajacion:    "IHtVbLRjTZU",
  respiracion:   "IHtVbLRjTZU",
  observacion:   "IHtVbLRjTZU",
  intencion:     "IHtVbLRjTZU",
  gratitud:      "IHtVbLRjTZU",
  libre:         "IHtVbLRjTZU",
  instruccion:   "IHtVbLRjTZU",
  cierre:        "IHtVbLRjTZU",
  escaneo:       "IHtVbLRjTZU",
  visualizacion: "IHtVbLRjTZU",
  descanso:      "oo4AoizEDcc",
  meditacion:    "IHtVbLRjTZU",
};

const FOTOS_NOMBRE = {
  "Sentadillas":               "LJ36url5Y8c",
  "Sentadilla profunda":       "LJ36url5Y8c",
  "Sentadilla sumo":           "LJ36url5Y8c",
  "Sentadilla pistol asistida":"LJ36url5Y8c",
  "Sentadilla con salto":      "LJ36url5Y8c",
  "Zancadas alternadas":       "DT3bb-KDAus",
  "Zancada estática D/I":      "DT3bb-KDAus",
  "Flexiones de brazos":       "yLMCHViLZDA",
  "Flexiones estándar":        "yLMCHViLZDA",
  "Flexiones diamante":        "yLMCHViLZDA",
  "Pike push-ups":             "yLMCHViLZDA",
  "Plancha frontal":           "hGSfJsBEWwc",
  "Plancha lateral derecha":   "hGSfJsBEWwc",
  "Plancha lateral izquierda": "hGSfJsBEWwc",
  "Bird dog":                  "hGSfJsBEWwc",
  "Bicicleta abdominal":       "hGSfJsBEWwc",
  "Abdominales crunches":      "hGSfJsBEWwc",
  "Mountain climbers":         "hGSfJsBEWwc",
  "Burpees":                   "0v0LVwRVfYg",
  "Saltos de tijera":          "0v0LVwRVfYg",
  "High knees":                "0v0LVwRVfYg",
  "Puente de glúteos":         "LJ36url5Y8c",
  "Hip thrust en el suelo":    "LJ36url5Y8c",
  "Elevaciones de talón":      "LJ36url5Y8c",
  "Dips en silla":             "Lx_GDv7VA9M",
  "Remo bajo mesa":            "pFG4MGQRQXI",
  "Superman":                  "pFG4MGQRQXI",
  "Saludo al sol × 2":         "WFYkgMJ0JIA",
  "Guerrero I (D + I)":        "WFYkgMJ0JIA",
  "Guerrero II (D + I)":       "WFYkgMJ0JIA",
  "Perro boca abajo":          "WFYkgMJ0JIA",
  "Cobra (Bhujangasana)":      "WFYkgMJ0JIA",
  "Postura del niño (Balasana)":"WFYkgMJ0JIA",
  "Gato-Vaca (Cat-Cow)":       "WFYkgMJ0JIA",
  "Paloma (D + I)":            "WFYkgMJ0JIA",
  "Torsión sentada (D + I)":   "WFYkgMJ0JIA",
  "Torsión supina (D + I)":    "WFYkgMJ0JIA",
  "Piernas en pared":          "IHtVbLRjTZU",
  "Savasana":                  "IHtVbLRjTZU",
  "Savasana extendido":        "IHtVbLRjTZU",
  "Mariposa reclinada":        "WFYkgMJ0JIA",
  "Mariposa sentada":          "WFYkgMJ0JIA",
  "Caminata consciente":       "oo4AoizEDcc",
};

function fotoEjercicio(paso) {
  const nombre = paso.n || paso.titulo || paso.nombre || "";
  const tipo   = paso.tipo || "";
  const rawId  = FOTOS_NOMBRE[nombre] || FOTOS_EJ[tipo] || "IHtVbLRjTZU";
  // IDs con guiones son formato timestamp → photo-xxxx; sin guiones → directo
  const path   = rawId.includes("-") ? `photo-${rawId}` : rawId;
  return `https://images.unsplash.com/${path}?w=600&h=340&fit=crop&auto=format&q=75`;
}

// ─── ESTADO ────────────────────────────────────────────
let planSemana       = [];
let diaHoy           = 0;
let diaSeleccionado  = 0;
let sesionActiva     = null;
let pasoActivo       = 0;
let timerInterval    = null;
let tiempoRestante   = 0;
let timerCorriendo   = false;
let medData          = null;
let medPaso          = 0;
let medTimerInterval = null;
let medTiempo        = 0;
let medPausado       = false;

// ─── INIT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);

function init() {
  const u = JSON.parse(localStorage.getItem("datosUsuario") || "{}");

  const subtitulos = {
    bajar:     "Plan para bajar de peso · cambia cada semana",
    masa:      "Plan para ganar músculo · cambia cada semana",
    tonificar: "Plan para tonificar · cambia cada semana",
    mantener:  "Plan de mantenimiento · cambia cada semana",
  };
  const sub = document.getElementById("ej-subtitulo");
  if (sub) sub.textContent = u.condicion === "embarazo"
    ? "Plan prenatal seguro · cambia cada semana"
    : (subtitulos[u.objetivo] || "Plan personalizado · cambia cada semana");

  const semanaEl = document.getElementById("ej-semana-num");
  if (semanaEl) semanaEl.textContent = getWeekNumber();

  planSemana = getSesionSemana(u);
  diaHoy     = (new Date().getDay() + 6) % 7; // 0=Lunes
  diaSeleccionado = diaHoy;

  renderDias();
  renderHoy();
  renderResumenDia();
  cargarEquipo();
}

function getWeekNumber() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
}

function getPlanTipo(u) {
  if (u.condicion  === "embarazo")                             return "prenatal";
  // Condiciones que requieren plan sin HIIT ni saltos
  if (u.enfermedad === "cardiaca" || u.enfermedad === "hipertension") return "cardiaco";
  if (u.objetivo   === "bajar")                                return "cardio";
  if (u.objetivo   === "masa")                                 return "fuerza";
  return "balanceado";
}

function getSesionSemana(u) {
  const tipo    = getPlanTipo(u);
  const rotacion = getWeekNumber() % 4;
  return PLANES[tipo][rotacion];
}

// ─── RENDER SEMANA ─────────────────────────────────────
function renderDias() {
  const cont = document.getElementById("ej-dias");
  if (!cont) return;
  // Buscar días completados esta semana en localStorage
  const hoyDate = new Date();
  cont.innerHTML = DIAS_CORTO.map((d, i) => {
    const ses = SESIONES[planSemana[i]];
    // Calcular fecha de ese día (esta semana)
    const diff = i - diaHoy;
    const fechaDia = new Date(hoyDate);
    fechaDia.setDate(hoyDate.getDate() + diff);
    const llaveEj  = `vsHecho_${fechaDia.toDateString()}_ejercicio`;
    const llaveMed = `vsHecho_${fechaDia.toDateString()}_meditacion`;
    const completado = localStorage.getItem(llaveEj) === "1";

    const clases = ["ej-dia-pill",
      i === diaHoy          ? "hoy"          : "",
      i === diaSeleccionado ? "seleccionado"  : "",
      completado            ? "completado"    : "",
    ].filter(Boolean).join(" ");
    return `<div class="${clases}" onclick="verDia(${i})">
      <span class="ej-dia-pill-nombre">${d}</span>
      <span class="ej-dia-pill-emoji">${completado ? "✓" : (ses?.emoji || "🏃")}</span>
      <span class="ej-dia-pill-dur">${ses?.duracion || 30}m</span>
    </div>`;
  }).join("");
}

function renderHoy() {
  const sesId    = planSemana[diaHoy];
  const ses      = SESIONES[sesId];
  const cont     = document.getElementById("ej-hoy-inner");
  if (!ses || !cont) return;

  const tipoSes  = ses.tipo === "meditacion" ? "meditacion" : "ejercicio";
  const yaHecho  = estaHecho(tipoSes);

  cont.innerHTML = `
    <span class="ej-hoy-tipo tipo-${ses.tipo}">${ses.emoji} ${capitalize(ses.tipo)}</span>
    <h2 class="ej-hoy-nombre">${ses.nombre}</h2>
    <p class="ej-hoy-desc">${ses.descripcion}</p>
    <div class="ej-hoy-meta">
      <div class="ej-meta-item">
        <span class="ej-meta-val">${ses.duracion}</span>
        <span class="ej-meta-lbl">minutos</span>
      </div>
      <div class="ej-meta-item">
        <span class="ej-meta-val">${ses.dificultad}</span>
        <span class="ej-meta-lbl">Nivel</span>
      </div>
    </div>
    ${yaHecho
      ? `<div class="ej-hoy-completado">✅ ¡Completado hoy! Sigue así.</div>`
      : `<div class="ej-hoy-botones">
           <button class="ej-hoy-iniciar iniciar-${ses.tipo}"
                   onclick="iniciarSesion('${sesId}')">
             ${ses.tipo === "meditacion" ? "🧘 Iniciar meditación" : "▶ Iniciar sesión"}
           </button>
           <button class="ej-hoy-yalohice"
                   onclick="yaLoHice('${tipoSes}')">
             ✓ Ya lo hice hoy
           </button>
         </div>`
    }`;
}

function verDia(idx) {
  diaSeleccionado = idx;
  renderDias();

  const sesId = planSemana[idx];
  const ses   = SESIONES[sesId];
  const cont  = document.getElementById("ej-detalle");
  if (!ses || !cont) return;

  const pasos = ses.pasos || [];
  cont.style.display = "block";
  cont.innerHTML = `
    <span class="ej-hoy-tipo tipo-${ses.tipo}">${ses.emoji} ${DIAS_LARGO[idx]}</span>
    <h3 class="ej-detalle-titulo">${ses.nombre}</h3>
    <p class="ej-detalle-sub">${ses.descripcion}</p>
    <ul class="ej-ejercicio-lista">
      ${pasos.map((p, i) => {
        const nombre = p.n || p.titulo || p.nombre || "";
        const instruc = p.i || p.instruccion || p.texto || "";
        const reps = p.s ? `${p.s} series × ${p.r}` : p.d ? `⏱ ${fmtTiempo(p.d)}` : "";
        const fotoUrl = fotoEjercicio(p);
        return `<li class="ej-ejercicio-item">
          <div class="ej-ej-thumb-wrap">
            <img class="ej-ej-thumb" src="${fotoUrl}" alt="${nombre}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div class="ej-ej-thumb-fb" style="display:none">${EMOJIS_TIPO[p.tipo] || "💪"}</div>
          </div>
          <div class="ej-ej-info">
            <div class="ej-ej-nombre">${nombre}</div>
            <div class="ej-ej-instruccion">${instruc.split("\n")[0]}</div>
            ${reps ? `<div class="ej-ej-reps">${reps}</div>` : ""}
          </div>
        </li>`;
      }).join("")}
    </ul>
    <button class="ej-detalle-btn iniciar-${ses.tipo}"
            onclick="iniciarSesion('${sesId}')">
      ${ses.tipo === "meditacion" ? "🧘 Iniciar meditación guiada" : "▶ Iniciar sesión paso a paso"}
    </button>`;
  cont.scrollIntoView({ behavior:"smooth", block:"nearest" });
}

// ─── SESIÓN ACTIVA ─────────────────────────────────────
function iniciarSesion(sesId) {
  const ses = SESIONES[sesId];
  if (!ses) return;
  if (ses.tipo === "meditacion") { iniciarMeditacion(ses); return; }

  sesionActiva = ses;
  pasoActivo   = 0;
  document.getElementById("ej-overlay-sesion").style.display = "flex";
  renderPasoSesion();
}

const EMOJIS_TIPO = {
  calentamiento:"🔥", fuerza:"💪", cardio:"🏃", core:"⚡",
  glúteos:"🍑", espalda:"🌿", pantorrillas:"🦶", enfriamiento:"🧘‍♀️",
  postura:"🧘", flujo:"🌊", relajacion:"😴", descanso:"🛌",
  respiracion:"🌬️", meditacion:"✨",
};

function renderPasoSesion() {
  const pasos = sesionActiva?.pasos || [];
  const paso  = pasos[pasoActivo];
  if (!paso) return;

  const total = pasos.length;
  const pct   = Math.round(((pasoActivo + 1) / total) * 100);
  document.getElementById("ej-barra-progreso").style.width = pct + "%";
  document.getElementById("ej-paso-label").textContent = `${pasoActivo + 1} / ${total}`;

  // Imagen del ejercicio
  const imgEl   = document.getElementById("ej-paso-img");
  const emojiEl = document.getElementById("ej-paso-emoji");
  const ejFb    = document.getElementById("ej-paso-emoji-fb");
  const badge   = document.getElementById("ej-paso-tipo-badge");
  if (imgEl && emojiEl && ejFb) {
    const emoji = EMOJIS_TIPO[paso.tipo] || sesionActiva.emoji;
    emojiEl.textContent = emoji;
    imgEl.style.display = "block";
    ejFb.style.display  = "none";
    imgEl.src = fotoEjercicio(paso);
    imgEl.alt = paso.n || paso.titulo || paso.nombre || "";
  }
  if (badge) {
    const LABELS = { calentamiento:"Calentamiento", enfriamiento:"Enfriamiento", fuerza:"Fuerza",
      cardio:"Cardio", core:"Core", glúteos:"Glúteos", espalda:"Espalda",
      pantorrillas:"Pantorrillas", postura:"Postura", flujo:"Flujo", relajacion:"Relajación",
      respiracion:"Respiración", descanso:"Descanso", meditacion:"Meditación",
      instruccion:"Instrucción", observacion:"Observación", escaneo:"Escaneo",
      libre:"Práctica libre", visualizacion:"Visualización", gratitud:"Gratitud",
      intencion:"Intención", cierre:"Cierre" };
    badge.textContent = LABELS[paso.tipo] || capitalize(paso.tipo || "");
    badge.className   = `ej-paso-tipo-badge badge-${paso.tipo || "fuerza"}`;
  }

  document.getElementById("ej-paso-nombre").textContent    = paso.n || paso.nombre || "";
  document.getElementById("ej-paso-instruccion").textContent = paso.i || paso.instruccion || "";

  const detEl = document.getElementById("ej-paso-detalle");
  detEl.innerHTML = paso.s ? `
    <div class="ej-paso-det-item"><span class="ej-paso-det-val">${paso.s}</span><span class="ej-paso-det-lbl">Series</span></div>
    <div class="ej-paso-det-item"><span class="ej-paso-det-val">${paso.r}</span><span class="ej-paso-det-lbl">Reps / Tiempo</span></div>
    <div class="ej-paso-det-item"><span class="ej-paso-det-val">${paso.ds}s</span><span class="ej-paso-det-lbl">Descanso</span></div>
  ` : "";

  const timerEl = document.getElementById("ej-timer-display");
  const btnTimer = document.getElementById("ej-btn-timer");
  clearInterval(timerInterval);
  timerCorriendo = false;

  if (paso.d) {
    timerEl.style.display = "block";
    tiempoRestante = paso.d;
    timerEl.textContent = fmtTimer(tiempoRestante);
    btnTimer.textContent = "▶ Iniciar";
  } else {
    timerEl.style.display = "none";
    btnTimer.textContent = "✓ Siguiente";
  }

  const btnAnt = document.getElementById("ej-btn-anterior");
  btnAnt.disabled    = pasoActivo === 0;
  btnAnt.style.opacity = pasoActivo === 0 ? "0.3" : "1";
}

function irPaso(delta) {
  clearInterval(timerInterval);
  timerCorriendo = false;
  const total = (sesionActiva?.pasos || []).length;
  pasoActivo += delta;
  if (pasoActivo >= total) { cerrarSesion(); return; }
  pasoActivo = Math.max(0, pasoActivo);
  renderPasoSesion();
}

function toggleTimer() {
  const paso = (sesionActiva?.pasos || [])[pasoActivo];
  if (!paso?.d) { irPaso(1); return; }

  if (timerCorriendo) {
    clearInterval(timerInterval);
    timerCorriendo = false;
    document.getElementById("ej-btn-timer").textContent = "▶ Continuar";
  } else {
    timerCorriendo = true;
    document.getElementById("ej-btn-timer").textContent = "⏸ Pausar";
    timerInterval = setInterval(() => {
      tiempoRestante--;
      document.getElementById("ej-timer-display").textContent = fmtTimer(tiempoRestante);
      if (tiempoRestante <= 0) { clearInterval(timerInterval); timerCorriendo = false; irPaso(1); }
    }, 1000);
  }
}

function cerrarSesion() {
  clearInterval(timerInterval);
  timerCorriendo = false;
  sesionActiva   = null;
  document.getElementById("ej-overlay-sesion").style.display = "none";
  marcarHecho("ejercicio");
}

// ─── MEDITACIÓN GUIADA ─────────────────────────────────
function iniciarMeditacion(ses) {
  medData   = ses;
  medPaso   = 0;
  medPausado = false;
  document.getElementById("ej-overlay-meditacion").style.display = "flex";
  renderPasoMed();
  iniciarTimerMed();
}

function renderPasoMed() {
  const pasos = medData?.pasos || [];
  const paso  = pasos[medPaso];
  if (!paso) { cerrarMeditacion(); return; }

  const pct = Math.round(((medPaso + 1) / pasos.length) * 100);
  document.getElementById("ej-med-barra").style.width     = pct + "%";
  document.getElementById("ej-med-paso-label").textContent = `${medPaso + 1} / ${pasos.length}`;
  document.getElementById("ej-med-titulo").textContent    = paso.titulo;
  document.getElementById("ej-med-texto").textContent     = paso.texto;

  const burbuja = document.getElementById("ej-respiracion-burbuja");
  burbuja.style.display = paso.tipo === "respiracion" ? "block" : "none";

  medTiempo = paso.duracion;
  document.getElementById("ej-med-timer").textContent = fmtTimer(medTiempo);
}

function iniciarTimerMed() {
  clearInterval(medTimerInterval);
  medTimerInterval = setInterval(() => {
    if (medPausado) return;
    medTiempo--;
    document.getElementById("ej-med-timer").textContent = fmtTimer(medTiempo);
    if (medTiempo <= 0) {
      medPaso++;
      const total = (medData?.pasos || []).length;
      if (medPaso >= total) cerrarMeditacion();
      else renderPasoMed();
    }
  }, 1000);
}

function saltarPasoMed() {
  medPaso++;
  const total = (medData?.pasos || []).length;
  if (medPaso >= total) cerrarMeditacion();
  else renderPasoMed();
}

function pausarMeditacion() {
  medPausado = !medPausado;
  document.getElementById("ej-med-pausar").textContent = medPausado ? "▶ Reanudar" : "⏸ Pausar";
}

function cerrarMeditacion() {
  clearInterval(medTimerInterval);
  medData = null;
  document.getElementById("ej-overlay-meditacion").style.display = "none";
  marcarHecho("meditacion");
}

// ─── EQUIPO ─────────────────────────────────────────────
function abrirEquipo() {
  cargarEquipo();
  document.getElementById("ej-overlay-equipo").style.display = "flex";
}

function cargarEquipo() {
  const equipo = JSON.parse(localStorage.getItem("equipoEjercicio") || "[]");
  document.querySelectorAll(".ej-equipo-opt input").forEach(cb => {
    cb.checked = equipo.includes(cb.value);
  });
}

function guardarEquipo() {
  const equipo = [...document.querySelectorAll(".ej-equipo-opt input:checked")].map(cb => cb.value);
  localStorage.setItem("equipoEjercicio", JSON.stringify(equipo));
  document.getElementById("ej-overlay-equipo").style.display = "none";
}

// ─── TRACKING DIARIO ────────────────────────────────────
function llaveHoy(tipo) {
  return `vsHecho_${new Date().toDateString()}_${tipo}`;
}

function marcarHecho(tipo) {
  localStorage.setItem(llaveHoy(tipo), "1");
  renderDias();       // actualiza ✓ en los pills
  renderHoy();        // actualiza card de hoy
  renderResumenDia(); // actualiza barra de progreso
}

function estaHecho(tipo) {
  return localStorage.getItem(llaveHoy(tipo)) === "1";
}

function yaLoHice(tipo) {
  marcarHecho(tipo);
  // Animación de celebración breve
  const card = document.getElementById("ej-hoy-card");
  if (card) {
    card.classList.add("ej-celebracion");
    setTimeout(() => card.classList.remove("ej-celebracion"), 1200);
  }
}

function renderResumenDia() {
  const cont = document.getElementById("ej-resumen-dia");
  if (!cont) return;
  const hEj  = estaHecho("ejercicio");
  const hMed = estaHecho("meditacion");
  const total = 2;
  const hechos = (hEj ? 1 : 0) + (hMed ? 1 : 0);
  const pct = Math.round((hechos / total) * 100);

  cont.innerHTML = `
    <div class="ej-resumen-titulo">
      ${hechos === total
        ? "🎉 ¡Día completado! Excelente trabajo."
        : `Hoy: ${hechos}/${total} actividades completadas`}
    </div>
    <div class="ej-resumen-items">
      <div class="ej-resumen-item ${hEj ? 'hecho' : ''}">
        <span class="ej-resumen-ico">${hEj ? "✅" : "⭕"}</span>
        <span>Entrenamiento</span>
        ${!hEj ? `<button onclick="yaLoHice('ejercicio')" class="ej-ya-btn">✓ Ya lo hice</button>` : ""}
      </div>
      <div class="ej-resumen-item ${hMed ? 'hecho' : ''}">
        <span class="ej-resumen-ico">${hMed ? "✅" : "⭕"}</span>
        <span>Meditación</span>
        ${!hMed ? `<button onclick="yaLoHice('meditacion')" class="ej-ya-btn">✓ Ya lo hice</button>` : ""}
      </div>
    </div>
    <div class="ej-resumen-bar">
      <div class="ej-resumen-fill" style="width:${pct}%"></div>
    </div>`;
}

// ─── UTILS ──────────────────────────────────────────────
function fmtTiempo(seg) {
  if (seg < 60) return `${seg} seg`;
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return s > 0 ? `${m} min ${s}s` : `${m} min`;
}

function fmtTimer(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
