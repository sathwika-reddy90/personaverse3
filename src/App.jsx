import { useLocation } from 'react-router-dom';
import BottomNav from './frontend/components/layout/BottomNav';
import Sidebar from './frontend/components/layout/Sidebar';
import RightPanel from './frontend/components/layout/RightPanel';
import AppRoutes from './frontend/routes/AppRoutes';

const TAB_ROUTES = ['/home', '/assessment', '/insights', '/profile'];
const RIGHT_PANEL_ROUTES = ['/home', '/insights', '/profile'];
const WIDE_ROUTES = ['/report'];

function App() {
  const location = useLocation();
  const showNav = TAB_ROUTES.some((p) => location.pathname === p);
  const showRightPanel = RIGHT_PANEL_ROUTES.some((p) => location.pathname === p);
  const wideContent = showNav || WIDE_ROUTES.some((p) => location.pathname === p);

  const contentWidth = wideContent
    ? 'max-w-full md:max-w-2xl lg:max-w-none lg:mx-0 lg:px-8 xl:px-12 lg:py-6'
    : 'max-w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl lg:py-6';

  return (
    <div className="app-shell">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {showNav && <Sidebar className="hidden lg:flex" />}

        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${contentWidth}`}>
            <AppRoutes />
          </div>
        </main>

        {showNav && showRightPanel && <RightPanel className="hidden xl:flex" />}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}

export default App;
