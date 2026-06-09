import { motion } from 'framer-motion';

const palettes = {
  default: ['bg-primary/30', 'bg-accent/25', 'bg-support/25'],
  warm: ['bg-accent/30', 'bg-highlight/30', 'bg-primary/20'],
  cool: ['bg-support/30', 'bg-primary/25', 'bg-highlight/20'],
};

export default function FloatingBlobs({ variant = 'default', className = '' }) {
  const colors = palettes[variant] || palettes.default;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className={`absolute -top-20 -left-16 h-64 w-64 rounded-full ${colors[0]} blur-3xl animate-blob`}
      />
      <motion.div
        className={`absolute top-1/3 -right-20 h-72 w-72 rounded-full ${colors[1]} blur-3xl animate-blob`}
        style={{ animationDelay: '-5s' }}
      />
      <motion.div
        className={`absolute bottom-0 left-1/4 h-56 w-56 rounded-full ${colors[2]} blur-3xl animate-blob`}
        style={{ animationDelay: '-10s' }}
      />
    </div>
  );
}
