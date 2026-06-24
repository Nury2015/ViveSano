// ══════════════════════════════════════════════════════════
// MEDITACIÓN & BIENESTAR — ViveSano
// Página dedicada a meditaciones guiadas y yoga.
// ══════════════════════════════════════════════════════════

// ─── SESIONES ─────────────────────────────────────────────
const MED_SESIONES = {

  // ── MEDITACIONES GUIADAS ──────────────────────────────
  med_respiracion: {
    nombre:"Respiración 4-7-8", tipo:"meditacion", emoji:"🌬️", color:"#2e7d32",
    duracion:10, dificultad:"Suave",
    descripcion:"Activa el sistema nervioso parasimpático. Reduce el estrés y mejora el sueño.",
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

  // ── YOGA ──────────────────────────────────────────────
  yoga_basico: {
    nombre:"Yoga Básico", tipo:"yoga", emoji:"🧘", color:"#6a1b9a",
    duracion:30, dificultad:"Suave",
    descripcion:"Posturas esenciales y respiración consciente. Perfecto para comenzar o para un día de recuperación.",
    pasos:[
      { titulo:"Respiración de llegada", tipo:"respiracion", duracion:120,
        texto:"Siéntate cómodamente. 10 respiraciones profundas. Inhala por la nariz en 4 tiempos, exhala por la boca en 6 tiempos. Cierra los ojos." },
      { titulo:"Saludo al sol × 2", tipo:"flujo", duracion:240,
        texto:"Montaña (de pie) → Brazos arriba → Flexión hacia adelante → Postura a media altura → Tabla → Perro boca abajo → Cobra → Perro boca abajo → repite al otro lado. Fluye con la respiración." },
      { titulo:"Guerrero I (D + I)", tipo:"postura", duracion:60,
        texto:"Pie derecho adelante, rodilla doblada a 90°. Pie trasero en ángulo de 45°. Brazos arriba, mirada al frente. 5 respiraciones → repite con pie izquierdo." },
      { titulo:"Guerrero II (D + I)", tipo:"postura", duracion:60,
        texto:"Pies muy separados. Brazo delantero mirando adelante, brazo trasero mirando atrás. Mira sobre la mano delantera. Hombros bajos. 5 respiraciones c/lado." },
      { titulo:"Perro boca abajo", tipo:"postura", duracion:60,
        texto:"Caderas hacia arriba y atrás. Brazos y piernas estirados, forma una V invertida. Empuja el suelo con las manos. Alterna talones hacia el piso." },
      { titulo:"Postura del niño (Balasana)", tipo:"descanso", duracion:60,
        texto:"Siéntate sobre los talones. Abre levemente las rodillas, lleva el torso hacia adelante. Brazos extendidos o al lado del cuerpo. Frente en el piso. Respira hacia la espalda." },
      { titulo:"Torsión sentada (D + I)", tipo:"postura", duracion:60,
        texto:"Sentado con piernas extendidas. Cruza la pierna derecha. Coloca el codo izquierdo en la rodilla derecha y gira el torso. 5 respiraciones → repite al otro lado." },
      { titulo:"Savasana", tipo:"relajacion", duracion:300,
        texto:"Acostado boca arriba. Piernas y brazos ligeramente separados. Palmas hacia arriba. Cierra los ojos y suelta completamente cada parte del cuerpo. 5 minutos de relajación total." },
    ]
  },

  yoga_espalda: {
    nombre:"Yoga para la Espalda", tipo:"yoga", emoji:"🌿", color:"#6a1b9a",
    duracion:30, dificultad:"Suave",
    descripcion:"Alivia la tensión lumbar y cervical. Ideal para quienes pasan muchas horas sentados.",
    pasos:[
      { titulo:"Respiración de apertura", tipo:"respiracion", duracion:90,
        texto:"Acostado. 8 respiraciones expandiendo el pecho hacia los lados y la parte trasera de las costillas. Siente cómo se abre la caja torácica." },
      { titulo:"Gato-Vaca (Cat-Cow)", tipo:"flujo", duracion:120,
        texto:"En cuatro puntos. Inhala: arquea la espalda hacia abajo (vaca, cabeza y cóccix arriba). Exhala: redondea la espalda hacia arriba (gato, cabeza abajo). 10 repeticiones lentas." },
      { titulo:"Cobra (Bhujangasana)", tipo:"postura", duracion:60,
        texto:"Boca abajo, manos bajo los hombros. Sube el torso con los codos ligeramente doblados (no los bloquees). Hombros alejados de las orejas. 3 repeticiones de 10 seg." },
      { titulo:"Perro boca abajo", tipo:"postura", duracion:60,
        texto:"Caderas arriba, piernas y brazos estirados. Lleva los talones hacia el piso. Cabeza entre los brazos, cuello relajado. 8 respiraciones." },
      { titulo:"Paloma (D + I)", tipo:"postura", duracion:180,
        texto:"Rodilla derecha adelante en ángulo, pierna izquierda extendida atrás. Inclina el torso hacia adelante. Siente el estiramiento en la cadera. 5 respiraciones → cambia." },
      { titulo:"Torsión supina (D + I)", tipo:"postura", duracion:120,
        texto:"Acostado. Lleva la rodilla derecha al piso del lado izquierdo, brazo derecho extendido. Mira hacia la derecha. 5 respiraciones → cambia." },
      { titulo:"Piernas en pared", tipo:"postura", duracion:120,
        texto:"Acostado cerca de una pared. Levanta las piernas rectas apoyándolas en la pared. Cierra los ojos. Siente cómo el flujo sanguíneo regresa de las piernas. 2 min." },
      { titulo:"Savasana", tipo:"relajacion", duracion:240,
        texto:"4 minutos de relajación total. Siente la espalda pesada contra el suelo, completamente apoyada. Suelta toda la musculatura paraespinal." },
    ]
  },

  yoga_restaurativo: {
    nombre:"Yoga Restaurativo", tipo:"yoga", emoji:"🌙", color:"#6a1b9a",
    duracion:40, dificultad:"Muy suave",
    descripcion:"Posturas largas y pasivas. Profundo descanso activo para restaurar el cuerpo y la mente.",
    pasos:[
      { titulo:"Mariposa reclinada", tipo:"postura", duracion:300,
        texto:"Acostado. Une las plantas de los pies, rodillas abiertas hacia los lados. Coloca almohadas bajo las rodillas si las sientes suspendidas. Cierra los ojos. 5 minutos." },
      { titulo:"Torsión restaurativa derecha", tipo:"postura", duracion:180,
        texto:"Lleva las rodillas al lado derecho (usa una almohada entre las rodillas si lo deseas). Brazo izquierdo extendido. Ojos cerrados. 3 minutos de respiración profunda." },
      { titulo:"Torsión restaurativa izquierda", tipo:"postura", duracion:180,
        texto:"Lo mismo al otro lado. Tu columna agradecerá esta torsión suave que libera la tensión acumulada." },
      { titulo:"Piernas en pared", tipo:"postura", duracion:300,
        texto:"Siéntate contra la pared y levanta las piernas. Cierra los ojos. Siente cómo se drena la fatiga de las piernas y regresa al corazón. 5 minutos." },
      { titulo:"Postura del niño amplia", tipo:"postura", duracion:180,
        texto:"Rodillas muy separadas, torso hacia adelante. Brazos extendidos o apoyados en una almohada bajo la cabeza. 3 minutos de respiración consciente." },
      { titulo:"Savasana extendido", tipo:"relajacion", duracion:300,
        texto:"5 minutos. Si quieres: almohada bajo las rodillas. Cubre los ojos con una tela suave. Suelta cada músculo con la exhalación. Permítete estar aquí por completo." },
    ]
  },

  yoga_prenatal: {
    nombre:"Yoga Prenatal", tipo:"yoga", emoji:"🤱", color:"#6a1b9a",
    duracion:30, dificultad:"Muy suave",
    descripcion:"Secuencia segura para el embarazo. Alivia molestias, abre la pelvis y conecta con el bebé.",
    prenatalOnly: true,
    pasos:[
      { titulo:"Respiración consciente", tipo:"respiracion", duracion:180,
        texto:"Siéntate cómodamente (sobre almohadas si necesitas). Una mano en el corazón, otra en el vientre. Inhala en 4 tiempos, exhala en 6 tiempos. 10 ciclos." },
      { titulo:"Gato-Vaca prenatal", tipo:"flujo", duracion:120,
        texto:"En cuatro puntos con muñecas bien apoyadas. Movimiento MUY suave. Inhala: pequeño arco hacia abajo. Exhala: redondea suavemente. 10 repeticiones." },
      { titulo:"Guerrero II (modificado)", tipo:"postura", duracion:90,
        texto:"Pies separados, brazos extendidos. Dobla MUY ligeramente la rodilla delantera. No profundices como en yoga regular. 3 respiraciones c/lado." },
      { titulo:"Mariposa sentada", tipo:"postura", duracion:180,
        texto:"Sentada, plantas de los pies juntas, rodillas abiertas. Inclínate suavemente hacia adelante sin comprimir el vientre. 3 minutos." },
      { titulo:"Estiramiento lateral sentada", tipo:"postura", duracion:120,
        texto:"Sentada, piernas abiertas. Inclina el torso a cada lado levantando un brazo sobre la cabeza. 5 respiraciones c/lado." },
      { titulo:"Savasana lateral", tipo:"relajacion", duracion:180,
        texto:"Acostada sobre el lado izquierdo (mejor para la circulación). Almohada entre las rodillas. Mano en el vientre. Envía amor a tu bebé con cada exhalación." },
      { titulo:"Conexión con el bebé", tipo:"meditacion", duracion:120,
        texto:"Coloca ambas manos en el vientre. Visualiza a tu bebé sano, cómodo y rodeado de luz. Dile mentalmente: 'Estoy aquí, todo está bien, te amo.' 2 minutos." },
    ]
  },

  // ── DESCANSO ACTIVO ───────────────────────────────────
  descanso: {
    nombre:"Descanso Activo", tipo:"descanso", emoji:"🚶", color:"#455a64",
    duracion:20, dificultad:"Muy suave",
    descripcion:"El descanso es parte del entrenamiento. Caminata suave + estiramientos completos.",
    pasos:[
      { titulo:"Caminata consciente", tipo:"observacion", duracion:900,
        texto:"15 min de caminata suave. En casa, en el barrio o en un parque.\n\nPresta atención a la postura: espalda erguida, pasos firmes, hombros relajados.\n\nNote cada paso. Cada respiración." },
      { titulo:"Estiramientos generales", tipo:"cierre", duracion:300,
        texto:"5 min: Cuello (oreja al hombro) → Hombros (brazo cruzado) → Triceps (codo arriba) → Espalda (rodillas al pecho) → Cuádriceps (pie al glúteo) → Isquiotibiales (pie estirado). 20–30 seg c/u." },
    ]
  },
};

// ─── ESTADO OVERLAY ────────────────────────────────────
let _medData         = null;
let _medPaso         = 0;
let _medTimer        = null;
let _medTiempo       = 0;
let _medPausado      = false;
let _sesIdActual     = null;

// ─── INIT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const u = JSON.parse(localStorage.getItem("datosUsuario") || "{}");

  const sub = document.getElementById("med-subtitulo");
  if (sub && u.condicion === "embarazo")
    sub.textContent = "Plan prenatal · meditaciones y yoga seguras para ti y tu bebé";

  renderEstadoHoy();
  renderSesionHoy(u);
  renderGrid("meditacion", "med-grid-meditacion", u);
  renderGrid("yoga",       "med-grid-yoga",       u);
  renderGrid("descanso",   "med-grid-descanso",   u);

  const btnCerrar = document.getElementById("med-btn-cerrar");
  if (btnCerrar) btnCerrar.addEventListener("click", medCerrar);
});

// ─── ESTADO DEL DÍA ────────────────────────────────────
function renderEstadoHoy() {
  const cont = document.getElementById("med-estado-hoy");
  if (!cont) return;
  const hecho = estaHecho("meditacion");
  const circ  = 126; // 2πr where r=20
  const dash  = hecho ? "0" : `${circ}`;

  cont.innerHTML = `
    <div class="med-estado-ring">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle class="med-estado-ring-bg" cx="26" cy="26" r="20"/>
        <circle class="med-estado-ring-fill" cx="26" cy="26" r="20"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${hecho ? 0 : circ}" />
      </svg>
      <div class="med-estado-ring-label">${hecho ? "✅" : "🧘"}</div>
    </div>
    <div class="med-estado-info">
      <div class="med-estado-titulo">${hecho ? "¡Meditación completada hoy!" : "Aún no meditaste hoy"}</div>
      <div class="med-estado-sub">${hecho ? "Excelente. Tu mente te lo agradece." : "10 minutos pueden cambiar todo el día."}</div>
    </div>
    ${!hecho ? `<button class="med-estado-btn" onclick="iniciarSesion('med_respiracion')">Empezar</button>` : ""}`;
}

// ─── SESIÓN DE HOY (del plan semanal) ──────────────────
function renderSesionHoy(u) {
  const cont = document.getElementById("med-sesion-hoy");
  if (!cont) return;

  const PLANS = {
    cardio:    [["circ_cardio","yoga_basico","cali_inferior","med_respiracion","circ_fuerza","yoga_restaurativo","descanso"],
                ["cali_inferior","circ_cardio","med_corporal","circ_fuerza","yoga_espalda","circ_core","descanso"],
                ["circ_fuerza","med_visualizacion","circ_cardio","yoga_basico","cali_inferior","med_mindfulness","descanso"],
                ["yoga_basico","circ_cardio","cali_inferior","circ_core","med_respiracion","circ_fuerza","descanso"]],
    fuerza:    [["cali_superior","cali_inferior","circ_core","med_respiracion","cali_superior","yoga_espalda","descanso"],
                ["cali_inferior","circ_fuerza","cali_superior","med_corporal","cali_inferior","yoga_restaurativo","descanso"],
                ["circ_fuerza","cali_superior","med_visualizacion","cali_inferior","circ_core","yoga_basico","descanso"],
                ["cali_superior","med_mindfulness","cali_inferior","circ_fuerza","cali_superior","yoga_espalda","descanso"]],
    balanceado:[["circ_fuerza","yoga_basico","cali_superior","med_respiracion","cali_inferior","yoga_restaurativo","descanso"],
                ["yoga_espalda","circ_cardio","med_corporal","cali_superior","circ_core","yoga_basico","descanso"],
                ["cali_inferior","med_visualizacion","circ_fuerza","yoga_restaurativo","cali_superior","med_mindfulness","descanso"],
                ["circ_core","yoga_basico","circ_cardio","med_respiracion","cali_inferior","yoga_espalda","descanso"]],
    prenatal:  [["yoga_prenatal","descanso","med_respiracion","yoga_prenatal","descanso","med_visualizacion","descanso"],
                ["med_corporal","yoga_prenatal","descanso","med_mindfulness","yoga_prenatal","descanso","med_respiracion"],
                ["yoga_prenatal","med_respiracion","descanso","yoga_prenatal","med_corporal","descanso","med_visualizacion"],
                ["descanso","yoga_prenatal","med_mindfulness","descanso","yoga_prenatal","med_respiracion","descanso"]],
    cardiaco:  [["yoga_basico","cali_inferior","med_respiracion","yoga_espalda","cali_superior","yoga_restaurativo","descanso"],
                ["cali_inferior","yoga_basico","med_corporal","cali_superior","yoga_espalda","med_mindfulness","descanso"],
                ["yoga_espalda","cali_superior","med_visualizacion","yoga_basico","cali_inferior","yoga_restaurativo","descanso"],
                ["cali_superior","med_respiracion","yoga_basico","cali_inferior","med_mindfulness","yoga_espalda","descanso"]],
  };
  const tipo = u.condicion === "embarazo" ? "prenatal"
             : (u.enfermedad === "cardiaca" || u.enfermedad === "hipertension") ? "cardiaco"
             : u.objetivo === "bajar" ? "cardio"
             : u.objetivo === "masa"  ? "fuerza"
             : "balanceado";

  const now    = new Date();
  const semana = Math.ceil(((now - new Date(now.getFullYear(), 0, 1)) / 86400000 + new Date(now.getFullYear(), 0, 1).getDay() + 1) / 7);
  const dia    = (now.getDay() + 6) % 7;
  const sesId  = PLANS[tipo]?.[semana % 4]?.[dia];
  const ses    = MED_SESIONES[sesId];
  if (!ses) return;

  const yaHecho = estaHecho(ses.tipo === "meditacion" ? "meditacion" : "meditacion");
  cont.innerHTML = `
    <div class="med-hoy-card">
      <div class="med-hoy-label">📅 Hoy en tu plan</div>
      <div class="med-hoy-nombre">${ses.emoji} ${ses.nombre}</div>
      <div class="med-hoy-desc">${ses.descripcion}</div>
      <div class="med-hoy-meta">
        <span class="med-hoy-chip">⏱ ${ses.duracion} min</span>
        <span class="med-hoy-chip">🎯 ${ses.dificultad}</span>
      </div>
      ${yaHecho
        ? `<div class="med-hoy-completado">✅ ¡Completado hoy! Sigue así.</div>`
        : `<button class="med-hoy-btn" onclick="iniciarSesion('${sesId}')">🧘 Iniciar sesión</button>`}
    </div>`;
}

// ─── RENDER GRIDS ──────────────────────────────────────
function renderGrid(tipo, contId, u) {
  const cont = document.getElementById(contId);
  if (!cont) return;
  const sesionesFiltradas = Object.entries(MED_SESIONES)
    .filter(([, s]) => s.tipo === tipo || (tipo === "yoga" && s.tipo === "yoga"))
    .filter(([, s]) => !s.prenatalOnly || u?.condicion === "embarazo");

  if (!sesionesFiltradas.length) {
    cont.innerHTML = "";
    cont.closest(".med-seccion")?.style && (cont.closest(".med-seccion").style.display = "none");
    return;
  }

  const hoy = estaHecho("meditacion");
  cont.innerHTML = sesionesFiltradas.map(([id, ses]) => {
    const clsTipo = `tipo-${ses.tipo}`;
    return `
      <div class="med-card ${clsTipo}" onclick="iniciarSesion('${id}')">
        <div class="med-card-top">
          <div class="med-card-emoji">${ses.emoji}</div>
          <div class="med-card-nombre">${ses.nombre}</div>
          <div class="med-card-desc">${ses.descripcion}</div>
          <div class="med-card-chips">
            <span class="med-chip med-chip-dur">⏱ ${ses.duracion} min</span>
            <span class="med-chip med-chip-dif">${ses.dificultad}</span>
          </div>
        </div>
        <button class="med-card-btn" onclick="event.stopPropagation();iniciarSesion('${id}')">
          ${ses.tipo === "descanso" ? "🚶 Comenzar" : "🧘 Iniciar"}
        </button>
      </div>`;
  }).join("");
}

// ─── INICIAR SESIÓN ─────────────────────────────────────
function iniciarSesion(sesId) {
  const ses = MED_SESIONES[sesId];
  if (!ses) return;
  _medData    = ses;
  _medPaso    = 0;
  _medPausado = false;
  _sesIdActual = sesId;

  const overlay = document.getElementById("med-overlay");
  if (overlay) overlay.style.display = "flex";
  renderPasoMed();
  iniciarTimerMed();
}

// ─── RENDER PASO ────────────────────────────────────────
function renderPasoMed() {
  const pasos = _medData?.pasos || [];
  const paso  = pasos[_medPaso];
  if (!paso) { medCerrar(); return; }

  const titulo  = paso.titulo || paso.n || "";
  const texto   = paso.texto  || paso.i || "";
  const duracion = paso.duracion || paso.d || 60;
  const total   = pasos.length;
  const pct     = Math.round(((_medPaso + 1) / total) * 100);

  const barra = document.getElementById("med-barra");
  if (barra) barra.style.width = pct + "%";
  const label = document.getElementById("med-paso-label");
  if (label) label.textContent = `${_medPaso + 1} / ${total}`;

  const titEl = document.getElementById("med-titulo");
  const txtEl = document.getElementById("med-texto");
  if (titEl) titEl.textContent = titulo;
  if (txtEl) txtEl.textContent = texto;

  const burbuja = document.getElementById("med-burbuja");
  if (burbuja) burbuja.style.display = paso.tipo === "respiracion" ? "block" : "none";

  const LABELS = {
    instruccion:"Instrucción", observacion:"Observación", respiracion:"Respiración",
    escaneo:"Escaneo", visualizacion:"Visualización", gratitud:"Gratitud",
    intencion:"Intención", libre:"Práctica libre", cierre:"Cierre",
    postura:"Postura", flujo:"Flujo", relajacion:"Relajación",
    descanso:"Descanso", meditacion:"Meditación",
  };
  const badge = document.getElementById("med-tipo-badge");
  if (badge) badge.textContent = LABELS[paso.tipo] || (paso.tipo || "").charAt(0).toUpperCase() + (paso.tipo || "").slice(1);

  _medTiempo = duracion;
  const timer = document.getElementById("med-timer");
  if (timer) timer.textContent = fmtTimer(_medTiempo);
}

// ─── TIMER ──────────────────────────────────────────────
function iniciarTimerMed() {
  clearInterval(_medTimer);
  _medTimer = setInterval(() => {
    if (_medPausado) return;
    _medTiempo--;
    const timer = document.getElementById("med-timer");
    if (timer) timer.textContent = fmtTimer(_medTiempo);
    if (_medTiempo <= 0) {
      _medPaso++;
      const total = (_medData?.pasos || []).length;
      if (_medPaso >= total) medCerrar();
      else renderPasoMed();
    }
  }, 1000);
}

function medSaltar() {
  _medPaso++;
  const total = (_medData?.pasos || []).length;
  if (_medPaso >= total) medCerrar();
  else renderPasoMed();
}

function medPausar() {
  _medPausado = !_medPausado;
  const btn = document.getElementById("med-pausar");
  if (btn) btn.textContent = _medPausado ? "▶ Reanudar" : "⏸ Pausar";
}

function medCerrar() {
  clearInterval(_medTimer);
  _medData     = null;
  _sesIdActual = null;
  const overlay = document.getElementById("med-overlay");
  if (overlay) overlay.style.display = "none";
  marcarHecho("meditacion");
  renderEstadoHoy();
  const u = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  renderGrid("meditacion", "med-grid-meditacion", u);
  renderGrid("yoga",       "med-grid-yoga",       u);
  renderGrid("descanso",   "med-grid-descanso",   u);
}

// ─── TRACKING ───────────────────────────────────────────
function llaveHoy(tipo) {
  return `vsHecho_${new Date().toDateString()}_${tipo}`;
}
function marcarHecho(tipo) {
  localStorage.setItem(llaveHoy(tipo), "1");
}
function estaHecho(tipo) {
  return localStorage.getItem(llaveHoy(tipo)) === "1";
}

// ─── UTILS ──────────────────────────────────────────────
function fmtTimer(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
