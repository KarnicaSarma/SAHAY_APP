import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Database, Key, FileCheck } from 'lucide-react';

export const PrivacyPage = () => {
  const { addToast, addAuditLog } = useApp();
  const [voiceRetention, setVoiceRetention] = useState('7 days');
  const [transcriptRetention, setTranscriptRetention] = useState('30 days');

  const handleSaveRetention = () => {
    addToast('Data retention policies updated successfully.', 'success');
    addAuditLog('Data Retention Config Updated', `Voice: ${voiceRetention}, Transcripts: ${transcriptRetention}`);
  };

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <ShieldCheck className="w-5 h-5 text-slate-800" />
          <span>Privacy Architecture & Data Governance</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Consent-first processing, encrypted local storage, and automated retention controls
        </p>
      </div>

      {/* Privacy Architecture Diagram */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4 text-center">
        <h3 className="font-bold text-sm text-slate-900">
          Privacy-by-Design Data Lifecycle Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2.5 text-xs pt-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <Lock className="w-4 h-4 mx-auto text-slate-800" />
            <div className="font-bold">1. Patient Intake</div>
            <div className="text-[10px] text-slate-500">Toll-free 14566</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <ShieldCheck className="w-4 h-4 mx-auto text-emerald-700" />
            <div className="font-bold">2. Consent Layer</div>
            <div className="text-[10px] text-slate-500">Opt-in consent</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <Key className="w-4 h-4 mx-auto text-amber-700" />
            <div className="font-bold">3. Local Engine</div>
            <div className="text-[10px] text-slate-500">Local feature extraction</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <FileCheck className="w-4 h-4 mx-auto text-slate-800" />
            <div className="font-bold">4. Indicator Fusion</div>
            <div className="text-[10px] text-slate-500">SVI calculation</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <ShieldCheck className="w-4 h-4 mx-auto text-emerald-700" />
            <div className="font-bold">5. Human Review</div>
            <div className="text-[10px] text-slate-500">Caseworker oversight</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <Database className="w-4 h-4 mx-auto text-slate-500" />
            <div className="font-bold">6. Referral</div>
            <div className="text-[10px] text-slate-500">Assigned support</div>
          </div>
        </div>
      </div>

      {/* Retention Controls Configuration Box */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4 max-w-2xl">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
          Data Retention & Purge Policy Configuration
        </h3>

        <div className="space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-900 mb-1">Voice Recording Retention Policy:</label>
            <select
              value={voiceRetention}
              onChange={(e) => setVoiceRetention(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500 text-xs font-medium cursor-pointer"
            >
              <option value="Immediate Purge">Delete Raw Audio Immediately After Feature Extraction</option>
              <option value="7 days">Retain Encrypted Audio for 7 Days (Default Protocol)</option>
              <option value="30 days">Retain Encrypted Audio for 30 Days (Legal Hold)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">Transcript Text Retention Policy:</label>
            <select
              value={transcriptRetention}
              onChange={(e) => setTranscriptRetention(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500 text-xs font-medium cursor-pointer"
            >
              <option value="30 days">Anonymize & Retain Transcripts for 30 Days</option>
              <option value="90 days">Anonymize & Retain Transcripts for 90 Days</option>
              <option value="Manual Purge Only">Manual Purge Only Upon Case Closure</option>
            </select>
          </div>

          <button
            onClick={handleSaveRetention}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors"
          >
            Update Retention Policy
          </button>

        </div>
      </div>

    </div>
  );
};
