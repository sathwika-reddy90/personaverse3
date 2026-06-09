import { motion } from 'framer-motion';
import { useState } from 'react';
import RevealLines from './RevealLines';

export default function EmojiQuestion({ data, onAnswer }) {
  const [picked, setPicked] = useState(null);

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => onAnswer(opt.scores), 400);
  };

  return (
    <div className="w-full">
      <p className="text-center text-xs font-bold text-highlight/80 uppercase tracking-widest mb-5">🌪️ Stress Reaction</p>

      <motion.span
        initial={{ opacity: 0, scale: 0.4, rotate: 15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.05 }}
        className="block text-center text-5xl mb-5"
      >
        {data.emoji}
      </motion.span>

      <RevealLines
        lines={[data.scenario, data.question]}
        className="text-center mb-9 px-2 space-y-2"
        lineClassName="font-display font-extrabold text-xl leading-snug text-ink/90"
        startDelay={0.3}
        stagger={0.26}
      />

      <div className="flex items-center justify-between gap-2">
        {data.options.map((opt, i) => {
          const isPicked = picked === opt.id;
          const isOther = picked && !isPicked;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isOther ? 0.4 : 1,
                y: 0,
                scale: isPicked ? 1.25 : isOther ? 0.9 : 1,
              }}
              transition={{ delay: 0.85 + i * 0.07, type: 'spring', stiffness: 300, damping: 18 }}
              whileTap={{ scale: 1.4, rotate: [0, -10, 10, 0] }}
              onClick={() => pick(opt)}
              className={`relative flex-1 flex flex-col items-center gap-2 rounded-2xl py-4 transition-colors ${
                isPicked ? 'bg-gradient-to-br from-primary to-accent shadow-glow-accent ring-2 ring-accent' : 'glass'
              }`}
            >
              {isPicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.7 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  className="absolute inset-0 rounded-full bg-white/40 m-auto h-14 w-14 pointer-events-none"
                />
              )}
              <span className="relative text-3xl">{opt.text}</span>
              <span className={`relative text-[10px] font-bold ${isPicked ? 'text-white' : 'text-ink/40'}`}>{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
