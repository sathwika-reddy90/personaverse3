import GlassCard from '../common/GlassCard';
import FloatingBlobs from '../common/FloatingBlobs';
import SectionTitle from './SectionTitle';

export default function FinalSummary({ archetype, summary }) {
  return (
    <section>
      <SectionTitle emoji="✨" eyebrow="Section 12 · The Final Word" title="Final Personality Summary" blurb="The complete picture — distilled into one premium takeaway worth revisiting." />

      <GlassCard plain className="relative overflow-hidden p-7 sm:p-10 bg-gradient-to-br from-ink via-primary to-[#22D3C5] text-white border-0">
        <FloatingBlobs variant="cool" className="opacity-25" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-14 w-14 rounded-2xl bg-white/12 backdrop-blur grid place-items-center text-2xl border border-white/20">
              {archetype.emoji}
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/55">In a Nutshell</p>
              <p className="font-display font-extrabold text-lg">{archetype.name}</p>
            </div>
          </div>

          <p className="font-display font-medium text-lg sm:text-xl leading-relaxed text-white/95 mb-8 max-w-3xl">
            {summary.nutshell}
          </p>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white/8 backdrop-blur border border-white/12 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-highlight mb-2">🧬 Archetype Explanation</p>
              <p className="text-sm text-white/85 leading-relaxed">{summary.archetypeExplanation}</p>
            </div>
            <div className="rounded-2xl bg-white/8 backdrop-blur border border-white/12 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-highlight mb-2">🚀 Future Potential</p>
              <p className="text-sm text-white/85 leading-relaxed">{summary.futurePotential}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/8 backdrop-blur border border-white/12 p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-highlight mb-3">💡 Key Insights</p>
            <ul className="space-y-2.5">
              {summary.keyInsights.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm text-white/85 leading-relaxed">
                  <span className="text-highlight mt-0.5 shrink-0">✦</span> {k}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-2xl bg-white/12 backdrop-blur border border-white/20 p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2">🎁 Personalized Recommendation</p>
            <p className="font-display font-medium text-[15px] sm:text-base text-white leading-relaxed">{summary.recommendation}</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
