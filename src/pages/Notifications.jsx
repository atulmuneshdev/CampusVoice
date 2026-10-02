import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiBell,
  FiFileText,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiArchive,
  FiAlertCircle,
} from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import { notificationsData } from '../data/notifications';

const typeIcon = {
  complaint: FiFileText,
  notice: FiBookOpen,
  system: FiBell,
};

const typeStyle = {
  complaint: 'bg-sky-50 text-sky-600 ring-sky-200',
  notice: 'bg-violet-50 text-violet-600 ring-violet-200',
  system: 'bg-navy-50 text-navy-600 ring-navy-200',
};

export default function Notifications() {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_notifications');
      return stored ? JSON.parse(stored) : notificationsData;
    } catch {
      return notificationsData;
    }
  });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('cv_notifications', JSON.stringify(items));
  }, [items]);

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    let out = [...items];
    if (filter === 'Unread') out = out.filter((n) => !n.read);
    else if (filter === 'Complaints') out = out.filter((n) => n.type === 'complaint');
    else if (filter === 'Notices') out = out.filter((n) => n.type === 'notice');
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.referenceId && n.referenceId.toLowerCase().includes(q)),
      );
    }
    out.sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));
    return out;
  }, [items, query, filter]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  const clearAll = () => setItems([]);

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Unread', label: 'Unread' },
    { id: 'Complaints', label: 'Complaints' },
    { id: 'Notices', label: 'Notices' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
        <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold tracking-wider mb-3">
              <FiBell className="w-3.5 h-3.5" /> NOTIFICATIONS
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
              Stay in the loop
            </h1>
            <p className="text-white/85 max-w-2xl">
              Every update about your complaints and campus notices, delivered instantly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur border border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                Unread
              </p>
              <p className="text-2xl font-black leading-none">
                {String(unreadCount).padStart(2, '0')}
              </p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur border border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                Total
              </p>
              <p className="text-2xl font-black leading-none">
                {String(items.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between"
      >
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl glass shadow-card border border-navy-100">
          {tabs.map((t) => {
            const active = filter === t.id;
            const count =
              t.id === 'All'
                ? items.length
                : t.id === 'Unread'
                ? unreadCount
                : items.filter((n) => n.type === t.id.toLowerCase().slice(0, -1)).length;
            return (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? 'bg-gradient-brand text-white shadow-glow'
                    : 'text-navy-700 hover:bg-white hover:shadow-card'
                }`}
              >
                {t.label}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    active ? 'bg-white/25 text-white' : 'bg-navy-100 text-navy-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="max-w-xs w-full">
            <SearchBar
              placeholder="Search notifications..."
              value={query}
              onChange={setQuery}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={markAll}
              disabled={unreadCount === 0}
              iconLeft={<FiCheck className="w-4 h-4" />}
            >
              Mark all read
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={clearAll}
              disabled={items.length === 0}
              iconLeft={<FiArchive className="w-4 h-4" />}
              className="hidden sm:inline-flex"
            >
              Clear All
            </Button>
          </div>
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-3xl glass text-center border border-navy-100"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-20 animate-pulse-soft" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-brand text-white flex items-center justify-center shadow-glow">
              <FiBell className="w-10 h-10" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-navy-900 mb-2">
            {items.length === 0 ? 'No notifications yet' : 'No matching notifications'}
          </h3>
          <p className="text-navy-600 max-w-md mx-auto mb-6">
            {items.length === 0
              ? 'When there are updates about your complaints or campus notices, you will see them here.'
              : 'Try adjusting your filters or search to find what you are looking for.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filter !== 'All' && (
              <button
                onClick={() => setFilter('All')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-white border border-navy-200 hover:bg-navy-50 text-navy-700"
              >
                Show all notifications
              </button>
            )}
            <Link to="/complaints">
              <Button variant="primary" iconLeft={<FiFileText className="w-4 h-4" />}>
                View My Complaints
              </Button>
            </Link>
          </div>
        </motion.section>
      ) : (
        <motion.ul className="rounded-3xl glass shadow-card border border-navy-100 overflow-hidden divide-y divide-navy-100">
          <AnimatePresence initial={false}>
            {filtered.map((n, i) => {
              const Icon = typeIcon[n.type] ?? FiBell;
              const ts = typeStyle[n.type] ?? typeStyle.system;
              return (
                <motion.li
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.15) }}
                >
                  <Link
                    to={n.link ?? '#'}
                    onClick={() => markOne(n.id)}
                    className={`flex items-start gap-4 p-5 sm:p-6 transition-colors ${
                      n.read ? 'hover:bg-white/60 opacity-80' : 'hover:bg-white bg-white/40'
                    }`}
                  >
                    <div className="relative shrink-0 mt-0.5">
                      <div
                        className={`w-12 h-12 rounded-2xl ring-4 ring-white ${ts} flex items-center justify-center shadow-card`}
                      >
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      {!n.read && (
                        <motion.span
                          layoutId={`unread-${n.id}`}
                          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse-soft"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3
                          className={`text-base font-black leading-tight ${
                            n.read ? 'text-navy-700' : 'text-navy-950'
                          }`}
                        >
                          {n.title}
                          {n.referenceId && (
                            <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-md bg-navy-100 text-navy-600">
                              {n.referenceId}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-navy-400 shrink-0">
                            {n.displayTime}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              markOne(n.id);
                            }}
                            title={n.read ? 'Mark as unread' : 'Mark as read'}
                            className="w-8 h-8 rounded-lg hover:bg-navy-100 text-navy-400 hover:text-navy-700 flex items-center justify-center shrink-0"
                          >
                            {n.read ? <FiAlertCircle className="w-4 h-4" /> : <FiCheckCircle className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-navy-600 leading-relaxed">{n.message}</p>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
