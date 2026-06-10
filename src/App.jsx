import { useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import TopBar from './frontend/components/layout/TopBar';
import AppRoutes from './frontend/routes/AppRoutes';

const AUTH_ROUTES = ['/login', '/signup'];
const WIDE_ROUTES = ['/dashboard', '/report'];

function App() {
  const location = useLocation();
  const { isAuthenticated } = useApp();
  const showTopBar = isAuthenticated && !AUTH_ROUTES.includes(location.pathname);

  const contentWidth = WIDE_ROUTES.includes(location.pathname)
    ? 'max-w-full lg:px-8 xl:px-12 lg:py-6'
    : 'max-w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl lg:py-6';

  return (
    <div className="app-shell">
      {showTopBar && <TopBar />}
      <main className="flex-1 flex flex-col min-h-0 min-w-0">
        <div className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${contentWidth}`}>
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;
