// Maps each personality trait to the question IDs that measure it, its scoring
// weight, and the minimum number of question responses required for reliable
// coverage of that trait.
export const TRAIT_MAPPING = {
  Leadership: {
    questions: [5],
    weight: 1.2,
    minimumCoverage: 1,
  },
  Creativity: {
    questions: [13, 15, 21],
    weight: 1.0,
    minimumCoverage: 2,
  },
  Social: {
    questions: [2, 3, 4, 11, 17, 23],
    weight: 1.0,
    minimumCoverage: 4,
  },
  Discipline: {
    questions: [1, 12, 19],
    weight: 1.1,
    minimumCoverage: 2,
  },
  Empathy: {
    questions: [6, 7, 8, 9, 10, 20],
    weight: 1.0,
    minimumCoverage: 4,
  },
  Introspection: {
    questions: [16, 18, 22],
    weight: 1.0,
    minimumCoverage: 2,
  },
  Risk: {
    questions: [14, 24, 25],
    weight: 1.1,
    minimumCoverage: 2,
  },
};

export const getTraitMeta = (traitName) => TRAIT_MAPPING[traitName] || null;

export const getAllTraits = () => Object.keys(TRAIT_MAPPING);
