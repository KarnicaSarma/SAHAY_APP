import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, PhoneCall, Volume2, EyeOff, Shield, LogOut, Check } from 'lucide-react';

export const VictimFacingPage = () => {
  const { setActivePage, setIsDiscreetMode, addToast } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleAudioListen = () => {
    setIsPlayingAudio(true);
    addToast("Audio Assistance: 'Namaste. SAHAY helpline is here to support you safely.'", "info");
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  const handleVictimAction = (actionText) => {
    setSelectedAction(actionText);
    addToast(`Support Request Triggered: "${actionText}". Connecting to helpline...`, "success");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8 text-center">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-800" />
          <span className="font-bold text-sm text-slate-900">SAHAY Support Portal</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAudioListen}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
              isPlayingAudio ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Audio</span>
          </button>

          <button
            onClick={() => {
              setIsDiscreetMode(true);
              addToast("Discreet Safe Mode Activated", "warning");
            }}
            className="px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <EyeOff className="w-4 h-4" />
            <span>Discreet Mode</span>
          </button>

          <button
            onClick={() => window.location.href = "https://www.google.com"}
            className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Quick Exit</span>
          </button>
        </div>
      </div>

      {/* Main Heading */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          You are not alone. Support is available.
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto font-normal">
          Select what you need right now. Everything shared is confidential and secure.
        </p>
      </div>

      {/* 3 Action Buttons */}
      <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto pt-2">
        
        <button
          onClick={() => handleVictimAction("I Need Guidance")}
          className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            selectedAction === "I Need Guidance"
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white border-slate-300 hover:border-slate-800 text-slate-900'
          }`}
        >
          <div>
            <div className="font-bold text-base">I Need Guidance & Information</div>
            <div className="text-xs opacity-80 mt-0.5">Access helpline support services & procedure information</div>
          </div>
          <HeartHandshake className="w-7 h-7 shrink-0" />
        </button>

        <button
          onClick={() => handleVictimAction("I Want to Speak to a Counsellor")}
          className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            selectedAction === "I Want to Speak to a Counsellor"
              ? 'bg-emerald-900 text-white border-emerald-900'
              : 'bg-white border-emerald-700/40 hover:border-emerald-800 text-emerald-950'
          }`}
        >
          <div>
            <div className="font-bold text-base">I Want to Speak to a Counsellor</div>
            <div className="text-xs opacity-80 mt-0.5">Connect directly with a trained counsellor on NHAA 14566</div>
          </div>
          <PhoneCall className="w-7 h-7 shrink-0" />
        </button>

        <button
          onClick={() => handleVictimAction("I Don't Feel Safe")}
          className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            selectedAction === "I Don't Feel Safe"
              ? 'bg-red-800 text-white border-red-800'
              : 'bg-white border-red-300 hover:border-red-700 text-red-950'
          }`}
        >
          <div>
            <div className="font-bold text-base">I Don't Feel Safe</div>
            <div className="text-xs opacity-80 mt-0.5">Request immediate safety review & emergency assistance</div>
          </div>
          <Shield className="w-7 h-7 shrink-0" />
        </button>

      </div>

      {selectedAction && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-lg text-xs font-semibold text-emerald-900 animate-in fade-in">
          ✓ Thank you. A helpline officer has been notified. You can also call <strong>14566</strong> or <strong>112</strong> anytime.
        </div>
      )}

      {/* Return to Officer Portal Button */}
      <div className="pt-4">
        <button
          onClick={() => setActivePage('dashboard')}
          className="text-xs text-slate-500 underline hover:text-slate-900 cursor-pointer"
        >
          Return to Officer Portal Workspace
        </button>
      </div>

    </div>
  );
};
