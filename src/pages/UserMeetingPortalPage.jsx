import React from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/common/Badge';
import {
  Video, UserCheck, Clock, ShieldCheck, PhoneCall, Trees,
  Globe, ArrowRight, HeartHandshake, CheckCircle2, Sparkles, AlertCircle
} from 'lucide-react';

export const UserMeetingPortalPage = () => {
  const {
    userName, userRole, handleRoleChange, activeCounsellingSession,
    counsellingQueue, joinCounsellingSession, setActivePage, addToast
  } = useApp();

  // Active or latest session for this user
  const userSession = activeCounsellingSession || counsellingQueue[0] || {
    sessionId: 'COUNSELLOR-ROOM-102',
    caseId: 'SAHAY-004',
    patientName: 'Sunita D. (Complainant)',
    language: 'Kannada',
    svi: 88,
    riskCategory: 'CRITICAL',
    requestTime: '2 mins ago',
    status: 'Waiting for Counsellor',
    narrative: 'ನನಗೆ ಪದೇ ಪದೇ ಬೆದರಿಕೆಗಳು ಬರುತ್ತಿವೆ ಮತ್ತು ಈಗ ನನಗೆ ಮನೆಯಿಂದ ಹೊರಗೆ ಹೋಗಲು ಭಯವಾಗುತ್ತಿದೆ'
  };

  const handleJoinCall = () => {
    addToast(`Joining WebRTC session room ${userSession.sessionId}...`, 'success');
    joinCounsellingSession(userSession);
  };

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                SAHAY PATIENT CARE PORTAL
              </span>
              <span className="text-xs text-slate-700 font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Encrypted Peer Connection
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              My Scheduled Counsellor Session
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct access portal to your scheduled video consultation and confidential guidance.
            </p>
          </div>

          {/* Role Status */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 shrink-0">
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Active User View</div>
              <div className="text-xs font-bold text-slate-900">{userName}</div>
            </div>
            {userRole !== 'Patient / Complainant' && (
              <button
                onClick={() => handleRoleChange('Patient / Complainant')}
                className="px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer transition-colors shadow-xs"
              >
                Switch Role
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Section: User Details & Scheduled Meeting Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* User Details & Intake Profile (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 font-bold text-sm text-slate-900">
            <UserCheck className="w-4 h-4 text-slate-800" />
            <span>Complainant Details</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Patient Name</div>
              <div className="font-bold text-sm text-slate-900">{userName}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Case Reference ID</div>
              <div className="font-mono font-bold text-slate-900">{userSession.caseId}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Primary Language</div>
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-700" />
                <span>{userSession.language}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Stress Vulnerability Triage</div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">SVI {userSession.svi} / 100</span>
                <RiskBadge risk={userSession.riskCategory} />
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Meet Card with Join Button (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 text-white border border-slate-800 p-6 rounded-xl shadow-md space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Header & Status Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-sm text-emerald-300 font-mono uppercase">
                  Meeting Status: {userSession.status}
                </span>
              </div>

              <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded border border-slate-700 text-slate-300">
                Room: {userSession.sessionId}
              </span>
            </div>

            {/* Counsellor Assigned Info */}
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Trauma Counsellor</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white border-2 border-emerald-400 shrink-0">
                  <UserCheck className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Dr. S. Sharma</h3>
                  <p className="text-xs text-slate-300">Senior Trauma Specialist • SAHAY National Support Cell</p>
                </div>
              </div>
            </div>

            {/* Session Time & Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/80 space-y-1">
                <div className="text-slate-400 font-medium">Scheduled Time</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Immediate Live Consultation</span>
                </div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/80 space-y-1">
                <div className="text-slate-400 font-medium">Security & Privacy</div>
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Encrypted Peer-to-Peer</span>
                </div>
              </div>
            </div>

          </div>

          {/* Primary Join Call Action Button */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Ensure camera and microphone permissions are enabled.
            </div>

            <button
              onClick={handleJoinCall}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 cursor-pointer transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>JOIN MEETING WITH COUNSELLOR</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Secondary Feature: Well-being Explorer Card */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base font-bold text-slate-900">
                Well-being Explorer & Peaceful Spaces
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Browse nearby quiet parks, nature walking trails, and peaceful spaces for rest.
            </p>
          </div>

          <button
            onClick={() => setActivePage('wellbeing')}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs shrink-0"
          >
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>Open Well-being Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">Shaded Walking Trails</div>
            <p className="text-slate-600 text-[11px]">Discover quiet, shaded outdoor tracks designed for calming walks.</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">In-App Leaflet Maps</div>
            <p className="text-slate-600 text-[11px]">View exact locations and directions on interactive OpenStreetMap.</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">Multi-City Coverage</div>
            <p className="text-slate-600 text-[11px]">Available across Delhi, Guwahati, Bengaluru, Kochi, Chennai, Mumbai & more.</p>
          </div>
        </div>
      </div>

      {/* Emergency Hotline Notice */}
      <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-center text-xs text-slate-600 space-y-1">
        <div className="font-semibold text-slate-900 flex items-center justify-center gap-1">
          <HeartHandshake className="w-4 h-4 text-red-700" />
          <span>Need Immediate Emergency Assistance?</span>
        </div>
        <p className="italic text-[11px]">
          Call the national crisis helpline at <strong>14566</strong> or Emergency Services <strong>112</strong> anytime.
        </p>
      </div>

    </div>
  );
};
