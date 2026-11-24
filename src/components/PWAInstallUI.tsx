import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton({ compact = false }: { compact?: boolean }) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuide(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0 ${
          compact
            ? 'min-h-[38px] px-3 py-1.5 text-xs'
            : 'min-h-[44px] px-4 py-2 text-sm'
        }`}
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Install App</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-guide-title"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="pwa-install-guide-title"
                    className="text-base font-bold text-slate-900"
                  >
                    Install Pradeep Teaching Center
                  </h2>
                  <p className="text-xs text-slate-500">
                    Use like a native mobile or desktop app
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close install instructions"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2.5 text-sm text-slate-700 bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                <li>
                  <span className="font-semibold text-slate-900">1.</span> Open
                  this app in <strong>Safari</strong> (outside any embedded preview).
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2.</span> Tap the{' '}
                  <strong>Share</strong> button in the Safari toolbar.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">3.</span> Tap{' '}
                  <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
                </li>
              </ol>
            ) : (
              <ol className="space-y-2.5 text-sm text-slate-700 bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                <li>
                  <span className="font-semibold text-slate-900">1.</span> Open the
                  app URL directly in <strong>Chrome</strong> or <strong>Edge</strong>.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2.</span> Tap the
                  browser menu (<strong>⋮</strong>) or address-bar{' '}
                  <strong>Install</strong> icon.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">3.</span> Tap{' '}
                  <strong>Install App / Add to Home screen</strong>.
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 lg:bottom-5 left-4 z-40 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode — Cached study materials active</span>
    </div>
  );
}
