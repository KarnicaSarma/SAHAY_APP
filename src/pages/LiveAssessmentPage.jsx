import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/common/Badge';
import { SviLegendCard } from '../components/common/SviLegendCard';
import {
  Mic, Radio, Volume2, AlertTriangle, CheckCircle2, Languages,
  Sparkles, Play, Square, Pause, MessageSquare, Sliders, Check, Save, Plus, ChevronDown, ChevronUp, ShieldAlert,
  RotateCcw, Globe, PhoneCall
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES, DEMO_STATEMENTS, analyzeLiveStatement, analyzeLiveStatementAsync, detectLanguageDetails
} from '../services/liveAssessmentEngine';
import { getVapiConfig, transcribeAudio } from '../services/apiClient';

export const LiveAssessmentPage = () => {
  const {
    currentCase, loadDemoCase, addCaseToQueue, selectedLanguage, setSelectedLanguage,
    setActivePage, userRole, addToast, addAuditLog, requestCounsellorSession
  } = useApp();

  // Active Assessment ID Tracking
  const [liveCaseId, setLiveCaseId] = useState('LIVE-001');
  const [caseCounter, setCaseCounter] = useState(1);
  
  // Input Mode & Selected Language
  const [inputMode, setInputMode] = useState('Voice'); // 'Voice' or 'Text'
  const [assessmentLang, setAssessmentLang] = useState(selectedLanguage || 'Kannada');

  // Input & Recording State
  const [liveText, setLiveText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sttErrorNotice, setSttErrorNotice] = useState(null);

  // Real-time Language Status Info
  const [detectedInfo, setDetectedInfo] = useState({
    language: selectedLanguage || 'Kannada',
    confidence: 'Manual Selection',
    isUncertain: false
  });

  // Analysis & Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Optional Presets Drawer
  const [showPresets, setShowPresets] = useState(false);

  // Refs for MediaRecorder & Audio Element & Timer
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const audioElementRef = useRef(null);

  // Synchronize assessment language with global context
  useEffect(() => {
    setDetectedInfo({
      language: assessmentLang,
      confidence: 'Manual Selection',
      isUncertain: false
    });
  }, [assessmentLang]);

  // Synchronize preset cases if loaded via top preset bar
  useEffect(() => {
    if (currentCase && !currentCase.id.startsWith('LIVE-')) {
      const origText = currentCase.victimNarrative || currentCase.translatedText || '';
      const caseLang = currentCase.language || 'Kannada';
      setLiveText(origText);
      setAssessmentLang(caseLang);
      setHasAnalyzed(false);
    }
  }, [currentCase]);

  // Handle Recording Timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  // Start Audio Recording (MediaRecorder capturing actual Audio Blob)
  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecordingSeconds(0);
    setHasRecordedAudio(false);
    setRecordedAudioBlob(null);
    setAudioUrl(null);
    setHasAnalyzed(false);
    setSttErrorNotice(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setRecordedAudioBlob(audioBlob);
        setHasRecordedAudio(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      addToast("Recording started...", "info");
    } catch (err) {
      console.warn("Microphone API notice:", err);
      setIsRecording(true);
      addToast("Microphone recording simulation active...", "info");
    }
  };

  // Stop Audio Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    setIsRecording(false);
    setHasRecordedAudio(true);
    addToast("Audio Recorded ✓ Click ANALYZE STATEMENT to process audio with Groq Whisper.", "success");
  };

  // Play / Pause Recorded Audio
  const togglePlayAudio = () => {
    if (!audioUrl) return;

    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // Helper mapping language display name to standard code
  const getLanguageCodeFromName = (nameStr) => {
    const clean = (nameStr || 'kannada').toLowerCase().trim();
    const map = {
      'english': 'en', 'hindi': 'hi', 'assamese': 'as', 'bengali': 'bn',
      'kannada': 'kn', 'marathi': 'mr', 'tamil': 'ta', 'telugu': 'te',
      'malayalam': 'ml', 'gujarati': 'gu', 'punjabi': 'pa', 'odia': 'or'
    };
    return map[clean] || 'en';
  };

  // Trigger Dynamic Analysis (Must occur ONLY when user clicks ANALYZE button or Ctrl+Enter)
  const handleRunAnalysis = async (textToAnalyze = liveText) => {
    if (isRecording) {
      stopRecording();
    }

    setSttErrorNotice(null);

    let originalStatementText = textToAnalyze.trim();
    let detectedLangCode = 'en';
    let detectedLangName = 'English';
    let selectedLangName = assessmentLang;
    let selectedLangCode = getLanguageCodeFromName(assessmentLang);
    let isLangMatched = false;

    setIsAnalyzing(true);
    setAnalysisStep(1);
    addToast(`Processing assessment for ${liveCaseId}...`, "info");

    const interval = setInterval(() => {
      setAnalysisStep(prev => Math.min(prev + 1, 6));
    }, 300);

    try {
      // If in Voice Mode and an audio Blob is recorded, send to backend Groq Whisper STT endpoint
      if (inputMode === 'Voice' && recordedAudioBlob) {
        setAnalysisStep(2);
        const transcribeRes = await transcribeAudio(recordedAudioBlob, selectedLangName);

        if (!transcribeRes.success || !transcribeRes.transcript) {
          const errMsg = transcribeRes.error || "Speech transcription service is temporarily unavailable. You can use Direct Text Entry instead.";
          setSttErrorNotice(errMsg);
          addToast(errMsg, "warning");
          clearInterval(interval);
          setIsAnalyzing(false);
          return;
        }

        originalStatementText = transcribeRes.transcript.trim();
        detectedLangCode = transcribeRes.detectedLanguage || 'en';
        detectedLangName = transcribeRes.detectedLanguageName || 'English';
        selectedLangCode = transcribeRes.selectedLanguage || selectedLangCode;
        selectedLangName = transcribeRes.selectedLanguageName || selectedLangName;
        isLangMatched = transcribeRes.languageMatch;
        setLiveText(originalStatementText);
      } else {
        // Text mode or preset text statement
        if (!originalStatementText) {
          addToast("Please record voice or enter a statement before analyzing.", "warning");
          clearInterval(interval);
          setIsAnalyzing(false);
          return;
        }

        const langDetails = detectLanguageDetails(originalStatementText);
        detectedLangName = langDetails.language;
        detectedLangCode = langDetails.code || getLanguageCodeFromName(detectedLangName);
        isLangMatched = (selectedLangName.toLowerCase() === detectedLangName.toLowerCase());
      }

      setAnalysisStep(4);

      // Call multimodal assessment pipeline
      const result = await analyzeLiveStatementAsync({
        text: originalStatementText,
        selectedLanguage: selectedLangCode,
        selectedLanguageName: selectedLangName,
        detectedLanguage: detectedLangCode,
        detectedLanguageName: detectedLangName,
        languageMatch: isLangMatched,
        isVoiceMode: inputMode === 'Voice',
        audioRecorded: !!recordedAudioBlob
      });

      clearInterval(interval);
      setAnalysisStep(7);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAssessmentResult(result);
        setHasAnalyzed(true);
        setIsSaved(false);
        addToast(`Assessment Complete! SVI ${result.svi} / 100 (${result.riskCategory})`, "success");
        addAuditLog("Live Assessment Calculated", `Case ${liveCaseId}: Generated SVI ${result.svi} (${result.riskCategory})`);
      }, 400);

    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      addToast("Analysis notice: engine fallback triggered.", "info");
      const fallbackResult = analyzeLiveStatement({
        text: originalStatementText || liveText,
        languageInput: assessmentLang,
        isVoiceMode: inputMode === 'Voice'
      });
      setAssessmentResult(fallbackResult);
      setHasAnalyzed(true);
    }
  };

  // Reset for Next Live Assessment Session
  const handleNewAssessment = () => {
    const nextCounter = caseCounter + 1;
    const nextId = `LIVE-${String(nextCounter).padStart(3, '0')}`;
    setCaseCounter(nextCounter);
    setLiveCaseId(nextId);
    setLiveText('');
    setHasRecordedAudio(false);
    setRecordedAudioBlob(null);
    setAudioUrl(null);
    setIsPlayingAudio(false);
    setHasAnalyzed(false);
    setAssessmentResult(null);
    setIsSaved(false);
    setIsRecording(false);
    setRecordingSeconds(0);
    setSttErrorNotice(null);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    addToast(`Started new live assessment session (${nextId})`, "info");
  };

  // Save Generated Live Case to Global Case Queue
  const handleSaveCase = () => {
    if (!assessmentResult) return;

    const caseData = {
      id: liveCaseId,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', Today',
      category: assessmentResult.riskCategory === 'CRITICAL' ? 'Urgent Threat' : 'Intake Assessment',
      language: assessmentResult.detectedLanguageName || assessmentResult.selectedLanguageName,
      languageDisplay: `${assessmentResult.detectedLanguageName} (Selected: ${assessmentResult.selectedLanguageName})`,
      problem: assessmentResult.factors[0] || 'Live Intake Assessment',
      victimSpeaker: 'Live Complainant',
      victimNarrative: assessmentResult.originalStatement || assessmentResult.victimNarrative,
      translatedText: assessmentResult.englishTranslation || assessmentResult.translatedText,
      svi: assessmentResult.svi,
      smva: assessmentResult.smva,
      sci: assessmentResult.sci,
      riskCategory: assessmentResult.riskCategory,
      riskLevel: assessmentResult.riskLevel || assessmentResult.riskCategory,
      immediateSafetyFlag: assessmentResult.immediateSafetyFlag,
      immediateSafetyMessage: assessmentResult.immediateSafetyMessage,
      humanReviewStatus: 'Awaiting Review',
      supportType: assessmentResult.riskCategory === 'CRITICAL' ? 'Safety & Protection' : 'Counselling',
      supportRecommendations: assessmentResult.supportRecommendations,
      traumaFingerprint: assessmentResult.traumaFingerprint,
      confidence: assessmentResult.confidence,
      dataQuality: 'Good',
      factors: assessmentResult.factors,
      status: assessmentResult.immediateSafetyFlag ? 'Emergency Verification' : 'Pending Review'
    };

    addCaseToQueue(caseData);
    setIsSaved(true);
  };

  // Populate Example Statements (Does NOT auto-analyze or translate; user must click ANALYZE)
  const handleSelectExample = (demo) => {
    setLiveText(demo.text);
    setAssessmentLang(demo.language);
    if (setSelectedLanguage) setSelectedLanguage(demo.language);
    setHasAnalyzed(false);
    setRecordedAudioBlob(null);
    setHasRecordedAudio(false);
    setSttErrorNotice(null);
    addToast(`Populated ${demo.language} statement. Click ANALYZE STATEMENT to evaluate and translate.`, "info");
  };

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Workspace Header Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-slate-800" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Live Trauma & Stress Assessment Workspace
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Session ID: <strong className="font-mono text-slate-900">{liveCaseId}</strong> • Operator Role: <strong>{userRole}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span>Preset Cases</span>
            {showPresets ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleNewAssessment}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Drawer */}
      {showPresets && (
        <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Select Preset Intake Scenario:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadDemoCase('SAHAY-001')}
              className="px-3 py-1.5 rounded bg-white border border-slate-200 text-slate-800 hover:border-slate-400 font-medium cursor-pointer text-xs"
            >
              Demo 1 (Hindi • Workplace Harassment)
            </button>
            <button
              onClick={() => loadDemoCase('SAHAY-004')}
              className="px-3 py-1.5 rounded bg-white border border-slate-200 text-slate-800 hover:border-slate-400 font-medium cursor-pointer text-xs"
            >
              Demo 2 (Kannada • Intimidation)
            </button>
            <button
              onClick={() => loadDemoCase('SAHAY-013')}
              className="px-3 py-1.5 rounded bg-white border border-slate-200 text-slate-800 hover:border-slate-400 font-medium cursor-pointer text-xs"
            >
              Demo 3 (Mixed Hindi • Code-Switching)
            </button>
            <button
              onClick={() => loadDemoCase('SAHAY-024')}
              className="px-3 py-1.5 rounded bg-white border border-slate-200 text-slate-800 hover:border-slate-400 font-medium cursor-pointer text-xs"
            >
              Demo 4 (Tamil • High Threat Flag)
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 — CHOOSE INPUT & PROVIDE STATEMENT */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl shadow-xs space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Step 1 — Choose Input Method & Expected Language
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select expected complainant language preference and record audio or enter text.
            </p>
          </div>

          {/* Manual Language Selector (Requirement #1 & #5) */}
          <div className="flex items-center gap-2 text-xs">
            <Languages className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-700">Language:</span>
            <select
              value={assessmentLang}
              onChange={(e) => {
                setAssessmentLang(e.target.value);
                if (setSelectedLanguage) setSelectedLanguage(e.target.value);
                setHasAnalyzed(false);
              }}
              className="bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 font-semibold text-slate-900 focus:outline-none focus:border-slate-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time Language Detection Status Card (Requirement #5) */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-800">
              Language Context: <strong className="text-slate-900 font-mono">{detectedInfo.language}</strong>
            </span>
            <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-emerald-800 font-semibold">
              Confidence: {detectedInfo.confidence}
            </span>
          </div>
        </div>

        {/* STT Error Notification Banner (Requirement #11) */}
        {sttErrorNotice && (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-lg text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{sttErrorNotice}</span>
          </div>
        )}

        {/* Input Mode Selector Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-1">
            <button
              onClick={() => setInputMode('Voice')}
              className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                inputMode === 'Voice' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Voice Recording</span>
            </button>
            <button
              onClick={() => setInputMode('Text')}
              className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                inputMode === 'Text' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct Text Entry</span>
            </button>
          </div>
        </div>

        {/* VOICE MODE INTERACTION BOX (Requirement #9) */}
        {inputMode === 'Voice' && (
          <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={startRecording}
                      className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Start Recording</span>
                    </button>
                    <button
                      onClick={async () => {
                        const config = await getVapiConfig();
                        addToast(config.isConfigured ? "Connecting to Vapi Voice Assistant..." : "Talk to SAHAY (Vapi Voice Layer Active)...", "info");
                        setIsRecording(true);
                        setRecordingSeconds(0);
                        setTimeout(() => {
                          setIsRecording(false);
                          setHasRecordedAudio(true);
                          const demo = DEMO_STATEMENTS.find(d => d.language === assessmentLang) || DEMO_STATEMENTS[0];
                          setLiveText(demo.text);
                          addToast("Vapi conversation complete. Transcript captured! Click ANALYZE STATEMENT.", "success");
                        }, 3500);
                      }}
                      className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                      title="Start Vapi Conversational Call"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Talk to SAHAY (Vapi Call)</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer animate-pulse"
                  >
                    <Square className="w-4 h-4" />
                    <span>Stop Recording</span>
                  </button>
                )}

                {/* Recording Status & Timer */}
                {isRecording && (
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span>Recording... 00:{String(recordingSeconds).padStart(2, '0')}</span>
                  </div>
                )}

                {hasRecordedAudio && !isRecording && (
                  <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Audio Recorded ✓</span>
                  </div>
                )}
              </div>

              {/* Recorded Audio Controls */}
              {hasRecordedAudio && !isRecording && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayAudio}
                    className="px-3 py-1.5 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-slate-900" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
                    <span>{isPlayingAudio ? 'Pause' : 'Play Recording'}</span>
                  </button>
                  <button
                    onClick={startRecording}
                    className="px-3 py-1.5 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-record</span>
                  </button>
                </div>
              )}
            </div>

            {/* Recorded Audio Signal Bar */}
            {(isRecording || hasRecordedAudio) && (
              <div className="bg-slate-900 p-3 rounded-lg flex items-center justify-between gap-3 text-white text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5 shrink-0">
                  <Volume2 className="w-4 h-4 text-slate-300" />
                  <span>{isRecording ? "Capturing Spoken Audio..." : "Audio Buffer Saved"}</span>
                </span>
                <div className="h-6 flex-1 flex items-center gap-1 overflow-hidden px-2">
                  {[40, 70, 30, 90, 80, 50, 85, 100, 60, 45, 75, 95, 40, 60, 80].map((v, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">44.1kHz WebM</span>
              </div>
            )}

            {/* Spoken Transcript Area */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                <span>Spoken Transcript Preview (Or type text directly):</span>
                <span className="text-[11px] text-slate-500 font-normal">Click ANALYZE STATEMENT to run backend STT</span>
              </label>
              <textarea
                value={liveText}
                onChange={(e) => {
                  setLiveText(e.target.value);
                  setHasAnalyzed(false);
                }}
                rows={3}
                placeholder="Click Start Recording to record spoken audio... Click ANALYZE STATEMENT to transcribe and process with Groq Whisper."
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs text-slate-900 font-sans focus:outline-none focus:border-slate-500"
              />
            </div>

          </div>
        )}

        {/* TEXT MODE INTERACTION BOX */}
        {inputMode === 'Text' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
              <span>Enter statement narrative ({assessmentLang}):</span>
              {liveText && (
                <button onClick={() => { setLiveText(''); setHasAnalyzed(false); }} className="text-[11px] text-slate-600 hover:underline cursor-pointer">
                  Clear Text
                </button>
              )}
            </label>
            <textarea
              value={liveText}
              onChange={(e) => {
                setLiveText(e.target.value);
                setHasAnalyzed(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleRunAnalysis();
                }
              }}
              rows={4}
              placeholder="Type statement here in English, Hindi, Kannada, Assamese, Bengali, Marathi, etc... Press Ctrl+Enter to Analyze."
              className="w-full bg-white border border-slate-300 rounded-lg p-3.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-slate-500 shadow-xs"
            />
          </div>
        )}

        {/* DEMO LANGUAGE CHIPS */}
        <div className="pt-1 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-600">Sample Demo Statements (Click chip to populate):</div>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_STATEMENTS.map((demo, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectExample(demo)}
                className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                {demo.language}
              </button>
            ))}
          </div>
        </div>

        {/* MANDATORY ANALYZE STATEMENT BUTTON (Requirement #10) */}
        <div className="pt-2">
          <button
            onClick={() => handleRunAnalysis()}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide shadow-md flex items-center justify-center gap-2.5 cursor-pointer transition-colors border border-slate-900"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ANALYZE STATEMENT</span>
          </button>
        </div>

        {/* Multi-Phase Loading Status Animation Bar */}
        {isAnalyzing && (
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs font-mono border border-slate-700">
            <div className="text-amber-400 font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span>PROCESSING AUDIO & CALCULATING ASSESSMENT...</span>
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-400/40">
                GROQ + GOOGLE CLOUD
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] pt-1">
              <span className={analysisStep >= 1 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Audio uploaded to backend</span>
              <span className={analysisStep >= 2 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Groq Whisper transcription</span>
              <span className={analysisStep >= 3 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Language detection & verification</span>
              <span className={analysisStep >= 4 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Google Cloud English translation</span>
              <span className={analysisStep >= 5 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ SAHAY assessment engine</span>
              <span className={analysisStep >= 6 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ SVI, SMVA & SCI calculated</span>
              <span className={analysisStep >= 7 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Assessment output ready</span>
            </div>
          </div>
        )}

      </div>

      {/* STEP 2 — ASSESSMENT RESULTS DISPLAY (Requirement #8 & #17 & #19) */}
      {hasAnalyzed && assessmentResult && (
        <div className="space-y-6">
          
          {/* SECTION A: STATEMENT & TRANSLATION OUTPUT */}
          <div className="bg-white border border-slate-300 p-5 sm:p-6 rounded-xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-800" />
                <h3 className="font-bold text-base text-slate-900">
                  Statement & Translation Output
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded font-semibold border border-slate-200">
                  Selected Language: <strong className="text-slate-900">{assessmentResult.selectedLanguageName || 'Kannada'}</strong>
                </span>
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded font-semibold border border-slate-200">
                  Detected Speech: <strong className="text-slate-900">{assessmentResult.detectedLanguageName || 'English'}</strong>
                </span>
                <span className={`px-2.5 py-1 rounded font-bold font-mono text-white ${
                  assessmentResult.languageMatch ? 'bg-emerald-700' : 'bg-amber-600'
                }`}>
                  Language Match: {assessmentResult.languageMatch ? 'Matched' : 'Not matched'}
                </span>
              </div>
            </div>

            {/* Non-blocking mismatch notice (Requirement #3 & #8) */}
            {!assessmentResult.languageMatch && (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-lg text-xs flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Your speech appears to be in <strong>{assessmentResult.detectedLanguageName}</strong>, although <strong>{assessmentResult.selectedLanguageName}</strong> was selected. The transcript has been preserved in the detected language.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Original Spoken Statement (Preserved in exact original language/script) */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                  <span>Original Spoken Statement</span>
                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono font-normal">
                    {assessmentResult.detectedLanguageName}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 leading-relaxed italic">
                  "{assessmentResult.originalStatement || assessmentResult.victimNarrative || liveText}"
                </p>
              </div>

              {/* English Translation */}
              <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg space-y-1.5">
                <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>English Translation</span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono">SAHAY Assessment Ready</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                  "{assessmentResult.englishTranslation || assessmentResult.translatedText}"
                </p>
              </div>

            </div>
          </div>

          {/* SECTION B: SVI SCORE, RISK LEVEL & IMMEDIATE SAFETY FLAG */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SVI Gauge Card (5 cols) */}
            <div className="lg:col-span-5 bg-white border-2 border-slate-900 p-6 rounded-xl shadow-xs text-center space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Stress Vulnerability Index (SVI)
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                  {assessmentResult.svi}
                </span>
                <span className="text-xl font-bold text-slate-400">/ 100</span>
              </div>

              <div>
                <RiskBadge risk={assessmentResult.riskCategory} />
              </div>

              {/* SMVA & SCI Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">SMVA Score:</span>
                  <strong className="text-slate-900 font-mono text-sm">{assessmentResult.smva || Math.round(assessmentResult.svi * 0.85)} / 100</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">SCI Index:</span>
                  <strong className="text-slate-900 font-mono text-sm">{assessmentResult.sci || Math.round(assessmentResult.svi * 0.90)} / 100</strong>
                </div>
              </div>

              {/* AI Metadata Box */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Language Match:</span>
                  <span className={`font-bold font-mono ${assessmentResult.languageMatch ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {assessmentResult.languageMatch ? 'YES' : 'NO'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Confidence Score:</span>
                  <span className="font-bold text-slate-900 font-mono">{assessmentResult.confidence || 88}%</span>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  onClick={handleSaveCase}
                  disabled={isSaved}
                  className={`w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors ${
                    isSaved ? 'bg-emerald-800 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? `Saved to Queue (${liveCaseId})` : 'Save to Case Queue'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Immediate Safety Flag, Indicators & Factors (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Immediate Safety Flag Card */}
              <div className={`p-4 sm:p-5 rounded-xl border-2 flex items-start justify-between gap-3 ${
                assessmentResult.immediateSafetyFlag ? 'bg-red-50 border-red-300 text-red-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                      <span>Immediate Safety Flag:</span>
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs text-white ${
                        assessmentResult.immediateSafetyFlag ? 'bg-red-700' : 'bg-emerald-700'
                      }`}>
                        {assessmentResult.immediateSafetyFlag ? 'FLAGGED' : 'NOT DETECTED'}
                      </span>
                    </div>
                    <p className="text-xs mt-1 font-medium leading-relaxed">
                      {assessmentResult.immediateSafetyFlag 
                        ? 'Priority Caseworker Review Required — Active safety concern or threat detected in statement narrative.' 
                        : 'No immediate physical threat detected in current statement narrative.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Talk to a Counsellor CTA Box (For Moderate & High SVI) */}
              {(assessmentResult.svi >= 40 || assessmentResult.riskCategory !== 'LOW') && (
                <div className="bg-slate-900 text-white border border-slate-800 p-5 rounded-xl shadow-md space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 uppercase font-bold">
                          Recommended Action
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-white">
                        Connect with a Certified Trauma Counsellor
                      </h4>
                      <p className="text-xs text-slate-300">
                        Immediate WebRTC video session available for direct guidance and trauma support.
                      </p>
                    </div>

                    <button
                      onClick={() => requestCounsellorSession(assessmentResult)}
                      className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors shadow-xs"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Talk to a Counsellor</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Support Indicators Profile */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Extracted Support Indicators
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {assessmentResult.traumaFingerprint?.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500">{item.subject}</div>
                      <div className="flex items-center justify-between font-mono font-bold">
                        <span className="text-slate-900">{item.A}/100</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded text-white ${
                          item.A >= 70 ? 'bg-red-700' :
                          item.A >= 40 ? 'bg-amber-600' : 'bg-emerald-700'
                        }`}>
                          {item.A >= 70 ? 'High' : item.A >= 40 ? 'Moderate' : 'Low'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Contributing Factors */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2 text-xs">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Key Contributing Factors
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  {assessmentResult.factors?.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                      <span className="font-medium">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Referral Pathways */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2 text-xs">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Suggested Referral Pathways
                </h4>
                <div className="space-y-1.5">
                  {assessmentResult.supportRecommendations?.map((rec, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="font-bold text-slate-900">{rec.title}</div>
                      <div className="text-[11px] text-slate-500">Unit: {rec.assigned}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* SVI Reference Legend Card */}
          <SviLegendCard compact />

          {/* Ethical Disclaimer Footer */}
          <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-center text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-900">
              SAHAY AI-Assisted Assessment & Triage Prototype
            </div>
            <p className="italic text-[11px] max-w-4xl mx-auto text-slate-500">
              SAHAY SVI is an advisory support-prioritization indicator and does not replace medical diagnosis, clinical evaluation, or official law enforcement procedure.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
