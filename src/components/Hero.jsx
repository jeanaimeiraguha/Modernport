import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaArrowRight, FaDownload } from 'react-icons/fa';
import BlockchainGlobe from './BlockchainGlobe';

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

const rise = (delay) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: 'var(--gradient-dark)' }}
    >
      {/* Faint technical grid, as on the reference's banner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Corner light */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%', right: '-10%', width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(9,145,223,0.18), transparent 65%)',
        }}
      />

      <div
        className="qt-container relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-8"
        style={{ paddingTop: 170, paddingBottom: 110, minHeight: '100vh' }}
      >
        {/* ══ Copy ══ */}
        <div className="max-w-[640px]">
          {/* Eyebrow — 18px, 600, uppercase, 1px tracking */}
          <motion.h4
            {...rise(0.05)}
            style={{
              fontSize: 18,
              lineHeight: '30px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: 18,
            }}
          >
            Jean Aime Iraguha
          </motion.h4>

          <motion.h1
            {...rise(0.12)}
            style={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            I Build, Secure, And Ship Production-Grade Digital Products.
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            style={{
              color: '#ffffff',
              opacity: 0.9,
              fontSize: 17,
              lineHeight: '30px',
              maxWidth: 540,
              marginBottom: 14,
            }}
          >
            Full-stack engineer and founder from Kigali, Rwanda, dedicated to turning ideas into
            software that scales under pressure and stays reliable long past the prototype.
          </motion.p>

          {/* Live role ticker */}
          <motion.div
            {...rise(0.26)}
            className="flex items-center gap-2.5"
            style={{ marginBottom: 36, height: 30 }}
          >
            <span className="glow-dot" />
            <span style={{ color: '#ffffff', fontWeight: 600, fontSize: 16 }}>
              {role}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
              className="inline-block"
              style={{ width: 2, height: 17, background: 'var(--accent-sky)' }}
            />
          </motion.div>

          {/* Buttons — square, as on the reference */}
          <motion.div {...rise(0.32)} className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-one btn-light"
            >
              Explore More
              <span className="btn-icon"><FaArrowRight size={12} /></span>
            </button>
            <a href="/cv/Jean-Aime-Iraguha-CV.pdf" download className="btn-one btn-outline-light">
              Download CV
              <span className="btn-icon"><FaDownload size={12} /></span>
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...rise(0.38)} className="qt-sidebar-social flex items-center gap-3 mt-10">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: '#ffffff' }}
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
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <BlockchainGlobe size={560} tone="dark" />

          {/* Floating label — names what the visual is showing */}
          <div
            className="absolute hidden sm:flex items-center gap-2.5 animate-sway-y"
            style={{
              bottom: '6%',
              left: 0,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.16)',
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
              style={{ color: '#ffffff', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Distributed Ledger · Live Peers
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.getElementById('counters')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute left-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ bottom: 28, transform: 'translateX(-50%)', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll down"
      >
        <span
          className="font-mono"
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)' }}
        />
      </motion.button>
    </section>
  );
}
