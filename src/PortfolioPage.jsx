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
    SiJavascript, SiBootstrap, SiExpress
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
];

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

  // Set initial dark mode state from localStorage or system preference
  useEffect(() => {
    const isDark =
      localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
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
          className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20"
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full text-sm font-semibold mb-6"
                >
                  <motion.span
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    👋
                  </motion.span>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {t('hero.welcome')}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                >
                  {t('hero.greeting')}{' '}
                  <AnimatedText 
                    text={t('hero.firstName')}
                    className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block text-gray-700 dark:text-gray-300"
                  >
                    {t('hero.lastName')}
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-4"
                >
                  {t(personalData.titleKey)}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                >
                  {t(personalData.bioKey)}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold shadow-lg flex items-center gap-2 transition-all"
                    data-cursor="pointer"
                  >
                    <FaRocket className="animate-bounce" />
                    {t('hero.viewWork')}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsCvModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                    data-cursor="pointer"
                  >
                    <FaExternalLinkAlt />
                    {t('hero.viewCV')}
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

              {/* Hero Animation/Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative flex justify-center items-center"
              >
                <div className="relative">
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

                  {/* Central Logo */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10"
                  >
                    <AnimatedLogo size={300} animated={true} />
                  </motion.div>

                  {/* Orbiting Elements */}
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
                        x: Math.cos((index / 6) * Math.PI * 2) * 180,
                        y: Math.sin((index / 6) * Math.PI * 2) * 180,
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
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                        style={{ color: skill.color }}
                        data-cursor="pointer"
                      >
                        {skill.icon}
                      </motion.div>
                    </motion.div>
                  ))}
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