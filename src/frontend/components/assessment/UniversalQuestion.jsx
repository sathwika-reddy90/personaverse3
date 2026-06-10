import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UniversalQuestion({ question, onAnswer }) {
  const [chosen, setChosen] = useState(null);

  const handleSelect = (idx, score) => {
    if (chosen !== null) return;
    setChosen(idx);
    setTimeout(() => onAnswer(score), 260);
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white/60 backdrop-blur border border-ink/8 rounded-3xl p-5 shadow-soft">
        <p className="font-display font-bold text-[17px] text-ink leading-snug">
          {question.text}
        </p>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const isChosen = chosen === idx;
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(idx, option.score)}
              className={`w-full text-left rounded-2xl px-4 py-3.5 border transition-all duration-200 ${
                isChosen
                  ? 'bg-primary/10 border-primary/40 shadow-soft'
                  : 'bg-white/50 backdrop-blur border-ink/10 hover:bg-white/70 hover:border-ink/20 shadow-soft'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-7 w-7 shrink-0 rounded-full border-2 grid place-items-center text-xs font-bold transition-all ${
                    isChosen
                      ? 'border-primary bg-primary text-white'
                      : 'border-ink/20 text-ink/40'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span
                  className={`text-sm font-semibold leading-snug ${
                    isChosen ? 'text-primary' : 'text-ink/80'
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
