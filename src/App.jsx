import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import NewComplaint from './pages/NewComplaint';
import ComplaintDetails from './pages/ComplaintDetails';
import Categories from './pages/Categories';
import Notifications from './pages/Notifications';
import Notices from './pages/Notices';
import Profile from './pages/Profile';
import Help from './pages/Help';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthProvider, RequireAuth, RedirectIfAuthed } from './context/AuthContext';
import { complaints as defaultComplaints } from './data/complaints';

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__CV_COMPLAINTS__ = defaultComplaints;
    }
    try {
      const stored = localStorage.getItem('cv_complaints');
      const userCreated = stored ? JSON.parse(stored) : [];
      if (typeof window !== 'undefined') {
        window.__CV_COMPLAINTS__ = [...userCreated, ...defaultComplaints];
      }
    } catch {
      if (typeof window !== 'undefined') {
        window.__CV_COMPLAINTS__ = defaultComplaints;
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <RedirectIfAuthed>
                  <Landing />
                </RedirectIfAuthed>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfAuthed>
                  <Login />
                </RedirectIfAuthed>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthed>
                  <Register />
                </RedirectIfAuthed>
              }
            />
            <Route
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/complaints/new" element={<NewComplaint />} />
              <Route path="/complaints/:id" element={<ComplaintDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </BrowserRouter>
  );
}
