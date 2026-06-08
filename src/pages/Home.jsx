import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import FloatingBlobs from '../components/FloatingBlobs';
import { SkeletonCard, SkeletonHero } from '../components/Skeleton';
import { useApp } from '../context/AppContext';
import { getArchetype } from '../data/archetypes';
import useReady from '../hooks/useReady';

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

export default function Home() {
  const navigate = useNavigate();
  const { results } = useApp();
  const ready = useReady(550);
  const archetype = results ? getArchetype(results.archetype) : null;
  const reflection = REFLECTIONS[new Date().getDate() % REFLECTIONS.length];

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="relative px-6 pb-4 safe-top">
        <FloatingBlobs className="opacity-60" />
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink/40 uppercase tracking-widest">Good to see you</p>
            <h1 className="font-display font-extrabold text-2xl text-ink">Your Feed ✨</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/profile')}
            className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-xl shadow-soft border-2 border-white/60"
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
              <GlassCard className="p-5 relative overflow-hidden" dark>
                <FloatingBlobs variant="warm" className="opacity-40" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">💡</span>
                    <p className="font-display font-bold text-sm text-highlight uppercase tracking-wider">Today's Insight</p>
                  </div>
                  <p className="font-display font-semibold text-lg leading-snug mb-4">
                    "You tend to overthink decisions but trust your intuition more than you realize."
                  </p>
                  <motion.p
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="text-xs font-semibold text-white/60"
                  >
                    Swipe up for more →
                  </motion.p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Mood Card */}
            <motion.div custom={1} variants={cardVariants} initial="hidden" animate="show">
              <GlassCard className="p-5">
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-3">How are you feeling?</p>
                <div className="flex items-center justify-between">
                  {['😄', '🙂', '😐', '😴', '😤'].map((m, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2, y: -4 }}
                      className="h-12 w-12 rounded-2xl bg-white/70 grid place-items-center text-2xl shadow-soft"
                    >
                      {m}
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Daily Reflection */}
            <motion.div custom={2} variants={cardVariants} initial="hidden" animate="show">
              <GlassCard className="p-5 relative overflow-hidden border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-support/30 to-highlight/20" />
                <div className="relative z-10">
                  <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-2">{reflection.emoji} Daily Reflection</p>
                  <p className="font-display font-bold text-base leading-snug mb-4">{reflection.prompt}</p>
                  <Button variant="highlight" className="text-sm py-3" onClick={() => navigate('/insights')}>
                    Reflect in my Intelligence Hub
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Personality Snapshot / CTA */}
            <motion.div custom={3} variants={cardVariants} initial="hidden" animate="show">
              {archetype ? (
                <GlassCard plain className={`p-5 bg-gradient-to-br ${archetype.gradient} text-white border-0`}>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Your Archetype</p>
                  <p className="font-display font-extrabold text-xl mb-1">{archetype.emoji} {archetype.name}</p>
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">{archetype.blurb}</p>
                  <Button variant="dark" className="text-sm py-3 bg-white/15" onClick={() => navigate('/insights')}>
                    Explore your full intelligence profile
                  </Button>
                </GlassCard>
              ) : (
                <GlassCard plain className="p-5 bg-gradient-to-br from-primary to-accent text-white border-0">
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
