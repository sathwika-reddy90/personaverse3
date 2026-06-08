// PersonaNova assessment — 25 questions across 5 experience styles.
// group 1: Story Scenario · group 2: Friendship/Social Decision
// group 3: Progress Challenge (this-or-that) · group 4: Stress Reaction (emoji)
// group 5: Exploration & Future Thinking (hot takes)
export const questions = [
  // ── GROUP 1 — STORY MODE (Q 1–5) ──
  {
    id: 1, group: 1, mode: 'story',
    scenario: ['🎓 College first day', '🚪 Classroom loki enter ayyav', '🪑 Ekkada kurchuntav?'],
    options: [
      { id: 'a', text: '📝 Front row — notes already open', scores: { disciplineMode: 4, socialBattery: 1 } },
      { id: 'b', text: '🤝 Next to whoever looks friendly', scores: { goldenRetriever: 4, socialBattery: 3 } },
      { id: 'c', text: '🥷 Last bench — full stealth mode', scores: { deepFeels: 3, socialBattery: 0 } },
      { id: 'd', text: '🎯 Middle row — balanced chaos', scores: { socialBattery: 2, disciplineMode: 2, creativeSpark: 1 } },
    ],
  },
  {
    id: 2, group: 1, mode: 'story',
    scenario: ['🎉 Freshers party full swing lo undi', '🎤 Host: Volunteer kavali!', '👀 Nee reaction enti?'],
    options: [
      { id: 'a', text: '🌟 First one up — main character energy', scores: { socialBattery: 4, creativeSpark: 3 } },
      { id: 'b', text: '🙈 Quietly push a friend forward', scores: { goldenRetriever: 2, socialBattery: 1 } },
      { id: 'c', text: '🫥 Phone lo busy — notice avvaledhu', scores: { socialBattery: 0, deepFeels: 3 } },
      { id: 'd', text: '📸 Record from safe distance', scores: { creativeSpark: 2, deepFeels: 2 } },
    ],
  },
  {
    id: 3, group: 1, mode: 'story',
    scenario: ['📱 New class WhatsApp group create ayindi', '🔥 100+ messages already', '👋 Nee first move enti?'],
    options: [
      { id: 'a', text: '👋 "Hey everyone!" — instant energy', scores: { socialBattery: 4, goldenRetriever: 3 } },
      { id: 'b', text: '😂 Drop a savage meme immediately', scores: { creativeSpark: 4, socialBattery: 2 } },
      { id: 'c', text: '👁️ Read everything. Reply never.', scores: { deepFeels: 3, socialBattery: 0 } },
      { id: 'd', text: '📚 "Study group Wednesday?" post chesthav', scores: { disciplineMode: 4, goldenRetriever: 2 } },
    ],
  },
  {
    id: 4, group: 1, mode: 'story',
    scenario: ['🎪 College fest start ayyindi', '🚶 Single ga vachav', '🤔 Em chesthav?'],
    options: [
      { id: 'a', text: '🗣️ Strangers tho conversation start chesthav', scores: { socialBattery: 4, goldenRetriever: 3 } },
      { id: 'b', text: '🎭 Solo explore — all events alone', scores: { creativeSpark: 3, deepFeels: 2 } },
      { id: 'c', text: '📞 Call a friend — come join me!', scores: { goldenRetriever: 4, deepFeels: 2 } },
      { id: 'd', text: '🍔 Food court lo settle, chill chesthav', scores: { deepFeels: 4, socialBattery: 0 } },
    ],
  },
  {
    id: 5, group: 1, mode: 'story',
    scenario: ['🎙️ Presentation start avvabothundi', '😬 Sir: Extra marks icchesthanu!', '💥 Nee reaction enti?'],
    options: [
      { id: 'a', text: '⚡ Immediately hand raise chesthav', scores: { socialBattery: 4, disciplineMode: 3 } },
      { id: 'b', text: '🤫 Dost ni volunteer cheyyadaniki convince', scores: { goldenRetriever: 3, socialBattery: 1 } },
      { id: 'c', text: '🙏 "Please pick someone else" — pray mode', scores: { deepFeels: 3, socialBattery: 0 } },
      { id: 'd', text: '🤓 Pros/cons weigh chesi, wisely decide', scores: { disciplineMode: 4, creativeSpark: 2 } },
    ],
  },

  // ── GROUP 2 — FRIENDSHIP / SOCIAL DECISION MODE (Q 6–10) ──
  {
    id: 6, group: 2, mode: 'swipe',
    emoji: '🙋',
    scenario: 'Friend same doubt 10th time aduguthunnadu',
    question: 'Would you explain again?',
    options: [
      { id: 'yes', text: 'Yes', scores: { goldenRetriever: 4, deepFeels: 2 } },
      { id: 'no', text: 'No', scores: { disciplineMode: 2 } },
    ],
  },
  {
    id: 7, group: 2, mode: 'swipe',
    emoji: '🤝',
    scenario: 'Friend asks notes one day before exam',
    question: 'Would you send them?',
    options: [
      { id: 'yes', text: 'Yes', scores: { goldenRetriever: 4, disciplineMode: 1 } },
      { id: 'no', text: 'No', scores: { disciplineMode: 4 } },
    ],
  },
  {
    id: 8, group: 2, mode: 'swipe',
    emoji: '😱',
    scenario: 'Someone replies after 3 days',
    question: 'Would you still reply?',
    options: [
      { id: 'yes', text: 'Yes', scores: { goldenRetriever: 3, deepFeels: 2 } },
      { id: 'no', text: 'No', scores: { deepFeels: 3 } },
    ],
  },
  {
    id: 9, group: 2, mode: 'swipe',
    emoji: '🎂',
    scenario: 'Friend forgot your birthday',
    question: 'Would you forgive immediately?',
    options: [
      { id: 'yes', text: 'Yes', scores: { goldenRetriever: 4, deepFeels: 1 } },
      { id: 'no', text: 'No', scores: { deepFeels: 4 } },
    ],
  },
  {
    id: 10, group: 2, mode: 'swipe',
    emoji: '👨‍💻',
    scenario: 'Team member did absolutely no work',
    question: 'Would you still add their name?',
    options: [
      { id: 'yes', text: 'Yes', scores: { goldenRetriever: 4 } },
      { id: 'no', text: 'No', scores: { disciplineMode: 4 } },
    ],
  },

  // ── GROUP 3 — PROGRESS CHALLENGE / THIS OR THAT (Q 11–15) ──
  {
    id: 11, group: 3, mode: 'this-or-that',
    options: [
      { id: 'left', emoji: '🎉', text: 'College Fest', scores: { socialBattery: 4, creativeSpark: 2 } },
      { id: 'right', emoji: '😴', text: 'Sleep', scores: { deepFeels: 3, disciplineMode: 2 } },
    ],
  },
  {
    id: 12, group: 3, mode: 'this-or-that',
    options: [
      { id: 'left', emoji: '👥', text: 'Group Study', scores: { socialBattery: 3, goldenRetriever: 2 } },
      { id: 'right', emoji: '🧘', text: 'Study Alone', scores: { disciplineMode: 4, creativeSpark: 2 } },
    ],
  },
  {
    id: 13, group: 3, mode: 'this-or-that',
    options: [
      { id: 'left', emoji: '📱', text: 'Instagram Reels', scores: { creativeSpark: 3, socialBattery: 2 } },
      { id: 'right', emoji: '📖', text: 'Learn Something New', scores: { disciplineMode: 4, creativeSpark: 2 } },
    ],
  },
  {
    id: 14, group: 3, mode: 'this-or-that',
    options: [
      { id: 'left', emoji: '💰', text: 'Stable Job', scores: { disciplineMode: 4 } },
      { id: 'right', emoji: '🚀', text: 'Startup Dream', scores: { creativeSpark: 4, disciplineMode: 1 } },
    ],
  },
  {
    id: 15, group: 3, mode: 'this-or-that',
    options: [
      { id: 'left', emoji: '🎬', text: 'Movie Night', scores: { deepFeels: 3, socialBattery: 2 } },
      { id: 'right', emoji: '🌍', text: 'Travel Adventure', scores: { creativeSpark: 4, socialBattery: 3 } },
    ],
  },

  // ── GROUP 4 — STRESS REACTION / EMOJI MODE (Q 16–20) ──
  {
    id: 16, group: 4, mode: 'emoji-reaction',
    emoji: '😢',
    scenario: 'Surprise Test Tomorrow',
    question: 'Reaction?',
    options: [
      { id: 'em1', text: '😭', label: 'Crying', scores: { deepFeels: 4 } },
      { id: 'em2', text: '😰', label: 'Stressed', scores: { deepFeels: 3, disciplineMode: 1 } },
      { id: 'em3', text: '😐', label: 'Meh', scores: { deepFeels: 2, disciplineMode: 2 } },
      { id: 'em4', text: '😌', label: 'Ready', scores: { disciplineMode: 3, deepFeels: 1 } },
      { id: 'em5', text: '😎', label: 'Bring it', scores: { disciplineMode: 4, socialBattery: 2 } },
    ],
  },
  {
    id: 17, group: 4, mode: 'emoji-reaction',
    emoji: '🎤',
    scenario: 'Sir: Next Presenter... YOU',
    question: 'Reaction?',
    options: [
      { id: 'em1', text: '😭', label: 'Panicking', scores: { deepFeels: 4 } },
      { id: 'em2', text: '😬', label: 'Nervous', scores: { deepFeels: 3, socialBattery: 1 } },
      { id: 'em3', text: '😅', label: 'Okay...', scores: { socialBattery: 2, deepFeels: 2 } },
      { id: 'em4', text: '🙂', label: 'Sure!', scores: { socialBattery: 3, creativeSpark: 2 } },
      { id: 'em5', text: '😏', label: 'Watch me', scores: { socialBattery: 4, creativeSpark: 3 } },
    ],
  },
  {
    id: 18, group: 4, mode: 'emoji-reaction',
    emoji: '😱',
    scenario: 'Crush Viewed Your Story',
    question: 'Reaction?',
    options: [
      { id: 'em1', text: '😭', label: 'Help', scores: { deepFeels: 4 } },
      { id: 'em2', text: '😬', label: 'Anxious', scores: { deepFeels: 3 } },
      { id: 'em3', text: '🙂', label: "It's fine", scores: { deepFeels: 2, socialBattery: 2 } },
      { id: 'em4', text: '😍', label: 'Exciting!', scores: { goldenRetriever: 3, socialBattery: 3 } },
      { id: 'em5', text: '😏', label: 'I know', scores: { socialBattery: 4, creativeSpark: 3 } },
    ],
  },
  {
    id: 19, group: 4, mode: 'emoji-reaction',
    emoji: '📋',
    scenario: 'Results Link Released',
    question: 'Reaction?',
    options: [
      { id: 'em1', text: '😭', label: 'Done', scores: { deepFeels: 4 } },
      { id: 'em2', text: '😨', label: 'Scared', scores: { deepFeels: 3, disciplineMode: 1 } },
      { id: 'em3', text: '😑', label: 'Whatever', scores: { disciplineMode: 3 } },
      { id: 'em4', text: '😎', label: 'Confident', scores: { disciplineMode: 3, socialBattery: 2 } },
      { id: 'em5', text: '🏆', label: 'I aced it', scores: { disciplineMode: 4, socialBattery: 3 } },
    ],
  },
  {
    id: 20, group: 4, mode: 'emoji-reaction',
    emoji: '📞',
    scenario: 'Mom: Immediate ga intiki ra. Reason cheppaledu',
    question: 'Reaction?',
    options: [
      { id: 'em1', text: '😭', label: 'Oh no', scores: { deepFeels: 4, goldenRetriever: 2 } },
      { id: 'em2', text: '😟', label: 'Worried', scores: { deepFeels: 3, goldenRetriever: 3 } },
      { id: 'em3', text: '😶', label: 'Okk', scores: { deepFeels: 2, goldenRetriever: 3 } },
      { id: 'em4', text: '🏃', label: 'On my way', scores: { goldenRetriever: 4, socialBattery: 2 } },
      { id: 'em5', text: '🚗', label: 'Left now', scores: { goldenRetriever: 4, socialBattery: 4 } },
    ],
  },

  // ── GROUP 5 — EXPLORATION & FUTURE THINKING / HOT TAKES (Q 21–25) ──
  {
    id: 21, group: 5, mode: 'hot-take',
    statement: 'Attendance should not matter.',
    options: [
      { id: 'agree', text: '🔥 Agree', scores: { creativeSpark: 3, socialBattery: 2 } },
      { id: 'disagree', text: '📚 Disagree', scores: { disciplineMode: 4 } },
    ],
  },
  {
    id: 22, group: 5, mode: 'hot-take',
    statement: "Marks don't define intelligence.",
    options: [
      { id: 'agree', text: '🔥 Agree', scores: { deepFeels: 3, creativeSpark: 2 } },
      { id: 'disagree', text: '📚 Disagree', scores: { disciplineMode: 4 } },
    ],
  },
  {
    id: 23, group: 5, mode: 'hot-take',
    statement: 'Friends are more important than grades.',
    options: [
      { id: 'agree', text: '🔥 Agree', scores: { goldenRetriever: 4, socialBattery: 3 } },
      { id: 'disagree', text: '📚 Disagree', scores: { disciplineMode: 3, creativeSpark: 2 } },
    ],
  },
  {
    id: 24, group: 5, mode: 'hot-take',
    statement: 'AI will replace most jobs.',
    options: [
      { id: 'agree', text: '🔥 Agree', scores: { creativeSpark: 4, disciplineMode: 2 } },
      { id: 'disagree', text: '📚 Disagree', scores: { deepFeels: 3, goldenRetriever: 2 } },
    ],
  },
  {
    id: 25, group: 5, mode: 'hot-take',
    statement: 'Taking risks is better than playing safe.',
    options: [
      { id: 'agree', text: '🔥 Agree', scores: { creativeSpark: 4, socialBattery: 3 } },
      { id: 'disagree', text: '📚 Disagree', scores: { disciplineMode: 4, deepFeels: 2 } },
    ],
  },
];

export default questions;

// ── Experience-style metadata for the 5 groups ──
export const GROUPS = [
  { id: 1, mode: 'story', name: 'Story Scenarios', emoji: '📖', desc: 'Pick how you\'d react', color: 'from-primary to-[#6A2FE0]', level: 1, levelTitle: 'Story Mode Unlocked', levelEmoji: '📖' },
  { id: 2, mode: 'swipe', name: 'Friendship Check', emoji: '🤝', desc: 'Quick yes or no calls', color: 'from-accent to-[#FF7B95]', level: 2, levelTitle: 'Friendship Mode Unlocked', levelEmoji: '🤝' },
  { id: 3, mode: 'this-or-that', name: 'Progress Challenge', emoji: '⚡', desc: 'This or that, no overthinking', color: 'from-support to-[#3A0CA3]', level: 3, levelTitle: 'Focus & Discipline Unlocked', levelEmoji: '🎯' },
  { id: 4, mode: 'emoji-reaction', name: 'Stress Reactions', emoji: '🌪️', desc: 'React with a single emoji', color: 'from-highlight to-[#FFAE5C]', level: 4, levelTitle: 'Stress Test Unlocked', levelEmoji: '🌪️' },
  { id: 5, mode: 'hot-take', name: 'Future Takes', emoji: '🔭', desc: 'Agree, disagree, no in-between', color: 'from-accent to-highlight', level: 5, levelTitle: 'Future Vision Unlocked', levelEmoji: '🔭' },
];

// Translates this quiz's trait vocabulary onto the app-wide trait keys
// that scoring.js / archetypes.js / Results / Profile / Insights already expect.
export const TRAIT_MAP = {
  disciplineMode: 'discipline',
  socialBattery: 'social',
  goldenRetriever: 'empathy',
  deepFeels: 'introspection',
  creativeSpark: 'creativity',
};

export const TRAIT_LABELS = {
  leadership: 'Leadership',
  empathy: 'Empathy',
  social: 'Social Energy',
  discipline: 'Discipline',
  creativity: 'Creativity',
  introspection: 'Introspection',
  risk: 'Risk Appetite',
};
