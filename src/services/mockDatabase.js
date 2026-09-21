// SAHAY Local Mock Database - 25 Mandatory Native-Language Demo Cases (SIH 2026 Official Dataset)

export const DEMO_CASES = {
  "SAHAY-001": {
    id: "SAHAY-001",
    language: "Hindi",
    languageDisplay: "Hindi (हिंदी)",
    svi: 18,
    riskCategory: "LOW",
    category: "Caste-based verbal harassment",
    problem: "Repeated caste-based verbal harassment in the neighbourhood",
    status: "New",
    timestamp: "2026-09-19 11:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "हमारे पड़ोस में कुछ लोग रोज़ हमारे परिवार को जातिसूचक शब्द बोलते हैं और मानसिक रूप से प्रताड़ित करते हैं। हम शांति से रहना चाहते हैं।",
    translatedText: "In our neighbourhood, some people daily utter casteist slurs against our family and mentally harass us. We just want to live in peace.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Normal (125 wpm)", pauseFrequency: "Low", pitchVariation: "Stable", hesitation: "Low (1 pause/min)", voiceIntensity: "Moderate" },
      text: { fearKeywords: "Low fear density", threatKeywords: "Verbal harassment terms", isolationKeywords: "Low isolation", distressKeywords: "Routine distress", urgencyKeywords: "Low urgency" },
      context: { situation: "Neighbourhood verbal dispute", duration: "2 weeks", isolationLevel: "Low", riskLevel: "Routine Support" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 20 }, { subject: "Distress", A: 35 }, { subject: "Intimidation", A: 25 },
      { subject: "Isolation", A: 15 }, { subject: "Urgency", A: 10 }, { subject: "Safety Concern", A: 18 }
    ],
    keyIndicators: [
      "Verbal harassment language detected",
      "Low speech hesitation index",
      "Stable vocal pitch contour",
      "No immediate physical threat stated"
    ],
    confidence: 94,
    dataQuality: "Good",
    humanReviewStatus: "Completed",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Routine Community Guidance", priority: "Low", assigned: "District Welfare Officer", status: "Recommended" },
      { title: "Informational Helpline Support", priority: "Low", assigned: "Helpline Desk B", status: "Active" }
    ],
    supportType: "Information"
  },

  "SAHAY-002": {
    id: "SAHAY-002",
    language: "Assamese + Hindi",
    languageDisplay: "Assamese (অসমীয়া) + Hindi Code-Switching",
    svi: 27,
    riskCategory: "MODERATE",
    category: "Post-complaint threats",
    problem: "Threats and intimidation after filing a complaint",
    status: "AI Assessment Complete",
    timestamp: "2026-09-19 12:05 PM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "Moi police taat complaint dibilu, unhone kaha ki agar case wapas nahi लिया toh hum tumhare ghar aake sab barbaad kar denge.",
    translatedText: "I filed a police complaint there, they said that if I don't withdraw the case they will come to our house and destroy everything.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Assamese", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Moderate (135 wpm)", pauseFrequency: "Moderate (3.1s)", pitchVariation: "Elevated spikes", hesitation: "Moderate", voiceIntensity: "Fluctuating" },
      text: { fearKeywords: "Threat of property damage", threatKeywords: "Retaliation keywords", isolationKeywords: "Moderate", distressKeywords: "Anxiety", urgencyKeywords: "Moderate" },
      context: { situation: "Complaint retaliation", duration: "3 days", isolationLevel: "Moderate", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 45 }, { subject: "Distress", A: 42 }, { subject: "Intimidation", A: 50 },
      { subject: "Isolation", A: 30 }, { subject: "Urgency", A: 35 }, { subject: "Safety Concern", A: 40 }
    ],
    keyIndicators: [
      "Retaliatory threat keywords matched",
      "Code-switching language shift detected",
      "Moderate voice hesitation and pitch spikes"
    ],
    confidence: 89,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Safety Verification Check", priority: "Medium", assigned: "Local Protection Officer", status: "Recommended" },
      { title: "Legal Aid Consultation", priority: "Medium", assigned: "District Legal Services Authority", status: "Pending" }
    ],
    supportType: "Safety"
  },

  "SAHAY-003": {
    id: "SAHAY-003",
    language: "Bengali",
    languageDisplay: "Bengali (বাংলা)",
    svi: 34,
    riskCategory: "MODERATE",
    category: "Social boycott",
    problem: "Social boycott by members of the local community",
    status: "Awaiting Human Review",
    timestamp: "2026-09-19 12:12 PM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "আমাদের পরিবারকে সামাজিক ভাবে একঘরে করে রাখা হয়েছে। গ্রামের দোকান থেকে রেশন বা জল নিতে দেওয়া হচ্ছে না।",
    translatedText: "Our family has been socially boycotted. We are not being allowed to get rations or water from the village store.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Slow (98 wpm)", pauseFrequency: "Prolonged pauses (4.2s)", pitchVariation: "Flat tone", hesitation: "High", voiceIntensity: "Subdued" },
      text: { fearKeywords: "Isolation expressions", threatKeywords: "Boycott terms", isolationKeywords: "Extreme community isolation", distressKeywords: "Depressive tone", urgencyKeywords: "Moderate" },
      context: { situation: "Community exclusion", duration: "1 month", isolationLevel: "High", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 38 }, { subject: "Distress", A: 55 }, { subject: "Intimidation", A: 48 },
      { subject: "Isolation", A: 78 }, { subject: "Urgency", A: 30 }, { subject: "Safety Concern", A: 42 }
    ],
    keyIndicators: [
      "Social boycott & essential denial detected",
      "High isolation indicator (78%)",
      "Subdued vocal intensity suppresses distress"
    ],
    confidence: 91,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "District Welfare Intervention", priority: "High", assigned: "District Social Welfare Officer", status: "Recommended" },
      { title: "Psychosocial Counselling", priority: "Medium", assigned: "Counselling Cell Team 2", status: "Pending" }
    ],
    supportType: "Rehabilitation"
  },

  "SAHAY-004": {
    id: "SAHAY-004",
    language: "Kannada",
    languageDisplay: "Kannada (ಕನ್ನಡ)",
    svi: 41,
    riskCategory: "MODERATE",
    category: "Workplace discrimination",
    problem: "Workplace discrimination and repeated intimidation",
    status: "Counsellor Assigned",
    timestamp: "2026-09-19 11:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ನನ್ನ ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಜಾತಿಯ ಆಧಾರದ ಮೇಲೆ ನನ್ನನ್ನು ಪದೇಪದೇ ಅವಮಾನಿಸಲಾಗುತ್ತಿದೆ. ನಾನು ಈ ವಿಷಯದ ಬಗ್ಗೆ ದೂರು ನೀಡಿದ ನಂತರ ನನಗೆ ಬೆದರಿಕೆ ಕರೆಗಳು ಬರುತ್ತಿವೆ ಮತ್ತು ಕೆಲಸಕ್ಕೆ ಹೋಗಲು ಭಯವಾಗುತ್ತಿದೆ.",
    translatedText: "I have been repeatedly humiliated at my workplace on the basis of caste. After I reported the matter, I started receiving threatening calls and I am now afraid to go to work.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Moderate (112 wpm)", pauseFrequency: "Elevated (3.5s)", pitchVariation: "Constricted", hesitation: "Elevated (4 pauses/min)", voiceIntensity: "Controlled" },
      text: { fearKeywords: "Fear of workplace return", threatKeywords: "Threatening phone calls", isolationKeywords: "Workplace exclusion", distressKeywords: "High emotional load", urgencyKeywords: "Moderate" },
      context: { situation: "Workplace intimidation", duration: "3 weeks", isolationLevel: "Moderate", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 52 }, { subject: "Distress", A: 60 }, { subject: "Intimidation", A: 65 },
      { subject: "Isolation", A: 45 }, { subject: "Urgency", A: 38 }, { subject: "Safety Concern", A: 48 }
    ],
    keyIndicators: [
      "Workplace intimidation & caste discrimination keyword match",
      "Repeated phone call threat mention",
      "Elevated speech hesitation index"
    ],
    confidence: 88,
    dataQuality: "Good",
    humanReviewStatus: "Scheduled",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Workplace Advocacy & Protection", priority: "High", assigned: "Labor & Welfare Cell", status: "Assigned" },
      { title: "Free Legal Aid Referral", priority: "Medium", assigned: "Legal Aid Panel", status: "Recommended" }
    ],
    supportType: "Counselling"
  },

  "SAHAY-005": {
    id: "SAHAY-005",
    language: "Malayalam",
    languageDisplay: "Malayalam (മലയാളം)",
    svi: 47,
    riskCategory: "MODERATE",
    category: "Fear of reporting physical violence",
    problem: "Fear of retaliation after reporting physical violence",
    status: "Support in Progress",
    timestamp: "2026-09-19 10:40 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ശാരീരിക അക്രമത്തിന് ഇരയായ ശേഷം പൊലീസിൽ പരാതി നൽകാൻ എനിക്ക് ഭയമാണ്. പരാതിപ്പെട്ടാൽ അവർ ഞങ്ങളെ വീണ്ടും ആക്രമിക്കുമെന്ന് ഭീഷണിപ്പെടുത്തുന്നു.",
    translatedText: "After being victim of physical assault, I am terrified to report to the police. They threaten that if I complain, they will attack us again.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Trembling (140 wpm)", pauseFrequency: "Short panic pauses (2.1s)", pitchVariation: "High pitch shift", hesitation: "Elevated", voiceIntensity: "Low" },
      text: { fearKeywords: "Physical violence fear", threatKeywords: "Re-attack warning", isolationKeywords: "Lack of protection", distressKeywords: "High fear", urgencyKeywords: "Moderate" },
      context: { situation: "Fear of reporting assault", duration: "1 week", isolationLevel: "Moderate", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 68 }, { subject: "Distress", A: 62 }, { subject: "Intimidation", A: 70 },
      { subject: "Isolation", A: 40 }, { subject: "Urgency", A: 45 }, { subject: "Safety Concern", A: 64 }
    ],
    keyIndicators: [
      "Physical assault & reporting fear indicator",
      "Trembling voice acoustic profile detected",
      "Explicit retaliation threat recorded"
    ],
    confidence: 90,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Protection Officer Escort & Intake", priority: "High", assigned: "District Protection Officer", status: "In Progress" },
      { title: "Psychosocial Support", priority: "High", assigned: "Trauma Counsellor Dr. Menon", status: "Assigned" }
    ],
    supportType: "Safety"
  },

  "SAHAY-006": {
    id: "SAHAY-006",
    language: "Tamil",
    languageDisplay: "Tamil (தமிழ்)",
    svi: 52,
    riskCategory: "HIGH",
    category: "Repeated harassment & threatening messages",
    problem: "Repeated harassment and threatening messages",
    status: "Awaiting Human Review",
    timestamp: "2026-09-19 10:50 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "கடந்த சில வாரங்களாக எனக்கு தொடர்ந்து மிரட்டல் செய்திகளும் தொலைபேசி அழைப்புகளும் வருகின்றன. என் குடும்பத்தின் பாதுகாப்பைப் பற்றி நான் மிகவும் பயப்படுகிறேன்.",
    translatedText: "For the past few weeks, I have been continuously receiving threatening messages and phone calls. I am extremely worried about my family's safety.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Rapid (150 wpm)", pauseFrequency: "Frequent (2.8s)", pitchVariation: "High spikes", hesitation: "High", voiceIntensity: "Fluctuating" },
      text: { fearKeywords: "Family safety anxiety", threatKeywords: "Continuous calls & messages", isolationKeywords: "Vulnerable state", distressKeywords: "Persistent anxiety", urgencyKeywords: "High" },
      context: { situation: "Continuous phone harassment", duration: "3 weeks", isolationLevel: "Moderate", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 74 }, { subject: "Distress", A: 66 }, { subject: "Intimidation", A: 78 },
      { subject: "Isolation", A: 50 }, { subject: "Urgency", A: 60 }, { subject: "Safety Concern", A: 72 }
    ],
    keyIndicators: [
      "Continuous phone & message threat matched",
      "High fear & family safety concern (74%)",
      "Rapid speech rate with high pitch spikes"
    ],
    confidence: 92,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Cyber Cell & Tele-Harassment Escalation", priority: "High", assigned: "Cyber Protection Desk", status: "Recommended" },
      { title: "Legal Aid Protection", priority: "High", assigned: "District Legal Cell", status: "Pending" }
    ],
    supportType: "Safety"
  },

  "SAHAY-007": {
    id: "SAHAY-007",
    language: "Telugu",
    languageDisplay: "Telugu (తెలుగు)",
    svi: 56,
    riskCategory: "HIGH",
    category: "Family member threat",
    problem: "Family member threatened because of the complaint",
    status: "Pending Legal Review",
    timestamp: "2026-09-19 09:00 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "నేను ఇచ్చిన ఫిర్యాదు కారణం గా నా చిన్న తమ్ముడిని దారిలో ఆపి భయపెట్టారు. కేసు వెనక్కి తీసుకోకపోతే తీవ్ర పరిణామాలు ఉంటాయని హెచ్చరించారు.",
    translatedText: "Because of the complaint I lodged, my younger brother was stopped on the way and threatened. They warned of dire consequences if the case is not withdrawn.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Moderate-Fast (145 wpm)", pauseFrequency: "Irregular (3.6s)", pitchVariation: "High variance", hesitation: "Elevated", voiceIntensity: "Strained" },
      text: { fearKeywords: "Sibling threat fear", threatKeywords: "Dire consequences warning", isolationKeywords: "Family targeted", distressKeywords: "Acute panic", urgencyKeywords: "High" },
      context: { situation: "Targeted family threat", duration: "1 day", isolationLevel: "Moderate", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 78 }, { subject: "Distress", A: 70 }, { subject: "Intimidation", A: 82 },
      { subject: "Isolation", A: 52 }, { subject: "Urgency", A: 68 }, { subject: "Safety Concern", A: 76 }
    ],
    keyIndicators: [
      "Physical obstruction & sibling threat recorded",
      "High intimidation factor (82%)",
      "Case withdrawal coercion detected"
    ],
    confidence: 89,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Witness & Family Protection Cell", priority: "High", assigned: "Protection Officer V. Reddy", status: "Action Required" },
      { title: "Legal Action & Restraining Order", priority: "High", assigned: "District Legal Services", status: "Recommended" }
    ],
    supportType: "Legal Aid"
  },

  "SAHAY-008": {
    id: "SAHAY-008",
    language: "Punjabi",
    languageDisplay: "Punjabi (ਪੰਜਾਬੀ)",
    svi: 61,
    riskCategory: "HIGH",
    category: "Displacement after community violence",
    problem: "Displacement from home following community violence",
    status: "Emergency Review",
    timestamp: "2026-09-19 09:55 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ਪਿੰਡ ਵਿੱਚ ਹੋਈ ਹਿੰਸਾ ਤੋਂ ਬਾਅਦ ਸਾਡੇ ਘਰ 'ਤੇ ਹਮਲਾ ਕੀਤਾ ਗਿਆ। ਅਸੀਂ ਆਪਣੇ ਬੱਚਿਆਂ ਨਾਲ ਦੂਜੇ ਇਲਾਕੇ ਵਿੱਚ ਸ਼ਰਨ ਲੈਣ ਲਈ ਮਜਬੂਰ ਹੋਏ ਹਾਂ।",
    translatedText: "Following violence in the village, our house was attacked. We were forced to take shelter in another area with our children.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Gasping/Fast (160 wpm)", pauseFrequency: "Short breath pauses (1.5s)", pitchVariation: "High pitch", hesitation: "Elevated", voiceIntensity: "High" },
      text: { fearKeywords: "House attack fear", threatKeywords: "Violence displacement", isolationKeywords: "Forced displacement", distressKeywords: "Children vulnerability", urgencyKeywords: "High" },
      context: { situation: "Community violence & displacement", duration: "2 days", isolationLevel: "High", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 82 }, { subject: "Distress", A: 80 }, { subject: "Intimidation", A: 85 },
      { subject: "Isolation", A: 72 }, { subject: "Urgency", A: 75 }, { subject: "Safety Concern", A: 84 }
    ],
    keyIndicators: [
      "Physical house attack & displacement statement",
      "Minor children involved in displacement",
      "High urgency index (75%)"
    ],
    confidence: 93,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Forced displacement and home attack reported. Protection review required.",
    supportRecommendations: [
      { title: "Immediate Shelter & Emergency Relief", priority: "Critical", assigned: "District Emergency Shelter", status: "Assigned" },
      { title: "Safety Protocol & Police Escort", priority: "High", assigned: "Officer H. Singh", status: "Recommended" }
    ],
    supportType: "Safety"
  },

  "SAHAY-009": {
    id: "SAHAY-009",
    language: "Gujarati",
    languageDisplay: "Gujarati (ગુજરાતી)",
    svi: 65,
    riskCategory: "HIGH",
    category: "Livelihood loss following discrimination",
    problem: "Loss of livelihood following discrimination and intimidation",
    status: "Counsellor Assigned",
    timestamp: "2026-09-19 09:40 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ભેદભાવ અને સતત ધમકીઓને કારણે મારી નાની દુકાન બંધ કરાવવામાં આવી છે. હવે મારી પાસે પરિવા૨નું ભરણપોષણ કરવા માટે કોઈ કમાણી નથી.",
    translatedText: "Due to discrimination and constant threats, my small shop was forced to close. Now I have no income left to support my family.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Slow/Muted (92 wpm)", pauseFrequency: "Extended pauses (4.5s)", pitchVariation: "Low monotone", hesitation: "Very High", voiceIntensity: "Low" },
      text: { fearKeywords: "Livelihood loss fear", threatKeywords: "Forced closure threats", isolationKeywords: "Financial isolation", distressKeywords: "Despair", urgencyKeywords: "High" },
      context: { situation: "Livelihood loss & discrimination", duration: "1 month", isolationLevel: "High", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 70 }, { subject: "Distress", A: 85 }, { subject: "Intimidation", A: 78 },
      { subject: "Isolation", A: 75 }, { subject: "Urgency", A: 62 }, { subject: "Safety Concern", A: 68 }
    ],
    keyIndicators: [
      "Forced shop closure & economic deprivation detected",
      "Extreme emotional distress & despair tone",
      "Prolonged response pauses during financial queries"
    ],
    confidence: 87,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Rehabilitation & Livelihood Relief", priority: "High", assigned: "District Social Welfare Dept", status: "Recommended" },
      { title: "Psychosocial Support Session", priority: "High", assigned: "Counsellor B. Patel", status: "Assigned" }
    ],
    supportType: "Rehabilitation"
  },

  "SAHAY-010": {
    id: "SAHAY-010",
    language: "Odia",
    languageDisplay: "Odia (ଓଡ଼ିଆ)",
    svi: 69,
    riskCategory: "HIGH",
    category: "Witness intimidation",
    problem: "Witness intimidation after agreeing to provide testimony",
    status: "Pending Legal Aid",
    timestamp: "2026-09-19 09:20 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ସାକ୍ଷୀ ଦେବାକୁ ରାଜି ହେବା ପରେ ମୋତେ ଏବଂ ମୋ ପରିବାରକୁ ଲଗାତାର ଧମକ ଦିଆଯାଉଛି। କୋର୍ଟକୁ ଗଲେ ଜୀବନରୁ ମାରିଦେବାକୁ କହୁଛନ୍ତି।",
    translatedText: "After agreeing to testify as a witness, my family and I are receiving continuous threats. They warn they will kill me if I go to court.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Trembling (138 wpm)", pauseFrequency: "Frequent (3.2s)", pitchVariation: "High pitch spikes", hesitation: "Elevated", voiceIntensity: "Strained" },
      text: { fearKeywords: "Court testimony threat", threatKeywords: "Kill warning", isolationKeywords: "Witness isolation", distressKeywords: "Severe fear", urgencyKeywords: "High" },
      context: { situation: "Witness intimidation", duration: "1 week", isolationLevel: "High", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 88 }, { subject: "Distress", A: 76 }, { subject: "Intimidation", A: 92 },
      { subject: "Isolation", A: 60 }, { subject: "Urgency", A: 78 }, { subject: "Safety Concern", A: 90 }
    ],
    keyIndicators: [
      "Explicit threat of death regarding court testimony",
      "Witness intimidation index 92%",
      "Elevated pitch spikes on 'kill warning' keywords"
    ],
    confidence: 91,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Witness intimidation with explicit harm threats. Immediate legal protection required.",
    supportRecommendations: [
      { title: "Witness Protection Protocol", priority: "Critical", assigned: "Legal Aid Off. S. Misra", status: "Pending" },
      { title: "Court Protection Order", priority: "High", assigned: "District Legal Services", status: "Recommended" }
    ],
    supportType: "Legal Aid"
  },

  "SAHAY-011": {
    id: "SAHAY-011",
    language: "Marathi + Hindi",
    languageDisplay: "Marathi (मराठी) + Hindi Code-Switching",
    svi: 73,
    riskCategory: "HIGH",
    category: "Legal delay exhaustion",
    problem: "Long-pending legal proceedings causing emotional exhaustion",
    status: "Awaiting Review",
    timestamp: "2026-09-19 07:30 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "कोर्टाचे खटले वर्षानुवर्षे प्रलंबित आहेत. आता मला खूप मानसिक त्रास होतोय, अब हिम्मत टूट रही है और कोई मदद नहीं मिल रही.",
    translatedText: "Court proceedings have been pending for years. Now I am experiencing severe emotional exhaustion, my courage is breaking and no help is arriving.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Marathi", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Slow (90 wpm)", pauseFrequency: "Prolonged (4.8s)", pitchVariation: "Low/Flat", hesitation: "Very High", voiceIntensity: "Muted" },
      text: { fearKeywords: "Exhaustion keywords", threatKeywords: "Prolonged legal delay", isolationKeywords: "No help arriving", distressKeywords: "Courage breaking", urgencyKeywords: "High" },
      context: { situation: "Legal delay & exhaustion", duration: "3 years", isolationLevel: "High", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 65 }, { subject: "Distress", A: 92 }, { subject: "Intimidation", A: 70 },
      { subject: "Isolation", A: 85 }, { subject: "Urgency", A: 68 }, { subject: "Safety Concern", A: 60 }
    ],
    keyIndicators: [
      "Severe emotional exhaustion & despair matched",
      "Distress index 92% across voice & text",
      "Code-switching during mental strain description"
    ],
    confidence: 88,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Expedited Legal Aid Review", priority: "High", assigned: "Officer M. Kulkarni", status: "Awaiting Review" },
      { title: "Trauma Counselling Support", priority: "High", assigned: "District Counsellor Panel", status: "Recommended" }
    ],
    supportType: "Legal Aid"
  },

  "SAHAY-012": {
    id: "SAHAY-012",
    language: "Kannada + Hindi",
    languageDisplay: "Kannada (ಕನ್ನಡ) + Hindi Code-Switching",
    svi: 75,
    riskCategory: "HIGH",
    category: "Known threat",
    problem: "Repeated threats from individuals known to the complainant",
    status: "Shelter Connected",
    timestamp: "2026-09-19 06:50 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ನನಗೆ ಗೊತ್ತಿರುವ ವ್ಯಕ್ತಿಗಳೇ continuously dhamki de rahe hain. ಮನೆಯಿಂದ ಹೊರಗೆ ಬರಲು ಭಯವಾಗುತ್ತಿದೆ.",
    translatedText: "Known individuals themselves are continuously threatening me. I am feeling terrified to even step outside my house.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Kannada", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Fast (155 wpm)", pauseFrequency: "Irregular (3.4s)", pitchVariation: "High pitch", hesitation: "Elevated", voiceIntensity: "Fluctuating" },
      text: { fearKeywords: "Confinement fear", threatKeywords: "Known individual threats", isolationKeywords: "Home isolation", distressKeywords: "Panic", urgencyKeywords: "High" },
      context: { situation: "Threat from known persons", duration: "2 weeks", isolationLevel: "High", riskLevel: "Priority Human Review" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 86 }, { subject: "Distress", A: 78 }, { subject: "Intimidation", A: 88 },
      { subject: "Isolation", A: 70 }, { subject: "Urgency", A: 76 }, { subject: "Safety Concern", A: 82 }
    ],
    keyIndicators: [
      "Perpetrator known to victim statement",
      "Home confinement fear keywords matched",
      "Bilingual code-switching stress shift"
    ],
    confidence: 90,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Known threat causing home isolation. Safety review required.",
    supportRecommendations: [
      { title: "Immediate Shelter Placement", priority: "High", assigned: "Officer K. Sundaram", status: "Shelter Connected" },
      { title: "Protection Order Request", priority: "High", assigned: "District Police Liaison", status: "Recommended" }
    ],
    supportType: "Safety"
  },

  "SAHAY-013": {
    id: "SAHAY-013",
    language: "Malayalam + Hindi",
    languageDisplay: "Malayalam (മലയാളം) + Hindi Code-Switching",
    svi: 77,
    riskCategory: "CRITICAL",
    category: "Sexual violence reporting fear",
    problem: "Survivor of sexual violence expressing fear about reporting",
    status: "Emergency Review",
    timestamp: "2026-09-19 06:05 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "എനിക്ക് നടന്ന അതിക്രമത്തെക്കുറിച്ച് പറയാൻ പേടിയാണ്. उन्होंने कहा है कि अगर पुलिस के पास गए तो समाज में बदनाम कर देंगे।",
    translatedText: "I am terrified to speak about the assault that happened to me. They said that if I go to the police, they will defame us in society.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Malayalam", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Whispered (85 wpm)", pauseFrequency: "Long hesitation (5.1s)", pitchVariation: "Constricted/Trembling", hesitation: "Extreme", voiceIntensity: "Whispered" },
      text: { fearKeywords: "Sexual violence trauma", threatKeywords: "Social defamation threat", isolationKeywords: "Stigma fear", distressKeywords: "Acute trauma", urgencyKeywords: "Critical" },
      context: { situation: "Sexual violence survivor", duration: "Recent", isolationLevel: "High", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 92 }, { subject: "Distress", A: 90 }, { subject: "Intimidation", A: 94 },
      { subject: "Isolation", A: 88 }, { subject: "Urgency", A: 82 }, { subject: "Safety Concern", A: 91 }
    ],
    keyIndicators: [
      "Sexual violence survivor distress markers matched",
      "Whispered vocalization & 5.1s response pauses",
      "Defamation & stigma coercion threat recorded"
    ],
    confidence: 94,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Sexual violence trauma & defamation threat. Specialized trauma unit review required.",
    supportRecommendations: [
      { title: "Specialized Sexual Assault One-Stop Centre", priority: "Critical", assigned: "One Stop Centre (OSC)", status: "Assigned" },
      { title: "Confidential Trauma Counselling", priority: "Critical", assigned: "Senior Trauma Counsellor", status: "Recommended" }
    ],
    supportType: "Counselling"
  },

  "SAHAY-014": {
    id: "SAHAY-014",
    language: "Tamil + Hindi",
    languageDisplay: "Tamil (தமிழ்) + Hindi Code-Switching",
    svi: 79,
    riskCategory: "CRITICAL",
    category: "Family isolation after caste incident",
    problem: "Family isolation following a caste-related incident",
    status: "Awaiting Review",
    timestamp: "2026-09-19 05:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "சாதி সংক্রান্ত சம்பவத்திற்குப் பிறகு எங்கள் குடும்பத்தை யாருமே பேச்சுவார்த்தைக்கு சேர்ப்பதில்லை, सबने हमसे रिश्ता तोड़ लिया है।",
    translatedText: "Following the caste-related incident, no one talks to our family anymore, everyone has severed ties with us.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Tamil", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Slow (95 wpm)", pauseFrequency: "Prolonged (4.4s)", pitchVariation: "Muted", hesitation: "Very High", voiceIntensity: "Low" },
      text: { fearKeywords: "Caste incident trauma", threatKeywords: "Community exclusion", isolationKeywords: "Severe family isolation", distressKeywords: "Heavy grief", urgencyKeywords: "Critical" },
      context: { situation: "Post-caste incident isolation", duration: "1 month", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 84 }, { subject: "Distress", A: 88 }, { subject: "Intimidation", A: 85 },
      { subject: "Isolation", A: 96 }, { subject: "Urgency", A: 78 }, { subject: "Safety Concern", A: 82 }
    ],
    keyIndicators: [
      "Severe family social severance (96% isolation)",
      "Caste-related systemic exclusion detected",
      "Depressive vocal pitch profile"
    ],
    confidence: 91,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "District Welfare & Community Protection", priority: "Critical", assigned: "Social Welfare Dept", status: "Awaiting Review" },
      { title: "Legal Rights Advocacy", priority: "High", assigned: "District Legal Services", status: "Recommended" }
    ],
    supportType: "Rehabilitation"
  },

  "SAHAY-015": {
    id: "SAHAY-015",
    language: "Telugu + Hindi",
    languageDisplay: "Telugu (తెలుగు) + Hindi Code-Switching",
    svi: 82,
    riskCategory: "CRITICAL",
    category: "Trapped at home by threats",
    problem: "Ongoing intimidation preventing the person from leaving home freely",
    status: "Review in Progress",
    timestamp: "2026-09-19 05:20 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ఇంటి బయట గుంపుగా నిలబడి బెదిరిస్తున్నారు. मुझे घर से बाहर निकलने में बहुत डर लग रहा है, जान का खतरा है।",
    translatedText: "They stand in groups outside my home and threaten me. I am deeply terrified of leaving home, there is a threat to life.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Telugu", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Panic/Gasping (170 wpm)", pauseFrequency: "Short panic pauses (1.3s)", pitchVariation: "Extreme high pitch", hesitation: "Hyper-vigilant", voiceIntensity: "High/Whispered" },
      text: { fearKeywords: "Life threat statement", threatKeywords: "Mob outside home", isolationKeywords: "Confinement", distressKeywords: "Acute terror", urgencyKeywords: "Critical" },
      context: { situation: "Mob intimidation outside home", duration: "Active", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 94 }, { subject: "Distress", A: 86 }, { subject: "Intimidation", A: 96 },
      { subject: "Isolation", A: 90 }, { subject: "Urgency", A: 92 }, { subject: "Safety Concern", A: 95 }
    ],
    keyIndicators: [
      "Physical mob presence outside victim residence",
      "Explicit 'threat to life' keyword match",
      "Acute hyper-vigilant speech profile"
    ],
    confidence: 95,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Active mob intimidation outside residence. Urgent safety review required.",
    supportRecommendations: [
      { title: "Emergency Safety Review & Police Cell", priority: "Critical", assigned: "Officer P. Verma", status: "Review in Progress" },
      { title: "Safe Housing Relocation", priority: "Critical", assigned: "District Protection Officer", status: "Recommended" }
    ],
    supportType: "Safety"
  },

  "SAHAY-016": {
    id: "SAHAY-016",
    language: "Punjabi + Hindi",
    languageDisplay: "Punjabi (ਪੰਜਾਬੀ) + Hindi Code-Switching",
    svi: 85,
    riskCategory: "CRITICAL",
    category: "Social media threats",
    problem: "Repeated social-media harassment and threats",
    status: "Cyber Cell Emergency Alert",
    timestamp: "2026-09-19 04:50 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ਸੋਸ਼ਲ ਮੀਡੀਆ 'ਤੇ ਮੇਰੀਆਂ ਤਸਵੀਰਾਂ ਵਰਤ ਕੇ ਝੂਠੀਆਂ ਗੱਲਾਂ ਫੈਲਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ aur continuously dhamki bhare messages aa rahe hain.",
    translatedText: "False rumors are being spread using my photos on social media and continuous threatening messages are coming.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Punjabi", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Fast (160 wpm)", pauseFrequency: "Frequent (2.5s)", pitchVariation: "High pitch spikes", hesitation: "Elevated", voiceIntensity: "Strained" },
      text: { fearKeywords: "Cyber defamation fear", threatKeywords: "Digital threat messages", isolationKeywords: "Public humiliation", distressKeywords: "Severe distress", urgencyKeywords: "Critical" },
      context: { situation: "Digital harassment & extortion", duration: "2 weeks", isolationLevel: "High", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 90 }, { subject: "Distress", A: 92 }, { subject: "Intimidation", A: 88 },
      { subject: "Isolation", A: 82 }, { subject: "Urgency", A: 86 }, { subject: "Safety Concern", A: 88 }
    ],
    keyIndicators: [
      "Photo misuse & digital blackmail detected",
      "Distress index 92% from online harassment",
      "Rapid speech rate with crying breaks"
    ],
    confidence: 93,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Online blackmail & photo misuse detected. Cyber cell escalation active.",
    supportRecommendations: [
      { title: "Cyber Cell Takedown & Investigation", priority: "Critical", assigned: "Tech Officer A. Sen", status: "Active" },
      { title: "Psychosocial Support Session", priority: "High", assigned: "Senior Counsellor Panel", status: "Recommended" }
    ],
    supportType: "Safety"
  },

  "SAHAY-017": {
    id: "SAHAY-017",
    language: "Gujarati + Hindi",
    languageDisplay: "Gujarati (ગુજરાતી) + Hindi Code-Switching",
    svi: 88,
    riskCategory: "CRITICAL",
    category: "Service discrimination",
    problem: "Community discrimination affecting access to local services",
    status: "Emergency Review",
    timestamp: "2026-09-19 04:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "અમારા સમુદાયને સરકારી યોજનાઓ અને સ્થળ સેવાઓનો લાભ લેવા દેવામાં નથી આવતો, humko hospital aur ration water se roka ja raha hai.",
    translatedText: "Our community is prevented from accessing government schemes and local services; we are being blocked from hospital and water/ration access.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Gujarati", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Trembling (130 wpm)", pauseFrequency: "Frequent (3.8s)", pitchVariation: "High pitch", hesitation: "Elevated", voiceIntensity: "Low" },
      text: { fearKeywords: "Hospital denial fear", threatKeywords: "Basic service blockage", isolationKeywords: "Systemic exclusion", distressKeywords: "Extreme crisis", urgencyKeywords: "Critical" },
      context: { situation: "Denial of medical & ration access", duration: "2 weeks", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 88 }, { subject: "Distress", A: 94 }, { subject: "Intimidation", A: 90 },
      { subject: "Isolation", A: 95 }, { subject: "Urgency", A: 90 }, { subject: "Safety Concern", A: 92 }
    ],
    keyIndicators: [
      "Denial of basic life services (hospital/water/ration)",
      "Systemic community exclusion index 95%",
      "High emotional distress & crying pauses"
    ],
    confidence: 92,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Medical & essential service blockage. Urgent district welfare intervention required.",
    supportRecommendations: [
      { title: "District Magistrate Emergency Intervention", priority: "Critical", assigned: "District Protection Officer", status: "Emergency Review" },
      { title: "Essential Relief & Healthcare Access", priority: "Critical", assigned: "Health & Relief Unit", status: "Recommended" }
    ],
    supportType: "Medical"
  },

  "SAHAY-018": {
    id: "SAHAY-018",
    language: "Odia + Hindi",
    languageDisplay: "Odia (ଓଡ଼ିଆ) + Hindi Code-Switching",
    svi: 91,
    riskCategory: "CRITICAL",
    category: "Rehabilitation uncertainty",
    problem: "Forced displacement and uncertainty regarding rehabilitation",
    status: "Emergency Review",
    timestamp: "2026-09-19 03:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ଆମକୁ ଆମ ଘରୁ ବାଧ୍ୟ କରି ବାହାର କରିଦିଆଗଲା। अब रहने के लिए कोई जगह नहीं है और पुनर्वास की कोई जानकारी नहीं मिल रही.",
    translatedText: "We were forcibly displaced from our home. Now there is no place to live and no information about rehabilitation.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Odia", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Despairing (88 wpm)", pauseFrequency: "Long pauses (5.4s)", pitchVariation: "Muted/Flat", hesitation: "Very High", voiceIntensity: "Muted" },
      text: { fearKeywords: "Homelessness fear", threatKeywords: "Forced eviction", isolationKeywords: "No shelter", distressKeywords: "Extreme grief", urgencyKeywords: "Critical" },
      context: { situation: "Forced eviction without shelter", duration: "Immediate", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 92 }, { subject: "Distress", A: 96 }, { subject: "Intimidation", A: 92 },
      { subject: "Isolation", A: 94 }, { subject: "Urgency", A: 95 }, { subject: "Safety Concern", A: 96 }
    ],
    keyIndicators: [
      "Forced eviction & acute homelessness statement",
      "Distress index 96% with 5.4s response pauses",
      "Rehabilitation uncertainty crisis"
    ],
    confidence: 95,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Acute displacement without shelter. Emergency shelter dispatch required.",
    supportRecommendations: [
      { title: "Emergency Rehabilitation & Shelter", priority: "Critical", assigned: "Social Welfare Dept", status: "Assigned" },
      { title: "Legal Aid Eviction Review", priority: "Critical", assigned: "District Legal Services", status: "Recommended" }
    ],
    supportType: "Rehabilitation"
  },

  "SAHAY-019": {
    id: "SAHAY-019",
    language: "Marathi",
    languageDisplay: "Marathi (मराठी)",
    svi: 24,
    riskCategory: "LOW",
    category: "Elderly harassment fear",
    problem: "Elderly complainant experiencing fear after repeated harassment",
    status: "Completed",
    timestamp: "2026-09-19 03:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "मी एक ज्येष्ठ नागरिक आहे. गेल्या काही दिवसांपासून काही स्थानिक तरुण मला त्रास देत आहेत, ज्यामुळे मला भीती वाटत आहे.",
    translatedText: "I am a senior citizen. For the past few days, some local youths have been harassing me, which makes me feel fearful.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Slow (95 wpm)", pauseFrequency: "Moderate (3.0s)", pitchVariation: "Gentle", hesitation: "Low", voiceIntensity: "Subdued" },
      text: { fearKeywords: "Elderly concern", threatKeywords: "Youth nuisance", isolationKeywords: "Senior vulnerability", distressKeywords: "Mild distress", urgencyKeywords: "Low" },
      context: { situation: "Senior citizen nuisance", duration: "1 week", isolationLevel: "Low", riskLevel: "Routine Support" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 30 }, { subject: "Distress", A: 35 }, { subject: "Intimidation", A: 28 },
      { subject: "Isolation", A: 40 }, { subject: "Urgency", A: 15 }, { subject: "Safety Concern", A: 24 }
    ],
    keyIndicators: [
      "Senior citizen welfare query",
      "Low vocal tension & stable pitch",
      "No physical injury or immediate safety hazard"
    ],
    confidence: 91,
    dataQuality: "Good",
    humanReviewStatus: "Completed",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Elderly Support Helpline Patrol", priority: "Low", assigned: "Welfare Officer N. Rao", status: "Completed" },
      { title: "Community Senior Check-in", priority: "Low", assigned: "Local Beat Patrol", status: "Active" }
    ],
    supportType: "Follow-up"
  },

  "SAHAY-020": {
    id: "SAHAY-020",
    language: "Assamese",
    languageDisplay: "Assamese (অসমীয়া)",
    svi: 32,
    riskCategory: "MODERATE",
    category: "Physical assault & threats",
    problem: "Physical assault followed by continuing threats",
    status: "In Progress",
    timestamp: "2026-09-19 02:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "মোৰ ওপৰত শাৰীৰিক আক্ৰমণ কৰা হৈছিল আৰু এতিয়াও মোক একেৰাহে ভাবুকি দি থকা হৈছে। মই ন্যায় বিচাৰিছো।",
    translatedText: "I was physically assaulted and even now continuous threats are being made to me. I seek justice.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Moderate (120 wpm)", pauseFrequency: "Elevated (3.2s)", pitchVariation: "Elevated", hesitation: "Moderate", voiceIntensity: "Moderate" },
      text: { fearKeywords: "Assault trauma", threatKeywords: "Continuing threats", isolationKeywords: "Justice seeking", distressKeywords: "Moderate distress", urgencyKeywords: "Moderate" },
      context: { situation: "Past assault with ongoing threats", duration: "2 weeks", isolationLevel: "Moderate", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 48 }, { subject: "Distress", A: 52 }, { subject: "Intimidation", A: 55 },
      { subject: "Isolation", A: 35 }, { subject: "Urgency", A: 40 }, { subject: "Safety Concern", A: 48 }
    ],
    keyIndicators: [
      "Past assault statement recorded",
      "Justice request & legal aid eligibility",
      "Moderate speech rate with pitch variation"
    ],
    confidence: 88,
    dataQuality: "Good",
    humanReviewStatus: "Scheduled",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Legal Counsel & Case Filing Aid", priority: "Medium", assigned: "Protection Officer S. Ray", status: "In Progress" },
      { title: "Medical Record Audit", priority: "Medium", assigned: "District Medical Panel", status: "Recommended" }
    ],
    supportType: "Legal Aid"
  },

  "SAHAY-021": {
    id: "SAHAY-021",
    language: "Bengali + Hindi",
    languageDisplay: "Bengali (বাংলা) + Hindi Code-Switching",
    svi: 94,
    riskCategory: "CRITICAL",
    category: "Family death distress",
    problem: "Death of a family member followed by severe emotional distress",
    status: "Emergency Review",
    timestamp: "2026-09-19 02:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "হামার পরিবারের সদস্যের মৃত্যুর পর আমরা গভীরভাবে শোকাচ্ছন্ন। hamare ghar ke log severe shock mein hain aur koi suraksha nahi hai.",
    translatedText: "After the death of our family member we are in deep mourning. Our family members are in severe shock and there is no protection.",
    codeSwitching: true,
    codeSwitchingLanguages: ["Bengali", "Hindi"],
    multimodalSignals: {
      voice: { speechRate: "Gasping/Crying (75 wpm)", pauseFrequency: "Severe pauses (6.0s)", pitchVariation: "High pitch crying spikes", hesitation: "Extreme", voiceIntensity: "Sobbing" },
      text: { fearKeywords: "Family death trauma", threatKeywords: "Unprotected threat", isolationKeywords: "Severe grief shock", distressKeywords: "Extreme grief", urgencyKeywords: "Critical" },
      context: { situation: "Bereavement following violence", duration: "Immediate", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 96 }, { subject: "Distress", A: 99 }, { subject: "Intimidation", A: 94 },
      { subject: "Isolation", A: 90 }, { subject: "Urgency", A: 96 }, { subject: "Safety Concern", A: 98 }
    ],
    keyIndicators: [
      "Family member death & severe grief shock",
      "Extreme distress index 99% with active crying",
      "Zero protection fear statement matched"
    ],
    confidence: 96,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "Family bereavement following violence. Critical trauma & safety response required.",
    supportRecommendations: [
      { title: "Critical Crisis Response & Security", priority: "Critical", assigned: "District Protection Cell", status: "Emergency Review" },
      { title: "Emergency Bereavement Counselling", priority: "Critical", assigned: "Senior Trauma Counsellor", status: "Assigned" }
    ],
    supportType: "Counselling"
  },

  "SAHAY-022": {
    id: "SAHAY-022",
    language: "Kannada",
    languageDisplay: "Kannada (ಕನ್ನಡ)",
    svi: 22,
    riskCategory: "LOW",
    category: "Student discrimination",
    problem: "Student facing discrimination and intimidation in an educational setting",
    status: "Completed",
    timestamp: "2026-09-19 01:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ನಾನು ಕಾಲೇಜಿನಲ್ಲಿ ತಾರತಮ್ಯ ಮತ್ತು ಬೆದರಿಕೆಯನ್ನು ಎದುರಿಸುತ್ತಿದ್ದೇನೆ. ಶಿಕ್ಷಣ ಮುಂದುವರಿಸಲು ನನಗೆ ಮಾರ್ಗದರ್ಶನ ಬೇಕಿದೆ.",
    translatedText: "I am facing discrimination and intimidation at college. I need guidance to continue my education.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Normal (120 wpm)", pauseFrequency: "Low", pitchVariation: "Stable", hesitation: "Low", voiceIntensity: "Moderate" },
      text: { fearKeywords: "College guidance concern", threatKeywords: "Peer discrimination", isolationKeywords: "Low", distressKeywords: "Routine query", urgencyKeywords: "Low" },
      context: { situation: "Campus discrimination query", duration: "2 weeks", isolationLevel: "Low", riskLevel: "Routine Support" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 25 }, { subject: "Distress", A: 32 }, { subject: "Intimidation", A: 30 },
      { subject: "Isolation", A: 28 }, { subject: "Urgency", A: 15 }, { subject: "Safety Concern", A: 20 }
    ],
    keyIndicators: [
      "Student educational support query",
      "Stable vocal dynamics & low stress index",
      "Guidance & scholarship aid eligibility"
    ],
    confidence: 92,
    dataQuality: "Good",
    humanReviewStatus: "Completed",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Student Welfare & Anti-Discrimination Cell", priority: "Low", assigned: "Education Welfare Liaison", status: "Completed" },
      { title: "Academic Guidance Referral", priority: "Low", assigned: "Student Counsellor", status: "Active" }
    ],
    supportType: "Information"
  },

  "SAHAY-023": {
    id: "SAHAY-023",
    language: "Malayalam",
    languageDisplay: "Malayalam (മലയാളം)",
    svi: 45,
    riskCategory: "MODERATE",
    category: "Post-incident isolation",
    problem: "Social isolation and lack of family/community support after an incident",
    status: "Follow-up Scheduled",
    timestamp: "2026-09-19 01:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "സംഭവത്തിനു ശേഷം പ്രദേശവാസികളാരും ഞങ്ങളോട് സംസാരിക്കുന്നില്ല. കുടുംബത്തിന് മാനസിക പിന്തുണ ആവശ്യമാണ്.",
    translatedText: "After the incident, no local residents speak to us. The family requires psychosocial support.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Slow (100 wpm)", pauseFrequency: "Prolonged (4.0s)", pitchVariation: "Flat tone", hesitation: "Elevated", voiceIntensity: "Subdued" },
      text: { fearKeywords: "Community silence fear", threatKeywords: "Social boycott", isolationKeywords: "High family isolation", distressKeywords: "Moderate grief", urgencyKeywords: "Moderate" },
      context: { situation: "Community cold shoulder", duration: "3 weeks", isolationLevel: "High", riskLevel: "Support Recommended" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 42 }, { subject: "Distress", A: 68 }, { subject: "Intimidation", A: 45 },
      { subject: "Isolation", A: 82 }, { subject: "Urgency", A: 32 }, { subject: "Safety Concern", A: 40 }
    ],
    keyIndicators: [
      "Post-incident community isolation (82%)",
      "Subdued voice intensity & prolonged pauses",
      "Psychosocial family support request"
    ],
    confidence: 89,
    dataQuality: "Good",
    humanReviewStatus: "Scheduled",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Psychosocial Family Counselling", priority: "Medium", assigned: "Counsellor A. Das", status: "Follow-up Scheduled" },
      { title: "Community Outreach Officer Visit", priority: "Medium", assigned: "Welfare Dept", status: "Recommended" }
    ],
    supportType: "Counselling"
  },

  "SAHAY-024": {
    id: "SAHAY-024",
    language: "Tamil",
    languageDisplay: "Tamil (தமிழ்)",
    svi: 98,
    riskCategory: "CRITICAL",
    category: "Immediate safety concern",
    problem: "Possible immediate safety concern involving an ongoing threat",
    status: "Emergency Review",
    timestamp: "2026-09-19 00:45 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "இப்போது என் வீட்டின் வெளியே ஆயுதங்களுடன் சிலர் சுற்றித்திரிகின்றனர். எனது உயிருக்கு உடனடி ஆபத்து உள்ளது, தயவுசெய்து உதவுங்கள்.",
    translatedText: "Right now some individuals armed with weapons are loitering outside my house. There is an immediate threat to my life, please help.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Whispered Panic (175 wpm)", pauseFrequency: "Gasping pauses (1.0s)", pitchVariation: "Extreme high pitch shift", hesitation: "Hyper-vigilant", voiceIntensity: "Whispered panic" },
      text: { fearKeywords: "Armed threat outside", threatKeywords: "Immediate threat to life", isolationKeywords: "Trapped inside", distressKeywords: "Extreme terror", urgencyKeywords: "Critical Immediate" },
      context: { situation: "Armed persons outside residence", duration: "ACTIVE NOW", isolationLevel: "Extreme", riskLevel: "Immediate Human Attention Required" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 99 }, { subject: "Distress", A: 98 }, { subject: "Intimidation", A: 99 },
      { subject: "Isolation", A: 92 }, { subject: "Urgency", A: 99 }, { subject: "Safety Concern", A: 99 }
    ],
    keyIndicators: [
      "ACTIVE ARMED THREAT OUTSIDE RESIDENCE",
      "Immediate danger keyword match ('help', 'weapons')",
      "SVI Index 98/100 — Highest Priority Queue"
    ],
    confidence: 97,
    dataQuality: "Good",
    humanReviewStatus: "Required",
    immediateSafetyFlag: true,
    immediateSafetyMessage: "CRITICAL IMMEDIATE SAFETY FLAG: Armed threat outside residence. Priority officer verification required.",
    supportRecommendations: [
      { title: "Priority Human Verification & Security Dispatch", priority: "Critical", assigned: "Officer K. Sundaram", status: "Emergency Review" },
      { title: "District Emergency Response Cell", priority: "Critical", assigned: "Emergency Response Unit", status: "Active" }
    ],
    supportType: "Safety"
  },

  "SAHAY-025": {
    id: "SAHAY-025",
    language: "Telugu",
    languageDisplay: "Telugu (తెలుగు)",
    svi: 16,
    riskCategory: "LOW",
    category: "Low-distress routine query",
    problem: "Low-distress case requesting information and routine assistance",
    status: "Completed",
    timestamp: "2026-09-19 00:15 AM",
    victimSpeaker: "Complainant (Anonymous)",
    victimNarrative: "ప్రభుత్వ సంక్షేమ పథకాలు మరియు న్యాయ సహాయం సమాచారం కోసం దరఖాస్తు చేయాలనుకుంటున్నాను.",
    translatedText: "I wish to apply for information regarding government welfare schemes and legal assistance.",
    codeSwitching: false,
    multimodalSignals: {
      voice: { speechRate: "Normal (130 wpm)", pauseFrequency: "Low", pitchVariation: "Stable", hesitation: "Low", voiceIntensity: "Normal" },
      text: { fearKeywords: "None", threatKeywords: "None", isolationKeywords: "None", distressKeywords: "Routine query", urgencyKeywords: "Low" },
      context: { situation: "Welfare scheme inquiry", duration: "Routine", isolationLevel: "Low", riskLevel: "Routine Support" }
    },
    traumaFingerprint: [
      { subject: "Fear", A: 12 }, { subject: "Distress", A: 18 }, { subject: "Intimidation", A: 10 },
      { subject: "Isolation", A: 15 }, { subject: "Urgency", A: 10 }, { subject: "Safety Concern", A: 12 }
    ],
    keyIndicators: [
      "Routine welfare scheme informational query",
      "Zero threat or danger signals detected",
      "SVI 16/100 — Routine Support tier"
    ],
    confidence: 96,
    dataQuality: "Good",
    humanReviewStatus: "Completed",
    immediateSafetyFlag: false,
    supportRecommendations: [
      { title: "Routine Scheme Information Dispatch", priority: "Low", assigned: "Helpline Desk A", status: "Completed" },
      { title: "Legal Aid Informational Brochure", priority: "Low", assigned: "Automated Desk", status: "Active" }
    ],
    supportType: "Information"
  }
};

// Helper: Enrich each case object with backward-compatible aliases so UI components never crash
Object.keys(DEMO_CASES).forEach(key => {
  const c = DEMO_CASES[key];
  if (!c.trigger) c.trigger = c.problem || "Distress indicator reported";
  if (!c.transcript) c.transcript = c.victimNarrative || c.translatedText;
  if (!c.factors) c.factors = c.keyIndicators || ["Distress signal detected"];
  if (!c.recommendedPathways) c.recommendedPathways = c.supportRecommendations || [{ title: "Routine Support", priority: "Low", assigned: "Welfare Desk", status: "Active" }];
  
  if (!c.audioMetrics) {
    c.audioMetrics = {
      speechRate: c.multimodalSignals?.voice?.speechRate || "Normal (120 wpm)",
      pauseLength: c.multimodalSignals?.voice?.pauseFrequency || "Moderate (3.2s)",
      pitchVar: c.multimodalSignals?.voice?.pitchVariation || "Controlled",
      hesitation: c.multimodalSignals?.voice?.hesitation || "Elevated",
      intensity: c.multimodalSignals?.voice?.voiceIntensity || "Subdued"
    };
  }

  if (!c.silentDistress) {
    c.silentDistress = [
      `Non-verbal cue: ${c.audioMetrics.hesitation} speech hesitation detected`,
      `Pause pattern: ${c.audioMetrics.pauseLength} noted`,
      `Tone intensity: ${c.audioMetrics.intensity} profile`
    ];
  }

  if (!c.avoidedQuestions) {
    c.avoidedQuestions = [
      "Location verified via automated intake",
      "Prior intake history pre-cataloged"
    ];
  }
  if (!c.skippedQuestionsCount) c.skippedQuestionsCount = 2;
});

// 25 Mandatory Anonymized Dashboard Case Queue Records Array
export const INITIAL_CASE_QUEUE = Object.values(DEMO_CASES);

// Audit Log Initial Records
export const INITIAL_AUDIT_LOGS = [
  { id: "AUD-9901", timestamp: "2026-09-19 12:12:05 PM", caseId: "SAHAY-024", role: "Protection Officer S. Ray", action: "Emergency Safety Flag Confirmed", details: "Critical SVI (98) armed threat verified by human officer." },
  { id: "AUD-9900", timestamp: "2026-09-19 12:05:42 PM", caseId: "SAHAY-013", role: "System AI Engine", action: "Multimodal Assessment Flag", details: "SVI 77 generated (Confidence: 94%). Code-switching sexual violence trauma flagged." },
  { id: "AUD-9899", timestamp: "2026-09-19 11:46:10 AM", caseId: "SAHAY-004", role: "Counsellor A. Das", action: "Human Assessment Confirmed", details: "SVI 41 reviewed. Assigned to Workplace Advocacy queue." },
  { id: "AUD-9898", timestamp: "2026-09-19 11:31:00 AM", caseId: "SAHAY-008", role: "Officer M. Kulkarni", action: "Displacement Brief Exported", details: "Displaced family shelter referral generated." }
];

// Follow-up Milestones
export const INITIAL_FOLLOW_UPS = [
  { day: "Day 0", title: "Initial Multimodal Assessment", date: "19 Sep 2026", status: "Completed", caseId: "SAHAY-024", note: "Multimodal AI assessment completed; SVI 98 recorded." },
  { day: "Day 2", title: "Security Verification & Legal Aid Connect", date: "21 Sep 2026", status: "Pending", caseId: "SAHAY-024", note: "Assigned to District Emergency Unit." },
  { day: "Day 7", title: "Safety & Shelter Audit", date: "26 Sep 2026", status: "Scheduled", caseId: "SAHAY-024", note: "Protection review scheduled." }
];

// Analytics Aggregates
export const ANALYTICS_DATA = {
  totalAssessments: 2500,
  highCriticalRatio: "60.0%",
  avgResponseTime: "1.8 mins",
  humanOverrideRate: "3.2%",
  riskDistribution: [
    { name: "Low (0-25)", value: 4, color: "#355C45" },
    { name: "Moderate (26-50)", value: 6, color: "#C88A32" },
    { name: "High (51-75)", value: 7, color: "#B85C38" },
    { name: "Critical (76-100)", value: 8, color: "#7A1F2B" }
  ],
  languageDistribution: [
    { language: "Hindi", count: 4 },
    { language: "Kannada", count: 3 },
    { language: "Malayalam", count: 3 },
    { language: "Tamil", count: 3 },
    { language: "Telugu", count: 3 },
    { language: "Bengali", count: 2 },
    { language: "Assamese", count: 2 },
    { language: "Punjabi", count: 2 },
    { language: "Gujarati", count: 2 },
    { language: "Odia", count: 2 },
    { language: "Marathi", count: 2 }
  ],
  sviTrends: [
    { month: "May", avgSVI: 65 },
    { month: "Jun", avgSVI: 61 },
    { month: "Jul", avgSVI: 58 },
    { month: "Aug", avgSVI: 54 },
    { month: "Sep", avgSVI: 50 }
  ]
};
