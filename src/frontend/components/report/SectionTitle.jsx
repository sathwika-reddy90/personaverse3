export default function SectionTitle({ emoji, eyebrow, title, blurb }) {
  return (
    <div className="mb-5 px-1">
      <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
        <span>{emoji}</span> {eyebrow}
      </p>
      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink leading-tight">{title}</h2>
      {blurb && <p className="text-sm text-ink/50 mt-1 max-w-2xl leading-relaxed">{blurb}</p>}
    </div>
  );
}
