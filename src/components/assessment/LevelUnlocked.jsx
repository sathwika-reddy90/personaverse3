import { motion } from 'framer-motion';
import FloatingBlobs from '../FloatingBlobs';

export default function LevelUnlocked({ level, title, emoji, color }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${color}`}
      />
      <FloatingBlobs className="opacity-40" variant="warm" />

      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: -16 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="relative z-10 flex flex-col items-center text-center px-8 text-white"
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="h-px w-28 bg-white/40 mb-5"
        />
        <motion.span
          initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {emoji}
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-extrabold uppercase tracking-[0.4em] text-white/60 mb-2"
        >
          Level {level}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-2xl leading-snug max-w-[260px]"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="h-px w-28 bg-white/40 mt-5"
        />
      </motion.div>
    </motion.div>
  );
}
