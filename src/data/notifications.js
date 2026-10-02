const now = new Date('2026-10-02T10:00:00');

function minsAgo(m) {
  const date = new Date(now);
  date.setMinutes(date.getMinutes() - m);
  return date;
}
function hoursAgo(h) {
  const date = new Date(now);
  date.setHours(date.getHours() - h);
  return date;
}
function daysAgo(d) {
  const date = new Date(now);
  date.setDate(date.getDate() - d);
  return date;
}

function fmt(date) {
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export const notificationsData = [
  {
    id: 'NTF-1025',
    type: 'complaint',
    title: 'Complaint Updated',
    message:
      'Your Hostel complaint CMP-2026-00452 has moved to "Under Review". Maintenance team has been assigned.',
    referenceId: 'CMP-2026-00452',
    link: '/complaints/CMP-2026-00452',
    read: false,
    time: minsAgo(2),
    displayTime: fmt(minsAgo(2)),
  },
  {
    id: 'NTF-1024',
    type: 'complaint',
    title: 'Complaint Assigned',
    message:
      'Your complaint CMP-2026-00435 (Lab computers outdated) has been escalated to the Principal Office for budget approval.',
    referenceId: 'CMP-2026-00435',
    link: '/complaints/CMP-2026-00435',
    read: false,
    time: hoursAgo(3),
    displayTime: fmt(hoursAgo(3)),
  },
  {
    id: 'NTF-1023',
    type: 'notice',
    title: 'New College Notice',
    message:
      'End-Semester Examination Time Table Released for Odd Semester 2026-2027. View the complete schedule on the notice board.',
    referenceId: 'NTC-2026-0219',
    link: '/notices',
    read: false,
    time: hoursAgo(5),
    displayTime: fmt(hoursAgo(5)),
  },
  {
    id: 'NTF-1022',
    type: 'notice',
    title: 'New Hostel Notice',
    message:
      'Water pipeline repair in Hostel Block B is complete. Normal water supply restored for all floors.',
    referenceId: 'NTC-2026-0220',
    link: '/notices',
    read: false,
    time: hoursAgo(8),
    displayTime: fmt(hoursAgo(8)),
  },
  {
    id: 'NTF-1021',
    type: 'complaint',
    title: 'Additional Information Required',
    message:
      'Your complaint CMP-2026-00430 (Bus late every morning) requires additional route details. Please update the complaint.',
    referenceId: 'CMP-2026-00430',
    link: '/complaints/CMP-2026-00430',
    read: false,
    time: daysAgo(1),
    displayTime: fmt(daysAgo(1)),
  },
  {
    id: 'NTF-1020',
    type: 'complaint',
    title: 'Complaint Resolved',
    message:
      'Great news! Your complaint CMP-2026-00410 (Wi-Fi connectivity issues in Block C) has been resolved. Network connectivity is fully restored.',
    referenceId: 'CMP-2026-00410',
    link: '/complaints/CMP-2026-00410',
    read: true,
    time: daysAgo(28),
    displayTime: fmt(daysAgo(28)),
  },
  {
    id: 'NTF-1019',
    type: 'complaint',
    title: 'Complaint Assigned',
    message:
      'Your complaint CMP-2026-00430 has been assigned to the Transport Department for review.',
    referenceId: 'CMP-2026-00430',
    link: '/complaints/CMP-2026-00430',
    read: true,
    time: daysAgo(7),
    displayTime: fmt(daysAgo(7)),
  },
  {
    id: 'NTF-1018',
    type: 'notice',
    title: 'Sports Department Notice',
    message:
      'Registrations open for Inter-College Sports Tournament. Register by 10th October.',
    referenceId: 'NTC-2026-0218',
    link: '/notices',
    read: true,
    time: daysAgo(3),
    displayTime: fmt(daysAgo(3)),
  },
  {
    id: 'NTF-1017',
    type: 'system',
    title: 'Welcome to CampusVoice',
    message:
      'Your student grievance portal is now active. Start submitting complaints and track their status.',
    referenceId: null,
    link: '/dashboard',
    read: true,
    time: daysAgo(60),
    displayTime: fmt(daysAgo(60)),
  },
  {
    id: 'NTF-1016',
    type: 'complaint',
    title: 'Complaint Submitted',
    message:
      'Your complaint CMP-2026-00340 has been submitted successfully and will be reviewed shortly.',
    referenceId: 'CMP-2026-00340',
    link: '/complaints/CMP-2026-00340',
    read: true,
    time: daysAgo(1),
    displayTime: fmt(daysAgo(1)),
  },
];
