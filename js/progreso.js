// ============================================================
// PROGRESO DE PESO — ViveSano
// Registro, historial y gráfica de evolución de peso
// ============================================================

const LS_KEY = "pesosHistorial";

// ─── CRUD localStorage ───────────────────────────────────────
function cargarPesos() {
  const datos = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  return datos.sort((a, b) => a.fechaISO.localeCompare(b.fechaISO));
}

function guardarPesos(datos) {
  localStorage.setItem(LS_KEY, JSON.stringify(datos));
}

function registrarPeso() {
  const pesoInp = document.getElementById("inp-peso-reg");
  const fechaInp = document.getElementById("inp-fecha-peso");
  const notaInp = document.getElementById("inp-nota-peso");
  const msg = document.getElementById("prog-form-msg");

  const pesoVal = parseFloat(pesoInp.value);
  const fechaISO = fechaInp.value;
  if (!pesoVal || pesoVal < 20 || pesoVal > 400) {
    mostrarMsg(msg, "Ingresa un peso válido (20–400 kg)", "error");
    return;
  }
  if (!fechaISO) {
    mostrarMsg(msg, "Selecciona una fecha", "error");
    return;
  }

  const datos = cargarPesos();

  // Si ya hay un registro del mismo día, preguntar si reemplazar
  const existIdx = datos.findIndex(d => d.fechaISO === fechaISO);
  const nuevoItem = {
    id:       `${fechaISO}_${Date.now()}`,
    fechaISO,
    fecha:    formatFecha(fechaISO),
    peso:     pesoVal,
    nota:     notaInp.value.trim(),
  };

  if (existIdx >= 0) {
    datos[existIdx] = nuevoItem;
  } else {
    datos.push(nuevoItem);
  }

  guardarPesos(datos);
  pesoInp.value = "";
  notaInp.value = "";
  mostrarMsg(msg, "✓ Peso registrado", "ok");
  renderTodo();
}

function borrarPeso(id) {
  const datos = cargarPesos().filter(d => d.id !== id);
  guardarPesos(datos);
  renderTodo();
}

// ─── Formatear fecha ISO a texto legible ─────────────────────
function formatFecha(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}

// ─── Stats ───────────────────────────────────────────────────
function renderStats(datos) {
  const usuario = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
  const objetivo = usuario.objetivo || "mantener";

  // Peso inicial: primer registro, o datosUsuario.peso si no hay registros
  const pesoInicial = datos.length > 0
    ? datos[0].peso
    : (usuario.peso || null);
  const pesoActual = datos.length > 0
    ? datos[datos.length - 1].peso
    : (usuario.peso || null);

  const cambio = (pesoInicial != null && pesoActual != null)
    ? +(pesoActual - pesoInicial).toFixed(1)
    : null;

  // Determinar si el cambio va en la dirección correcta
  const esPositivo = objetivo === "masa"
    ? cambio > 0
    : objetivo === "bajar"
      ? cambio < 0
      : true; // mantener/tonificar → siempre neutral

  const cambioClass = cambio === null ? "" : cambio < 0 ? "positivo" : cambio > 0 ? "negativo" : "neutro";
  const cambioStr = cambio === null ? "—"
    : cambio > 0 ? `+${cambio} kg`
    : cambio < 0 ? `${cambio} kg`
    : "= 0 kg";

  // IMC
  let imcHTML = `<span class="prog-stat-val">—</span><span class="prog-stat-lbl">Sin estatura</span>`;
  if (pesoActual && usuario.estatura) {
    const imc = pesoActual / Math.pow(usuario.estatura / 100, 2);
    const imcRound = imc.toFixed(1);
    const { cat, cls } = imcCategoria(imc);
    imcHTML = `<span class="prog-stat-val ${cls}">${imcRound}</span>
               <span class="prog-stat-lbl">IMC</span>
               <span class="prog-stat-sub ${cls}">${cat}</span>`;
  }

  const ETIQ_OBJ = { bajar:"Bajar grasa 🥗", masa:"Ganar músculo 💪", tonificar:"Tonificar ✨", mantener:"Mantener ⚖️" };

  document.getElementById("prog-stats").innerHTML = `
    <div class="prog-stat">
      <span class="prog-stat-ico">📍</span>
      <span class="prog-stat-val">${pesoInicial != null ? pesoInicial + " kg" : "—"}</span>
      <span class="prog-stat-lbl">Peso inicial</span>
    </div>
    <div class="prog-stat">
      <span class="prog-stat-ico">⚖️</span>
      <span class="prog-stat-val">${pesoActual != null ? pesoActual + " kg" : "—"}</span>
      <span class="prog-stat-lbl">Peso actual</span>
    </div>
    <div class="prog-stat ${cambioClass}">
      <span class="prog-stat-ico">${cambio < 0 ? "📉" : cambio > 0 ? "📈" : "➡️"}</span>
      <span class="prog-stat-val">${cambioStr}</span>
      <span class="prog-stat-lbl">Cambio total</span>
    </div>
    <div class="prog-stat">
      ${imcHTML}
    </div>`;

  document.getElementById("prog-objetivo").innerHTML =
    `<span>🎯</span> Objetivo: <strong>${ETIQ_OBJ[objetivo] || objetivo}</strong>
     ${datos.length >= 2 && cambio !== null
       ? `&nbsp;·&nbsp; <span style="color:${esPositivo ? "#2e7d32" : "#e53935"}">${esPositivo ? "¡Vas por buen camino!" : "Revisa tu plan"}</span>`
       : ""}`;
}

function imcCategoria(imc) {
  if (imc < 18.5) return { cat: "Bajo peso",  cls: "imc-bajo" };
  if (imc < 25)   return { cat: "Normal",      cls: "imc-normal" };
  if (imc < 30)   return { cat: "Sobrepeso",   cls: "imc-sobrepeso" };
  return              { cat: "Obesidad",    cls: "imc-obesidad" };
}

// ─── Gráfica SVG ─────────────────────────────────────────────
function renderChart(datos) {
  const wrap = document.getElementById("prog-chart-wrap");
  if (!wrap) return;

  if (datos.length < 2) {
    wrap.innerHTML = `<div class="chart-empty">
      <span>📊</span>
      <p>Registra al menos 2 pesajes para ver tu gráfica de evolución</p>
    </div>`;
    return;
  }

  // Dimensiones
  const W = 400, H = 200;
  const padL = 42, padR = 12, padT = 14, padB = 26;
  const cW = W - padL - padR;
  const cH = H - padT - padB;

  // Escala
  const pesos = datos.map(d => d.peso);
  const minP  = Math.min(...pesos);
  const maxP  = Math.max(...pesos);
  const rango = maxP - minP || 1;
  const yMin  = minP - rango * 0.18;
  const yMax  = maxP + rango * 0.18;
  const yRng  = yMax - yMin;

  const n = datos.length;
  const xp = i => padL + (n > 1 ? (i / (n - 1)) * cW : cW / 2);
  const yp = v => padT + cH - ((v - yMin) / yRng) * cH;

  // Construcción de paths
  const linePts = datos.map((d, i) => `${xp(i).toFixed(1)},${yp(d.peso).toFixed(1)}`);
  const lineD = linePts.map((p, i) => `${i === 0 ? "M" : "L"} ${p}`).join(" ");
  const botY  = (padT + cH).toFixed(1);
  const areaD = `${lineD} L ${xp(n-1).toFixed(1)},${botY} L ${xp(0).toFixed(1)},${botY} Z`;

  // Líneas de cuadrícula horizontales
  const niveles = 4;
  const grid = Array.from({ length: niveles + 1 }, (_, i) => {
    const frac = i / niveles;
    const val  = yMax - frac * yRng;
    const yy   = yp(val).toFixed(1);
    return `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="#f0f4f0" stroke-width="1"/>
            <text x="${padL - 3}" y="${(parseFloat(yy) + 3.5).toFixed(1)}" text-anchor="end" font-size="8" fill="#ccc">${val.toFixed(1)}</text>`;
  }).join("");

  // Etiquetas del eje X (máx 6)
  const step = Math.max(1, Math.ceil(n / 6));
  const xLabels = datos
    .map((d, i) => ({ d, i }))
    .filter(({ i }) => i % step === 0 || i === n - 1)
    .map(({ d, i }) => {
      const label = d.fechaISO.slice(5).replace("-", "/");
      return `<text x="${xp(i).toFixed(1)}" y="${H - 3}" text-anchor="middle" font-size="8" fill="#bbb">${label}</text>`;
    }).join("");

  // Puntos interactivos
  const dots = datos.map((d, i) => {
    const cx  = xp(i).toFixed(1);
    const cy  = yp(d.peso).toFixed(1);
    const big = i === 0 || i === n - 1;
    const fill = i === n - 1 ? "#2e7d32" : "white";
    return `<circle cx="${cx}" cy="${cy}" r="${big ? 5 : 3.5}"
                    fill="${fill}" stroke="#2e7d32" stroke-width="2">
              <title>${d.fecha}: ${d.peso} kg${d.nota ? " · " + d.nota : ""}</title>
            </circle>`;
  }).join("");

  // Etiquetas del primer y último punto
  const labelFirst = `<text x="${xp(0).toFixed(1)}" y="${(yp(datos[0].peso) - 8).toFixed(1)}"
                            text-anchor="middle" font-size="8.5" fill="#888" font-weight="600">${datos[0].peso}</text>`;
  const labelLast  = n > 1
    ? `<text x="${xp(n-1).toFixed(1)}" y="${(yp(datos[n-1].peso) - 8).toFixed(1)}"
                text-anchor="middle" font-size="8.5" fill="#2e7d32" font-weight="700">${datos[n-1].peso}</text>`
    : "";

  wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">
    <defs>
      <linearGradient id="pesoGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4caf50" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#4caf50" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    ${grid}
    <path d="${areaD}" fill="url(#pesoGrad)"/>
    <path d="${lineD}" fill="none" stroke="#2e7d32" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}
    ${labelFirst}${labelLast}
    ${xLabels}
  </svg>`;
}

// ─── Historial de pesajes ─────────────────────────────────────
function renderHistorial(datos) {
  const cont = document.getElementById("prog-hist-lista");
  if (!cont) return;

  if (!datos.length) {
    cont.innerHTML = `<div class="prog-hist-vacio">
      Aún no has registrado ningún pesaje.<br>
      Usa el formulario de arriba para empezar tu seguimiento.
    </div>`;
    document.getElementById("prog-hist-count").textContent = "0 registros";
    return;
  }

  document.getElementById("prog-hist-count").textContent = `${datos.length} registro${datos.length > 1 ? "s" : ""}`;

  // Mostrar de más reciente a más antiguo
  const invertido = [...datos].reverse();

  cont.innerHTML = invertido.map((d, i) => {
    // Delta respecto al anterior (en orden cronológico)
    const idxReal = datos.indexOf(d);
    const prev = idxReal > 0 ? datos[idxReal - 1] : null;
    let deltaHTML = "";
    if (prev) {
      const diff = +(d.peso - prev.peso).toFixed(1);
      const cls  = diff < 0 ? "baja" : diff > 0 ? "sube" : "igual";
      const sym  = diff < 0 ? "↓" : diff > 0 ? "↑" : "=";
      deltaHTML  = `<span class="prog-delta ${cls}">${sym} ${Math.abs(diff)} kg</span>`;
    }

    return `
      <div class="prog-hist-item">
        <span class="prog-hist-fecha">${d.fecha}</span>
        <span class="prog-hist-peso">${d.peso}<span> kg</span></span>
        ${deltaHTML}
        ${d.nota ? `<span class="prog-hist-nota">${d.nota}</span>` : ""}
        <button class="btn-del-peso" onclick="borrarPeso('${d.id}')" title="Borrar registro">🗑️</button>
      </div>`;
  }).join("");
}

// ─── Render completo ─────────────────────────────────────────
function renderTodo() {
  const datos = cargarPesos();
  renderStats(datos);
  renderChart(datos);
  renderHistorial(datos);
}

// ─── Mensaje del formulario ──────────────────────────────────
function mostrarMsg(el, txt, tipo) {
  el.textContent = txt;
  el.className = `prog-form-msg ${tipo}`;
  setTimeout(() => { el.textContent = ""; el.className = "prog-form-msg"; }, 3500);
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Fecha por defecto = hoy
  const hoy = new Date().toISOString().slice(0, 10);
  const fechaInp = document.getElementById("inp-fecha-peso");
  if (fechaInp) fechaInp.value = hoy;

  // Pre-rellenar peso con el último registrado
  const datos = cargarPesos();
  if (datos.length > 0) {
    const ultimo = datos[datos.length - 1].peso;
    const pesoInp = document.getElementById("inp-peso-reg");
    if (pesoInp) pesoInp.placeholder = `Último: ${ultimo} kg`;
  }

  renderTodo();
});
