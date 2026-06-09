import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

const STAGE_GRADIENTS = [
  'from-support to-primary',
  'from-primary to-accent',
  'from-accent to-highlight',
];

export default function ActionPlan({ plan }) {
  return (
    <section>
      <SectionTitle emoji="🗺️" eyebrow="Section 11 · The Roadmap" title="90-Day Action Plan" blurb="A staged roadmap from awareness to applied proof — built around this student's real strengths and growth edges." />

      <div className="grid lg:grid-cols-3 gap-4">
        {plan.map((stage, i) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <GlassCard className="p-6 h-full flex flex-col relative overflow-hidden">
              <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${STAGE_GRADIENTS[i]} opacity-10 blur-2xl`} />
              <div className="relative z-10 flex items-center gap-3 mb-4">
                <span className={`h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br ${STAGE_GRADIENTS[i]} grid place-items-center text-xl text-white shadow-soft`}>
                  {stage.emoji}
                </span>
                <div>
                  <p className="text-[11px] font-bold text-ink/40 uppercase tracking-widest">{stage.label}</p>
                  <p className="font-display font-extrabold text-lg">{stage.stage}</p>
                </div>
              </div>

              <div className="relative z-10 space-y-4 flex-1">
                <div>
                  <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">🎯 Goals</p>
                  <ul className="space-y-1.5">
                    {stage.goals.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-ink/65 leading-relaxed">
                        <span className="text-primary mt-0.5">●</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1.5">⚡ Recommended Activities</p>
                  <ul className="space-y-1.5">
                    {stage.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-ink/65 leading-relaxed">
                        <span className="text-accent mt-0.5">●</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-4 border-t border-ink/8 rounded-b-2xl">
                <p className="text-[11px] font-bold text-[#1a8d83] uppercase tracking-widest mb-1">🏁 Expected Outcome</p>
                <p className="text-sm text-ink/65 leading-relaxed">{stage.outcome}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
