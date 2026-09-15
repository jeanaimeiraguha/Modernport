import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaArrowRight, FaDownload } from 'react-icons/fa';
import { useMagnetic } from './motion';
import { STATS } from './data';

const ROLES = [
  'Full-Stack Engineer',
  'Founder Mode',
  'Blockchain Developer',
  'AI & ML Builder',
  'Open to Remote Roles',
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

function StatCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value, 10) || 0;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 40;
        const inc = target / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref} className="flex flex-col items-center sm:items-start">
      <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
        {count}{suffix}
      </span>
      <span className="text-[10px] uppercase tracking-[0.16em] mt-1 text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

const item = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay } },
});

export default function Hero() {
  const role = useTypewriter(ROLES);
  const magnetic = useMagnetic(0.3);

  // Cursor-following name tag — a small badge that trails the pointer while
  // hovering the hero, in place of a permanent name heading.
  const [tagVisible, setTagVisible] = useState(false);
  const tagX = useMotionValue(0);
  const tagY = useMotionValue(0);
  const tagSpringX = useSpring(tagX, { stiffness: 260, damping: 26, mass: 0.4 });
  const tagSpringY = useSpring(tagY, { stiffness: 260, damping: 26, mass: 0.4 });

  const handleHeroMouseMove = (e) => {
    tagX.set(e.clientX);
    tagY.set(e.clientY);
    if (!tagVisible) setTagVisible(true);
  };

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ background: 'var(--bg-base)', minHeight: '100vh' }}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={() => setTagVisible(false)}
    >
      {/* Cursor-following name tag (pointer devices only) */}
      <motion.div
        className="hidden lg:block px-4 py-2 rounded-full pointer-events-none"
        style={{
          position: 'fixed',
          left: tagSpringX,
          top: tagSpringY,
          x: 16,
          y: 16,
          zIndex: 60,
          background: 'var(--brand-blue)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 26px rgba(59,107,240,0.4)',
        }}
        animate={{ opacity: tagVisible ? 1 : 0, scale: tagVisible ? 1 : 0.85 }}
        transition={{ duration: 0.2 }}
      >
        Jean Aime Iraguha
      </motion.div>
      {/* Deep gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 15% -5%, rgba(20,140,130,0.12), transparent 60%), ' +
            'radial-gradient(ellipse 700px 500px at 100% 100%, rgba(20,140,130,0.08), transparent 60%)',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.18 }} />

      {/* Ambient glow orbs — kept away from the portrait zone so its backdrop
          stays neutral dark rather than color-tinted */}
      <div
        className="orb animate-orb hidden sm:block"
        style={{ top: '10%', left: '18%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(20,184,166,0.14), transparent 70%)' }}
      />
      <div
        className="orb animate-orb hidden sm:block"
        style={{ bottom: '4%', left: '32%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)', animationDelay: '-7s' }}
      />

      {/* Top + bottom fades */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 140, background: 'linear-gradient(to bottom, var(--bg-base), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 140, background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />

      {/* ── Portrait — bleeds off the right edge (and toward the top) of the
          viewport, grayscale, concentric rings behind it, echoing the
          reference's cutout treatment ── */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{ top: 78, right: -50, width: 620, height: 620 }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Concentric rings */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                inset: `${i * 11}%`,
                border: '1px solid rgba(210,215,220,0.16)',
              }}
            />
          ))}

          {/* Soft glow — a faint brand hint, not a color cast */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '22%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 72%)',
              filter: 'blur(30px)',
              animation: 'pulse-slow 4.5s ease-in-out infinite',
            }}
          />

          <img
            src="/images/profile/iraguha-cutout.png"
            alt="Jean Aime Iraguha"
            className="absolute"
            style={{
              width: 380,
              height: 'auto',
              left: '50%',
              top: '6%',
              transform: 'translateX(-50%)',
              filter: 'grayscale(1) contrast(1.05)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 flex flex-col gap-14"
        style={{ paddingTop: 'calc(64px + 3rem)', paddingBottom: '3rem' }}
      >

        <div className="flex flex-col">

          {/* ── LEFT: text ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">

            {/* Tagline headline — the statement takes the spotlight, the name
                lives in the cursor-tag and the byline below */}
            <motion.h1
              {...item(0.1)}
              className="font-display font-bold mb-5"
              style={{
                fontSize:      'clamp(2rem, 3.6vw, 2.875rem)',
                color:         'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight:    1.15,
                maxWidth:      620,
              }}
            >
              Full-Stack Engineering,<br />
              Founder-Level Ownership,<br />
              Production-Grade Code.
            </motion.h1>

            {/* Byline */}
            <motion.div {...item(0.16)} className="flex items-center gap-2 mb-5" style={{ height: 28 }}>
              <span className="glow-dot" />
              <span
                className="font-display font-medium"
                style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
              >
                Jean Aime Iraguha · {role}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                className="inline-block w-[2px] h-4 rounded-sm"
                style={{ background: 'var(--accent)' }}
              />
            </motion.div>

            {/* Pitch */}
            <motion.p
              {...item(0.22)}
              className="leading-relaxed max-w-md mb-7"
              style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}
            >
              I build software that solves real problems, scales under pressure, and{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>stays reliable beyond the prototype.</strong>
              {' '}Currently building a startup from the ground up as{' '}
              <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>founder</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div {...item(0.28)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                {...magnetic.handlers}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white"
                style={{ background: 'var(--accent)', ...magnetic.style, boxShadow: '0 8px 24px rgba(20,184,166,0.28)' }}
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
              >
                View my work
                <span
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.22)' }}
                >
                  <FaArrowRight size={9} />
                </span>
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                whileHover={{ borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
                whileTap={{ scale: 0.97 }}
              >
                Let's talk
              </motion.button>

              <motion.a
                href="/cv/Jean-Aime-Iraguha-CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                whileHover={{ borderColor: 'rgba(20,184,166,0.35)', color: 'var(--text-primary)' }}
                whileTap={{ scale: 0.97 }}
              >
                <FaDownload size={11} /> Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div {...item(0.34)} className="flex items-center gap-2">
              {[
                { icon: <FaLinkedin size={14} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn'  },
                { icon: <FaGithub   size={14} />, href: 'https://github.com/jeanaimeiraguha',                        label: 'GitHub'    },
                { icon: <FaWhatsapp size={14} />, href: 'https://wa.me/250793411594',                                label: 'WhatsApp'  },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Stats / bio panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl grid sm:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 p-6 sm:p-8"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          {/* Mini terminal */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(6,7,9,0.7)', border: '1px solid var(--border)' }}
          >
            <div
              className="flex items-center gap-1.5 px-3.5 py-2.5"
              style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            </div>
            <div className="px-4 py-4 text-[11px] leading-[1.9] font-mono" style={{ color: '#94a8ba' }}>
              I'm a software engineer with a passion for creating user-friendly applications. I'm a
              software engineer with a passion for creating user-friendly applications. I'm a software
              engineer with a passion for creating user-friendly applications.
            </div>
          </div>

          {/* Stats + socials */}
          <div className="flex flex-col justify-between gap-6">
            <div className="grid grid-cols-3 gap-4">
              {STATS.slice(0, 3).map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: <FaGithub size={13} />,   href: 'https://github.com/jeanaimeiraguha',                        label: 'GitHub'   },
                { icon: <FaLinkedin size={13} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid var(--border)' }}
        >
          <div className="w-1 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
