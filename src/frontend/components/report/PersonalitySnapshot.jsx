import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

const GRADIENTS = [
  'from-primary to-[#6A2FE0]',
  'from-accent to-[#FF7B95]',
  'from-support to-primary',
  'from-highlight to-[#FFAE5C]',
  'from-primary to-support',
  'from-accent to-highlight',
  'from-[#6A2FE0] to-accent',
  'from-support to-highlight',
];

export default function PersonalitySnapshot({ traits }) {
  return (
    <section>
      <SectionTitle emoji="🧬" eyebrow="Section 03 · The Breakdown" title="Personality Snapshot" blurb="Eight core dimensions, scored from your live assessment — each one shaping how this student thinks, decides and connects." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {traits.map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} grid place-items-center text-lg shadow-soft text-white`}>
                  {t.emoji}
                </span>
                <span className="font-display font-extrabold text-2xl text-ink">{t.value}</span>
              </div>
              <p className="font-display font-bold text-sm mb-2">{t.label}</p>
              <div className="h-2 rounded-full bg-ink/8 overflow-hidden mb-3">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${GRADIENTS[i % GRADIENTS.length]}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="text-xs text-ink/50 leading-relaxed mt-auto">{t.blurb}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
