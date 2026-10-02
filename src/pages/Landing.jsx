import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiArrowRight,
    FiShield,
    FiClock,
    FiCheckCircle,
    FiMessageCircle,
    FiLayout,
    FiFileText,
    FiBookOpen,
    FiUsers,
    FiMenu,
    FiX,
    FiLogIn,
    FiChevronDown,
    FiBell,
    FiAward,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Button from '../components/Button';

const features = [
    {
        Icon: FiFileText,
        title: 'File Complaints Easily',
        desc: 'Submit detailed complaints with categories, locations, priorities, and evidence attachments in a few clicks.',
        color: 'from-navy-500 to-indigo-500',
    },
    {
        Icon: FiClock,
        title: 'Track Status in Real-time',
        desc: 'Know exactly where your complaint stands — from submission through action to resolution with live timelines.',
        color: 'from-sky-500 to-blue-500',
    },
    {
        Icon: FiMessageCircle,
        title: 'Instant Notifications',
        desc: 'Get notified the moment a complaint is assigned, reviewed, escalated, or resolved on any device.',
        color: 'from-violet-500 to-purple-500',
    },
    {
        Icon: FiBookOpen,
        title: 'Digital Notice Board',
        desc: 'Stay up to date with all college, hostel, mess, and exam announcements in a single organized feed.',
        color: 'from-amber-500 to-orange-500',
    },
    {
        Icon: FiShield,
        title: '100% Secure & Verified',
        desc: 'College-verified accounts with secure access so sensitive concerns stay confidential and protected.',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        Icon: FiAward,
        title: 'Fair, Transparent Process',
        desc: 'Every complaint follows a documented workflow — no more unanswered concerns or dropped tickets.',
        color: 'from-rose-500 to-pink-500',
    },
];

const categories = [
    { Icon: FiLayout, name: 'Hostel', count: 6 },
    { Icon: FiUsers, name: 'Mess', count: 5 },
    { Icon: FiBookOpen, name: 'Academic', count: 4 },
    { Icon: FiBell, name: 'College', count: 7 },
    { Icon: FiAward, name: 'Sports', count: 3 },
];

const steps = [
    { num: '01', title: 'Login with College ID', desc: 'Authenticate securely using your verified college credentials.' },
    { num: '02', title: 'File a Complaint', desc: 'Select a category, add details, and submit in under a minute.' },
    { num: '03', title: 'Track Live Updates', desc: 'Receive real-time status notifications and timeline events.' },
    { num: '04', title: 'Review & Resolve', desc: 'Get transparent resolutions and provide feedback if needed.' },
];

const stats = [
    { value: '12,480+', label: 'Complaints Filed' },
    { value: '96%', label: 'Resolution Rate' },
    { value: '3,200+', label: 'Active Students' },
    { value: '4.8/5', label: 'Student Rating' },
];

export default function Landing() {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => scrollY.on('change', (v) => setScrolled(v > 12)), [scrollY]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-indigo-400/20 blur-3xl animate-float-slow" />
                <div className="absolute top-40 -right-24 w-[520px] h-[520px] rounded-full bg-violet-400/20 blur-3xl animate-float" />
                <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-sky-400/20 blur-3xl animate-float-slow" />
            </div>

            <header
                className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass border-b border-navy-100 shadow-[0_8px_30px_rgba(15,23,42,0.04)]' : ''
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-violet transition-shadow">
                                <span className="text-white font-black">CV</span>
                            </div>
                            <div className="leading-tight">
                                <p className="font-black text-navy-900 tracking-tight">CampusVoice</p>
                                <p className="text-[10px] text-navy-500 font-semibold tracking-wider uppercase">
                                    Grievance Portal
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1">
                            {[
                                ['Features', '#features'],
                                ['How it Works', '#how'],
                                ['Categories', '#categories'],
                            ].map(([l, h]) => (
                                <a
                                    key={h}
                                    href={h}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-navy-700 hover:bg-white hover:shadow-card transition-all"
                                >
                                    {l}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => navigate('/login')}
                                iconLeft={<FiLogIn className="w-4 h-4" />}
                                className="hidden sm:inline-flex"
                            >
                                Login
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate('/login')}
                                iconRight={<FiArrowRight className="w-4 h-4" />}
                            >
                                Get Started
                            </Button>
                            <button
                                type="button"
                                aria-label="Menu"
                                onClick={() => setMenuOpen(true)}
                                className="lg:hidden w-10 h-10 rounded-2xl bg-white/80 border border-navy-100 shadow-card flex items-center justify-center text-navy-700"
                            >
                                <FiMenu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden border-t border-navy-100 glass"
                    >
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                            <nav className="flex flex-col gap-1 w-full">
                                {[
                                    ['Features', '#features'],
                                    ['How it Works', '#how'],
                                    ['Categories', '#categories'],
                                ].map(([l, h]) => (
                                    <a
                                        key={h}
                                        href={h}
                                        onClick={() => setMenuOpen(false)}
                                        className="px-3 py-3 rounded-xl text-sm font-semibold text-navy-700 hover:bg-white"
                                    >
                                        {l}
                                    </a>
                                ))}
                            </nav>
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() => setMenuOpen(false)}
                                className="w-10 h-10 rounded-2xl hover:bg-navy-100 flex items-center justify-center text-navy-600"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </header>

            <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-navy-100 shadow-card mb-6"
                        >
                            <span className="relative inline-flex w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
                                <span className="relative rounded-full w-2 h-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-bold text-navy-700 tracking-wide">
                                NEW • 2026 Portal Release
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 leading-[1.05] mb-6"
                        >
                            Your Voice.
                            <br />
                            <span className="text-gradient animate-gradient bg-gradient-brand">
                                Our Responsibility.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.22 }}
                            className="text-lg text-navy-600 leading-relaxed mb-8 max-w-xl"
                        >
                            Report problems, track complaints, receive updates, and stay connected
                            with your college administration through one simple, beautifully
                            designed platform.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28 }}
                            className="flex flex-wrap gap-3 sm:gap-4 mb-10"
                        >
                            <Button
                                size="lg"
                                variant="primary"
                                onClick={() => navigate('/login')}
                                iconRight={<FiArrowRight className="w-5 h-5" />}
                            >
                                Login with College ID
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                iconLeft={<FiChevronDown className="w-5 h-5" />}
                            >
                                Explore Portal
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.36 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
                        >
                            {stats.map((s, _i) => (
                                <div key={s.label} className="glass rounded-2xl p-4 shadow-card border border-navy-100">
                                    <p className="text-2xl font-black text-gradient mb-1">{s.value}</p>
                                    <p className="text-xs font-semibold text-navy-500">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.22, duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -inset-8 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
                            <div className="relative grid gap-4">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                                    className="glass rounded-3xl p-5 shadow-2xl shadow-navy-900/10 border border-white/60"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                                                <FiFileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-navy-900 leading-tight">Water Supply</p>
                                                <p className="text-xs text-navy-500 font-semibold">CMP-2026-00452</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                                            Under Review
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 rounded-full bg-navy-100 overflow-hidden">
                                            <div className="h-full w-3/4 rounded-full bg-gradient-brand animate-gradient" />
                                        </div>
                                        <p className="text-xs text-navy-500 font-semibold flex items-center justify-between">
                                            <span>Progress</span>
                                            <span className="text-navy-800">75%</span>
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        animate={{ y: [0, -14, 0] }}
                                        transition={{ repeat: Infinity, duration: 6, delay: 0.5, ease: 'easeInOut' }}
                                        className="glass rounded-3xl p-5 shadow-xl shadow-navy-900/10 border border-white/60"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-3 shadow-lg">
                                            <FiCheckCircle className="w-5 h-5" />
                                        </div>
                                        <p className="text-3xl font-black text-navy-900 leading-none mb-1">05</p>
                                        <p className="text-xs font-semibold text-navy-500">Resolved</p>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ repeat: Infinity, duration: 5.5, delay: 1, ease: 'easeInOut' }}
                                        className="glass rounded-3xl p-5 shadow-xl shadow-navy-900/10 border border-white/60"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-3 shadow-lg">
                                            <FiClock className="w-5 h-5" />
                                        </div>
                                        <p className="text-3xl font-black text-navy-900 leading-none mb-1">04</p>
                                        <p className="text-xs font-semibold text-navy-500">Pending</p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ repeat: Infinity, duration: 6.5, delay: 1.2, ease: 'easeInOut' }}
                                    className="glass rounded-3xl p-5 shadow-xl shadow-navy-900/10 border border-white/60 relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                                                <FiBell className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-navy-900 text-sm">Complaint Updated</p>
                                                <p className="text-[11px] text-navy-500 font-semibold">2 minutes ago</p>
                                            </div>
                                        </div>
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse-soft" />
                                    </div>
                                    <p className="text-xs text-navy-600 leading-relaxed">
                                        Your Hostel complaint has moved to <b>"Under Review"</b> and maintenance team has been assigned.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="features" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-black tracking-widest uppercase text-gradient mb-3"
                    >
                        Everything you need
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-navy-950 mb-4"
                    >
                        A Modern Portal for Student Voices
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-navy-600 leading-relaxed"
                    >
                        Built for the way colleges actually work. Fair, transparent, and
                        beautifully designed for students and administrations alike.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="group relative p-6 sm:p-7 rounded-3xl glass border border-navy-100 shadow-card overflow-hidden"
                        >
                            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${f.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                            <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                <f.Icon className="w-6 h-6" />
                            </div>
                            <h3 className="relative text-lg font-bold text-navy-900 mb-2">{f.title}</h3>
                            <p className="relative text-sm text-navy-600 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section id="how" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-black tracking-widest uppercase text-gradient mb-3"
                    >
                        How it works
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-navy-950 mb-4"
                    >
                        Simple, 4-step Grievance Process
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-navy-600"
                    >
                        From the moment you submit a complaint, you know exactly what's happening — no more guesswork.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
                    <div className="hidden lg:block absolute left-8 right-8 top-12 h-1 bg-gradient-brand opacity-20 rounded-full" />
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="relative text-center p-6 rounded-3xl glass border border-navy-100 shadow-card"
                        >
                            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-5">
                                <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-10 animate-pulse-soft" />
                                <span className="relative w-20 h-20 rounded-full bg-gradient-brand text-white font-black text-2xl flex items-center justify-center shadow-glow">
                                    {s.num}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                            <p className="text-sm text-navy-600 leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section id="categories" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-black tracking-widest uppercase text-gradient mb-3"
                        >
                            Complaint Categories
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-navy-950 mb-4"
                        >
                            Categories for Every Concern
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-navy-600 mb-8 leading-relaxed"
                        >
                            From hostel maintenance to academics, sports facilities to student
                            conduct — file every concern under the right category for faster,
                            more accurate resolutions.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                        >
                            <Button
                                size="lg"
                                variant="primary"
                                onClick={() => navigate('/login')}
                                iconRight={<FiArrowRight className="w-5 h-5" />}
                            >
                                Start a Complaint
                            </Button>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((c, i) => (
                            <motion.div
                                key={c.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, type: 'spring', stiffness: 240 }}
                                whileHover={{ y: -4 }}
                                className="relative p-5 rounded-3xl glass border border-navy-100 shadow-card text-center overflow-hidden"
                            >
                                <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-navy-500 to-violet-500 text-white flex items-center justify-center mb-3 shadow-lg`}>
                                    <c.Icon className="w-6 h-6" />
                                </div>
                                <p className="font-bold text-navy-900 text-sm mb-1">{c.name}</p>
                                <p className="text-[11px] font-semibold text-navy-500">{c.count} types</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] overflow-hidden bg-gradient-brand p-8 sm:p-12 lg:p-16 text-center text-white shadow-glow"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_50%)]" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                            Ready to make your campus better?
                        </h2>
                        <p className="text-lg text-white/85 mb-8 leading-relaxed">
                            Join thousands of students already using CampusVoice to resolve
                            complaints faster and keep their college accountable.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => navigate('/login')}
                                className="!bg-white !text-navy-800 !border-white hover:!bg-white/90"
                                iconRight={<FiArrowRight className="w-5 h-5" />}
                            >
                                Login with College ID
                            </Button>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-2xl border border-white/40 hover:bg-white/10 transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-navy-100">
                <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
                            <span className="text-white font-black">CV</span>
                        </div>
                        <div>
                            <p className="font-black text-navy-900 tracking-tight">CampusVoice</p>
                            <p className="text-[11px] text-navy-500 font-semibold tracking-wider uppercase">
                                Student Grievance & Complaint Portal
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-navy-500 text-center sm:text-right">
                        © 2026 CampusVoice. Report. Track. Resolve.
                    </p>
                </div>
            </footer>
        </div>
    );
}
