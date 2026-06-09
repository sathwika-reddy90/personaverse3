import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

const RANK_STYLES = [
  'bg-gradient-to-br from-highlight to-[#FFAE5C] text-ink',
  'bg-gradient-to-br from-ink/15 to-ink/25 text-ink',
  'bg-gradient-to-br from-[#C98248] to-[#A9663A] text-white',
];

export default function CareerMatches({ matches }) {
  return (
    <section>
      <SectionTitle emoji="💼" eyebrow="Section 06 · Where It Could Lead" title="Career Matches" blurb="Roles ranked by fit with this student's natural strengths and skill profile — not just their job titles." />

      <div className="space-y-3">
        {matches.slice(0, 5).map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center gap-4">
                <span className={`shrink-0 h-10 w-10 rounded-2xl grid place-items-center font-display font-extrabold text-base shadow-soft ${RANK_STYLES[i] || 'bg-ink/10 text-ink/60'}`}>
                  {i + 1}
                </span>
                <span className="shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-xl shadow-soft">
                  {c.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p className="font-display font-bold text-base truncate">{c.title}</p>
                    <span className="shrink-0 font-display font-extrabold text-lg text-primary">{c.match}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-support"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.match}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4 pl-[3.75rem]">
                <span className="text-[11px] font-bold text-ink/40 uppercase tracking-widest mr-1 self-center">Matched Traits</span>
                {c.why.map((w) => (
                  <span key={w} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-support/10 text-[#1a8d83] text-[11px] font-bold">
                    <span>✓</span> {w}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
