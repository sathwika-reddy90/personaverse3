import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import FloatingBlobs from '../components/FloatingBlobs';
import { SkeletonCard, SkeletonHero } from '../components/Skeleton';
import { ARCHETYPES, getArchetype } from '../data/archetypes';
import useReady from '../hooks/useReady';

export default function ArchetypeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const archetype = getArchetype(id);
  const others = ARCHETYPES.filter((a) => a.id !== archetype.id).slice(0, 4);
  const ready = useReady(450);

  if (!ready) {
    return (
      <PageTransition className="flex-1 flex flex-col">
        <div className="px-6 pb-4 safe-top">
          <SkeletonHero className="bg-gradient-to-br from-primary/15 to-accent/15" />
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className={`relative px-6 pb-10 bg-gradient-to-br ${archetype.gradient} text-white overflow-hidden safe-top`}>
        <FloatingBlobs className="opacity-30" />
        <button onClick={() => navigate(-1)} className="relative z-10 mb-6 h-9 w-9 rounded-full bg-white/15 grid place-items-center backdrop-blur">
          ←
        </button>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            className="h-28 w-28 mx-auto rounded-[2rem] bg-white/15 grid place-items-center text-6xl mb-5 backdrop-blur shadow-soft"
          >
            {archetype.emoji}
          </motion.div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-1">Your Archetype</p>
          <h1 className="font-display font-extrabold text-3xl mb-3">{archetype.name}</h1>
          <p className="text-sm text-white/85 leading-relaxed max-w-[300px] mx-auto">{archetype.blurb}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        <div className="flex flex-wrap gap-2 justify-center">
          {archetype.traits.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {t}
            </span>
          ))}
        </div>

        <GlassCard className="p-5">
          <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-3">💜 What this means for you</p>
          <ul className="space-y-2.5 text-sm text-ink/65 leading-relaxed">
            <li>✦ You naturally gravitate toward situations that let your {archetype.traits[0].toLowerCase()} side lead.</li>
            <li>✦ People tend to remember you as {archetype.traits[1].toLowerCase()} — lean into it.</li>
            <li>✦ Your growth multiplies fastest when you pair this with consistent small habits.</li>
          </ul>
        </GlassCard>

        <div>
          <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-3 px-1">Other archetypes to explore</p>
          <div className="grid grid-cols-2 gap-3">
            {others.map((a, i) => (
              <motion.button
                key={a.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/archetype/${a.id}`)}
                className={`rounded-2xl p-4 text-left bg-gradient-to-br ${a.gradient} text-white shadow-soft`}
              >
                <span className="text-2xl block mb-2">{a.emoji}</span>
                <span className="font-display font-bold text-sm">{a.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <Button variant="primary" onClick={() => navigate('/insights')}>
          Open my Intelligence Hub
        </Button>
      </div>
    </PageTransition>
  );
}
