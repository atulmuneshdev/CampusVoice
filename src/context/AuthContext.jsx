import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

const COLLEGE_ID_RE = /^[A-Z]{2,4}\d{6,8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCollegeId(id) {
    if (!id || !id.trim()) return 'College ID is required.';
    if (!COLLEGE_ID_RE.test(id.trim().toUpperCase())) return 'Use format like CSE20260045 (dept prefix + 6-8 digits).';
    return '';
}

export function validateEmail(email) {
    if (!email || !email.trim()) return 'Email is required.';
    if (!EMAIL_RE.test(email.trim())) return 'Enter a valid college email address.';
    return '';
}

export function validatePassword(pw) {
    if (!pw) return 'Password is required.';
    if (pw.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(pw)) return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(pw)) return 'Password must include at least one lowercase letter.';
    if (!/\d/.test(pw)) return 'Password must include at least one digit.';
    return '';
}

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return parsed;
    } catch {
        return fallback;
    }
}

function writeJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage full / disabled */
    }
}

function makeDemoProfile(collegeId, academicYear) {
    const id = collegeId || 'CSE20260045';
    const deptMap = { CSE: 'Computer Science & Engineering', ECE: 'Electronics & Communication', EEE: 'Electrical & Electronics', ME: 'Mechanical Engineering', CE: 'Civil Engineering' };
    const prefix = id.slice(0, 3).toUpperCase();
    const fullPrefix = id.slice(0, 4).toUpperCase();
    const department = deptMap[fullPrefix] || deptMap[prefix] || 'Computer Science & Engineering';
    return {
        name: 'Demo Student',
        collegeId: id,
        academicYear: academicYear || '2026-2030',
        department,
        semester: '1st Semester',
        email: `${id.toLowerCase()}@campusvoice.edu`,
    };
}

export function filterComplaintsByUser(list, user) {
    if (!user) return [];
    const uid = String(user.collegeId || '').toLowerCase();
    const uname = String(user.name || '').toLowerCase();
    return (list || []).filter((c) => {
        if (c.studentCollegeId) {
            return String(c.studentCollegeId).toLowerCase() === uid;
        }
        const firstBy = c.timeline?.[0]?.by;
        if (!firstBy) return false;
        return String(firstBy).toLowerCase() === uname;
    });
}

function users() { return readJSON('cv_users', []); }

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const profile = readJSON('cv_auth', null);
        if (profile && profile.name && profile.collegeId) {
            setUser(profile);
        } else {
            setUser(null);
        }
        setLoadingAuth(false);
    }, []);

    const isAuthenticated = !!user;

    const login = useCallback((collegeId, password, academicYear) => {
        const cleanId = String(collegeId || '').trim().toUpperCase();
        const cleanPw = String(password || '');
        const year = academicYear || '';

        if (!cleanId) return { ok: false, error: 'College ID is required.' };
        if (!cleanPw) return { ok: false, error: 'Password is required.' };

        const all = users();

        if (all.length === 0) {
            const profile = makeDemoProfile(cleanId, year);
            writeJSON('cv_auth', profile);
            setUser(profile);
            return { ok: true };
        }

        const match = all.find(
            (u) => String(u.collegeId || '').toUpperCase() === cleanId,
        );
        if (!match) return { ok: false, error: 'College ID not registered yet.' };
        if (match.password !== cleanPw) return { ok: false, error: 'Incorrect password.' };

        const profile = {
            name: match.name,
            collegeId: match.collegeId,
            academicYear: year || match.year || match.academicYear || '2026-2030',
            department: match.department || 'General Studies',
            semester: match.semester || '1st Semester',
            email: match.email,
            phone: match.phone,
            course: match.course,
        };
        writeJSON('cv_auth', profile);
        setUser(profile);
        return { ok: true };
    }, []);

    const register = useCallback((fields) => {
        const fieldErrors = {};
        if (!fields.name || !fields.name.trim()) fieldErrors.name = 'Full name is required.';
        const idErr = validateCollegeId(fields.collegeId);
        if (idErr) fieldErrors.collegeId = idErr;
        const emailErr = validateEmail(fields.email);
        if (emailErr) fieldErrors.email = emailErr;
        const pwErr = validatePassword(fields.password);
        if (pwErr) fieldErrors.password = pwErr;
        if (!fields.confirmPassword) fieldErrors.confirmPassword = 'Please confirm your password.';
        else if (fields.confirmPassword !== fields.password) fieldErrors.confirmPassword = 'Passwords do not match.';
        if (!fields.department) fieldErrors.department = 'Please select your department.';
        if (!fields.course) fieldErrors.course = 'Please select your course.';
        if (!fields.semester) fieldErrors.semester = 'Please select year/semester.';

        if (Object.keys(fieldErrors).length > 0) {
            return { ok: false, error: 'Please fix the highlighted fields.', fieldErrors };
        }

        const all = users();
        const cleanId = String(fields.collegeId).trim().toUpperCase();
        const cleanEmail = String(fields.email).trim().toLowerCase();

        if (all.some((u) => String(u.collegeId).toUpperCase() === cleanId)) {
            fieldErrors.collegeId = 'This College ID is already registered.';
            return { ok: false, error: 'College ID already in use.', fieldErrors };
        }
        if (all.some((u) => String(u.email).toLowerCase() === cleanEmail)) {
            fieldErrors.email = 'This email is already registered.';
            return { ok: false, error: 'Email already in use.', fieldErrors };
        }

        const record = {
            name: String(fields.name).trim(),
            collegeId: cleanId,
            email: cleanEmail,
            password: String(fields.password),
            department: String(fields.department),
            course: String(fields.course),
            semester: String(fields.semester),
            year: String(fields.year || fields.academicYear || '2026-2030'),
            phone: fields.phone ? String(fields.phone).trim() : '',
            createdAt: new Date().toISOString(),
        };
        all.push(record);
        writeJSON('cv_users', all);
        return { ok: true };
    }, []);

    const logout = useCallback(() => {
        try { localStorage.removeItem('cv_auth'); } catch { /* noop */ }
        setUser(null);
    }, []);

    const updateProfile = useCallback((partial) => {
        setUser((prev) => {
            if (!prev) return prev;
            const next = { ...prev, ...partial };
            writeJSON('cv_auth', next);
            return next;
        });
    }, []);

    const value = useMemo(
        () => ({ user, isAuthenticated, loadingAuth, login, register, logout, updateProfile }),
        [user, isAuthenticated, loadingAuth, login, register, logout, updateProfile],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        return { user: null, isAuthenticated: false, loadingAuth: false, login: async () => ({ ok: false }), register: async () => ({ ok: false }), logout: () => {}, updateProfile: () => {} };
    }
    return ctx;
}

export function RequireAuth({ children }) {
    const { user, loadingAuth } = useAuth();
    if (loadingAuth) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export function RedirectIfAuthed({ children }) {
    const { user, loadingAuth } = useAuth();
    if (loadingAuth) return null;
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
}
