import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import { useApp } from '../../../context/AppContext';
import { getArchetype } from '../../../data/archetypes/archetypes';
import { getInsights } from '../../../data/insights/insights';

const MENU = [
  { emoji: '🔔', label: 'Notifications' },
  { emoji: '🔒', label: 'Privacy & Data' },
  { emoji: '👯', label: 'Invite Friends' },
  { emoji: '💬', label: 'Help & Support' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { results } = useApp();
  const archetype = results ? getArchetype(results.archetype) : null;
  const insights = results ? getInsights(results.archetype) : null;

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="relative px-6 pb-8 safe-top overflow-hidden bg-gradient-to-br from-primary to-[#6A2FE0] text-white">
        <FloatingBlobs className="opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            className="h-24 w-24 rounded-full bg-white/15 grid place-items-center text-5xl mb-4 backdrop-blur shadow-soft border-2 border-white/30"
          >
            {archetype ? archetype.emoji : '🙂'}
          </motion.div>
          <h1 className="font-display font-extrabold text-xl mb-1">Hey, Explorer ✨</h1>
          <p className="text-sm text-white/75">
            {archetype ? archetype.name : 'Take the assessment to reveal your archetype'}
          </p>
          {archetype && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {archetype.traits.slice(0, 3).map((trait) => (
                <span key={trait} className="glass-dark rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide">
                  {trait}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {archetype ? (
          <>
            <GlassCard plain className={`p-5 bg-gradient-to-br ${archetype.gradient} text-white border-0`}>
              <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Your Archetype</p>
              <p className="font-display font-extrabold text-lg mb-3">{archetype.emoji} {archetype.name}</p>
              <Button variant="dark" className="text-sm py-3 bg-white/15" onClick={() => navigate(`/archetype/${archetype.id}`)}>
                View full breakdown
              </Button>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-3">📝 In a nutshell</p>
              <p className="text-sm text-ink/65 leading-relaxed">{insights.summary}</p>
              <Button variant="ghost" className="mt-4 text-sm py-3" onClick={() => navigate('/insights')}>
                Open Intelligence Hub
              </Button>
            </GlassCard>
          </>
        ) : (
          <GlassCard plain className="p-5 bg-gradient-to-br from-primary to-accent text-white border-0">
            <p className="font-display font-bold text-lg mb-2">Your profile is still a blank canvas</p>
            <p className="text-sm text-white/80 mb-4">Take the assessment to unlock your archetype, strengths and full personality breakdown.</p>
            <Button variant="highlight" className="text-sm py-3" onClick={() => navigate('/assessment')}>
              Start my assessment
            </Button>
          </GlassCard>
        )}

        <GlassCard className="p-2">
          {MENU.map((item, i) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i !== MENU.length - 1 ? 'border-b border-ink/5' : ''}`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="flex-1 text-sm font-semibold text-ink/75">{item.label}</span>
              <span className="text-ink/25">›</span>
            </motion.button>
          ))}
        </GlassCard>

        {archetype && (
          <Button variant="ghost" onClick={() => navigate('/assessment')}>
            Retake the assessment
          </Button>
        )}

        <p className="text-center text-xs text-ink/30 font-medium pb-4">PersonaNova · Know Yourself. Grow Yourself.</p>
      </div>
    </PageTransition>
  );
}
