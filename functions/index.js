const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret }       = require("firebase-functions/params");
const Anthropic               = require("@anthropic-ai/sdk");

// La API key se guarda como Secret en Firebase (nunca en el código)
const anthropicKey = defineSecret("ANTHROPIC_API_KEY");

// ──────────────────────────────────────────────────────────────
// ANALIZAR PLATO  –  recibe imagen base64 + perfil del usuario
// ──────────────────────────────────────────────────────────────
exports.analizarPlato = onCall(
  { secrets: [anthropicKey], region: "us-central1" },
  async (request) => {
    const { imagenBase64, mediaType = "image/jpeg", perfilUsuario = {} } = request.data;

    if (!imagenBase64) {
      throw new HttpsError("invalid-argument", "Se requiere una imagen.");
    }

    // Construir contexto del perfil
    const ETIQ_ENF = {
      diabetes: "Diabetes", hipertension: "Hipertensión", colesterol: "Colesterol alto",
      obesidad: "Obesidad", celiaquia: "Celiaquía", tiroides: "Tiroides",
      renal: "Enfermedad renal", cardiaca: "Cardiovascular", digestiva: "Problemas digestivos",
      gastritis: "Gastritis", ninguna: null,
    };
    const ETIQ_OBJ = {
      bajar: "bajar grasa", masa: "ganar masa muscular",
      tonificar: "tonificar / definir", mantener: "mantener el peso",
    };

    const lineas = [];
    if (perfilUsuario.enfermedad && perfilUsuario.enfermedad !== "ninguna")
      lineas.push(`- Condición médica: ${ETIQ_ENF[perfilUsuario.enfermedad] || perfilUsuario.enfermedad}`);
    if (perfilUsuario.objetivo)
      lineas.push(`- Objetivo: ${ETIQ_OBJ[perfilUsuario.objetivo] || perfilUsuario.objetivo}`);
    if (perfilUsuario.condicion === "embarazo")
      lineas.push(`- Está embarazada (trimestre ${perfilUsuario.trimestre || 1})`);
    if (perfilUsuario.caloriasObjetivo)
      lineas.push(`- Meta calórica diaria: ${perfilUsuario.caloriasObjetivo} kcal`);
    if (perfilUsuario.vegano)
      lineas.push("- Dieta: vegana");

    const perfilTexto = lineas.length
      ? `\n\nPerfil del usuario:\n${lineas.join("\n")}`
      : "";

    const client = new Anthropic({ apiKey: anthropicKey.value() });

    const response = await client.messages.create({
      model:      "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: imagenBase64 },
          },
          {
            type: "text",
            text: `Eres un nutricionista colombiano experto. Analiza esta foto del plato de comida y responde en español, de forma amigable y concisa.${perfilTexto}

Responde EXACTAMENTE en este formato JSON (sin texto adicional fuera del JSON):

{
  "alimentos": ["alimento1", "alimento2", ...],
  "caloriasEstimadas": 450,
  "puntuacion": 7,
  "bienHecho": ["aspecto positivo 1", "aspecto positivo 2"],
  "mejoras": ["cosa a reducir o quitar", "cosa a agregar"],
  "consejo": "Un consejo personalizado corto y motivador (máx 2 oraciones)."
}

Reglas:
- caloriasEstimadas: número entero aproximado
- puntuacion: del 1 al 10 según qué tan saludable es para este usuario específico
- bienHecho: máximo 3 items
- mejoras: máximo 3 items concretos y accionables
- Si no puedes ver comida claramente, usa alimentos: ["No se detectó comida claramente"]`,
          },
        ],
      }],
    });

    // Extraer y parsear el JSON de la respuesta
    const texto = response.content[0].text.trim();
    try {
      // Eliminar posibles bloques de código markdown
      const jsonLimpio = texto.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const analisis = JSON.parse(jsonLimpio);
      return { ok: true, analisis };
    } catch {
      // Si no es JSON válido, devolver texto plano
      return { ok: true, analisis: { texto } };
    }
  }
);
