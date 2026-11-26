import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaLinkedin, FaGithub, FaWhatsapp, FaArrowRight,
  FaDownload, FaMapMarkerAlt, FaBriefcase, FaCode,
} from 'react-icons/fa';
import BlockchainGlobe from './BlockchainGlobe';
import { useMagnetic } from './motion';

const ROLES = [
  'Full-Stack Engineer',
  'Blockchain Developer',
  'AI & ML Builder',
  'Founder & Product Engineer',
];

function useTypewriter(words, speed = 70, pause = 2200) {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting && display === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(() => {
        setDisplay(deleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

const SOCIALS = [
  { icon: <FaLinkedin size={15} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn' },
  { icon: <FaGithub   size={15} />, href: 'https://github.com/jeanaimeiraguha',                       label: 'GitHub'   },
  { icon: <FaWhatsapp size={15} />, href: 'https://wa.me/250793411594',                               label: 'WhatsApp' },
];

/* Scannable facts — what a recruiter checks in the first five seconds. */
const FACTS = [
  { icon: <FaBriefcase size={11} />,    text: '4+ years shipping production' },
  { icon: <FaCode size={11} />,         text: '50+ projects delivered' },
  { icon: <FaMapMarkerAlt size={11} />, text: 'Kigali, Rwanda · Remote-first' },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  const role = useTypewriter(ROLES);
  const magnetic = useMagnetic(0.25);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Technical grid, faded out toward the edges */}
      <div className="absolute inset-0 grid-bg grid-mask pointer-events-none" aria-hidden="true" />

      <div
        className="qt-container relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-8"
        style={{ paddingTop: 165, paddingBottom: 110, minHeight: '100vh' }}
      >
        {/* ══ Copy ══ */}
        <div className="max-w-[660px]">
          {/* Availability badge */}
          <motion.div {...rise(0.05)} style={{ marginBottom: 26 }}>
            <span className="pill">
              <span className="glow-dot" style={{ width: 7, height: 7, boxShadow: 'none' }} />
              Open to senior &amp; lead roles
            </span>
          </motion.div>

          <motion.h1 {...rise(0.12)} style={{ color: 'var(--fg)', marginBottom: 22 }}>
            I build, secure and ship
            <br />
            <span style={{ color: 'var(--accent-sky)' }}>production-grade</span> software.
          </motion.h1>

          {/* Live role ticker */}
          <motion.div
            {...rise(0.2)}
            className="flex items-center gap-3 flex-wrap"
            style={{ marginBottom: 22 }}
          >
            <span
              style={{
                color: 'var(--fg-subtle)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Jean Aime Iraguha
            </span>
            <span style={{ width: 18, height: 1, background: 'var(--line)' }} />
            <span
              className="inline-flex items-center"
              style={{ color: 'var(--fg)', fontWeight: 700, fontSize: 17, minHeight: 26 }}
            >
              {role}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                className="inline-block"
                style={{ width: 2, height: 18, marginLeft: 3, background: 'var(--accent-sky)' }}
              />
            </span>
          </motion.div>

          <motion.p
            {...rise(0.26)}
            className="lead"
            style={{ color: 'var(--fg-muted)', maxWidth: 540, marginBottom: 30 }}
          >
            Full-stack engineer and founder from Kigali, turning ideas into software that scales
            under pressure and stays reliable long past the prototype.
          </motion.p>

          {/* Quick facts */}
          <motion.ul
            {...rise(0.32)}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ marginBottom: 38 }}
          >
            {FACTS.map((f) => (
              <li
                key={f.text}
                className="inline-flex items-center gap-2"
                style={{ color: 'var(--fg-muted)', fontSize: 14 }}
              >
                <span style={{ color: 'var(--accent-sky)', display: 'inline-flex' }}>{f.icon}</span>
                {f.text}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div {...rise(0.38)} className="flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              {...magnetic.handlers}
              style={magnetic.style}
              className="btn-one pressable"
            >
              View My Work
              <span className="btn-icon"><FaArrowRight size={12} /></span>
            </motion.button>
            <a href="/cv/Jean-Aime-Iraguha-CV.pdf" download className="btn-two pressable">
              Download CV
              <span className="btn-icon"><FaDownload size={12} /></span>
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...rise(0.44)} className="qt-sidebar-social flex items-center gap-3 mt-10">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="pressable"
                style={{ color: 'var(--fg)' }}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ══ Blockchain globe ══ */}
        <motion.div
          className="relative flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <BlockchainGlobe size={560} tone="light" />

          <div
            className="absolute hidden sm:flex items-center gap-2.5 animate-sway-y"
            style={{
              bottom: '6%',
              left: 0,
              background: 'var(--bg-2)',
              border: '1px solid var(--line)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '10px 16px',
            }}
          >
            <span
              style={{
                width: 7, height: 7, background: 'var(--accent-sky)',
                transform: 'rotate(45deg)', flexShrink: 0,
              }}
            />
            <span
              className="font-mono"
              style={{
                color: 'var(--fg)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              Distributed Ledger · Live Peers
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute left-1/2 hidden sm:flex flex-col items-center gap-2 pressable"
        style={{ bottom: 28, transform: 'translateX(-50%)', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to next section"
      >
        <span
          className="font-mono"
          style={{
            color: 'var(--fg-subtle)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 26, background: 'var(--line)' }}
        />
      </motion.button>
    </section>
  );
}
