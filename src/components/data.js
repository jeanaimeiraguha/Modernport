export const NAV_LINKS = ['about', 'skills', 'projects', 'experience', 'contact'];

export const SKILLS = {
  Frontend:  ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  Backend:   ['Node.js', 'Express', 'Python', 'Django', 'GraphQL'],
  Database:  ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
  DevOps:    ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux'],
  Design:    ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility'],
};

export const PROJECTS = [
  {
    title: 'Igifu Meals Platform',
    category: 'Food Tech · CTO',
    description:
      'As co-founder and CTO, I architected and shipped the full Igifu Meals platform — a smart food-ordering and meal-planning system connecting Rwandan restaurants with customers. Built real-time order tracking, a kitchen dashboard, and a loyalty engine from the ground up.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
    live: 'https://igifumeals.com',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    featured: true,
    highlight: true,
  },
  {
    title: 'E-Learning Platform',
    category: 'Education',
    description:
      'Full-stack LMS serving 5,000+ students with live collaboration, AI-powered content recommendations, and adaptive quizzes. Reduced student drop-off by 35% through personalised learning paths.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'TensorFlow'],
    live: null,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    featured: true,
    highlight: false,
  },
  {
    title: 'Smart City Dashboard',
    category: 'IoT & Data',
    description:
      'Real-time urban monitoring platform ingesting data from 200+ IoT sensors across Kigali — traffic flow, air quality, and energy usage — with predictive analytics for city planners.',
    stack: ['Next.js', 'Python', 'PostgreSQL', 'D3.js', 'Docker'],
    live: null,
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    featured: false,
    highlight: false,
  },
  {
    title: 'Fintech Mobile App',
    category: 'Finance',
    description:
      'Secure mobile banking with biometric auth, instant peer-to-peer transfers, and an AI spending coach. Processed over $2M in transactions during the pilot phase.',
    stack: ['React Native', 'Node.js', 'MySQL', 'JWT', 'Plaid'],
    live: null,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    featured: false,
    highlight: false,
  },
  {
    title: 'AI Health Assistant',
    category: 'Health',
    description:
      'Health monitoring platform using TensorFlow for symptom triage, appointment scheduling, and longitudinal health tracking. Piloted with 3 clinics in Kigali.',
    stack: ['React', 'Python', 'TensorFlow', 'Firebase', 'Chart.js'],
    live: null,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    featured: false,
    highlight: false,
  },
];

export const EXPERIENCE = [
  {
    role: 'Co-Founder & CTO',
    company: 'Igifu Meals',
    period: '2023 – Present',
    current: true,
    points: [
      'Architected the entire technical stack from zero — API, web app, kitchen dashboard, and mobile client',
      'Led a team of 4 engineers; established code review culture, CI/CD pipelines, and deployment workflows',
      'Designed a real-time order-tracking engine handling 500+ concurrent sessions with sub-200ms latency',
      'Integrated Stripe payments, loyalty rewards, and restaurant analytics — grew to 30+ partner restaurants',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Rwanda',
    period: '2022 – 2023',
    current: false,
    points: [
      'Delivered 15+ production web apps for enterprise clients across fintech, logistics, and government sectors',
      'Implemented AI-powered features and blockchain integrations that generated $500K+ in new contracts',
      'Cut average application load time by 40% through code splitting, caching, and CDN optimisation',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Innovation Hub Kigali',
    period: '2021 – 2022',
    current: false,
    points: [
      'Built the e-learning platform now used by 5,000+ students across Rwanda and East Africa',
      'Shipped real-time collaboration features using WebSockets — reduced support tickets by 60%',
      'Delivered WCAG 2.1 AA-compliant interfaces, making the platform accessible to users with disabilities',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Digital Transformation Center',
    period: '2020 – 2021',
    current: false,
    points: [
      'Automated 6 internal workflows with Python scripts — saved the team 20+ hours per week',
      'Built RESTful APIs consumed by 3 internal tools and contributed fixes to 2 open-source libraries',
    ],
  },
];

export const EDUCATION = [
  {
    degree: 'B.Sc. Computer Science',
    institution: 'University of Rwanda',
    period: '2018 – 2022',
    note: 'First Class Honors · GPA 3.8/4.0 · Top 5% of cohort',
  },
  {
    degree: 'Advanced Web Development',
    institution: 'freeCodeCamp',
    period: '2021 – 2022',
    note: '300+ hours · Full-Stack Certification',
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
  { value: '4+',  label: 'Years building' },
  { value: '50+', label: 'Projects shipped' },
  { value: '30+', label: 'Happy clients' },
  { value: '1',   label: 'Company co-founded' },
];

export const CONTACT_ITEMS = [
  { label: 'Email',    value: 'jeanaimeiraguha@gmail.com',          href: 'mailto:jeanaimeiraguha@gmail.com',              type: 'email'    },
  { label: 'Phone',    value: '+250 793 411 594',                    href: 'tel:+250793411594',                             type: 'phone'    },
  { label: 'Location', value: 'Bugesera, Kigali, Rwanda',             href: null,                                            type: 'location' },
  { label: 'LinkedIn',  value: 'linkedin.com/in/iraguha-jean-aime', href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', type: 'linkedin'  },
  { label: 'WhatsApp', value: '+250 793 411 594',                    href: 'https://wa.me/250793411594',                                type: 'whatsapp' },
];
