import { TRAIT_MAPPING } from './traitMapping';
import { validateAnswers } from './validationEngine';

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * Calculates per-trait confidence based on how many questions for that trait
 * were answered and the weight of each question that contributed.
 */
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

/**
 * Calculates archetype confidence based on separation
 * between the top and second-best archetype.
 */
function computeArchetypeConfidence(
  traitScores,
  archetype
) {
  const { ARCHETYPE_TRAITS } = require(
    '../scoring/resultEngine'
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

  if (!best || !second || best.score === 0) {
    return 50;
  }

  const separation =
    (best.score - second.score) /
    best.score;

  return clamp(60 + separation * 40);
}

/**
 * New Assessment Confidence Formula
 *
 * Trait Reliability      40%
 * Consistency Score      25%
 * Coverage Score         15%
 * Social Reliability     10%
 * Archetype Confidence   10%
 */
function computeAssessmentAccuracy(
  answers,
  validationScores,
  traitConfidence,
  archetypeConfidence
) {
  const traitReliability =
    Object.values(traitConfidence).reduce(
      (sum, score) => sum + score,
      0
    ) /
    Object.keys(traitConfidence).length;

  const consistencyScore =
    validationScores.consistencyScore || 0;

  const coverageScore =
    (
      answers.filter(
        (a) =>
          a !== null &&
          a !== undefined
      ).length / 49
    ) * 100;

  const socialDesirabilityScore =
    validationScores.reliabilityScore || 0;

  const overall =
    traitReliability * 0.40 +
    consistencyScore * 0.25 +
    coverageScore * 0.15 +
    socialDesirabilityScore * 0.10 +
    archetypeConfidence * 0.10;

  return clamp(overall);
}

/**
 * Runs the full accuracy pipeline.
 */
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

  const archetypeConfidence =
    computeArchetypeConfidence(
      traitScores,
      archetype
    );

  const assessmentAccuracy =
    computeAssessmentAccuracy(
      answers,
      validationScores,
      traitConfidence,
      archetypeConfidence
    );

  return {
    assessmentAccuracy,
    archetypeConfidence,
    traitConfidence,
    validationScores,
  };
}



// import { ACCURACY_CONFIG } from './accuracyConfig';
// import { TRAIT_MAPPING } from './traitMapping';
// import { validateAnswers } from './validationEngine';

// function clamp(n) {
//   return Math.max(0, Math.min(100, Math.round(n)));
// }

// /**
//  * Calculates per-trait confidence based on how many questions for that trait
//  * were answered and the weight of each question that contributed.
//  */
// function computeTraitConfidence(traitScores, answers) {
//   const traitConfidence = {};

//   Object.entries(TRAIT_MAPPING).forEach(([trait, meta]) => {
//     const traitKey = trait.toLowerCase();
//     const answeredIds = meta.questions.filter((id) => answers[id - 1] != null);
//     const coverage = answeredIds.length / meta.questions.length;
//     const rawScore = traitScores[traitKey] || 0;

//     // Coverage penalty: fewer answered questions → lower confidence.
//     const coveragePenalty = coverage < 0.5 ? 20 : coverage < 0.75 ? 10 : 0;

//     // Score extremity penalty: very low or very high scores are less reliable.
//     const extremityPenalty = rawScore < 10 || rawScore > 95 ? 8 : 0;

//     traitConfidence[traitKey] = clamp(
//       80 * coverage * meta.weight - coveragePenalty - extremityPenalty
//     );
//   });

//   return traitConfidence;
// }

// /**
//  * Derives overall assessment accuracy from the validation scores and trait
//  * coverage, weighted according to accuracyConfig.
//  */
// function computeAssessmentAccuracy(validationScores, traitConfidence) {
//   const { consistency, coverage: coverageWeight, responseVariance, completeness } =
//     ACCURACY_CONFIG.weights;

//   const coverageScore =
//     Object.values(traitConfidence).reduce((s, v) => s + v, 0) /
//     Object.keys(traitConfidence).length;

//   return clamp(
//     validationScores.consistencyScore * consistency +
//     coverageScore * coverageWeight +
//     validationScores.reliabilityScore * responseVariance +
//     validationScores.confidenceScore * completeness
//   );
// }

// /**
//  * Calculates archetype confidence: how strongly the top archetype stands out
//  * from the second-best match across the trait vectors.
//  */
// function computeArchetypeConfidence(traitScores, archetype) {
//   const { ARCHETYPE_TRAITS } = require('../services/scoring/scoring');

//   const archetypeScores = Object.entries(ARCHETYPE_TRAITS).map(([id, traits]) => ({
//     id,
//     score: traits.reduce((s, t) => s + (traitScores[t] || 0), 0),
//   }));

//   archetypeScores.sort((a, b) => b.score - a.score);
//   const best = archetypeScores[0];
//   const second = archetypeScores[1];

//   if (!best || !second || best.score === 0) return 50;

//   const separation = (best.score - second.score) / best.score;
//   return clamp(60 + separation * 40);
// }

// /**
//  * Runs the full accuracy pipeline for a completed assessment.
//  *
//  * @param {{ traitScores: Object, archetype: string, answers: Array }} params
//  * @returns {{
//  *   assessmentAccuracy: number,
//  *   archetypeConfidence: number,
//  *   traitConfidence: Object,
//  *   validationScores: { confidenceScore, consistencyScore, reliabilityScore }
//  * }}
//  */
// export function runAccuracyEngine({ traitScores, archetype, answers }) {
//   const validationScores = validateAnswers(answers);
//   const traitConfidence = computeTraitConfidence(traitScores, answers);
//   const assessmentAccuracy = computeAssessmentAccuracy(validationScores, traitConfidence);
//   const archetypeConfidence = computeArchetypeConfidence(traitScores, archetype);

//   return {
//     assessmentAccuracy,
//     archetypeConfidence,
//     traitConfidence,
//     validationScores,
//   };
// }

