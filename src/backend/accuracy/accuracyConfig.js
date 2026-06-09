export const ACCURACY_CONFIG = {
  minimumQuestionsForReliability: 20,
  minimumTraitCoverage: 4,
  contradictionThreshold: 0.4,
  lowConfidenceThreshold: 55,
  randomAnsweringVarianceThreshold: 0.15,

  weights: {
    consistency: 0.35,
    coverage: 0.30,
    responseVariance: 0.20,
    completeness: 0.15,
  },

  confidenceBands: {
    high: { min: 80, label: 'High Confidence', color: '#22D3C5' },
    medium: { min: 60, label: 'Moderate Confidence', color: '#FFC868' },
    low: { min: 0, label: 'Low Confidence', color: '#FF4D6D' },
  },
};
