import React from 'react';
import { useApp } from '../context/AppContext';
import { FileSpreadsheet } from 'lucide-react';

export const AuditLogsPage = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <FileSpreadsheet className="w-5 h-5 text-slate-800" />
          <span>Case Audit Trail & System Activity Log</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Timestamped record of AI calculations, caseworker decisions, consent logs, and system actions
        </p>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Audit ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Actor / Role</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{log.id}</td>
                  <td className="py-3 px-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{log.caseId}</td>
                  <td className="py-3 px-3 text-emerald-800 font-sans">{log.role}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 font-sans">{log.action}</td>
                  <td className="py-3 px-3 text-slate-600 font-sans max-w-md truncate" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
