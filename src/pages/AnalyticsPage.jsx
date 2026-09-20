import React from 'react';
import { ANALYTICS_DATA } from '../services/mockDatabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <BarChart3 className="w-5 h-5 text-slate-800" />
          <span>System Analytics & Operational Metrics</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Anonymized aggregate operational statistics • <strong className="text-emerald-800 font-medium">Zero Patient PII Displayed</strong>
        </p>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Assessments</span>
          <div className="text-3xl font-bold text-slate-900">{ANALYTICS_DATA.totalAssessments}</div>
          <span className="text-[11px] text-emerald-800 font-medium">Across 12 Indian regional languages</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">High / Critical Risk Ratio</span>
          <div className="text-3xl font-bold text-red-700">{ANALYTICS_DATA.highCriticalRatio}</div>
          <span className="text-[11px] text-slate-500">Requiring urgent caseworker review</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Average Response Time</span>
          <div className="text-3xl font-bold text-emerald-800">{ANALYTICS_DATA.avgResponseTime}</div>
          <span className="text-[11px] text-emerald-800 font-medium">First contact to caseworker review</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Human Override Rate</span>
          <div className="text-3xl font-bold text-amber-700">{ANALYTICS_DATA.humanOverrideRate}</div>
          <span className="text-[11px] text-slate-500">Caseworker adjustments to AI flags</span>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Distribution Chart */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Risk Category Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANALYTICS_DATA.riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {ANALYTICS_DATA.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Language Intake Distribution */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Language Intake Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.languageDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="language" tick={{ fill: '#0F172A', fontSize: 10 }} angle={-25} textAnchor="end" />
                <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', fontSize: 12 }} />
                <Bar dataKey="count" fill="#0F172A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
