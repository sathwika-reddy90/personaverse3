import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

// Impact meter is derived from rank — the strengths are already ordered by
// how strongly they define the archetype, so position doubles as intensity.
const IMPACT_BY_RANK = [
  { label: 'Defining', value: 96 },
  { label: 'Core', value: 86 },
  { label: 'Notable', value: 76 },
];

export default function StrengthAnalysis({ strengths }) {
  return (
    <section>
      <SectionTitle emoji="💪" eyebrow="Section 04 · What Powers Them" title="Strength Analysis" blurb="The traits that show up most consistently — and the ones most worth doubling down on." />

      <div className="grid sm:grid-cols-2 gap-4">
        {strengths.map((s, i) => {
          const impact = IMPACT_BY_RANK[i] || IMPACT_BY_RANK[IMPACT_BY_RANK.length - 1];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="p-5 h-full">
                <div className="flex items-start gap-3 mb-4">
                  <span className="h-12 w-12 shrink-0 rounded-2xl bg-support/15 grid place-items-center text-xl">{s.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-base">{s.title}</p>
                    <p className="text-xs text-ink/50 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-ink/40 uppercase tracking-widest">Impact Meter</span>
                    <span className="text-[11px] font-bold text-primary">{impact.label}</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-support"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${impact.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
