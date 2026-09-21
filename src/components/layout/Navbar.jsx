import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, EyeOff, WifiOff, User, PhoneCall, Play, Sparkles, Video } from 'lucide-react';

export const Navbar = () => {
  const {
    setActivePage,
    userRole, handleRoleChange,
    isLowBandwidth, setIsLowBandwidth,
    isDiscreetMode, setIsDiscreetMode,
    selectedLanguage, setSelectedLanguage,
    setIsSahayAssistOpen,
    startSihGuidedDemo, isSihDemoRunning,
    addToast
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Product Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('landing')}>
          <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <Shield className="w-5 h-5 text-slate-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">SAHAY</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono">
                SIH 2026 Prototype
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              AI-Assisted Trauma & Triage Assessment Layer • <strong className="text-slate-800 font-medium">NHAA 14566</strong>
            </p>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* SIH Guided Demo Button */}
          <button
            onClick={startSihGuidedDemo}
            disabled={isSihDemoRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              isSihDemoRunning
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-xs'
            }`}
            title="Run Guided Assessment Demonstration"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden md:inline">Run Assessment Demo</span>
            <span className="md:hidden">Demo</span>
          </button>

          {/* Low Bandwidth Toggle */}
          <button
            onClick={() => {
              setIsLowBandwidth(!isLowBandwidth);
              addToast(isLowBandwidth ? "Low-Bandwidth mode disabled" : "Low-Bandwidth mode enabled (media optimizations active)", "info");
            }}
            className={`p-2 rounded-md border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              isLowBandwidth ? 'bg-amber-50 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle Low-Bandwidth Mode"
          >
            <WifiOff className="w-4 h-4" />
            <span className="hidden xl:inline text-xs">{isLowBandwidth ? 'Low-BW Mode' : 'Low-BW'}</span>
          </button>

          {/* Discreet Mode */}
          <button
            onClick={() => {
              setIsDiscreetMode(!isDiscreetMode);
              addToast(isDiscreetMode ? "Discreet mode disabled" : "Discreet mode enabled (sensitive metrics hidden)", "warning");
            }}
            className={`p-2 rounded-md border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              isDiscreetMode ? 'bg-slate-200 border-slate-400 text-slate-900 font-semibold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Discreet Safe Mode"
          >
            <EyeOff className="w-4 h-4" />
            <span className="hidden xl:inline text-xs">Discreet</span>
          </button>

          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-slate-400 hidden lg:block cursor-pointer"
          >
            <option value="Auto Detect">Auto Detect Language</option>
            <option value="Hindi">Hindi (हिन्दी)</option>
            <option value="Assamese">Assamese (অসমীয়া)</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
            <option value="English">English</option>
          </select>

          {/* SAHAY Assist Trigger */}
          <button
            onClick={() => setIsSahayAssistOpen(true)}
            className="p-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
            title="Open Assessment Assistant"
          >
            <Sparkles className="w-4 h-4 text-slate-800" />
            <span className="hidden lg:inline text-xs font-medium">Assistant</span>
          </button>

          {/* Join Counsellor Call Button for User / Patient */}
          <button
            onClick={() => setActivePage('user-meeting')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
            title="Join Counsellor Meeting"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Join Counsellor Call</span>
            <span className="sm:hidden">Join Call</span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <select
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              <option value="NHAA Officer">Role: NHAA Officer</option>
              <option value="Counsellor">Role: Counsellor</option>
              <option value="Patient / Complainant">Role: Patient / Complainant</option>
              <option value="District Officer">Role: District Officer</option>
              <option value="Welfare Officer">Role: Welfare Officer</option>
              <option value="Authorized Administrator">Role: Administrator</option>
            </select>
          </div>

          {/* Emergency Support Button */}
          <button
            onClick={() => {
              setActivePage('victim');
              addToast("Switched to Emergency Support view.", "warning");
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 14566</span>
          </button>

        </div>
      </div>
    </header>
  );
};
