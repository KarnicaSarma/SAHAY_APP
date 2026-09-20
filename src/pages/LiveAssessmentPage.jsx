import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/common/Badge';
import { SviLegendCard } from '../components/common/SviLegendCard';
import {
  Mic, Radio, Volume2, AlertTriangle, CheckCircle2, Languages,
  Sparkles, Play, Square, Pause, MessageSquare, Sliders, Check, Save, Plus, ChevronDown, ChevronUp, ShieldAlert,
  RotateCcw, Globe
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES, DEMO_STATEMENTS, analyzeLiveStatement, detectLanguageDetails
} from '../services/liveAssessmentEngine';

export const LiveAssessmentPage = () => {
  const {
    currentCase, loadDemoCase, addCaseToQueue, selectedLanguage, setSelectedLanguage,
    setActivePage, userRole, addToast, addAuditLog
  } = useApp();

  // Active Assessment ID Tracking
  const [liveCaseId, setLiveCaseId] = useState('LIVE-001');
  const [caseCounter, setCaseCounter] = useState(1);
  
  // Input Mode & Selected Language
  const [inputMode, setInputMode] = useState('Voice'); // 'Voice' or 'Text'
  const [assessmentLang, setAssessmentLang] = useState(selectedLanguage || 'Auto Detect');

  // Input & Recording State
  const [liveText, setLiveText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Real-time Language Detection Info
  const [detectedInfo, setDetectedInfo] = useState({
    language: 'Hindi',
    confidence: '95%',
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
  const speechRecognitionRef = useRef(null);

  // Update Real-Time Language Detection when text or selected language changes
  useEffect(() => {
    if (assessmentLang === 'Auto Detect') {
      const info = detectLanguageDetails(liveText);
      setDetectedInfo(info);
    } else {
      setDetectedInfo({
        language: assessmentLang,
        confidence: 'Manual Selection',
        isUncertain: false
      });
    }
  }, [liveText, assessmentLang]);

  // Helper for Speech Recognition Locale Code
  const getLangCode = (langName) => {
    switch (langName) {
      case 'English': return 'en-IN';
      case 'Hindi': return 'hi-IN';
      case 'Assamese': return 'as-IN';
      case 'Bengali': return 'bn-IN';
      case 'Marathi': return 'mr-IN';
      case 'Kannada': return 'kn-IN';
      default: return 'hi-IN';
    }
  };

  // Synchronize preset cases if loaded via top preset bar
  useEffect(() => {
    if (currentCase && !currentCase.id.startsWith('LIVE-')) {
      const origText = currentCase.victimNarrative || currentCase.translatedText || '';
      const caseLang = currentCase.language || 'Hindi';
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

  // Start Audio Recording (MediaRecorder + Web Speech API)
  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecordingSeconds(0);
    setHasRecordedAudio(false);
    setAudioUrl(null);
    setHasAnalyzed(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
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
      addToast("Recording started (Voice Simulation Mode active)...", "info");
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        const targetLocale = getLangCode(detectedInfo.language || assessmentLang);
        recognition.lang = targetLocale;

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setLiveText(currentTranscript);
        };

        recognition.onerror = (event) => {
          console.warn("Speech recognition notice:", event.error);
          if (event.error === 'language-not-supported') {
            addToast(`Speech recognition for ${assessmentLang} is unavailable in this browser. Enter transcript manually.`, "warning");
          }
        };

        speechRecognitionRef.current = recognition;
        recognition.start();
      } catch (e) {
        console.warn("Speech recognition notice:", e);
      }
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
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    setIsRecording(false);
    setHasRecordedAudio(true);
    addToast("Voice recorded successfully! Click ANALYZE STATEMENT to evaluate and translate.", "success");
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

  // Trigger Dynamic Analysis (Must occur ONLY when user clicks ANALYZE button or Ctrl+Enter)
  const handleRunAnalysis = (textToAnalyze = liveText) => {
    const textContent = textToAnalyze.trim();
    if (!textContent) {
      addToast("Please record voice or enter a statement before analyzing.", "warning");
      return;
    }

    if (isRecording) {
      stopRecording();
    }

    setIsAnalyzing(true);
    setAnalysisStep(1);
    addToast(`Processing assessment for ${liveCaseId}...`, "info");

    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setAnalysisStep(step);

      if (step >= 5) {
        clearInterval(interval);
        setIsAnalyzing(false);

        // Calculate dynamic assessment AND generate English translation ON THE SPOT
        const result = analyzeLiveStatement({
          text: textContent,
          languageInput: assessmentLang === 'Auto Detect' ? detectedInfo.language : assessmentLang,
          isVoiceMode: inputMode === 'Voice'
        });

        setAssessmentResult(result);
        setHasAnalyzed(true);
        setIsSaved(false);
        addToast(`Assessment Complete! SVI ${result.svi} / 100 (${result.riskCategory})`, "success");
        addAuditLog("Live Assessment Calculated", `Case ${liveCaseId}: Generated SVI ${result.svi} (${result.riskCategory})`);
      }
    }, 280);
  };

  // Reset for Next Live Assessment Session
  const handleNewAssessment = () => {
    const nextCounter = caseCounter + 1;
    const nextId = `LIVE-${String(nextCounter).padStart(3, '0')}`;
    setCaseCounter(nextCounter);
    setLiveCaseId(nextId);
    setLiveText('');
    setHasRecordedAudio(false);
    setAudioUrl(null);
    setIsPlayingAudio(false);
    setHasAnalyzed(false);
    setAssessmentResult(null);
    setIsSaved(false);
    setIsRecording(false);
    setRecordingSeconds(0);
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
      language: assessmentResult.language,
      languageDisplay: assessmentResult.languageDisplay,
      problem: assessmentResult.factors[0] || 'Live Intake Assessment',
      victimSpeaker: 'Live Complainant',
      victimNarrative: assessmentResult.victimNarrative,
      translatedText: assessmentResult.translatedText,
      svi: assessmentResult.svi,
      riskCategory: assessmentResult.riskCategory,
      immediateSafetyFlag: assessmentResult.immediateSafetyFlag,
      immediateSafetyMessage: assessmentResult.immediateSafetyMessage,
      humanReviewStatus: 'Awaiting Review',
      supportType: assessmentResult.riskCategory === 'CRITICAL' ? 'Safety & Protection' : 'Counselling',
      supportRecommendations: assessmentResult.supportRecommendations,
      traumaFingerprint: assessmentResult.traumaFingerprint,
      confidence: assessmentResult.confidence,
      dataQuality: assessmentResult.dataQuality,
      audioMetrics: assessmentResult.audioMetrics,
      factors: assessmentResult.factors,
      silentDistress: assessmentResult.silentDistress,
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
              Step 1 — Choose Input Method & Language
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Record spoken voice audio or enter text in the complainant's native language.
            </p>
          </div>

          {/* Manual Language Selector */}
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
                  {lang.flag ? `${lang.flag} ${lang.name}` : lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time Language Detection Status Card */}
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

          {detectedInfo.isUncertain && (
            <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Language Uncertain — Confirm manual selection</span>
            </div>
          )}
        </div>

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

        {/* VOICE MODE INTERACTION BOX */}
        {inputMode === 'Voice' && (
          <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
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
                    <span>🔴 Recording... 00:{String(recordingSeconds).padStart(2, '0')}</span>
                  </div>
                )}

                {hasRecordedAudio && !isRecording && (
                  <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Audio Captured</span>
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
                    <span>{isPlayingAudio ? 'Pause' : '▶ Play Recording'}</span>
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

            {/* Recorded Audio Waveform Bar */}
            {(isRecording || hasRecordedAudio) && (
              <div className="bg-slate-900 p-3 rounded-lg flex items-center justify-between gap-3 text-white text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5 shrink-0">
                  <Volume2 className="w-4 h-4 text-slate-300" />
                  <span>{isRecording ? "Capturing Audio Signal..." : "Audio Saved"}</span>
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
                <span className="text-[11px] text-slate-400 shrink-0">44.1kHz WAV</span>
              </div>
            )}

            {/* Original Spoken Transcript Display */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                <span>Original Spoken Statement ({detectedInfo.language}):</span>
                <span className="text-[11px] text-slate-500 font-normal">Inspect text before clicking Analyze</span>
              </label>
              <textarea
                value={liveText}
                onChange={(e) => {
                  setLiveText(e.target.value);
                  setHasAnalyzed(false);
                }}
                rows={3}
                placeholder="Spoken transcript will appear here in real time... Or edit transcript manually."
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
              placeholder="Describe what happened or type statement here in English, Hindi, Assamese, Bengali, Marathi, or Kannada... Press Ctrl+Enter to Analyze."
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

        {/* MANDATORY ANALYZE STATEMENT BUTTON */}
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
            <div className="text-amber-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>PROCESSING STATEMENT & CALCULATING TRIAGE METRICS...</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <span className={analysisStep >= 1 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Analyzing narrative text...</span>
              <span className={analysisStep >= 2 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Detecting language script...</span>
              <span className={analysisStep >= 3 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Translating to English...</span>
              <span className={analysisStep >= 4 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Calculating SVI score...</span>
              <span className={analysisStep >= 5 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>✓ Preparing assessment summary...</span>
            </div>
          </div>
        )}

      </div>

      {/* STEP 2 — ASSESSMENT RESULTS DISPLAY (Shown ONLY AFTER clicking ANALYZE STATEMENT) */}
      {hasAnalyzed && assessmentResult && (
        <div className="space-y-6">
          
          {/* SECTION A: ORIGINAL STATEMENT & ENGLISH TRANSLATION */}
          <div className="bg-white border border-slate-300 p-5 sm:p-6 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-800" />
                <h3 className="font-bold text-base text-slate-900">
                  Statement & Translation Output
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded text-xs font-semibold border border-slate-200 font-mono">
                Language: {assessmentResult.languageDisplay || assessmentResult.language}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Original Statement (Preserved in exact original language/script) */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Original Statement — {assessmentResult.language}
                </div>
                <p className="text-sm font-medium text-slate-900 leading-relaxed italic">
                  "{assessmentResult.victimNarrative || liveText}"
                </p>
              </div>

              {/* English Translation (Generated Post-Analyze) */}
              <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg space-y-1.5">
                <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>English Translation</span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono">Authority Output</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                  "{assessmentResult.translatedText}"
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

              {/* AI Metadata Box */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Confidence Score:</span>
                  <span className="font-bold text-slate-900 font-mono">{assessmentResult.confidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Quality:</span>
                  <span className="font-semibold text-slate-900">{assessmentResult.dataQuality}</span>
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
                        {assessmentResult.immediateSafetyFlag ? '🔴 DETECTED' : '🟢 NOT DETECTED'}
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

              {/* Why This Result? */}
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

              {/* Suggested Support Pathways */}
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
