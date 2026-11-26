export const NAV_LINKS = ['about', 'services', 'skills', 'projects', 'experience', 'contact'];

export const SERVICES = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    desc: 'Turning designs into responsive, accessible interfaces with React, Next.js and TypeScript — from layout and state decisions to performance work across desktop, tablet and mobile.',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    desc: 'Designing APIs, auth and data layers with Node.js and PostgreSQL — payments, permissions, audit trails and the business logic underneath them.',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Product Development',
    desc: 'Owning a product end to end — frontend, backend, database and deployment — to ship complete platforms rather than one layer of one.',
  },
];

/* Levels map to a single bar width so the meters stay consistent with the
   wording beside them. */
export const LEVEL_PCT = { Experienced: 90, Intermediate: 70, Familiar: 50 };

export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Experienced' },
      { name: 'Next.js', level: 'Experienced' },
      { name: 'TypeScript', level: 'Experienced' },
      { name: 'JavaScript', level: 'Experienced' },
      { name: 'React Native', level: 'Experienced' },
      { name: 'Tailwind CSS', level: 'Experienced' },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 'Experienced' },
      { name: 'PostgreSQL', level: 'Experienced' },
      { name: 'MongoDB', level: 'Experienced' },
      { name: 'Redis', level: 'Intermediate' },
      { name: 'GraphQL', level: 'Intermediate' },
      { name: 'Firebase', level: 'Intermediate' },
    ],
  },
  {
    title: 'AI, Blockchain & Vision',
    skills: [
      { name: 'Python', level: 'Experienced' },
      { name: 'TensorFlow', level: 'Intermediate' },
      { name: 'OpenCV', level: 'Intermediate' },
      { name: 'Solidity', level: 'Intermediate' },
      { name: 'Web3.js', level: 'Intermediate' },
      { name: 'YOLO', level: 'Intermediate' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 'Experienced' },
      { name: 'AWS', level: 'Experienced' },
      { name: 'GitHub Actions', level: 'Experienced' },
      { name: 'Nginx', level: 'Intermediate' },
    ],
  },
];

export const PROJECT_FILTERS = ['All', 'Full-Stack', 'AI & ML', 'Blockchain', 'Mobile', 'Data & IoT'];

export const PROJECTS = [
  {
    title: 'Igifu Meals Platform',
    group: 'Full-Stack',
    role: 'Co-Founder & CTO',
    year: '2023 — present',
    description:
      'Architected and shipped the full Igifu Meals platform — a food-ordering and meal-planning system connecting Rwandan restaurants with customers. Built real-time order tracking, a kitchen dashboard and a loyalty engine from the ground up.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
    live: 'https://igifumeals.com',
  },
  {
    title: 'E-Learning Platform',
    group: 'Full-Stack',
    role: 'Lead Developer',
    year: '2021 — 2022',
    description:
      'Full-stack learning platform with live collaboration, content recommendations and adaptive quizzes, built for secondary and university students.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    live: null,
  },
  {
    title: 'Smart City Dashboard',
    group: 'Data & IoT',
    role: 'Full-Stack Developer',
    year: '2022',
    description:
      'Urban monitoring dashboard ingesting IoT sensor data — traffic flow, air quality and energy usage — with time-series storage and analytics views for planners.',
    stack: ['Next.js', 'Python', 'PostgreSQL', 'D3.js', 'Docker'],
    live: null,
  },
  {
    title: 'Fintech Mobile App',
    group: 'Mobile',
    role: 'Mobile Developer',
    year: '2022',
    description:
      'Mobile money app with biometric authentication, peer-to-peer transfers and spending breakdowns, built for low-bandwidth conditions.',
    stack: ['React Native', 'Node.js', 'MySQL', 'JWT'],
    live: null,
  },
  {
    title: 'Health Triage Assistant',
    group: 'AI & ML',
    role: 'Developer',
    year: '2022',
    description:
      'Symptom-triage and appointment tool using a trained classifier to route patients, with longitudinal tracking for follow-up visits.',
    stack: ['React', 'Python', 'TensorFlow', 'Firebase'],
    live: null,
  },
  {
    title: 'Computer Vision Security System',
    group: 'AI & ML',
    role: 'Developer',
    year: '2023',
    description:
      'Real-time object detection and intruder recognition on live camera feeds, with event logging and alerting, deployed on Raspberry Pi hardware.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Raspberry Pi', 'MQTT'],
    live: null,
  },
  {
    title: 'Blockchain Voting Platform',
    group: 'Blockchain',
    role: 'Developer',
    year: '2023',
    description:
      'Decentralised voting system on Ethereum. Smart contracts enforce one vote per wallet, results are immutable on-chain, and a React frontend handles participation.',
    stack: ['Solidity', 'Ethereum', 'Hardhat', 'Web3.js', 'React'],
    live: null,
  },
];

export const EXPERIENCE = [
  {
    role: 'Co-Founder & CTO',
    company: 'Igifu Meals',
    period: '2023 – Present',
    current: true,
    points: [
      'Architected the technical stack from zero — API, web app, kitchen dashboard and mobile client',
      'Led a small engineering team; established code review, CI/CD and deployment workflows',
      'Designed the real-time order-tracking engine behind the customer and kitchen experiences',
      'Integrated payments, loyalty rewards and restaurant analytics',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Rwanda',
    period: '2022 – 2023',
    current: false,
    points: [
      'Delivered production web applications for clients across fintech, logistics and the public sector',
      'Implemented AI-assisted features and blockchain integrations for client projects',
      'Cut average application load time substantially through code splitting, caching and CDN work',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Innovation Hub Kigali',
    period: '2021 – 2022',
    current: false,
    points: [
      'Built the e-learning platform used by students across Rwanda and East Africa',
      'Shipped real-time collaboration features over WebSockets',
      'Delivered WCAG 2.1 AA-compliant interfaces for users with disabilities',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Digital Transformation Center',
    period: '2020 – 2021',
    current: false,
    points: [
      'Automated internal workflows with Python, removing hours of manual work each week',
      'Built RESTful APIs consumed by internal tools and contributed fixes upstream',
    ],
  },
];

export const EDUCATION = [
  {
    degree: 'B.Sc. Computer Science',
    institution: 'University of Rwanda',
    period: '2018 – 2022',
    note: 'First Class Honours',
  },
  {
    degree: 'Advanced Web Development',
    institution: 'freeCodeCamp',
    period: '2021 – 2022',
    note: 'Full-Stack Certification',
  },
  {
    degree: 'Primary Education',
    institution: 'Kibenga Primary School',
    period: '2008 – 2014',
    note: 'Bugesera, Rwanda',
    anlm: true,
  },
];

export const STATS = [
  { value: '4+', label: 'Years building' },
  { value: '7',  label: 'Projects featured' },
  { value: '1',  label: 'Company co-founded' },
];

export const CONTACT_ITEMS = [
  { label: 'Email',    value: 'jeanaimeiraguha@gmail.com', href: 'mailto:jeanaimeiraguha@gmail.com', type: 'email'    },
  { label: 'Phone',    value: '+250 793 411 594',          href: 'tel:+250793411594',                type: 'phone'    },
  { label: 'Location', value: 'Bugesera, Kigali, Rwanda',  href: null,                               type: 'location' },
  { label: 'LinkedIn', value: 'linkedin.com/in/iraguha-jean-aime-53ba74405', href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', type: 'linkedin' },
  { label: 'GitHub',   value: 'github.com/jeanaimeiraguha', href: 'https://github.com/jeanaimeiraguha', type: 'github' },
];
