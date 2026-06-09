import { ACCURACY_CONFIG } from './accuracyConfig';
import { QUESTION_MAPPING } from './questionMapping';

// Contradiction pairs: if a user scores high on both sides of a pair, it
// signals inconsistent responding within the same trait dimension.
const CONTRADICTION_PAIRS = [
  [1, 12],  // discipline questions — very high vs very low signal contradicts
  [2, 4],   // social initiative vs social avoidance
  [6, 10],  // empathy generosity vs empathy fairness (boundary-setting)
  [14, 19], // risk appetite vs discipline/preparedness
  [16, 17], // stress response vs public confidence
];

function computeConsistencyScore(answers) {
  if (!answers || answers.length === 0) return 100;

  let contradictions = 0;
  CONTRADICTION_PAIRS.forEach(([idA, idB]) => {
    const a = answers[idA - 1];
    const b = answers[idB - 1];
    if (!a || !b) return;

    const metaA = QUESTION_MAPPING.find((q) => q.questionId === idA);
    const metaB = QUESTION_MAPPING.find((q) => q.questionId === idB);
    if (!metaA || !metaB) return;

    // A contradiction is detected when the same underlying trait scores very
    // differently on two questions that measure it from the same direction.
    const scoreA = a[metaA.trait.toLowerCase()] || 0;
    const scoreB = b[metaB.trait.toLowerCase()] || 0;
    if (Math.abs(scoreA - scoreB) > 3) contradictions++;
  });

  const maxContradictions = CONTRADICTION_PAIRS.length;
  const ratio = contradictions / maxContradictions;
  return Math.round(100 - ratio * 60);
}

function computeConfidenceScore(answers) {
  const answered = answers.filter(Boolean).length;
  const total = answers.length;
  const completeness = answered / total;

  // Reward answering most questions; penalise skipping many.
  return Math.round(completeness * 100);
}

function computeReliabilityScore(answers) {
  if (!answers || answers.length < 5) return 50;

  // Detect potential random answering: if trait score variance across questions
  // within the same validation group is very low, the user may be picking
  // answers without reading them.
  const groupScores = {};
  answers.forEach((delta, idx) => {
    if (!delta) return;
    const meta = QUESTION_MAPPING[idx];
    if (!meta) return;
    const g = meta.validationGroup;
    if (!groupScores[g]) groupScores[g] = [];
    const total = Object.values(delta).reduce((s, v) => s + v, 0);
    groupScores[g].push(total);
  });

  let lowVarianceGroups = 0;
  let groupCount = 0;
  Object.values(groupScores).forEach((scores) => {
    if (scores.length < 2) return;
    groupCount++;
    const mean = scores.reduce((s, v) => s + v, 0) / scores.length;
    const variance = scores.reduce((s, v) => s + (v - mean) ** 2, 0) / scores.length;
    if (variance < ACCURACY_CONFIG.randomAnsweringVarianceThreshold) lowVarianceGroups++;
  });

  const randomAnsweringPenalty = groupCount > 0 ? (lowVarianceGroups / groupCount) * 20 : 0;
  return Math.round(Math.max(40, 100 - randomAnsweringPenalty));
}

/**
 * Validates a set of translated answer deltas and returns three quality scores.
 *
 * @param {Array<Object|null>} answers - per-question trait-delta objects
 * @returns {{ confidenceScore: number, consistencyScore: number, reliabilityScore: number }}
 */
export function validateAnswers(answers) {
  return {
    confidenceScore: computeConfidenceScore(answers),
    consistencyScore: computeConsistencyScore(answers),
    reliabilityScore: computeReliabilityScore(answers),
  };
}
