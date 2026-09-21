// SAHAY Deterministic Stress & Vulnerability Triage Engine (sbi_engine.js)
// Implements Parts 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25

/**
 * Normalizes text for regex rule checking
 */
function cleanText(str) {
  return (str || '').toLowerCase().replace(/[.,!?;:"'()\-]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Checks if a target term is preceded by a negation term within 3 words
 */
function isNegated(text, targetWord) {
  const words = cleanText(text).split(' ');
  const targetIdx = words.indexOf(targetWord);
  if (targetIdx === -1) return false;
  
  const prevSlice = words.slice(Math.max(0, targetIdx - 3), targetIdx);
  const negationTerms = ['not', 'no', 'never', 'dont', "don't", 'aint', 'free', 'without', 'no longer'];
  return prevSlice.some(w => negationTerms.includes(w));
}

/**
 * Normalizes an indicator object to ensure all 0-100 scale numerical values
 */
export function normalizeIndicators(raw = {}) {
  const norm = (val) => {
    if (typeof val !== 'number') return 0;
    if (val > 0 && val <= 1) return Math.round(val * 100);
    return Math.max(0, Math.min(100, Math.round(val)));
  };

  return {
    currentDistress: norm(raw.currentDistress),
    fear: norm(raw.fear),
    anxiety: norm(raw.anxiety),
    helplessness: norm(raw.helplessness),
    confusion: norm(raw.confusion),
    intimidation: norm(raw.intimidation),
    threat: norm(raw.threat),
    ongoingDanger: norm(raw.ongoingDanger),
    physicalHarm: norm(raw.physicalHarm),
    coercion: norm(raw.coercion),
    isolation: norm(raw.isolation),
    urgency: norm(raw.urgency),
    supportNeed: norm(raw.supportNeed),
    safetyConcern: norm(raw.safetyConcern),
    immediateDanger: norm(raw.immediateDanger),
    selfHarmRisk: norm(raw.selfHarmRisk),
    suicidalIdeation: norm(raw.suicidalIdeation),
    protectiveFactors: norm(raw.protectiveFactors),
    currentVsHistorical: raw.currentVsHistorical || 'current',
    reasoningSummary: raw.reasoningSummary || ''
  };
}

/**
 * Rule-based fallback extractor for structured 0-100 indicators if LLM is offline
 */
export function extractStructuredIndicators(statementText) {
  const text = cleanText(statementText);

  // 1. BENIGN / SAFE CONTEXT CHECK (Part 11)
  const isExplicitlyBenign = (
    /^(i am good|i am fine|i am safe|i am at home|i am okay|everything is okay|i am happy|i am relaxed|i am calm|i feel safe|we are safe|i am with my family|i have no problem|everything is fine|i am doing good|i am doing fine)$/i.test(text) ||
    /^(i am good i am at home|i am safe at home|i am safe at home and i feel relaxed|i am fine at home|everything is good at home|i am not in danger and i feel safe)$/i.test(text) ||
    (
      (/good|fine|safe|okay|happy|relaxed|calm|comfortable|peaceful|normal/i.test(text)) &&
      (/home|family|house/i.test(text)) &&
      !/threat|scared|afraid|kill|attack|hurt|danger|terrified|harass|bad|beat|weapon|gun|knife|problem|pushed|push/i.test(text)
    )
  );

  // 2. IMMEDIATE DANGER OVERRIDE PHRASES (Part 16)
  const isImmediateDanger = (
    /kill my|kill myself|suicide|end my life|hurt myself|self harm/i.test(text) ||
    /attacking me right now|outside my house right now|has a gun|has a knife|holding me hostage|against my will|active threat|he is outside|person who attacked me is outside/i.test(text)
  );

  // 3. HISTORICAL CHECK (Part 17)
  const isHistoricalOnly = (
    /was scared|was afraid|was threatened|happened yesterday|happened last week|happened last month|happened years ago|used to be/i.test(text) &&
    (/safe now|today i am safe|now i am safe|currently safe|feel safe now|safe with my family/i.test(text) || !/now|right now|currently/i.test(text))
  );

  const raw = {
    currentDistress: 0,
    fear: 0,
    anxiety: 0,
    helplessness: 0,
    confusion: 0,
    intimidation: 0,
    threat: 0,
    ongoingDanger: 0,
    physicalHarm: 0,
    coercion: 0,
    isolation: 0,
    urgency: 0,
    supportNeed: 0,
    safetyConcern: 0,
    immediateDanger: 0,
    selfHarmRisk: 0,
    suicidalIdeation: 0,
    protectiveFactors: 0,
    currentVsHistorical: isHistoricalOnly ? 'historical' : 'current',
    reasoningSummary: ''
  };

  if (isExplicitlyBenign) {
    raw.protectiveFactors = 90;
    raw.reasoningSummary = 'Statement expresses safe, calm environment with no active distress or threat.';
    return normalizeIndicators(raw);
  }

  if (isImmediateDanger) {
    raw.immediateDanger = 100;
    raw.threat = 95;
    raw.ongoingDanger = 95;
    raw.fear = 90;
    raw.currentDistress = 90;
    raw.safetyConcern = 95;
    raw.reasoningSummary = 'Explicit immediate safety threat or physical attack in progress detected.';
    return normalizeIndicators(raw);
  }

  // Helplessness & Confusion (e.g. "having a lot of problems", "don't know what to do", "pushed around")
  if (/problem|problems|trouble|don't know what to do|dont know what to do|can't figure out|how will i work|pushed|push/i.test(text)) {
    raw.helplessness = 72;
    raw.confusion = 68;
    raw.currentDistress = 58;
    raw.supportNeed = 65;
    raw.safetyConcern = 30;
  }

  // Fear & Anxiety
  if (/scared|afraid|terrified|fear|frightened/i.test(text)) {
    if (!isNegated(text, 'scared') && !isNegated(text, 'afraid') && !isNegated(text, 'fear') && !text.includes('not scared')) {
      raw.fear = /terrified|extremely/i.test(text) ? 90 : 70;
      raw.anxiety = 75;
      raw.currentDistress = Math.max(raw.currentDistress, 70);
    }
  }

  if (/anxious|distress|worried|nervous|stress|trauma|upset/i.test(text)) {
    if (!isNegated(text, 'worried') && !isNegated(text, 'anxious')) {
      raw.anxiety = Math.max(raw.anxiety, 65);
      raw.currentDistress = Math.max(raw.currentDistress, 55);
    }
  }

  // Threat & Intimidation
  if (/threat|threatened|dhamki|kill|attack|harm|hurt/i.test(text)) {
    if (!isNegated(text, 'threat')) {
      raw.threat = 85;
      raw.intimidation = 80;
      raw.safetyConcern = Math.max(raw.safetyConcern, 75);
    }
  }

  // Danger & Physical Harm
  if (/outside my house|following me|stalking|in danger|unsafe/i.test(text)) {
    if (!isNegated(text, 'danger') && !isNegated(text, 'unsafe')) {
      raw.ongoingDanger = 85;
      raw.safetyConcern = Math.max(raw.safetyConcern, 80);
    }
  }

  if (/beaten|hit|struck|physical|injury|weapon|gun|knife|cut/i.test(text)) {
    raw.physicalHarm = 80;
    raw.safetyConcern = Math.max(raw.safetyConcern, 80);
  }

  // Protective Factors
  if (/family|home|safe|police|supported|with my family|friends|relaxed|calm/i.test(text)) {
    if (/safe|with my family|supported|at home/i.test(text) && !/outside|threat/i.test(text)) {
      raw.protectiveFactors = 75;
    }
  }

  if (isHistoricalOnly) {
    raw.currentVsHistorical = 'historical';
    raw.ongoingDanger = 0;
    raw.immediateDanger = 0;
  }

  return normalizeIndicators(raw);
}

/**
 * Deterministically calculates SBI/SVI score (0–100) and Risk Level (Part 12 & 15)
 */
export function calculateSbi(rawIndicators, statementText = '') {
  const ind = normalizeIndicators(rawIndicators);

  // Immediate Action Safety Override (Part 16)
  if (ind.immediateDanger >= 80 || ind.selfHarmRisk >= 80 || ind.suicidalIdeation >= 80) {
    return {
      sbi: 92,
      svi: 92,
      riskLevel: 'CRITICAL',
      riskCategory: 'CRITICAL',
      immediateActionRequired: true,
      indicators: ind,
      factors: [
        'Immediate safety threat or explicit danger detected',
        'Priority human emergency verification triggered'
      ],
      reasoningSummary: ind.reasoningSummary || 'Explicit immediate safety concern or threat detected in statement narrative.'
    };
  }

  // Benign Check: All core distress indicators are <= 10
  const maxCoreDistress = Math.max(
    ind.currentDistress, ind.fear, ind.anxiety, ind.helplessness,
    ind.threat, ind.ongoingDanger, ind.physicalHarm, ind.safetyConcern
  );

  if (maxCoreDistress <= 10) {
    return {
      sbi: 8,
      svi: 8,
      riskLevel: 'LOW',
      riskCategory: 'LOW',
      immediateActionRequired: false,
      indicators: ind,
      factors: [
        'Current fear: None',
        'Current threat: None',
        'Current danger: None',
        'Support/safety context: Present'
      ],
      reasoningSummary: ind.reasoningSummary || 'Statement expresses safe, calm environment with no active distress or threat.'
    };
  }

  // Weighted Triage Formula (Part 12)
  const fearWeight = (ind.fear / 100) * 15;
  const anxietyWeight = (ind.anxiety / 100) * 10;
  const helplessnessWeight = (ind.helplessness / 100) * 15;
  const confusionWeight = (ind.confusion / 100) * 10;
  const threatWeight = (ind.threat / 100) * 20;
  const dangerWeight = (ind.ongoingDanger / 100) * 15;
  const harmWeight = (ind.physicalHarm / 100) * 10;
  const distressWeight = (ind.currentDistress / 100) * 15;

  let rawScore = fearWeight + anxietyWeight + helplessnessWeight + confusionWeight + threatWeight + dangerWeight + harmWeight + distressWeight;

  // Deduction for Protective Factors (up to 15 points)
  if (ind.protectiveFactors > 0) {
    rawScore -= ((ind.protectiveFactors / 100) * 15);
  }

  // Historical event mitigation (Part 17)
  if (ind.currentVsHistorical === 'historical' && ind.ongoingDanger < 30) {
    rawScore = Math.min(22, rawScore * 0.35);
  }

  const sbi = Math.round(Math.min(99, Math.max(5, rawScore)));

  // Risk Level Boundaries (Part 15)
  let riskLevel = 'LOW';
  if (sbi >= 75) riskLevel = 'CRITICAL';
  else if (sbi >= 50) riskLevel = 'HIGH';
  else if (sbi >= 25) riskLevel = 'MODERATE';

  // Construct Explainable Factors List (Part 18)
  const factors = [];
  if (ind.threat >= 50) factors.push(`Threat/Intimidation identified (${ind.threat}/100)`);
  if (ind.fear >= 50) factors.push(`Active fear/apprehension expressed (${ind.fear}/100)`);
  if (ind.helplessness >= 50) factors.push(`Helplessness/difficulty coping indicated (${ind.helplessness}/100)`);
  if (ind.confusion >= 50) factors.push(`Confusion & distress regarding situation (${ind.confusion}/100)`);
  if (ind.ongoingDanger >= 50) factors.push(`Active threat or danger presence (${ind.ongoingDanger}/100)`);
  if (ind.currentVsHistorical === 'historical') factors.push('Historical distress noted — Current situation safe');
  if (ind.protectiveFactors >= 50) factors.push('Protective safe environment / family support present');
  if (factors.length === 0) factors.push(`Intake statement evaluated (${riskLevel} severity)`);

  const reasoningSummary = ind.reasoningSummary || (
    riskLevel === 'CRITICAL' ? 'Statement indicates critical active safety threat or immediate danger.' :
    riskLevel === 'HIGH' ? 'Statement indicates severe fear, threat, or active ongoing danger.' :
    riskLevel === 'MODERATE' ? 'Statement indicates meaningful distress and difficulty understanding what to do, with no evidence of immediate physical danger.' :
    'Statement indicates low distress with no immediate safety concern.'
  );

  return {
    sbi,
    svi: sbi,
    riskLevel,
    riskCategory: riskLevel,
    immediateActionRequired: false,
    indicators: ind,
    factors,
    reasoningSummary
  };
}
