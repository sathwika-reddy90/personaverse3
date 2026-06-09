import { motion } from 'framer-motion';

export default function RevealLines({ lines, className = '', lineClassName = '', stagger = 0.22, startDelay = 0 }) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: startDelay + i * stagger, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={lineClassName}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
