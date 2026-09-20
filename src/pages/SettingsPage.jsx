import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Sliders, WifiOff, Save } from 'lucide-react';

export const SettingsPage = () => {
  const { addToast } = useApp();
  const [moderateThreshold, setModerateThreshold] = useState(26);
  const [highThreshold, setHighThreshold] = useState(51);
  const [criticalThreshold, setCriticalThreshold] = useState(76);

  const handleSaveSettings = () => {
    addToast('SVI Threshold configuration saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 py-2 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <Settings className="w-5 h-5 text-slate-800" />
          <span>System Settings & Triage Thresholds</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure SVI risk boundaries, low-bandwidth queue sync, and local triage parameters
        </p>
      </div>

      {/* SVI Risk Thresholds Config */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-800" />
          <span>Stress Vulnerability Index (SVI) Threshold Limits</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-900 mb-1">MODERATE Risk Boundary (Current: {moderateThreshold}):</label>
            <input
              type="range"
              min="15"
              max="35"
              value={moderateThreshold}
              onChange={(e) => setModerateThreshold(e.target.value)}
              className="w-full accent-amber-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">HIGH Risk Boundary (Current: {highThreshold}):</label>
            <input
              type="range"
              min="40"
              max="65"
              value={highThreshold}
              onChange={(e) => setHighThreshold(e.target.value)}
              className="w-full accent-orange-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">CRITICAL Risk Boundary (Current: {criticalThreshold}):</label>
            <input
              type="range"
              min="70"
              max="85"
              value={criticalThreshold}
              onChange={(e) => setCriticalThreshold(e.target.value)}
              className="w-full accent-red-700"
            />
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Threshold Settings</span>
        </button>
      </div>

      {/* Low-Bandwidth Sync Manager */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3 text-xs">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-amber-600" />
          <span>Low-Bandwidth Queue Sync</span>
        </h3>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-center">
          <div>
            <span className="text-slate-500 text-[11px] block">Offline Local Queue:</span>
            <span className="text-xl font-bold text-slate-900">3 Items</span>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Pending Store Sync:</span>
            <span className="text-xl font-bold text-emerald-800">2 Items</span>
          </div>
        </div>

        <button
          onClick={() => addToast("Offline assessment queue synced with local store.", "success")}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs cursor-pointer transition-colors"
        >
          Sync Offline Local Queue
        </button>
      </div>

    </div>
  );
};
