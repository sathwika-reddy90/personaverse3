import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary to-[#6A2FE0] text-white shadow-soft',
  accent: 'bg-gradient-to-r from-accent to-[#FF7B95] text-white shadow-[0_12px_30px_-8px_rgba(255,77,109,0.6)]',
  highlight: 'bg-gradient-to-r from-highlight/80 to-highlight text-ink shadow-[0_12px_30px_-8px_rgba(255,200,104,0.45)]',
  ghost: 'bg-surface/80 text-primary border border-primary/15',
  dark: 'bg-ink text-white',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  icon,
  fullWidth = true,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display font-semibold text-base ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${className} active:brightness-95 transition-[filter,box-shadow] duration-300`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}
