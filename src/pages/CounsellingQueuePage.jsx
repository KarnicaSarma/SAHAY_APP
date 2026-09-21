import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/common/Badge';
import {
  Video, UserCheck, Clock, ShieldAlert, PhoneCall, CheckCircle2,
  Globe, ArrowRight, RefreshCw, MessageSquare, AlertTriangle, Users
} from 'lucide-react';

export const CounsellingQueuePage = () => {
  const {
    counsellingQueue, joinCounsellingSession, userRole, handleRoleChange,
    addToast, addAuditLog
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [langFilter, setLangFilter] = useState('ALL');

  // Stats calculation
  const totalRequests = counsellingQueue.length;
  const waitingCount = counsellingQueue.filter(c => c.status === 'Waiting for Counsellor').length;
  const inSessionCount = counsellingQueue.filter(c => c.status === 'In Session').length;
  const criticalCount = counsellingQueue.filter(c => c.svi >= 76 || c.riskCategory === 'CRITICAL').length;

  // Filtered Queue Results
  const filteredQueue = counsellingQueue.filter(item => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (langFilter !== 'ALL' && item.language.toLowerCase() !== langFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              CLINICAL TRIAGE DESK
            </span>
            <span className="text-xs text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
              Live WebRTC Queue
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
            Incoming Counselling Queue
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time incoming video session requests from victims & intake assessment cases requiring counsellor intervention.
          </p>
        </div>

        {/* Role Access Banner / Quick Switcher */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 shrink-0">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Current Role</div>
            <div className="text-xs font-bold text-slate-900">{userRole}</div>
          </div>
          {userRole !== 'Counsellor' && (
            <button
              onClick={() => handleRoleChange('Counsellor')}
              className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Switch to Counsellor</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-slate-500 font-medium">Total Session Requests</div>
          <div className="text-2xl font-bold text-slate-900">{totalRequests}</div>
          <div className="text-[10px] text-slate-400">All intake channels</div>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs space-y-1">
          <div className="text-amber-900 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Waiting for Counsellor</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{waitingCount}</div>
          <div className="text-[10px] text-amber-800 font-semibold">Immediate Action Needed</div>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 shadow-xs space-y-1">
          <div className="text-emerald-900 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Active In Session</span>
          </div>
          <div className="text-2xl font-bold text-emerald-900">{inSessionCount}</div>
          <div className="text-[10px] text-emerald-800 font-semibold">Ongoing WebRTC Call</div>
        </div>

        <div className="bg-red-50/70 p-4 rounded-xl border border-red-200 shadow-xs space-y-1">
          <div className="text-red-900 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
            <span>High/Critical SVI Cases</span>
          </div>
          <div className="text-2xl font-bold text-red-900">{criticalCount}</div>
          <div className="text-[10px] text-red-800 font-bold">Priority Triage</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700 mr-1">Filter Queue:</span>
          
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-md border font-medium cursor-pointer transition-colors ${
              statusFilter === 'ALL' ? 'bg-slate-900 text-white border-slate-900 font-semibold' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            All Requests ({totalRequests})
          </button>

          <button
            onClick={() => setStatusFilter('Waiting for Counsellor')}
            className={`px-3 py-1.5 rounded-md border font-medium cursor-pointer transition-colors ${
              statusFilter === 'Waiting for Counsellor' ? 'bg-amber-600 text-white border-amber-600 font-semibold' : 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400'
            }`}
          >
            Waiting Only ({waitingCount})
          </button>

          <button
            onClick={() => setStatusFilter('In Session')}
            className={`px-3 py-1.5 rounded-md border font-medium cursor-pointer transition-colors ${
              statusFilter === 'In Session' ? 'bg-emerald-700 text-white border-emerald-700 font-semibold' : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400'
            }`}
          >
            In Session ({inSessionCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Languages</option>
            <option value="Assamese">Assamese</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="Marathi">Marathi</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Queue List Cards */}
      <div className="space-y-4">
        {filteredQueue.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-2 text-slate-500 text-xs">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-slate-800">No active counselling requests in this view.</p>
            <p className="text-[11px] text-slate-400">When victims request a counsellor from Live Assessment, they appear here instantly.</p>
          </div>
        ) : (
          filteredQueue.map((item) => {
            const isWaiting = item.status === 'Waiting for Counsellor';
            const isInSession = item.status === 'In Session';

            return (
              <div
                key={item.sessionId}
                className={`bg-white border-2 rounded-xl p-5 shadow-xs transition-all space-y-4 ${
                  isWaiting ? 'border-amber-400 bg-amber-50/20' : isInSession ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                
                {/* Card Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      <Video className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">{item.patientName}</span>
                        <span className="text-xs font-mono font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                          {item.caseId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Room: <strong className="font-mono text-slate-800">{item.sessionId}</strong> • Requested: <strong>{item.requestTime}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <RiskBadge risk={item.riskCategory} />
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold font-mono border ${
                      isWaiting ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' :
                      isInSession ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Case & Statement Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Language & SVI Metrics</div>
                    <div className="font-semibold text-slate-900">Language: {item.language}</div>
                    <div className="font-bold text-slate-900 font-mono">SVI Score: {item.svi} / 100</div>
                  </div>

                  <div className="md:col-span-2 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Complainant Narrative / Situation</div>
                    <p className="text-slate-800 text-xs italic leading-relaxed">
                      "{item.narrative}"
                    </p>
                  </div>

                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-700" />
                    <span>Confidential WebRTC Peer Connection</span>
                  </div>

                  <button
                    onClick={() => joinCounsellingSession(item)}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-colors ${
                      isWaiting
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900'
                        : isInSession
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{isWaiting ? 'Join Video Call' : isInSession ? 'Re-Join Call' : 'Review Call Log'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
