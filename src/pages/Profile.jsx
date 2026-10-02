import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiEdit3,
  FiLogOut,
  FiSettings,
  FiBell,
  FiLock,
  FiShield,
  FiFileText,
  FiCalendar,
  FiAward,
  FiCheckCircle,
  FiCamera,
  FiGlobe,
  FiSmartphone,
  FiBookOpen,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';

const defaultProfile = {
  name: 'Atul Munesh',
  collegeId: 'CSE20260045',
  department: 'Computer Science & Engineering',
  academicYear: '2026-2030',
  semester: '1st Semester',
  email: 'atul@example.com',
  phone: '+91 98765 43210',
  dob: '15 April 2008',
  gender: 'Male',
  address: 'Room 214, Hostel Block B, Campus',
};

const quickStats = [
  { label: 'Complaints Filed', value: '12', Icon: FiFileText, color: 'from-navy-500 to-indigo-500' },
  { label: 'Resolved', value: '5', Icon: FiCheckCircle, color: 'from-emerald-500 to-teal-500' },
  { label: 'Active Since', value: '60d', Icon: FiCalendar, color: 'from-violet-500 to-purple-500' },
  { label: 'Avg. Response', value: '8h', Icon: FiBell, color: 'from-amber-500 to-orange-500' },
];

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      const auth = JSON.parse(localStorage.getItem('cv_auth') || '{}');
      return { ...defaultProfile, ...auth };
    } catch {
      return defaultProfile;
    }
  });
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    sms: false,
    complaintUpdates: true,
    notices: true,
    marketing: false,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const saveEdit = () => {
    setProfile(editForm);
    localStorage.setItem(
      'cv_auth',
      JSON.stringify({
        name: editForm.name,
        collegeId: editForm.collegeId,
        academicYear: editForm.academicYear,
        department: editForm.department,
        semester: editForm.semester,
        email: editForm.email,
      }),
    );
    setEditOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('cv_auth');
    navigate('/login', { replace: true });
  };

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass shadow-card border border-navy-100"
      >
        <div className="h-40 sm:h-48 bg-gradient-brand relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="px-6 sm:px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-14 md:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-brand text-white flex items-center justify-center font-black text-4xl shadow-glow ring-8 ring-white">
                  {initials}
                </div>
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  aria-label="Change photo"
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-2xl bg-white text-navy-700 border border-navy-100 shadow-card flex items-center justify-center hover:bg-navy-50"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
              </div>
              <div className="pb-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-navy-950 mb-1">
                  {profile.name}
                </h1>
                <p className="text-navy-600 mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <FiFileText className="w-4 h-4" /> {profile.collegeId}
                  </span>
                  <span className="text-navy-300">•</span>
                  <span>{profile.department}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy-100 text-navy-700">
                    {profile.academicYear}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                    {profile.semester}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center gap-1.5">
                    <FiCheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pb-1">
              <Button
                variant="secondary"
                size="md"
                iconLeft={<FiEdit3 className="w-4 h-4" />}
                onClick={() => {
                  setEditForm(profile);
                  setEditOpen(true);
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="secondary"
                size="md"
                iconLeft={<FiLogOut className="w-4 h-4" />}
                onClick={() => setLogoutOpen(true)}
                className="!bg-rose-50 !text-rose-700 !border-rose-200 hover:!bg-rose-100"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-3xl glass shadow-card border border-navy-100 relative overflow-hidden group hover:-translate-y-1 transition-transform"
          >
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-lg mb-3`}>
              <s.Icon className="w-5.5 h-5.5" />
            </div>
            <p className="text-3xl font-black text-navy-900 leading-none mb-1">{s.value}</p>
            <p className="text-xs font-bold text-navy-500 uppercase tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="p-6 sm:p-8 rounded-3xl glass shadow-card border border-navy-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-navy-900 tracking-tight flex items-center gap-2">
                <FiUser className="w-5 h-5 text-navy-500" /> Personal Information
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditForm(profile);
                  setEditOpen(true);
                }}
                className="text-xs font-bold text-navy-600 hover:text-navy-900 inline-flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-white"
              >
                <FiEdit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {[
                { label: 'Full Name', value: profile.name, Icon: FiUser },
                { label: 'College ID', value: profile.collegeId, Icon: FiAward },
                { label: 'Department', value: profile.department, Icon: FiBookOpen },
                { label: 'Academic Year', value: profile.academicYear, Icon: FiCalendar },
                { label: 'Semester', value: profile.semester, Icon: FiFileText },
                { label: 'Email', value: profile.email, Icon: FiMail },
                { label: 'Phone', value: profile.phone, Icon: FiSmartphone },
                { label: 'Date of Birth', value: profile.dob, Icon: FiCalendar },
                { label: 'Gender', value: profile.gender, Icon: FiUser },
                { label: 'Address', value: profile.address, Icon: FiGlobe },
              ].map((f) => (
                <div key={f.label} className="p-3 rounded-2xl bg-white/60 border border-navy-100">
                  <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-1">
                    <f.Icon className="w-3.5 h-3.5" /> {f.label}
                  </dt>
                  <dd className="font-bold text-navy-800 truncate">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl glass shadow-card border border-navy-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-navy-900 tracking-tight flex items-center gap-2">
                <FiBell className="w-5 h-5 text-navy-500" /> Notification Preferences
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { key: 'complaintUpdates', label: 'Complaint Status Updates', desc: 'Emails & in-app notifications when your complaints move to a new stage.', Icon: FiFileText },
                { key: 'notices', label: 'Campus Notices & Announcements', desc: 'Alerts when important college, hostel or mess notices are published.', Icon: FiBookOpen },
                { key: 'push', label: 'In-App Push Notifications', desc: 'Real-time push notifications while the portal is open.', Icon: FiSmartphone },
                { key: 'sms', label: 'SMS Alerts for Urgent Matters', desc: 'Text messages for complaints marked Urgent or Escalated.', Icon: FiSmartphone },
                { key: 'marketing', label: 'Product Updates & Feedback', desc: 'Occasional surveys and portal improvement updates.', Icon: FiGlobe },
              ].map((p) => (
                <label
                  key={p.key}
                  className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-navy-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center shrink-0">
                      <p.Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="font-bold text-navy-900">{p.label}</p>
                      <p className="text-xs text-navy-500 leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                  <div
                    role="switch"
                    aria-checked={notifs[p.key]}
                    onClick={() => setNotifs((prev) => ({ ...prev, [p.key]: !prev[p.key] }))}
                    className={`relative w-12 h-7 rounded-full transition-colors ${notifs[p.key] ? 'bg-gradient-brand' : 'bg-navy-200'
                      }`}
                  >
                    <motion.span
                      animate={{ x: notifs[p.key] ? 22 : 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-3xl glass shadow-card border border-navy-100">
            <h3 className="font-black text-navy-900 mb-4 flex items-center gap-2">
              <FiSettings className="w-5 h-5 text-navy-500" /> Account Settings
            </h3>
            <div className="space-y-1.5">
              {[
                { label: 'Change Password', Icon: FiLock, desc: 'Update your login password' },
                { label: 'Privacy & Security', Icon: FiShield, desc: 'Manage account privacy' },
                { label: 'Connected Devices', Icon: FiSmartphone, desc: 'See active sessions' },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  className="w-full text-left p-3 rounded-2xl hover:bg-white hover:shadow-card transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center shrink-0">
                    <o.Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy-800 truncate">{o.label}</p>
                    <p className="text-xs text-navy-500 truncate">{o.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 text-white shadow-glow">
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <FiShield className="w-8 h-8 mb-3 text-white/90" />
              <h3 className="text-lg font-black mb-1">Account Verified & Secure</h3>
              <p className="text-sm text-white/85 leading-relaxed mb-4">
                Your account uses 256-bit encrypted access. Complaints marked
                sensitive are only visible to you and the assigned department.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'Email verified',
                  'College ID authenticated',
                  'Password last changed 60d ago',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass shadow-card border border-navy-100">
            <h3 className="font-black text-navy-900 mb-4">CampusVoice Credits</h3>
            <div className="text-center p-4 rounded-2xl bg-gradient-soft border border-navy-100">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
                Student Trust Score
              </p>
              <p className="text-5xl font-black text-gradient leading-none mb-2">92</p>
              <p className="text-xs text-navy-500">Great standing • All complaints genuine</p>
            </div>
          </div>
        </motion.aside>
      </section>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Profile"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveEdit}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm">
          {[
            { k: 'name', label: 'Full Name', type: 'text' },
            { k: 'collegeId', label: 'College ID', type: 'text' },
            { k: 'email', label: 'Email', type: 'email' },
            { k: 'phone', label: 'Phone', type: 'tel' },
            { k: 'semester', label: 'Semester', type: 'text' },
            { k: 'address', label: 'Address', type: 'text' },
          ].map((f) => (
            <div key={f.k} className="space-y-1.5">
              <label htmlFor={`edit-${f.k}`} className="text-xs font-bold uppercase tracking-wider text-navy-500">
                {f.label}
              </label>
              <input
                id={`edit-${f.k}`}
                type={f.type}
                value={editForm[f.k]}
                onChange={(e) => setEditForm((p) => ({ ...p, [f.k]: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15 bg-white outline-none transition-all font-medium"
              />
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out of CampusVoice?"
      >
        <p className="text-navy-600 mb-6">
          You'll need to enter your College ID and academic year again to sign
          back in. Your complaint history and notifications will be preserved.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setLogoutOpen(false)}>
            Stay Logged In
          </Button>
          <Button
            variant="primary"
            onClick={logout}
            className="!bg-rose-500 hover:!bg-rose-600 !shadow-rose-200"
            iconLeft={<FiLogOut className="w-4 h-4" />}
          >
            Log Out
          </Button>
        </div>
      </Modal>
    </div>
  );
}
