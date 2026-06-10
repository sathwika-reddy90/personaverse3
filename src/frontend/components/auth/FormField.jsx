export default function FormField({ label, error, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#1A3A6B] mb-1.5">{label}</label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}
