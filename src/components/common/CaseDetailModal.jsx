import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge, StatusBadge } from './Badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {
  X, Globe, Volume2, FileText, AlertTriangle, CheckCircle2, UserCheck,
  ShieldAlert, Activity, Heart, Trees
} from 'lucide-react';

export const CaseDetailModal = ({ selectedCase, isOpen, onClose, onHumanDecision }) => {
  const { setActivePage } = useApp();
  const [viewLanguageMode, setViewLanguageMode] = useState('both'); // 'original', 'english', 'both'
  const [recordedDecision, setRecordedDecision] = useState(null);

  if (!isOpen || !selectedCase) return null;

  const handleActionClick = (actionName) => {
    setRecordedDecision(actionName);
    if (onHumanDecision) {
      onHumanDecision(selectedCase.id, actionName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-300 rounded-xl max-w-4xl w-full my-auto shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base sm:text-lg">{selectedCase.id}</span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-mono font-semibold">
                  SVI {selectedCase.svi}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedCase.category} • Intake: {selectedCase.timestamp || 'Today'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/20 text-white cursor-pointer transition-colors"
            title="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs text-slate-800">
          
          {/* Immediate Safety Flag Alert */}
          {selectedCase.immediateSafetyFlag && (
            <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-red-900 uppercase tracking-wide flex items-center gap-2">
                  <span>IMMEDIATE SAFETY FLAG DETECTED</span>
                  <span className="text-[10px] bg-red-700 text-white px-2 py-0.5 rounded font-mono">
                    Priority Review
                  </span>
                </div>
                <p className="text-xs text-slate-800">
                  {selectedCase.immediateSafetyMessage || "Possible ongoing threat detected in narrative. Authorized caseworker review required before protocol dispatch."}
                </p>
              </div>
            </div>
          )}

          {/* Section 1: Language View Toggle & Complaint Narrative */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-800" />
                <h4 className="font-bold text-sm text-slate-900">
                  Patient Narrative & Language Output
                </h4>
                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                  {selectedCase.languageDisplay || selectedCase.language}
                </span>
              </div>

              {/* Language Display Toggle */}
              <div className="flex bg-slate-100 border border-slate-200 rounded-md p-0.5">
                <button
                  onClick={() => setViewLanguageMode('original')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                    viewLanguageMode === 'original' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setViewLanguageMode('english')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                    viewLanguageMode === 'english' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setViewLanguageMode('both')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                    viewLanguageMode === 'both' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Both
                </button>
              </div>
            </div>

            {/* Complaint Text Box */}
            <div className="space-y-3 font-sans">
              
              {/* Original Native Script Text */}
              {(viewLanguageMode === 'original' || viewLanguageMode === 'both') && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <span>Original Statement — {selectedCase.language}</span>
                    <span className="font-mono text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">Native Script</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 leading-relaxed pt-1 italic">
                    "{selectedCase.victimNarrative || selectedCase.transcript}"
                  </p>
                </div>
              )}

              {/* English Translation */}
              {(viewLanguageMode === 'english' || viewLanguageMode === 'both') && (
                <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    <span>English Translation</span>
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">Authority Output</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 leading-relaxed pt-1">
                    "{selectedCase.translatedText}"
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Section 2: Multimodal Signal Analysis & Radar Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Multimodal Signals Box (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-800" />
                  <span>Multimodal Signal Extraction</span>
                </h4>
              </div>

              <div className="space-y-3">
                {/* Voice Signals */}
                <div className="bg-slate-900 text-white p-3.5 rounded-lg space-y-2">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Voice Acoustic Metrics:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                    <div><span className="text-slate-400 block">Speech Rate:</span><span className="text-white font-semibold">{selectedCase.multimodalSignals?.voice?.speechRate || "110 wpm"}</span></div>
                    <div><span className="text-slate-400 block">Pause Pattern:</span><span className="text-white font-semibold">{selectedCase.multimodalSignals?.voice?.pauseFrequency || "Frequent (3.2s)"}</span></div>
                    <div><span className="text-slate-400 block">Pitch Variation:</span><span className="text-white font-semibold">{selectedCase.multimodalSignals?.voice?.pitchVariation || "Muted tone"}</span></div>
                    <div><span className="text-slate-400 block">Hesitation:</span><span className="text-white font-semibold">{selectedCase.multimodalSignals?.voice?.hesitation || "Elevated"}</span></div>
                    <div><span className="text-slate-400 block">Voice Intensity:</span><span className="text-white font-semibold">{selectedCase.multimodalSignals?.voice?.voiceIntensity || "Subdued"}</span></div>
                  </div>
                </div>

                {/* Text Signals */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-slate-800 uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Text Narrative Indicators:</span>
                  </div>
                  <div className="text-xs text-slate-800 space-y-0.5">
                    <div>• <strong>Fear Language:</strong> {selectedCase.multimodalSignals?.text?.fearKeywords || "High fear keyword density"}</div>
                    <div>• <strong>Threat Keywords:</strong> {selectedCase.multimodalSignals?.text?.threatKeywords || "Direct verbal threats noted"}</div>
                    <div>• <strong>Distress & Isolation:</strong> {selectedCase.multimodalSignals?.text?.isolationKeywords || "Expressed feeling trapped"}</div>
                  </div>
                </div>

                {/* Case Context */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-slate-800 uppercase flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Contextual Factors:</span>
                  </div>
                  <div className="text-xs text-slate-800 space-y-0.5">
                    <div>• <strong>Primary Situation:</strong> {selectedCase.multimodalSignals?.context?.situation || selectedCase.problem}</div>
                    <div>• <strong>Duration:</strong> {selectedCase.multimodalSignals?.context?.duration || "Ongoing"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Chart (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
              <div className="border-b border-slate-200 pb-2">
                <h4 className="font-bold text-sm text-slate-900">
                  Support Indicators Profile
                </h4>
                <p className="text-[10px] text-slate-500">
                  Advisory triage profile — not a clinical diagnosis
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedCase.traumaFingerprint}>
                    <PolarGrid stroke="#CBD5E1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#0F172A', fontSize: 9, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 8 }} />
                    <Radar name="Support Profile" dataKey="A" stroke="#0F172A" fill="#0F172A" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Section 3: SVI Score & Factors */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-5 bg-white border-2 border-slate-900 p-5 rounded-xl text-center space-y-3 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Stress Vulnerability Index (SVI)
              </div>
              
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  {selectedCase.svi}
                </span>
                <span className="text-lg font-bold text-slate-400">/ 100</span>
              </div>

              <div>
                <RiskBadge risk={selectedCase.riskCategory} />
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-left text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Model Confidence:</span>
                  <span className="font-bold font-mono text-slate-900">{selectedCase.confidence || 88}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Quality:</span>
                  <span className="font-semibold text-slate-900">{selectedCase.dataQuality || "Good"}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                Why was SVI {selectedCase.svi} calculated?
              </h4>

              <div className="space-y-2">
                {(selectedCase.keyIndicators || selectedCase.factors || []).map((ind, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                    <span className="text-slate-900 font-medium">{ind}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 4: Action Controls */}
          <div className="bg-white border border-slate-300 p-5 rounded-xl space-y-4 shadow-xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-slate-800" />
                <span>Caseworker Action Verification</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                AI scores are advisory. Select action decision:
              </p>
            </div>

            {recordedDecision && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-md font-semibold text-center text-xs">
                ✓ Recorded Caseworker Action: <strong>{recordedDecision}</strong>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => handleActionClick('Verify Assessment')}
                className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition-colors"
              >
                Verify Assessment
              </button>

              <button
                onClick={() => handleActionClick('Request Counsellor Review')}
                className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer transition-colors"
              >
                Request Counsellor Review
              </button>

              <button
                onClick={() => handleActionClick('Refer for Legal Support')}
                className="px-3.5 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white font-semibold cursor-pointer transition-colors"
              >
                Refer for Legal Support
              </button>

              <button
                onClick={() => handleActionClick('Schedule Follow-up')}
                className="px-3.5 py-2 rounded bg-slate-100 border border-slate-300 text-slate-900 hover:bg-slate-200 font-semibold cursor-pointer transition-colors"
              >
                Schedule Follow-up
              </button>
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg text-center text-[11px] text-slate-500 italic">
            SAHAY provides AI-assisted support prioritization for triage and requires professional human review.
          </div>

        </div>

      </div>
    </div>
  );
};
