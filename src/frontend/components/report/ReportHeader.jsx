import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBlobs from '../common/FloatingBlobs';
import Button from '../common/Button';

function Stat({ label, value, emoji }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 px-4 py-3 min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/55 mb-1 leading-snug">{label}</p>
      <p className="font-display font-extrabold text-sm sm:text-base truncate flex items-center gap-1.5">
        {emoji && <span>{emoji}</span>}
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
}

export default function ReportHeader({
  studentName,
  assessmentDate,
  archetype,
  personalityMatch,
  overallScore,
  onDownload,
  downloadState = 'idle',
  onOnePageSummary,
  summaryState = 'idle',
}) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const isDownloading = downloadState === 'working';
  const isSummarizing = summaryState === 'working';

  const flash = (message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  };

  const stats = [
    { label: 'Student', value: studentName, emoji: '🎓' },
    { label: 'Assessment Date', value: assessmentDate, emoji: '🗓️' },
    { label: 'Primary Archetype', value: `${archetype.emoji} ${archetype.name}`, emoji: null },
    { label: 'Personality Match', value: `${personalityMatch}%`, emoji: '🎯' },
    { label: 'Intelligence Score', value: `${overallScore}/100`, emoji: '⚡' },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] gradient-hero text-white px-6 py-8 sm:px-10 sm:py-10 shadow-card">
      <FloatingBlobs className="opacity-40" />
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 mb-3">PersonaNova · Confidential Report</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight mb-2 max-w-2xl">
          Student Intelligence Report
        </h1>
        <p className="text-sm text-white/70 max-w-xl mb-8 leading-relaxed">
          A complete, data-backed snapshot of personality, strengths, growth edges, learning style and career fit — generated live from your PersonaNova assessment.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3" data-pdf-hide>
          <Button
            variant="highlight"
            fullWidth={false}
            className="px-7 sm:w-auto"
            icon="✨"
            onClick={() => flash('Report regenerated with your latest assessment results.')}
          >
            Generate Report
          </Button>

          <motion.button
            type="button"
            onClick={onOnePageSummary}
            disabled={isSummarizing}
            whileHover={isSummarizing ? undefined : { scale: 1.03, y: -2 }}
            whileTap={isSummarizing ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 font-display font-semibold text-base bg-white/10 backdrop-blur border border-white/20 text-white sm:w-auto transition-[filter,box-shadow] duration-300 hover:bg-white/15 active:brightness-95 disabled:cursor-wait disabled:hover:bg-white/10"
          >
            {isSummarizing ? (
              <>
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                Generating Summary…
              </>
            ) : (
              <>
                <span className="text-lg">📄</span>
                1-Page Summary
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            whileHover={isDownloading ? undefined : { scale: 1.03, y: -2 }}
            whileTap={isDownloading ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 font-display font-semibold text-base text-white sm:w-auto shadow-[0_14px_34px_-10px_rgba(34,211,197,0.55)] transition-[filter,box-shadow] duration-300 hover:brightness-110 active:brightness-95 disabled:cursor-wait disabled:hover:brightness-100"
            style={{ background: 'linear-gradient(135deg, #3A0CA3, #22D3C5)' }}
          >
            {isDownloading ? (
              <>
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                Generating PDF…
              </>
            ) : (
              <>
                <span className="text-lg">⬇️</span>
                Download Report
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mt-4 inline-flex max-w-full text-xs font-semibold text-white/90 bg-white/12 border border-white/15 px-4 py-2.5 rounded-2xl backdrop-blur"
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
