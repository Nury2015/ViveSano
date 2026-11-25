// ============================================================
// FAMILIA — para cuántas personas se cocina
// Las recetas están calculadas para 1 persona. Aquí solo cambia cuánto
// se cocina; la porción y las calorías del usuario no cambian.
// ============================================================
const Familia = (() => {
  // La dieta es solo para mayores de 18. Los niños no llevan dieta ni cantidades:
  // 0.7 de porción es solo un estimado de cuánta comida preparar.
  const GRUPOS = [
    { id: "adultos", label: "Adultos", nota: "contándote a ti y a los adolescentes", factor: 1, min: 1 },
    { id: "ninos", label: "Niños", nota: "no hacen dieta: comen según su hambre", factor: 0.7, min: 0 },
  ];
  const MAX = 12;

  function leer() {
    let f = {};
    try { f = JSON.parse(localStorage.getItem("familia")) || {}; } catch (e) {}
    if (f.ninos === undefined) f.ninos = (f.n1 || 0) + (f.n4 || 0) + (f.n9 || 0);   // formato anterior
    return Object.fromEntries(GRUPOS.map(g => [g.id, Math.min(MAX, Math.max(g.min, parseInt(f[g.id]) || 0))]));
  }
  const personas = () => Object.values(leer()).reduce((a, b) => a + b, 0);
  const hayNinos = () => personas() > leer().adultos;
  function factor() {
    const f = leer();
    return GRUPOS.reduce((s, g) => s + f[g.id] * g.factor, 0);
  }

  // Avisos según la receta y quiénes comen
  function avisos(ingredientes) {
    if (personas() === 1) return [];
    const a = [], nombres = (ingredientes || []).map(i => i.nombre).join(" | ");
    let d = {};
    try { d = JSON.parse(localStorage.getItem("datosUsuario")) || {}; } catch (e) {}
    if (d.enfermedad && d.enfermedad !== "ninguna")
      a.push("Esta receta está ajustada a tu condición. Los demás no necesitan tus restricciones" +
        (d.enfermedad === "renal" ? ", sobre todo la de proteína: sírveles más carne, huevo o granos." : ": pueden comer más acompañamiento si tienen hambre."));
    else if (d.objetivo === "bajar")
      a.push("Tu porción está pensada para bajar de peso. Los demás pueden servirse más si tienen hambre.");
    if (hayNinos()) {
      a.push("Los niños no hacen dieta: sírveles comida variada y deja que coman según su hambre.");
      if (/caf[eé]|tinto/i.test(nombres)) a.push("A los niños no les des café ni tinto: dales agua o leche.");
      if (/ají/i.test(nombres)) a.push("Sirve la porción de los niños antes de agregar el ají.");
      if (/man[ií](?!z)|nueces|granola/i.test(nombres)) a.push("No les des maní, nueces ni granola en trozos a menores de 5 años: se pueden atragantar.");
    }
    return a;
  }

  function selector(alCambiar) {
    const caja = document.createElement("div");
    caja.className = "familia";
    const pintar = () => {
      const f = leer();
      caja.innerHTML = `<p class="familia-titulo">👨‍👩‍👧 ¿Para cuántos vas a cocinar?</p>` + GRUPOS.map(g => `
        <div class="familia-fila">
          <span class="familia-label">${g.label}<small>${g.nota}</small></span>
          <button type="button" data-g="${g.id}" data-d="-1" aria-label="Quitar: ${g.label}" ${f[g.id] <= g.min ? "disabled" : ""}>−</button>
          <output aria-live="polite">${f[g.id]}</output>
          <button type="button" data-g="${g.id}" data-d="1" aria-label="Agregar: ${g.label}" ${f[g.id] >= MAX ? "disabled" : ""}>+</button>
        </div>`).join("");
    };
    caja.addEventListener("click", e => {
      e.stopPropagation();
      const b = e.target.closest("button");
      if (!b) return;
      const f = leer();
      f[b.dataset.g] += +b.dataset.d;
      localStorage.setItem("familia", JSON.stringify(f));
      pintar();
      caja.querySelector(`[data-g="${b.dataset.g}"][data-d="${b.dataset.d}"]:not(:disabled)`)?.focus();
      alCambiar();
    });
    pintar();
    return caja;
  }

  return { GRUPOS, leer, personas, factor, avisos, selector };
})();
