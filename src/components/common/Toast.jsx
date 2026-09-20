import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-[#7A1F2B]" />;
        let border = "border-[#E8E0D3]";

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#355C45]" />;
          border = "border-[#355C45]/40";
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#C88A32]" />;
          border = "border-[#C88A32]/40";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3 bg-[#FCFAF6] border ${border} rounded-lg shadow-md text-sm text-[#24221F] animate-in slide-in-from-bottom-2 duration-200`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 font-medium">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};
