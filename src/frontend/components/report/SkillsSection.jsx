import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

const PRIORITY_STYLES = {
  High: 'bg-accent/15 text-accent',
  Medium: 'bg-highlight/20 text-[#9a6b00]',
  Low: 'bg-support/15 text-[#1a8d83]',
};

export default function SkillsSection({ skills }) {
  return (
    <section>
      <SectionTitle emoji="🎯" eyebrow="Section 10 · What To Build Next" title="Recommended Skills" blurb="Skills hand-picked to compound this student's existing strengths — sequenced by priority and difficulty." />

      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((s, i) => (
          <motion.div
            key={s.skill}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-support/12 text-[#1a8d83] text-xs font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-support" /> {s.skill}
                </span>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${PRIORITY_STYLES[s.priority]}`}>
                  {s.priority} priority
                </span>
              </div>
              <p className="text-sm text-ink/60 leading-relaxed mb-4 flex-1">{s.why}</p>
              <div className="flex items-center gap-2 text-[11px] font-bold text-ink/40 uppercase tracking-widest pt-3 border-t border-ink/8">
                <span>📈 Difficulty</span>
                <span className="text-primary">{s.difficulty}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
