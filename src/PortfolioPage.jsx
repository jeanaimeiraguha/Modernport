// src/App.jsx - IRAGUHA Jean Aime Portfolio (Fixed Version)

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
    FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPaintBrush, 
    FaFileDownload, FaArrowRight, FaCheckCircle, FaReact, 
    FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaFigma, FaPhp, 
    FaDatabase, FaBars, FaTimes, FaQuoteLeft, FaExternalLinkAlt,
    FaGraduationCap, FaBriefcase, FaAward, FaUsers, FaProjectDiagram,
    FaLaptopCode, FaPalette, FaMobile, FaServer, FaRocket,
    FaLightbulb, FaCog, FaChartLine, FaShieldAlt, FaGlobe,
    FaPhone, FaMapMarkerAlt, FaStar, FaHeart, FaCoffee,
    FaPython, FaAws, FaDocker, FaGitAlt
} from 'react-icons/fa';
import { 
    SiNextdotjs, SiMongodb, SiMysql, SiGit, SiTailwindcss,
    SiDjango, SiFlutter, SiFirebase, SiTypescript,
    SiRedux, SiGraphql, SiFigma, SiPostgresql,
    SiJavascript, SiBootstrap, SiExpress, SiTensorflow
} from 'react-icons/si';

// Lazily load the CVPage component to improve initial load time
const CVPage = lazy(() => import('./CVPage'));

// ====================================================================
// LOGO COMPONENT - Custom Animated Logo for IRAGUHA Jean Aime
// ====================================================================

const AnimatedLogo = ({ size = 60, animated = true }) => {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      whileHover={animated ? { scale: 1.1, rotate: 360 } : {}}
      transition={{ duration: 0.5 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Inner Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="url(#logoGradient)"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Letter "J" */}
        <motion.path
          d="M45 30 L45 55 Q45 65 35 65 Q25 65 25 55"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
        
        {/* Letter "A" */}
        <motion.path
          d="M55 65 L65 30 L75 65 M60 50 L70 50"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        
        {/* Decorative Dots */}
        {animated && (
          <>
            <motion.circle
              cx="20"
              cy="20"
              r="2"
              fill="#2563EB"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <motion.circle
              cx="80"
              cy="20"
              r="2"
              fill="#0891B2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <motion.circle
              cx="80"
              cy="80"
              r="2"
              fill="#0D9488"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <motion.circle
              cx="20"
              cy="80"
              r="2"
              fill="#059669"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                delay: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

// ====================================================================
// ANIMATED BACKGROUND COMPONENT
// ====================================================================

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-slate-900" />
      
      {/* Animated Shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
            style={{
              background: `radial-gradient(circle, ${['#2563EB', '#0891B2', '#0D9488', '#059669', '#F59E0B', '#DB2777'][i]
                } 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            initial={{
              width: `${300 + i * 50}px`,
              height: `${300 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

// ====================================================================
// CURSOR FOLLOWER COMPONENT
// ====================================================================

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          className="w-10 h-10 bg-white rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
        />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
      >
        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
      </motion.div>
    </>
  );
};

// ====================================================================
// ANIMATED TEXT COMPONENT
// ====================================================================

const AnimatedText = ({ text, className = "" }) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

// ====================================================================
// PERSONAL DATA
// ====================================================================

// ====================================================================
// SKILLS DATA
// ====================================================================

const skills = [
  { name: "React.js", level: 90, color: "#61DAFB", icon: <FaReact /> },
  { name: "Node.js", level: 85, color: "#339933", icon: <FaNodeJs /> },
  { name: "TypeScript", level: 80, color: "#3178C6", icon: <SiTypescript /> },
  { name: "Next.js", level: 85, color: "#000000", icon: <SiNextdotjs /> },
  { name: "MongoDB", level: 80, color: "#47A248", icon: <SiMongodb /> },
  { name: "Tailwind CSS", level: 90, color: "#06B6D4", icon: <SiTailwindcss /> },
  { name: "Python", level: 75, color: "#3776AB", icon: <FaPython /> },
  { name: "MySQL", level: 85, color: "#4479A1", icon: <SiMysql /> },
  { name: "Git", level: 88, color: "#F05032", icon: <SiGit /> },
  { name: "Figma", level: 82, color: "#F24E1E", icon: <SiFigma /> },
  { name: "Express.js", level: 83, color: "#000000", icon: <SiExpress /> },
  { name: "PostgreSQL", level: 78, color: "#336791", icon: <SiPostgresql /> },
  { name: "Docker", level: 75, color: "#2496ED", icon: <FaDocker /> },
  { name: "AWS", level: 70, color: "#FF9900", icon: <FaAws /> },
  { name: "TensorFlow", level: 65, color: "#FF6F00", icon: <SiTensorflow /> },
  { name: "Firebase", level: 80, color: "#FFCA28", icon: <SiFirebase /> },
  { name: "GraphQL", level: 75, color: "#E10098", icon: <SiGraphql /> },
  { name: "Redux", level: 85, color: "#764ABC", icon: <SiRedux /> },
  { name: "Bootstrap", level: 80, color: "#7952B3", icon: <SiBootstrap /> },
  { name: "Django", level: 70, color: "#092E20", icon: <SiDjango /> },
  { name: "Flutter", level: 65, color: "#00B4AB", icon: <SiFlutter /> },
];

// ====================================================================
// EXPERIENCE DATA
// ====================================================================

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Tech Solutions Rwanda",
    period: "2023 - Present",
    description: "Lead development of scalable web applications using React, Node.js, and modern cloud technologies. Implemented AI-powered features and blockchain integrations for enterprise clients.",
    achievements: [
      "Developed 15+ full-stack applications with React frontend and Node.js backend",
      "Implemented AI chatbots and machine learning integrations",
      "Led blockchain development projects using Web3 technologies",
      "Optimized application performance, reducing load times by 40%",
      "Mentored junior developers and conducted code reviews"
    ],
    technologies: ["React", "Node.js", "Python", "AWS", "MongoDB", "Blockchain"]
  },
  {
    title: "Frontend Developer",
    company: "Innovation Hub Kigali",
    period: "2021 - 2023",
    description: "Created responsive and interactive user interfaces for educational platforms and e-commerce websites. Focused on user experience and modern design principles.",
    achievements: [
      "Built responsive e-learning platform serving 5000+ students",
      "Implemented real-time features using WebSockets and Socket.io",
      "Created accessible interfaces following WCAG guidelines",
      "Integrated payment gateways and user authentication systems",
      "Collaborated with UX/UI designers to implement modern designs"
    ],
    technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"]
  },
  {
    title: "Software Engineering Intern",
    company: "Digital Transformation Center",
    period: "2020 - 2021",
    description: "Assisted in developing internal tools and automation scripts. Gained experience in agile development methodologies and version control.",
    achievements: [
      "Automated repetitive tasks saving 20+ hours per week",
      "Contributed to open-source projects and internal tooling",
      "Learned and applied agile development practices",
      "Participated in code reviews and team standups",
      "Developed RESTful APIs for internal use"
    ],
    technologies: ["Python", "Git", "Django", "SQL", "Linux"]
  }
];

// ====================================================================
// EDUCATION DATA
// ====================================================================

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Rwanda",
    period: "2018 - 2022",
    description: "Graduated with honors in Computer Science with focus on software engineering, artificial intelligence, and web technologies.",
    achievements: [
      "Graduated with First Class Honors",
      "President of Computer Science Club",
      "Participated in national coding competitions",
      "Research project on AI in healthcare applications"
    ],
    gpa: "3.8/4.0"
  },
  {
    degree: "Advanced Web Development Certification",
    institution: "FreeCodeCamp",
    period: "2021 - 2022",
    description: "Completed comprehensive certification in modern web development technologies and best practices.",
    achievements: [
      "Mastered React, Node.js, and full-stack development",
      "Learned database design and API development",
      "Completed 300+ hours of hands-on projects",
      "Achieved certification in responsive web design"
    ]
  }
];

// ====================================================================
// CERTIFICATIONS DATA
// ====================================================================

const certifications = [
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Demonstrated expertise in developing and maintaining AWS-based applications using AWS SDKs and services."
  },
  {
    title: "Google Cloud Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2023",
    description: "Validated skills in developing scalable applications on Google Cloud Platform."
  },
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2022",
    description: "Gained foundational knowledge of cloud services and how those services are provided with Microsoft Azure."
  },
  {
    title: "Blockchain Developer Certification",
    issuer: "Blockchain Council",
    date: "2023",
    description: "Certified expertise in blockchain development, smart contracts, and decentralized applications."
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2022",
    description: "Demonstrated proficiency in machine learning with TensorFlow for building and training neural networks."
  }
];

// ====================================================================
// PROJECTS DATA (Enhanced)
// ====================================================================

const projects = [
  {
    id: 1,
    key: 'elearning',
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    titleKey: "projects.items.elearning.title",
    categoryKey: "projects.categories.elearning",
    descriptionKey: "projects.items.elearning.description",
    featuresKey: "projects.items.elearning.features",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    color: "from-blue-500 to-cyan-500",
    github: "https://github.com/Iraguha/elearning",
    live: "https://elearning-demo.com",
    details: "A comprehensive e-learning platform with real-time collaboration features, AI-powered recommendations, and interactive quizzes. Built with modern technologies to provide seamless learning experience."
  },
  {
    id: 2,
    key: 'smartCity',
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=500&fit=crop",
    titleKey: "projects.items.smartCity.title",
    categoryKey: "projects.categories.smartCity",
    descriptionKey: "projects.items.smartCity.description",
    featuresKey: "projects.items.smartCity.features",
    technologies: ["Next.js", "Python", "PostgreSQL", "D3.js", "Docker"],
    color: "from-purple-500 to-pink-500",
    github: "https://github.com/Iraguha/smart-city",
    live: "https://smartcity-demo.com",
    details: "IoT-based smart city dashboard providing real-time data visualization for urban planning, traffic management, and environmental monitoring."
  },
  {
    id: 3,
    key: 'fintechApp',
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    titleKey: "projects.items.fintechApp.title",
    categoryKey: "projects.categories.fintechApp",
    descriptionKey: "projects.items.fintechApp.description",
    featuresKey: "projects.items.fintechApp.features",
    technologies: ["React Native", "Node.js", "MySQL", "Redis", "JWT"],
    color: "from-emerald-500 to-teal-500",
    github: "https://github.com/Iraguha/fintech",
    live: "https://fintech-demo.com",
    details: "Mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights for personal finance management."
  },
  {
    id: 4,
    key: 'aiHealth',
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    titleKey: "projects.items.aiHealth.title",
    categoryKey: "projects.categories.aiHealth",
    descriptionKey: "projects.items.aiHealth.description",
    featuresKey: "projects.items.aiHealth.features",
    technologies: ["React", "Python", "TensorFlow", "Firebase", "Chart.js"],
    color: "from-red-500 to-orange-500",
    github: "https://github.com/Iraguha/health-ai",
    live: "https://healthai-demo.com",
    details: "AI-powered health monitoring system that analyzes medical data, provides predictive analytics, and offers personalized health recommendations."
  },
  {
    id: 5,
    key: 'blockchainVoting',
    image: "https://images.unsplash.com/photo-1615874694520-47de4582f735?w=800&h=500&fit=crop",
    titleKey: "projects.items.blockchainVoting.title",
    categoryKey: "projects.categories.blockchainVoting",
    descriptionKey: "projects.items.blockchainVoting.description",
    featuresKey: "projects.items.blockchainVoting.features",
    technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"],
    color: "from-indigo-500 to-purple-500",
    github: "https://github.com/Iraguha/blockchain-voting",
    live: "https://voting-demo.com",
    details: "Decentralized voting platform built on Ethereum blockchain ensuring transparent, secure, and tamper-proof elections with smart contract verification."
  },
  {
    id: 6,
    key: 'ecommercePlatform',
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop",
    titleKey: "projects.items.ecommercePlatform.title",
    categoryKey: "projects.categories.ecommercePlatform",
    descriptionKey: "projects.items.ecommercePlatform.description",
    featuresKey: "projects.items.ecommercePlatform.features",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    color: "from-pink-500 to-rose-500",
    github: "https://github.com/Iraguha/ecommerce",
    live: "https://shop-demo.com",
    details: "Full-featured e-commerce platform with product catalog, shopping cart, user reviews, and secure payment processing with admin dashboard."
  }
];

// ====================================================================
// TESTIMONIALS DATA (Enhanced)
// ====================================================================

const testimonials = [
  {
    key: 'sarah',
    rating: 5,
    color: "from-blue-500 to-cyan-500",
    content: "Jean Aime is an exceptional developer who delivered our project ahead of schedule. His expertise in React and Node.js was invaluable, and his problem-solving skills are outstanding.",
    name: "Sarah Johnson",
    role: "CTO, TechStart Inc."
  },
  {
    key: 'david',
    rating: 5,
    color: "from-purple-500 to-pink-500",
    content: "Working with Jean Aime on our blockchain project was a game-changer. His deep understanding of Web3 technologies and attention to detail made all the difference.",
    name: "David Kim",
    role: "Product Manager, Blockchain Solutions"
  },
  {
    key: 'marie',
    rating: 5,
    color: "from-emerald-500 to-teal-500",
    content: "The AI-powered features Jean Aime implemented for our healthcare platform have significantly improved patient outcomes. His technical skills are matched only by his dedication.",
    name: "Dr. Marie Dubois",
    role: "Medical Director, HealthTech Rwanda"
  },
  {
    key: 'alex',
    rating: 5,
    color: "from-amber-500 to-orange-500",
    content: "Jean Aime's ability to understand complex business requirements and translate them into elegant technical solutions is remarkable. Our e-commerce platform exceeded all expectations.",
    name: "Alex Chen",
    role: "Founder, ShopSmart"
  },
  {
    key: 'emma',
    rating: 5,
    color: "from-violet-500 to-fuchsia-500",
    content: "The educational platform Jean Aime developed has transformed how we deliver online learning. His commitment to user experience and technical excellence is unparalleled.",
    name: "Emma Rodriguez",
    role: "Education Director, LearnFuture"
  }
];

// ====================================================================
// CHATBOT DATA
// ====================================================================

const chatbotResponses = {
  greetings: [
    "Hello! I'm Alex, Jean Aime's AI assistant. Welcome to his portfolio! How can I help you today?",
    "Hi there! I'm Alex, here to tell you all about Jean Aime's amazing skills and experience. What would you like to know?",
    "Welcome! I'm Alex, Jean Aime's virtual assistant. I'd love to share his story with you. What interests you most?"
  ],
  about: [
    "Jean Aime IRAGUHA is a talented Full-Stack Developer and AI & Blockchain Engineer from Rwanda. He specializes in building scalable web applications, AI-powered solutions, and blockchain systems using modern technologies like React, Node.js, Python, and Web3 frameworks.",
    "Jean Aime is a passionate developer with 3+ years of experience creating innovative solutions. He's skilled in full-stack development, artificial intelligence, and blockchain technology, always focusing on solving real-world problems with clean, efficient code.",
    "Jean Aime is a tech enthusiast who loves turning complex problems into elegant solutions. He's proficient in multiple programming languages and frameworks, with a particular interest in AI and blockchain technologies."
  ],
  skills: [
    "Jean Aime has extensive skills in: React.js, Node.js, Python, TypeScript, Next.js, MongoDB, Tailwind CSS, AWS, Docker, TensorFlow, and blockchain technologies. He's also experienced with Git, Figma, Express.js, and PostgreSQL.",
    "His technical expertise spans frontend (React, Next.js, TypeScript), backend (Node.js, Python, Express), databases (MongoDB, PostgreSQL, MySQL), cloud platforms (AWS, Firebase), and emerging technologies (AI/ML, Blockchain, Web3).",
    "Jean Aime is proficient in modern web development technologies including React ecosystem, server-side rendering with Next.js, database management, cloud deployment, and AI integration using TensorFlow."
  ],
  experience: [
    "Jean Aime has worked as a Full-Stack Developer at Tech Solutions Rwanda since 2023, where he leads development of scalable applications. Previously, he was a Frontend Developer at Innovation Hub Kigali (2021-2023) and completed an internship at Digital Transformation Center (2020-2021).",
    "His professional journey includes developing 15+ full-stack applications, implementing AI chatbots, leading blockchain projects, and building e-learning platforms serving thousands of users. He has a strong track record of delivering high-quality solutions.",
    "Jean Aime has experience in both corporate and startup environments, working on diverse projects from educational platforms to fintech applications and blockchain solutions."
  ],
  education: [
    "Jean Aime holds a Bachelor of Science in Computer Science from the University of Rwanda (2018-2022), where he graduated with First Class Honors (GPA: 3.8/4.0). He was also the President of the Computer Science Club and participated in national coding competitions.",
    "He has completed advanced certifications including AWS Certified Developer, Google Cloud Professional Cloud Developer, and Blockchain Developer Certification. His continuous learning approach keeps him updated with the latest technologies.",
    "Jean Aime is committed to lifelong learning and has earned multiple certifications in cloud technologies, AI/ML, and blockchain development from recognized platforms like AWS, Google, and Microsoft."
  ],
  projects: [
    "Jean Aime has developed impressive projects including an AI-powered health monitoring system, a blockchain-based voting platform, a comprehensive e-learning platform, a smart city dashboard, and a mobile fintech application. Each project showcases his ability to solve real-world problems with technology.",
    "His portfolio includes 6 major projects demonstrating expertise in different domains: healthcare AI, blockchain technology, education technology, IoT solutions, and e-commerce platforms. All projects are built with modern tech stacks and best practices.",
    "Notable projects include an AI Health system using TensorFlow for medical data analysis, a blockchain voting platform ensuring secure elections, and a smart city dashboard for urban planning with real-time data visualization."
  ],
  contact: [
    "You can reach Jean Aime at jeanaimeiraguha@gmail.com or call him at +250 793 411 594. He's also active on LinkedIn and GitHub where you can see more of his work and connect with him professionally.",
    "Jean Aime is open to new opportunities and collaborations. The best way to contact him is through email at jeanaimeiraguha@gmail.com. He responds quickly to professional inquiries and is always excited to discuss new projects.",
    "For business inquiries or collaboration opportunities, you can contact Jean Aime via email or through his social media profiles. He's particularly interested in projects involving AI, blockchain, or full-stack web development."
  ],
  default: [
    "That's a great question! Jean Aime is a versatile developer with expertise in many areas. Would you like to know more about his technical skills, professional experience, or specific projects?",
    "I'd be happy to tell you more about Jean Aime! He's accomplished in many areas. Are you interested in his technical abilities, work experience, or the projects he's worked on?",
    "Jean Aime has an impressive background! Let me know what specific aspect you'd like to learn about - his technical skills, professional journey, or the innovative projects he's created?"
  ]
};

// ====================================================================
// SERVICES DATA
// ====================================================================

const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    description: "services.webDevDesc",
    color: "from-blue-500 to-cyan-500",
    featuresKey: "services.webDevFeatures",
    delay: 0,
  },
  {
    icon: <FaMobile />,
    title: "Mobile Development",
    description: "services.mobileDevDesc",
    color: "from-teal-500 to-emerald-500",
    featuresKey: "services.mobileDevFeatures",
    delay: 0.1,
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Design",
    description: "services.uiUxDesc",
    color: "from-purple-500 to-pink-500",
    featuresKey: "services.uiUxFeatures",
    delay: 0.2,
  },
  {
    icon: <FaServer />,
    title: "Backend Development",
    description: "services.backendDesc",
    color: "from-slate-500 to-gray-500",
    featuresKey: "services.backendFeatures",
    delay: 0.3,
  },
];

// ====================================================================
// AI CHATBOT COMPONENT
// ====================================================================

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Alex, Jean Aime's AI assistant. Welcome to his portfolio! How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who is') || lowerMessage.includes('tell me about')) {
      return chatbotResponses.about[Math.floor(Math.random() * chatbotResponses.about.length)];
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return chatbotResponses.skills[Math.floor(Math.random() * chatbotResponses.skills.length)];
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return chatbotResponses.experience[Math.floor(Math.random() * chatbotResponses.experience.length)];
    } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('school')) {
      return chatbotResponses.education[Math.floor(Math.random() * chatbotResponses.education.length)];
    } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
      return chatbotResponses.projects[Math.floor(Math.random() * chatbotResponses.projects.length)];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
      return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you learn about Jean Aime's skills, experience, projects, and contact information. Just ask me about any of these topics!";
    } else if (lowerMessage.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to visit again if you have more questions about Jean Aime's work.";
    } else {
      return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset messages when opening
      setMessages([
        {
          id: 1,
          text: "Hello! I'm Alex, Jean Aime's AI assistant. Welcome to his portfolio! How can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={toggleChatbot}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full shadow-lg ${
            isOpen 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
              : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400'
          }`}
          data-cursor="pointer"
        >
          {isOpen ? (
            <FaTimes size={24} />
          ) : (
            <div className="relative">
              <FaEnvelope size={24} />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaRobot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Alex - AI Assistant</h3>
                    <p className="text-xs opacity-80">Always ready to help</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-slate-900/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-slate-700 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  data-cursor="pointer"
                >
                  <FaArrowRight size={16} />
                </motion.button>
              </form>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Try asking: "What are Jean Aime's skills?" or "Tell me about his projects"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ====================================================================
// MAIN APP COMPONENT
// ====================================================================

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const personalData = {
    name: "IRAGUHA Jean Aime",
    firstName: "Jean Aime",
    lastName: "IRAGUHA",
    titleKey: "hero.title",
    initials: "JA",
    email: "jeanaimeiraguha@gmail.com",
    phone: "+250 793 411 594",
    socials: {
      github: "https://github.com/jeanaimeiraguha",
      linkedin: "https://www.linkedin.com/in/jean-aime-iraguha/",
      twitter: "https://twitter.com/iraguha",
    },
    bioKey: "hero.bio",
  };

  const projects = [
    {
      id: 1,
      key: 'elearning',
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
      titleKey: "projects.items.elearning.title",
      categoryKey: "projects.categories.elearning",
      descriptionKey: "projects.items.elearning.description",
      featuresKey: "projects.items.elearning.features",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500",
      github: "https://github.com/Iraguha/elearning",
      live: "https://elearning-demo.com",
    },
    {
      id: 2,
      key: 'smartCity',
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=500&fit=crop",
      titleKey: "projects.items.smartCity.title",
      categoryKey: "projects.categories.smartCity",
      descriptionKey: "projects.items.smartCity.description",
      featuresKey: "projects.items.smartCity.features",
      technologies: ["Next.js", "Python", "PostgreSQL", "D3.js", "Docker"],
      color: "from-purple-500 to-pink-500",
      github: "https://github.com/Iraguha/smart-city",
      live: "https://smartcity-demo.com",
    },
    {
      id: 3,
      key: 'fintechApp',
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      titleKey: "projects.items.fintechApp.title",
      categoryKey: "projects.categories.fintechApp",
      descriptionKey: "projects.items.fintechApp.description",
      featuresKey: "projects.items.fintechApp.features",
      technologies: ["React Native", "Node.js", "MySQL", "Redis", "JWT"],
      color: "from-emerald-500 to-teal-500",
      github: "https://github.com/Iraguha/fintech",
      live: "https://fintech-demo.com",
    },
    {
      id: 4,
      key: 'aiHealth',
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      titleKey: "projects.items.aiHealth.title",
      categoryKey: "projects.categories.aiHealth",
      descriptionKey: "projects.items.aiHealth.description",
      featuresKey: "projects.items.aiHealth.features",
      technologies: ["React", "Python", "TensorFlow", "Firebase", "Chart.js"],
      color: "from-red-500 to-orange-500",
      github: "https://github.com/Iraguha/health-ai",
      live: "https://healthai-demo.com",
    },
  ];

  const testimonials = [
    {
      key: 'sarah',
      rating: 5,
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: 'david',
      rating: 5,
      color: "from-purple-500 to-pink-500",
    },
    {
      key: 'marie',
      rating: 5,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const aboutStats = [
    { labelKey: "about.yearsExperience", number: "3+", icon: <FaBriefcase />, color: "from-blue-500 to-cyan-500" },
    { labelKey: "about.projectsCompleted", number: "50+", icon: <FaProjectDiagram />, color: "from-purple-500 to-pink-500" },
    { labelKey: "about.happyClients", number: "30+", icon: <FaUsers />, color: "from-pink-500 to-rose-500" },
    { labelKey: "about.technologies", number: "10+", icon: <FaCode />, color: "from-emerald-500 to-teal-500" },
  ];

  const contactInfo = [
    { labelKey: 'contact.email', icon: <FaEnvelope />, value: personalData.email, href: `mailto:${personalData.email}` },
    { labelKey: 'contact.phone', icon: <FaPhone />, value: personalData.phone, href: `tel:${personalData.phone}` },
    { labelKey: 'contact.location', icon: <FaMapMarkerAlt />, valueKey: "personal.location" },
  ];

  // Set initial dark mode state to dark by default
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!('darkMode' in localStorage) && true); // Default to dark mode
    setDarkMode(isDark);
    
    // Apply dark mode class immediately to prevent white flash
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update localStorage and html class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);


  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 min-h-screen overflow-x-hidden">
        
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Body overflow is hidden when CV modal is open */}
        {isCvModalOpen && <style>{'body { overflow: hidden; }'}</style>}
        
        {/* Custom Cursor */}
        <CursorFollower />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform-origin-0 z-50"
          style={{ scaleX }}
        />

        {/* Navigation */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20 interactive-element"
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <AnimatedLogo size={40} animated={false} />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {personalData.lastName}
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {['home', 'about', 'services', 'skills', 'projects', 'testimonials', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${
                      activeSection === item
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                    data-cursor="pointer"
                  >
                    {t(`nav.${item}`)}
                  </motion.button>
                ))}
                {/* Language Switcher */}
                <div className="ml-4">
                  <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={`px-2 py-1 text-sm rounded-md ${i18n.language.startsWith('en') ? 'bg-cyan-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                    disabled={i18n.language.startsWith('en')}
                  >
                    EN
                  </button>
                  <span className="text-gray-300 dark:text-gray-600 mx-1">|</span>
                  <button
                    onClick={() => i18n.changeLanguage('kin')}
                    className={`px-2 py-1 text-sm rounded-md ${i18n.language === 'kin' ? 'bg-cyan-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                    disabled={i18n.language === 'kin'}
                  >
                    KIN
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  data-cursor="pointer"
                >
                  <motion.div
                    animate={{ rotate: darkMode ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </motion.div>
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                data-cursor="pointer"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-gray-800/20"
              >
                <div className="px-4 py-4 space-y-2">
                  {['home', 'about', 'services', 'skills', 'projects', 'testimonials', 'contact'].map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item)}
                      className={`block w-full text-left px-4 py-3 rounded-lg capitalize transition-all ${
                        activeSection === item
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {t(`nav.${item}`)}
                    </motion.button>
                  ))}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {darkMode ? t('nav.lightMode') : t('nav.darkMode')}
                  </motion.button>
                  <div className="pt-2 flex justify-center gap-4">
                     <button
                        onClick={() => i18n.changeLanguage('en')}
                        className={`px-4 py-2 text-sm rounded-md ${i18n.language.startsWith('en') ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}
                        disabled={i18n.language.startsWith('en')}
                      >
                        English
                      </button>
                      <button
                        onClick={() => i18n.changeLanguage('kin')}
                        className={`px-4 py-2 text-sm rounded-md ${i18n.language === 'kin' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}
                        disabled={i18n.language === 'kin'}
                      >
                        Kinyarwanda
                      </button>
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center relative pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="card-float"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
                >
                  Full-Stack Developer • AI & Blockchain Engineer
                </motion.h2>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                >
                  <span className="block text-gray-800 dark:text-gray-200 mb-2">Hi there, I'm</span>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Jean Aime IRAGUHA
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  I build scalable web applications, AI-powered solutions, and blockchain systems using modern technologies like React, Node.js, Python, and Web3 frameworks to solve real-world problems with clean, efficient code.
                </motion.p>


                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-6 mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: "0 15px 40px rgba(59, 130, 246, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
                    data-cursor="pointer"
                  >
                    <span className="flex items-center gap-3">
                      <FaRocket className="animate-bounce text-2xl" />
                      <span>{t('hero.viewWork')}</span>
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsCvModalOpen(true)}
                    whileHover={{ scale: 1.1, boxShadow: "0 15px 40px rgba(16, 185, 129, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-3 border-gradient-to-r from-emerald-500 to-teal-500 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 transition-all transform hover:-translate-y-1"
                    data-cursor="pointer"
                  >
                    <span className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                      <FaExternalLinkAlt className="text-2xl" />
                      <span>{t('hero.viewCV')}</span>
                    </span>
                  </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4"
                >
                  {Object.entries(personalData.socials).map(([platform, url], index) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-lg hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all"
                      data-cursor="pointer"
                    >
                      {platform === 'github' && <FaGithub size={20} />}
                      {platform === 'linkedin' && <FaLinkedin size={20} />}
                      {platform === 'twitter' && <FaEnvelope size={20} />}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative flex justify-center items-center"
              >
                {/* Animated Background Circles */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl" />
                </motion.div>

                {/* Profile Image with Orbiting Elements */}
                <div className="relative">
                  <motion.img
                    src="/iraguha profile.jpeg"
                    alt="Jean Aime IRAGUHA"
                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl border-4 border-white dark:border-slate-800"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Orbiting Skills Icons */}
                  {skills.slice(0, 6).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        x: Math.cos((index / 6) * Math.PI * 2) * 160,
                        y: Math.sin((index / 6) * Math.PI * 2) * 160,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border-2 border-gray-200 dark:border-slate-700"
                        style={{ color: skill.color }}
                        data-cursor="pointer"
                      >
                        {skill.icon}
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Floating Tech Icons */}
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-4xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      <FaReact />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4"
                    animate={{ y: [10, -10, 10], rotate: [0, -180, -360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="text-4xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      <FaNodeJs />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => scrollToSection('about')}
              data-cursor="pointer"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('hero.scrollDown')}</span>
              <FaArrowRight className="rotate-90" />
            </motion.div>
          </motion.div>
        </section>

        {/* Rest of the sections remain the same but I'll continue with the about section */}
        
        {/* Experience Section */}
        <section id="experience" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
 me                Professional <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Experience</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                3+ years of experience delivering innovative solutions across various industries
              </motion.p>
            </motion.div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-6px] top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-white dark:border-slate-800" />
                  
                  <div className="ml-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{exp.title}</h3>
                        <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right md:text-left">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 rounded-full font-semibold">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 relative bg-gray-50/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Academic <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Background</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Strong educational foundation with honors and continuous professional development
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">{edu.institution}</p>
                      <p className="text-gray-600 dark:text-gray-400">{edu.period}</p>
                      {edu.gpa && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mt-2">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {edu.description}
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">Notable Achievements:</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                          <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Professional <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Certifications</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Industry-recognized certifications demonstrating expertise in cutting-edge technologies
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-gradient-to-r from-blue-500 to-cyan-500"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <FaAward className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{cert.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                      {cert.date}
                    </span>
                    <FaExternalLinkAlt className="text-blue-500 dark:text-blue-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('about.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('about.title').split(' ')[1]}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                {t('about.subtitle')}
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl"
                  >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" />
                      {t('about.journeyTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.journeyText')}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl"
                  >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <FaHeart className="text-red-500" />
                      {t('about.loveTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.loveText')}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl"
                  >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <FaRocket className="text-green-500" />
                      {t('about.missionTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.missionText')}</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {aboutStats.map((stat, index) => (
                    <motion.div
                      key={stat.labelKey}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      className="relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl"
                      data-cursor="pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-2xl`} />
                      <div className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.icon}
                      </div>
                      <h4 className="text-3xl font-bold mb-1">{stat.number}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t(stat.labelKey)}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Fun Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaCoffee className="text-orange-500" />
                    {t('about.funFactsTitle')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      {t('about.fact1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      {t('about.fact2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      {t('about.fact3')}
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      {t('about.fact4')}
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 relative bg-gray-50/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('services.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('services.title').split(' ')[1]}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                  data-cursor="pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl`} />
                  <div className="relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} text-white text-3xl mb-4`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t(service.title.toLowerCase().replace(" ", ""))}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{t(service.description)}</p>
                    <ul className="space-y-2">
                      {Array.isArray(t(service.featuresKey, { returnObjects: true })) && 
                        t(service.featuresKey, { returnObjects: true }).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <FaCheckCircle className="text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('skills.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('skills.title').split(' ')[1]}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('skills.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg"
                  data-cursor="pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl" style={{ color: skill.color }}>
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{skill.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.level}% {t('skills.proficiency')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="absolute h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}dd 100%)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative bg-gray-50/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('projects.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('projects.title').split(' ')[1]}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('projects.subtitle')}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
                  data-cursor="pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                    <img
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold capitalize">
                        {t(project.categoryKey)}
                      </span>
                    </div>

                    {/* Project Links (visible on hover) */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                      </motion.a>
                    </div>

                    {/* Project Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{t(project.titleKey)}</h3>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t(project.descriptionKey)}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {Array.isArray(t(project.featuresKey, { returnObjects: true })) && 
                        t(project.featuresKey, { returnObjects: true }).slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <FaCheckCircle className="text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('testimonials.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('testimonials.title').split(' ')[1]}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const testimonialContent = t(`testimonials.items.${testimonial.key}`, { returnObjects: true }) || {};
                return (
                <motion.div
                  key={testimonial.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg"
                  data-cursor="pointer"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color} rounded-t-2xl`} />
                  
                  <FaQuoteLeft className="text-3xl text-gray-300 dark:text-slate-600 mb-4" />
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                    "{testimonialContent.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{testimonialContent.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonialContent.role}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative bg-gray-50/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('contact.title').split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('contact.title').split(' ')[1]}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.labelKey}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg cursor-pointer"
                    data-cursor="pointer"
                  >
                    <div className="text-3xl text-blue-600 dark:text-blue-400 mb-3">
                      {info.icon}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t(info.labelKey)}</p>
                    <p className="font-semibold text-center">{info.valueKey ? t(info.valueKey) : info.value}</p>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {t('contact.reachOut')}
                </p>
                <div className="flex justify-center gap-4">
                  {Object.entries(personalData.socials).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg"
                      data-cursor="pointer"
                    >
                      {platform === 'github' && <FaGithub size={24} />}
                      {platform === 'linkedin' && <FaLinkedin size={24} />}
                      {platform === 'twitter' && <FaEnvelope size={24} />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Chatbot Component */}
        <Chatbot />

        {/* Footer */}
        <footer className="py-8 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <AnimatedLogo size={50} animated={false} />
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © {new Date().getFullYear()} {personalData.name}. {t('footer.rights')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('footer.builtWith')}
            </p>
          </div>
        </footer>

        {/* CV Modal */}
        <AnimatePresence>
          {isCvModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setIsCvModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full overflow-y-auto">
                  <Suspense fallback={<div className="p-8 text-center">Loading CV...</div>}>
                    <CVPage darkMode={darkMode} setDarkMode={setDarkMode} isModal={true} />
                  </Suspense>
                </div>
                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-slate-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close CV"
                >
                  <FaTimes />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}