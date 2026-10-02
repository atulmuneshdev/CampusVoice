import { motion } from 'framer-motion';
import {
  FiBookmark,
  FiCalendar,
  FiTag,
  FiAlertCircle,
  FiChevronRight,
} from 'react-icons/fi';

const categoryStyles = {
  College: { bg: 'bg-indigo-50', text: 'text-indigo-700', ring: 'ring-indigo-200' },
  Hostel: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200' },
  Mess: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200' },
  Academic: { bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200' },
  Sports: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
  Transport: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200' },
  Important: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200' },
};

export default function NoticeCard({ notice, index = 0 }) {
  const s = categoryStyles[notice.category] ?? categoryStyles.College;
  const p = notice.priority === 'Important' ? categoryStyles.Important : null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 22,
        delay: Math.min(index * 0.05, 0.35),
      }}
      whileHover={{ y: -3 }}
      className={`relative rounded-3xl glass shadow-card overflow-hidden group ${notice.pinned ? 'ring-2 ring-navy-200' : ''
        }`}
    >
      {notice.pinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 animate-gradient" />
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {notice.isNew && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200 animate-pulse-soft">
                NEW
              </span>
            )}
            {notice.pinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-navy-900 text-amber-300">
                <FiBookmark className="w-3 h-3" /> Pinned
              </span>
            )}
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-xl ring-1 ${s.ring} ${s.bg} ${s.text}`}>
              <FiTag className="w-3 h-3" /> {notice.category}
            </span>
            {p && notice.category !== 'Important' && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-xl ring-1 ${p.ring} ${p.bg} ${p.text}`}>
                <FiAlertCircle className="w-3 h-3" /> {notice.priority}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-navy-500 shrink-0">
            <FiCalendar className="w-3.5 h-3.5" /> {notice.date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
          {notice.title}
        </h3>
        <p className="text-sm text-navy-600 leading-relaxed mb-3 line-clamp-3">
          {notice.description}
        </p>

        <div className="flex items-center justify-end text-sm font-semibold text-navy-600 group-hover:text-navy-700 transition-colors">
          Read more
          <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}
