import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaRocket, FaDownload, FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiSolidity } from 'react-icons/si';

/* ── Typewriter roles ── */
const ROLES = [
  'Full-Stack Engineer',
  'CTO @ Igifu Meals',
  'AI & ML Builder',
  'Blockchain Developer',
  'Computer Vision Dev',
  'Open to Remote Roles',
];

/* ── Tech badges — left column & right column, never overlapping content ── */
const LEFT_BADGES = [
  { label: 'React',      icon: FaReact,      color: '#61dafb', delay: 0.2 },
  { label: 'Node.js',    icon: FaNodeJs,     color: '#68a063', delay: 0.4 },
  { label: 'Python',     icon: FaPython,     color: '#ffd43b', delay: 0.6 },
  { label: 'Docker',     icon: FaDocker,     color: '#2496ed', delay: 0.8 },
];
const RIGHT_BADGES = [
  { label: 'Next.js',    icon: SiNextdotjs,  color: '#e2e8f0', delay: 0.3 },
  { label: 'TypeScript', icon: SiTypescript, color: '#3178c6', delay: 0.5 },
  { label: 'AWS',        icon: FaAws,        color: '#ff9900', delay: 0.7 },
  { label: 'Solidity',   icon: SiSolidity,   color: '#a78bfa', delay: 0.9 },
];

/* ── Stats ── */
const STATS = [
  { value: '4+',  label: 'Years' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '1',   label: 'Startup' },
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(deleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ── Particle dot ── */
function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'rgba(99,102,241,0.35)' }}
      animate={{ y: [0, -28, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Single floating badge ── */
function TechBadge({ label, icon: Icon, color, delay, floatY = 7 }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl select-none pointer-events-none"
      style={{
        background: 'rgba(13,13,26,0.82)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        width: 'max-content',
      }}
      initial={{ opacity: 0, scale: 0.75, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -floatY, 0] }}
      transition={{
        opacity: { delay, duration: 0.4 },
        scale:   { delay, duration: 0.4 },
        y:       { delay: delay + 0.4, duration: 3 + delay * 0.4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <Icon size={14} style={{ color, flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.01em' }}>{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const sectionRef = useRef(null);

  /* Mouse-tracking spotlight */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  /* Random particles */
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 95}%`,
      y: `${Math.random() * 90}%`,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }))
  ).current;

  const item = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Mouse-tracking spotlight */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)',
          translateX: '-50%',
          translateY: '-50%',
          left: glowX,
          top: glowY,
        }}
      />

      {/* Static ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none animate-float" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full pointer-events-none animate-float" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)', filter: 'blur(30px)', animationDelay: '2s' }} />

      {/* Particles */}
      {particles.map((p) => <Particle key={p.id} {...p} />)}

      {/* ── Left badge column ── */}
      <div className="absolute left-4 xl:left-10 top-0 bottom-0 hidden xl:flex flex-col justify-center gap-4 pointer-events-none" style={{ zIndex: 5 }}>
        {LEFT_BADGES.map((b) => <TechBadge key={b.label} {...b} />)}
      </div>

      {/* ── Right badge column ── */}
      <div className="absolute right-4 xl:right-10 top-0 bottom-0 hidden xl:flex flex-col justify-center gap-4 pointer-events-none" style={{ zIndex: 5 }}>
        {RIGHT_BADGES.map((b) => <TechBadge key={b.label} {...b} />)}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-16 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Status badge */}
          <motion.div {...item(0)} className="mb-6">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold cursor-default"
              style={{
                background: 'rgba(99,102,241,0.08)',
                color: 'var(--accent)',
                border: '1px solid rgba(99,102,241,0.22)',
              }}
              whileHover={{ scale: 1.04, background: 'rgba(99,102,241,0.14)' }}
            >
              <span className="glow-dot" />
              Open to senior / lead roles · Remote-first
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...item(0.08)}
            className="font-display font-bold leading-[1.04] mb-3"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 3.75rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Jean Aime
            <br />
            <motion.span
              style={{ color: 'var(--text-primary)', display: 'inline-block' }}
            >
              IRAGUHA
            </motion.span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div {...item(0.15)} className="flex items-center gap-2 mb-5 h-8">
            <span className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--accent)' }}>>
              {role}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-5 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
          </motion.div>

          {/* Pitch */}
          <motion.p
            {...item(0.22)}
            className="text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            I don't just write code —{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>I architect systems that outlast deadlines.</span>
            {' '}4+ years turning brutal real-world problems into{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>clean, battle-tested software</span>
            {' '}across fintech, edtech & food-tech.
          </motion.p>

          {/* Stats row */}
          <motion.div {...item(0.28)} className="flex gap-5 mb-9 justify-center lg:justify-start">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <span className="font-display font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...item(0.35)} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white font-sans"
              style={{ background: 'var(--accent)', boxShadow: '0 0 0 0 rgba(99,102,241,0)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px 4px rgba(99,102,241,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaRocket size={12} /> View my work
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl font-sans"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent)', color: 'var(--text-primary)', boxShadow: '0 0 16px 2px rgba(99,102,241,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              Let's talk
            </motion.button>

            <motion.a
              href="/cv"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl font-sans"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.4)', color: 'var(--text-primary)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload size={11} /> Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div {...item(0.42)} className="flex items-center gap-3 mt-7">
            {[
              { icon: <FaLinkedin size={16} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn' },
              { icon: <FaGithub size={16} />,   href: 'https://github.com/',                                        label: 'GitHub'   },
              { icon: <FaWhatsapp size={16} />, href: 'https://wa.me/250793411594',                                 label: 'WhatsApp' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                whileHover={{ scale: 1.12, borderColor: 'var(--accent)', color: 'var(--accent)', y: -2 }}
                whileTap={{ scale: 0.93 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Avatar ── */}
        <motion.div
          className="flex flex-col items-center gap-6 shrink-0 w-full lg:w-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar with rings */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-56 lg:h-56 mx-auto overflow-hidden rounded-full">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -20, border: '1px solid rgba(99,102,241,0.15)' }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Mid pulse ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -10, border: '1px solid rgba(99,102,241,0.22)' }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            {/* Spinning conic ring */}
            <motion.div
              className="absolute inset-[-5px] rounded-full"
              style={{
                background: 'conic-gradient(var(--accent) 0deg 90deg, transparent 90deg 270deg, var(--accent) 270deg 360deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            <motion.img
              src="/aime rm.png"
              alt="Jean Aime Iraguha"
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
            {/* Online dot */}
            <motion.span
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full"
              style={{ background: '#4ade80', border: '2px solid var(--bg-base)', boxShadow: '0 0 10px rgba(74,222,128,0.7)' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 w-[260px] sm:w-[300px] lg:w-[220px]">
            {[
              { value: '4+',  label: 'Yrs exp.',    color: '#6366f1' },
              { value: '50+', label: 'Projects',    color: '#a78bfa' },
              { value: 'CTO', label: 'Igifu Meals', color: '#34d399' },
              { value: '30+', label: 'Clients',     color: '#f59e0b' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="rounded-xl p-3 text-center cursor-default"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.06, borderColor: s.color, boxShadow: `0 0 16px ${s.color}22` }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <p className="font-display text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid var(--border)' }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
