import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import ProgressRing from '../../components/charts/ProgressRing';
import Confetti from '../../components/common/Confetti';
import Button from '../../components/common/Button';
import MagneticButton from '../../components/common/MagneticButton';
import { useApp } from '../../../context/AppContext';
import { getArchetype } from '../../../backend/archetypes/archetypes';
import { getInsights, getCareerMatches } from '../../../backend/insights/insights';

function CardShell({ children, gradient }) {
  return (
    <div className={`relative h-full w-full rounded-[2.25rem] overflow-hidden shadow-card bg-gradient-to-br ${gradient} text-white flex flex-col`}>
      <FloatingBlobs className="opacity-30" />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 text-center">{children}</div>
    </div>
  );
}

const CARD_DEFS = (results, archetype, insights, careerMatches) => [
  {
    id: 'archetype',
    label: 'Card 1 · Your Archetype',
    gradient: archetype.gradient,
    render: () => (
      <>
        <motion.div
          initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
          className="h-28 w-28 rounded-[2rem] bg-white/15 grid place-items-center text-6xl mb-6 shadow-soft backdrop-blur"
        >
          {archetype.emoji}
        </motion.div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-2">Your Archetype Is</p>
        <h2 className="font-display font-extrabold text-3xl mb-4">{archetype.name}</h2>
        <p className="text-sm text-white/85 leading-relaxed mb-6 max-w-[280px]">{archetype.blurb}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {archetype.traits.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="px-3 py-1.5 rounded-full bg-white/15 text-xs font-bold backdrop-blur"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'social',
    label: 'Card 2 · Social Energy',
    gradient: 'from-support to-[#3A0CA3]',
    render: () => (
      <RingCard
        emoji="🦋"
        title="Social Energy"
        value={results.scores.social}
        blurb="You draw energy from people — connection lights you up more than you let on."
        ringColor="#FFC868"
      />
    ),
  },
  {
    id: 'creative',
    label: 'Card 3 · Creative Potential',
    gradient: 'from-accent to-[#FF7B95]',
    render: () => (
      <RingCard
        emoji="🎨"
        title="Creative Potential"
        value={results.scores.creative}
        blurb="Your brain connects dots most people don't even see as related. That's a real edge."
        ringColor="#FFC868"
      />
    ),
  },
  {
    id: 'discipline',
    label: 'Card 4 · Discipline Score',
    gradient: 'from-primary to-[#6A2FE0]',
    render: () => (
      <RingCard
        emoji="🎯"
        title="Discipline Score"
        value={results.scores.discipline}
        blurb="When you commit to something, you actually follow through. That's rarer than you think."
        ringColor="#22D3C5"
      />
    ),
  },
  {
    id: 'strengths',
    label: 'Card 5 · Strengths',
    gradient: 'from-support to-[#1a8d83]',
    render: () => (
      <>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="h-24 w-24 rounded-full bg-white/10 grid place-items-center text-5xl mb-6"
        >
          💪
        </motion.div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-2">What Sets You Apart</p>
        <h2 className="font-display font-extrabold text-2xl mb-6">Your Strengths</h2>
        <div className="space-y-3 w-full max-w-[280px]">
          {insights.strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 text-left"
            >
              <span className="text-xl">{s.emoji}</span>
              <div>
                <p className="font-display font-bold text-sm">{s.title}</p>
                <p className="text-[11px] text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'growth',
    label: 'Card 6 · Growth Areas',
    gradient: 'from-ink to-primary',
    render: () => (
      <>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="h-24 w-24 rounded-full bg-white/10 grid place-items-center text-5xl mb-6"
        >
          🌱
        </motion.div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-2">Where You Can Grow</p>
        <h2 className="font-display font-extrabold text-2xl mb-6">Your Growth Areas</h2>
        <div className="space-y-3 w-full max-w-[280px]">
          {results.growthAreas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 text-left"
            >
              <span className="text-xl">{i === 0 ? '🌟' : '🔧'}</span>
              <div>
                <p className="font-display font-bold text-sm">{area}</p>
                <p className="text-[11px] text-white/55">A focus area with real upside for you</p>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'career',
    label: 'Card 7 · Career Matches',
    gradient: archetype.gradient,
    render: () => (
      <>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="h-24 w-24 rounded-full bg-white/15 grid place-items-center text-5xl mb-6 backdrop-blur"
        >
          💼
        </motion.div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-2">Where You'd Thrive</p>
        <h2 className="font-display font-extrabold text-2xl mb-6">Career Matches</h2>
        <div className="space-y-3 w-full max-w-[280px]">
          {careerMatches.slice(0, 2).map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.18 }}
              className="glass-dark rounded-2xl px-4 py-3.5 text-left"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-xl">{c.emoji}</span>
                <p className="font-display font-bold text-sm flex-1 truncate">{c.title}</p>
                <span className="text-sm font-extrabold text-highlight shrink-0">{c.match}%</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.why.map((w) => (
                  <span key={w} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white/85">
                    ✓ {w}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </>
    ),
  },
];

function RingCard({ emoji, title, value, blurb, ringColor }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-4">{title}</p>
      <ProgressRing value={value} size={150} stroke={14} color={ringColor} trackColor="rgba(255,255,255,0.15)">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-display font-extrabold text-3xl"
          >
            {value}%
          </motion.p>
          <span className="text-2xl">{emoji}</span>
        </div>
      </ProgressRing>
      <p className="text-sm text-white/85 leading-relaxed mt-6 max-w-[280px]">{blurb}</p>
    </>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveResults, results: savedResults } = useApp();
  const results = location.state?.results || savedResults;
  const archetype = useMemo(() => (results ? getArchetype(results.archetype) : null), [results]);
  const insights = useMemo(() => (results ? getInsights(results.archetype) : null), [results]);
  const careerMatches = useMemo(() => (results ? getCareerMatches(results.archetype) : null), [results]);
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!results) navigate('/assessment', { replace: true });
  }, [results, navigate]);

  if (!results || !archetype) return null;

  const cards = CARD_DEFS(results, archetype, insights, careerMatches);
  const isLast = index === cards.length - 1;

  const finish = () => {
    if (!saved) {
      saveResults(results);
      setSaved(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2600);
    }
    navigate('/insights');
  };

  const next = () => {
    if (isLast) finish();
    else setIndex((i) => i + 1);
  };
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <PageTransition className="flex-1 flex flex-col bg-ink">
      {showConfetti && <Confetti />}
      <div className="px-5 safe-top pb-3 flex items-center gap-1.5">
        {cards.map((c, i) => (
          <div key={c.id} className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: i < index ? '100%' : '0%' }}
              animate={{ width: i < index ? '100%' : i === index ? '100%' : '0%' }}
              transition={{ duration: i === index ? 0.5 : 0.2 }}
            />
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">
        {cards[index].label}
      </p>

      <div className="relative flex-1 px-5 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[index].id}
            initial={{ opacity: 0, scale: 0.92, rotateY: 12 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.94, rotateY: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-5 inset-y-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next();
              else if (info.offset.x > 80) prev();
            }}
          >
            <CardShell gradient={cards[index].gradient}>{cards[index].render()}</CardShell>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 safe-bottom flex items-center gap-3">
        {index > 0 && (
          <Button variant="ghost" fullWidth={false} className="px-5 bg-white/10 text-white border-white/10" onClick={prev}>
            ←
          </Button>
        )}
        {isLast ? (
          <MagneticButton className="flex-1" strength={0.25}>
            <Button variant="highlight" icon="🎉" onClick={next}>
              Claim My Results
            </Button>
          </MagneticButton>
        ) : (
          <Button variant="primary" onClick={next}>
            Next Card
          </Button>
        )}
      </div>
    </PageTransition>
  );
}
