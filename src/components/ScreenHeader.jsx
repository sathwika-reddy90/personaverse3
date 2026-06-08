import FloatingBlobs from './FloatingBlobs';

export default function ScreenHeader({ eyebrow, title, blobVariant, right, className = '' }) {
  return (
    <div className={`relative px-6 safe-top pb-4 overflow-hidden ${className}`}>
      {blobVariant && <FloatingBlobs variant={blobVariant} className="opacity-50" />}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.18em] mb-1">{eyebrow}</p>}
          <h1 className="font-display font-extrabold text-2xl text-ink leading-tight truncate">{title}</h1>
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}
