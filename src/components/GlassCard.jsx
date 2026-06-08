import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', dark = false, plain = false, ...props }) {
  const surface = plain ? '' : dark ? 'glass-dark text-white' : 'glass';
  return (
    <motion.div
      className={`rounded-3xl ${surface} shadow-soft ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
