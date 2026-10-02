import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import NotificationBell from './NotificationBell';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/complaints', label: 'Complaints' },
  { to: '/notices', label: 'Notices' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar({ onToggleSidebar, showSidebarToggle = false }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 10)), [scrollY]);
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-navy-100 shadow-[0_8px_30px_rgba(15,23,42,0.04)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            {showSidebarToggle && (
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
                className="md:hidden w-10 h-10 rounded-xl hover:bg-navy-100/60 flex items-center justify-center text-navy-700"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            )}
            <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-violet transition-shadow">
                  <span className="text-white font-black text-sm sm:text-base tracking-tight">
                    CV
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse-soft" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-black text-navy-900 tracking-tight">
                  CampusVoice
                </p>
                <p className="text-[10px] text-navy-500 font-semibold tracking-wider uppercase">
                  Grievance Portal
                </p>
              </div>
            </NavLink>
          </div>

          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl glass border border-navy-100 shadow-card">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-navy-600 hover:text-navy-900 hover:bg-white/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-gradient-brand rounded-xl shadow-glow"
                          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <NotificationBell />
            <NavLink
              to="/profile"
              className="group relative flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl bg-white/70 hover:bg-white border border-navy-100 shadow-card transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center text-xs font-bold shadow-glow">
                AM
              </div>
              <span className="hidden md:inline text-sm font-semibold text-navy-800">
                Atul
              </span>
            </NavLink>
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 rounded-2xl bg-white/70 border border-navy-100 hover:bg-white text-navy-700 shadow-card flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-label="Main menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-[min(86vw,360px)] glass-dark text-white shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
                    <span className="text-white font-black">CV</span>
                  </div>
                  <div>
                    <p className="font-black tracking-tight">CampusVoice</p>
                    <p className="text-[10px] text-white/60 font-semibold tracking-wider uppercase">
                      Grievance Portal
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item, idx) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-2xl font-semibold transition-colors ${
                        isActive
                          ? 'bg-white text-navy-900 shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className={isActive ? 'text-gradient' : ''}>
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center font-black">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">Atul Munesh</p>
                  <p className="text-xs text-white/60 truncate">CSE20260045</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
