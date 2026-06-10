import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Shared full-screen shell for the Login & Signup pages — mirrors the
// PersonaVerse report theme (dark navy header, blue/purple accents) rather
// than the app's everyday PersonaNova palette.
export default function AuthLayout({ eyebrow, title, subtitle, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-[#0D2249] via-[#1A3A6B] to-[#1E293B]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#2563EB]/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-3xl animate-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#0D9488]/20 blur-3xl animate-blob" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-4 py-10 sm:py-14">
        <Link to="/login" className="mb-6 flex items-center gap-3 text-white">
          <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/20 grid place-items-center backdrop-blur">
            <span className="text-xl font-black">P</span>
          </div>
          <div>
            <p className="font-display font-extrabold text-lg leading-tight">PersonaVerse</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">Psychometric Platform</p>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full ${wide ? 'max-w-3xl' : 'max-w-md'} rounded-3xl bg-white shadow-2xl shadow-black/30 p-6 sm:p-9`}
        >
          {(eyebrow || title || subtitle) && (
            <div className="mb-7 text-center">
              {eyebrow && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2">{eyebrow}</p>
              )}
              {title && <h1 className="font-display font-extrabold text-2xl text-[#0F172A]">{title}</h1>}
              {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
            </div>
          )}
          {children}
        </motion.div>

        <p className="mt-6 text-xs text-white/40 text-center">© 2026 PersonaVerse · Confidential Assessment Platform</p>
      </div>
    </div>
  );
}
