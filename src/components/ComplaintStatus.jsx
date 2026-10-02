import { motion } from 'framer-motion';
import {
    FiClock,
    FiSearch,
    FiCheckCircle,
    FiXCircle,
    FiAlertTriangle,
    FiArrowUp,
} from 'react-icons/fi';

export const statusConfig = {
    Pending: {
        label: 'Pending',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        icon: FiClock,
        progress: 1,
    },
    'Under Review': {
        label: 'Under Review',
        color: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-500',
        icon: FiSearch,
        progress: 2,
    },
    Escalated: {
        label: 'Escalated',
        color: 'bg-violet-50 text-violet-700 border-violet-200',
        dot: 'bg-violet-500',
        icon: FiArrowUp,
        progress: 3,
    },
    Resolved: {
        label: 'Resolved',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: FiCheckCircle,
        progress: 5,
    },
    Rejected: {
        label: 'Rejected',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        icon: FiXCircle,
        progress: 5,
    },
};

export const priorityConfig = {
    Normal: {
        label: 'Normal',
        color: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
    },
    Important: {
        label: 'Important',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
    },
    Urgent: {
        label: 'Urgent',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
    },
};

export default function ComplaintStatus({ status, size = 'md', showIcon = true }) {
    const cfg = statusConfig[status] ?? statusConfig.Pending;
    const Icon = cfg.icon;
    const sz =
        size === 'sm'
            ? 'text-[11px] px-2.5 py-1 rounded-lg gap-1'
            : 'text-xs px-3 py-1.5 rounded-xl gap-1.5';

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center font-semibold border backdrop-blur ${sz} ${cfg.color}`}
        >
            <span
                className={`relative inline-flex items-center justify-center ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'
                    }`}
            >
                <span className={`absolute w-full h-full rounded-full ${cfg.dot} opacity-30 animate-ping`} />
                <span className={`relative rounded-full ${cfg.dot} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
            </span>
            {showIcon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />}
            {cfg.label}
        </motion.span>
    );
}

export function ComplaintPriority({ priority, size = 'md' }) {
    const cfg = priorityConfig[priority] ?? priorityConfig.Normal;
    const sz =
        size === 'sm' ? 'text-[11px] px-2 py-0.5 rounded-md' : 'text-xs px-2.5 py-1 rounded-lg';
    return (
        <span className={`inline-flex items-center gap-1 font-semibold border ${sz} ${cfg.color}`}>
            {priority === 'Urgent' && <FiAlertTriangle className="w-3 h-3" />}
            {cfg.label}
        </span>
    );
}
