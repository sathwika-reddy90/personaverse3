import { AnimatePresence, motion } from 'framer-motion';

export default function NovaCompanion({ message }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-40 flex justify-start">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message.key}
            initial={{ opacity: 0, scale: 0.6, y: 26, x: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 14, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="flex items-end gap-2 max-w-[250px]"
          >
            <motion.span
              animate={{ y: [0, -7, 0], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl shrink-0 drop-shadow-lg"
            >
              🦋
            </motion.span>
            <div className="glass rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-card">
              <p className="text-[9px] font-extrabold text-primary/60 uppercase tracking-[0.16em] mb-0.5">Nova</p>
              <p className="text-xs font-semibold text-ink/75 leading-snug">{message.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const NOVA_LINES = [
  'Interesting choice...',
  "You're more social than expected.",
  'Creative energy detected.',
  "That's a bold answer.",
  'Future Founder vibes 🚀',
  'I see a pattern forming...',
  "Didn't expect that one 👀",
  'Your instincts are showing.',
  'Ooh, noted that one.',
  'You really thought about that, huh?',
];
