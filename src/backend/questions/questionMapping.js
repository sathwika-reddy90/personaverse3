// Maps each question ID to the trait it primarily measures, its weight, and
// validation group (used to detect contradictory answer patterns).
export const QUESTION_MAPPING = [
  { questionId: 1,  trait: 'Discipline',     subTrait: 'Focus',            weight: 4, reverseScored: false, validationGroup: 'A' },
  { questionId: 2,  trait: 'Social',         subTrait: 'Initiative',       weight: 4, reverseScored: false, validationGroup: 'B' },
  { questionId: 3,  trait: 'Social',         subTrait: 'Engagement',       weight: 3, reverseScored: false, validationGroup: 'B' },
  { questionId: 4,  trait: 'Social',         subTrait: 'Openness',         weight: 3, reverseScored: false, validationGroup: 'B' },
  { questionId: 5,  trait: 'Leadership',     subTrait: 'Volunteerism',     weight: 4, reverseScored: false, validationGroup: 'A' },
  { questionId: 6,  trait: 'Empathy',        subTrait: 'Patience',         weight: 4, reverseScored: false, validationGroup: 'C' },
  { questionId: 7,  trait: 'Empathy',        subTrait: 'Generosity',       weight: 3, reverseScored: false, validationGroup: 'C' },
  { questionId: 8,  trait: 'Empathy',        subTrait: 'Forgiveness',      weight: 3, reverseScored: false, validationGroup: 'C' },
  { questionId: 9,  trait: 'Empathy',        subTrait: 'Acceptance',       weight: 4, reverseScored: false, validationGroup: 'C' },
  { questionId: 10, trait: 'Empathy',        subTrait: 'Fairness',         weight: 4, reverseScored: false, validationGroup: 'C' },
  { questionId: 11, trait: 'Social',         subTrait: 'Energy',           weight: 3, reverseScored: false, validationGroup: 'B' },
  { questionId: 12, trait: 'Discipline',     subTrait: 'Study Habits',     weight: 4, reverseScored: false, validationGroup: 'A' },
  { questionId: 13, trait: 'Creativity',     subTrait: 'Curiosity',        weight: 3, reverseScored: false, validationGroup: 'D' },
  { questionId: 14, trait: 'Risk',           subTrait: 'Ambition',         weight: 4, reverseScored: false, validationGroup: 'E' },
  { questionId: 15, trait: 'Creativity',     subTrait: 'Exploration',      weight: 3, reverseScored: false, validationGroup: 'D' },
  { questionId: 16, trait: 'Introspection',  subTrait: 'Stress Response',  weight: 3, reverseScored: false, validationGroup: 'F' },
  { questionId: 17, trait: 'Social',         subTrait: 'Confidence',       weight: 4, reverseScored: false, validationGroup: 'B' },
  { questionId: 18, trait: 'Introspection',  subTrait: 'Emotional Depth',  weight: 3, reverseScored: false, validationGroup: 'F' },
  { questionId: 19, trait: 'Discipline',     subTrait: 'Preparedness',     weight: 4, reverseScored: false, validationGroup: 'A' },
  { questionId: 20, trait: 'Empathy',        subTrait: 'Family Bond',      weight: 4, reverseScored: false, validationGroup: 'C' },
  { questionId: 21, trait: 'Creativity',     subTrait: 'Non-Conformity',   weight: 3, reverseScored: false, validationGroup: 'D' },
  { questionId: 22, trait: 'Introspection',  subTrait: 'Self-Concept',     weight: 3, reverseScored: false, validationGroup: 'F' },
  { questionId: 23, trait: 'Social',         subTrait: 'Prioritisation',   weight: 3, reverseScored: false, validationGroup: 'B' },
  { questionId: 24, trait: 'Risk',           subTrait: 'Future Outlook',   weight: 4, reverseScored: false, validationGroup: 'E' },
  { questionId: 25, trait: 'Risk',           subTrait: 'Risk Tolerance',   weight: 4, reverseScored: false, validationGroup: 'E' },
];

export const getQuestionMeta = (questionId) =>
  QUESTION_MAPPING.find((q) => q.questionId === questionId) || null;
