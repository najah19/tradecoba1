import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useMarket();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-notifications-container" className="fixed bottom-16 sm:bottom-6 right-4 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-lg shadow-2xl border backdrop-blur-md transition-all animate-in slide-in-from-right-5 ${
              toast.type === 'success'
                ? 'bg-[#10151F]/95 border-[#00FF95]/40 text-[#00FF95]'
                : toast.type === 'warning'
                ? 'bg-[#10151F]/95 border-yellow-500/40 text-yellow-500'
                : 'bg-[#10151F]/95 border-blue-400/40 text-blue-300'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#00FF95]" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
            </div>

            <div className="flex-1">
              <div className="text-xs font-bold text-white">{toast.title}</div>
              <div className="text-[11px] text-gray-300 mt-0.5 leading-snug">{toast.message}</div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
