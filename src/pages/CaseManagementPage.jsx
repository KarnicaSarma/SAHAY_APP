import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge, StatusBadge } from '../components/common/Badge';
import { CaseDetailModal } from '../components/common/CaseDetailModal';
import {
  FolderKanban, Search, Eye, Globe
} from 'lucide-react';

export const CaseManagementPage = () => {
  const { caseQueue } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterLanguage, setFilterLanguage] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredCases = (caseQueue || []).filter(item => {
    if (!item) return false;
    const searchLower = (searchTerm || '').toLowerCase();
    const idMatch = (item.id || '').toLowerCase().includes(searchLower);
    const langMatch = (item.language || '').toLowerCase().includes(searchLower);
    const problemMatch = (item.problem || item.trigger || '').toLowerCase().includes(searchLower);
    const transMatch = (item.translatedText || '').toLowerCase().includes(searchLower);

    const matchesSearch = idMatch || langMatch || problemMatch || transMatch;
    const matchesRisk = filterRisk === 'ALL' || item.riskCategory === filterRisk;

    let matchesLang = true;
    if (filterLanguage === 'Multilingual') {
      matchesLang = item.codeSwitching || (item.language || '').includes('+');
    } else if (filterLanguage !== 'ALL') {
      matchesLang = (item.language || '').toLowerCase().includes(filterLanguage.toLowerCase());
    }

    const matchesStatus = filterStatus === 'ALL' || (item.status || '').toLowerCase().includes(filterStatus.toLowerCase());

    return matchesSearch && matchesRisk && matchesLang && matchesStatus;
  });

  const handleOpenCaseDetail = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-slate-800" />
            <span>Case Queue & Triage Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Anonymized multi-agency intake case records across regional Indian language streams
          </p>
        </div>

        <div className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">
          Showing {filteredCases.length} of {caseQueue?.length || 25} Cases
        </div>
      </div>

      {/* Filter Controls Bar & Table Container */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Case ID, language, problem..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-8 pr-2 py-1.5 focus:outline-none focus:border-slate-500 text-xs"
            />
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">🔴 Critical Only</option>
              <option value="HIGH">🟠 High Risk</option>
              <option value="MODERATE">🟡 Moderate Risk</option>
              <option value="LOW">🟢 Low Risk</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Languages</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Assamese">Assamese (অসমীয়া)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
              <option value="Malayalam">Malayalam (മലയാളം)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Marathi">Marathi (मराठी)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-slate-500 text-xs cursor-pointer font-medium"
            >
              <option value="ALL">All Case Statuses</option>
              <option value="New">New</option>
              <option value="Review">Awaiting Review</option>
              <option value="Counsellor">Counsellor Assigned</option>
              <option value="Legal">Legal Aid Referred</option>
              <option value="Safety">Safety Review</option>
            </select>
          </div>

        </div>

        {/* Case Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Problem Narrative</th>
                <th className="py-2.5 px-3 text-center">SVI</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleOpenCaseDetail(item)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {item.id}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 text-xs">
                      <Globe className="w-3 h-3 text-slate-600" />
                      {item.languageDisplay || item.language}
                    </span>
                  </td>

                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-bold text-slate-900 truncate">
                      {item.problem || item.trigger || 'Case File'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate italic mt-0.5">
                      "{item.translatedText || item.victimNarrative || 'Narrative recorded'}"
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center font-bold font-mono whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs text-white ${
                      (item.svi ?? 0) >= 76 ? 'bg-red-700' :
                      (item.svi ?? 0) >= 51 ? 'bg-orange-700' :
                      (item.svi ?? 0) >= 26 ? 'bg-amber-600' : 'bg-emerald-700'
                    }`}>
                      SVI {item.svi ?? 'N/A'}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <RiskBadge risk={item.riskCategory || 'LOW'} size="sm" />
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <StatusBadge status={item.status || 'Active'} />
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCaseDetail(item);
                      }}
                      className="px-3 py-1 rounded bg-slate-900 text-white font-semibold text-[11px] hover:bg-slate-800 cursor-pointer inline-flex items-center gap-1 shadow-xs transition-colors"
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

      </div>

      {/* Case Detail Modal */}
      <CaseDetailModal
        selectedCase={selectedCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
