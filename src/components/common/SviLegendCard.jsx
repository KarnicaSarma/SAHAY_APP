import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const SviLegendCard = ({ compact = false, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-800" />
          <span>Stress Vulnerability Index (SVI Scale: 0–100)</span>
        </h3>
        <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border border-slate-200">
          Prioritization Scale
        </span>
      </div>

      {/* SVI Scale Grid */}
      <div className={`grid ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-2.5 text-xs font-sans`}>
        
        {/* LOW 0-25 */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-start gap-2.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0 mt-1" />
          <div>
            <div className="font-mono font-bold text-emerald-900">0–25 | LOW</div>
            <div className="text-slate-700 font-medium text-[11px] mt-0.5">Routine Support</div>
          </div>
        </div>

        {/* MODERATE 26-50 */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0 mt-1" />
          <div>
            <div className="font-mono font-bold text-amber-900">26–50 | MODERATE</div>
            <div className="text-slate-700 font-medium text-[11px] mt-0.5">Support Recommended</div>
          </div>
        </div>

        {/* HIGH 51-75 */}
        <div className="bg-orange-50 border border-orange-200 rounded-md p-3 flex items-start gap-2.5">
          <span className="w-3 h-3 rounded-full bg-orange-600 shrink-0 mt-1" />
          <div>
            <div className="font-mono font-bold text-orange-900">51–75 | HIGH</div>
            <div className="text-slate-700 font-medium text-[11px] mt-0.5">Priority Human Review</div>
          </div>
        </div>

        {/* CRITICAL 76-100 */}
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2.5">
          <span className="w-3 h-3 rounded-full bg-red-600 shrink-0 mt-1" />
          <div>
            <div className="font-mono font-bold text-red-900">76–100 | CRITICAL</div>
            <div className="text-slate-700 font-medium text-[11px] mt-0.5">Immediate Attention Required</div>
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>SVI is an AI-assisted prioritization indicator for initial triage, not a clinical diagnosis.</span>
      </div>

    </div>
  );
};
