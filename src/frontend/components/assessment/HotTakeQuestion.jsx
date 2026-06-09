import { motion } from 'framer-motion';
import { useState } from 'react';
import RevealLines from './RevealLines';

export default function HotTakeQuestion({ data, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const [agree, disagree] = data.options;

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => onAnswer(opt.scores), 400);
  };

  return (
    <div className="w-full">
      <p className="text-center text-xs font-bold text-accent/70 uppercase tracking-widest mb-5">🔭 Exploration & Future</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl bg-gradient-to-br from-ink to-primary text-white p-6 shadow-card mb-8"
      >
        <RevealLines
          lines={[`"${data.statement}"`]}
          lineClassName="font-display font-extrabold text-xl text-center leading-snug"
          startDelay={0.15}
        />
      </motion.div>

      <div className="flex items-center gap-3">
        {[disagree, agree].map((opt, i) => {
          const isPicked = picked === opt.id;
          const isOther = picked && !isPicked;
          const isAgree = opt.id === 'agree';
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: isOther ? 0.45 : 1,
                y: 0,
                scale: isPicked ? 1.05 : 1,
              }}
              transition={{ delay: 0.6 + i * 0.13, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pick(opt)}
              className={`relative flex-1 rounded-2xl py-4 font-display font-bold shadow-soft overflow-hidden ${
                isPicked
                  ? isAgree
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow-accent ring-2 ring-accent'
                    : 'bg-gradient-to-r from-support to-[#0EA5A0] text-white shadow-glow-support ring-2 ring-support'
                  : 'glass text-ink/70'
              }`}
            >
              {isPicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-white/40 m-auto h-16 w-16 pointer-events-none"
                />
              )}
              <span className="relative">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
