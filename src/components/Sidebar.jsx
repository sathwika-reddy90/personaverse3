import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getArchetype } from '../data/archetypes';

const TABS = [
  { path: '/home', label: 'Feed', icon: '🏠' },
  { path: '/assessment', label: 'Discover', icon: '🧬' },
  { path: '/insights', label: 'Insights', icon: '🔮' },
  { path: '/profile', label: 'You', icon: '✨' },
];

export default function Sidebar({ className = '' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = useApp();
  const archetype = results ? getArchetype(results.archetype) : null;
  const active = TABS.find((t) => location.pathname.startsWith(t.path))?.path;

  return (
    <aside className={`w-64 shrink-0 flex-col border-r border-ink/[0.06] bg-white/60 backdrop-blur-xl px-4 py-6 ${className}`}>
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <span className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-base shadow-soft">
          🔮
        </span>
        <div className="min-w-0">
          <p className="font-display font-extrabold text-[15px] text-ink leading-none">PersonaNova</p>
          <p className="text-[10px] font-semibold text-ink/40 mt-1 truncate">Know Yourself. Grow Yourself.</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {TABS.map((tab) => {
          const isActive = active === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left group"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-[#6A2FE0] shadow-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative text-lg transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {tab.icon}
              </span>
              <span className={`relative font-display font-bold text-sm ${isActive ? 'text-white' : 'text-ink/55 group-hover:text-ink/80'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => navigate('/profile')}
        className="mt-4 flex items-center gap-3 px-3 py-3 rounded-2xl bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors text-left"
      >
        <span className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-lg shadow-soft border-2 border-white/70">
          {archetype ? archetype.emoji : '🙂'}
        </span>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-ink truncate">{archetype ? archetype.name : 'Explorer'}</p>
          <p className="text-[11px] text-ink/40 font-semibold">View profile</p>
        </div>
      </button>
    </aside>
  );
}
