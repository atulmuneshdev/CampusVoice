import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheckCircle,
  FiChevronDown,
  FiArrowLeft,
  FiLock,
  FiUser,
  FiMail,
  FiAward,
  FiBookOpen,
  FiSmartphone,
  FiAlertCircle,
  FiCalendar,
} from 'react-icons/fi';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const departments = [
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Chemical Engineering',
  'Biotechnology',
  'Business Administration',
  'General Studies',
];

const courses = ['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA', 'M.Tech', 'M.Sc', 'MBA', 'Diploma'];

const semesters = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
];

const years = ['2023-2027', '2024-2028', '2025-2029', '2026-2030'];

export default function Register() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({
    name: '',
    collegeId: '',
    email: '',
    department: '',
    course: '',
    semester: '',
    year: '2026-2030',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [topError, setTopError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (fieldErrors[k]) {
      setFieldErrors((e) => {
        const next = { ...e };
        delete next[k];
        return next;
      });
    }
  };
  const touch = (k) => setTouched((p) => ({ ...p, [k]: true }));

  const pwTips = useMemo(() => {
    const pw = form.password;
    return [
      { label: 'At least 8 characters', ok: pw.length >= 8 },
      { label: 'Uppercase letter', ok: /[A-Z]/.test(pw) },
      { label: 'Lowercase letter', ok: /[a-z]/.test(pw) },
      { label: 'One digit', ok: /\d/.test(pw) },
    ];
  }, [form.password]);

  const submit = async (e) => {
    e.preventDefault();
    setTopError('');
    setSuccess('');
    const keys = [
      'name', 'collegeId', 'email', 'department', 'course',
      'semester', 'password', 'confirmPassword',
    ];
    setTouched(Object.fromEntries(keys.map((k) => [k, true])));
    setLoading(true);
    const result = await auth.register(form);
    setLoading(false);
    if (!result.ok) {
      setTopError(result.error || 'Registration failed.');
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      return;
    }
    setSuccess('Account created! Redirecting to sign in…');
    setTimeout(() => {
      navigate('/login?registered=1', { replace: true });
    }, 900);
  };

  const err = (k) => (touched[k] && fieldErrors[k]) || fieldErrors[k];
  const errorClass = (k) =>
    err(k)
      ? 'border-rose-400 focus:ring-4 focus:ring-rose-400/15'
      : 'border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-400/15';

  const inputWrap = (id, label, Icon, type = 'text', valueKey, placeholder, extra) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-bold text-navy-800 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-navy-500" />} {label}
      </label>
      <input
        id={id}
        type={type}
        value={form[valueKey]}
        onChange={(ev) => update(valueKey, type === 'email' ? ev.target.value.trim().toLowerCase() : type === 'tel' || type === 'password' ? ev.target.value : type === 'text' && valueKey === 'collegeId' ? ev.target.value.trim().toUpperCase() : ev.target.value)}
        onBlur={() => touch(valueKey)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium ${errorClass(valueKey)} ${extra ? extra : ''}`}
      />
      {err(valueKey) && (
        <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
          <FiAlertCircle className="w-3.5 h-3.5" /> {err(valueKey)}
        </p>
      )}
    </div>
  );

  const selectWrap = (id, label, Icon, valueKey, options, trailingIcon = true) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-bold text-navy-800 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-navy-500" />} {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={form[valueKey]}
          onChange={(e) => update(valueKey, e.target.value)}
          onBlur={() => touch(valueKey)}
          className={`w-full appearance-none px-4 py-3.5 pr-11 rounded-2xl border bg-white outline-none transition-all font-medium text-navy-800 ${errorClass(valueKey)}`}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {trailingIcon && (
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
        )}
      </div>
      {err(valueKey) && (
        <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
          <FiAlertCircle className="w-3.5 h-3.5" /> {err(valueKey)}
        </p>
      )}
    </div>
  );

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
                  <p className="text-[11px] text-white/80 font-semibold tracking-wider uppercase">Grievance Portal</p>
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
                Join CampusVoice.
                <br />
                <span className="text-white/90">Raise your first complaint in minutes.</span>
              </h2>
              <p className="text-white/85 leading-relaxed max-w-md">
                One verified student account. Unlimited submissions. Full transparency
                from filing through resolution.
              </p>
              <ul className="space-y-3 max-w-sm">
                {[
                  'Validated college email required',
                  'College ID uniqueness enforced',
                  'Secure password guidelines',
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
              <p>&quot;Your Voice. Our Responsibility.&quot;</p>
              <p className="flex items-center gap-1">
                <FiShield className="w-3.5 h-3.5" /> 256-bit Secure
              </p>
            </div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-xl p-7 sm:p-10 xl:p-12 max-h-[92vh] lg:max-h-none overflow-y-auto">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-800 mb-6">
              <FiArrowLeft className="w-4 h-4" /> Back to home
            </Link>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-7">
              <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mb-2">
                Create your account
              </h1>
              <p className="text-navy-600 leading-relaxed">
                Register with your college details to start filing complaints.
              </p>
            </motion.div>

            <AnimatePresence>
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5"
                >
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-start gap-2.5">
                    <FiCheckCircle className="w-4.5 h-4.5 mt-0.5 shrink-0 text-emerald-600" />
                    <span>{success}</span>
                  </div>
                </motion.div>
              )}
              {topError && (
                <motion.div
                  key="topError"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-start gap-2.5"
                >
                  <FiAlertCircle className="w-4.5 h-4.5 mt-0.5 shrink-0" />
                  <span>{topError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={submit} className="space-y-4 sm:space-y-5" noValidate>
              {inputWrap('r-name', 'Full Name', FiUser, 'text', 'name', 'Rahul Kumar')}

              <div className="grid sm:grid-cols-2 gap-4">
                {inputWrap('r-cid', 'College ID', FiAward, 'text', 'collegeId', 'CSE20260045')}
                {inputWrap('r-email', 'College Email', FiMail, 'email', 'email', 'rahul@college.edu')}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {selectWrap('r-dept', 'Department', FiBookOpen, 'department', departments)}
                {selectWrap('r-course', 'Course', FiBookOpen, 'course', courses)}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {selectWrap('r-sem', 'Year / Semester', FiCalendar, 'semester', semesters)}
                {selectWrap('r-year', 'Academic Year', FiCalendar, 'year', years)}
              </div>

              {inputWrap('r-phone', 'Phone (optional)', FiSmartphone, 'tel', 'phone', '+91 98765 43210')}

              {(() => {
                const id = 'r-pw';
                const valueKey = 'password';
                return (
                  <div className="space-y-2">
                    <label htmlFor={id} className="text-sm font-bold text-navy-800 flex items-center gap-2">
                      <FiLock className="w-4 h-4 text-navy-500" /> Password
                    </label>
                    <div className="relative">
                      <input
                        id={id}
                        type={showPass ? 'text' : 'password'}
                        value={form[valueKey]}
                        onChange={(e) => update(valueKey, e.target.value)}
                        onBlur={() => touch(valueKey)}
                        placeholder="Create a strong password"
                        className={`w-full px-4 py-3.5 pr-12 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium ${errorClass(valueKey)}`}
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
                    {form.password && (
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1">
                        {pwTips.map((t) => (
                          <li key={t.label} className={`text-[11px] font-semibold flex items-center gap-1.5 ${t.ok ? 'text-emerald-600' : 'text-navy-400'}`}>
                            {t.ok ? <FiCheckCircle className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 rounded-full border border-navy-300 inline-block shrink-0" />}
                            {t.label}
                          </li>
                        ))}
                      </ul>
                    )}
                    {err(valueKey) && (
                      <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5 pt-0.5">
                        <FiAlertCircle className="w-3.5 h-3.5" /> {err(valueKey)}
                      </p>
                    )}
                  </div>
                );
              })()}

              {(() => {
                const id = 'r-pwc';
                const valueKey = 'confirmPassword';
                const mismatch =
                  form.confirmPassword && form.password && form.confirmPassword !== form.password;
                return (
                  <div className="space-y-2">
                    <label htmlFor={id} className="text-sm font-bold text-navy-800 flex items-center gap-2">
                      <FiLock className="w-4 h-4 text-navy-500" /> Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id={id}
                        type={showConfirm ? 'text' : 'password'}
                        value={form[valueKey]}
                        onChange={(e) => update(valueKey, e.target.value)}
                        onBlur={() => touch(valueKey)}
                        placeholder="Re-enter your password"
                        className={`w-full px-4 py-3.5 pr-12 rounded-2xl border bg-white outline-none transition-all placeholder:text-navy-400 font-medium ${mismatch || err(valueKey) ? 'border-rose-400 focus:ring-4 focus:ring-rose-400/15' : errorClass(valueKey)}`}
                      />
                      <button
                        type="button"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl hover:bg-navy-100 flex items-center justify-center text-navy-500"
                      >
                        {showConfirm ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                    {mismatch && (
                      <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                        <FiAlertCircle className="w-3.5 h-3.5" /> Passwords do not match.
                      </p>
                    )}
                    {!mismatch && err(valueKey) && (
                      <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                        <FiAlertCircle className="w-3.5 h-3.5" /> {err(valueKey)}
                      </p>
                    )}
                  </div>
                );
              })()}

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  full
                  loading={loading}
                  iconLeft={!loading ? <FiCheckCircle className="w-5 h-5" /> : null}
                >
                  Create CampusVoice Account
                </Button>
              </motion.div>

              <p className="text-center text-sm text-navy-500">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-navy-700 hover:text-navy-900 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
