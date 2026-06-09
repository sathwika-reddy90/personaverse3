import { motion } from 'framer-motion';
import { useState } from 'react';
import RevealLines from './RevealLines';

const letters = ['A', 'B', 'C', 'D'];
const LINE_STAGGER = 0.24;

export default function StoryQuestion({ data, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const optionsDelay = data.scenario.length * LINE_STAGGER + 0.3;

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => onAnswer(opt.scores), 400);
  };

  return (
    <div className="w-full">
      <p className="text-center text-xs font-bold text-primary/60 uppercase tracking-widest mb-5">📖 Story Scenario</p>

      <RevealLines
        lines={data.scenario}
        className="text-center mb-8 px-1 space-y-1.5"
        lineClassName="font-display font-extrabold text-xl leading-snug text-ink/90"
        stagger={LINE_STAGGER}
      />

      <div className="space-y-3">
        {data.options.map((opt, i) => {
          const isPicked = picked === opt.id;
          const isOther = picked && !isPicked;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              animate={{
                opacity: isOther ? 0.4 : 1,
                x: 0,
                scale: isPicked ? 1.03 : 1,
              }}
              transition={{ delay: optionsDelay + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
              whileHover={!picked ? { scale: 1.015, x: 4 } : {}}
              onClick={() => pick(opt)}
              className={`relative w-full text-left flex items-center gap-3 rounded-2xl px-4 py-4 transition-shadow ${
                isPicked ? 'glass shadow-glow-accent ring-2 ring-accent' : 'glass shadow-soft'
              }`}
            >
              {isPicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.7 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-accent/30 m-auto h-16 w-16 pointer-events-none"
                />
              )}
              <span className={`relative grid place-items-center h-8 w-8 rounded-xl text-white text-xs font-bold shrink-0 bg-gradient-to-br ${isPicked ? 'from-accent to-[#FF7B95]' : 'from-primary to-accent'}`}>
                {letters[i]}
              </span>
              <span className="relative text-[15px] font-semibold text-ink/80 leading-snug">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
