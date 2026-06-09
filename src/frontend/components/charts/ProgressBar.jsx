import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, gradient, height = 'h-3', label }) {
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-ink/60">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full progress-track overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${gradient ? `bg-gradient-to-r ${gradient}` : 'progress-fill'}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
