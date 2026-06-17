// ============================================================
// MI DÍA — ViveSano
// Acompañante diario: meditación, comidas, ejercicio,
// mercado del sábado y frases motivadoras con sarcasmo.
// ============================================================

// ─── DATOS BASE DE RECORDATORIOS ─────────────────────────────
const REC_DEFAULT = [
  // Bienestar matutino
  { id:"meditacion",    grupo:"bienestar", emoji:"🧘", label:"Meditación / Respiración", hora:"06:30", activo:true  },
  // Comidas
  { id:"desayuno",      grupo:"comidas",   emoji:"🌅", label:"Desayuno",                hora:"07:30", activo:true  },
  { id:"once_manana",   grupo:"comidas",   emoji:"🍎", label:"Onces de la mañana",      hora:"10:30", activo:true  },
  { id:"almuerzo",      grupo:"comidas",   emoji:"☀️", label:"Almuerzo",                hora:"12:30", activo:true  },
  { id:"once_tarde",    grupo:"comidas",   emoji:"🧁", label:"Onces de la tarde",       hora:"16:00", activo:false },
  { id:"cena",          grupo:"comidas",   emoji:"🌙", label:"Cena",                    hora:"18:45", activo:true  },
  // Ejercicio
  { id:"ejercicio",     grupo:"ejercicio", emoji:"💪", label:"Mi entrenamiento",        hora:"17:00", activo:true  },
  // Semanal
  { id:"mercado",       grupo:"semanal",   emoji:"🛒", label:"Mercado del sábado",      hora:"09:00", activo:true,  diasSemana:[6] },
];

// ─── FRASES MOTIVADORAS ESTILO DUOLINGO ──────────────────────
// Sarcásticas, graciosas, un poco intimidadoras. Rotación diaria.
const FRASES_DIA = [
  { ico:"🦥", txt:"Dicen que la motivación no dura para siempre. El baño tampoco y aun así lo haces todos los días. Pequeños hábitos. Hoy." },
  { ico:"📊", txt:"El 80% de las personas que 'quieren bajar de peso' están leyendo esto mientras comen algo que no deberían. El otro 20% ya desayunó bien. Tú decides en cuál estás." },
  { ico:"🕐", txt:"Tu yo del año pasado desearía haber empezado hoy. Tu yo del año que viene te mirará desde el espejo. Hazle un favor." },
  { ico:"🔥", txt:"Una persona que come bien el 80% del tiempo logra más que la que 'empieza el lunes' semana tras semana. Hoy es el 80%." },
  { ico:"🧠", txt:"El cerebro tarda 66 días en convertir algo en hábito. El primero es hoy. Los demás se ponen más fáciles. Te lo prometemos." },
  { ico:"🌮", txt:"Esa hamburguesa que estás pensando también sabe que la estás pensando. 👀 Come lo que tenías planeado. Tu cuerpo sí lo sabe." },
  { ico:"📱", txt:"Llevas 12 minutos scrolleando y todavía no has desayunado. Tu metabolismo te está mandando mensajes de voz. Nadie los está escuchando." },
  { ico:"💤", txt:"Dormiste 8 horas. Tus células están al 100%. Tu mente aún no lo sabe, pero lo sabrá después del desayuno." },
  { ico:"🏆", txt:"La diferencia entre quien logra sus metas y quien no: quien sí las logra tampoco tiene ganas algunos días. Pero lo hace igual." },
  { ico:"🌿", txt:"ViveSano te iba a mandar este mensaje en inglés, pero no hubieras entendido. Así que aquí va: EAT YOUR VEGGIES. (Come tus verduras, no es tan difícil.)" },
  { ico:"👀", txt:"El lunes que siempre esperas para empezar nunca llega. Hoy es martes. O jueves. O sábado. Da igual. Empieza." },
  { ico:"🍎", txt:"Una manzana al día... bueno, ya sabes cómo sigue eso. No tienes que comer perfectamente. Solo tienes que comer MEJOR que ayer." },
  { ico:"🎯", txt:"Tu plan de alimentación no es una dieta. Es una inversión. Las dietas terminan. Las inversiones crecen." },
  { ico:"😴", txt:"Duolingo amenaza con que el búho aparece de noche si no estudias. Nosotros somos más sutiles. Por ahora. 🌿" },
  { ico:"⚡", txt:"5 años de malos hábitos no se borran en 2 semanas. Pero 2 semanas de buenos hábitos SÍ cambian cómo te sientes. Comprobado. Empieza." },
];

// ─── MENSAJES DE NOTIFICACIÓN PERSONALIZADOS ─────────────────
const MENSAJES = {
  meditacion: [
    "Antes de revisar el teléfono, respira. 10 minutos de meditación y el día empieza diferente. 🧘",
    "Tu cerebro lleva toda la noche en modo reposo. Dale un arranque suave antes del caos. Abre ViveSano → Ejercicio → Meditación.",
    "Buenos días. Instagram puede esperar 10 minutos. Tu mente, no tanto. 🌿",
    "Sientes que el día ya empezó abrumador? Perfecto momento para respirar. 4 segundos inhala, 6 exhala. Repite.",
    "El 78% de las decisiones malas del día se toman sin haber respirado profundo ni una vez. Medita primero. 🧠",
  ],
  desayuno: [
    "Tu estómago lleva 8 horas sin comer y tú ahí con el café solo 🌅 Dale. Desayuna.",
    "Saltarse el desayuno para 'comer menos' es como no poner gasolina para ahorrar plata. Spoiler: terminas varado a las 11am.",
    "¿Desayuno o esperas al almuerzo con tanta hambre que comes el doble? Matemáticamente el desayuno gana. 🥣",
    "Tu metabolismo despertó contigo. Está esperando. No lo hagas esperar más.",
    "Tienes desayuno en tu plan. Alguien lo calculó para tu objetivo. Ya está hecho. Solo falta comértelo. ☀️",
  ],
  once_manana: [
    "Esa vocecita que dice 'espera al almuerzo' es la misma que te hace comer el doble a las 12pm. Onces primero. 🍎",
    "Tu glucosa lleva 3 horas bajando. Un snack ahora evita el modo zombie antes del almuerzo.",
    "Las onces no son un lujo. Son ingeniería metabólica. Metabolismo activo = mejor quema de grasa.",
    "Si tu objetivo es músculo: tu cuerpo necesita proteína cada 3-4 horas. Esta es la señal. 💪",
    "No esperes a tener 'mucha hambre'. Para entonces ya tomaste malas decisiones.",
  ],
  almuerzo: [
    "¿Llevas 5 horas con un tinto y las buenas intenciones? Eso explica el cansancio. Almuerza ya. ☀️",
    "El 'no tengo tiempo de almorzar' lo inventó alguien que luego se comió todo en la cena. 20 minutos. Inviértelos.",
    "Tienes comida en tu plan. Calculada para ti. El delivery también existe, pero tus objetivos, no tanto después de eso.",
    "Hora del almuerzo. Si lo tienes listo: eres una persona que se respeta. Si no: hoy aprendiste por qué existe el mercado del sábado. 🍽️",
    "Tu cerebro funciona con glucosa. Sin almuerzo = mal humor, mala concentración y malas decisiones. Come.",
  ],
  once_tarde: [
    "Faltan 3 horas para la cena. Sin onces llegas con un hambre que justifica cualquier cosa. No le des esa excusa a tu cerebro. 🧁",
    "Las onces de la tarde son el puente entre el almuerzo y la cena. Sin puente, te caes al río del antojo.",
    "Sí, puedes. No arruina la cena. Tu metabolismo te lo agradece.",
    "Pequeñas comidas frecuentes = metabolismo activo todo el día. Esta es la pequeña comida frecuente de las 4pm.",
    "Si no comes nada ahora, en 2 horas comerás lo primero que encuentres. Que probablemente no es lo que quieres. 🤔",
  ],
  cena: [
    "Cena antes de las 7:30pm. No es capricho — necesitas 2-3 horas entre cenar y dormir para descansar bien. 🌙",
    "Tu hígado hace detox mientras duermes. Si lo mandas lleno de comida pesada, trabaja horas extra sin pago. Sé justo/a con él.",
    "Cena ligera = duermes mejor = te levantas mejor = día mejor. Todo empieza esta noche. 🌙",
    "Tu yo de mañana a las 6am depende de lo que cenes esta noche. Dale un favor.",
    "La cena ideal: proteína + verduras. Ni muy poco ni mucho. Tu metabolismo de noche va más lento. Ayúdalo.",
  ],
  ejercicio: [
    "¡Hora de entrenar! Tu plan de hoy está listo en la sección Ejercicio & Bienestar. 💪 Abre ViveSano.",
    "El sofá recuerda perfectamente tu silueta. Vamos a cambiar eso. 30 minutos. Tú puedes.",
    "¿Cansado/a? El ejercicio genera más energía de la que consume. El cansancio de ANTES de entrenar es mentira que dice el cerebro.",
    "30 minutos de entrenamiento = un capítulo de serie. Pero uno que sí cambia algo.",
    "La pereza miente muy bien. Dice que mañana. Mañana también va a decir mañana. HOY. 🔥",
    "Tu yo del año pasado desearía haber empezado. Tu yo del año que viene te agradece que lo hagas ahora.",
  ],
  mercado: [
    "🛒 Es sábado. Si no haces el mercado HOY, el lunes comerás lo que encuentres. Ya sabes cómo termina eso.",
    "Un mercado bien hecho el sábado = una semana de buenas decisiones. Un sábado sin mercado = 5 días de 'pido algo'.",
    "¿Recuerdas esa semana que comiste bien todos los días? Empezó con un mercado el sábado. Esta puede ser igual. 🛒",
    "El mercado dura 45 minutos. Vale 7 días de salud. La matemática está clara.",
    "Tu plan de la próxima semana ya está listo en ViveSano. Solo le faltan los ingredientes. Ve hoy. 🥦🍗",
  ],
};

// ─── MENSAJES PERSONALIZADOS POR CONDICIÓN ───────────────────
const MSG_CONDICION = {
  diabetes: {
    once_manana: "Con diabetes es ESENCIAL no saltarte las onces. Mantén la glucosa estable. 🍎",
    almuerzo:    "Almuerzo a tiempo = glucosa estable. Saltarlo puede causar hipoglucemia. Cuídate. ☀️",
    cena:        "Cena controlada en carbohidratos esta noche. Tu glucosa de mañana depende de esto. 🌙",
  },
  cardiaca: {
    ejercicio:   "Tu plan de hoy es seguro para tu corazón: sin HIIT, sin saltos. Intensidad moderada. ❤️ ¡Vamos con calma!",
    meditacion:  "La meditación reduce la presión arterial y el estrés cardiovascular. Hoy la necesitas doble. 🧘",
    desayuno:    "Desayuno bajo en sodio y grasas saturadas. Tu corazón trabaja duro — dale buenos combustibles. ❤️",
  },
  hipertension: {
    ejercicio:   "Ejercicio moderado de hoy. Nada de HIIT. Hidratación constante y si sientes algo raro, para. ❤️",
    meditacion:  "La meditación baja la presión arterial. 10 minutos hoy pueden hacer diferencia.",
    cena:        "Cena ligera y baja en sal esta noche. La hipertensión agradece las cenas suaves. 🌙",
  },
  embarazo: {
    ejercicio:    "Tu sesión prenatal de hoy es suave y segura para ti y tu bebé. 🤱 Con calma.",
    once_manana:  "El bebé también necesita nutrientes cada pocas horas. Onces importantes. 🍎",
    cena:         "Cena nutritiva esta noche. Tu cuerpo está trabajando el doble. Cuídalo bien. 🌙",
  },
};

// ─── ESTADO ───────────────────────────────────────────────────
let _config = [];
let _checkInterval = null;

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  _config = cargarConfig();
  const u = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  renderHeader(u);
  renderPermiso();
  renderFraseDia();
  renderTimeline();
  renderGrupo("bienestar",  "rec-lista-bienestar");
  renderGrupo("comidas",    "rec-lista-comidas");
  renderGrupo("ejercicio",  "rec-lista-ejercicio");
  renderGrupo("semanal",    "rec-lista-semanal");
  personalizarEjercicio(u);
  iniciarChecker();
});

// ─── HEADER ───────────────────────────────────────────────────
function renderHeader(u) {
  const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const MESES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const ahora  = new Date();
  const badge  = document.getElementById("rec-dia-badge");
  if (badge) badge.innerHTML = `
    <span class="rec-dia-nombre">${DIAS[ahora.getDay()]}</span>
    <span class="rec-dia-fecha">${ahora.getDate()} ${MESES[ahora.getMonth()]}</span>`;

  const subtxt = {
    bajar:     "Plan para bajar de peso",
    masa:      "Plan para ganar músculo",
    tonificar: "Plan para tonificar",
    mantener:  "Plan de mantenimiento",
  };
  const sub = document.getElementById("rec-subtitulo");
  if (sub && u.objetivo) sub.textContent = (subtxt[u.objetivo] || "Plan personalizado") + " · desde que te levantas";
  if (sub && u.condicion === "embarazo") sub.textContent = "Plan prenatal · tu acompañante diario";
}

// ─── FRASE DEL DÍA ────────────────────────────────────────────
function renderFraseDia() {
  const dia   = new Date().getDate();
  const frase = FRASES_DIA[dia % FRASES_DIA.length];
  const ico   = document.getElementById("rec-frase-card");
  const txt   = document.getElementById("rec-frase-txt");
  if (ico) ico.querySelector(".rec-frase-owl").textContent = frase.ico;
  if (txt) txt.textContent = frase.txt;
}

// ─── TIMELINE DEL DÍA ─────────────────────────────────────────
function renderTimeline() {
  const cont = document.getElementById("rec-timeline");
  if (!cont) return;
  const ahora  = new Date();
  const hmAhora = ahora.getHours() * 60 + ahora.getMinutes();

  const activos = _config
    .filter(r => r.activo && (!r.diasSemana || r.diasSemana.includes(ahora.getDay())))
    .sort((a, b) => hmStr(a.hora) - hmStr(b.hora));

  if (!activos.length) {
    cont.innerHTML = '<p style="color:#aaa;font-size:13px;padding:8px 0">Activa algunos recordatorios para ver tu día aquí.</p>';
    return;
  }

  const hoyStr = new Date().toDateString();

  cont.innerHTML = activos.map(r => {
    const hm      = hmStr(r.hora);
    const pasado  = hm < hmAhora;
    const proxima = hm > hmAhora;
    // Verificar si fue marcado como hecho (ejercicio o meditación via ejercicio.html)
    const tipoHecho = r.id === "ejercicio" ? "ejercicio"
                    : r.id === "meditacion" ? "meditacion" : null;
    const hecho = tipoHecho
      ? localStorage.getItem(`vsHecho_${hoyStr}_${tipoHecho}`) === "1"
      : pasado; // Para comidas, asumimos hecho si ya pasó la hora
    const cls   = hecho ? "pasado" : proxima ? "" : "ahora";
    return `<div class="rec-tl-item ${cls}">
      <div class="rec-tl-hora">${r.hora}</div>
      <div class="rec-tl-dot ${hecho ? "hecho" : ""}"></div>
      <div class="rec-tl-info">
        <span class="rec-tl-emoji">${r.emoji}</span>
        <span class="rec-tl-label">${r.label}</span>
        ${hecho
          ? '<span class="rec-tl-listo">✓</span>'
          : `<span class="rec-tl-rest">${fmtRest(hm, hmAhora)}</span>`}
      </div>
    </div>`;
  }).join("");
}

// ─── RENDER GRUPOS ────────────────────────────────────────────
function renderGrupo(grupo, contenedorId) {
  const cont  = document.getElementById(contenedorId);
  if (!cont) return;
  const items = _config.filter(r => r.grupo === grupo);
  cont.innerHTML = items.map(r => renderCard(r)).join("");
}

function renderCard(r) {
  return `<div class="rec-card" id="reccard-${r.id}">
    <span class="rec-emoji">${r.emoji}</span>
    <div class="rec-info">
      <span class="rec-nombre">${r.label}</span>
      <div id="rec-sub-${r.id}" class="rec-card-sub"></div>
      <div class="rec-hora-wrap">
        <span class="rec-hora-label">Hora:</span>
        <input type="time" class="rec-time" id="hora-${r.id}" value="${r.hora}"
               onchange="actualizarHora('${r.id}', this.value)">
        ${r.diasSemana ? `<span class="rec-dias-badge">solo sábados</span>` : ""}
      </div>
    </div>
    <div class="rec-toggle-wrap">
      <input type="checkbox" class="rec-toggle" id="toggle-${r.id}"
             ${r.activo ? "checked" : ""}
             onchange="actualizarToggle('${r.id}', this.checked)">
    </div>
  </div>`;
}

// ─── PERSONALIZAR EJERCICIO ───────────────────────────────────
function personalizarEjercicio(u) {
  const sub = document.getElementById("rec-ej-subtitulo");
  if (!sub) return;
  const obj = { bajar:"Cardio + fuerza para bajar de peso", masa:"Fuerza y calistenia para ganar músculo",
                tonificar:"Circuitos para tonificar", mantener:"Plan equilibrado de mantenimiento" };
  if (u.condicion  === "embarazo")                                        sub.textContent = "Yoga prenatal y meditación";
  else if (u.enfermedad === "cardiaca" || u.enfermedad === "hipertension") sub.textContent = "Plan cardiovascular seguro — sin HIIT ❤️";
  else if (u.enfermedad === "diabetes")                                   sub.textContent = "Plan con horarios precisos para glucosa estable";
  else sub.textContent = obj[u.objetivo] || "Entrenamiento según tu objetivo";

  // Mostrar sesión de hoy en la card de ejercicio
  try {
    const hoy  = (new Date().getDay() + 6) % 7;
    const wk   = getWeekNumber() % 4;
    const tipo = u.condicion  === "embarazo"                                       ? "prenatal"
               : (u.enfermedad === "cardiaca" || u.enfermedad === "hipertension")   ? "cardiaco"
               : u.objetivo   === "bajar"                                           ? "cardio"
               : u.objetivo   === "masa"                                            ? "fuerza"
               : "balanceado";

    // Map de planes (importados desde ejercicio.js si disponible)
    const PLANES_MAP = {
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
    const NOMBRES_MAP = {
      circ_fuerza:"Circuito de Fuerza 💪", circ_cardio:"Cardio HIIT 🔥", circ_core:"Core & Estabilidad ⚡",
      cali_superior:"Calistenia Tren Superior 🏋️", cali_inferior:"Calistenia Tren Inferior 🦵",
      yoga_basico:"Yoga Básico 🧘", yoga_espalda:"Yoga Espalda 🌿", yoga_restaurativo:"Yoga Restaurativo 🌙",
      yoga_prenatal:"Yoga Prenatal 🤱", med_respiracion:"Meditación Respiración 🌬️",
      med_corporal:"Escaneo Corporal 🧠", med_visualizacion:"Visualización ✨",
      med_mindfulness:"Mindfulness 🌸", descanso:"Descanso Activo 🚶",
    };
    const sesId   = PLANES_MAP[tipo]?.[wk]?.[hoy];
    const sesNombre = NOMBRES_MAP[sesId] || "Sesión del día";
    const subCard = document.getElementById("rec-sub-ejercicio");
    if (subCard) subCard.textContent = `Hoy: ${sesNombre}`;
  } catch(e) { /* Si ejercicio.js no está disponible */ }
}

// ─── CARGAR / GUARDAR CONFIG ──────────────────────────────────
function cargarConfig() {
  const guardado = localStorage.getItem("recordatoriosMiDia");
  if (!guardado) return REC_DEFAULT.map(r => ({ ...r }));
  try {
    const parsed = JSON.parse(guardado);
    return REC_DEFAULT.map(def => {
      const saved = parsed.find(p => p.id === def.id);
      return saved ? { ...def, ...saved } : { ...def };
    });
  } catch { return REC_DEFAULT.map(r => ({ ...r })); }
}

function guardarConfig(cfg) {
  localStorage.setItem("recordatoriosMiDia", JSON.stringify(cfg));
}

function actualizarHora(id, hora) {
  const item = _config.find(r => r.id === id);
  if (item) { item.hora = hora; guardarConfig(_config); renderTimeline(); }
}

function actualizarToggle(id, activo) {
  const item = _config.find(r => r.id === id);
  if (item) { item.activo = activo; guardarConfig(_config); renderTimeline(); }
}

function guardarRecordatorios() {
  _config.forEach(r => {
    const inp = document.getElementById(`hora-${r.id}`);
    const tog = document.getElementById(`toggle-${r.id}`);
    if (inp) r.hora   = inp.value;
    if (tog) r.activo = tog.checked;
  });
  guardarConfig(_config);
  renderTimeline();
  const btn = document.getElementById("btn-guardar-rec");
  if (btn) {
    btn.textContent = "✓ ¡Guardado! Tu día está configurado";
    btn.classList.add("ok");
    setTimeout(() => { btn.textContent = "💾 Guardar mis horarios"; btn.classList.remove("ok"); }, 2800);
  }
}

// ─── PERMISO NOTIFICACIONES ───────────────────────────────────
function renderPermiso() {
  const card  = document.getElementById("rec-permiso");
  if (!card) return;
  const est   = "Notification" in window ? Notification.permission : "no-soportado";
  if (est === "granted") {
    card.className = "rec-permiso-card concedido";
    card.innerHTML = `<span class="rec-permiso-ico">✅</span><div class="rec-permiso-txt"><h3>Notificaciones activadas</h3><p>Recibirás tus recordatorios mientras el navegador esté abierto.</p></div>`;
  } else if (est === "denied") {
    card.className = "rec-permiso-card denegado";
    card.innerHTML = `<span class="rec-permiso-ico">🔕</span><div class="rec-permiso-txt"><h3>Notificaciones bloqueadas</h3><p>Ve a Configuración del navegador → Privacidad → Notificaciones → Permitir ViveSano.</p></div>`;
  } else if (est === "no-soportado") {
    card.className = "rec-permiso-card denegado";
    card.innerHTML = `<span class="rec-permiso-ico">⚠️</span><div class="rec-permiso-txt"><h3>Notificaciones no disponibles</h3><p>Prueba en Chrome, Edge o Safari (iOS 16.4+).</p></div>`;
  } else {
    card.className = "rec-permiso-card pendiente";
    card.innerHTML = `<span class="rec-permiso-ico">🔔</span><div class="rec-permiso-txt"><h3>Activa los recordatorios</h3><p>Permite las notificaciones para que ViveSano te acompañe durante el día.</p><button class="btn-permiso" onclick="solicitarPermiso()">Activar recordatorios</button></div>`;
  }
}

async function solicitarPermiso() {
  if (!("Notification" in window)) return;
  await Notification.requestPermission();
  renderPermiso();
  if (Notification.permission === "granted") {
    new Notification("ViveSano 🌿", {
      body: "¡Listo! Estaremos contigo desde que te levantas. Ahora sí, a darle. 💪",
      icon: _iconoUrl(),
    });
  }
}

// ─── CHECKER DE NOTIFICACIONES ────────────────────────────────
function iniciarChecker() {
  if (_checkInterval) clearInterval(_checkInterval);
  _checkInterval = setInterval(checkNotificaciones, 30000); // cada 30s
  checkNotificaciones();
}

function checkNotificaciones() {
  if (Notification.permission !== "granted") return;
  const ahora  = new Date();
  const hhmm   = `${String(ahora.getHours()).padStart(2,"0")}:${String(ahora.getMinutes()).padStart(2,"0")}`;
  const u      = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const hoy    = ahora.getDay(); // 0=domingo

  _config.forEach(r => {
    if (!r.activo) return;
    if (r.hora !== hhmm)  return;
    if (r.diasSemana && !r.diasSemana.includes(hoy)) return;

    const llave = `vsRec_${r.id}_${ahora.toDateString()}`;
    if (localStorage.getItem(llave)) return; // ya enviado hoy

    const msg = buildMensaje(r.id, u);
    new Notification("ViveSano 🌿", { body: msg, icon: _iconoUrl() });
    localStorage.setItem(llave, "1");
  });
}

function buildMensaje(id, u) {
  // Verificar condición médica (enfermedad) primero — tiene más prioridad de seguridad
  const enf = u.enfermedad;
  if (enf && enf !== "ninguna" && MSG_CONDICION[enf]?.[id]) return MSG_CONDICION[enf][id];
  // Luego estado especial (embarazo, lactancia)
  const cond = u.condicion;
  if (cond && cond !== "ninguna" && MSG_CONDICION[cond]?.[id]) return MSG_CONDICION[cond][id];

  // Personalización por objetivo
  if (id === "once_manana" && u.objetivo === "masa") {
    return `💪 Hora de proteínas. Tu músculo necesita aminoácidos cada 3-4 horas. Proteína en polvo o una buena porción de pollo/huevo/legumbres.`;
  }
  if (id === "cena" && u.objetivo === "bajar") {
    const h = new Date().getHours();
    if (h >= 20) return `🌙 Son las ${h}pm. Cada hora que pasa, tu metabolismo trabaja más lento. Cena ligera YA. Sopa, huevo, ensalada.`;
  }
  if (id === "ejercicio") {
    // Intentar obtener sesión del día
    try {
      const hoyIdx = (new Date().getDay() + 6) % 7;
      const wk = getWeekNumber() % 4;
      const tipo = cond === "embarazo" ? "prenatal" : u.objetivo === "bajar" ? "cardio" : u.objetivo === "masa" ? "fuerza" : "balanceado";
      const P = { cardio:[["circ_cardio","yoga_basico","cali_inferior","med_respiracion","circ_fuerza","yoga_restaurativo","descanso"],["cali_inferior","circ_cardio","med_corporal","circ_fuerza","yoga_espalda","circ_core","descanso"],["circ_fuerza","med_visualizacion","circ_cardio","yoga_basico","cali_inferior","med_mindfulness","descanso"],["yoga_basico","circ_cardio","cali_inferior","circ_core","med_respiracion","circ_fuerza","descanso"]], fuerza:[["cali_superior","cali_inferior","circ_core","med_respiracion","cali_superior","yoga_espalda","descanso"],["cali_inferior","circ_fuerza","cali_superior","med_corporal","cali_inferior","yoga_restaurativo","descanso"],["circ_fuerza","cali_superior","med_visualizacion","cali_inferior","circ_core","yoga_basico","descanso"],["cali_superior","med_mindfulness","cali_inferior","circ_fuerza","cali_superior","yoga_espalda","descanso"]], balanceado:[["circ_fuerza","yoga_basico","cali_superior","med_respiracion","cali_inferior","yoga_restaurativo","descanso"],["yoga_espalda","circ_cardio","med_corporal","cali_superior","circ_core","yoga_basico","descanso"],["cali_inferior","med_visualizacion","circ_fuerza","yoga_restaurativo","cali_superior","med_mindfulness","descanso"],["circ_core","yoga_basico","circ_cardio","med_respiracion","cali_inferior","yoga_espalda","descanso"]], prenatal:[["yoga_prenatal","descanso","med_respiracion","yoga_prenatal","descanso","med_visualizacion","descanso"],["med_corporal","yoga_prenatal","descanso","med_mindfulness","yoga_prenatal","descanso","med_respiracion"],["yoga_prenatal","med_respiracion","descanso","yoga_prenatal","med_corporal","descanso","med_visualizacion"],["descanso","yoga_prenatal","med_mindfulness","descanso","yoga_prenatal","med_respiracion","descanso"]] };
      const N = { circ_fuerza:"Circuito de Fuerza", circ_cardio:"Cardio HIIT", circ_core:"Core & Estabilidad", cali_superior:"Calistenia Tren Superior", cali_inferior:"Calistenia Tren Inferior", yoga_basico:"Yoga Básico", yoga_espalda:"Yoga para la Espalda", yoga_restaurativo:"Yoga Restaurativo", yoga_prenatal:"Yoga Prenatal", med_respiracion:"Meditación Respiración", med_corporal:"Escaneo Corporal", med_visualizacion:"Visualización Guiada", med_mindfulness:"Mindfulness", descanso:"Descanso Activo" };
      const sesId = P[tipo]?.[wk]?.[hoyIdx];
      if (sesId && sesId !== "descanso") return `💪 Hoy toca: ${N[sesId]}. Abre ViveSano → Ejercicio & Bienestar → Iniciar sesión. Sin excusas.`;
      if (sesId === "descanso") return `🚶 Hoy es día de descanso activo. Una caminata de 20 min y estiramientos suaves. El cuerpo también necesita recuperarse.`;
    } catch(e) { /* fallback */ }
  }

  // Mensaje genérico rotativo
  const lista = MENSAJES[id] || ["¡Es la hora! Abre ViveSano. 🌿"];
  const idx   = new Date().getDate() % lista.length;
  return lista[idx];
}

// ─── NOTIFICACIÓN DE PRUEBA ───────────────────────────────────
function notificacionPrueba() {
  if (Notification.permission !== "granted") {
    alert("Primero activa las notificaciones arriba 👆");
    return;
  }
  const frases = [
    "¡Funciona! Así de clarito te avisaremos cada vez. 🌿",
    "ViveSano te está mirando. Con amor y con datos. 📊",
    "Si puedes leer esto, las notificaciones están activadas. Si no puedes... ¿cómo estás leyendo esto?",
    "Prueba exitosa. Tu yo del futuro ya sabe que vas a estar más sano/a. 💪",
  ];
  new Notification("ViveSano 🌿", {
    body: frases[Math.floor(Math.random() * frases.length)],
    icon: _iconoUrl(),
  });
}

// ─── UTILS ────────────────────────────────────────────────────
function hmStr(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function fmtRest(hm, hmAhora) {
  const diff = hm - hmAhora;
  if (diff <= 0) return "";
  if (diff < 60) return `en ${diff} min`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `en ${h}h${m > 0 ? " " + m + "m" : ""}`;
}

function getWeekNumber() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
}

function _iconoUrl() {
  try { return new URL("assets/img/logofondoblanco.png", location.href).href; }
  catch { return ""; }
}
