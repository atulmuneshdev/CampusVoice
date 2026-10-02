import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
    FiFilePlus,
    FiFileText,
    FiMapPin,
    FiAlertCircle,
    FiPaperclip,
    FiUploadCloud,
    FiX,
    FiImage,
    FiFile,
    FiCheckCircle,
    FiChevronRight,
    FiArrowLeft,
    FiHelpCircle,
} from 'react-icons/fi';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { categories } from '../data/categories';
import { priorityConfig } from '../components/ComplaintStatus';

export default function NewComplaint() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        category: params.get('category') ?? '',
        categoryId: params.get('category') ?? '',
        title: '',
        location: '',
        description: '',
        priority: 'Normal',
    });
    const [files, setFiles] = useState([]);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [newId, setNewId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const selectedCat = categories.find((c) => c.id === form.categoryId);

    const update = (k, v) => {
        setForm((p) => ({ ...p, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }));
    };

    const pickCategory = (cat) => {
        update('categoryId', cat.id);
        update('category', cat.name);
        setStep(2);
    };

    const onFiles = (e) => {
        const arr = Array.from(e.target.files || []);
        const withMeta = arr.map((f) => ({
            name: f.name,
            size: f.size,
            type: f.type,
            url: URL.createObjectURL(f),
            isImage: f.type.startsWith('image/'),
            id: `${f.name}-${f.size}-${Math.random()}`,
        }));
        setFiles((prev) => [...prev, ...withMeta].slice(0, 5));
        e.target.value = '';
    };

    const removeFile = (id) =>
        setFiles((prev) => prev.filter((f) => f.id !== id));

    const fmtSize = (n) => {
        if (n < 1024) return `${n} B`;
        if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
        return `${(n / 1024 / 1024).toFixed(2)} MB`;
    };

    const validateStep2 = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Please enter a complaint title.';
        else if (form.title.trim().length < 8) e.title = 'Title should be at least 8 characters.';
        if (!form.location.trim()) e.location = 'Please provide a location.';
        if (!form.description.trim()) e.description = 'Please describe your complaint.';
        else if (form.description.trim().length < 20) e.description = 'Please provide at least 20 characters.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!selectedCat) {
            setStep(1);
            return;
        }
        if (!validateStep2()) return;

        setSubmitting(true);
        const id = `CMP-2026-${String(453 + Math.floor(Math.random() * 400)).padStart(5, '0')}`;
        const dateStr = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        const now = new Date();

        const newComplaint = {
            id,
            title: form.title.trim(),
            category: selectedCat.name,
            categoryId: selectedCat.id,
            location: form.location.trim(),
            status: 'Pending',
            priority: form.priority,
            date: dateStr,
            updatedAt: dateStr,
            description: form.description.trim(),
            files: files.map((f) => ({ name: f.name, size: f.size, type: f.type, isImage: f.isImage })),
            timeline: [
                {
                    title: 'Complaint Submitted',
                    date: now,
                    by: 'Atul Munesh',
                    status: 'done',
                },
                {
                    title: `Assigned to ${selectedCat.name} Administration`,
                    date: null,
                    by: null,
                    status: 'active',
                },
                {
                    title: 'Complaint Under Review',
                    date: null,
                    by: null,
                    status: 'pending',
                },
                {
                    title: 'Action Taken',
                    date: null,
                    by: null,
                    status: 'pending',
                },
                {
                    title: 'Resolution',
                    date: null,
                    by: null,
                    status: 'pending',
                },
            ],
        };

        try {
            const existing = JSON.parse(localStorage.getItem('cv_complaints') || '[]');
            localStorage.setItem('cv_complaints', JSON.stringify([newComplaint, ...existing]));
        } catch {
            /* ignore */
        }

        setTimeout(() => {
            setSubmitting(false);
            setNewId(id);
            setSuccess(true);
        }, 1100);
    };

    useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

    const steps = ['Category', 'Details', 'Review'];
    const currentStep = selectedCat ? (step === 1 ? 1 : 2) : 1;

    return (
        <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center gap-3">
                <Link
                    to="/complaints"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900 px-3 py-2 rounded-xl hover:bg-white hover:shadow-card transition-all border border-transparent hover:border-navy-100"
                >
                    <FiArrowLeft className="w-4 h-4" /> Back to Complaints
                </Link>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
                <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold tracking-wider mb-3">
                        <FiFilePlus className="w-3.5 h-3.5" /> NEW COMPLAINT
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
                        File a new complaint
                    </h1>
                    <p className="text-white/85 max-w-2xl mb-6">
                        Help us help you — share accurate details so the right team can take
                        quick action. All submissions are reviewed and responded to.
                    </p>

                    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
                        {steps.map((label, i) => {
                            const stepNum = i + 1;
                            const _active = stepNum <= currentStep + (step === 3 ? 1 : 0);
                            const done = stepNum < currentStep || step >= 3;
                            return (
                                <div key={label} className="flex items-center gap-2 sm:gap-3 shrink-0">
                                    <div
                                        className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${stepNum === currentStep
                                            ? 'bg-white text-navy-800 shadow-lg'
                                            : done
                                                ? 'bg-white/20 backdrop-blur text-white border border-white/30'
                                                : 'bg-white/10 text-white/70'
                                            }`}
                                    >
                                        <span
                                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center ${done
                                                ? 'bg-emerald-400 text-white'
                                                : stepNum === currentStep
                                                    ? 'bg-gradient-brand text-white'
                                                    : 'bg-white/20 text-white'
                                                }`}
                                        >
                                            {done ? <FiCheckCircle className="w-4 h-4" /> : stepNum}
                                        </span>
                                        {label}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="w-6 sm:w-10 h-0.5 bg-white/20 rounded-full" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.section
                                key="step1"
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-3xl glass shadow-card border border-navy-100 p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-black text-navy-900 tracking-tight">
                                        1. Select Complaint Category
                                    </h2>
                                    <span className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                                        Step 1 of 2
                                    </span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                    {categories.map((c, i) => {
                                        const active = form.categoryId === c.id;
                                        return (
                                            <motion.button
                                                key={c.id}
                                                type="button"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => pickCategory(c)}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all ${active
                                                    ? `border-transparent shadow-glow bg-gradient-to-br ${c.color} text-white`
                                                    : 'border-navy-100 bg-white/60 hover:bg-white hover:border-navy-200 hover:shadow-card'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div
                                                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${active
                                                            ? 'bg-white/20 text-white'
                                                            : `bg-gradient-to-br ${c.color} text-white`
                                                            }`}
                                                    >
                                                        <FiFileText className="w-5 h-5" />
                                                    </div>
                                                    {active && <FiCheckCircle className="w-5 h-5" />}
                                                </div>
                                                <h3
                                                    className={`text-base font-black mb-1 ${active ? '' : 'text-navy-900'
                                                        }`}
                                                >
                                                    {c.name}
                                                </h3>
                                                <p
                                                    className={`text-xs leading-relaxed line-clamp-2 ${active ? 'text-white/85' : 'text-navy-600'
                                                        }`}
                                                >
                                                    {c.description}
                                                </p>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.section>
                        )}

                        {step >= 2 && (
                            <motion.section
                                key="step2"
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 rounded-3xl glass shadow-card border border-navy-100 p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-black text-navy-900 tracking-tight">
                                        2. Complaint Details
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs font-bold text-navy-600 hover:text-navy-900 inline-flex items-center gap-1"
                                    >
                                        <FiChevronRight className="w-3 h-3 rotate-180" /> Change category
                                    </button>
                                </div>

                                {selectedCat && (
                                    <div className={`p-4 rounded-2xl border ring-1 ${selectedCat.bgColor} ${selectedCat.ringColor} flex items-center gap-4`}>
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCat.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                                            <FiFileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[11px] font-black uppercase tracking-wider ${selectedCat.textColor} mb-0.5`}>
                                                Selected Category
                                            </p>
                                            <p className="font-black text-navy-900">{selectedCat.name}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                                            <FiFileText className="w-4 h-4 text-navy-500" /> Complaint Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => update('title', e.target.value)}
                                            placeholder="e.g. Water supply problem in Hostel Block B"
                                            className={`w-full px-4 py-3.5 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium ${errors.title
                                                ? 'border-rose-400 focus:ring-4 focus:ring-rose-400/15'
                                                : 'border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15'
                                                }`}
                                        />
                                        {errors.title && (
                                            <p className="text-xs font-semibold text-rose-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="loc" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                                            <FiMapPin className="w-4 h-4 text-navy-500" /> Location
                                        </label>
                                        <input
                                            id="loc"
                                            type="text"
                                            value={form.location}
                                            onChange={(e) => update('location', e.target.value)}
                                            placeholder="e.g. Hostel Block B - 2nd Floor, Room 214"
                                            className={`w-full px-4 py-3.5 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium ${errors.location
                                                ? 'border-rose-400 focus:ring-4 focus:ring-rose-400/15'
                                                : 'border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15'
                                                }`}
                                        />
                                        {errors.location && (
                                            <p className="text-xs font-semibold text-rose-600">{errors.location}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="desc" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                                            <FiAlertCircle className="w-4 h-4 text-navy-500" /> Description
                                        </label>
                                        <textarea
                                            id="desc"
                                            rows={6}
                                            value={form.description}
                                            onChange={(e) => update('description', e.target.value)}
                                            placeholder="Describe the issue in detail — when it started, how it affects you, and any steps already taken."
                                            className={`w-full px-4 py-3.5 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium resize-none ${errors.description
                                                ? 'border-rose-400 focus:ring-4 focus:ring-rose-400/15'
                                                : 'border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15'
                                                }`}
                                        />
                                        <div className="flex items-center justify-between text-xs">
                                            {errors.description ? (
                                                <p className="font-semibold text-rose-600">{errors.description}</p>
                                            ) : (
                                                <span className="text-navy-500">
                                                    <FiHelpCircle className="w-3.5 h-3.5 inline mr-1" />
                                                    Be specific — include dates, times, and affected people.
                                                </span>
                                            )}
                                            <span className={`font-bold ${form.description.length >= 20 ? 'text-emerald-600' : 'text-navy-400'}`}>
                                                {form.description.length} chars
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-navy-800 flex items-center gap-2">
                                            <FiAlertCircle className="w-4 h-4 text-navy-500" /> Priority
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {Object.entries(priorityConfig).map(([k, cfg]) => {
                                                const active = form.priority === k;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={k}
                                                        onClick={() => update('priority', k)}
                                                        className={`p-4 rounded-2xl text-left transition-all border-2 ${active
                                                            ? 'border-navy-600 bg-white shadow-card'
                                                            : 'border-navy-100 bg-white/60 hover:bg-white hover:border-navy-200'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${cfg.color}`}>
                                                                {cfg.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-navy-500">
                                                            {k === 'Normal' && 'Standard response within 48 hours.'}
                                                            {k === 'Important' && 'Requires attention within 24 hours.'}
                                                            {k === 'Urgent' && 'Immediate response required.'}
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-navy-800 flex items-center gap-2">
                                            <FiPaperclip className="w-4 h-4 text-navy-500" /> Attach Evidence{' '}
                                            <span className="text-xs font-normal text-navy-500">(optional, up to 5 files)</span>
                                        </p>

                                        <label className="group cursor-pointer block">
                                            <div className="border-2 border-dashed rounded-3xl p-8 text-center border-navy-200 hover:border-navy-400 hover:bg-navy-50/50 transition-all">
                                                <FiUploadCloud className="w-10 h-10 mx-auto text-navy-400 mb-3 group-hover:text-navy-600 transition-colors" />
                                                <p className="font-bold text-navy-800 mb-1">Drop files or click to upload</p>
                                                <p className="text-xs text-navy-500">
                                                    JPG, PNG, PDF, DOC • Max 10 MB each
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,.pdf,.doc,.docx,.txt"
                                                onChange={onFiles}
                                                className="hidden"
                                            />
                                        </label>

                                        {files.length > 0 && (
                                            <ul className="grid sm:grid-cols-2 gap-3">
                                                {files.map((f) => (
                                                    <li
                                                        key={f.id}
                                                        className="relative p-3 rounded-2xl bg-white/80 border border-navy-100 flex items-center gap-3 shadow-card"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-100 to-violet-100 flex items-center justify-center shrink-0 overflow-hidden">
                                                            {f.isImage ? (
                                                                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                                                            ) : f.type.includes('pdf') ? (
                                                                <FiFile className="w-6 h-6 text-rose-500" />
                                                            ) : (
                                                                <FiImage className="w-6 h-6 text-navy-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-navy-800 truncate">{f.name}</p>
                                                            <p className="text-xs text-navy-500">{fmtSize(f.size)}</p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFile(f.id)}
                                                            aria-label={`Remove ${f.name}`}
                                                            className="w-8 h-8 rounded-lg hover:bg-rose-50 text-navy-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-navy-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-navy-700 hover:bg-white border border-navy-200 transition-colors"
                                    >
                                        <FiArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        loading={submitting}
                                        iconLeft={!submitting ? <FiFilePlus className="w-5 h-5" /> : null}
                                    >
                                        Submit Complaint
                                    </Button>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>

                <aside className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-3xl glass shadow-card border border-navy-100 p-6"
                    >
                        <h3 className="font-black text-navy-900 mb-4 flex items-center gap-2">
                            <FiHelpCircle className="w-5 h-5 text-navy-500" /> Tips for faster resolution
                        </h3>
                        <ul className="space-y-3 text-sm text-navy-600">
                            {[
                                'Be clear and specific about what happened.',
                                'Include exact dates, times, and locations.',
                                'Attach photos or documents as evidence.',
                                'Assign the right category so it routes correctly.',
                                'Describe the impact on students or campus.',
                            ].map((t, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                                        <FiCheckCircle className="w-3 h-3" />
                                    </span>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 text-white shadow-glow"
                    >
                        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
                        <div className="relative">
                            <h3 className="font-black text-lg mb-2">Need urgent help?</h3>
                            <p className="text-white/85 text-sm mb-4 leading-relaxed">
                                If your complaint is an emergency or safety issue, contact your
                                hostel warden or college authorities directly in addition to filing here.
                            </p>
                            <a
                                href="tel:+911234567890"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur border border-white/30 text-sm font-semibold hover:bg-white/25 transition-colors"
                            >
                                Call Student Support
                            </a>
                        </div>
                    </motion.div>
                </aside>
            </form>

            <Modal
                open={success}
                hideCloseButton
                maxWidth="max-w-lg"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 24 }}
                    className="text-center py-4"
                >
                    <div className="relative mx-auto w-24 h-24 mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.15, type: 'spring', stiffness: 240, damping: 18 }}
                            className="absolute inset-0 rounded-full bg-emerald-100 animate-pulse-soft"
                        />
                        <motion.div
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
                            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200"
                        >
                            <FiCheckCircle className="w-12 h-12" />
                        </motion.div>
                    </div>
                    <h2 className="text-3xl font-black text-navy-950 mb-2">
                        Complaint Submitted!
                    </h2>
                    <p className="text-navy-600 mb-6 leading-relaxed">
                        Your complaint has been forwarded to the concerned department. You'll
                        receive updates as soon as there's progress.
                    </p>
                    <div className="p-5 rounded-2xl bg-gradient-soft border border-navy-100 mb-6">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-navy-500 mb-1">
                            Complaint ID
                        </p>
                        <p className="text-2xl font-black text-gradient tracking-tight">{newId}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                            variant="primary"
                            onClick={() => {
                                setSuccess(false);
                                navigate(`/complaints/${newId}`);
                            }}
                        >
                            View Complaint
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSuccess(false);
                                navigate('/complaints');
                            }}
                        >
                            Back to All Complaints
                        </Button>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
}
