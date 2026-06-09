import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ThisOrThatQuestion({ data, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const [left, right] = data.options;

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => onAnswer(opt.scores), 400);
  };

  const Side = ({ opt, gradient, fromLeft }) => {
    const isPicked = picked === opt.id;
    const isOther = picked && !isPicked;
    return (
      <motion.button
        initial={{ opacity: 0, x: fromLeft ? -32 : 32, scale: 0.9 }}
        animate={{
          opacity: isOther ? 0.45 : 1,
          x: 0,
          scale: isPicked ? 1.06 : 1,
        }}
        transition={{ delay: fromLeft ? 0.15 : 0.28, type: 'spring', stiffness: 280, damping: 20 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => pick(opt)}
        className={`relative flex-1 aspect-[4/5] rounded-3xl flex flex-col items-center justify-center gap-3 shadow-card overflow-hidden ${
          isPicked ? `bg-gradient-to-br ${gradient} text-white shadow-glow-accent ring-2 ring-white/40` : 'glass'
        }`}
      >
        {isPicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 rounded-full bg-white/40 m-auto h-24 w-24 pointer-events-none"
          />
        )}
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (fromLeft ? 0.3 : 0.43), type: 'spring', stiffness: 300, damping: 14 }}
          className="relative text-4xl"
        >
          {opt.emoji}
        </motion.span>
        <span className={`relative font-display font-extrabold text-lg ${isPicked ? 'text-white' : 'text-ink/80'}`}>{opt.text}</span>
      </motion.button>
    );
  };

  return (
    <div className="w-full">
      <p className="text-center text-xs font-bold text-support/80 uppercase tracking-widest mb-7">⚡ Progress Challenge</p>
      <div className="flex items-stretch gap-4">
        <Side opt={left} gradient="from-primary to-[#6A2FE0]" fromLeft />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center"
        >
          <span className="font-display font-extrabold text-ink/25 text-sm">VS</span>
        </motion.div>
        <Side opt={right} gradient="from-accent to-[#FF7B95]" />
      </div>
    </div>
  );
}
