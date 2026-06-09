// Maps each personality trait to all question IDs that measure it, its scoring
// weight multiplier, and the minimum responses required for reliable coverage.
export const TRAIT_MAPPING = {
  Leadership: {
    questions: [3, 18, 27, 36],
    weight: 1.2,
    minimumCoverage: 3,
  },
  Creativity: {
    questions: [12, 13, 14, 15, 17, 29, 30, 37, 42, 45],
    weight: 1.0,
    minimumCoverage: 6,
  },
  Social: {
    questions: [1, 2, 44],
    weight: 1.0,
    minimumCoverage: 2,
  },
  Discipline: {
    questions: [6, 7, 8, 22, 24, 35, 40, 46],
    weight: 1.1,
    minimumCoverage: 5,
  },
  Empathy: {
    questions: [4, 5, 19, 20, 21, 26, 31],
    weight: 1.0,
    minimumCoverage: 4,
  },
  Introspection: {
    questions: [9, 10, 11, 16, 23, 25, 28, 38, 39, 43],
    weight: 1.0,
    minimumCoverage: 6,
  },
  Risk: {
    questions: [32, 33, 34, 41],
    weight: 1.1,
    minimumCoverage: 3,
  },
};

export const getTraitMeta = (traitName) => TRAIT_MAPPING[traitName] || null;

export const getAllTraits = () => Object.keys(TRAIT_MAPPING);
