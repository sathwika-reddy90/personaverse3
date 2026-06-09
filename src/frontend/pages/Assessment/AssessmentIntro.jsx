import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import MagneticButton from '../../components/common/MagneticButton';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import { SkeletonRow } from '../../components/common/Skeleton';
import useReady from '../../hooks/useReady';
import { GROUPS } from '../../../data/questions/questions';

const SECTIONS = GROUPS.map((g) => ({ ...g, count: 5 }));

export default function AssessmentIntro() {
  const navigate = useNavigate();
  const ready = useReady(450);

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="relative px-6 pt-12 pb-4 overflow-hidden">
        <FloatingBlobs className="opacity-50" />
        <div className="relative z-10">
          <p className="text-xs font-semibold text-ink/40 uppercase tracking-widest mb-1">~5 minute deep-dive</p>
          <h1 className="font-display font-extrabold text-2xl text-ink mb-2">Discover the real you 🧬</h1>
          <p className="text-sm text-ink/55 leading-relaxed">
            25 quick, playful prompts across 5 totally different formats. No boring forms — just vibes and instincts.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32 space-y-3">
        {!ready ? (
          <div className="space-y-3 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : (
          <>
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="p-4 flex items-center gap-4">
                  <div className={`h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center text-2xl shadow-soft`}>
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[15px]">{s.name}</p>
                    <p className="text-xs text-ink/45">{s.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-ink/30 shrink-0">{s.count} Qs</span>
                </GlassCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <GlassCard plain className="p-4 bg-gradient-to-br from-support/20 to-primary/10 border-0">
                <p className="text-sm font-semibold text-ink/70 leading-relaxed">
                  ✨ Watch for live <span className="text-primary font-bold">personality detections</span> popping up as you answer — the assessment reacts to you in real time.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-2">
              <MagneticButton strength={0.25}>
                <Button variant="primary" icon="🚀" onClick={() => navigate('/assessment/play')}>
                  Begin Assessment
                </Button>
              </MagneticButton>
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
