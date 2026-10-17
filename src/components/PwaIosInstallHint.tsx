"use client";

type PwaIosInstallHintProps = {
  open: boolean;
  onClose: () => void;
};

export function PwaIosInstallHint({ open, onClose }: PwaIosInstallHintProps) {
  if (!open) return null;

  return (
    <div
      className="pwa-sheet-backdrop fixed inset-0 z-50 flex items-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
    >
      <div
        className="pwa-sheet-panel w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-rose-400 mb-3">
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <h2 id="ios-install-title" className="text-base font-semibold text-white">
            افزودن به صفحه اصلی iPhone
          </h2>
        </div>
        <ol className="space-y-2 text-sm text-white/60 list-decimal list-inside leading-relaxed">
          <li>دکمه Share (مربع با فلش) را در پایین Safari بزنید</li>
          <li>گزینه «Add to Home Screen» را انتخاب کنید</li>
          <li>روی Add بزنید</li>
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-gradient-to-l from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-rose-600 hover:to-rose-700 transition-colors"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}
