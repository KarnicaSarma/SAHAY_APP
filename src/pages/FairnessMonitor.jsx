import React from 'react';
import { Scale, Info } from 'lucide-react';

export const FairnessMonitor = () => {
  const fairnessMetrics = [
    { group: "Hindi (हिन्दी)", consistency: "94.2%", falsePositive: "3.1%", overrideRate: "4.2%", status: "Optimal Baseline" },
    { group: "Assamese (অসমীয়া)", consistency: "91.8%", falsePositive: "4.5%", overrideRate: "5.1%", status: "Optimal Baseline" },
    { group: "Bengali (বাংলা)", consistency: "93.0%", falsePositive: "3.8%", overrideRate: "4.6%", status: "Optimal Baseline" },
    { group: "Tamil (தமிழ்)", consistency: "92.5%", falsePositive: "4.1%", overrideRate: "4.8%", status: "Optimal Baseline" },
    { group: "Kannada (ಕನ್ನಡ)", consistency: "89.4%", falsePositive: "5.2%", overrideRate: "6.0%", status: "Monitoring Active" },
    { group: "Odia (ଓଡ଼ିଆ)", consistency: "88.1%", falsePositive: "5.9%", overrideRate: "6.8%", status: "Low Sample — Monitoring" }
  ];

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <Scale className="w-5 h-5 text-slate-800" />
          <span>AI Fairness & Demographic Governance Monitor</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitoring model consistency, false-positive review rates, and human overrides across regional language groups
        </p>
      </div>

      {/* Governance Notice */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl text-xs text-slate-800 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-slate-900">Responsible AI Audit Governance</div>
          <p className="text-slate-600 mt-0.5 leading-relaxed">
            SAHAY continuously evaluates model behavior across languages and regional code-switching. Where sample sizes are small, automated confidence weighting is restricted, mandating human caseworker review.
          </p>
        </div>
      </div>

      {/* Fairness Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
          Linguistic Group Equity Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Linguistic Group</th>
                <th className="py-2.5 px-3">Assessment Consistency</th>
                <th className="py-2.5 px-3">False-Positive Review Rate</th>
                <th className="py-2.5 px-3">Human Override Rate</th>
                <th className="py-2.5 px-3">Governance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fairnessMetrics.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">{row.group}</td>
                  <td className="py-3 px-3 font-mono text-emerald-800 font-semibold">{row.consistency}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{row.falsePositive}</td>
                  <td className="py-3 px-3 font-mono text-amber-700">{row.overrideRate}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                      row.status.includes('Optimal') ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                      'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {row.status}
                    </span>
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
