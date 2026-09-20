import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, User, Key, Info } from 'lucide-react';

export const LoginPage = () => {
  const { setActivePage, handleRoleChange, setIsAuthenticated, addToast } = useApp();
  const [officialId, setOfficialId] = useState('NHAA-8942');
  const [password, setPassword] = useState('demo123456');
  const [selectedRole, setSelectedRole] = useState('NHAA Officer');
  const [isDemoMode, setIsDemoMode] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    handleRoleChange(selectedRole);
    setIsAuthenticated(true);
    addToast(`Authenticated as ${selectedRole} (${officialId})`, 'success');
    setActivePage('dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
          <Shield className="w-6 h-6 text-slate-100" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Official Portal Sign In
        </h1>
        <p className="text-xs text-slate-500">
          National Helpline for Alleviating Abuse (NHAA 14566) Integrated System
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        
        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-900">SIH Demo Credentials</span>
          </div>
          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="text-[11px] underline text-slate-900 font-semibold cursor-pointer"
          >
            {isDemoMode ? 'Hide Credentials' : 'Show Credentials'}
          </button>
        </div>

        {isDemoMode && (
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-[11px] text-slate-700 space-y-1 border border-slate-200">
            <div><strong>Official ID:</strong> NHAA-8942</div>
            <div><strong>Password:</strong> demo123456</div>
            <div><strong>Role Access:</strong> Select from role dropdown below</div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-900 mb-1">Official ID / Service No.</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-slate-500 font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-slate-500 font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">Select Official Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-slate-500 cursor-pointer text-slate-900"
            >
              <option value="NHAA Officer">NHAA Officer (Intake & Initial Assessment)</option>
              <option value="Counsellor">Counsellor (Psychosocial Review)</option>
              <option value="District Officer">District Officer (Resource Allocation)</option>
              <option value="Welfare Officer">Social Welfare Officer (Follow-up Support)</option>
              <option value="Authorized Administrator">Authorized Administrator (System Audit)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Authenticate & Open Dashboard
          </button>

        </form>

      </div>

      <div className="text-center text-[11px] text-slate-500 space-y-1">
        <p className="flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-emerald-700" />
          <span>Authorized Helpline Personnel Access Only.</span>
        </p>
        <p>Authentication attempts are logged in immutable system audit logs.</p>
      </div>

    </div>
  );
};
