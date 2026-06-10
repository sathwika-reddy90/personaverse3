export const inputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 ' +
  'focus:outline-none focus:ring-2 transition-colors duration-200';

export const selectClass = `${inputClass} appearance-none pr-10`;

export const inputState = (hasError) =>
  hasError
    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
    : 'border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20';
