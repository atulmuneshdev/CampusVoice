import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FiLayout,
    FiFileText,
    FiGrid,
    FiBookOpen,
    FiBell,
    FiUser,
    FiHelpCircle,
    FiLogOut,
    FiX,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth, filterComplaintsByUser } from '../context/AuthContext';

const items = [
    { to: '/dashboard', label: 'Dashboard', Icon: FiLayout, group: 'Main' },
    { to: '/complaints', label: 'My Complaints', Icon: FiFileText, group: 'Main' },
    { to: '/complaints/new', label: 'New Complaint', Icon: FiFileText, group: 'Main' },
    { to: '/categories', label: 'Categories', Icon: FiGrid, group: 'Main' },
    { to: '/notices', label: 'Notice Board', Icon: FiBookOpen, group: 'Updates' },
    { to: '/notifications', label: 'Notifications', Icon: FiBell, group: 'Updates' },
    { to: '/profile', label: 'Profile', Icon: FiUser, group: 'Account' },
    { to: '/help', label: 'Help & Support', Icon: FiHelpCircle, group: 'Account' },
];

const groups = ['Main', 'Updates', 'Account'];

export default function Sidebar({ open, onClose, mobile }) {
    useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;
    const firstName = (user?.name || '').split(' ')[0] || 'Student';

    const { total, resolved } = useMemo(() => {
        let all = [];
        try {
            const userCreated = JSON.parse(localStorage.getItem('cv_complaints') || '[]');
            const defs = (window.__CV_COMPLAINTS__ || []).filter(
                (c) => !userCreated.some((u) => u.id === c.id),
            );
            all = [...userCreated, ...defs];
        } catch {
            all = window.__CV_COMPLAINTS__ ? [...window.__CV_COMPLAINTS__] : [];
        }
        const mine = filterComplaintsByUser(all, user);
        return {
            total: mine.length,
            resolved: mine.filter((c) => c.status === 'Resolved').length,
        };
    }, [user]);

    const logout = () => {
        auth.logout();
        navigate('/login?loggedout=1', { replace: true });
        onClose?.();
    };

    const content = (
        <div className="h-full flex flex-col px-4 py-6 sm:px-5 sm:py-8 gap-6 overflow-y-auto">
            <div className="hidden md:flex items-center gap-2.5 mb-2">
                <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
                        <span className="text-white font-black">CV</span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse-soft" />
                </div>
                <div>
                    <p className="font-black text-navy-900 tracking-tight">CampusVoice</p>
                    <p className="text-[10px] text-navy-500 font-semibold tracking-wider uppercase">
                        Grievance Portal
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-brand text-white shadow-glow overflow-hidden relative">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="relative">
                    <p className="text-xs font-semibold text-white/80 mb-1">Welcome back</p>
                    <p className="font-bold text-lg leading-tight mb-3">
                        {user?.name || firstName} 👋
                    </p>
                    <p className="text-[11px] text-white/80 mb-3">
                        {user?.collegeId || '—'} • {user?.semester || '1st Sem'}
                    </p>
                    <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur font-semibold">
                            {total} Complaint{total === 1 ? '' : 's'}
                        </div>
                        <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur font-semibold">
                            {resolved} Resolved
                        </div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-4">
                {groups.map((group) => (
                    <div key={group}>
                        <p className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-navy-400">
                            {group}
                        </p>
                        <ul className="flex flex-col gap-1">
                            {items
                                .filter((i) => i.group === group)
                                .map(({ to, label, Icon }) => (
                                    <li key={to}>
                                        <NavLink
                                            to={to}
                                            end={to === '/dashboard'}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${isActive
                                                    ? 'bg-gradient-brand text-white shadow-glow'
                                                    : 'text-navy-700 hover:bg-white hover:shadow-card border border-transparent hover:border-navy-100'
                                                }`
                                            }
                                        >
                                            <Icon className="w-4.5 h-4.5 shrink-0" />
                                            <span className="flex-1">{label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="pt-4 border-t border-navy-100">
                <Button
                    variant="secondary"
                    size="md"
                    full
                    iconLeft={<FiLogOut className="w-4 h-4" />}
                    onClick={logout}
                    className="!bg-rose-50 !text-rose-700 !border-rose-200 hover:!bg-rose-100"
                >
                    Log Out
                </Button>
            </div>
        </div>
    );

    if (mobile) {
        return (
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                            className="absolute left-0 top-0 bottom-0 w-[min(86vw,320px)] bg-gradient-to-br from-white via-navy-50/60 to-violet-50/40 shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-navy-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
                                        <span className="text-white font-black">CV</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-navy-900 tracking-tight">
                                            CampusVoice
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close sidebar"
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-2xl hover:bg-navy-100 flex items-center justify-center text-navy-600"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">{content}</div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <aside className="hidden md:flex sticky top-20 self-start w-72 xl:w-80 shrink-0 h-[calc(100vh-6rem)]">
            <div className="w-full rounded-3xl glass border border-navy-100 shadow-card overflow-hidden">
                {content}
            </div>
        </aside>
    );
}
