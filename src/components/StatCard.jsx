import { motion } from 'framer-motion';
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';

const iconMap = {
  total: FiFileText,
  pending: FiClock,
  review: FiAlertCircle,
  resolved: FiCheckCircle,
  rejected: FiAlertCircle,
};

const styles = {
  total: {
    bg: 'from-navy-500 to-indigo-500',
    text: 'text-navy-600',
    bgLight: 'bg-navy-50',
    ring: 'ring-navy-100',
    trend: 'text-navy-600',
  },
  pending: {
    bg: 'from-amber-400 to-yellow-500',
    text: 'text-amber-700',
    bgLight: 'bg-amber-50',
    ring: 'ring-amber-100',
    trend: 'text-amber-600',
  },
  review: {
    bg: 'from-sky-400 to-blue-500',
    text: 'text-sky-700',
    bgLight: 'bg-sky-50',
    ring: 'ring-sky-100',
    trend: 'text-sky-600',
  },
  resolved: {
    bg: 'from-emerald-400 to-green-500',
    text: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    ring: 'ring-emerald-100',
    trend: 'text-emerald-600',
  },
  rejected: {
    bg: 'from-rose-400 to-red-500',
    text: 'text-rose-700',
    bgLight: 'bg-rose-50',
    ring: 'ring-rose-100',
    trend: 'text-rose-600',
  },
};

export default function StatCard({
  label,
  value,
  type = 'total',
  trend,
  trendUp = true,
  hint,
  delay = 0,
}) {
  const Icon = iconMap[type] ?? FiFileText;
  const s = styles[type] ?? styles.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="relative group p-6 rounded-3xl glass shadow-card overflow-hidden"
    >
      <div
        className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${s.bg} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-navy-500 mb-2">{label}</p>
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.12, duration: 0.3 }}
            className="text-4xl font-bold tracking-tight text-navy-900"
          >
            {String(value).padStart(2, '0')}
          </motion.h3>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.bg} text-white flex items-center justify-center shadow-lg shadow-navy-900/10 group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="relative mt-4 flex items-center gap-3 text-sm">
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bgLight} ${s.trend}`}
          >
            {trendUp ? (
              <FiArrowUp className="w-3 h-3" />
            ) : (
              <FiArrowDown className="w-3 h-3" />
            )}
            {trend}
          </span>
        )}
        {hint && <span className="text-navy-500">{hint}</span>}
      </div>
    </motion.div>
  );
}
