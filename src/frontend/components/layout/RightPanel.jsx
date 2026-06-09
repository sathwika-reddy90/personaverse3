import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { getArchetype } from '../../../backend/archetypes/archetypes';
import { getInsights } from '../../../backend/insights/insights';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';

const SCORE_META = [
  { key: 'leadership', emoji: '🧭', label: 'Leadership' },
  { key: 'creative', emoji: '🎨', label: 'Creative' },
  { key: 'social', emoji: '🦋', label: 'Social' },
  { key: 'discipline', emoji: '🎯', label: 'Discipline' },
];

export default function RightPanel({ className = '' }) {
  const navigate = useNavigate();
  const { results } = useApp();

  if (!results) {
    return (
      <aside className={`w-80 shrink-0 flex-col border-l border-ink/[0.05] surface-sunken px-5 py-6 ${className}`}>
        <GlassCard plain lift={false} className="p-5 bg-gradient-to-br from-primary to-accent text-white border-0 hover-lift">
          <p className="font-display font-bold text-base mb-2">Your snapshot is empty</p>
          <p className="text-xs text-white/80 mb-4 leading-relaxed">Take the ~5 minute deep-dive to unlock your archetype, strengths and quick stats right here.</p>
          <Button variant="highlight" className="text-sm py-3" onClick={() => navigate('/assessment')}>
            Start my assessment
          </Button>
        </GlassCard>
      </aside>
    );
  }

  const archetype = getArchetype(results.archetype);
  const insights = getInsights(results.archetype);

  return (
    <aside className={`w-80 shrink-0 flex-col border-l border-ink/[0.05] surface-sunken px-5 py-6 overflow-y-auto space-y-6 ${className}`}>
      <div>
        <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.18em] mb-3 px-1">Personality Snapshot</p>
        <GlassCard className="p-5 flex items-center gap-3.5">
          <span className="text-3xl">{archetype.emoji}</span>
          <div className="min-w-0">
            <p className="font-display font-extrabold text-sm truncate">{archetype.name}</p>
            <p className="text-[11px] text-ink/45 truncate">{archetype.traits.slice(0, 2).join(' · ')}</p>
          </div>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.18em] mb-3 px-1">Archetype</p>
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onClick={() => navigate(`/archetype/${archetype.id}`)}
          className="w-full text-left"
        >
          <GlassCard plain lift={false} className={`p-5 bg-gradient-to-br ${archetype.gradient} text-white border-0 shadow-card`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Your Archetype</p>
            <p className="font-display font-extrabold text-lg mb-1.5">{archetype.emoji} {archetype.name}</p>
            <p className="text-xs text-white/80 leading-relaxed line-clamp-2">{archetype.blurb}</p>
            <p className="text-[11px] font-bold text-white/70 mt-3">View full breakdown →</p>
          </GlassCard>
        </motion.button>
      </div>

      <div>
        <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.18em] mb-3 px-1">Quick Stats</p>
        <GlassCard className="p-5 space-y-4">
          {SCORE_META.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-ink/60 flex items-center gap-1.5">
                  <span>{s.emoji}</span> {s.label}
                </span>
                <span className="text-xs font-extrabold text-primary">{results.scores[s.key]}%</span>
              </div>
              <div className="h-1.5 rounded-full progress-track overflow-hidden">
                <motion.div
                  className="h-full rounded-full progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${results.scores[s.key]}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      <GlassCard plain className="p-5 bg-gradient-to-br from-ink to-primary text-white border-0 shadow-card">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">In a nutshell</p>
        <p className="text-xs leading-relaxed text-white/85 line-clamp-4 mb-3">{insights.summary}</p>
        <button onClick={() => navigate('/insights')} className="text-[11px] font-bold text-highlight hover:text-highlight/80 transition-colors">
          Open Intelligence Hub →
        </button>
      </GlassCard>
    </aside>
  );
}
