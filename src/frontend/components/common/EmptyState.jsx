import { motion } from 'framer-motion';
import Button from './Button';

export default function EmptyState({ emoji = '✨', title, body, ctaLabel, onCta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="h-20 w-20 rounded-[1.75rem] bg-gradient-to-br from-primary/10 to-accent/10 grid place-items-center text-4xl mb-5"
      >
        {emoji}
      </motion.div>
      <h2 className="font-display font-extrabold text-lg text-ink mb-2">{title}</h2>
      <p className="text-sm text-ink/50 leading-relaxed max-w-[260px] mb-7">{body}</p>
      {ctaLabel && (
        <Button variant="primary" onClick={onCta} className="max-w-[240px]">
          {ctaLabel}
        </Button>
      )}
    </motion.div>
  );
}
