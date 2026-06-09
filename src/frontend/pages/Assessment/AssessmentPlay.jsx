import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import LiveDetectionToast from '../../components/assessment/LiveDetectionToast';
import FloatingBlobs from '../../components/common/FloatingBlobs';
import NovaCompanion, { NOVA_LINES } from '../../components/assessment/NovaCompanion';
import UniversalQuestion from '../../components/assessment/UniversalQuestion';
import { questions, GROUPS } from '../../../backend/questions/questions';
import { computeResults, DETECTION_MESSAGES } from '../../../backend/scoring/resultEngine';

let toastSeq = 0;
let novaSeq = 0;

export default function AssessmentPlay() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [novaMessage, setNovaMessage] = useState(null);

  const question = questions[index];
  const group = GROUPS.find((g) => g.id === question.group) ?? GROUPS[0];
  const progress = (index / questions.length) * 100;

  // Normalize backend shape → UniversalQuestion shape (expects .text and .category)
  const questionData = {
    ...question,
    text: question.question,
    category: group.name,
  };

  const pushDetection = (trait) => {
    const msg = DETECTION_MESSAGES[trait];
    if (!msg) return;
    const key = `t-${toastSeq++}`;
    setToasts((t) => [...t.slice(-1), { key, ...msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 2200);
  };

  const showNova = () => {
    const key = `n-${novaSeq++}`;
    const text = NOVA_LINES[Math.floor(Math.random() * NOVA_LINES.length)];
    setNovaMessage({ key, text });
    setTimeout(() => setNovaMessage((m) => (m?.key === key ? null : m)), 3000);
  };

  const finish = (finalAnswers) => {
    const totals = {};
    questions.forEach((q, i) => {
      const score = finalAnswers[i];
      if (score == null || !q.trait) return;
      totals[q.trait] = (totals[q.trait] || 0) + score;
    });
    navigate('/analyzing', { state: { results: computeResults(totals) } });
  };

  const handleAnswer = (score) => {
    if (question.trait) pushDetection(question.trait);
    if ((index + 1) % 7 === 0) showNova();

    const next = [...answers];
    next[index] = score;
    setAnswers(next);

    if (index + 1 >= questions.length) {
      finish(next);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

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
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${group.color} truncate`}
          >
            {group.emoji} {group.name}
          </span>
          <span className="text-xs font-bold text-ink/40 shrink-0">
            {index + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-highlight"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 pb-10 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <UniversalQuestion question={questionData} onAnswer={handleAnswer} />
          </motion.div>
        </AnimatePresence>
      </div>

      <NovaCompanion message={novaMessage} />
    </PageTransition>
  );
}
