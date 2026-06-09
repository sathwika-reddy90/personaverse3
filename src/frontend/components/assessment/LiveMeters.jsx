import { motion } from 'framer-motion';

const METER_META = [
  { key: 'social', emoji: '🔥', label: 'Social Energy' },
  { key: 'creativity', emoji: '🎨', label: 'Creativity' },
  { key: 'empathy', emoji: '💜', label: 'Empathy' },
  { key: 'introspection', emoji: '🧠', label: 'Curiosity' },
];

export default function LiveMeters({ scores }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
      {METER_META.map((m) => {
        const value = scores[m.key] || 0;
        return (
          <div key={m.key} className="shrink-0 glass rounded-2xl px-3 py-2 min-w-[124px]">
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <span className="text-[10px] font-bold text-ink/55 flex items-center gap-1 truncate">
                <span>{m.emoji}</span> {m.label}
              </span>
              <motion.span
                key={value}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-extrabold text-primary shrink-0"
              >
                {value}%
              </motion.span>
            </div>
            <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-support"
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
