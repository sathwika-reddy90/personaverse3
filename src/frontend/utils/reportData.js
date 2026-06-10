import { getArchetype } from '../../backend/archetypes/archetypes';
import { getInsights, getCareerMatches } from '../../backend/insights/insights';
import {
  getOverallScore,
  getSnapshotTraits,
  getGrowthDetails,
  getTopStrengths,
  getCompactProfile,
  getHiringRecommendation,
  getPreferenceIndicators,
  getInterviewFocusAreas,
  getHiringText,
  getGrowthMindsetIndicator,
  getCognitiveProcessingStyle,
  getDecisionMakingStyle,
  getBigFiveTraits,
  getWorkplaceReadiness,
} from '../../backend/reports/report';

export const STUDENT_NAME = 'Explorer';
export const STUDENT_ROLE = 'Assessment Candidate';
export const STUDENT_ROLL_NUMBER = 'N/A';
export const STUDENT_COLLEGE = 'N/A';
export const STUDENT_BRANCH = 'N/A';
export const STUDENT_COLLEGE_EMAIL = 'student@college.edu';
export const STUDENT_PERSONAL_EMAIL = 'student@gmail.com';

export const getAssessmentDate = () =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Single source of truth for everything the One-Page Summary (and the
// Dashboard's "Recent Assessment Summary" card) need to derive from results.
export function buildOnePageSummary(results) {
  const archetype = getArchetype(results.archetype);
  const insights = getInsights(results.archetype);
  const careerMatches = getCareerMatches(results.archetype);

  const overallScore = getOverallScore(results.scores);
  const snapshotTraits = getSnapshotTraits(results.scores);
  const growthDetails = getGrowthDetails(results.scores);
  const topStrengths = getTopStrengths(insights, results, snapshotTraits);
  const compactProfile = getCompactProfile(results.scores, insights);

  const employabilityLevel =
    overallScore >= 75 ? 'High' :
    overallScore >= 60 ? 'Above Average' :
    overallScore >= 45 ? 'Average' : 'Below Average';

  // Combine archetype strengths + trait-derived extras for up to 5 highlights.
  const namedTitles = new Set(insights.strengths.map((s) => s.title));
  const personalityHighlights = [
    ...insights.strengths,
    ...topStrengths.filter((s) => !namedTitles.has(s.title)).map((s) => ({ emoji: s.emoji || '✦', title: s.title, desc: s.desc || '' })),
  ].slice(0, 5);

  return {
    studentName: STUDENT_NAME,
    role: STUDENT_ROLE,
    rollNumber: STUDENT_ROLL_NUMBER,
    college: STUDENT_COLLEGE,
    branch: STUDENT_BRANCH,
    collegeEmail: STUDENT_COLLEGE_EMAIL,
    personalEmail: STUDENT_PERSONAL_EMAIL,
    assessmentDate: getAssessmentDate(),
    overallScore,
    employabilityLevel,
    profileSummary: insights.summary,
    archetype,
    insights,
    bigFiveTraits: getBigFiveTraits(results.scores),
    personalityHighlights,
    workplaceReadiness: getWorkplaceReadiness(results.scores),
    careerMatches,
    topStrengths,
    developmentAreas: growthDetails,
    preferenceIndicators: getPreferenceIndicators(results.scores),
    interviewFocusAreas: getInterviewFocusAreas(results.scores),
    hiringRecommendation: getHiringRecommendation(overallScore),
    hiringText: getHiringText(overallScore, archetype, results.scores),
    coreLearningStyle: compactProfile.learningStyle,
    growthMindsetIndicator: getGrowthMindsetIndicator(results.scores),
    cognitiveProcessingStyle: getCognitiveProcessingStyle(results.scores),
    decisionMakingStyle: getDecisionMakingStyle(results.scores),
  };
}
