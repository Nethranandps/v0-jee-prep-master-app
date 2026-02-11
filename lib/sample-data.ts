export const sampleTests = [
  {
    id: "test-1",
    title: "JEE Main Mock Test #12",
    subject: "Physics, Chemistry, Mathematics",
    difficulty: "Medium",
    questions: 75,
    duration: 180,
    dueDate: "Feb 15, 2026",
    status: "assigned" as const,
    score: null,
  },
  {
    id: "test-2",
    title: "Mechanics & Thermodynamics",
    subject: "Physics",
    difficulty: "Hard",
    questions: 30,
    duration: 60,
    dueDate: "Feb 12, 2026",
    status: "completed" as const,
    score: 87,
  },
  {
    id: "test-3",
    title: "Organic Chemistry Marathon",
    subject: "Chemistry",
    difficulty: "Medium",
    questions: 40,
    duration: 90,
    dueDate: "Feb 10, 2026",
    status: "completed" as const,
    score: 72,
  },
  {
    id: "test-4",
    title: "Calculus & Algebra",
    subject: "Mathematics",
    difficulty: "Easy",
    questions: 25,
    duration: 45,
    dueDate: "Feb 18, 2026",
    status: "assigned" as const,
    score: null,
  },
  {
    id: "test-5",
    title: "JEE Advanced Pattern Test",
    subject: "Physics, Chemistry, Mathematics",
    difficulty: "Hard",
    questions: 54,
    duration: 180,
    dueDate: "Feb 20, 2026",
    status: "assigned" as const,
    score: null,
  },
];

export const sampleQuestions = [
  {
    id: 1,
    subject: "Physics",
    text: "A particle moves in a circle of radius R with a constant speed v. The magnitude of average velocity after half revolution is:",
    options: ["2v/\u03c0", "v/\u03c0", "v/2", "2R/\u03c0t"],
    correct: 0,
    explanation:
      "After half revolution, displacement = 2R (diameter). Time for half revolution = \u03c0R/v. Average velocity = 2R/(\u03c0R/v) = 2v/\u03c0.",
  },
  {
    id: 2,
    subject: "Physics",
    text: "Two blocks of masses m and 2m are connected by a light string passing over a frictionless pulley. The tension in the string is:",
    options: ["2mg/3", "4mg/3", "mg/3", "mg"],
    correct: 1,
    explanation:
      "Using Newton's second law for Atwood machine: T = 2m\u00b7(2m)\u00b7g/(m+2m) = 4mg/3.",
  },
  {
    id: 3,
    subject: "Chemistry",
    text: "Which of the following compounds shows optical isomerism?",
    options: ["CH\u2083CHClBr", "CH\u2082Cl\u2082", "CHCl\u2083", "CCl\u2084"],
    correct: 0,
    explanation:
      "CH\u2083CHClBr has a chiral carbon (C bonded to 4 different groups: CH\u2083, H, Cl, Br), hence it shows optical isomerism.",
  },
  {
    id: 4,
    subject: "Chemistry",
    text: "The hybridization of carbon in CO\u2082 is:",
    options: ["sp", "sp\u00b2", "sp\u00b3", "dsp\u00b2"],
    correct: 0,
    explanation:
      "In CO\u2082, carbon forms 2 double bonds with oxygen atoms. Two regions of electron density result in sp hybridization.",
  },
  {
    id: 5,
    subject: "Mathematics",
    text: "If f(x) = x\u00b3 - 3x + 2, then f'(1) equals:",
    options: ["0", "1", "-2", "3"],
    correct: 0,
    explanation:
      "f'(x) = 3x\u00b2 - 3. At x = 1: f'(1) = 3(1) - 3 = 0.",
  },
];

export const sampleResults = {
  totalScore: 87,
  totalQuestions: 30,
  correctAnswers: 26,
  incorrectAnswers: 3,
  unattempted: 1,
  percentile: 94.2,
  subjectWise: [
    { subject: "Physics", score: 92, total: 10, color: "hsl(217, 91%, 60%)" },
    { subject: "Chemistry", score: 80, total: 10, color: "hsl(160, 84%, 39%)" },
    { subject: "Mathematics", score: 88, total: 10, color: "hsl(25, 95%, 53%)" },
  ],
  difficultyWise: [
    { name: "Easy", value: 10, color: "hsl(160, 84%, 39%)" },
    { name: "Medium", value: 12, color: "hsl(217, 91%, 60%)" },
    { name: "Hard", value: 8, color: "hsl(25, 95%, 53%)" },
  ],
};

export const sampleProgress = {
  overallRank: 1247,
  totalStudents: 15000,
  streak: 12,
  testsCompleted: 28,
  avgScore: 82,
  rankHistory: [
    { week: "W1", rank: 3200 },
    { week: "W2", rank: 2800 },
    { week: "W3", rank: 2400 },
    { week: "W4", rank: 1900 },
    { week: "W5", rank: 1600 },
    { week: "W6", rank: 1247 },
  ],
  topicMastery: [
    { topic: "Mechanics", mastery: 88 },
    { topic: "Thermodynamics", mastery: 75 },
    { topic: "Electrostatics", mastery: 92 },
    { topic: "Optics", mastery: 68 },
    { topic: "Organic Chemistry", mastery: 72 },
    { topic: "Inorganic Chemistry", mastery: 85 },
    { topic: "Physical Chemistry", mastery: 79 },
    { topic: "Calculus", mastery: 91 },
    { topic: "Algebra", mastery: 83 },
    { topic: "Coordinate Geometry", mastery: 77 },
  ],
};

export const sampleLibrary = [
  {
    id: "lib-1",
    title: "NCERT Physics Class 12",
    subject: "Physics",
    type: "PDF",
    chapters: 15,
    downloaded: true,
  },
  {
    id: "lib-2",
    title: "HC Verma - Concepts of Physics",
    subject: "Physics",
    type: "PDF",
    chapters: 47,
    downloaded: false,
  },
  {
    id: "lib-3",
    title: "Morrison & Boyd - Organic Chemistry",
    subject: "Chemistry",
    type: "PDF",
    chapters: 36,
    downloaded: true,
  },
  {
    id: "lib-4",
    title: "RD Sharma - Mathematics",
    subject: "Mathematics",
    type: "PDF",
    chapters: 33,
    downloaded: false,
  },
  {
    id: "lib-5",
    title: "Previous Year Questions (2015-2025)",
    subject: "All",
    type: "Question Bank",
    chapters: 10,
    downloaded: true,
  },
];

export const sampleTeacherData = {
  recentPapers: [
    {
      id: "paper-1",
      title: "JEE Main Mock #12",
      created: "Feb 8, 2026",
      questions: 75,
      assigned: true,
      students: 45,
    },
    {
      id: "paper-2",
      title: "Physics Unit Test - Rotation",
      created: "Feb 5, 2026",
      questions: 30,
      assigned: true,
      students: 38,
    },
    {
      id: "paper-3",
      title: "Chemistry Practice Set",
      created: "Feb 2, 2026",
      questions: 40,
      assigned: false,
      students: 0,
    },
  ],
  classes: [
    {
      id: "class-1",
      name: "JEE 2026 Batch A",
      students: 45,
      avgScore: 78,
    },
    {
      id: "class-2",
      name: "JEE 2026 Batch B",
      students: 38,
      avgScore: 72,
    },
    {
      id: "class-3",
      name: "JEE 2027 Foundation",
      students: 52,
      avgScore: 65,
    },
  ],
  performanceOverview: [
    { subject: "Physics", avg: 76 },
    { subject: "Chemistry", avg: 72 },
    { subject: "Mathematics", avg: 80 },
  ],
};

export const sampleNotifications = [
  {
    id: "notif-1",
    title: "New Test Assigned",
    message: "JEE Main Mock Test #12 has been assigned. Due: Feb 15",
    time: "2 hours ago",
    read: false,
    type: "test" as const,
  },
  {
    id: "notif-2",
    title: "Results Ready",
    message: "Your Mechanics & Thermodynamics test results are ready!",
    time: "1 day ago",
    read: false,
    type: "result" as const,
  },
  {
    id: "notif-3",
    title: "Daily Streak",
    message: "You're on a 12-day streak! Keep it up!",
    time: "1 day ago",
    read: true,
    type: "streak" as const,
  },
  {
    id: "notif-4",
    title: "New Material Added",
    message: "Your teacher uploaded Rotation chapter notes",
    time: "3 days ago",
    read: true,
    type: "material" as const,
  },
];
