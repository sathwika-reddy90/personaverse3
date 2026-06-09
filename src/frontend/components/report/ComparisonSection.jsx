import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';
import { COMPARISON_META } from '../../../data/insights/insights';

export default function ComparisonSection({ scores, average }) {
  return (
    <section>
      <SectionTitle emoji="📊" eyebrow="Section 07 · The Benchmark" title="You vs. Average Student" blurb="How this student's scores stack up against an anonymized cohort of college students." />

      <GlassCard className="p-5 sm:p-7 space-y-6">
        {COMPARISON_META.map((m, i) => {
          const you = scores[m.key] ?? 0;
          const avg = average[m.key] ?? 0;
          const diff = you - avg;
          const ahead = diff >= 0;
          return (
            <div key={m.key}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-sm font-bold text-ink/70 flex items-center gap-2">
                  <span className="text-base">{m.emoji}</span> {m.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${ahead ? 'bg-support/15 text-[#1a8d83]' : 'bg-accent/10 text-accent'}`}>
                  {ahead ? '▲' : '▼'} {Math.abs(diff)} pts {ahead ? 'above' : 'below'} average
                </span>
              </div>

              <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5.5rem_1fr] items-center gap-3 mb-1.5">
                <span className="text-[11px] font-bold text-primary text-right">You · {you}%</span>
                <div className="relative h-3 rounded-full bg-ink/8 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${you}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5.5rem_1fr] items-center gap-3">
                <span className="text-[11px] font-bold text-ink/40 text-right">Average · {avg}%</span>
                <div className="relative h-3 rounded-full bg-ink/8 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-ink/25"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${avg}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <p className="text-[11px] text-ink/40 font-semibold pt-1 border-t border-ink/8">
          📊 Based on this student's live assessment results vs. an anonymized cohort of college students.
        </p>
      </GlassCard>
    </section>
  );
}
