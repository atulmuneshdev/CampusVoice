import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiBookmark, FiX } from 'react-icons/fi';
import NoticeCard from '../components/NoticeCard';
import SearchBar from '../components/SearchBar';
import { notices as defaultNotices } from '../data/notices';

const filters = [
    { id: 'All', label: 'All' },
    { id: 'College', label: 'College' },
    { id: 'Hostel', label: 'Hostel' },
    { id: 'Mess', label: 'Mess' },
    { id: 'Academic', label: 'Academic' },
    { id: 'Sports', label: 'Sports' },
    { id: 'Important', label: 'Important' },
];

export default function Notices() {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = useMemo(() => {
        let out = [...defaultNotices];
        if (filter === 'Important') out = out.filter((n) => n.priority === 'Important');
        else if (filter !== 'All') out = out.filter((n) => n.category === filter);
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            out = out.filter(
                (n) =>
                    n.title.toLowerCase().includes(q) ||
                    n.description.toLowerCase().includes(q) ||
                    n.category.toLowerCase().includes(q),
            );
        }
        const pinned = out.filter((n) => n.pinned);
        const others = out.filter((n) => !n.pinned);
        return [...pinned, ...others];
    }, [query, filter]);

    const counts = useMemo(() => {
        const c = { All: defaultNotices.length, Important: 0 };
        defaultNotices.forEach((n) => {
            c[n.category] = (c[n.category] ?? 0) + 1;
            if (n.priority === 'Important') c.Important += 1;
        });
        return c;
    }, []);

    return (
        <div className="space-y-6 lg:space-y-8">
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
                <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold tracking-wider mb-3">
                            <FiBookOpen className="w-3.5 h-3.5" /> CAMPUS NOTICE BOARD
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
                            Campus Notice Board
                        </h1>
                        <p className="text-white/85 max-w-2xl">
                            Stay up to date with every announcement from college, hostel,
                            mess, academics, and sports — all in one organized feed.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur border border-white/20">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                                Total Notices
                            </p>
                            <p className="text-2xl font-black leading-none">
                                {String(defaultNotices.length).padStart(2, '0')}
                            </p>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur border border-white/20">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-0.5 flex items-center gap-1">
                                <FiBookmark className="w-3 h-3" /> Pinned
                            </p>
                            <p className="text-2xl font-black leading-none">
                                {String(defaultNotices.filter((n) => n.pinned).length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 p-4 rounded-3xl glass shadow-card border border-navy-100"
            >
                {filters.map((f) => {
                    const active = filter === f.id;
                    const count = counts[f.id] ?? 0;
                    return (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all ${active
                                ? 'bg-gradient-brand text-white shadow-glow'
                                : 'bg-white/70 border border-navy-100 hover:bg-white hover:border-navy-200 text-navy-700'
                                }`}
                        >
                            {f.label}
                            <span
                                className={`text-[11px] px-2 py-0.5 rounded-full ${active ? 'bg-white/25 text-white' : 'bg-navy-100 text-navy-600'
                                    }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="max-w-md w-full">
                    <SearchBar
                        placeholder="Search notices, titles or departments..."
                        value={query}
                        onChange={setQuery}
                    />
                </div>
                <p className="text-sm text-navy-500">
                    Showing <span className="font-bold text-navy-800">{filtered.length}</span> notice{filtered.length !== 1 ? 's' : ''}
                </p>
            </div>

            {filtered.length === 0 ? (
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 rounded-3xl glass text-center border border-navy-100"
                >
                    <div className="w-20 h-20 rounded-3xl bg-navy-100 text-navy-500 mx-auto mb-6 flex items-center justify-center">
                        <FiBookOpen className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-navy-900 mb-2">No notices found</h3>
                    <p className="text-navy-600 max-w-md mx-auto mb-6">
                        There are no notices matching your current filters. Try another
                        category or clear your search.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-navy-700 bg-white border border-navy-200 hover:bg-navy-50"
                            >
                                <FiX className="w-4 h-4" /> Clear Search
                            </button>
                        )}
                        <button
                            onClick={() => setFilter('All')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-gradient-brand text-white shadow-glow"
                        >
                            View All Notices
                        </button>
                    </div>
                </motion.section>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {filtered.map((n, i) => (
                        <NoticeCard key={n.id} notice={n} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
