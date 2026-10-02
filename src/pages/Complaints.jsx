import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiFilePlus,
  FiRepeat,
  FiFileText,
  FiArrowRight,
} from 'react-icons/fi';
import ComplaintCard from '../components/ComplaintCard';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import { complaints as defaultComplaints } from '../data/complaints';

const statuses = ['All', 'Pending', 'Under Review', 'Resolved', 'Rejected', 'Escalated'];
const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'updated', label: 'Recently Updated' },
];

function mergedList() {
  try {
    const stored = localStorage.getItem('cv_complaints');
    const userCreated = stored ? JSON.parse(stored) : [];
    const existingIds = new Set(userCreated.map((c) => c.id));
    const dedupedDefaults = defaultComplaints.filter((c) => !existingIds.has(c.id));
    return [...userCreated, ...dedupedDefaults];
  } catch {
    return [...defaultComplaints];
  }
}

export default function Complaints() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [list, setList] = useState(() => mergedList());

  useEffect(() => {
    const onStorage = () => setList(mergedList());
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => setList(mergedList()), 2000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  const filtered = useMemo(() => {
    let out = [...list];
    if (statusFilter !== 'All') out = out.filter((c) => c.status === statusFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          (c.category && c.category.toLowerCase().includes(q)) ||
          (c.description && c.description.toLowerCase().includes(q)),
      );
    }
    if (sort === 'newest') {
      out.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'oldest') {
      out.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      out.sort((a, b) => new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date));
    }
    return out;
  }, [list, query, statusFilter, sort]);

  const summary = useMemo(() => {
    const byStatus = Object.fromEntries(statuses.slice(1).map((s) => [s, 0]));
    list.forEach((c) => {
      if (byStatus[c.status] !== undefined) byStatus[c.status] += 1;
    });
    return byStatus;
  }, [list]);

  const sortLabel = sortOptions.find((s) => s.id === sort)?.label ?? sortOptions[0].label;

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-navy-100 text-xs font-bold tracking-wider text-navy-600 mb-2 shadow-card">
            <FiFileText className="w-3.5 h-3.5" /> MY COMPLAINTS
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-navy-950 mb-1">
            Track every complaint
          </h1>
          <p className="text-navy-600 max-w-2xl">
            {list.length} total • {summary.Pending} pending • {summary['Under Review'] || 0} under review • {summary.Resolved || 0} resolved
          </p>
        </div>
        <Link to="/complaints/new">
          <Button
            variant="primary"
            size="md"
            iconLeft={<FiFilePlus className="w-4 h-4" />}
          >
            New Complaint
          </Button>
        </Link>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 rounded-3xl glass shadow-card border border-navy-100"
      >
        {statuses.map((s) => {
          const count = s === 'All' ? list.length : summary[s] ?? 0;
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`p-3 sm:p-4 rounded-2xl text-left transition-all ${active
                ? 'bg-gradient-brand text-white shadow-glow'
                : 'bg-white/60 hover:bg-white border border-navy-100 hover:border-navy-200'
                }`}
            >
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${active ? 'text-white/80' : 'text-navy-400'}`}>
                {s}
              </p>
              <p className={`text-2xl font-black ${active ? '' : 'text-navy-900'}`}>
                {String(count).padStart(2, '0')}
              </p>
            </button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
      >
        <div className="flex-1">
          <SearchBar
            placeholder="Search by ID, title, or category..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/80 border border-navy-200 hover:border-navy-300 text-navy-800 text-sm font-semibold shadow-card w-full sm:w-auto justify-center"
          >
            <FiRepeat className="w-4 h-4" />
            Sort: {sortLabel}
          </button>
          {sortOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 mt-2 w-56 rounded-2xl glass shadow-2xl border border-navy-100 overflow-hidden z-20"
            >
              {sortOptions.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSort(o.id);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold hover:bg-white/80 transition-colors ${sort === o.id ? 'text-navy-800 bg-white/80' : 'text-navy-600'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-10 sm:p-16 rounded-3xl glass text-center border border-navy-100 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-brand text-white mx-auto mb-6 flex items-center justify-center shadow-glow">
              <FiFileText className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-navy-900 mb-2">
              {list.length === 0 ? 'No complaints yet' : 'No complaints found'}
            </h3>
            <p className="text-navy-600 max-w-md mx-auto mb-8 leading-relaxed">
              {list.length === 0
                ? "You haven't submitted any complaints yet. Your voice matters — let the campus hear it."
                : 'Try adjusting your search, filters, or sort order to see more results.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/complaints/new">
                <Button
                  variant="primary"
                  iconRight={<FiArrowRight className="w-4 h-4" />}
                >
                  File Your First Complaint
                </Button>
              </Link>
              {query && (
                <Button variant="secondary" onClick={() => setQuery('')}>
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        </motion.section>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-5">
          {filtered.map((c, i) => (
            <ComplaintCard key={c.id} complaint={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
