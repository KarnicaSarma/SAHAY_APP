import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge, StatusBadge } from '../components/common/Badge';
import { SviLegendCard } from '../components/common/SviLegendCard';
import { CaseDetailModal } from '../components/common/CaseDetailModal';
import {
  Search, Eye, ShieldAlert, Globe, Layers, Sparkles, Radio
} from 'lucide-react';

export const OfficerDashboard = () => {
  const {
    userName, userRole, caseQueue, setActivePage, loadDemoCase, addToast, addAuditLog
  } = useApp();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterLanguage, setFilterLanguage] = useState('ALL');
  const [filterSupportType, setFilterSupportType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('queue'); // 'queue' or 'directory'

  // Modal Inspection State
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Calculated Statistics from Dataset
  const totalCases = caseQueue.length;
  const lowCount = caseQueue.filter(c => c.riskCategory === 'LOW').length;
  const modCount = caseQueue.filter(c => c.riskCategory === 'MODERATE').length;
  const highCount = caseQueue.filter(c => c.riskCategory === 'HIGH').length;
  const critCount = caseQueue.filter(c => c.riskCategory === 'CRITICAL').length;
  
  const languagesDetected = new Set(caseQueue.map(c => c.language.split('+')[0].trim())).size;
  const multilingualCount = caseQueue.filter(c => c.codeSwitching || c.language.includes('+')).length;
  const immediateSafetyFlagsCount = caseQueue.filter(c => c.immediateSafetyFlag).length;

  // Filter Logic
  const filteredCases = caseQueue.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.translatedText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.victimNarrative && item.victimNarrative.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRisk = filterRisk === 'ALL' || item.riskCategory === filterRisk;
    
    let matchesLang = true;
    if (filterLanguage === 'Multilingual') {
      matchesLang = item.codeSwitching || item.language.includes('+');
    } else if (filterLanguage !== 'ALL') {
      matchesLang = item.language.toLowerCase().includes(filterLanguage.toLowerCase());
    }

    const matchesSupport = filterSupportType === 'ALL' || item.supportType === filterSupportType;
    const matchesStatus = filterStatus === 'ALL' || (item.status && item.status.toLowerCase().includes(filterStatus.toLowerCase()));

    return matchesSearch && matchesRisk && matchesLang && matchesSupport && matchesStatus;
  });

  // Action Handlers
  const handleInspectCase = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
    addAuditLog('Case Inspection Opened', `Officer opened case detail view for ${caseItem.id}`);
  };

  const handleHumanDecision = (caseId, decision) => {
    addToast(`Action Recorded for ${caseId}: ${decision}`, 'success');
    addAuditLog('Human-in-the-Loop Action', `Caseworker recorded decision '${decision}' for case ${caseId}`);
  };

  const handleRunMultilingualDemo = () => {
    setSearchTerm('');
    setFilterRisk('ALL');
    setFilterLanguage('ALL');
    setFilterSupportType('ALL');
    setFilterStatus('ALL');
    
    addToast("Loaded priority cases queue for review...", "success");
    addAuditLog("Case Queue Loaded", "Priority assessment queue initialized for inspection.");

    setTimeout(() => {
      const showcaseCase = caseQueue.find(c => c.id === 'SAHAY-024') || caseQueue[0];
      setSelectedCase(showcaseCase);
      setIsModalOpen(true);
    }, 800);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 font-mono">
              NHAA 14566 Triage Console
            </span>
            <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Live Workspace Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Caseworker Priority Triage Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in: <strong className="text-slate-900 font-semibold">{userName}</strong> • Operational Role: <strong>{userRole}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRunMultilingualDemo}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Showcase Case Inspection</span>
          </button>

          <button
            onClick={() => setActivePage('assessment')}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-slate-700" />
            <span>Open Assessment Workspace</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Total Intake Queue</div>
          <div className="text-2xl font-bold text-slate-900">{totalCases}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">Active Dataset</div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-emerald-900">LOW (0–25)</div>
          <div className="text-2xl font-bold text-emerald-900">{lowCount}</div>
          <div className="text-[10px] text-slate-600">Routine Triage</div>
        </div>

        <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-amber-900">MODERATE (26–50)</div>
          <div className="text-2xl font-bold text-amber-900">{modCount}</div>
          <div className="text-[10px] text-slate-600">Guidance Pathways</div>
        </div>

        <div className="p-4 rounded-lg bg-orange-50/60 border border-orange-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-orange-900">HIGH (51–75)</div>
          <div className="text-2xl font-bold text-orange-900">{highCount}</div>
          <div className="text-[10px] text-slate-600">Priority Review</div>
        </div>

        <div className="p-4 rounded-lg bg-red-50/60 border border-red-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-red-900">CRITICAL (76–100)</div>
          <div className="text-2xl font-bold text-red-900">{critCount}</div>
          <div className="text-[10px] text-red-800 font-bold">Immediate Action</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500">Safety Flags</div>
          <div className="text-2xl font-bold text-red-700">{immediateSafetyFlagsCount}</div>
          <div className="text-[10px] text-slate-600">Across {languagesDetected} Languages</div>
        </div>

      </div>

      {/* SVI Reference Scale Card */}
      <SviLegendCard />

      {/* Main Dashboard Queue Section Header & Filters */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5 space-y-4">
        
        {/* Header & View Mode Switcher */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-slate-800" />
              <h2 className="text-base font-bold text-slate-900">
                {viewMode === 'queue' ? 'Multilingual Triage Priority Queue' : 'Native Language Statement Directory'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Intake calls showing native language complaints, translated text, and preliminary risk scores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('queue')}
                className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'queue' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Priority Table</span>
              </button>
              <button
                onClick={() => setViewMode('directory')}
                className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'directory' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Card Directory ({filteredCases.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Variable Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
          
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Case ID, language, keyword, or transcript..."
              className="w-full bg-white border border-slate-300 rounded-md pl-8 pr-2 py-1.5 focus:outline-none focus:border-slate-500 text-xs"
            />
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Risk Levels ({totalCases})</option>
              <option value="CRITICAL">Critical Only ({critCount})</option>
              <option value="HIGH">High Risk ({highCount})</option>
              <option value="MODERATE">Moderate Risk ({modCount})</option>
              <option value="LOW">Low Risk ({lowCount})</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Languages</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Assamese">Assamese (অসমীয়া)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
              <option value="Malayalam">Malayalam (മലയാളം)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="English">English</option>
            </select>
          </div>

          {/* Support Type Filter */}
          <div>
            <select
              value={filterSupportType}
              onChange={(e) => setFilterSupportType(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Support Types</option>
              <option value="Counselling">Counselling</option>
              <option value="Legal Aid">Legal Aid</option>
              <option value="Medical">Medical Assistance</option>
              <option value="Safety">Safety & Protection</option>
              <option value="Rehabilitation">Rehabilitation</option>
            </select>
          </div>

        </div>

        {/* View Mode 1: Main Case Queue Table */}
        {viewMode === 'queue' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Language</th>
                  <th className="py-2.5 px-3">Reported Incident / Narrative</th>
                  <th className="py-2.5 px-3 text-center">SVI</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Pathway</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCases.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => handleInspectCase(item)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    
                    {/* Case ID */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{item.id}</span>
                        {item.immediateSafetyFlag && (
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" title="Immediate Safety Flag" />
                        )}
                      </div>
                    </td>

                    {/* Language Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-xs">
                        <Globe className="w-3 h-3 text-slate-600" />
                        {item.languageDisplay || item.language}
                      </span>
                    </td>

                    {/* Problem Scenario & Native Text Snippet */}
                    <td className="py-3 px-3 max-w-sm">
                      <div className="font-semibold text-slate-900 truncate" title={item.problem}>
                        {item.problem}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate italic mt-0.5" title={item.translatedText}>
                        "{item.victimNarrative || item.translatedText}"
                      </div>
                    </td>

                    {/* SVI Score Badge */}
                    <td className="py-3 px-3 text-center font-bold font-mono whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-xs text-white ${
                        item.svi >= 76 ? 'bg-red-700' :
                        item.svi >= 51 ? 'bg-orange-700' :
                        item.svi >= 26 ? 'bg-amber-600' : 'bg-emerald-700'
                      }`}>
                        SVI {item.svi}
                      </span>
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <RiskBadge risk={item.riskCategory} size="sm" />
                    </td>

                    {/* Recommended Support Action */}
                    <td className="py-3 px-3 text-slate-800 font-medium max-w-xs truncate">
                      {item.supportRecommendations && item.supportRecommendations[0] 
                        ? item.supportRecommendations[0].title 
                        : 'Routine Guidance'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspectCase(item);
                        }}
                        className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] cursor-pointer inline-flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Mode 2: Card Directory */}
        {viewMode === 'directory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredCases.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleInspectCase(item)}
                className="bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-xl p-4 shadow-xs space-y-3 cursor-pointer transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-900">{item.id}</span>
                    <span className="bg-white text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px] border border-slate-200">
                      {item.language}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-900 border-b border-slate-200 pb-2">
                    {item.problem}
                  </div>

                  {/* Native Script Narrative */}
                  <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-600 uppercase">Original Statement:</div>
                    <p className="text-xs italic text-slate-900 line-clamp-2">
                      "{item.victimNarrative}"
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-600 uppercase">English Translation:</div>
                    <p className="text-xs text-slate-900 line-clamp-2">
                      "{item.translatedText}"
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs text-white ${
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
                    <span>View Detail Analysis</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Case Detail Modal */}
      <CaseDetailModal
        selectedCase={selectedCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHumanDecision={handleHumanDecision}
      />

    </div>
  );
};
