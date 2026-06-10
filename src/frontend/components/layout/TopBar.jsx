import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const LINKS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/report', label: 'Report' },
];

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="shrink-0 bg-gradient-to-r from-[#0D2249] to-[#1A3A6B] px-4 sm:px-6 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2.5 text-white">
          <span className="h-9 w-9 rounded-xl bg-white/10 border border-white/20 grid place-items-center font-black text-base">P</span>
          <span className="font-display font-extrabold text-base hidden sm:inline">PersonaVerse</span>
        </button>

        <nav className="flex items-center gap-1.5">
          {LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === link.path
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="text-sm font-bold text-white/55 hover:text-white transition-colors px-3 py-2">
          Log out
        </button>
      </div>
    </header>
  );
}
