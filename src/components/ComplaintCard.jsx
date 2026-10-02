import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiRefreshCw } from 'react-icons/fi';
import { categories } from '../data/categories';
import ComplaintStatus, { ComplaintPriority } from './ComplaintStatus';

export default function ComplaintCard({ complaint, index = 0, compact = false }) {
  const category = categories.find((c) => c.id === complaint.categoryId);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 22,
        delay: Math.min(index * 0.04, 0.35),
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-3xl glass shadow-card overflow-hidden"
    >
      <Link to={`/complaints/${complaint.id}`} className="block p-5 sm:p-6 h-full">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category?.color ?? 'from-navy-500 to-violet-500'}`} />
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-navy-500 mb-1">
              {complaint.id}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-navy-900 leading-snug group-hover:text-navy-700 transition-colors line-clamp-2">
              {complaint.title}
            </h3>
          </div>
          <ComplaintStatus status={complaint.status} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl ring-1 ${category?.ringColor ?? 'ring-navy-200'} ${category?.bgColor ?? 'bg-navy-50'} ${category?.textColor ?? 'text-navy-700'}`}
          >
            {complaint.category}
          </span>
          <ComplaintPriority priority={complaint.priority} />
        </div>

        {!compact && (
          <p className="text-sm text-navy-600 line-clamp-2 mb-4">
            {complaint.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-navy-100">
          <div className="flex flex-wrap items-center gap-4 text-xs text-navy-500">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5" />
              Submitted: {complaint.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiRefreshCw className="w-3.5 h-3.5" />
              Updated: {complaint.updatedAt}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:text-navy-700 transition-colors">
            Details
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
