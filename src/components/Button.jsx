import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const variants = {
  primary:
    'bg-gradient-brand text-white shadow-glow hover:shadow-glow-violet hover:brightness-110',
  secondary:
    'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50 hover:border-navy-300',
  ghost: 'text-navy-700 hover:bg-navy-100/60',
  outline:
    'bg-transparent border border-navy-600 text-navy-700 hover:bg-navy-50',
  danger:
    'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200 shadow-lg',
  success:
    'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200 shadow-lg',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5 rounded-lg',
  md: 'text-sm px-5 py-2.5 rounded-xl',
  lg: 'text-base px-7 py-3.5 rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  type = 'button',
  as: _Comp = 'button',
  full,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{
        y: disabled || loading ? 0 : -1,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-4 focus-visible:ring-navy-400/30
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${variants[variant]} ${sizes[size]}
        ${full ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <FiLoader className="w-4 h-4 animate-spin" />
      ) : (
        iconLeft && <span className="shrink-0">{iconLeft}</span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
