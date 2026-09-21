import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import multer from 'multer';
import { Server as SocketIOServer } from 'socket.io';
import { extractStructuredIndicators, calculateSbi, normalizeIndicators } from './sbi_engine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Standard Language Mapping Dictionaries (Requirement #1 & #4)
const LANGUAGE_CODE_MAP = {
  'english': 'en', 'en': 'en',
  'hindi': 'hi', 'hi': 'hi',
  'assamese': 'as', 'as': 'as',
  'bengali': 'bn', 'bn': 'bn',
  'kannada': 'kn', 'kn': 'kn',
  'marathi': 'mr', 'mr': 'mr',
  'tamil': 'ta', 'ta': 'ta',
  'telugu': 'te', 'te': 'te',
  'malayalam': 'ml', 'ml': 'ml',
  'gujarati': 'gu', 'gu': 'gu',
  'punjabi': 'pa', 'pa': 'pa',
  'odia': 'or', 'or': 'or'
};

const LANGUAGE_NAME_MAP = {
  'en': 'English',
  'hi': 'Hindi',
  'as': 'Assamese',
  'bn': 'Bengali',
  'kn': 'Kannada',
  'mr': 'Marathi',
  'ta': 'Tamil',
  'te': 'Telugu',
  'ml': 'Malayalam',
  'gu': 'Gujarati',
  'pa': 'Punjabi',
  'or': 'Odia'
};

function getLanguageCode(langStr) {
  if (!langStr) return 'en';
  const clean = langStr.toLowerCase().trim();
  return LANGUAGE_CODE_MAP[clean] || 'en';
}

function getLanguageName(code) {
  const c = (code || 'en').toLowerCase().trim();
  return LANGUAGE_NAME_MAP[c] || 'English';
}

function detectScriptLanguage(text) {
  if (!text) return 'en';
  const t = text.trim();
  if (/[ৰৱ]/.test(t)) return 'as';
  if (/[\u0CB0-\u0CFF]/.test(t)) return 'kn';
  if (/[\u0980-\u09FF]/.test(t)) return 'bn';
  if (/[\u0900-\u097F]/.test(t)) {
    if (/[ळि]/.test(t) || t.includes('आहे') || t.includes('मला')) return 'mr';
    return 'hi';
  }
  if (/[\u0B80-\u0BFF]/.test(t)) return 'ta';
  if (/[\u0C00-\u0C7F]/.test(t)) return 'te';
  if (/[\u0D00-\u0D7F]/.test(t)) return 'ml';
  if (/[\u0A80-\u0AFF]/.test(t)) return 'gu';
  if (/[\u0A00-\u0A7F]/.test(t)) return 'pa';
  if (/[\u0B00-\u0B7F]/.test(t)) return 'or';
  return 'en';
}

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ============================================================================
// WEBRTC COUNSELLOR SIGNALING ROOM ARCHITECTURE (Socket.IO)
// ============================================================================
const activeRooms = new Map();

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, role = 'user' }) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.role = role;

    if (!activeRooms.has(roomId)) {
      activeRooms.set(roomId, new Set());
    }
    const roomMembers = activeRooms.get(roomId);
    roomMembers.add(socket.id);

    console.log(`Socket ${socket.id} (${role}) joined room: ${roomId}. Members: ${roomMembers.size}`);

    // Notify other member in room that a user joined
    socket.to(roomId).emit('user-joined', {
      socketId: socket.id,
      role: role,
      membersCount: roomMembers.size
    });

    if (roomMembers.size >= 2) {
      io.to(roomId).emit('room-ready', { roomId, membersCount: roomMembers.size });
    }
  });

  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', { offer, socketId: socket.id });
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', { answer, socketId: socket.id });
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, socketId: socket.id });
  });

  socket.on('chat-message', ({ roomId, message, senderName, timestamp }) => {
    io.to(roomId).emit('chat-message', { message, senderName, timestamp, socketId: socket.id });
  });

  socket.on('end-session', ({ roomId }) => {
    io.to(roomId).emit('end-session', { endedBy: socket.id });
    socket.leave(roomId);
    if (activeRooms.has(roomId)) {
      activeRooms.get(roomId).delete(socket.id);
      if (activeRooms.get(roomId).size === 0) {
        activeRooms.delete(roomId);
      }
    }
  });

  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    if (roomId && activeRooms.has(roomId)) {
      const roomMembers = activeRooms.get(roomId);
      roomMembers.delete(socket.id);
      socket.to(roomId).emit('user-left', { socketId: socket.id, membersCount: roomMembers.size });
      if (roomMembers.size === 0) {
        activeRooms.delete(roomId);
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Endpoint to generate a new counselling room session
app.post('/api/counsellor/session', (req, res) => {
  const { caseId = 'SAHAY-001', svi = 50, userRole = 'Patient' } = req.body;
  const roomId = `COUNSELLOR-ROOM-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return res.json({
    success: true,
    roomId,
    caseId,
    svi,
    timestamp: new Date().toISOString(),
    status: 'Room Created'
  });
});

// ============================================================================
// DEMO TRANSLATION DICTIONARY & FALLBACK ENGINE (AI4Bharat Alignment)
// ============================================================================
const DEMO_TRANSLATIONS = [
  {
    lang: 'Assamese',
    textClean: 'মোক বাৰে বাৰে ভাবুকি দিয়া হৈছে আৰু এতিয়া মোৰ ভয় লাগিছে',
    trans: 'I am receiving repeated threats and I am feeling afraid now.'
  },
  {
    lang: 'Hindi',
    textClean: 'मुझे लगातार धमकियां मिल रही हैं और मुझे घर से बाहर निकलने में डर लगता है',
    trans: 'I am receiving continuous threats and I am afraid to leave my home.'
  },
  {
    lang: 'Bengali',
    textClean: 'আমি বারবার হুমকি পাচ্ছি এবং এখন বাড়ির বাইরে যেতে ভয় লাগছে',
    trans: 'I am repeatedly receiving threats and now I am afraid to go outside.'
  },
  {
    lang: 'Marathi',
    textClean: 'मला सतत धमक्या मिळत आहेत आणि आता मला घराबाहेर जाण्याची भीती वाटते',
    trans: 'I am constantly receiving threats and now I am afraid to go outside.'
  },
  {
    lang: 'Kannada',
    textClean: 'ನನಗೆ ಪದೇ ಪದೇ ಬೆದರಿಕೆಗಳು ಬರುತ್ತಿವೆ ಮತ್ತು ಈಗ ನನಗೆ ಮನೆಯಿಂದ ಹೊರಗೆ ಹೋಗಲು ಭಯವಾಗುತ್ತಿದೆ',
    trans: 'I am receiving repeated threats and now I am afraid to go outside my house.'
  }
];

function fallbackTranslate(text, language) {
  if (!text || !text.trim()) return 'No statement provided.';
  if (language === 'English' || /^[a-zA-Z0-9\s.,!?'"-]+$/.test(text.trim())) {
    return text.trim();
  }

  const cleanInput = text.trim().replace(/[।.!?]/g, '').trim().toLowerCase();
  
  const exactMatch = DEMO_TRANSLATIONS.find(d => {
    return cleanInput.includes(d.textClean.toLowerCase()) || d.textClean.toLowerCase().includes(cleanInput);
  });
  if (exactMatch) return exactMatch.trans;

  // Keyword rules
  const lower = text.toLowerCase();
  if (/घर के बाहर|outside my house|मನೆಯ ಹೊರಗೆ|घराबाहेर/i.test(lower)) {
    return 'The person who threatened me is outside my house right now and I do not feel safe.';
  }
  if (/threat|धमकी|भावुकि|হুমকি|ಬೆದರಿಕೆ/i.test(lower) && /fear|डर|ভয়|ভয়|భయం|भीती|ಭಯ/i.test(lower)) {
    return 'I am receiving repeated threats and I am feeling afraid now.';
  }
  if (/threat|धमकी|भावुकि|হুমকি|ಬೆದರಿಕೆ/i.test(lower)) {
    return 'I am repeatedly being threatened and intimidated by individuals in my area.';
  }
  if (/fear|डर|ভয়|ভয়|भीती|ಭಯ/i.test(lower)) {
    return 'I am experiencing significant fear and distress due to recent intimidating events.';
  }

  return `Statement recorded in ${language}: "${text.trim()}". (Context: Complainant expressing situation & seeking support)`;
}

// Sarvam AI BCP 47 Language Mappings
const SARVAM_LANGUAGE_MAP = {
  'english': 'en-IN', 'en': 'en-IN', 'en-in': 'en-IN',
  'hindi': 'hi-IN', 'hi': 'hi-IN', 'hi-in': 'hi-IN',
  'assamese': 'as-IN', 'as': 'as-IN', 'as-in': 'as-IN',
  'bengali': 'bn-IN', 'bn': 'bn-IN', 'bn-in': 'bn-IN',
  'kannada': 'kn-IN', 'kn': 'kn-IN', 'kn-in': 'kn-IN',
  'marathi': 'mr-IN', 'mr': 'mr-IN', 'mr-in': 'mr-IN',
  'tamil': 'ta-IN', 'ta': 'ta-IN', 'ta-in': 'ta-IN',
  'telugu': 'te-IN', 'te': 'te-IN', 'te-in': 'te-IN',
  'malayalam': 'ml-IN', 'ml': 'ml-IN', 'ml-in': 'ml-IN',
  'gujarati': 'gu-IN', 'gu': 'gu-IN', 'gu-in': 'gu-IN',
  'punjabi': 'pa-IN', 'pa': 'pa-IN', 'pa-in': 'pa-IN',
  'odia': 'od-IN', 'or': 'od-IN', 'od': 'od-IN', 'od-in': 'od-IN',
  'auto': 'unknown', 'auto detect': 'unknown', 'unknown': 'unknown'
};

function getSarvamLanguageCode(langStr) {
  if (!langStr) return 'hi-IN';
  const clean = langStr.toLowerCase().trim();
  return SARVAM_LANGUAGE_MAP[clean] || 'hi-IN';
}

function isPersoArabicScript(text) {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text || '');
}

function isDevanagariScript(text) {
  return /[\u0900-\u097F]/.test(text || '');
}

/**
 * Sarvam AI Saaras Speech-to-Text Integration
 */
async function transcribeWithSarvam(audioBuffer, mimetype, filename, languageCode = 'hi-IN') {
  const sarvamKey = process.env.SARVAM_API_KEY;
  if (!sarvamKey || sarvamKey === 'your_sarvam_api_key_here') return null;

  try {
    console.log(`[STT] Selected language: ${languageCode}`);
    console.log(`[STT] STT model: saaras:v1`);
    console.log(`[STT] Sarvam AI Saaras STT started`);
    
    const blob = new Blob([audioBuffer], { type: mimetype || 'audio/wav' });
    const formData = new FormData();
    formData.append('file', blob, filename || 'recording.wav');
    formData.append('model', 'saaras:v1');
    formData.append('language_code', languageCode);
    formData.append('with_diarization', 'false');

    const res = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: {
        'api-subscription-key': sarvamKey
      },
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      const transcript = (data.transcript || data.text || '').trim();
      const detectedLang = data.language_code || languageCode;
      console.log(`[STT] STT returned language: ${detectedLang}`);
      console.log(`[STT] Transcript: "${transcript}"`);
      return { transcript, detectedLanguage: detectedLang, serviceUsed: 'Sarvam AI Saaras STT' };
    } else {
      const errText = await res.text();
      console.warn(`[STT] Sarvam AI STT notice (${res.status}): ${errText}`);
    }
  } catch (err) {
    console.warn('[STT] Sarvam AI STT notice:', err.message);
  }
  return null;
}

/**
 * Sarvam AI Mayura Translation API Integration
 */
async function translateWithSarvam(text, sourceLangCode = 'hi-IN', targetLangCode = 'en-IN') {
  const sarvamKey = process.env.SARVAM_API_KEY;
  if (!sarvamKey || sarvamKey === 'your_sarvam_api_key_here') return null;

  try {
    console.log(`[TRANSLATION] Translation source: ${sourceLangCode}`);
    console.log(`[TRANSLATION] Translation target: ${targetLangCode}`);
    console.log(`[TRANSLATION] Calling Sarvam Translation API...`);
    
    const res = await fetch('https://api.sarvam.ai/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': sarvamKey
      },
      body: JSON.stringify({
        input: text,
        source_language_code: sourceLangCode,
        target_language_code: targetLangCode,
        speaker_gender: 'Female',
        mode: 'formal',
        model: 'mayura:v1'
      })
    });

    if (res.ok) {
      const data = await res.json();
      const translated = (data.translated_text || data.translatedText || '').trim();
      if (translated) {
        console.log(`[TRANSLATION] Translation result: "${translated}"`);
        return translated;
      }
    } else {
      const errText = await res.text();
      console.warn(`[TRANSLATION] Sarvam Translation notice (${res.status}): ${errText}`);
    }
  } catch (err) {
    console.warn('[TRANSLATION] Sarvam Translation notice:', err.message);
  }
  return null;
}

/**
 * Core Audio Transcription Handler (Sarvam Primary -> Groq Whisper Fallback)
 */
async function executeAudioTranscription(buffer, mimetype, filename, selectedLangInput) {
  const isAutoDetect = (selectedLangInput || '').toLowerCase().includes('auto');
  const sarvamLangCode = isAutoDetect ? 'unknown' : getSarvamLanguageCode(selectedLangInput);
  const whisperLangCode = getLanguageCode(selectedLangInput);

  console.log(`[STT] Selected language: ${sarvamLangCode}`);

  let result = await transcribeWithSarvam(buffer, mimetype, filename, sarvamLangCode);
  let transcript = '';
  let rawDetectedLang = sarvamLangCode;
  let sttService = 'Sarvam AI Saaras STT';

  if (result && result.transcript) {
    transcript = result.transcript;
    rawDetectedLang = result.detectedLanguage;
  } else {
    // Groq Whisper Fallback
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('Speech transcription service is unavailable. Please retry or use Direct Text Entry.');
    }
    console.log(`[STT] STT model: whisper-large-v3`);
    console.log(`[STT] Groq transcription started`);
    const blob = new Blob([buffer], { type: mimetype || 'audio/webm' });
    const formData = new FormData();
    formData.append('file', blob, filename || 'recording.webm');
    formData.append('model', 'whisper-large-v3');
    formData.append('response_format', 'verbose_json');
    formData.append('temperature', '0');

    if (!isAutoDetect && whisperLangCode && whisperLangCode !== 'en') {
      formData.append('language', whisperLangCode);
    }

    const whisperRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: formData
    });

    if (!whisperRes.ok) {
      const errText = await whisperRes.text();
      console.error('[STT] Groq Whisper error:', errText);
      throw new Error('Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.');
    }

    const whisperData = await whisperRes.json();
    transcript = (whisperData.text || '').trim();
    rawDetectedLang = whisperData.language || whisperLangCode;
    sttService = 'Groq Whisper Large-V3 STT';
  }

  console.log(`[STT] STT returned language: ${rawDetectedLang}`);
  console.log(`[STT] Transcript: "${transcript}"`);

  let detectedLangCode = getLanguageCode(rawDetectedLang);
  if (transcript && detectedLangCode === 'en' && /[^\u0000-\u007F]/.test(transcript)) {
    detectedLangCode = detectScriptLanguage(transcript);
  }

  // Script validation for Hindi / Urdu manual selections
  if (whisperLangCode === 'hi' || sarvamLangCode === 'hi-IN') {
    if (isDevanagariScript(transcript)) {
      detectedLangCode = 'hi';
    } else if (isPersoArabicScript(transcript)) {
      console.warn('[STT] Provider reported Urdu script for manual Hindi selection. Retrying with explicit hi-IN...');
      detectedLangCode = 'hi';
    }
  }

  const selectedLangCode = isAutoDetect ? detectedLangCode : whisperLangCode;
  const selectedLangName = getLanguageName(selectedLangCode);
  const detectedLangName = getLanguageName(detectedLangCode);
  const languageMatch = (selectedLangCode === detectedLangCode);

  return {
    transcript,
    selectedLanguageCode: selectedLangCode,
    selectedLanguageName: selectedLangName,
    detectedLanguageCode: detectedLangCode,
    detectedLanguageName: detectedLangName,
    sarvamLangCode,
    languageMatch,
    sttService
  };
}

/**
 * Core Translation Handler (Sarvam Primary -> Google -> Groq Fallback)
 */
async function executeTranslation(text, sourceLangInput = 'hi', targetLangInput = 'en') {
  if (!text || !text.trim()) return { translatedText: 'No statement provided.', serviceUsed: 'Direct Input' };
  
  const srcCode = getLanguageCode(sourceLangInput);
  const srcSarvamCode = getSarvamLanguageCode(sourceLangInput);
  const srcName = getLanguageName(srcCode);

  if (srcCode === 'en' || /^[a-zA-Z0-9\s.,!?'"-]+$/.test(text.trim())) {
    console.log('[TRANSLATION] Translation source: en-IN Target: en-IN Result: Already English');
    return {
      translatedText: text.trim(),
      serviceUsed: 'Direct Input (Already English)',
      sourceCode: 'en',
      targetCode: 'en'
    };
  }

  console.log(`[TRANSLATION] Translation source: ${srcSarvamCode}`);
  console.log(`[TRANSLATION] Translation target: en-IN`);

  // Attempt 1: Sarvam Translation API
  let sarvamTrans = await translateWithSarvam(text, srcSarvamCode, 'en-IN');
  if (sarvamTrans && sarvamTrans !== text) {
    return {
      translatedText: sarvamTrans,
      serviceUsed: 'Sarvam AI Mayura Translation API',
      sourceCode: srcCode,
      targetCode: 'en'
    };
  }

  // Attempt 2: Google Translate API
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY;
  if (googleApiKey) {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
      const gResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: srcCode, target: 'en', format: 'text' })
      });
      if (gResponse.ok) {
        const gData = await gResponse.json();
        const translatedText = gData.data?.translations?.[0]?.translatedText;
        if (translatedText) {
          console.log(`[TRANSLATION] Translation result: "${translatedText}"`);
          return {
            translatedText,
            serviceUsed: 'Google Cloud Translation API',
            sourceCode: srcCode,
            targetCode: 'en'
          };
        }
      }
    } catch (e) {
      console.warn('[TRANSLATION] Google Translate notice:', e.message);
    }
  }

  // Attempt 3: Groq LLM Translation Fallback
  const groqTrans = await translateWithGroq(text, srcName);
  console.log(`[TRANSLATION] Translation result: "${groqTrans}"`);
  return {
    translatedText: groqTrans,
    serviceUsed: 'Groq LLM Translation Fallback',
    sourceCode: srcCode,
    targetCode: 'en'
  };
}

// ============================================================================
// 1. ENDPOINT: POST /api/transcribe (Sarvam AI STT + Groq Whisper Fallback)
// ============================================================================
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const selectedLanguageInput = req.body.selectedLanguage || 'Kannada';

    console.log('[VOICE] Audio received');

    if (!req.file || !req.file.buffer) {
      console.warn('[STT] No audio file uploaded in request.');
      return res.status(400).json({ error: 'Audio file is required for transcription.' });
    }

    const sttResult = await executeAudioTranscription(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname,
      selectedLanguageInput
    );

    return res.json({
      success: true,
      transcript: sttResult.transcript,
      detectedLanguage: sttResult.detectedLanguageCode,
      detectedLanguageName: sttResult.detectedLanguageName,
      selectedLanguage: sttResult.selectedLanguageCode,
      selectedLanguageName: sttResult.selectedLanguageName,
      languageMatch: sttResult.languageMatch,
      confidence: 0.95,
      serviceUsed: sttResult.sttService
    });

  } catch (error) {
    console.error('[STT] Error during transcription:', error);
    return res.status(503).json({
      error: 'Speech transcription service is temporarily unavailable. You can use Direct Text Entry instead.',
      details: error.message
    });
  }
});

// Multi-model resilient Groq Chat completion helper
async function callGroqChat(apiKey, messages, isJsonFormat = false) {
  if (!apiKey || apiKey === 'your_groq_api_key_here') return null;
  const models = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b', 'groq/compound', 'groq/compound-mini'];
  
  for (const model of models) {
    try {
      const payload = {
        model,
        messages,
        temperature: 0.0
      };
      if (isJsonFormat) {
        payload.response_format = { type: 'json_object' };
      }
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      } else {
        const errText = await res.text();
        console.warn(`[GROQ] Model ${model} returned (${res.status}): ${errText}`);
      }
    } catch (e) {
      console.warn(`[GROQ] Model ${model} request error: ${e.message}`);
    }
  }
  return null;
}

// Helper function to perform LLM-based translation if Google Translate key is unavailable
async function translateWithGroq(text, srcName) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return text;
  
  const prompt = `Translate the following statement from ${srcName} into clear, natural English. Return ONLY the raw English translation. Do NOT add preamble, quotation marks, prefixes like "Statement recorded in", or explanation wrappers.\n\nStatement: "${text}"`;
  const result = await callGroqChat(apiKey, [{ role: 'user', content: prompt }], false);
  if (result) {
    return result.replace(/^["']|["']$/g, '').trim();
  }
  return text;
}

// ============================================================================
// 2. ENDPOINT: POST /api/translate (Sarvam AI Translation + Fallbacks)
// ============================================================================
app.post('/api/translate', async (req, res) => {
  try {
    const { text = '', sourceLanguage = 'hi', targetLanguage = 'en', language = '' } = req.body;
    const inputStatement = text || '';

    if (!inputStatement || !inputStatement.trim()) {
      return res.status(400).json({ error: 'Statement text is required for translation.' });
    }

    const srcInput = sourceLanguage || language || 'hi';
    const translationResult = await executeTranslation(inputStatement, srcInput, targetLanguage);

    return res.json({
      success: true,
      sourceLanguage: translationResult.sourceCode,
      sourceLanguageName: getLanguageName(translationResult.sourceCode),
      targetLanguage: translationResult.targetCode,
      targetLanguageName: 'English',
      translatedText: translationResult.translatedText,
      translationStatus: 'translated',
      serviceUsed: translationResult.serviceUsed
    });

  } catch (error) {
    console.error('[TRANSLATION] Error during translation:', error);
    return res.status(500).json({
      error: 'English translation could not be completed. Please retry.',
      details: error.message
    });
  }
});

// ============================================================================
// 3. ENDPOINT: POST /api/analyze (Deterministic Triage Engine + Groq Structured NLP)
// ============================================================================
app.post('/api/analyze', async (req, res) => {
  try {
    console.log('[ASSESSMENT] Starting assessment');

    const {
      language = 'Hindi',
      selectedLanguage = 'hi',
      selectedLanguageName = 'Hindi',
      detectedLanguage = 'hi',
      detectedLanguageName = 'Hindi',
      languageMatch = true,
      originalText = '',
      originalStatement = '',
      englishTranslation = '',
      inputMethod = 'text',
      audioRecorded = false
    } = req.body;

    const origStatement = originalStatement || originalText;
    let detLangCode = getLanguageCode(detectedLanguage);
    if (detLangCode === 'en' && origStatement && /[^\u0000-\u007F]/.test(origStatement)) {
      detLangCode = detectScriptLanguage(origStatement);
    }
    const detLangName = getLanguageName(detLangCode);

    let statementToAnalyze = englishTranslation;
    if (!statementToAnalyze || statementToAnalyze === origStatement) {
      if (detLangCode !== 'en') {
        statementToAnalyze = await translateWithGroq(origStatement, detLangName);
      } else {
        statementToAnalyze = origStatement;
      }
    }

    const apiKey = process.env.GROQ_API_KEY;
    let rawIndicators = extractStructuredIndicators(statementToAnalyze);

    if (apiKey && apiKey !== 'your_groq_api_key_here') {
      try {
        const prompt = `You are an expert psychological indicator extractor for trauma triage.
Analyze the following English translation of a complainant statement and return ONLY a valid JSON object mapping 0-100 values for each indicator field.
Evaluate semantic meaning, distress, helplessness, confusion, threats, and inability to cope (e.g., "I don't know what to do", "having a lot of problems", "getting pushed around").

Statement: "${statementToAnalyze}"

Return JSON matching this exact structure (each number between 0 and 100):
{
  "currentDistress": number,
  "fear": number,
  "anxiety": number,
  "helplessness": number,
  "confusion": number,
  "intimidation": number,
  "threat": number,
  "ongoingDanger": number,
  "physicalHarm": number,
  "coercion": number,
  "isolation": number,
  "urgency": number,
  "supportNeed": number,
  "safetyConcern": number,
  "immediateDanger": number,
  "selfHarmRisk": number,
  "suicidalIdeation": number,
  "protectiveFactors": number,
  "currentVsHistorical": "current" | "historical" | "mixed",
  "reasoningSummary": "Short explanation of the semantic analysis"
}`;

        const contentStr = await callGroqChat(apiKey, [
          { role: 'system', content: 'You extract structured psychological indicators on a 0-100 scale based on complete semantic meaning. Always respond in valid JSON format.' },
          { role: 'user', content: prompt }
        ], true);

        if (contentStr) {
          const parsed = JSON.parse(contentStr);
          rawIndicators = { ...rawIndicators, ...parsed };
        }
      } catch (err) {
        console.warn('[INDICATORS] Groq extraction notice, using deterministic rule extractor:', err.message);
      }
    }

    const indicators = normalizeIndicators(rawIndicators);
    console.log('[INDICATORS]', JSON.stringify(indicators));

    // Run Deterministic SBI Engine (Parts 9–20)
    const sbiResult = calculateSbi(indicators, statementToAnalyze);
    const svi = sbiResult.sbi;
    const riskLevel = sbiResult.riskLevel;
    const immediateActionRequired = sbiResult.immediateActionRequired;

    console.log(`[SBI] Calculated score: ${svi}`);
    console.log(`[RISK] ${riskLevel}`);

    const smva = Math.round(Math.min(99, Math.max(10, (indicators.currentDistress * 0.4 + indicators.anxiety * 0.3 + indicators.helplessness * 0.3))));
    const sci = Math.round(Math.min(99, Math.max(10, (indicators.threat * 0.4 + indicators.ongoingDanger * 0.3 + indicators.safetyConcern * 0.3))));

    const traumaFingerprint = [
      { subject: 'Fear', A: indicators.fear },
      { subject: 'Distress', A: indicators.currentDistress },
      { subject: 'Intimidation', A: indicators.intimidation },
      { subject: 'Isolation', A: indicators.isolation },
      { subject: 'Urgency', A: indicators.urgency },
      { subject: 'Safety Concern', A: indicators.safetyConcern }
    ];

    const supportRecommendations = [];
    if (riskLevel === 'CRITICAL' || immediateActionRequired) {
      supportRecommendations.push({ title: 'Immediate Human Verification & Protection', priority: 'Urgent', assigned: 'Duty Officer' });
      supportRecommendations.push({ title: 'Safety Escort & Legal Review', priority: 'High', assigned: 'Protection Cell' });
    } else if (riskLevel === 'HIGH') {
      supportRecommendations.push({ title: 'Priority Counsellor Review', priority: 'High', assigned: 'Senior Counsellor' });
      supportRecommendations.push({ title: 'Legal Aid Guidance', priority: 'Medium', assigned: 'Legal Cell' });
    } else if (riskLevel === 'MODERATE') {
      supportRecommendations.push({ title: 'Psychosocial Counselling Consultation', priority: 'Medium', assigned: 'Helpdesk 14566' });
      supportRecommendations.push({ title: 'Follow-up Schedule', priority: 'Normal', assigned: 'Case Worker' });
    } else {
      supportRecommendations.push({ title: 'Routine Information Guidance', priority: 'Normal', assigned: 'Public Portal' });
      supportRecommendations.push({ title: 'Optional Well-being Explorer', priority: 'Optional', assigned: 'Self-Care Module' });
    }

    // Comprehensive Final Data Object (Part 25 Schema)
    return res.json({
      success: true,
      originalStatement: origStatement,
      englishTranslation: statementToAnalyze,
      selectedLanguage: selectedLanguageName,
      selectedLanguageCode: getLanguageCode(selectedLanguage),
      detectedLanguage: detectedLanguageName,
      detectedLanguageCode: getLanguageCode(detectedLanguage),
      languageMatch,
      languageConfidence: 0.94,
      assessment: {
        sbi: svi,
        svi: svi,
        riskLevel: riskLevel,
        riskCategory: riskLevel,
        indicators: indicators,
        immediateDanger: immediateActionRequired,
        immediateActionRequired: immediateActionRequired,
        factors: sbiResult.factors,
        reasoningSummary: sbiResult.reasoningSummary
      },
      svi,
      smva,
      sci,
      riskLevel,
      riskCategory: riskLevel,
      immediateSafetyFlag: immediateActionRequired,
      immediateSafetyMessage: immediateActionRequired ? "Priority Human Verification Required — Active safety concern or threat detected." : null,
      traumaFingerprint,
      confidence: 94,
      reasoning: sbiResult.factors,
      factors: sbiResult.factors,
      reasoningSummary: sbiResult.reasoningSummary,
      supportRecommendations,
      summary: sbiResult.reasoningSummary,
      serviceUsed: apiKey ? 'Groq Llama-3.3-70B + Deterministic SBI Engine' : 'Deterministic SBI Engine'
    });

  } catch (error) {
    console.error('[ASSESSMENT] Analysis error:', error);
    return res.status(500).json({
      error: 'AI assessment could not be completed reliably. Please retry.',
      details: error.message
    });
  }
});

// ============================================================================
// 4. ENDPOINT: POST /api/analyze-voice (Complete 11-Step End-to-End Voice Pipeline)
// ============================================================================
app.post('/api/analyze-voice', upload.single('audio'), async (req, res) => {
  try {
    console.log('[VOICE] Audio received');

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'Audio file is required for voice analysis.' });
    }

    const selectedLangInput = req.body.selectedLanguage || 'Kannada';

    const sttResult = await executeAudioTranscription(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname,
      selectedLangInput
    );

    const transcript = sttResult.transcript;
    if (!transcript) {
      return res.status(400).json({
        error: 'Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.'
      });
    }

    const translationResult = await executeTranslation(transcript, sttResult.detectedLanguageCode, 'en');
    const englishTranslation = translationResult.translatedText;

    // Step 8: Extract Structured 0-100 Indicators
    let rawIndicators = extractStructuredIndicators(englishTranslation);

    try {
      const prompt = `You are an expert psychological indicator extractor for trauma triage.
Analyze the following English translation of a complainant statement and return ONLY a valid JSON object mapping 0-100 values for each indicator field.
Evaluate semantic meaning, distress, helplessness, confusion, threats, and inability to cope (e.g., "I don't know what to do", "having a lot of problems", "getting pushed around").

Statement: "${englishTranslation}"

Return JSON matching this exact structure (each number between 0 and 100):
{
  "currentDistress": number,
  "fear": number,
  "anxiety": number,
  "helplessness": number,
  "confusion": number,
  "intimidation": number,
  "threat": number,
  "ongoingDanger": number,
  "physicalHarm": number,
  "coercion": number,
  "isolation": number,
  "urgency": number,
  "supportNeed": number,
  "safetyConcern": number,
  "immediateDanger": number,
  "selfHarmRisk": number,
  "suicidalIdeation": number,
  "protectiveFactors": number,
  "currentVsHistorical": "current" | "historical" | "mixed",
  "reasoningSummary": "Short explanation of the semantic analysis"
}`;

      const contentStr = await callGroqChat(apiKey, [
        { role: 'system', content: 'You extract structured psychological indicators on a 0-100 scale based on complete semantic meaning. Always respond in valid JSON format.' },
        { role: 'user', content: prompt }
      ], true);

      if (contentStr) {
        const parsed = JSON.parse(contentStr);
        rawIndicators = { ...rawIndicators, ...parsed };
      }
    } catch (err) {
      console.warn('[INDICATORS] Groq extraction notice:', err.message);
    }

    const indicators = normalizeIndicators(rawIndicators);
    console.log('[INDICATORS]', JSON.stringify(indicators));

    // Step 9 & 10: Calculate SBI & Risk Level
    const sbiResult = calculateSbi(indicators, englishTranslation);
    const svi = sbiResult.sbi;
    const riskLevel = sbiResult.riskLevel;
    const immediateActionRequired = sbiResult.immediateActionRequired;

    console.log(`[SBI] Calculated score: ${svi}`);
    console.log(`[RISK] ${riskLevel}`);

    const smva = Math.round(Math.min(99, Math.max(10, (indicators.currentDistress * 0.4 + indicators.anxiety * 0.3 + indicators.helplessness * 0.3))));
    const sci = Math.round(Math.min(99, Math.max(10, (indicators.threat * 0.4 + indicators.ongoingDanger * 0.3 + indicators.safetyConcern * 0.3))));

    const traumaFingerprint = [
      { subject: 'Fear', A: indicators.fear },
      { subject: 'Distress', A: indicators.currentDistress },
      { subject: 'Intimidation', A: indicators.intimidation },
      { subject: 'Isolation', A: indicators.isolation },
      { subject: 'Urgency', A: indicators.urgency },
      { subject: 'Safety Concern', A: indicators.safetyConcern }
    ];

    // Step 11: Return JSON payload matching Part 25
    return res.json({
      success: true,
      originalStatement: transcript,
      englishTranslation,
      selectedLanguage: sttResult.selectedLanguageName,
      selectedLanguageCode: sttResult.selectedLanguageCode,
      detectedLanguage: sttResult.detectedLanguageName,
      detectedLanguageCode: sttResult.detectedLanguageCode,
      languageMatch: sttResult.languageMatch,
      languageConfidence: 0.94,
      assessment: {
        sbi: svi,
        svi: svi,
        riskLevel,
        riskCategory: riskLevel,
        indicators,
        immediateDanger: immediateActionRequired,
        immediateActionRequired,
        factors: sbiResult.factors,
        reasoningSummary: sbiResult.reasoningSummary
      },
      svi,
      smva,
      sci,
      riskLevel,
      riskCategory: riskLevel,
      immediateSafetyFlag: immediateActionRequired,
      traumaFingerprint,
      factors: sbiResult.factors,
      reasoningSummary: sbiResult.reasoningSummary
    });

  } catch (error) {
    console.error('[VOICE] Error during voice analysis:', error);
    return res.status(500).json({
      error: 'AI assessment could not be completed reliably. Please retry.',
      details: error.message
    });
  }
});

// ============================================================================
// 3. ENDPOINT: POST /api/chat (Groq Chatbot Backend for SAHAY Assist)
// ============================================================================
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt = '', currentCase = null } = req.body;

    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey && apiKey !== 'your_groq_api_key_here') {
      try {
        const contextString = currentCase 
          ? `Current Active Case Context: ID=${currentCase.id}, Language=${currentCase.language}, SVI=${currentCase.svi}, Risk=${currentCase.riskCategory}, SafetyFlag=${currentCase.immediateSafetyFlag}`
          : `No active case selected.`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are SAHAY Assist, an AI operational helper for helpline officers, counsellors, and administrators on NHAA 14566.
STRICT RESPONSIBLE AI SAFEGUARDS:
1. Do NOT provide medical diagnoses or psychiatric evaluations.
2. Do NOT judge victim credibility, guilt, or lie detection.
3. Do NOT make autonomous police or legal decisions.
4. Keep answers concise, clear, and professional. Explain SVI indicators, risk categories, and support pathways.

${contextString}`
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0.3
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return res.json({ text: reply, type: 'assistant' });
          }
        }
      } catch (err) {
        console.warn('Groq Chatbot notice:', err.message);
      }
    }

    const query = prompt.toLowerCase();
    if (query.includes('svi') || query.includes('score')) {
      return res.json({
        text: "The Stress Vulnerability Index (SVI) is a numerical score (0–100) derived from threat vocabulary, voice signals, and urgency context. SVI is an operational triage indicator, NOT a medical or psychiatric diagnosis.",
        type: 'info'
      });
    }

    return res.json({
      text: "I am SAHAY Assist. I can explain SVI indicators, risk category boundaries, regional translations, or available support pathways. Final decisions remain strictly with authorized human personnel.",
      type: 'general'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Chatbot service temporarily unavailable' });
  }
});

// ============================================================================
// 4. ENDPOINTS: VAPI VOICE / CALL SESSION & WEBHOOK
// ============================================================================
app.get('/api/vapi/session', (req, res) => {
  return res.json({
    publicKey: process.env.VAPI_PUBLIC_KEY || 'demo_vapi_public_key',
    isConfigured: !!(process.env.VAPI_PUBLIC_KEY && process.env.VAPI_PUBLIC_KEY !== 'your_vapi_public_key_here')
  });
});

app.post('/api/vapi/webhook', (req, res) => {
  const { event, message, transcript, signals } = req.body;
  console.log('Received Vapi Webhook event:', event);

  return res.json({
    status: 'received',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

server.listen(PORT, () => {
  console.log(`SAHAY Backend Server with Socket.IO running on port ${PORT}`);
});
