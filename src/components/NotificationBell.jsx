import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiBell,
  FiX,
  FiFileText,
  FiBookOpen,
} from 'react-icons/fi';
import { notificationsData } from '../data/notifications';

const typeIcon = {
  complaint: FiFileText,
  notice: FiBookOpen,
  system: FiBell,
};

const typeStyle = {
  complaint: 'bg-sky-50 text-sky-600',
  notice: 'bg-violet-50 text-violet-600',
  system: 'bg-navy-50 text-navy-600',
};

export default function NotificationBell({ compact = false }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_notifications');
      return stored ? JSON.parse(stored) : notificationsData;
    } catch {
      return notificationsData;
    }
  });
  const unreadCount = items.filter((n) => !n.read).length;

  useEffect(() => {
    localStorage.setItem('cv_notifications', JSON.stringify(items));
  }, [items]);

  const markAll = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const markOne = (id) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        whileTap={{ scale: 0.95 }}
        className={`relative ${
          compact ? 'w-10 h-10' : 'w-11 h-11'
        } rounded-2xl bg-white/70 border border-navy-100 hover:bg-white hover:border-navy-200 shadow-card transition-colors flex items-center justify-center text-navy-700`}
      >
        <FiBell className={`${compact ? 'w-4.5 h-4.5' : 'w-5 h-5'}`} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-brand text-white text-[10px] font-bold flex items-center justify-center shadow-glow"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Notifications"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="absolute right-0 mt-3 w-[min(92vw,400px)] max-h-[70vh] glass rounded-3xl shadow-2xl shadow-navy-900/15 overflow-hidden z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
                <div>
                  <h3 className="font-bold text-navy-900">Notifications</h3>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {unreadCount} unread of {items.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={markAll}
                    className="text-xs font-semibold text-navy-600 hover:text-navy-800 px-3 py-2 rounded-xl hover:bg-navy-50 transition-colors"
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 rounded-xl hover:bg-navy-100 flex items-center justify-center text-navy-500"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <ul className="overflow-y-auto divide-y divide-navy-100">
                {items.slice(0, 8).map((n) => {
                  const Icon = typeIcon[n.type] ?? FiBell;
                  const ts = typeStyle[n.type] ?? typeStyle.system;
                  return (
                    <li key={n.id}>
                      <Link
                        to={n.link ?? '#'}
                        onClick={() => {
                          markOne(n.id);
                          setOpen(false);
                        }}
                        className={`flex items-start gap-3 px-5 py-4 hover:bg-white/70 transition-colors ${
                          n.read ? 'opacity-70' : ''
                        }`}
                      >
                        <div
                          className={`relative w-10 h-10 shrink-0 rounded-2xl ${ts} flex items-center justify-center`}
                        >
                          <Icon className="w-5 h-5" />
                          {!n.read && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-navy-900 truncate">
                              {n.title}
                            </h4>
                            <span className="text-[11px] text-navy-400 shrink-0">
                              {n.displayTime}
                            </span>
                          </div>
                          <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-semibold text-navy-700 hover:bg-navy-50 py-3 border-t border-navy-100"
              >
                View all notifications
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
