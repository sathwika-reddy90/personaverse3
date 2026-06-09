import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', dark = false, plain = false, lift = true, ...props }) {
  const surface = plain ? '' : dark ? 'glass-dark text-white' : 'glass';
  return (
    <motion.div
      whileHover={lift ? { y: -4, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`rounded-3xl ${surface} ${lift ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
