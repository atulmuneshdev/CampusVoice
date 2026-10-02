import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheckCircle,
  FiLogIn,
  FiChevronDown,
  FiArrowLeft,
  FiLock,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';
import Button from '../components/Button';

const academicYears = ['2023-2027', '2024-2028', '2025-2029', '2026-2030'];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collegeId: 'CSE20260045',
    academicYear: '2026-2030',
    password: '********',
    remember: true,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.collegeId || !form.academicYear || !form.password) {
      setError('Please fill in all fields to continue.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const profile = {
        name: 'Atul Munesh',
        collegeId: form.collegeId,
        academicYear: form.academicYear,
        department: 'Computer Science & Engineering',
        semester: '1st Semester',
        email: 'atul@example.com',
      };
      localStorage.setItem('cv_auth', JSON.stringify(profile));
      setLoading(false);
      navigate('/dashboard', { replace: true });
    }, 900);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-indigo-400/20 blur-3xl animate-float-slow" />
        <div className="absolute top-40 -right-24 w-[500px] h-[500px] rounded-full bg-violet-400/20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full bg-sky-400/20 blur-3xl animate-float-slow" />
      </div>

      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-5xl grid lg:grid-cols-2 rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-900/10 border border-white/60"
        >
          <div className="relative hidden lg:flex flex-col justify-between p-10 xl:p-12 bg-gradient-brand text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur">
                  <span className="font-black text-xl">CV</span>
                </div>
                <div>
                  <p className="font-black text-xl tracking-tight">CampusVoice</p>
                  <p className="text-[11px] text-white/80 font-semibold tracking-wider uppercase">
                    Grievance Portal
                  </p>
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative space-y-6"
            >
              <h2 className="text-4xl font-black tracking-tight leading-tight">
                Every Complaint Matters.
                <br />
                <span className="text-white/90">Every Voice is Heard.</span>
              </h2>
              <p className="text-white/85 leading-relaxed max-w-md">
                College-verified secure access. Transparent workflows.
                Meaningful resolutions — for hostels, academics, mess,
                transport, and every concern in between.
              </p>
              <ul className="space-y-3 max-w-sm">
                {[
                  'College ID Verified',
                  'Encrypted Student Account',
                  'Audited, Secure Access',
                ].map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur"
                  >
                    <FiCheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span className="text-sm font-semibold">{label}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="relative flex items-center justify-between text-xs text-white/80">
              <p>"Report. Track. Resolve."</p>
              <p className="flex items-center gap-1">
                <FiShield className="w-3.5 h-3.5" /> 256-bit Secure
              </p>
            </div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-xl p-7 sm:p-10 xl:p-12">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-800 mb-6"
            >
              <FiArrowLeft className="w-4 h-4" /> Back to home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-navy-600 leading-relaxed">
                Sign in to access your student grievance portal.
              </p>
            </motion.div>

            <form onSubmit={submit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                <label htmlFor="cid" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-navy-500" /> College ID
                </label>
                <div className="relative">
                  <input
                    id="cid"
                    type="text"
                    autoComplete="username"
                    value={form.collegeId}
                    onChange={(e) => update('collegeId', e.target.value.trim())}
                    placeholder="CSE20260045"
                    className="w-full px-4 py-3.5 pl-11 rounded-2xl border border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15 bg-white outline-none transition-all placeholder:text-navy-400 font-medium"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 font-bold text-xs">
                    ID:
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label htmlFor="ay" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-navy-500" /> Academic Year
                </label>
                <div className="relative">
                  <select
                    id="ay"
                    value={form.academicYear}
                    onChange={(e) => update('academicYear', e.target.value)}
                    className="w-full appearance-none px-4 py-3.5 pr-11 rounded-2xl border border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15 bg-white outline-none transition-all font-medium text-navy-800"
                  >
                    {academicYears.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-2"
              >
                <label htmlFor="pwd" className="text-sm font-bold text-navy-800 flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-navy-500" /> Password
                </label>
                <div className="relative">
                  <input
                    id="pwd"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15 bg-white outline-none transition-all placeholder:text-navy-400 font-medium"
                  />
                  <button
                    type="button"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl hover:bg-navy-100 flex items-center justify-center text-navy-500"
                  >
                    {showPass ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between gap-3 flex-wrap text-sm"
              >
                <label className="inline-flex items-center gap-2 text-navy-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => update('remember', e.target.checked)}
                    className="w-4 h-4 rounded-md text-navy-700 focus:ring-navy-500 border-navy-300"
                  />
                  Remember me
                </label>
                <button type="button" className="text-navy-700 font-semibold hover:text-navy-900 hover:underline">
                  Forgot password?
                </button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  full
                  loading={loading}
                  iconLeft={!loading ? <FiLogIn className="w-5 h-5" /> : null}
                >
                  Sign In to CampusVoice
                </Button>
              </motion.div>

              <p className="text-center text-sm text-navy-500">
                Using your college credentials •{' '}
                <span className="font-semibold text-navy-700">Demo Login: Password is anything</span>
              </p>
            </form>

            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-soft border border-navy-100 grid sm:grid-cols-3 gap-3">
              {[
                { label: 'College ID', _Icon: FiUser },
                { label: 'Student Account', _Icon: FiCheckCircle },
                { label: 'Secure Access', _Icon: FiShield },
              ].map(({ label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white shadow-card border border-navy-100"
                >
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-xs font-bold text-navy-700">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
