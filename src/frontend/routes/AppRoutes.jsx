import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

import Onboarding from '../pages/Assessment/Onboarding';
import Home from '../pages/Home';
import AssessmentIntro from '../pages/Assessment/AssessmentIntro';
import AssessmentPlay from '../pages/Assessment/AssessmentPlay';
import Analyzing from '../pages/Assessment/Analyzing';
import Results from '../pages/Results';
import IntelligenceHub from '../pages/IntelligenceHub';
import Profile from '../pages/Profile';
import ArchetypeDetail from '../pages/Results/ArchetypeDetail';
import Report from '../pages/Report';

export default function AppRoutes() {
  const location = useLocation();
  const { onboarded } = useApp();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to={onboarded ? '/home' : '/onboarding'} replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assessment" element={<AssessmentIntro />} />
        <Route path="/assessment/play" element={<AssessmentPlay />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/results" element={<Results />} />
        <Route path="/archetype/:id" element={<ArchetypeDetail />} />
        <Route path="/insights" element={<IntelligenceHub />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
