import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiAward,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import NotificationBell from './NotificationBell';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/complaints', label: 'Complaints' },
  { to: '/notices', label: 'Notices' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/profile', label: 'Profile' },
];

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [ref, onOutside]);
}

export default function Navbar({ onToggleSidebar, showSidebarToggle = false }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const profileRef = useRef(null);
  useClickOutside(profileRef, () => setProfileOpen(false));

  const user = auth.user;
  const nameParts = (user?.name || '').split(' ').filter(Boolean);
  const initials = nameParts.length
    ? (nameParts[0][0] + (nameParts[nameParts.length - 1][0] || '')).toUpperCase()
    : '?';
  const firstName = nameParts[0] || 'Student';

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 10)), [scrollY]);
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const logout = () => {
    setProfileOpen(false);
    auth.logout();
    navigate('/login?loggedout=1', { replace: true });
  };

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
                  <span className="text-white font-black text-sm sm:text-base tracking-tight">CV</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse-soft" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-black text-navy-900 tracking-tight">CampusVoice</p>
                <p className="text-[10px] text-navy-500 font-semibold tracking-wider uppercase">Grievance Portal</p>
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
                    isActive ? 'text-white' : 'text-navy-600 hover:text-navy-900 hover:bg-white/70'
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

            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="group relative flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-2xl bg-white/70 hover:bg-white border border-navy-100 shadow-card transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center text-xs font-bold shadow-glow">
                  {initials}
                </div>
                <span className="hidden md:inline text-sm font-semibold text-navy-800">
                  {firstName}
                </span>
                <FiChevronDown
                  className={`hidden sm:inline w-4 h-4 text-navy-500 transition-transform ${
                    profileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl glass shadow-2xl border border-navy-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-brand text-white">
                      <p className="text-xs font-semibold text-white/80 mb-1">Signed in as</p>
                      <p className="font-bold leading-tight truncate">{user?.name || 'Student'}</p>
                      <p className="text-xs text-white/80 truncate mt-0.5 flex items-center gap-1">
                        <FiAward className="w-3.5 h-3.5" /> {user?.collegeId || '—'}
                      </p>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-700 hover:bg-white hover:shadow-card transition-all"
                      >
                        <span className="w-8 h-8 rounded-lg bg-navy-100 text-navy-700 flex items-center justify-center">
                          <FiUser className="w-4 h-4" />
                        </span>
                        My Profile
                      </Link>
                      <Link
                        to="/complaints"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-700 hover:bg-white hover:shadow-card transition-all"
                      >
                        <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                          <FiFileText className="w-4 h-4" />
                        </span>
                        My Complaints
                      </Link>
                      <div
                        role="menuitem"
                        aria-disabled="true"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-500 bg-navy-50/60"
                      >
                        <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                          <FiAward className="w-4 h-4" />
                        </span>
                        <span className="flex-1">
                          College ID <span className="font-bold text-navy-700">{user?.collegeId || '—'}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-2 pt-1 border-t border-navy-100">
                      <button
                        role="menuitem"
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
                      >
                        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                          <FiLogOut className="w-4 h-4" />
                        </span>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                    <p className="text-[10px] text-white/60 font-semibold tracking-wider uppercase">Grievance Portal</p>
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
                        <span className={isActive ? 'text-gradient' : ''}>{item.label}</span>
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center font-black shadow-glow">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{user?.name || 'Student'}</p>
                  <p className="text-xs text-white/60 truncate">{user?.collegeId || '—'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-lg shadow-rose-900/30 transition-colors"
              >
                <FiLogOut className="w-4 h-4" /> Logout
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
