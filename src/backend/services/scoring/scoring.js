import { TRAIT_LABELS } from '../../../data/questions/questions';

export const ARCHETYPE_TRAITS = {
  founder: ['leadership', 'risk'],
  creative: ['creativity', 'introspection'],
  butterfly: ['social', 'empathy'],
  thinker: ['introspection', 'discipline'],
  chaos: ['risk', 'creativity'],
  growth: ['discipline', 'introspection'],
  visionbuilder: ['leadership', 'discipline'],
  communityleader: ['empathy', 'leadership'],
};

export function computeResults(traitScores) {
  const entries = Object.entries(traitScores);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  const pct = (key) => Math.round(((traitScores[key] || 0) / max) * 100);

  let bestArchetype = 'growth';
  let bestScore = -1;
  Object.entries(ARCHETYPE_TRAITS).forEach(([id, traits]) => {
    const score = traits.reduce((sum, t) => sum + (traitScores[t] || 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestArchetype = id;
    }
  });

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const growthAreas = sorted.slice(-2).map(([k]) => TRAIT_LABELS[k]);
  const topTraits = sorted.slice(0, 2).map(([k]) => TRAIT_LABELS[k]);

  return {
    archetype: bestArchetype,
    scores: {
      social: pct('social'),
      discipline: pct('discipline'),
      creative: pct('creativity'),
      leadership: pct('leadership'),
      empathy: pct('empathy'),
      introspection: pct('introspection'),
      risk: pct('risk'),
    },
    growthAreas,
    topTraits,
  };
}

export const DETECTION_MESSAGES = {
  leadership: { emoji: '🔥', label: 'Leadership detected' },
  empathy: { emoji: '💜', label: 'Empathy rising' },
  social: { emoji: '🌟', label: 'Social energy increasing' },
  discipline: { emoji: '🎯', label: 'Discipline detected' },
  creativity: { emoji: '✨', label: 'Creativity detected' },
  introspection: { emoji: '🧠', label: 'Deep thinking detected' },
  risk: { emoji: '⚡', label: 'Risk appetite spiking' },
};
