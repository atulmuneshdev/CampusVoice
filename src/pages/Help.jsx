import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiHelpCircle,
    FiMessageSquare,
    FiSearch,
    FiFileText,
    FiBookOpen,
    FiAlertCircle,
    FiChevronDown,
    FiChevronUp,
    FiMail,
    FiSmartphone,
    FiCalendar,
    FiArrowRight,
} from 'react-icons/fi';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

const faqs = [
    {
        q: 'How do I submit a complaint?',
        a: 'Go to "New Complaint" from the sidebar or top navigation. Select a complaint category, enter a clear title and location, describe the issue in detail, choose a priority level, and attach any relevant evidence. Once submitted, you can track its status under "My Complaints".',
    },
    {
        q: 'How long does it take for a complaint to be resolved?',
        a: 'It depends on the category and priority. Normal priority complaints are typically acknowledged within 48 hours and resolved within 7-10 working days. Important complaints are reviewed within 24 hours, and Urgent complaints receive immediate attention.',
    },
    {
        q: 'Can I edit a complaint after submitting?',
        a: 'While the complaint is in "Pending" status, you can reply to the notification email with additional details or contact student support. Once it is moved to Under Review, any updates are added as timeline events.',
    },
    {
        q: 'Are my complaints anonymous?',
        a: 'No. Each complaint is linked to your verified College ID for accountability and follow-up. However, sensitive categories (e.g. Student Behavior) are handled discreetly by senior officials and are not visible to other students.',
    },
    {
        q: 'What do the complaint statuses mean?',
        a: 'Pending = received, awaiting assignment. Under Review = assigned and being investigated. Escalated = forwarded to a higher authority. Resolved = issue addressed and closed. Rejected = not actionable, with reasons in the timeline.',
    },
    {
        q: 'My complaint was rejected. What can I do?',
        a: 'Rejections include a written reason in the complaint timeline. If you believe it was rejected in error, you can file a follow-up complaint with more evidence, or contact Student Support for a review.',
    },
    {
        q: 'How do I mark a complaint as resolved?',
        a: 'Only the assigned department can mark a complaint as Resolved. If you feel the issue is fixed before then, reply to the latest notification and the department will verify and close it.',
    },
    {
        q: 'Who receives my complaint?',
        a: 'Each category routes to the relevant department: Hostel → Hostel Warden, Mess → Mess Committee, Academic → HOD, College → Facilities, Senior Behavior → Anti-Ragging Cell, Transport → Transport Officer, and so on.',
    },
];

const resources = [
    {
        Icon: FiFileText,
        title: 'Complaint Guide',
        desc: 'Writing a clear, actionable complaint',
        color: 'from-navy-500 to-indigo-500',
    },
    {
        Icon: FiAlertCircle,
        title: 'Report Urgent Issue',
        desc: 'Safety or emergency situations',
        color: 'from-rose-500 to-pink-500',
    },
    {
        Icon: FiBookOpen,
        title: 'Student Policies',
        desc: 'Code of conduct & grievance policy',
        color: 'from-violet-500 to-purple-500',
    },
    {
        Icon: FiCalendar,
        title: 'Working Hours',
        desc: 'Department response windows',
        color: 'from-emerald-500 to-teal-500',
    },
];

export default function Help() {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(0);

    const visible = faqs.filter(
        (f) =>
            f.q.toLowerCase().includes(query.toLowerCase()) ||
            f.a.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="space-y-6 lg:space-y-8">
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-10 lg:p-12 text-white shadow-glow text-center"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                <div className="relative max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center mx-auto mb-5">
                        <FiHelpCircle className="w-9 h-9" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
                        How can we help?
                    </h1>
                    <p className="text-white/85 text-lg mb-8 leading-relaxed">
                        Find answers, get support, and make the most of CampusVoice. Can't
                        find what you need? Our team is just a message away.
                    </p>
                    <div className="max-w-xl mx-auto">
                        <SearchBar
                            placeholder="Search for help articles or FAQs..."
                            value={query}
                            onChange={setQuery}
                            className="!bg-white !text-navy-800"
                        />
                    </div>
                </div>
            </motion.section>

            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {resources.map((r, i) => (
                    <motion.div
                        key={r.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="relative p-6 rounded-3xl glass shadow-card border border-navy-100 cursor-pointer overflow-hidden"
                    >
                        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${r.color} opacity-10 blur-2xl`} />
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center shadow-lg mb-4`}>
                            <r.Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-navy-900 mb-1">{r.title}</h3>
                        <p className="text-sm text-navy-600 leading-relaxed mb-3">{r.desc}</p>
                        <span className="text-xs font-bold text-navy-700 inline-flex items-center gap-1">
                            Open <FiArrowRight className="w-3 h-3" />
                        </span>
                    </motion.div>
                ))}
            </section>

            <div className="grid lg:grid-cols-3 gap-6">
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 rounded-3xl glass shadow-card border border-navy-100 p-6 sm:p-8"
                >
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-black text-navy-900 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-sm text-navy-500 mt-0.5">
                                {visible.length} of {faqs.length} questions
                            </p>
                        </div>
                    </div>

                    {visible.length === 0 ? (
                        <div className="p-10 text-center rounded-2xl bg-navy-50 border border-navy-100">
                            <FiSearch className="w-10 h-10 mx-auto mb-3 text-navy-400" />
                            <h3 className="font-bold text-navy-800 mb-1">No matches</h3>
                            <p className="text-sm text-navy-500 mb-4">
                                Try a different keyword or get in touch with our team.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setQuery('')}
                            >
                                Clear Search
                            </Button>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {visible.map((f, i) => {
                                const o = open === i;
                                return (
                                    <li key={f.q}>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(o ? -1 : i)}
                                            className={`w-full text-left p-5 rounded-2xl border transition-all ${o
                                                    ? 'bg-white border-navy-200 shadow-card'
                                                    : 'bg-white/60 border-navy-100 hover:bg-white hover:border-navy-200'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <p className="font-bold text-navy-900 leading-snug pr-3">{f.q}</p>
                                                <span
                                                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${o ? 'bg-gradient-brand text-white shadow-glow' : 'bg-navy-100 text-navy-600'
                                                        }`}
                                                >
                                                    {o ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                                                </span>
                                            </div>
                                            <motion.div
                                                initial={false}
                                                animate={{ height: o ? 'auto' : 0, opacity: o ? 1 : 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pt-4 text-navy-600 leading-relaxed text-sm">{f.a}</p>
                                            </motion.div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </motion.section>

                <motion.aside
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="space-y-6"
                >
                    <div className="p-6 rounded-3xl glass shadow-card border border-navy-100">
                        <h3 className="font-black text-navy-900 mb-5 flex items-center gap-2">
                            <FiMessageSquare className="w-5 h-5 text-navy-500" /> Contact Support
                        </h3>
                        <div className="space-y-3 mb-5">
                            <div className="p-4 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                                        Email
                                    </p>
                                    <p className="text-sm font-bold text-navy-800">support@campusvoice.edu</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FiSmartphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                                        Phone / Helpline
                                    </p>
                                    <p className="text-sm font-bold text-navy-800">+91 123 456 7890</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                                    <FiCalendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                                        Support Hours
                                    </p>
                                    <p className="text-sm font-bold text-navy-800">Mon–Sat, 9 AM – 6 PM</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" full iconLeft={<FiMessageSquare className="w-4 h-4" />}>
                            Send a Message
                        </Button>
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-soft border border-navy-100">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-glow mb-4">
                            <FiAlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-navy-900 mb-2">For Emergencies</h3>
                        <p className="text-sm text-navy-600 leading-relaxed mb-4">
                            If you are facing immediate danger, harassment, or a medical
                            crisis, please call Campus Security or Student Welfare directly —
                            do not wait for a complaint response.
                        </p>
                        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
                            Campus Security: 1800-123-4567 (24×7)
                        </div>
                    </div>
                </motion.aside>
            </div>
        </div>
    );
}
