export const NAV_LINKS = ['about', 'skills', 'projects', 'experience', 'testimonials', 'contact'];

export const TESTIMONIALS = [
  {
    name: 'Mugisha Eric',
    role: 'CEO, Igifu Meals',
    avatar: 'ME',
    text: 'Jean Aime is the kind of CTO every startup dreams of. He took our idea from a napkin sketch to a live platform with 30+ restaurant partners. His ability to balance speed with technical rigour is genuinely rare.',
  },
  {
    name: 'Uwimana Claire',
    role: 'Product Manager, Tech Solutions Rwanda',
    avatar: 'UC',
    text: 'Working with Jean Aime was a masterclass in clean engineering. He delivered a fintech dashboard that processed over $2M in transactions without a single critical bug in production. Exceptional attention to detail.',
  },
  {
    name: 'Nkurunziza David',
    role: 'Lead Engineer, Innovation Hub Kigali',
    avatar: 'ND',
    text: 'Jean Aime built our e-learning platform almost single-handedly. 5,000+ students use it daily. He wrote code that was so readable and well-structured that onboarding new engineers took half the usual time.',
  },
  {
    name: 'Habimana Patrick',
    role: 'Director, Digital Transformation Center',
    avatar: 'HP',
    text: 'As an intern, Jean Aime outperformed senior developers. He automated workflows that saved us 20+ hours a week and asked the right questions before writing a single line of code. A true professional.',
  },
  {
    name: 'Ishimwe Grace',
    role: 'Frontend Developer, Igifu Meals',
    avatar: 'IG',
    text: 'Jean Aime mentored me through my first production deployment. He has a gift for explaining complex systems simply and always makes time for the team. The code review culture he built made us all better engineers.',
  },
  {
    name: 'Nzeyimana Joel',
    role: 'University of Rwanda — CS Cohort 2022',
    avatar: 'NJ',
    text: 'Jean Aime graduated top of our cohort with a 3.8 GPA and still found time to help classmates debug their projects. He leads by example — humble, sharp, and always focused on the actual problem.',
  },
];

export const DOMAINS = [
  {
    id: 'web',
    icon: '⬡',
    label: 'Full-Stack Web',
    color: '#6366f1',
    headline: 'Production-grade web apps',
    desc: 'End-to-end systems — from pixel-perfect UIs to battle-tested APIs. I ship things that scale.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'ai',
    icon: '◈',
    label: 'AI & Machine Learning',
    color: '#a78bfa',
    headline: 'Intelligent systems that learn',
    desc: 'From NLP pipelines to computer vision models — I build AI that solves real problems, not demos.',
    skills: ['TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'Python', 'Hugging Face', 'LangChain', 'YOLO'],
  },
  {
    id: 'robotics',
    icon: '◎',
    label: 'Robotics & Computer Vision',
    color: '#34d399',
    headline: 'Eyes and motion for machines',
    desc: 'Object detection, real-time tracking, and autonomous control systems bridging software with the physical world.',
    skills: ['OpenCV', 'ROS', 'YOLO', 'MediaPipe', 'Raspberry Pi', 'Arduino', 'Python', 'C++'],
  },
  {
    id: 'blockchain',
    icon: '◇',
    label: 'Blockchain & Web3',
    color: '#f59e0b',
    headline: 'Decentralised & trustless systems',
    desc: 'Smart contracts, DeFi protocols, and Web3 integrations — building on-chain logic that is transparent and tamper-proof.',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat', 'IPFS', 'Polygon', 'MetaMask', 'NFT Standards'],
  },
  {
    id: 'devops',
    icon: '◉',
    label: 'DevOps & Cloud',
    color: '#38bdf8',
    headline: 'Ship fast, stay reliable',
    desc: 'CI/CD pipelines, containerised deployments, and cloud infrastructure that keeps systems running at scale.',
    skills: ['Docker', 'AWS', 'GitHub Actions', 'Linux', 'Nginx', 'Terraform', 'CI/CD', 'Monitoring'],
  },
  {
    id: 'mobile',
    icon: '▣',
    label: 'Mobile Development',
    color: '#fb7185',
    headline: 'Native-feel cross-platform apps',
    desc: 'React Native apps with smooth animations, offline support, and deep platform integrations.',
    skills: ['React Native', 'Expo', 'iOS', 'Android', 'Push Notifications', 'Biometrics', 'SQLite'],
  },
];

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
  {
    title: 'Computer Vision Security System',
    category: 'Robotics & CV',
    description:
      'Real-time object detection and intruder recognition system using YOLO v8 and OpenCV. Processes live camera feeds at 30fps, triggers alerts, and logs events — deployed on Raspberry Pi hardware.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Raspberry Pi', 'MQTT'],
    live: null,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    featured: false,
    highlight: false,
  },
  {
    title: 'Blockchain Voting Platform',
    category: 'Blockchain & Web3',
    description:
      'Tamper-proof decentralised voting system on Ethereum. Smart contracts enforce one-vote-per-wallet rules, results are immutable on-chain, and a React frontend makes participation seamless.',
    stack: ['Solidity', 'Ethereum', 'Hardhat', 'Web3.js', 'React'],
    live: null,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
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
  { label: 'LinkedIn',  value: 'linkedin.com/in/iraguha-jean-aime-53ba74405', href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', type: 'linkedin'  },
  { label: 'WhatsApp', value: '+250 793 411 594',                    href: 'https://wa.me/250793411594',                                type: 'whatsapp' },
];
