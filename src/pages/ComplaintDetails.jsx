import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiFileText,
  FiAward,
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiRepeat,
  FiUser,
  FiFilePlus,
  FiBell,
  FiDownload,
  FiMoreHorizontal,
  FiFile,
  FiImage,
} from 'react-icons/fi';
import Button from '../components/Button';
import ComplaintStatus, { ComplaintPriority, statusConfig } from '../components/ComplaintStatus';
import Timeline, { ProgressTracker } from '../components/Timeline';
import { complaints as defaultComplaints } from '../data/complaints';

const trackerSteps = [
  { label: 'Submitted' },
  { label: 'Under Review' },
  { label: 'Action Taken' },
  { label: 'Resolved' },
];

function resolveIndex(status) {
  switch (status) {
    case 'Pending':
      return 0;
    case 'Under Review':
      return 1;
    case 'Escalated':
      return 2;
    case 'Resolved':
      return 4;
    case 'Rejected':
      return 4;
    default:
      return 0;
  }
}

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let found = null;
    try {
      const stored = JSON.parse(localStorage.getItem('cv_complaints') || '[]');
      found = stored.find((c) => c.id === id);
    } catch {
      /* ignore */
    }
    if (!found) {
      found = defaultComplaints.find((c) => c.id === id);
    }
    setTimeout(() => {
      setComplaint(found);
      setLoading(false);
    }, 300);
  }, [id]);

  const currentTracker = useMemo(() => {
    if (!complaint) return 0;
    const idx = resolveIndex(complaint.status);
    if (idx === 0) return 1;
    if (idx === 1) return 2;
    if (idx === 2) return 3;
    if (idx === 4) return 4;
    return 3;
  }, [complaint]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-52 rounded-2xl bg-white/70 animate-pulse" />
        <div className="h-40 rounded-3xl bg-white/70 animate-pulse" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="h-96 lg:col-span-2 rounded-3xl bg-white/70 animate-pulse" />
          <div className="h-96 rounded-3xl bg-white/70 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="rounded-3xl glass p-12 text-center border border-navy-100">
        <h3 className="text-2xl font-black text-navy-900 mb-2">Complaint not found</h3>
        <p className="text-navy-600 mb-6">
          The complaint you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/complaints">
            <Button variant="primary" iconLeft={<FiArrowLeft className="w-4 h-4" />}>
              Back to Complaints
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const cfg = statusConfig[complaint.status] ?? statusConfig.Pending;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/complaints"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900 px-3 py-2 rounded-xl hover:bg-white hover:shadow-card transition-all border border-transparent hover:border-navy-100 self-start"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Complaints
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" iconLeft={<FiMoreHorizontal className="w-4 h-4" />}>
            Share
          </Button>
          <Link to="/complaints/new">
            <Button variant="primary" size="sm" iconLeft={<FiFilePlus className="w-4 h-4" />}>
              New Complaint
            </Button>
          </Link>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass shadow-card border border-navy-100 p-6 sm:p-8"
      >
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cfg.dot.includes('emerald') ? 'from-emerald-400 to-green-500' : cfg.dot.includes('sky') ? 'from-sky-400 to-blue-500' : cfg.dot.includes('rose') ? 'from-rose-400 to-red-500' : cfg.dot.includes('violet') ? 'from-violet-400 to-purple-500' : 'from-amber-400 to-yellow-500'}`} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                {complaint.id}
              </span>
              <ComplaintStatus status={complaint.status} size="md" />
              <ComplaintPriority priority={complaint.priority} />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-navy-950 leading-tight">
              {complaint.title}
            </h1>
            <p className="text-navy-600 leading-relaxed max-w-3xl whitespace-pre-line">
              {complaint.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FiBookOpen className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Category
                  </p>
                  <p className="text-sm font-bold text-navy-800 truncate">
                    {complaint.category}
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <FiAward className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Location
                  </p>
                  <p className="text-sm font-bold text-navy-800 truncate">
                    {complaint.location}
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FiCalendar className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Submitted
                  </p>
                  <p className="text-sm font-bold text-navy-800 truncate">
                    {complaint.date}
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <FiRepeat className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Last Updated
                  </p>
                  <p className="text-sm font-bold text-navy-800 truncate">
                    {complaint.updatedAt ?? complaint.date}
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/60 border border-navy-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FiUser className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Submitted by
                  </p>
                  <p className="text-sm font-bold text-navy-800 truncate">
                    {complaint.studentName || complaint.timeline?.[0]?.by || 'Anonymous Student'}
                  </p>
                  <p className="text-[11px] font-semibold text-navy-500 truncate">
                    {complaint.studentCollegeId || complaint.studentName ? '' : 'Demo / legacy entry'}
                    {complaint.studentCollegeId ? `ID: ${complaint.studentCollegeId}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {complaint.files && complaint.files.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-bold text-navy-800 mb-3 flex items-center gap-2">
                  <FiFileText className="w-4 h-4 text-navy-500" /> Attached Evidence ({complaint.files.length})
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {complaint.files.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/70 border border-navy-100 flex items-center gap-3 shadow-card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-100 to-violet-100 flex items-center justify-center shrink-0">
                        {f.isImage ? (
                          <FiImage className="w-6 h-6 text-indigo-500" />
                        ) : (
                          <FiFile className="w-6 h-6 text-rose-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-navy-800 truncate">{f.name}</p>
                        <p className="text-xs text-navy-500">
                          {f.size ? `${(f.size / 1024).toFixed(1)} KB` : 'Attached'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-xl hover:bg-navy-100 text-navy-500 hover:text-navy-700 flex items-center justify-center"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="p-5 rounded-3xl bg-gradient-brand text-white shadow-glow overflow-hidden relative">
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Quick Status
                </p>
                <div className="text-3xl font-black mb-3 tracking-tight">
                  {complaint.status}
                </div>
                <p className="text-sm text-white/85 leading-relaxed">
                  {complaint.status === 'Resolved'
                    ? 'Great news! Your complaint has been resolved. View details below.'
                    : complaint.status === 'Rejected'
                      ? 'Your complaint was closed. Please contact support for more info.'
                      : 'Your complaint is being actively worked on. Stand by for updates.'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl glass shadow-card border border-navy-100">
              <h3 className="text-sm font-black uppercase tracking-wider text-navy-500 mb-1">
                Assigned To
              </h3>
              <div className="flex items-center gap-3 py-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-navy-500 to-violet-500 text-white flex items-center justify-center font-black shadow-lg">
                  HA
                </div>
                <div>
                  <p className="font-bold text-navy-900">
                    {complaint.category} Administration
                  </p>
                  <p className="text-xs text-navy-500">
                    <FiUser className="w-3 h-3 inline mr-1" />
                    Concerned Department
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl glass shadow-card border border-navy-100">
              <h3 className="text-sm font-black uppercase tracking-wider text-navy-500 mb-4">
                Progress Tracker
              </h3>
              <ProgressTracker steps={trackerSteps} currentIndex={currentTracker} />
            </div>
          </aside>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 rounded-3xl glass shadow-card border border-navy-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-navy-900 tracking-tight mb-1">
                Complaint Timeline
              </h2>
              <p className="text-sm text-navy-500">
                Every update from submission to resolution
              </p>
            </div>
            <FiBell className="w-5 h-5 text-navy-400" />
          </div>
          {complaint.timeline && complaint.timeline.length > 0 ? (
            <Timeline items={complaint.timeline} />
          ) : (
            <p className="text-navy-500 text-sm p-6 text-center rounded-2xl bg-navy-50">
              Timeline events will appear once the complaint is reviewed.
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="p-6 rounded-3xl glass shadow-card border border-navy-100">
            <h3 className="font-black text-navy-900 mb-4 flex items-center gap-2">
              <FiAlertCircle className="w-5 h-5 text-navy-500" /> Need help?
            </h3>
            <ul className="space-y-3 text-sm text-navy-600">
              <li>Have new info? Reply to the latest notification email.</li>
              <li>Escalate by contacting Student Support directly.</li>
              <li>Allow 24-48 hours for initial acknowledgement.</li>
            </ul>
          </div>
          <Button
            variant="secondary"
            full
            size="md"
            iconLeft={<FiBell className="w-4 h-4" />}
            onClick={() => navigate('/help')}
          >
            Contact Support
          </Button>
        </aside>
      </motion.section>
    </div>
  );
}
