import { TRAIT_MAPPING } from '../questions/traitMapping';
import { validateAnswers } from './validationEngine';

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/* =====================================================
   COMPOSITE DEFINITIONS
===================================================== */

const COMPOSITES = {
  leadership: [18, 19, 20, 21, 27, 31],

  employability: [22, 23, 24, 25, 28, 29],

  entrepreneurship: [14, 33, 34, 36],

  futureReadiness: [17, 28, 29, 37, 42, 43],
};

/* =====================================================
   BIG FIVE
===================================================== */

const BIG_FIVE = {
  extraversion: [1, 2, 3, 44],

  agreeableness: [4, 5, 26, 31],

  conscientiousness: [6, 7, 8, 46],

  emotionalStability: [9, 10, 11, 25],

  openness: [12, 13, 14, 17, 45],
};

/* =====================================================
   RIASEC
===================================================== */

const RIASEC = {
  realistic: [30, 40],

  investigative: [13, 17, 30],

  artistic: [12, 14, 45],

  social: [4, 26, 31],

  enterprising: [18, 33, 34],

  conventional: [6, 8, 46],
};

/* =====================================================
   RELIABILITY
===================================================== */

const RELIABILITY = {
  consistencyPairs: [
    [6, 46],
    [9, 48],
    [10, 44],
    [15, 16],
    [22, 35],
    [24, 43],
    [29, 42],
  ],

  socialDesirability: [47, 48, 49],
};

/* =====================================================
   HELPERS
===================================================== */

function calculateCoverage(questionIds, answers) {
  if (!questionIds.length) return 0;

  const answered = questionIds.filter(
    (id) => answers[id - 1] != null
  ).length;

  return answered / questionIds.length;
}

/* =====================================================
   TRAIT CONFIDENCE (KEEP EXISTING FEATURE)
===================================================== */

function computeTraitConfidence(traitScores, answers) {
  const traitConfidence = {};

  Object.entries(TRAIT_MAPPING).forEach(([trait, meta]) => {
    const traitKey = trait.toLowerCase();

    const answeredIds = meta.questions.filter(
      (id) => answers[id - 1] != null
    );

    const coverage =
      answeredIds.length / meta.questions.length;

    const rawScore = traitScores[traitKey] || 0;

    const coveragePenalty =
      coverage < 0.5
        ? 20
        : coverage < 0.75
        ? 10
        : 0;

    const extremityPenalty =
      rawScore < 10 || rawScore > 95
        ? 8
        : 0;

    traitConfidence[traitKey] = clamp(
      80 * coverage * meta.weight -
        coveragePenalty -
        extremityPenalty
    );
  });

  return traitConfidence;
}

/* =====================================================
   COMPOSITE ACCURACY
===================================================== */

function computeCompositeAccuracy(answers) {
  const scores = Object.values(COMPOSITES).map(
    (questionIds) =>
      calculateCoverage(questionIds, answers) * 100
  );

  const average =
    scores.reduce((a, b) => a + b, 0) /
    scores.length;

  return average;
}

/* =====================================================
   BIG FIVE COVERAGE
===================================================== */

function computeBigFiveCoverage(answers) {
  const scores = Object.values(BIG_FIVE).map(
    (questionIds) =>
      calculateCoverage(questionIds, answers) * 100
  );

  return (
    scores.reduce((a, b) => a + b, 0) /
    scores.length
  );
}

/* =====================================================
   RIASEC COVERAGE
===================================================== */

function computeRiasecCoverage(answers) {
  const scores = Object.values(RIASEC).map(
    (questionIds) =>
      calculateCoverage(questionIds, answers) * 100
  );

  return (
    scores.reduce((a, b) => a + b, 0) /
    scores.length
  );
}

/* =====================================================
   LAYER 2 RELIABILITY
===================================================== */

function computeLayer2Reliability(answers) {
  const consistencyCoverage =
    RELIABILITY.consistencyPairs.filter(
      ([a, b]) =>
        answers[a - 1] != null &&
        answers[b - 1] != null
    ).length /
    RELIABILITY.consistencyPairs.length;

  const socialCoverage =
    RELIABILITY.socialDesirability.filter(
      (id) => answers[id - 1] != null
    ).length /
    RELIABILITY.socialDesirability.length;

  return (
    ((consistencyCoverage +
      socialCoverage) /
      2) *
    100
  );
}

/* =====================================================
   NEW OVERALL ACCURACY
===================================================== */

function computeAssessmentAccuracy(answers) {
  const compositeAccuracy =
    computeCompositeAccuracy(answers);

  const layer2Reliability =
    computeLayer2Reliability(answers);

  const bigFiveCoverage =
    computeBigFiveCoverage(answers);

  const riasecCoverage =
    computeRiasecCoverage(answers);

  const overall =
    compositeAccuracy * 0.50 +
    layer2Reliability * 0.20 +
    bigFiveCoverage * 0.15 +
    riasecCoverage * 0.15;

  return clamp(overall);
}

/* =====================================================
   ARCHETYPE CONFIDENCE
===================================================== */

function computeArchetypeConfidence(
  traitScores,
  archetype
) {
  const { ARCHETYPE_TRAITS } = require(
    '../services/scoring/scoring'
  );

  const archetypeScores = Object.entries(
    ARCHETYPE_TRAITS
  ).map(([id, traits]) => ({
    id,
    score: traits.reduce(
      (s, t) => s + (traitScores[t] || 0),
      0
    ),
  }));

  archetypeScores.sort(
    (a, b) => b.score - a.score
  );

  const best = archetypeScores[0];
  const second = archetypeScores[1];

  if (!best || !second || best.score === 0)
    return 50;

  const separation =
    (best.score - second.score) /
    best.score;

  return clamp(60 + separation * 40);
}

/* =====================================================
   MAIN ENGINE
===================================================== */

export function runAccuracyEngine({
  traitScores,
  archetype,
  answers,
}) {
  const validationScores =
    validateAnswers(answers);

  const traitConfidence =
    computeTraitConfidence(
      traitScores,
      answers
    );

  const assessmentAccuracy =
    computeAssessmentAccuracy(answers);

  const archetypeConfidence =
    computeArchetypeConfidence(
      traitScores,
      archetype
    );

  return {
    assessmentAccuracy,
    archetypeConfidence,
    traitConfidence,
    validationScores,

    breakdown: {
      compositeAccuracy:
        computeCompositeAccuracy(answers),

      layer2Reliability:
        computeLayer2Reliability(answers),

      bigFiveCoverage:
        computeBigFiveCoverage(answers),

      riasecCoverage:
        computeRiasecCoverage(answers),
    },
  };
}

