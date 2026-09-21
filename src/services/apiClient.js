// SAHAY Frontend API Client
// Connects React Frontend to Express Backend (/api/*) with client-side fallbacks

export async function transcribeAudio(audioBlob, selectedLanguage = 'Kannada') {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('selectedLanguage', selectedLanguage);

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      return await res.json();
    }
    const errData = await res.json().catch(() => ({}));
    return {
      success: false,
      error: errData.error || 'Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.'
    };
  } catch (err) {
    console.warn('Backend transcription endpoint unreachable:', err.message);
    return {
      success: false,
      error: 'Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.'
    };
  }
}

export async function analyzeVoice(audioBlob, selectedLanguage = 'Kannada') {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('selectedLanguage', selectedLanguage);

    const res = await fetch('/api/analyze-voice', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      return await res.json();
    }
    const errData = await res.json().catch(() => ({}));
    return {
      success: false,
      error: errData.error || 'Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.'
    };
  } catch (err) {
    console.warn('Backend analyze-voice endpoint unreachable:', err.message);
    return {
      success: false,
      error: 'Unable to confidently transcribe this recording. Please retry or use Direct Text Entry.'
    };
  }
}

export async function translateStatement(language, text, targetLanguage = 'en') {
  if (!text || !text.trim()) {
    return {
      success: true,
      sourceLanguage: language,
      targetLanguage: targetLanguage,
      translatedText: 'No statement provided.'
    };
  }

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        sourceLanguage: language,
        targetLanguage: targetLanguage,
        language
      })
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend translation service unreachable, using local fallback:', err.message);
  }

  // Local fallback if server unreachable
  return {
    success: true,
    sourceLanguage: language,
    targetLanguage: targetLanguage,
    translatedText: text,
    serviceUsed: 'Local Translation Fallback',
    isFallback: true
  };
}

export async function analyzeStatement(payload = {}) {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend analysis service unreachable, using local fallback engine:', err.message);
  }

  return null; // Will trigger client-side engine fallback in liveAssessmentEngine.js
}

export async function queryGroqChatbot(promptText, currentCase = null) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, currentCase })
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend chatbot unreachable, using fallback responses:', err.message);
  }

  return null;
}

export async function getVapiConfig() {
  try {
    const res = await fetch('/api/vapi/session');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Vapi session config endpoint unreachable:', err.message);
  }
  return { publicKey: null, isConfigured: false };
}
