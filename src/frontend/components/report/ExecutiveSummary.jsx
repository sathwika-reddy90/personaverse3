import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

export default function ExecutiveSummary({ archetype, insights, growthAreas, summary }) {
  const topStrengths = insights.strengths.slice(0, 3);
  const topGrowth = growthAreas.slice(0, 3);

  return (
    <section>
      <SectionTitle emoji="📋" eyebrow="Section 01 · At a Glance" title="Executive Summary" blurb="The headline view — who this student is, what they lead with, and where the next leap is waiting." />

      <GlassCard plain className={`p-6 sm:p-8 bg-gradient-to-br ${archetype.gradient} text-white border-0 relative overflow-hidden`}>
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/65 mb-3">Primary Archetype</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{archetype.emoji}</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl">{archetype.name}</h3>
            </div>
            <p className="text-sm sm:text-[15px] text-white/85 leading-relaxed mb-5 max-w-md">{archetype.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {archetype.traits.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-[11px] font-bold uppercase tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-3">💪 Top 3 Strengths</p>
              <ul className="space-y-2.5">
                {topStrengths.map((s) => (
                  <li key={s.title} className="flex items-start gap-2 text-sm leading-snug">
                    <span className="text-base shrink-0">{s.emoji}</span>
                    <span className="font-semibold text-white/90">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-3">🌱 Top Growth Areas</p>
              <ul className="space-y-2.5">
                {topGrowth.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm leading-snug">
                    <span className="text-base shrink-0">🔧</span>
                    <span className="font-semibold text-white/90">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 pt-6 border-t border-white/15">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2">📝 Personality Summary</p>
          <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed max-w-3xl">{summary}</p>
        </div>
      </GlassCard>
    </section>
  );
}
