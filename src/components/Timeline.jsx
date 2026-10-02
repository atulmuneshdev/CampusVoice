import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiCircle,
  FiClock,
  FiAlertCircle,
  FiUser,
} from 'react-icons/fi';

const statusStyle = {
  done: {
    line: 'bg-emerald-400',
    dotBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
    dotRing: 'ring-emerald-200',
    Icon: FiCheckCircle,
    iconColor: 'text-emerald-600',
  },
  active: {
    line: 'bg-sky-300',
    dotBg: 'bg-gradient-to-br from-sky-400 to-blue-500',
    dotRing: 'ring-sky-200',
    Icon: FiClock,
    iconColor: 'text-sky-600',
  },
  pending: {
    line: 'bg-navy-100',
    dotBg: 'bg-white border-2 border-navy-200',
    dotRing: 'ring-navy-100',
    Icon: FiCircle,
    iconColor: 'text-navy-300',
  },
};

function formatDate(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('en-GB', { month: 'short' });
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
  return `${day} ${month} • ${hh}:${mm} ${ampm}`;
}

export default function Timeline({ items }) {
  if (!items?.length) return null;
  return (
    <ol className="relative">
      {items.map((item, idx) => {
        const cfg = statusStyle[item.status] ?? statusStyle.pending;
    const _Icon = cfg.Icon;
        const isLast = idx === items.length - 1;
        return (
          <li key={idx} className="relative pl-14 pb-10 last:pb-0">
            {!isLast && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'calc(100% + 0px)', opacity: 1 }}
                transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                className={`absolute left-[17px] top-9 w-0.5 ${cfg.line}`}
              />
            )}
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 260, damping: 24 }}
              className={`absolute left-0 top-0 w-9 h-9 rounded-2xl ${cfg.dotBg} ring-8 ${cfg.dotRing} flex items-center justify-center shadow-lg`}
            >
              {item.status === 'done' ? (
                <FiCheckCircle className="w-4 h-4 text-white" />
              ) : item.status === 'active' ? (
                <FiClock className="w-4 h-4 text-white animate-pulse-soft" />
              ) : (
                <FiCircle className="w-3 h-3 text-navy-300" />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 + 0.08, type: 'spring', stiffness: 220, damping: 22 }}
              className="rounded-2xl bg-white/60 backdrop-blur border border-navy-100 p-4 sm:p-5 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <h4 className={`font-bold ${item.status === 'pending' ? 'text-navy-400' : 'text-navy-900'}`}>
                  {item.title}
                </h4>
                {item.date && (
                  <span className="text-xs font-semibold text-navy-500">
                    {formatDate(item.date)}
                  </span>
                )}
              </div>
              {item.by && (
                <p className="text-sm text-navy-600 inline-flex items-center gap-1.5">
                  <FiUser className="w-3.5 h-3.5" /> {item.by}
                </p>
              )}
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProgressTracker({ steps, currentIndex = 0 }) {
  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        {steps.map((step, idx) => {
          const done = idx < currentIndex;
          const active = idx === currentIndex;
          const state = done ? 'done' : active ? 'active' : 'pending';
          const cfg = statusStyle[state];
          return (
            <div key={idx} className="relative flex flex-col items-center flex-1">
              {idx < steps.length - 1 && (
                <div className="absolute top-5 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-1 rounded-full overflow-hidden bg-navy-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: done ? '100%' : active ? '50%' : '0%' }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                    className={`h-full ${cfg.line} bg-gradient-to-r from-sky-400 to-emerald-400`}
                  />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.08, type: 'spring', stiffness: 260 }}
                className={`relative z-10 w-11 h-11 rounded-2xl ${cfg.dotBg} ring-8 ${cfg.dotRing} flex items-center justify-center shadow-lg text-white`}
              >
                {done ? (
                  <FiCheckCircle className="w-5 h-5" />
                ) : active ? (
                  <FiAlertCircle className="w-5 h-5 animate-pulse-soft" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-navy-300" />
                )}
              </motion.div>
              <p className={`mt-3 text-center text-sm font-semibold ${state === 'pending' ? 'text-navy-400' : 'text-navy-800'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
