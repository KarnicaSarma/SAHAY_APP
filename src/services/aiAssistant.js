// SAHAY Assist AI Service - Operational Assistant for Helplines & Officers
// Responsible AI Rules: No medical diagnoses, no legal verdicts, human-in-the-loop guidance only.

export function querySahayAssistant(promptText, currentCase = null) {
  const query = promptText.toLowerCase();

  if (query.includes("svi") || query.includes("score") || query.includes("index")) {
    return {
      text: "The Stress Vulnerability Index (SVI) is a numerical indicator (0–100) combining voice dynamics, threat vocabulary, and context urgency. An SVI of 84 indicates 'HIGH ATTENTION' requiring immediate human counsellor review. It is NOT a medical diagnosis of PTSD or mental illness.",
      type: "info"
    };
  }

  if (query.includes("why") || query.includes("flag") || query.includes("reason")) {
    if (currentCase) {
      return {
        text: `Case ${currentCase.id} was flagged because of: ${currentCase.factors.join("; ")}. Model confidence is ${currentCase.confidence}%.`,
        type: "explanation"
      };
    }
    return {
      text: "Cases are flagged based on detected threat keywords, speech rate variations, prolonged response pauses, and safety concerns. All flags require human verification before action.",
      type: "explanation"
    };
  }

  if (query.includes("support") || query.includes("option") || query.includes("pathway")) {
    return {
      text: "SAHAY provides 7 support pathways: Psychosocial Counselling, Free Legal Aid, Emergency Medical Support, One Stop Crisis Centre Shelter, Police Protection Escalation, Rehabilitation Services, and Helpline Follow-ups.",
      type: "support"
    };
  }

  if (query.includes("translate") || query.includes("hindi") || query.includes("language")) {
    if (currentCase) {
      return {
        text: `Original (${currentCase.language}): "${currentCase.transcript}"\n\nTranslated (Hindi): "${currentCase.translatedText}"\n\nContext & emotional tone preserved during translation.`,
        type: "translation"
      };
    }
    return {
      text: "SAHAY supports 12 major Indian languages and regional code-switching (e.g., Assamese+Hindi, Hindi+English).",
      type: "translation"
    };
  }

  if (query.includes("collected") || query.includes("repetition") || query.includes("skipped")) {
    return {
      text: "To avoid re-traumatizing victims, SAHAY checks existing records. In current sessions, up to 4 repetitive questions (such as caller location and incident history) are automatically skipped.",
      type: "privacy"
    };
  }

  // Default response
  return {
    text: "I am SAHAY Assist, an AI operational helper for helpline officers. I can explain SVI indicators, summarize flagged case triggers, display regional translations, or outline available support pathways. Final decisions remain strictly with authorized human personnel.",
    type: "general"
  };
}
