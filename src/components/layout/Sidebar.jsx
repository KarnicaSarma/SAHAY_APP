import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Radio, FolderKanban, Clock, BarChart3, Scale, ShieldCheck,
  FileSpreadsheet, HeartHandshake, Settings, Info, Home, UserCheck, Sparkles, Trees, Video
} from 'lucide-react';

export const Sidebar = () => {
  const { activePage, setActivePage, userRole } = useApp();

  const navSections = [
    {
      title: 'Main Workspace',
      items: [
        { id: 'landing', label: 'System Overview', icon: Home, roles: ['All'] },
        { id: 'assessment', label: 'Live Assessment', icon: Radio, badge: 'Core Tool', roles: ['NHAA Officer', 'Counsellor', 'Authorized Administrator'] },
        { id: 'dashboard', label: 'Officer Dashboard', icon: LayoutDashboard, roles: ['NHAA Officer', 'Counsellor', 'District Officer', 'Welfare Officer', 'Authorized Administrator'] },
        { id: 'cases', label: 'Case Queue', icon: FolderKanban, roles: ['NHAA Officer', 'Counsellor', 'District Officer', 'Welfare Officer', 'Authorized Administrator'] },
      ]
    },
    {
      title: 'Clinical & Support',
      items: [
        { id: 'user-meeting', label: 'My Counsellor Call', icon: Video, badge: 'User Call', roles: ['Patient / Complainant', 'NHAA Officer', 'Counsellor', 'Authorized Administrator'] },
        { id: 'counselling-queue', label: 'Counselling Queue', icon: Video, badge: 'Live Calls', roles: ['Counsellor', 'NHAA Officer', 'Authorized Administrator'] },
        { id: 'timeline', label: 'Follow-up Timeline', icon: Clock, roles: ['NHAA Officer', 'Counsellor', 'Welfare Officer', 'Authorized Administrator'] },
        { id: 'wellbeing', label: 'Well-being Explorer', icon: Trees, roles: ['All'] },
        { id: 'victim', label: 'Emergency Portal', icon: HeartHandshake, roles: ['All'] },
      ]
    },
    {
      title: 'Governance & Analytics',
      items: [
        { id: 'sih-demo', label: 'SIH Demo Board', icon: Sparkles, roles: ['All'] },
        { id: 'analytics', label: 'Resource Allocation', icon: BarChart3, roles: ['District Officer', 'Authorized Administrator'] },
        { id: 'fairness', label: 'AI Fairness Monitor', icon: Scale, roles: ['Authorized Administrator'] },
        { id: 'privacy', label: 'Privacy & Retention', icon: ShieldCheck, roles: ['Authorized Administrator', 'NHAA Officer'] },
        { id: 'audit', label: 'Audit Logs', icon: FileSpreadsheet, roles: ['Authorized Administrator', 'District Officer'] },
        { id: 'settings', label: 'System Settings', icon: Settings, roles: ['Authorized Administrator'] },
        { id: 'about', label: 'About System', icon: Info, roles: ['All'] }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-3.5 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {section.title}
            </div>

            {section.items.map((item) => {
              // Strict scoping for Patient / Complainant role
              let isAllowed = item.roles.includes('All') || item.roles.includes(userRole);
              if (userRole === 'Patient / Complainant') {
                isAllowed = ['user-meeting', 'wellbeing', 'victim', 'landing', 'about'].includes(item.id);
              }
              const Icon = item.icon;
              const isActive = activePage === item.id;

              if (!isAllowed) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Role Access Footer */}
      <div className="p-3.5 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Access Context:</div>
            <div className="text-xs font-semibold text-slate-900">{userRole}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
