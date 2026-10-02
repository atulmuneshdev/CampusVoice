import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const auth = localStorage.getItem('cv_auth');
        if (!auth) navigate('/login', { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                showSidebarToggle
                onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />
            <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 lg:gap-8">
                <Sidebar />
                <Sidebar
                    mobile
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
            <footer className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1600px] mx-auto text-center text-xs text-navy-500">
                    © 2026 CampusVoice — Student Grievance & Complaint Portal. Your Voice. Our Responsibility.
                </div>
            </footer>
        </div>
    );
}
