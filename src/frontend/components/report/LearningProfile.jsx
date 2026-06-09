import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

export default function LearningProfile({ learningStyle, profile }) {
  return (
    <section>
      <SectionTitle emoji="📚" eyebrow="Section 08 · How They Learn Best" title="Learning Profile" blurb="The conditions, methods and rhythms most likely to make new material stick." />

      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-ink/8">
          <span className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-support to-primary grid place-items-center text-2xl shadow-soft">
            {learningStyle.emoji}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-ink/40 uppercase tracking-widest mb-1">Learning Style</p>
            <p className="font-display font-extrabold text-lg mb-1">{learningStyle.title}</p>
            <p className="text-sm text-ink/55 leading-relaxed">{learningStyle.desc}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2.5">🛠️ Best Learning Methods</p>
            <ul className="space-y-2">
              {profile.methods.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-ink/65 leading-relaxed">
                  <span className="text-support mt-0.5">●</span> {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2.5">📝 Study Recommendations</p>
            <ul className="space-y-2">
              {profile.recommendations.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink/65 leading-relaxed">
                  <span className="text-accent mt-0.5">●</span> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-support/8 p-4">
            <p className="text-[11px] font-bold text-[#1a8d83] uppercase tracking-widest mb-1.5">🏠 Ideal Study Environment</p>
            <p className="text-sm text-ink/65 leading-relaxed">{profile.environment}</p>
          </div>
          <div className="rounded-2xl bg-primary/6 p-4">
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">🧭 Ideal Learning Approach</p>
            <p className="text-sm text-ink/65 leading-relaxed">{profile.approach}</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
