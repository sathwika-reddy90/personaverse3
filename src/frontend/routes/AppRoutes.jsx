import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import RequireAuth from './RequireAuth';

import Dashboard from '../pages/Dashboard';
import AssessmentPlay from '../pages/Assessment/AssessmentPlay';
import Analyzing from '../pages/Assessment/Analyzing';
import Results from '../pages/Results';
import ArchetypeDetail from '../pages/Results/ArchetypeDetail';
import Report from '../pages/Report';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';

export default function AppRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useApp();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/assessment" element={<RequireAuth><AssessmentPlay /></RequireAuth>} />
        <Route path="/analyzing" element={<RequireAuth><Analyzing /></RequireAuth>} />
        <Route path="/results" element={<RequireAuth><Results /></RequireAuth>} />
        <Route path="/archetype/:id" element={<RequireAuth><ArchetypeDetail /></RequireAuth>} />
        <Route path="/report" element={<RequireAuth><Report /></RequireAuth>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
