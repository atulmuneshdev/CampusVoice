import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiFilePlus,
    FiArrowRight,
    FiBookOpen,
    FiFileText,
    FiMessageCircle,
    FiBell,
    FiTrendingUp,
    FiClock,
    FiSearch,
    FiAlertCircle,
} from 'react-icons/fi';
import StatCard from '../components/StatCard';
import ComplaintCard from '../components/ComplaintCard';
import Button from '../components/Button';
import { complaints as defaultComplaints } from '../data/complaints';
import { notices } from '../data/notices';
import { useAuth, filterComplaintsByUser } from '../context/AuthContext';

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return ['Good Morning', '☀️'];
    if (h < 17) return ['Good Afternoon', '🌤️'];
    if (h < 20) return ['Good Evening', '🌆'];
    return ['Good Night', '🌙'];
}

export default function Dashboard() {
    const [greeting, emoji] = getGreeting();
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const user = auth.user;
    const firstName = (user?.name || '').split(' ')[0] || 'Student';

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, []);

    const mine = useMemo(() => {
        let merged = [];
        try {
            const userCreated = JSON.parse(localStorage.getItem('cv_complaints') || '[]');
            const globals = (window.__CV_COMPLAINTS__ || defaultComplaints).filter(
                (c) => !userCreated.some((u) => u.id === c.id),
            );
            merged = [...userCreated, ...globals];
        } catch {
            merged = (window.__CV_COMPLAINTS__ || defaultComplaints).slice();
        }
        return filterComplaintsByUser(merged, user);
    }, [user]);

    const total = mine.length;
    const pending = mine.filter((c) => c.status === 'Pending').length;
    const review = mine.filter((c) => c.status === 'Under Review' || c.status === 'Escalated').length;
    const resolved = mine.filter((c) => c.status === 'Resolved').length;

    const recent = mine.slice(0, 4);
    const latestUpdates = [
        {
            Icon: FiFileText,
            color: 'bg-sky-100 text-sky-700',
            dot: 'bg-sky-500',
            title: 'Complaint CMP-2026-00452 updated',
            subtitle: 'Status moved to Under Review',
            time: '2 min ago',
        },
        {
            Icon: FiBookOpen,
            color: 'bg-blue-100 text-blue-700',
            dot: 'bg-blue-500',
            title: 'New Hostel Notice',
            subtitle: 'Water maintenance completed in Block B',
            time: '5 hours ago',
        },
        {
            Icon: FiMessageCircle,
            color: 'bg-emerald-100 text-emerald-700',
            dot: 'bg-emerald-500',
            title: 'Complaint CMP-2026-00410 resolved',
            subtitle: 'Wi-Fi connectivity fully restored',
            time: 'Yesterday',
        },
        {
            Icon: FiBell,
            color: 'bg-violet-100 text-violet-700',
            dot: 'bg-violet-500',
            title: 'Sports Department Notice',
            subtitle: 'Inter-college tournament registration open',
            time: '3 days ago',
        },
        {
            Icon: FiAlertCircle,
            color: 'bg-amber-100 text-amber-700',
            dot: 'bg-amber-500',
            title: 'Exam Time Table Released',
            subtitle: 'Odd Semester exams begin 15th November',
            time: '1 day ago',
        },
    ];

    const rate = total === 0 ? 0 : Math.round((resolved / Math.max(total, 1)) * 100);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-28 rounded-3xl bg-white/70 animate-pulse shadow-card" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-36 rounded-3xl bg-white/70 animate-pulse shadow-card" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="h-96 lg:col-span-2 rounded-3xl bg-white/70 animate-pulse shadow-card" />
                    <div className="h-96 rounded-3xl bg-white/70 animate-pulse shadow-card" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
                <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <p className="text-white/80 font-semibold mb-1 flex items-center gap-2">
                            <FiClock className="w-4 h-4" />
                            {new Date().toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
                            {greeting}, {firstName} {emoji}
                        </h1>
                        <p className="text-white/85 max-w-xl">
                            Here's what's happening with your complaints today. You have{' '}
                            <span className="font-bold text-white">{pending + review}</span> active complaints to follow up on.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Button
                            variant="secondary"
                            size="md"
                            as={Link}
                            to="/complaints/new"
                            iconLeft={<FiFilePlus className="w-4 h-4" />}
                            className="!bg-white/95 !text-navy-800 !border-white hover:!bg-white"
                        >
                            New Complaint
                        </Button>
                    </div>
                </div>
            </motion.section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                <StatCard
                    label="Total Complaints"
                    value={total}
                    type="total"
                    trend="2 this week"
                    trendUp
                    delay={0.02}
                />
                <StatCard
                    label="Pending"
                    value={pending}
                    type="pending"
                    trend={`${pending} need action`}
                    delay={0.08}
                />
                <StatCard
                    label="Under Review"
                    value={review}
                    type="review"
                    trend="In progress"
                    delay={0.14}
                />
                <StatCard
                    label="Resolved"
                    value={resolved}
                    type="resolved"
                    trend={`${rate}% rate`}
                    trendUp
                    delay={0.2}
                />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-black text-navy-900 tracking-tight">
                                Recent Complaints
                            </h2>
                            <p className="text-sm text-navy-500 mt-0.5">
                                Latest updates from your submitted complaints
                            </p>
                        </div>
                        <Link
                            to="/complaints"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 px-3 py-2 rounded-xl hover:bg-white hover:shadow-card transition-all border border-transparent hover:border-navy-100"
                        >
                            View all <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {recent.map((c, i) => (
                            <ComplaintCard key={c.id} complaint={c} index={i} />
                        ))}
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-black text-navy-900 tracking-tight">
                                Latest Updates
                            </h2>
                            <p className="text-sm text-navy-500 mt-0.5">Campus activity feed</p>
                        </div>
                    </div>

                    <div className="relative rounded-3xl glass shadow-card overflow-hidden border border-navy-100">
                        <ul className="divide-y divide-navy-100 max-h-[560px] overflow-y-auto">
                            {latestUpdates.map((u, i) => (
                                <motion.li
                                    key={u.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <Link
                                        to={i === 0 || i === 2 ? '/complaints' : i === 3 ? '/notices' : '/notices'}
                                        className="flex items-start gap-3 p-4 sm:p-5 hover:bg-white/70 transition-colors"
                                    >
                                        <div className="relative shrink-0 mt-0.5">
                                            <div className={`w-10 h-10 rounded-2xl ${u.color} flex items-center justify-center shadow-card`}>
                                                <u.Icon className="w-4.5 h-4.5" />
                                            </div>
                                            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${u.dot} ring-2 ring-white`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-bold text-navy-900 leading-snug">
                                                    {u.title}
                                                </p>
                                                <span className="text-[11px] font-semibold text-navy-400 shrink-0">
                                                    {u.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
                                                {u.subtitle}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl glass shadow-card border border-navy-100 p-5 sm:p-6 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-gradient-brand opacity-10 blur-2xl" />
                        <div className="relative flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-glow shrink-0">
                                <FiTrendingUp className="w-7 h-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold uppercase tracking-widest text-navy-500 mb-1">
                                    Resolution Score
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-black text-navy-900">{rate}%</p>
                                    <p className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                                        <FiTrendingUp className="w-3 h-3" /> +8%
                                    </p>
                                </div>
                                <div className="mt-2 h-2 rounded-full bg-navy-100 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${rate}%` }}
                                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                                        className="h-full bg-gradient-brand rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-3xl glass shadow-card overflow-hidden p-6 border border-navy-100"
                >
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h3 className="text-lg font-black text-navy-900 tracking-tight mb-1">
                                Quick Actions
                            </h3>
                            <p className="text-sm text-navy-500">Jump to frequently used sections</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { to: '/complaints/new', label: 'File Complaint', Icon: FiFilePlus, color: 'from-navy-500 to-indigo-500' },
                            { to: '/complaints', label: 'My Complaints', Icon: FiFileText, color: 'from-sky-500 to-blue-500' },
                            { to: '/categories', label: 'View Categories', Icon: FiSearch, color: 'from-violet-500 to-purple-500' },
                            { to: '/notices', label: 'View Notices', Icon: FiBookOpen, color: 'from-amber-500 to-orange-500' },
                        ].map((a) => (
                            <Link
                                key={a.to}
                                to={a.to}
                                className="group p-4 rounded-2xl bg-white/60 hover:bg-white border border-navy-100 hover:border-navy-200 hover:shadow-card transition-all"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <a.Icon className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-bold text-navy-900 mb-0.5">{a.label}</p>
                                <p className="text-xs text-navy-500 inline-flex items-center gap-1">
                                    Open <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </p>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="relative rounded-3xl glass shadow-card overflow-hidden p-6 border border-navy-100"
                >
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h3 className="text-lg font-black text-navy-900 tracking-tight mb-1">
                                Pinned Notices
                            </h3>
                            <p className="text-sm text-navy-500">Important announcements for you</p>
                        </div>
                        <Link to="/notices" className="text-xs font-bold text-navy-600 hover:text-navy-900 inline-flex items-center gap-1">
                            All <FiArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <ul className="space-y-3">
                        {notices.filter((n) => n.pinned || n.isNew).slice(0, 3).map((n) => (
                            <li key={n.id}>
                                <Link
                                    to="/notices"
                                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/80 transition-colors"
                                >
                                    <div className="mt-0.5">
                                        {n.priority === 'Important' ? (
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block animate-pulse-soft" />
                                        ) : (
                                            <span className="w-2 h-2 rounded-full bg-sky-500 block mt-1" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                            <p className="text-sm font-bold text-navy-900 truncate">{n.title}</p>
                                            {n.isNew && (
                                                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-navy-500 truncate">{n.category} • {n.date}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </section>
        </div>
    );
}
