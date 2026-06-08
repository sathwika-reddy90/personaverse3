import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import { useApp } from './context/AppContext';

import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import AssessmentIntro from './pages/AssessmentIntro';
import AssessmentPlay from './pages/AssessmentPlay';
import Analyzing from './pages/Analyzing';
import Results from './pages/Results';
import IntelligenceHub from './pages/IntelligenceHub';
import Profile from './pages/Profile';
import ArchetypeDetail from './pages/ArchetypeDetail';

const TAB_ROUTES = ['/home', '/assessment', '/insights', '/profile'];
const RIGHT_PANEL_ROUTES = ['/home', '/insights', '/profile'];

function App() {
  const location = useLocation();
  const { onboarded } = useApp();
  const showNav = TAB_ROUTES.some((p) => location.pathname === p);
  const showRightPanel = RIGHT_PANEL_ROUTES.some((p) => location.pathname === p);

  const contentWidth = showNav
    ? 'max-w-full md:max-w-2xl lg:max-w-none lg:mx-0 lg:px-8 xl:px-12 lg:py-6'
    : 'max-w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl lg:py-6';

  return (
    <div className="app-shell">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {showNav && <Sidebar className="hidden lg:flex" />}

        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${contentWidth}`}>
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
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>

        {showNav && showRightPanel && <RightPanel className="hidden xl:flex" />}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}

export default App;
