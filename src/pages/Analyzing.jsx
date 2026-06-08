import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const STAGES = [
  '🧠 Analyzing behavior patterns...',
  '📚 Processing student traits...',
  '🔥 Detecting strengths...',
  '✨ Generating archetype...',
  '🎯 Calculating personality profile...',
];

const PARTICLE_EMOJI = ['✨', '💫', '🌟', '⭐', '🔮', '🧠', '💜'];

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);

  const results = location.state?.results;

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        emoji: PARTICLE_EMOJI[i % PARTICLE_EMOJI.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4,
        size: 14 + Math.random() * 16,
      })),
    []
  );

  useEffect(() => {
    if (!results) {
      navigate('/assessment', { replace: true });
      return;
    }
    const total = 4200;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      setStageIndex(Math.min(STAGES.length - 1, Math.floor((pct / 100) * STAGES.length)));
      if (pct >= 100) {
        clearInterval(tick);
        setDone(true);
        setTimeout(() => navigate('/results', { state: { results }, replace: true }), 900);
      }
    }, 60);
    return () => clearInterval(tick);
  }, [results, navigate]);

  return (
    <PageTransition className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-primary via-[#4d18b8] to-ink">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute opacity-70"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
            animate={{ y: [0, -22, 0], x: [0, 10, 0], opacity: [0.3, 0.9, 0.3], rotate: [0, 20, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.emoji}
          </motion.span>
        ))}
        <motion.div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 h-80 w-80 rounded-full bg-support/25 blur-3xl"
          animate={{ scale: [1.2, 0.9, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center text-white">
        <motion.div
          className="relative h-40 w-40 mb-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-highlight border-r-accent"
          />
          <div className="absolute inset-5 rounded-full glass-dark grid place-items-center">
            <motion.span
              className="text-4xl"
              animate={{ rotate: -360, scale: [1, 1.15, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.6, repeat: Infinity } }}
            >
              🧬
            </motion.span>
          </div>
        </motion.div>

        <h1 className="font-display font-extrabold text-2xl mb-3">
          {done ? 'Your profile is ready! ✨' : 'Analyzing your personality…'}
        </h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={done ? 'done' : stageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`text-sm font-semibold mb-10 h-5 ${done ? 'text-highlight' : 'text-white/65'}`}
          >
            {done ? '✨ Profile Ready' : STAGES[stageIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="w-full max-w-xs">
          <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-highlight via-accent to-support"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <p className="mt-2 text-xs font-bold text-white/40">{Math.round(progress)}%</p>
        </div>
      </div>
    </PageTransition>
  );
}
