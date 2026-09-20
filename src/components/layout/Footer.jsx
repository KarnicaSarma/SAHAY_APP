import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800 mt-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Healthcare Safety & System Limitations Banner */}
        <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-slate-300">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-xs">Clinical & System Limitations Notice</div>
              <p className="text-slate-400 text-[12px] leading-relaxed mt-0.5 max-w-4xl">
                This system provides AI-assisted preliminary assessment and is intended to organize reported information and identify potential risk indicators for authorized professional review. It does not replace professional medical diagnosis, clinical treatment, or emergency medical care.
              </p>
            </div>
          </div>
          <div className="shrink-0 bg-red-950/60 border border-red-800/60 px-3 py-1.5 rounded text-[11px] font-medium text-red-200">
            Emergency Threat: Call 112 / 14566
          </div>
        </div>

        {/* Footer Navigation & Product Information */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
          <div>
            <div className="font-bold text-sm text-white tracking-tight flex items-center gap-2">
              <span>SAHAY Platform</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono font-normal">
                SIH 2026 Prototype
              </span>
            </div>
            <p className="text-slate-400 mt-1 text-xs">
              Preliminary trauma triage & structured assessment workflow layer.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium">
            <button onClick={() => setActivePage('privacy')} className="hover:text-white transition-colors cursor-pointer text-slate-400">
              Privacy Architecture
            </button>
            <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors cursor-pointer text-slate-400">
              System Design
            </button>
            <button onClick={() => setActivePage('audit')} className="hover:text-white transition-colors cursor-pointer text-slate-400">
              Audit Logs
            </button>
            <button onClick={() => setActivePage('victim')} className="hover:text-white transition-colors cursor-pointer text-slate-400">
              Emergency Portal
            </button>
          </div>
        </div>

        {/* Copyright & Version Info */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
          <div>
            © 2026 SAHAY Team • Developed for Smart India Hackathon (SIH 2026) Demonstration
          </div>
          <div className="mt-2 sm:mt-0 font-mono text-slate-400">
            Version 1.2.0 • Light Triage Layer
          </div>
        </div>

      </div>
    </footer>
  );
};
