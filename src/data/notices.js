const now = new Date('2026-10-02T10:00:00');

function daysAgo(d, h = 10, m = 0) {
  const date = new Date(now);
  date.setDate(date.getDate() - d);
  date.setHours(h, m, 0, 0);
  const opts = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', opts);
}

export const notices = [
  {
    id: 'NTC-2026-0220',
    title: 'Hostel Block B Water Maintenance',
    category: 'Hostel',
    description:
      'The maintenance team has completed the water pipeline repair in Hostel Block B. Normal water supply has been restored for all floors. We regret the inconvenience caused over the past week and appreciate your patience.',
    date: daysAgo(2, 11, 0),
    pinned: true,
    isNew: true,
    priority: 'Important',
  },
  {
    id: 'NTC-2026-0219',
    title: 'End-Semester Examination Time Table Released',
    category: 'Academic',
    description:
      'The end-semester examination timetable for Odd Semester 2026-2027 has been published on the college website. Exams commence from 15th November 2026. Students are advised to check the schedule carefully and report any clashes within 5 working days.',
    date: daysAgo(1, 15, 30),
    pinned: true,
    isNew: true,
    priority: 'Important',
  },
  {
    id: 'NTC-2026-0218',
    title: 'Inter-College Sports Tournament - Registration Open',
    category: 'Sports',
    description:
      'Registrations for the Annual Inter-College Sports Tournament 2026 are now open. The tournament will be held from 20th October to 3rd November. Students interested in participating in Athletics, Basketball, Cricket, Football, or Volleyball can register through the sports department portal by 10th October.',
    date: daysAgo(3, 9, 0),
    pinned: false,
    isNew: false,
    priority: 'Normal',
  },
  {
    id: 'NTC-2026-0217',
    title: 'Mess Menu Revision - Feedback Invited',
    category: 'Mess',
    description:
      'The Mess Committee has proposed a revised menu for the upcoming month based on student feedback collected last week. The draft menu has been displayed on the mess notice board and the student portal. Students may submit their suggestions by 5th October.',
    date: daysAgo(4, 14, 0),
    pinned: false,
    isNew: false,
    priority: 'Normal',
  },
  {
    id: 'NTC-2026-0216',
    title: 'Central Library - Extended Hours During Exams',
    category: 'Academic',
    description:
      'Keeping in view the upcoming end-semester examinations, the Central Library will remain open until midnight (12:00 AM) starting from 1st November 2026 until the last exam. The reading rooms will be available for extended study hours.',
    date: daysAgo(5, 10, 30),
    pinned: false,
    isNew: false,
    priority: 'Important',
  },
  {
    id: 'NTC-2026-0215',
    title: 'College Fest 2026 - Save the Date',
    category: 'College',
    description:
      'The annual college cultural and technical fest "Techno-Culture 2026" will be held from 22nd to 24th January 2026. Event registrations and details will be announced shortly. All students are encouraged to participate and showcase their talents.',
    date: daysAgo(8, 16, 0),
    pinned: false,
    isNew: false,
    priority: 'Normal',
  },
  {
    id: 'NTC-2026-0214',
    title: 'Wi-Fi Upgrade - Maintenance on Sunday',
    category: 'College',
    description:
      'Scheduled maintenance of the college campus Wi-Fi network will take place on Sunday (6th October) between 10:00 AM and 2:00 PM. Network connectivity may be intermittent during this period. We apologize for any inconvenience.',
    date: daysAgo(2, 9, 30),
    pinned: false,
    isNew: true,
    priority: 'Important',
  },
  {
    id: 'NTC-2026-0213',
    title: 'Bus Route 5 - Schedule Adjustment',
    category: 'Transport',
    description:
      'Due to ongoing road construction on NH-7, Route 5 buses will follow an alternative route effective immediately. The first bus from North Campus will depart at 6:45 AM instead of 7:00 AM to accommodate the longer route. Students are advised to arrive 15 minutes early at their respective bus stops.',
    date: daysAgo(6, 7, 30),
    pinned: false,
    isNew: false,
    priority: 'Important',
  },
];
