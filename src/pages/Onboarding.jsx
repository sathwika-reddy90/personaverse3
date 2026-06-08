import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingBlobs from '../components/FloatingBlobs';
import { useApp } from '../context/AppContext';

const SLIDES = [
  {
    emoji: '🦄',
    title: 'Discover your hidden strengths',
    body: 'PersonaNova reveals the traits, talents and quirks that make you... you. Most of them, you haven\'t even noticed yet.',
    variant: 'default',
    accent: 'from-primary to-[#6A2FE0]',
  },
  {
    emoji: '🪞',
    title: 'Understand your personality',
    body: 'Five playful, bite-sized assessments. Real psychology, dressed up as something you\'ll actually want to finish.',
    variant: 'warm',
    accent: 'from-accent to-[#FF7B95]',
  },
  {
    emoji: '🛤️',
    title: 'Unlock your full intelligence profile',
    body: 'Turn your results into a living breakdown of your strengths, ideal careers, learning style and growth areas — built just for you.',
    variant: 'cool',
    accent: 'from-support to-[#3A0CA3]',
  },
];

function Illustration({ slide, index }) {
  return (
    <div className="relative h-64 w-64 mx-auto flex items-center justify-center">
      <FloatingBlobs variant={slide.variant} className="rounded-full" />
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 4, 0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative h-44 w-44 rounded-[2.5rem] bg-gradient-to-br ${slide.accent} shadow-card grid place-items-center`}
      >
        <span className="text-7xl drop-shadow-lg">{slide.emoji}</span>
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{ top: `${15 + i * 28}%`, left: i % 2 === 0 ? '6%' : '82%' }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        >
          {['✨', '💫', '⭐'][i]}
        </motion.span>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();

  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  const go = (dir) => {
    if (dir > 0 && isLast) {
      completeOnboarding();
      navigate('/home');
      return;
    }
    setDirection(dir);
    setStep((s) => Math.min(Math.max(s + dir, 0), SLIDES.length - 1));
  };

  return (
    <div className="relative flex flex-col flex-1 px-6 safe-top pb-10 overflow-hidden">
      <FloatingBlobs variant={slide.variant} />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <span className="font-display font-extrabold text-xl text-primary">PersonaNova</span>
        {!isLast && (
          <button onClick={() => { completeOnboarding(); navigate('/home'); }} className="text-sm font-semibold text-ink/40">
            Skip
          </button>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Illustration slide={slide} index={step} />
            <h1 className="font-display font-extrabold text-3xl leading-tight mt-10 mb-4 text-balance">
              {slide.title}
            </h1>
            <p className="text-ink/60 text-[15px] leading-relaxed px-2">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 mb-8">
        {SLIDES.map((_, i) => (
          <motion.span
            key={i}
            animate={{ width: i === step ? 28 : 8, opacity: i === step ? 1 : 0.35 }}
            className="h-2 rounded-full bg-primary block"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        {step > 0 && (
          <Button variant="ghost" fullWidth={false} className="px-5" onClick={() => go(-1)}>
            ←
          </Button>
        )}
        <Button variant="primary" onClick={() => go(1)} icon={isLast ? '🚀' : undefined}>
          {isLast ? 'Get Started' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
