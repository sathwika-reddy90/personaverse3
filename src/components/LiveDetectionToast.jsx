import { AnimatePresence, motion } from 'framer-motion';

export default function LiveDetectionToast({ items }) {
  return (
    <div className="pointer-events-none absolute top-20 left-0 right-0 z-40 flex flex-col items-center gap-2 px-6">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: -24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="glass shadow-soft rounded-full px-4 py-2 flex items-center gap-2"
          >
            <span className="text-base">{item.emoji}</span>
            <span className="text-sm font-semibold text-primary">{item.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
