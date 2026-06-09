import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

const PRIORITY_STYLES = {
  High: 'bg-accent/15 text-accent',
  Medium: 'bg-highlight/20 text-[#9a6b00]',
  Low: 'bg-support/15 text-[#1a8d83]',
};

export default function GrowthAreas({ areas }) {
  return (
    <section>
      <SectionTitle emoji="🌱" eyebrow="Section 05 · The Edge" title="Growth Areas" blurb="Where the steepest near-term gains are hiding — ranked by how much room there is to grow." />

      <div className="space-y-3">
        {areas.map((area, i) => (
          <motion.div
            key={area.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="h-11 w-11 shrink-0 rounded-2xl bg-accent/10 grid place-items-center text-lg">🔧</span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-base">{area.label}</p>
                    <p className="text-[11px] text-ink/40 font-semibold">Current signal: {area.value}%</p>
                  </div>
                </div>
                <span className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${PRIORITY_STYLES[area.priority]}`}>
                  {area.priority} priority
                </span>
              </div>
              <p className="text-sm text-ink/60 leading-relaxed mb-3">{area.desc}</p>
              <div className="flex items-start gap-2.5 rounded-2xl bg-primary/5 px-4 py-3">
                <span className="text-base shrink-0">🎯</span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5">Recommended Action</p>
                  <p className="text-sm text-ink/65 leading-relaxed">{area.action}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
