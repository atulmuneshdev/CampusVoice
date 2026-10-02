const now = new Date('2026-10-02T10:00:00');

function daysAgo(d, h = 10, m = 0) {
  const date = new Date(now);
  date.setDate(date.getDate() - d);
  date.setHours(h, m, 0, 0);
  const opts = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', opts);
}

function dt(d, h, m) {
  const date = new Date(now);
  date.setDate(date.getDate() - d);
  date.setHours(h, m, 0, 0);
  return date;
}

export const complaints = [
  {
    id: 'CMP-2026-00452',
    title: 'Water supply problem in Hostel Block B',
    category: 'Hostel',
    categoryId: 'hostel',
    location: 'Hostel Block B - 2nd Floor, Room 214',
    status: 'Under Review',
    priority: 'Important',
    date: daysAgo(4),
    updatedAt: daysAgo(2),
    description:
      'There has been a continuous issue with the water supply in Hostel Block B for the past 3 days. Water pressure is extremely low and sometimes there is no water at all during morning hours. This is causing severe inconvenience to students residing on the 2nd floor. The issue usually occurs between 7 AM to 10 AM and again between 6 PM to 9 PM, coinciding with peak usage hours.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(4, 10, 32), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Hostel Administration', date: dt(4, 13, 20), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(3, 11, 45), by: 'Hostel Warden', status: 'done' },
      { title: 'Maintenance Team Assigned', date: dt(2, 9, 20), by: 'Hostel Warden', status: 'active' },
      { title: 'Resolution Pending', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00448',
    title: 'Food quality and hygiene in college mess',
    category: 'Mess',
    categoryId: 'mess',
    location: 'Central Mess - Block A',
    status: 'Resolved',
    priority: 'Normal',
    date: daysAgo(12),
    updatedAt: daysAgo(6),
    description:
      'The quality of food served in the central mess has deteriorated over the past week. There have been multiple instances of stale chapattis and the vegetables are overcooked. Hygiene standards need to be improved as some students reported finding insects in the salad served during lunch.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(12, 9, 10), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Mess Committee', date: dt(12, 11, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(11, 14, 30), by: 'Mess In-Charge', status: 'done' },
      { title: 'Action Taken - Inspection Completed', date: dt(9, 10, 0), by: 'Mess In-Charge', status: 'done' },
      { title: 'Resolved - New Catering Supervisor Appointed', date: dt(6, 15, 0), by: 'Dean of Students', status: 'done' },
    ],
  },
  {
    id: 'CMP-2026-00440',
    title: 'Library AC not working properly',
    category: 'College',
    categoryId: 'college',
    location: 'Central Library - Reading Hall 2',
    status: 'Resolved',
    priority: 'Normal',
    date: daysAgo(20),
    updatedAt: daysAgo(14),
    description:
      'The air conditioning system in Reading Hall 2 of the Central Library is not working properly. Despite the outside temperature being above 35°C, the hall remains warm and uncomfortable for studying. Many students have moved to other reading areas due to this issue.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(20, 14, 5), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to College Infrastructure', date: dt(20, 15, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(19, 10, 30), by: 'Facilities Department', status: 'done' },
      { title: 'Maintenance Team Dispatched', date: dt(17, 8, 0), by: 'Facilities Department', status: 'done' },
      { title: 'Resolved - AC Serviced & Repaired', date: dt(14, 11, 0), by: 'Facilities Department', status: 'done' },
    ],
  },
  {
    id: 'CMP-2026-00435',
    title: 'Lab computers outdated and slow',
    category: 'Academic',
    categoryId: 'academic',
    location: 'Computer Lab - 301, Block C',
    status: 'Escalated',
    priority: 'Urgent',
    date: daysAgo(25),
    updatedAt: daysAgo(3),
    description:
      'The computers in Computer Lab 301 are running on outdated hardware and are extremely slow. Running basic programming IDEs like VS Code or IntelliJ causes the systems to hang for long periods. We require an urgent upgrade for the upcoming lab practicals and semester project work.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(25, 9, 0), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to CS Department', date: dt(25, 10, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(23, 14, 30), by: 'HOD - CSE', status: 'done' },
      { title: 'Escalated to Principal Office', date: dt(3, 11, 0), by: 'HOD - CSE', status: 'active' },
      { title: 'Awaiting Budget Approval', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00430',
    title: 'College bus late every morning',
    category: 'Transport',
    categoryId: 'transport',
    location: 'Route 5 - North Campus',
    status: 'Under Review',
    priority: 'Important',
    date: daysAgo(8),
    updatedAt: daysAgo(4),
    description:
      'The morning Route 5 college bus from North Campus has been arriving consistently late for the past 2 weeks, making it 20-30 minutes late to college. Many students relying on this bus are missing their first-period lectures and practicals.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(8, 7, 30), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Transport Department', date: dt(8, 9, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(4, 14, 0), by: 'Transport Officer', status: 'active' },
      { title: 'Action Taken', date: null, by: null, status: 'pending' },
      { title: 'Resolution', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00422',
    title: 'Sports equipment shortage in gym',
    category: 'Games & Sports',
    categoryId: 'sports',
    location: 'College Gymnasium, Sports Complex',
    status: 'Pending',
    priority: 'Normal',
    date: daysAgo(5),
    updatedAt: daysAgo(5),
    description:
      'The college gymnasium is severely short on equipment. There are only 2 functional dumbbell sets, no bench press setup, and the treadmills are constantly out of order. With over 500 students using the facility, it is impossible to get a proper workout.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(5, 16, 15), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Sports Department', date: dt(5, 16, 45), by: 'System', status: 'active' },
      { title: 'Complaint Under Review', date: null, by: null, status: 'pending' },
      { title: 'Action Taken', date: null, by: null, status: 'pending' },
      { title: 'Resolution', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00410',
    title: 'Wi-Fi connectivity issues in Block C',
    category: 'College',
    categoryId: 'college',
    location: 'Academic Block C - All floors',
    status: 'Resolved',
    priority: 'Urgent',
    date: daysAgo(35),
    updatedAt: daysAgo(28),
    description:
      'The Wi-Fi in Academic Block C keeps dropping connection every few minutes. It is nearly impossible to attend online lectures or complete coursework on campus labs. The issue seems to affect all devices connected to the network.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(35, 10, 0), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to IT Department', date: dt(35, 11, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(34, 14, 0), by: 'Network Admin', status: 'done' },
      { title: 'Routers Replaced & Network Reconfigured', date: dt(30, 9, 0), by: 'IT Department', status: 'done' },
      { title: 'Resolved - Full Network Connectivity Restored', date: dt(28, 15, 30), by: 'IT Department', status: 'done' },
    ],
  },
  {
    id: 'CMP-2026-00395',
    title: 'Excessive deduction from mess bill',
    category: 'Mess',
    categoryId: 'mess',
    location: 'Central Mess - Accounts',
    status: 'Rejected',
    priority: 'Important',
    date: daysAgo(45),
    updatedAt: daysAgo(40),
    description:
      'I was charged for extra meals in the last mess bill despite having been on leave for 7 days. I submitted a leave application to the hostel office before leaving. The excess deduction amounts to ₹1,400.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(45, 13, 0), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Mess Accounts', date: dt(45, 14, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(43, 10, 0), by: 'Mess Accounts', status: 'done' },
      { title: 'Records Verified', date: dt(41, 16, 0), by: 'Mess Accounts', status: 'done' },
      {
        title: 'Rejected - Leave records not submitted to mess office',
        date: dt(40, 11, 30),
        by: 'Chief Warden',
        status: 'done',
      },
    ],
  },
  {
    id: 'CMP-2026-00380',
    title: 'Suggestion: Extended library hours during exams',
    category: 'Other',
    categoryId: 'other',
    location: 'Central Library',
    status: 'Pending',
    priority: 'Normal',
    date: daysAgo(6),
    updatedAt: daysAgo(6),
    description:
      'This is a suggestion rather than a complaint. As end-semester exams are approaching, I request the library to be open until midnight (12:00 AM) instead of the current 10:00 PM closing time. Many students would benefit from extra study hours.',
    timeline: [
      { title: 'Suggestion Submitted', date: dt(6, 18, 30), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Library Committee', date: dt(6, 19, 0), by: 'System', status: 'active' },
      { title: 'Under Review', date: null, by: null, status: 'pending' },
      { title: 'Decision Pending', date: null, by: null, status: 'pending' },
      { title: 'Final Outcome', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00360',
    title: 'Hostel room door lock broken',
    category: 'Hostel',
    categoryId: 'hostel',
    location: 'Hostel Block B - Room 214',
    status: 'Resolved',
    priority: 'Urgent',
    date: daysAgo(60),
    updatedAt: daysAgo(58),
    description:
      'The main door lock of my room is broken and does not latch properly. This is a serious security concern as I often leave my room for classes with valuable belongings inside.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(60, 7, 0), by: 'Atul Munesh', status: 'done' },
      { title: 'Assigned to Hostel Maintenance', date: dt(60, 8, 0), by: 'System', status: 'done' },
      { title: 'Complaint Under Review', date: dt(60, 10, 0), by: 'Hostel Warden', status: 'done' },
      { title: 'Carpenter Dispatched', date: dt(60, 13, 0), by: 'Hostel Warden', status: 'done' },
      { title: 'Resolved - Lock Replaced', date: dt(58, 16, 0), by: 'Hostel Warden', status: 'done' },
    ],
  },
  {
    id: 'CMP-2026-00350',
    title: 'Hostel bathroom cleanliness',
    category: 'Hostel',
    categoryId: 'hostel',
    location: 'Hostel Block B - 2nd Floor Bathrooms',
    status: 'Pending',
    priority: 'Normal',
    date: daysAgo(3),
    updatedAt: daysAgo(3),
    description:
      'The common bathrooms on the 2nd floor of Hostel Block B are not being cleaned regularly. There is visible mold on tiles and drains are often clogged. Please increase cleaning frequency.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(3, 20, 10), by: 'Atul Munesh', status: 'active' },
      { title: 'Assigned to Hostel Administration', date: null, by: null, status: 'pending' },
      { title: 'Complaint Under Review', date: null, by: null, status: 'pending' },
      { title: 'Action Taken', date: null, by: null, status: 'pending' },
      { title: 'Resolution', date: null, by: null, status: 'pending' },
    ],
  },
  {
    id: 'CMP-2026-00340',
    title: 'No hot water in hostel mornings',
    category: 'Hostel',
    categoryId: 'hostel',
    location: 'Hostel Block B - Geysers',
    status: 'Pending',
    priority: 'Important',
    date: daysAgo(1),
    updatedAt: daysAgo(1),
    description:
      'The geysers on the 2nd floor of Hostel Block B have not been providing hot water for the past 3 mornings. Early morning classes start at 8:00 AM and we need hot water for bathing.',
    timeline: [
      { title: 'Complaint Submitted', date: dt(1, 6, 45), by: 'Atul Munesh', status: 'active' },
      { title: 'Assigned to Hostel Administration', date: null, by: null, status: 'pending' },
      { title: 'Complaint Under Review', date: null, by: null, status: 'pending' },
      { title: 'Action Taken', date: null, by: null, status: 'pending' },
      { title: 'Resolution', date: null, by: null, status: 'pending' },
    ],
  },
];
