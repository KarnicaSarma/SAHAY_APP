// SAHAY Assessment Engine - Multimodal Fusion Algorithm (Mock Engine for Local Demo)
// STRICT NON-DIAGNOSTIC POLICY: Produces indicator scores and confidence metrics, NOT psychiatric or medical diagnoses.

export function calculateAssessment({ transcript = "", language = "Hindi", audioMetrics = {}, caseContext = {} }) {
  const textLower = transcript.toLowerCase();

  // 1. Text Threat & Danger Keyword Analysis
  let dangerScore = 0;
  let fearScore = 0;
  let intimidationScore = 0;
  let isolationScore = 0;
  let urgencyScore = 0;

  // Keyword flags (Multi-lingual seeds)
  const dangerKeywords = ["dhamki", "threat", "marna", "kill", "bachao", "save", "bandho", "locked", "maar", "danger", "police"];
  const fearKeywords = ["darr", "scared", "fear", "voy", "voy paisu", "bhay", "ghabra", "panic"];
  const intimidationKeywords = ["complaint wapas", "withdraw", "retaliate", "workplace", "unhone kaha", "pressuring"];
  const isolationKeywords = ["koi nahi", "alone", "kothao jete parchi na", "no one", "help", "ghar par sab"];

  dangerKeywords.forEach(k => { if (textLower.includes(k)) dangerScore += 25; });
  fearKeywords.forEach(k => { if (textLower.includes(k)) fearScore += 22; });
  intimidationKeywords.forEach(k => { if (textLower.includes(k)) intimidationScore += 24; });
  isolationKeywords.forEach(k => { if (textLower.includes(k)) isolationScore += 20; });

  // 2. Audio & Speech Pattern Signals
  let pauseBonus = audioMetrics.pauseLength?.includes("Extended") || audioMetrics.pauseLength?.includes("Irregular") ? 18 : 5;
  let pitchBonus = audioMetrics.pitchVar?.includes("High") || audioMetrics.pitchVar?.includes("Extreme") ? 20 : 8;
  let rateBonus = audioMetrics.speechRate?.includes("Rapid") || audioMetrics.speechRate?.includes("Distressed") ? 15 : 6;

  // 3. Multimodal Fusion Calculation
  let baseSVI = Math.min(98, Math.max(15, (dangerScore * 0.35) + (fearScore * 0.25) + (intimidationScore * 0.20) + pauseBonus + pitchBonus + rateBonus));
  const finalSVI = Math.round(baseSVI);

  // Determine Risk Category
  let category = "LOW";
  if (finalSVI >= 76) category = "CRITICAL";
  else if (finalSVI >= 51) category = "HIGH";
  else if (finalSVI >= 26) category = "MODERATE";

  // Trauma Fingerprint Values (0-100)
  const traumaFingerprint = [
    { subject: "Fear", A: Math.min(99, fearScore + 40), fullMark: 100 },
    { subject: "Distress", A: Math.min(99, Math.round(finalSVI * 0.9)), fullMark: 100 },
    { subject: "Intimidation", A: Math.min(99, intimidationScore + 35), fullMark: 100 },
    { subject: "Isolation", A: Math.min(99, isolationScore + 30), fullMark: 100 },
    { subject: "Urgency", A: Math.min(99, dangerScore + 38), fullMark: 100 },
    { subject: "Overload", A: Math.min(99, Math.round(finalSVI * 0.85)), fullMark: 100 },
    { subject: "Safety Concern", A: Math.min(99, Math.round(finalSVI * 0.95)), fullMark: 100 }
  ];

  // Silent Distress Indicators
  const silentDistress = [];
  if (pauseBonus > 10) silentDistress.push("Prolonged response pauses detected between sensitive sentences");
  if (pitchBonus > 10) silentDistress.push("Unusual pitch instability and vocal tremor recorded");
  if (transcript.includes("...")) silentDistress.push("Repeated hesitation and sentence fragmentation detected");
  if (silentDistress.length === 0) silentDistress.push("No obvious non-verbal distress anomalies observed");

  // Factors Explanation
  const factors = [];
  if (dangerScore > 0) factors.push("Safety or threat-related phrasing identified in transcript");
  if (fearScore > 0) factors.push("Repeated fear expressions and panic vocal cues");
  if (pauseBonus > 10) factors.push("Significant speech-rate variation & response latency");
  if (finalSVI >= 76) factors.push("Immediate safety concern flag raised by Multimodal Fusion");
  if (factors.length === 0) factors.push("Baseline conversational stress indicators evaluated");

  // Confidence & Uncertainty
  const confidence = Math.min(95, Math.max(72, 80 + (transcript.length > 30 ? 8 : 0)));
  const uncertaintyFactors = [];
  if (transcript.length < 25) uncertaintyFactors.push("Short transcript duration reduces model certainty");
  if (language.includes("+")) uncertaintyFactors.push("Multilingual code-switching speech patterns active");
  if (uncertaintyFactors.length === 0) uncertaintyFactors.push("Environmental line jitter / background noise variance");

  return {
    svi: finalSVI,
    riskCategory: category,
    traumaFingerprint,
    silentDistress,
    factors,
    confidence,
    uncertaintyFactors
  };
}
