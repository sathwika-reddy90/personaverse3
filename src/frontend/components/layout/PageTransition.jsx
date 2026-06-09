import { motion } from 'framer-motion';

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
