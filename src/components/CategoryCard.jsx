import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiHome,
    FiCoffee,
    FiBriefcase,
    FiUsers,
    FiAward,
    FiTruck,
    FiBookOpen,
    FiMoreHorizontal,
    FiArrowRight,
    FiPlus,
} from 'react-icons/fi';

const iconMap = {
    bed: FiHome,
    utensils: FiCoffee,
    building: FiBriefcase,
    users: FiUsers,
    trophy: FiAward,
    bus: FiTruck,
    book: FiBookOpen,
    more: FiMoreHorizontal,
};

export default function CategoryCard({ category, index = 0 }) {
    const Icon = iconMap[category.icon] ?? FiMoreHorizontal;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22,
                delay: Math.min(index * 0.06, 0.5),
            }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl glass shadow-card overflow-hidden"
        >
            <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${category.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className="relative p-6">
                <div className="flex items-start justify-between mb-5">
                    <motion.div
                        whileHover={{ rotate: -8, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg shadow-navy-900/10`}
                    >
                        <Icon className="w-7 h-7" />
                    </motion.div>
                    {category.count > 0 && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-xl ring-1 ${category.ringColor} ${category.bgColor} ${category.textColor}`}>
                            {category.count} active
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-2">{category.name}</h3>
                <p className="text-sm text-navy-600 leading-relaxed mb-4 line-clamp-2">
                    {category.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {category.examples.slice(0, 3).map((ex) => (
                        <span
                            key={ex}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-navy-100 text-navy-600"
                        >
                            {ex}
                        </span>
                    ))}
                    {category.examples.length > 3 && (
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-navy-100 text-navy-500">
                            +{category.examples.length - 3} more
                        </span>
                    )}
                </div>

                <Link
                    to={`/complaints/new?category=${category.id}`}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all group/btn
            bg-gradient-to-r ${category.color} text-white shadow-lg shadow-navy-900/10 hover:shadow-xl hover:brightness-110`}
                >
                    <FiPlus className="w-4 h-4" />
                    File Complaint
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </motion.div>
    );
}
