import { TRAIT_LABELS } from '../questions/questions';
import { ARCHETYPE_TRAITS } from '../scoring/resultEngine';

// `results.scores` stores creativity under the key `creative`, while the shared
// TRAIT_LABELS vocabulary (and ARCHETYPE_TRAITS) uses `creativity`. This keeps
// every derivation below pointed at the right underlying number.
const SCORE_KEY_ALIAS = { creativity: 'creative' };
const scoreFor = (scores, traitKey) => scores[SCORE_KEY_ALIAS[traitKey] || traitKey] ?? 0;

const SCORE_LABELS = {
  leadership: TRAIT_LABELS.leadership,
  empathy: TRAIT_LABELS.empathy,
  social: TRAIT_LABELS.social,
  discipline: TRAIT_LABELS.discipline,
  creative: TRAIT_LABELS.creativity,
  introspection: TRAIT_LABELS.introspection,
  risk: TRAIT_LABELS.risk,
};

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const avg = (...vals) => clamp(vals.reduce((a, b) => a + b, 0) / vals.length);
const tier = (score, low, mid, high) => (score >= 70 ? high : score >= 45 ? mid : low);

// ── Header metrics ──────────────────────────────────────────────

export const getOverallScore = (scores) => avg(...Object.values(scores));

export const getPersonalityMatch = (results) => {
  const traits = ARCHETYPE_TRAITS[results.archetype] || ARCHETYPE_TRAITS.growth;
  return avg(...traits.map((t) => scoreFor(results.scores, t)));
};

// ── Section 3: Personality Snapshot ─────────────────────────────

export const getSnapshotTraits = (scores) => {
  const analytical = avg(scores.introspection, scores.discipline);
  const confidence = avg(scores.risk, scores.leadership);
  return [
    { key: 'leadership', label: 'Leadership', emoji: '🔥', value: scores.leadership, blurb: 'How naturally you step up, set direction, and own outcomes for a group.' },
    { key: 'creativity', label: 'Creativity', emoji: '🎨', value: scores.creative, blurb: 'How easily you generate original ideas and connect things others see as unrelated.' },
    { key: 'social', label: 'Social', emoji: '🦋', value: scores.social, blurb: 'How quickly you build rapport and bring energy into a room.' },
    { key: 'discipline', label: 'Discipline', emoji: '🎯', value: scores.discipline, blurb: 'How consistently you follow through once the initial motivation fades.' },
    { key: 'curiosity', label: 'Curiosity', emoji: '🧠', value: scores.introspection, blurb: 'How often you dig past the surface to understand the "why" behind things.' },
    { key: 'confidence', label: 'Confidence', emoji: '⚡', value: confidence, blurb: 'How willing you are to back yourself and act before you feel fully ready.' },
    { key: 'analytical', label: 'Analytical Thinking', emoji: '🔍', value: analytical, blurb: 'How methodically you break problems into parts and reason through them.' },
    { key: 'communication', label: 'Communication', emoji: '💬', value: scores.empathy, blurb: 'How clearly you read a room and translate ideas so they land with others.' },
  ];
};

// ── Section 5: Growth Areas ──────────────────────────────────────

const GROWTH_COPY = {
  leadership: { desc: 'Stepping up to guide a group doesn\'t come as naturally to you yet — and that\'s an asset waiting to be unlocked.', action: 'Volunteer to lead one small group task this month and debrief what worked afterwards.' },
  empathy: { desc: 'Tuning into what others are feeling before they say it out loud is a muscle you can build deliberately.', action: 'Practice naming the emotion behind what someone says before you respond to the content.' },
  social: { desc: 'Putting yourself in new social situations takes more energy for you than it does for others — for now.', action: 'Set a weekly goal to start one conversation with someone outside your usual circle.' },
  discipline: { desc: 'Staying consistent once the initial spark fades is your single biggest lever for compounding growth.', action: 'Pick one habit, track it daily for two weeks, and resist adding a second until it sticks.' },
  creative: { desc: 'Generating original ideas from a blank page can feel harder for you than refining something that already exists.', action: 'Run a 10-minute daily brainstorm where quantity counts and judgment is switched off.' },
  introspection: { desc: 'Slowing down to ask "why" before reacting is a quiet skill that compounds heavily over time.', action: 'Close each day with one written line on what you noticed about your own reactions.' },
  risk: { desc: 'Acting before you feel fully ready is uncomfortable for you — and it\'s exactly where the growth lives.', action: 'Pick one low-stakes decision each week and commit to it within five minutes, no second-guessing.' },
};

export const getGrowthDetails = (scores) => {
  const sorted = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  return sorted.slice(0, 3).map(([key, value]) => {
    const copy = GROWTH_COPY[key] || GROWTH_COPY.discipline;
    const priority = value < 40 ? 'High' : value < 60 ? 'Medium' : 'Low';
    return { key, label: SCORE_LABELS[key] || key, value, desc: copy.desc, action: copy.action, priority };
  });
};

// ── Section 8: Learning Profile ──────────────────────────────────

export const getLearningProfile = (scores, insights) => {
  const methods = insights.recommendedSkills.slice(0, 3).map((s) => `Hands-on practice with ${s}`);
  const environment = tier(
    scores.social,
    'Quiet, low-stimulation spaces where you can fully immerse without interruption.',
    'A flexible mix — focused solo blocks balanced with the occasional group session.',
    'Buzzy, social settings — study groups and co-working energy bring out your best.'
  );
  const approach = tier(
    scores.discipline,
    `${insights.learningStyle.title}, kept loose — short, low-pressure sessions will beat long rigid blocks for you.`,
    `${insights.learningStyle.title}, with a light weekly rhythm you can adjust as you go.`,
    `${insights.learningStyle.title}, backed by a structured roadmap — you thrive when you can see the whole plan.`
  );
  const recommendations = [
    `Build sessions around your "${insights.learningStyle.title}" style — that's when concepts click fastest for you.`,
    `Use your sharpest strength, "${insights.strengths[0].title}", as the entry point into harder material.`,
    'Review new material within 24 hours — short, spaced check-ins beat one long cram before a deadline.',
  ];
  return { methods, environment, approach, recommendations };
};

// ── 1-Page Summary: compact learning profile (short labels, not prose) ──

export const getCompactProfile = (scores, insights) => ({
  learningStyle: insights.learningStyle.title,
  socialStyle: insights.socialStyle.title,
  studyMethod: tier(
    scores.discipline,
    'Short, low-pressure sessions',
    'A light, adjustable weekly rhythm',
    'A structured roadmap with clear milestones'
  ),
  environment: tier(
    scores.social,
    'Quiet, low-stimulation spaces',
    'A flexible mix of solo & group time',
    'Buzzy, social study settings'
  ),
});

// ── Section 9: Social Profile ────────────────────────────────────

export const getSocialProfile = (scores) => ({
  communicationStyle: tier(
    scores.empathy,
    'Reserved and considered — you think before you speak and prefer writing things out first.',
    'Balanced — you read the room and adjust your tone to fit what the moment needs.',
    'Warm and expressive — you put people at ease and lead with empathy.'
  ),
  teamBehaviour: tier(
    scores.social,
    'You contribute best in smaller, focused groups where every voice gets real airtime.',
    'You move comfortably between solo focus and group collaboration depending on the task.',
    'You bring energy into every group you join and help quieter voices find their footing.'
  ),
  leadershipStyle: tier(
    scores.leadership,
    'Lead-by-example — you\'d rather show consistency than direct from the front.',
    'Situational — you step up when the moment calls for it and step back when it doesn\'t.',
    'Front-footed — you naturally set direction and rally a group around a shared goal.'
  ),
  collaborationPreference: tier(
    scores.introspection,
    'You think out loud and build best by bouncing ideas off others in real time.',
    'You flex between solo drafting and group refinement depending on the project.',
    'You shape your best thinking solo first, then bring a polished version to the group.'
  ),
});

// ── Section 10: Recommended Skills ───────────────────────────────

const DIFFICULTY_CYCLE = ['Beginner-friendly', 'Intermediate', 'Advanced'];
const PRIORITY_CYCLE = ['High', 'High', 'Medium', 'Medium', 'Low'];

export const getSkillDetails = (insights) => {
  const { strengths, recommendedSkills } = insights;
  return recommendedSkills.map((skill, i) => ({
    skill,
    why: `Pairs naturally with your "${strengths[i % strengths.length].title}" strength, giving you a fast on-ramp into real practice.`,
    difficulty: DIFFICULTY_CYCLE[i % DIFFICULTY_CYCLE.length],
    priority: PRIORITY_CYCLE[i % PRIORITY_CYCLE.length],
  }));
};

// ── Section 11: Action Plan ──────────────────────────────────────

export const getActionPlan = (archetype, insights, results, careerMatches) => {
  const [strength1, strength2] = insights.strengths;
  const [growth1, growth2] = results.growthAreas;
  const [skill1, skill2] = insights.recommendedSkills;
  const topCareer = careerMatches[0];

  return [
    {
      stage: '30 Days',
      label: 'Build awareness',
      emoji: '🌱',
      goals: [
        `Get sharper at noticing when "${growth1}" shows up in everyday decisions`,
        `Name and lean into "${strength1.title}" on purpose at least once a day`,
      ],
      activities: [
        `Keep a 2-minute end-of-day note on one moment "${growth1}" came up`,
        `Spend 15 minutes a day on "${skill1}" through a low-stakes project`,
        `Re-read your ${archetype.name} profile and circle what feels most true`,
      ],
      outcome: 'A clearer, evidence-based picture of your own patterns — not just a label.',
    },
    {
      stage: '60 Days',
      label: 'Build momentum',
      emoji: '🪜',
      goals: [
        `Turn "${strength2.title}" into a repeatable habit, not a one-off`,
        `Take a first real swing at improving "${growth2}"`,
      ],
      activities: [
        'Find one peer or mentor to trade feedback with on a weekly cadence',
        `Practice "${skill2}" in a setting with slightly higher stakes than last month`,
        `Track one measurable signal of progress on "${growth2}" each week`,
      ],
      outcome: 'Visible, repeatable progress — plus a feedback loop that keeps you honest.',
    },
    {
      stage: '90 Days',
      label: 'Apply it for real',
      emoji: '🚀',
      goals: [
        `Put your ${archetype.name} strengths to work on something shaped like a "${topCareer.title}" role`,
        'Package what you\'ve built into something you can actually show people',
      ],
      activities: [
        `Scope a small project that pairs "${strength1.title}" with "${skill1}"`,
        `Get structured feedback from someone already doing "${topCareer.title}"-style work`,
        'Write up what changed for you over the last 90 days, in your own words',
      ],
      outcome: `A portfolio-ready example of your strengths in action — and a concrete head start toward "${topCareer.title}".`,
    },
  ];
};

// ── 1-Page Summary: top 5 strengths (named strengths + standout traits) ──

export const getTopStrengths = (insights, results, snapshotTraits) => {
  const named = new Set(insights.strengths.map((s) => s.title));
  const fromTraits = results.topTraits
    .map((label) => snapshotTraits.find((t) => t.label === label))
    .filter((t) => t && !named.has(t.label))
    .map((t) => ({ emoji: t.emoji, title: t.label, desc: t.blurb }));
  return [...insights.strengths, ...fromTraits].slice(0, 5);
};

// ── Section 12: Final Personality Summary ───────────────────────

// ── 1-Page Summary: condensed final insight (max 5 lines) ───────

export const getCondensedInsight = (archetype, insights, results, careerMatches) => {
  const topCareer = careerMatches[0];
  return [
    `${archetype.name} at the core — ${archetype.blurb}`,
    `You learn best as a "${insights.learningStyle.title}" and connect with others as a "${insights.socialStyle.title}".`,
    `Your sharpest edge is "${insights.strengths[0].title}", and your steepest growth curve sits in "${results.growthAreas[0]}".`,
    `Career paths like "${topCareer.title}" (${topCareer.match}% match) sit close to your natural wiring.`,
    `Pair "${insights.strengths[0].title}" with focused work on "${results.growthAreas[0]}" — that combination is where your next leap is waiting.`,
  ];
};

// ── HR 1-Page Summary functions ─────────────────────────────────

export const getBigFiveTraits = (scores) => [
  { key: 'openness',          label: 'Openness',            abbr: 'OPN', value: avg(scores.creative ?? 0, scores.introspection), desc: 'Intellectual curiosity, creativity, and appreciation for novelty' },
  { key: 'conscientiousness', label: 'Conscientiousness',   abbr: 'CON', value: scores.discipline,                               desc: 'Organisation, dependability, and goal-directed behaviour' },
  { key: 'extraversion',      label: 'Extraversion',        abbr: 'EXT', value: avg(scores.social, scores.leadership),           desc: 'Sociability, assertiveness, and positive emotionality' },
  { key: 'agreeableness',     label: 'Agreeableness',       abbr: 'AGR', value: scores.empathy,                                  desc: 'Cooperation, trust, and concern for others' },
  { key: 'stability',         label: 'Emotional Stability', abbr: 'EST', value: avg(scores.introspection, clamp(100 - (scores.risk ?? 50))), desc: 'Calm under pressure, emotional resilience, and stability' },
];

export const getWorkplaceReadiness = (scores) => [
  { label: 'Communication',          value: avg(scores.empathy, scores.social),           desc: 'Expressing ideas clearly and collaborating with others' },
  { label: 'Leadership',             value: avg(scores.leadership, scores.discipline),    desc: 'Capacity to guide, motivate, and set direction for teams' },
  { label: 'Critical Thinking',      value: avg(scores.introspection, scores.discipline), desc: 'Analytical reasoning and structured problem-solving' },
  { label: 'Adaptability',           value: avg(scores.creative ?? 0, scores.risk ?? 50), desc: 'Flexibility in the face of change and ambiguity' },
  { label: 'Emotional Intelligence', value: avg(scores.empathy, scores.introspection),    desc: 'Self-awareness, empathy, and interpersonal sensitivity' },
];

export const getHiringRecommendation = (overallScore) => {
  if (overallScore >= 75) return { level: 'Strong Hire', color: 'green', label: 'Highly Recommended' };
  if (overallScore >= 60) return { level: 'Hire',        color: 'blue',  label: 'Recommended' };
  if (overallScore >= 45) return { level: 'Consider',    color: 'amber', label: 'Consider with Development' };
  return                         { level: 'Pass',        color: 'red',   label: 'Not Recommended' };
};

export const getPreferenceIndicators = (scores, archetypeId) => [
  {
    dimension: 'E / I',
    label: scores.social >= 50 ? 'Extraverted' : 'Introverted',
    value: scores.social >= 50 ? scores.social : clamp(100 - scores.social),
    desc: scores.social >= 50 ? 'Energised by social interaction and group activity' : 'Energised by reflection and focused solitude',
  },
  {
    dimension: 'N / S',
    label: (scores.creative ?? 0) >= 50 ? 'Intuitive' : 'Sensing',
    value: (scores.creative ?? 0) >= 50 ? (scores.creative ?? 0) : clamp(100 - (scores.creative ?? 0)),
    desc: (scores.creative ?? 0) >= 50 ? 'Drawn to patterns, ideas, and future possibilities' : 'Prefers facts, details, and concrete experience',
  },
  {
    dimension: 'F / T',
    label: scores.empathy >= 50 ? 'Feeling' : 'Thinking',
    value: scores.empathy >= 50 ? scores.empathy : clamp(100 - scores.empathy),
    desc: scores.empathy >= 50 ? 'Decisions guided by values and people impact' : 'Decisions guided by logic and objective analysis',
  },
  {
    dimension: 'J / P',
    label: scores.discipline >= 50 ? 'Judging' : 'Perceiving',
    value: scores.discipline >= 50 ? scores.discipline : clamp(100 - scores.discipline),
    desc: scores.discipline >= 50 ? 'Prefers structure, clear plans, and decisiveness' : 'Prefers flexibility and keeping options open',
  },
];

export const getInterviewFocusAreas = (scores) => {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top2 = sorted.slice(0, 2);
  const bottom2 = sorted.slice(-2);
  return [
    ...top2.map(([key, value]) => ({
      area: SCORE_LABELS[key] || key,
      type: 'strength',
      question: `Describe a specific situation where your ${SCORE_LABELS[key] || key} made a measurable difference.`,
      rationale: `Score ${value}/100 — probe depth and real-world application.`,
    })),
    ...bottom2.map(([key, value]) => ({
      area: SCORE_LABELS[key] || key,
      type: 'development',
      question: `How do you approach situations that demand strong ${SCORE_LABELS[key] || key}?`,
      rationale: `Score ${value}/100 — assess self-awareness and growth orientation.`,
    })),
  ];
};

export const getHiringText = (overallScore, archetype, scores) => {
  const rec = getHiringRecommendation(overallScore);
  const topEntry = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const topLabel = SCORE_LABELS[topEntry[0]] || topEntry[0];
  let body;
  if (overallScore >= 75) {
    body = `${archetype.name} profile demonstrates exceptional readiness. Standout "${topLabel}" score signals high potential for rapid growth. Recommend fast-tracking to role placement with structured mentoring.`;
  } else if (overallScore >= 60) {
    body = `${archetype.name} profile shows strong alignment with workplace requirements. The candidate's "${topLabel}" strength is a reliable predictor of performance. Recommend placement with standard onboarding.`;
  } else if (overallScore >= 45) {
    body = `${archetype.name} profile shows moderate readiness with clear growth potential. Focused development on lower-scoring dimensions recommended before final placement.`;
  } else {
    body = `Profile indicates early-stage readiness. A structured development programme is recommended before considering for direct placement.`;
  }
  return { recommendation: rec.level, body };
};

export const getFinalSummary = (archetype, insights, results, careerMatches) => {
  const topCareer = careerMatches[0];
  const secondCareer = careerMatches[1];
  return {
    nutshell: insights.summary,
    archetypeExplanation: archetype.blurb,
    keyInsights: [
      `Your strongest signal is "${results.topTraits[0]}" — it surfaces in how you think, decide, and connect with others.`,
      `"${insights.strengths[0].title}" is your clearest edge: ${insights.strengths[0].desc}`,
      `Your steepest growth curve sits in "${results.growthAreas[0]}" — and that's exactly where your next leap is waiting.`,
    ],
    futurePotential: `With your ${archetype.name} wiring, paths like "${topCareer.title}" (${topCareer.match}% match)${secondCareer ? ` and "${secondCareer.title}"` : ''} sit close to your natural strengths. The further you lean into "${insights.strengths[0].title}" and "${insights.strengths[1].title}", the faster that potential compounds.`,
    recommendation: `Spend the next 90 days deliberately pairing "${insights.strengths[0].title}" with focused work on "${results.growthAreas[0]}". Doubling down on what already works while chipping away at what doesn't is the fastest route from where you are to where this profile says you can go.`,
  };
};
