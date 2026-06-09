import GlassCard from '../common/GlassCard';
import SectionTitle from './SectionTitle';

export default function SocialProfile({ socialStyle, profile }) {
  const rows = [
    { label: 'Communication Style', emoji: '💬', value: profile.communicationStyle },
    { label: 'Team Behaviour', emoji: '🤝', value: profile.teamBehaviour },
    { label: 'Leadership Style', emoji: '🧭', value: profile.leadershipStyle },
    { label: 'Collaboration Preference', emoji: '🔄', value: profile.collaborationPreference },
  ];

  return (
    <section>
      <SectionTitle emoji="🦋" eyebrow="Section 09 · How They Connect" title="Social Profile" blurb="How this student shows up in groups, conversations and shared work." />

      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-ink/8">
          <span className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-accent to-highlight grid place-items-center text-2xl shadow-soft">
            {socialStyle.emoji}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-ink/40 uppercase tracking-widest mb-1">Social Archetype</p>
            <p className="font-display font-extrabold text-lg mb-1">{socialStyle.title}</p>
            <p className="text-sm text-ink/55 leading-relaxed">{socialStyle.desc}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {rows.map((r) => (
            <div key={r.label} className="rounded-2xl bg-ink/[0.03] border border-ink/6 p-4 flex items-start gap-3">
              <span className="text-lg shrink-0">{r.emoji}</span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-ink/40 uppercase tracking-widest mb-1">{r.label}</p>
                <p className="text-sm text-ink/65 leading-relaxed">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
