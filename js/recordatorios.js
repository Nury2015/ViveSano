// ============================================================
// RECORDATORIOS — ViveSano
// Notificaciones de comida con horarios personalizables
// ============================================================

const REC_DEFAULT = [
  { id: "desayuno",    emoji: "🌅", label: "Desayuno",      hora: "07:30", activo: true  },
  { id: "once_manana", emoji: "🍎", label: "Onces mañana",  hora: "10:30", activo: false },
  { id: "almuerzo",    emoji: "☀️", label: "Almuerzo",      hora: "13:00", activo: true  },
  { id: "once_tarde",  emoji: "🧁", label: "Onces tarde",   hora: "16:30", activo: false },
  { id: "cena",        emoji: "🌙", label: "Cena",          hora: "19:30", activo: true  },
];

const MENSAJES = {
  desayuno:    "¡Hora del desayuno! Empieza el día con energía 💪",
  once_manana: "¡Hora de tus onces! Un snack saludable te espera 🍎",
  almuerzo:    "¡Hora del almuerzo! Recarga energías para la tarde ☀️",
  once_tarde:  "¡Merienda! Mantén tu metabolismo activo 🧁",
  cena:        "¡Hora de cenar! Una cena liviana es lo ideal 🌙",
};

// ─── Cargar / guardar configuración ─────────────────────────
function cargarConfig() {
  const guardado = localStorage.getItem("recordatorios");
  if (!guardado) return REC_DEFAULT.map(r => ({ ...r }));
  try {
    const parsed = JSON.parse(guardado);
    // Merge con defaults para no perder nuevas entradas
    return REC_DEFAULT.map(def => {
      const saved = parsed.find(p => p.id === def.id);
      return saved ? { ...def, ...saved } : { ...def };
    });
  } catch { return REC_DEFAULT.map(r => ({ ...r })); }
}

function guardarConfig(config) {
  localStorage.setItem("recordatorios", JSON.stringify(config));
}

// ─── Renderizar lista de recordatorios ───────────────────────
function renderRecordatorios() {
  const lista = document.getElementById("rec-lista");
  if (!lista) return;

  const config = cargarConfig();

  lista.innerHTML = config.map(r => `
    <div class="rec-card" id="reccard-${r.id}">
      <span class="rec-emoji">${r.emoji}</span>
      <div class="rec-info">
        <span class="rec-nombre">${r.label}</span>
        <div class="rec-hora-wrap">
          <span class="rec-hora-label">Hora:</span>
          <input type="time" class="rec-time" id="hora-${r.id}" value="${r.hora}"
                 onchange="actualizarHora('${r.id}', this.value)">
        </div>
      </div>
      <div class="rec-toggle-wrap">
        <input type="checkbox" class="rec-toggle" id="toggle-${r.id}"
               ${r.activo ? "checked" : ""}
               onchange="actualizarToggle('${r.id}', this.checked)">
      </div>
    </div>`).join("");

  renderProximos(config);
}

// ─── Vista previa: próximos recordatorios del día ────────────
function renderProximos(config) {
  const cont = document.getElementById("rec-proximos-lista");
  if (!cont) return;

  const ahora = new Date();
  const hmActual = ahora.getHours() * 60 + ahora.getMinutes();

  // Ordenar por hora
  const ordenados = [...config].sort((a, b) => {
    const [ah, am] = a.hora.split(":").map(Number);
    const [bh, bm] = b.hora.split(":").map(Number);
    return (ah * 60 + am) - (bh * 60 + bm);
  });

  cont.innerHTML = ordenados.map(r => {
    if (!r.activo) return `
      <div class="rec-prox-item">
        <span class="rec-prox-hora">${r.hora}</span>
        <span>${r.emoji} ${r.label}</span>
        <span class="rec-prox-apagado">· apagado</span>
      </div>`;
    const [h, m] = r.hora.split(":").map(Number);
    const hm = h * 60 + m;
    const restMin = hm >= hmActual ? hm - hmActual : (24 * 60 - hmActual + hm);
    const restTxt = restMin < 60
      ? `en ${restMin} min`
      : restMin < 1440 ? `en ${Math.floor(restMin / 60)}h ${restMin % 60 > 0 ? restMin % 60 + "min" : ""}`.trim()
      : "";
    return `
      <div class="rec-prox-item">
        <span class="rec-prox-hora">${r.hora}</span>
        <span>${r.emoji} ${r.label}</span>
        <span style="margin-left:auto;font-size:11px;color:#888">${restTxt}</span>
      </div>`;
  }).join("");
}

// ─── Actualizar hora de un recordatorio ─────────────────────
function actualizarHora(id, hora) {
  const config = cargarConfig();
  const item = config.find(r => r.id === id);
  if (item) { item.hora = hora; guardarConfig(config); renderProximos(config); }
}

// ─── Actualizar toggle de un recordatorio ───────────────────
function actualizarToggle(id, activo) {
  const config = cargarConfig();
  const item = config.find(r => r.id === id);
  if (item) { item.activo = activo; guardarConfig(config); renderProximos(config); }
}

// ─── Guardar todo (botón) ────────────────────────────────────
function guardarRecordatorios() {
  const config = cargarConfig();
  // Re-leer todos los valores del DOM
  config.forEach(r => {
    const inp  = document.getElementById(`hora-${r.id}`);
    const tog  = document.getElementById(`toggle-${r.id}`);
    if (inp) r.hora   = inp.value;
    if (tog) r.activo = tog.checked;
  });
  guardarConfig(config);

  const btn = document.getElementById("btn-guardar-rec");
  if (btn) {
    btn.textContent = "✓ Recordatorios guardados";
    btn.classList.add("ok");
    setTimeout(() => {
      btn.textContent = "💾 Guardar recordatorios";
      btn.classList.remove("ok");
    }, 2500);
  }
  renderProximos(config);
}

// ─── Permiso de notificaciones ───────────────────────────────
function renderPermiso() {
  const card = document.getElementById("rec-permiso");
  if (!card) return;

  const estado = "Notification" in window ? Notification.permission : "no-soportado";

  if (estado === "granted") {
    card.className = "rec-permiso-card concedido";
    card.innerHTML = `
      <span class="rec-permiso-ico">✅</span>
      <div class="rec-permiso-txt">
        <h3>Notificaciones activadas</h3>
        <p>Recibirás alertas en los horarios que elijas, mientras el navegador esté abierto.</p>
      </div>`;
  } else if (estado === "denied") {
    card.className = "rec-permiso-card denegado";
    card.innerHTML = `
      <span class="rec-permiso-ico">🔕</span>
      <div class="rec-permiso-txt">
        <h3>Notificaciones bloqueadas</h3>
        <p>Ve a la configuración de tu navegador → Privacidad → Notificaciones y permite ViveSano.</p>
      </div>`;
  } else if (estado === "no-soportado") {
    card.className = "rec-permiso-card denegado";
    card.innerHTML = `
      <span class="rec-permiso-ico">⚠️</span>
      <div class="rec-permiso-txt">
        <h3>Notificaciones no disponibles</h3>
        <p>Tu navegador no soporta notificaciones. Prueba Chrome, Edge o Firefox.</p>
      </div>`;
  } else {
    card.className = "rec-permiso-card pendiente";
    card.innerHTML = `
      <span class="rec-permiso-ico">🔔</span>
      <div class="rec-permiso-txt">
        <h3>Activar notificaciones</h3>
        <p>Permite que ViveSano te recuerde cuándo es hora de comer.</p>
        <button class="btn-permiso" onclick="solicitarPermiso()">Activar notificaciones</button>
      </div>`;
  }
}

async function solicitarPermiso() {
  if (!("Notification" in window)) return;
  const resultado = await Notification.requestPermission();
  renderPermiso();
  if (resultado === "granted") {
    // Notificación de bienvenida
    new Notification("ViveSano 🥗", {
      body: "¡Listo! Te avisaremos cuando sea hora de comer.",
      icon: _iconoUrl(),
    });
  }
}

function _iconoUrl() {
  try {
    return new URL("assets/img/logofondoblanco.png", location.href).href;
  } catch { return ""; }
}

// ─── Enviar notificación de prueba ───────────────────────────
function notificacionPrueba() {
  if (Notification.permission !== "granted") {
    alert("Primero activa las notificaciones.");
    return;
  }
  new Notification("ViveSano 🥗 — Prueba", {
    body: "¡Funciona! Así te avisaremos cuando sea hora de comer 🍽️",
    icon: _iconoUrl(),
  });
}

// ─── Init de la página ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderPermiso();
  renderRecordatorios();
});
