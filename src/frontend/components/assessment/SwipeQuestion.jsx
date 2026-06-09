import { motion } from 'framer-motion';
import { useState } from 'react';
import RevealLines from './RevealLines';

export default function SwipeQuestion({ data, onAnswer }) {
  const [picked, setPicked] = useState(null);

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => onAnswer(opt.scores), 400);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-xs font-bold text-accent/70 uppercase tracking-widest mb-5">🤝 Friendship Check</p>

      <motion.span
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.05 }}
        className="text-5xl mb-5"
      >
        {data.emoji}
      </motion.span>

      <RevealLines
        lines={[data.scenario, data.question]}
        className="text-center mb-8 px-2 space-y-2"
        lineClassName="font-display font-extrabold text-xl leading-snug text-ink/90"
        startDelay={0.3}
        stagger={0.26}
      />

      <div className="flex items-stretch gap-4 w-full max-w-sm">
        {data.options.map((opt, i) => {
          const isPicked = picked === opt.id;
          const isOther = picked && !isPicked;
          const isYes = opt.id === 'yes';
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 36 }}
              animate={{
                opacity: isOther ? 0.4 : 1,
                y: 0,
                scale: isPicked ? 1.05 : 1,
              }}
              transition={{ delay: 0.85 + i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.94 }}
              onClick={() => pick(opt)}
              className={`relative flex-1 rounded-3xl py-7 flex flex-col items-center gap-2 shadow-card overflow-hidden ${
                isPicked
                  ? isYes
                    ? 'bg-gradient-to-br from-support to-[#0EA5A0] text-white shadow-glow-support ring-2 ring-support'
                    : 'bg-gradient-to-br from-accent to-[#FF7B95] text-white shadow-glow-accent ring-2 ring-accent'
                  : 'glass'
              }`}
            >
              {isPicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.65 }}
                  className="absolute inset-0 rounded-full bg-white/40 m-auto h-20 w-20 pointer-events-none"
                />
              )}
              <span className="relative text-3xl">{isYes ? '💚' : '✋'}</span>
              <span className={`relative font-display font-extrabold text-lg ${isPicked ? 'text-white' : 'text-ink/80'}`}>{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
