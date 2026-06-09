import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { SkeletonHero, SkeletonCard } from '../../components/common/Skeleton';
import { useApp } from '../../../context/AppContext';
import { getArchetype } from '../../../backend/archetypes/archetypes';
import { getInsights, getCareerMatches, AVERAGE_STUDENT } from '../../../backend/insights/insights';
import {
  getOverallScore,
  getPersonalityMatch,
  getSnapshotTraits,
  getGrowthDetails,
  getLearningProfile,
  getSocialProfile,
  getSkillDetails,
  getActionPlan,
  getFinalSummary,
  getTopStrengths,
  getCompactProfile,
  getCondensedInsight,
  getBigFiveTraits,
  getWorkplaceReadiness,
  getHiringRecommendation,
  getPreferenceIndicators,
  getInterviewFocusAreas,
  getHiringText,
} from '../../../backend/services/reports/report';
import useReady from '../../hooks/useReady';
import { exportSectionsToPdf, sanitizeFileSegment } from '../../../utils/exportReport';
import { exportOnePageSummary } from '../../../utils/exportOnePageReport';

import ReportHeader from '../../components/report/ReportHeader';
import ExecutiveSummary from '../../components/report/ExecutiveSummary';
import PersonalitySnapshot from '../../components/report/PersonalitySnapshot';
import StrengthAnalysis from '../../components/report/StrengthAnalysis';
import GrowthAreas from '../../components/report/GrowthAreas';
import CareerMatches from '../../components/report/CareerMatches';
import ComparisonSection from '../../components/report/ComparisonSection';
import LearningProfile from '../../components/report/LearningProfile';
import SocialProfile from '../../components/report/SocialProfile';
import SkillsSection from '../../components/report/SkillsSection';
import ActionPlan from '../../components/report/ActionPlan';
import FinalSummary from '../../components/report/FinalSummary';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 6) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Report() {
  const navigate = useNavigate();
  const { results } = useApp();
  const ready = useReady(750);
  const reportRef = useRef(null);
  const [exportState, setExportState] = useState('idle');
  const [summaryState, setSummaryState] = useState('idle');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  if (!results) {
    return (
      <PageTransition className="flex-1 flex flex-col">
        <EmptyState
          emoji="📊"
          title="Your report is waiting to be built"
          body="Take your personality deep-dive first — your full Student Intelligence Report unlocks the moment your results are ready."
          ctaLabel="Start my assessment"
          onCta={() => navigate('/assessment')}
        />
      </PageTransition>
    );
  }

  const archetype = getArchetype(results.archetype);
  const insights = getInsights(results.archetype);
  const careerMatches = getCareerMatches(results.archetype);

  const overallScore = getOverallScore(results.scores);
  const personalityMatch = getPersonalityMatch(results);
  const snapshotTraits = getSnapshotTraits(results.scores);
  const growthDetails = getGrowthDetails(results.scores);
  const learningProfile = getLearningProfile(results.scores, insights);
  const socialProfile = getSocialProfile(results.scores);
  const skillDetails = getSkillDetails(insights);
  const actionPlan = getActionPlan(archetype, insights, results, careerMatches);
  const finalSummary = getFinalSummary(archetype, insights, results, careerMatches);

  const topStrengths = getTopStrengths(insights, results, snapshotTraits);
  const compactProfile = getCompactProfile(results.scores, insights);
  const condensedInsight = getCondensedInsight(archetype, insights, results, careerMatches);

  // ── HR 1-page summary data ──────────────────────────────────────────────
  const bigFiveTraits = getBigFiveTraits(results.scores);
  const workplaceReadiness = getWorkplaceReadiness(results.scores);
  const hiringRecommendation = getHiringRecommendation(overallScore);
  const preferenceIndicators = getPreferenceIndicators(results.scores, results.archetype);
  const interviewFocusAreas = getInterviewFocusAreas(results.scores);
  const hiringText = getHiringText(overallScore, archetype, results.scores);
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

  const assessmentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const studentName = 'Explorer';

  const flashToast = (tone, message) => {
    setToast({ tone, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const handleDownload = async () => {
    if (exportState === 'working' || !reportRef.current) return;
    setExportState('working');
    try {
      const sectionEls = Array.from(reportRef.current.querySelectorAll('[data-export-section]'));
      await exportSectionsToPdf({
        sections: sectionEls,
        fileName: `Student_Intelligence_Report_${sanitizeFileSegment(studentName)}.pdf`,
        backgroundColor: '#F0F4F8',
      });
      flashToast('done', 'Report downloaded successfully');
    } catch (err) {
      console.error('Report export failed:', err);
      flashToast('error', "Couldn't generate the PDF — please try again");
    } finally {
      setExportState('idle');
    }
  };

  const handleOnePageSummary = async () => {
    if (summaryState === 'working') return;
    setSummaryState('working');
    try {
      await exportOnePageSummary({
        data: {
          studentName,
          rollNumber: 'N/A',
          college: 'N/A',
          branch: 'N/A',
          assessmentDate,
          overallScore,
          employabilityLevel,
          profileSummary: insights.summary,
          bigFiveTraits,
          personalityHighlights,
          workplaceReadiness,
          careerMatches,
          topStrengths,
          developmentAreas: growthDetails,
          preferenceIndicators,
          interviewFocusAreas,
          hiringRecommendation,
          hiringText,
          archetype,
        },
        fileName: `Student_Intelligence_Summary_${sanitizeFileSegment(studentName)}.pdf`,
      });
      flashToast('done', '1-page summary downloaded successfully');
    } catch (err) {
      console.error('One-page summary export failed:', err);
      flashToast('error', "Couldn't generate the summary — please try again");
    } finally {
      setSummaryState('idle');
    }
  };

  const sections = [
    <ExecutiveSummary key="exec" archetype={archetype} insights={insights} growthAreas={results.growthAreas} summary={insights.summary} />,
    <PersonalitySnapshot key="snapshot" traits={snapshotTraits} />,
    <StrengthAnalysis key="strengths" strengths={insights.strengths} />,
    <GrowthAreas key="growth" areas={growthDetails} />,
    <CareerMatches key="careers" matches={careerMatches} />,
    <ComparisonSection key="comparison" scores={results.scores} average={AVERAGE_STUDENT} />,
    <LearningProfile key="learning" learningStyle={insights.learningStyle} profile={learningProfile} />,
    <SocialProfile key="social" socialStyle={insights.socialStyle} profile={socialProfile} />,
    <SkillsSection key="skills" skills={skillDetails} />,
    <ActionPlan key="plan" plan={actionPlan} />,
    <FinalSummary key="final" archetype={archetype} summary={finalSummary} />,
  ];

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-14">
        <div className="max-w-6xl mx-auto pt-6 sm:pt-8">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => navigate('/insights')}
              className="h-9 w-9 rounded-full bg-ink/5 grid place-items-center text-ink/55 hover:bg-ink/10 transition-colors"
              aria-label="Back to Intelligence Hub"
            >
              ←
            </button>
            <p className="text-[11px] font-bold text-ink/35 uppercase tracking-[0.2em]">Intelligence Hub → Report</p>
          </div>

          {!ready ? (
            <div className="space-y-6">
              <SkeletonHero className="bg-gradient-to-br from-primary/15 to-accent/15" />
              <div className="grid sm:grid-cols-2 gap-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
              <SkeletonCard />
            </div>
          ) : (
            <div ref={reportRef} className="space-y-10 sm:space-y-14">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" data-export-section>
                <ReportHeader
                  studentName={studentName}
                  assessmentDate={assessmentDate}
                  archetype={archetype}
                  personalityMatch={personalityMatch}
                  overallScore={overallScore}
                  onDownload={handleDownload}
                  downloadState={exportState}
                  onOnePageSummary={handleOnePageSummary}
                  summaryState={summaryState}
                />
              </motion.div>

              {sections.map((section, i) => (
                <motion.div key={section.key} custom={i + 1} variants={fadeUp} initial="hidden" animate="show" data-export-section>
                  {section}
                </motion.div>
              ))}

              <motion.div custom={sections.length + 1} variants={fadeUp} initial="hidden" animate="show">
                <GlassCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-base mb-0.5">Want to go deeper?</p>
                    <p className="text-sm text-ink/50">Revisit your full archetype profile or retake the assessment anytime.</p>
                  </div>
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <Button variant="ghost" fullWidth={false} className="flex-1 sm:flex-none px-5" onClick={() => navigate(`/archetype/${archetype.id}`)}>
                      View Archetype
                    </Button>
                    <Button variant="primary" fullWidth={false} className="flex-1 sm:flex-none px-5" onClick={() => navigate('/insights')}>
                      Intelligence Hub
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-card backdrop-blur border text-sm font-bold flex items-center gap-2.5"
            style={
              toast.tone === 'done'
                ? { background: 'rgba(34, 211, 197, 0.16)', borderColor: 'rgba(34, 211, 197, 0.35)', color: '#147f76' }
                : { background: 'rgba(255, 77, 109, 0.14)', borderColor: 'rgba(255, 77, 109, 0.3)', color: '#c23552' }
            }
          >
            <span className="text-base">{toast.tone === 'done' ? '✅' : '⚠️'}</span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
