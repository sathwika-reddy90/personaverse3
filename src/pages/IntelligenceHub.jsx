import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { SkeletonHero, SkeletonCard, SkeletonRow } from '../components/Skeleton';
import { useApp } from '../context/AppContext';
import { getArchetype } from '../data/archetypes';
import { getInsights, getCareerMatches, AVERAGE_STUDENT, COMPARISON_META } from '../data/insights';
import useReady from '../hooks/useReady';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SectionLabel({ emoji, children }) {
  return (
    <p className="text-[11px] font-bold text-ink/40 uppercase tracking-[0.18em] mb-3 px-1 flex items-center gap-1.5">
      <span>{emoji}</span> {children}
    </p>
  );
}

export default function IntelligenceHub() {
  const navigate = useNavigate();
  const { results } = useApp();
  const ready = useReady(700);

  if (!results) {
    return (
      <PageTransition className="flex-1 flex flex-col">
        <ScreenHeader eyebrow="Self-Discovery" title="Intelligence Hub 🔮" blobVariant="cool" />
        <EmptyState
          emoji="🔮"
          title="Your insights are waiting"
          body="Take your personality deep-dive to unlock a full breakdown of your strengths, career fit, learning style and more."
          ctaLabel="Start my assessment"
          onCta={() => navigate('/assessment')}
        />
      </PageTransition>
    );
  }

  const archetype = getArchetype(results.archetype);
  const insights = getInsights(results.archetype);
  const careerMatches = getCareerMatches(results.archetype);

  return (
    <PageTransition className="flex-1 flex flex-col">
      <ScreenHeader eyebrow="Self-Discovery" title="Intelligence Hub 🔮" blobVariant="cool" />

      <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-6">
        {!ready ? (
          <div className="space-y-6 pt-1">
            <SkeletonHero className="bg-gradient-to-br from-primary/15 to-accent/15" />
            <div className="space-y-2.5">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* 1. Personality Archetype */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
              <button onClick={() => navigate(`/archetype/${archetype.id}`)} className="w-full text-left">
                <GlassCard plain className={`p-6 bg-gradient-to-br ${archetype.gradient} text-white border-0 relative overflow-hidden`}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">Personality Archetype</p>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{archetype.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-display font-extrabold text-xl truncate">{archetype.name}</p>
                      <p className="text-xs text-white/75 mt-0.5">Tap to see your full profile →</p>
                    </div>
                  </div>
                </GlassCard>
              </button>
            </motion.div>

            {/* 2. Strengths */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="💪">Strengths</SectionLabel>
              <div className="space-y-2.5">
                {insights.strengths.map((s) => (
                  <GlassCard key={s.title} className="p-4 flex items-start gap-3">
                    <span className="h-10 w-10 shrink-0 rounded-2xl bg-support/15 grid place-items-center text-lg">{s.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm">{s.title}</p>
                      <p className="text-xs text-ink/50 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* 3. Growth Areas */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="🌱">Growth Areas</SectionLabel>
              <GlassCard className="p-4 space-y-2.5">
                {results.growthAreas.map((area) => (
                  <div key={area} className="flex items-center gap-3 rounded-2xl bg-accent/5 px-4 py-3">
                    <span className="text-lg">🔧</span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm">{area}</p>
                      <p className="text-[11px] text-ink/45">A focus area with real upside for you</p>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>

            {/* 4. Career Matches */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="💼">Career Matches</SectionLabel>
              <div className="space-y-2.5">
                {careerMatches.slice(0, 3).map((c, i) => (
                  <GlassCard key={c.title} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-lg shadow-soft">
                        {c.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-sm truncate">{c.title}</p>
                        <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden mt-1.5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-support"
                            initial={{ width: 0 }}
                            animate={{ width: `${c.match}%` }}
                            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-primary shrink-0">{c.match}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.why.map((w) => (
                        <span key={w} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-support/10 text-[#1a8d83] text-[11px] font-bold">
                          <span>✓</span> {w}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* 4b. You vs Average Student */}
            <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="📊">You vs Average Student</SectionLabel>
              <GlassCard className="p-5 space-y-4">
                {COMPARISON_META.map((m, i) => {
                  const you = results.scores[m.key] ?? 0;
                  const avg = AVERAGE_STUDENT[m.key] ?? 0;
                  return (
                    <div key={m.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-ink/60 flex items-center gap-1.5">
                          <span>{m.emoji}</span> {m.label}
                        </span>
                        <span className="text-[11px] font-bold text-ink/40">
                          <span className="text-primary font-extrabold">{you}%</span> vs {avg}%
                        </span>
                      </div>
                      <div className="relative h-2.5 rounded-full bg-ink/8 overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-ink/20"
                          initial={{ width: 0 }}
                          animate={{ width: `${avg}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${you}%` }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[11px] text-ink/40 font-semibold pt-1">📊 Based on your assessment vs. an anonymized cohort of college students</p>
              </GlassCard>
            </motion.div>

            {/* 5. Learning Style */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="📚">Learning Style</SectionLabel>
              <GlassCard className="p-5 flex items-start gap-4">
                <span className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-support to-primary grid place-items-center text-xl shadow-soft">
                  {insights.learningStyle.emoji}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-extrabold text-base mb-1">{insights.learningStyle.title}</p>
                  <p className="text-xs text-ink/55 leading-relaxed">{insights.learningStyle.desc}</p>
                </div>
              </GlassCard>
            </motion.div>

            {/* 6. Social Style */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="🦋">Social Style</SectionLabel>
              <GlassCard className="p-5 flex items-start gap-4">
                <span className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-accent to-highlight grid place-items-center text-xl shadow-soft">
                  {insights.socialStyle.emoji}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-extrabold text-base mb-1">{insights.socialStyle.title}</p>
                  <p className="text-xs text-ink/55 leading-relaxed">{insights.socialStyle.desc}</p>
                </div>
              </GlassCard>
            </motion.div>

            {/* 7. Recommended Skills */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="🎯">Recommended Skills</SectionLabel>
              <GlassCard className="p-4">
                <div className="flex flex-wrap gap-2">
                  {insights.recommendedSkills.map((s) => (
                    <span key={s} className="px-3.5 py-2 rounded-full bg-support/12 text-[#1a8d83] text-xs font-bold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-support" />
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* 8. Personality Summary */}
            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel emoji="📝">Personality Summary</SectionLabel>
              <GlassCard plain className="p-6 bg-gradient-to-br from-ink to-primary text-white border-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3">In a nutshell</p>
                <p className="font-display font-medium text-[15px] leading-relaxed text-white/90">{insights.summary}</p>
              </GlassCard>
            </motion.div>

            <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show" className="pt-1">
              <Button variant="ghost" onClick={() => navigate('/assessment')}>
                Retake the assessment
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
