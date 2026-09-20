import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/common/Badge';
import { CaseDetailModal } from '../components/common/CaseDetailModal';
import { SviLegendCard } from '../components/common/SviLegendCard';
import {
  Sparkles, Globe, Activity, ArrowRight,
  Radio, FolderKanban, Eye
} from 'lucide-react';

export const SihDemoBoard = () => {
  const { caseQueue, setActivePage, addToast, addAuditLog } = useApp();

  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'CRITICAL', 'MULTILINGUAL'

  // Summary Metrics
  const totalCases = caseQueue.length;
  const criticalCases = caseQueue.filter(c => c.riskCategory === 'CRITICAL');
  const multilingualCases = caseQueue.filter(c => c.codeSwitching || c.language.includes('+'));

  const displayedCases = caseQueue.filter(c => {
    if (filterMode === 'CRITICAL') return c.riskCategory === 'CRITICAL';
    if (filterMode === 'MULTILINGUAL') return c.codeSwitching || c.language.includes('+');
    return true;
  });

  const handleInspectCase = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
    addAuditLog('Demo Board Case Inspected', `Judge inspected case ${caseItem.id}`);
  };

  const handleRunFullDemo = () => {
    addToast("Starting Guided Presentation Flow...", "success");
    addAuditLog("Full Demo Triggered", "Demonstration flow launched.");
    setActivePage('assessment');
  };

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded font-mono">
                SIH 2026 OFFICIAL PROTOTYPE
              </span>
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Live Multilingual Dataset
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              SAHAY — System Architecture & Demo Case Showcase
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Multimodal signal fusion engine for trauma assessment & regional Indian language handling
            </p>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRunFullDemo}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Run Assessment Demo</span>
            </button>

            <button
              onClick={() => setActivePage('cases')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-slate-700" />
              <span>Case Queue</span>
            </button>

            <button
              onClick={() => setActivePage('assessment')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Radio className="w-4 h-4 text-slate-700" />
              <span>Live Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Intake Dataset</div>
          <div className="text-2xl font-bold text-slate-900">{totalCases} Cases</div>
          <div className="text-[10px] text-emerald-800 font-semibold">SAHAY-001 to SAHAY-025</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Language Scope</div>
          <div className="text-2xl font-bold text-slate-900">10+ Streams</div>
          <div className="text-[10px] text-slate-600 font-medium">{multilingualCases.length} Multilingual Cases</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Risk Scale Tiers</div>
          <div className="text-2xl font-bold text-slate-900">4 Categories</div>
          <div className="text-[10px] text-red-800 font-bold">{criticalCases.length} Critical Flag Cases</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Multimodal Signal</div>
          <div className="text-2xl font-bold text-slate-900">Voice + Text</div>
          <div className="text-[10px] text-slate-500">Acoustic tremor & NLP</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Human Oversight</div>
          <div className="text-2xl font-bold text-slate-900">100% HITL</div>
          <div className="text-[10px] text-emerald-800 font-medium">Clinician Oversight Required</div>
        </div>
      </div>

      {/* Live Processing Step Flow */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-800" />
            <span>SAHAY Processing Pipeline</span>
          </h3>
          <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-semibold border border-slate-200">
            Pipeline Architecture
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max text-xs font-sans">
            {[
              "Patient Narrative",
              "Script Detection",
              "Voice & NLP Processing",
              "Distress Feature Extraction",
              "SVI Calculation (0-100)",
              "Post-Analyze Translation",
              "Caseworker Review",
              "Support Referral"
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-medium text-slate-800 shadow-xs flex items-center gap-1.5 whitespace-nowrap text-xs">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SVI Legend Scale */}
      <SviLegendCard />

      {/* Case Showcase Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-800" />
              <span>Demonstration Case Directory ({displayedCases.length} Cases)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any case file to inspect native language script, English translation, acoustic metrics, and caseworker actions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors ${
                filterMode === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              All 25 Cases
            </button>
            <button
              onClick={() => setFilterMode('CRITICAL')}
              className={`px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors ${
                filterMode === 'CRITICAL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              🔴 Critical Only ({criticalCases.length})
            </button>
            <button
              onClick={() => setFilterMode('MULTILINGUAL')}
              className={`px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors ${
                filterMode === 'MULTILINGUAL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Multilingual ({multilingualCases.length})
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCases.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInspectCase(item)}
              className="bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-xl p-4 shadow-xs space-y-3 cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900 flex items-center gap-1">
                    {item.id}
                    {item.immediateSafetyFlag && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" title="Safety Flag" />
                    )}
                  </span>
                  <span className="bg-white text-slate-800 px-2.5 py-0.5 rounded font-semibold text-[11px] border border-slate-200">
                    {item.languageDisplay || item.language}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 border-b border-slate-200 pb-2">
                  {item.problem}
                </div>

                {/* Native Script Complaint */}
                <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1 text-xs">
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Original Statement:</div>
                  <p className="italic text-slate-900 line-clamp-2">
                    "{item.victimNarrative || item.transcript}"
                  </p>
                </div>

                {/* English Translation */}
                <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1 text-xs">
                  <div className="text-[10px] font-bold text-slate-600 uppercase">English Translation:</div>
                  <p className="text-slate-900 line-clamp-2">
                    "{item.translatedText}"
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`font-mono font-bold px-2.5 py-0.5 rounded text-xs text-white ${
                    item.svi >= 76 ? 'bg-red-700' :
                    item.svi >= 51 ? 'bg-orange-700' :
                    item.svi >= 26 ? 'bg-amber-600' : 'bg-emerald-700'
                  }`}>
                    SVI {item.svi} / 100
                  </span>
                  <RiskBadge risk={item.riskCategory} size="sm" />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInspectCase(item);
                  }}
                  className="w-full py-1.5 rounded bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Detail File</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Inspection Modal */}
      <CaseDetailModal
        selectedCase={selectedCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
