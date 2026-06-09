import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import LiveDetectionToast from '../../components/assessment/LiveDetectionToast';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import StoryQuestion from '../../components/assessment/StoryQuestion';
import SwipeQuestion from '../../components/assessment/SwipeQuestion';
import EmojiQuestion from '../../components/assessment/EmojiQuestion';
import ThisOrThatQuestion from '../../components/assessment/ThisOrThatQuestion';
import HotTakeQuestion from '../../components/assessment/HotTakeQuestion';
import NovaCompanion, { NOVA_LINES } from '../../components/assessment/NovaCompanion';
import LiveMeters from '../../components/assessment/LiveMeters';
import LevelUnlocked from '../../components/assessment/LevelUnlocked';
import { questions, GROUPS, TRAIT_MAP } from '../../../data/questions/questions';
import { computeResults, DETECTION_MESSAGES } from '../../../backend/services/scoring/scoring';

const QUESTION_COMPONENTS = {
  story: StoryQuestion,
  swipe: SwipeQuestion,
  'this-or-that': ThisOrThatQuestion,
  'emoji-reaction': EmojiQuestion,
  'hot-take': HotTakeQuestion,
};

function buildSteps() {
  return questions.map((q) => ({ type: q.mode, group: q.group, data: q }));
}

// Translates this quiz's trait keys (socialBattery, goldenRetriever, ...)
// onto the app-wide trait vocabulary that computeResults/archetypes expect.
function translateScores(rawScores) {
  const out = {};
  Object.entries(rawScores || {}).forEach(([key, value]) => {
    const mapped = TRAIT_MAP[key] || key;
    out[mapped] = (out[mapped] || 0) + value;
  });
  return out;
}

let toastSeq = 0;
let novaSeq = 0;

// Mirrors computeResults' relative-to-max normalization, purely for the
// live in-assessment meters (no effect on final scoring).
function computeLiveScores(answers) {
  const totals = {};
  answers.forEach((delta) => {
    if (!delta) return;
    Object.entries(delta).forEach(([trait, value]) => {
      totals[trait] = (totals[trait] || 0) + value;
    });
  });
  const max = Math.max(...Object.values(totals), 1);
  const pct = (key) => Math.round(((totals[key] || 0) / max) * 100);
  return { social: pct('social'), creativity: pct('creativity'), empathy: pct('empathy'), introspection: pct('introspection') };
}

export default function AssessmentPlay() {
  const navigate = useNavigate();
  const steps = useMemo(buildSteps, []);
  const [index, setIndex] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [answers, setAnswers] = useState(() => Array(steps.length).fill(null));
  const [novaMessage, setNovaMessage] = useState(null);
  const [showLevel, setShowLevel] = useState(false);
  const shownLevels = useRef(new Set());

  const step = steps[index];
  const group = GROUPS[step.group - 1];
  const isFirstOfGroup = index === 0 || steps[index - 1].group !== step.group;
  const progress = (index / steps.length) * 100;
  const liveScores = useMemo(() => computeLiveScores(answers), [answers]);

  useEffect(() => {
    if (isFirstOfGroup && index > 0 && !shownLevels.current.has(group.id)) {
      shownLevels.current.add(group.id);
      setShowLevel(true);
      const t = setTimeout(() => setShowLevel(false), 1500);
      return () => clearTimeout(t);
    }
  }, [index, isFirstOfGroup, group.id]);

  const pushDetection = (trait) => {
    const msg = DETECTION_MESSAGES[trait];
    if (!msg) return;
    const key = `t-${toastSeq++}`;
    setToasts((t) => [...t.slice(-1), { key, ...msg }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.key !== key));
    }, 2200);
  };

  const showNova = () => {
    const key = `n-${novaSeq++}`;
    const text = NOVA_LINES[Math.floor(Math.random() * NOVA_LINES.length)];
    setNovaMessage({ key, text });
    setTimeout(() => {
      setNovaMessage((m) => (m && m.key === key ? null : m));
    }, 3000);
  };

  const finish = (finalAnswers) => {
    const totals = {};
    finalAnswers.forEach((delta) => {
      if (!delta) return;
      Object.entries(delta).forEach(([trait, value]) => {
        totals[trait] = (totals[trait] || 0) + value;
      });
    });
    const results = computeResults(totals);
    navigate('/analyzing', { state: { results } });
  };

  const handleAnswer = (rawScores) => {
    const translated = translateScores(rawScores);
    const dominant = Object.entries(translated).sort((a, b) => b[1] - a[1])[0];
    if (dominant) pushDetection(dominant[0]);
    if ((index + 1) % 3 === 0) showNova();

    const next = [...answers];
    next[index] = translated;
    setAnswers(next);

    if (index + 1 >= steps.length) {
      finish(next);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const QuestionComponent = QUESTION_COMPONENTS[step.type];

  return (
    <PageTransition className="flex-1 flex flex-col relative">
      <FloatingBlobs className="opacity-30" />
      <LiveDetectionToast items={toasts} />

      <div className="relative z-10 px-6 safe-top pb-2">
        <div className="flex items-center justify-between mb-3 gap-2">
          {index > 0 ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={goBack}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-ink/50 bg-ink/5 shrink-0"
            >
              ← Previous
            </motion.button>
          ) : (
            <span className="w-[88px] shrink-0" />
          )}
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${group.color} truncate`}>
            {group.emoji} {group.name}
          </span>
          <span className="text-xs font-bold text-ink/40 shrink-0">{index + 1} / {steps.length}</span>
        </div>
        <div className="h-2 rounded-full bg-ink/10 overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-highlight"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <LiveMeters scores={liveScores} />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 pb-10 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.data.id}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <QuestionComponent data={step.data} onAnswer={handleAnswer} />
          </motion.div>
        </AnimatePresence>
      </div>

      <NovaCompanion message={novaMessage} />

      <AnimatePresence>
        {showLevel && (
          <LevelUnlocked level={group.level} title={group.levelTitle} emoji={group.levelEmoji} color={group.color} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
