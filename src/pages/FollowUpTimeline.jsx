import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, CheckCircle2, Calendar, Plus } from 'lucide-react';

export const FollowUpTimeline = () => {
  const { followUps, currentCase, addToast } = useApp();

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Clock className="w-5 h-5 text-slate-800" />
            <span>Follow-up & Support Milestone Timeline</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured follow-up schedule for case: <strong className="font-mono text-slate-900">{currentCase?.id || 'SAHAY-001'}</strong>
          </p>
        </div>

        <button
          onClick={() => addToast("New follow-up reminder scheduled for Day 45.", "success")}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Timeline Steps */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-6">
        
        <div className="relative border-l-2 border-slate-300 ml-4 space-y-6 py-2">
          {followUps.map((item, idx) => {
            const isCompleted = item.status === 'Completed';
            const isPending = item.status === 'Pending';

            return (
              <div key={idx} className="relative pl-6">
                
                {/* Timeline Circle */}
                <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  isCompleted ? 'bg-emerald-700 border-white text-white' :
                  isPending ? 'bg-amber-600 border-white text-white animate-pulse' :
                  'bg-slate-100 border-slate-400 text-slate-700'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                        {item.day}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        isCompleted ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        isPending ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed">{item.note}</p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
