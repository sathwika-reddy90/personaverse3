import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import { SkeletonCard, SkeletonHero } from '../../components/common/Skeleton';
import { useApp } from '../../../context/AppContext';
import { getArchetype } from '../../../backend/archetypes/archetypes';
import useReady from '../../hooks/useReady';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const REFLECTIONS = [
  { emoji: '🪞', prompt: 'Name one moment today when you felt most like yourself.' },
  { emoji: '🧭', prompt: 'What decision today did you make on instinct, not logic?' },
  { emoji: '🌤️', prompt: 'What gave you energy today — and what drained it?' },
];

const MOODS = ['😄', '🙂', '😐', '😴', '😤'];

export default function Home() {
  const navigate = useNavigate();
  const { results } = useApp();
  const ready = useReady(550);
  const archetype = results ? getArchetype(results.archetype) : null;
  const reflection = REFLECTIONS[new Date().getDate() % REFLECTIONS.length];
  const [mood, setMood] = useState(null);

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="relative px-6 pb-6 safe-top overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.94]" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <FloatingBlobs className="opacity-50" />
        <div className="relative z-10 flex items-center justify-between mb-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">Good to see you</p>
            <h1 className="font-display font-extrabold text-3xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">Your Feed ✨</h1>
            <p className="text-xs font-medium text-white/55 mt-1.5 max-w-[26ch]">Your AI-powered space to track mood, reflect daily and grow into yourself.</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05, y: -2 }}
            onClick={() => navigate('/profile')}
            className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-xl shadow-card border-2 border-white/50"
          >
            {archetype ? archetype.emoji : '🙂'}
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-5">
        {!ready ? (
          <div className="space-y-5 pt-1">
            <SkeletonHero className="bg-gradient-to-br from-primary/15 to-accent/15" />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* Daily Insight */}
            <motion.div custom={0} variants={cardVariants} initial="hidden" animate="show">
              <GlassCard plain lift={false} className="p-5 relative overflow-hidden border border-white/10 shadow-card hover-lift">
                <div className="absolute inset-0 gradient-insight" />
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <FloatingBlobs variant="warm" className="opacity-30" />
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">💡</span>
                    <p className="font-display font-bold text-sm text-highlight uppercase tracking-wider">Today's Insight</p>
                  </div>
                  <p className="font-display font-semibold text-xl leading-snug mb-4 tracking-tight">
                    "You tend to overthink decisions but trust your intuition more than you realize."
                  </p>
                  <motion.p
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="text-xs font-semibold text-white/65"
                  >
                    Swipe up for more →
                  </motion.p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Mood Card */}
            <motion.div custom={1} variants={cardVariants} initial="hidden" animate="show">
              <GlassCard className="p-5">
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-4">How are you feeling?</p>
                <div className="flex items-center justify-between">
                  {MOODS.map((m, i) => {
                    const isSelected = mood === i;
                    return (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.12, y: -4 }}
                        animate={isSelected ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                        onClick={() => setMood(isSelected ? null : i)}
                        className={`h-12 w-12 rounded-2xl grid place-items-center text-2xl transition-colors duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-accent to-[#FF7B95] shadow-[0_12px_30px_-8px_rgba(255,77,109,0.55)] ring-2 ring-accent/40'
                            : 'bg-surface shadow-soft hover:shadow-soft-hover'
                        }`}
                      >
                        {m}
                      </motion.button>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>

            {/* Daily Reflection */}
            <motion.div custom={2} variants={cardVariants} initial="hidden" animate="show">
              <GlassCard plain lift={false} className="p-6 relative overflow-hidden border border-highlight/25 shadow-soft hover-lift">
                <div className="absolute inset-0 gradient-reflection" />
                <div className="relative z-10">
                  <p className="text-xs font-bold text-primary/60 uppercase tracking-[0.18em] mb-2.5">{reflection.emoji} Daily Reflection</p>
                  <p className="font-display font-bold text-lg leading-snug text-ink mb-5 tracking-tight">{reflection.prompt}</p>
                  <Button variant="highlight" className="text-sm py-3.5" onClick={() => navigate('/insights')}>
                    Reflect in my Intelligence Hub
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Personality Snapshot / CTA */}
            <motion.div custom={3} variants={cardVariants} initial="hidden" animate="show">
              {archetype ? (
                <GlassCard plain className={`p-5 bg-gradient-to-br ${archetype.gradient} text-white border-0 shadow-card`}>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Your Archetype</p>
                  <p className="font-display font-extrabold text-xl mb-1">{archetype.emoji} {archetype.name}</p>
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">{archetype.blurb}</p>
                  <Button variant="dark" className="text-sm py-3 bg-white/15" onClick={() => navigate('/insights')}>
                    Explore your full intelligence profile
                  </Button>
                </GlassCard>
              ) : (
                <GlassCard plain className="p-5 bg-gradient-to-br from-primary to-accent text-white border-0 shadow-card">
                  <p className="font-display font-bold text-lg mb-2">Haven't taken the deep-dive yet?</p>
                  <p className="text-sm text-white/80 mb-4">Unlock your full personality breakdown in ~5 minutes.</p>
                  <Button variant="highlight" className="text-sm py-3" onClick={() => navigate('/assessment')}>
                    Start my assessment
                  </Button>
                </GlassCard>
              )}
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
