import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { path: '/home', label: 'Feed', icon: '🏠' },
  { path: '/assessment', label: 'Discover', icon: '🧬' },
  { path: '/insights', label: 'Insights', icon: '🔮' },
  { path: '/profile', label: 'You', icon: '✨' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const active = TABS.find((t) => location.pathname.startsWith(t.path))?.path;

  return (
    <nav className="lg:hidden sticky bottom-0 z-30 px-4 pt-2 safe-bottom">
      <div className="glass rounded-3xl shadow-card flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive = active === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-2xl min-w-[64px]"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl gradient-sidebar-active shadow-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative text-lg transition-transform ${isActive ? 'scale-110' : ''}`}>{tab.icon}</span>
              <span className={`relative text-[10px] font-bold ${isActive ? 'text-white' : 'text-ink/50'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
