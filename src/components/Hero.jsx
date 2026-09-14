import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaArrowRight, FaDownload } from 'react-icons/fa';
import GlobeCanvas from './GlobeCanvas';
import WaveField from './WaveField';
import StarField from './StarField';
import CodeWindow from './CodeWindow';
import { useMagnetic } from './motion';

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

const item = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay } },
});

export default function Hero() {
  const role = useTypewriter(ROLES);
  const magnetic = useMagnetic(0.3);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 });
  const imgX    = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY    = useTransform(springY, [-1, 1], [-5, 5]);

  useEffect(() => {
    const fn = (e) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ background: 'var(--bg-base)', minHeight: '100vh' }}
    >
      {/* Deep gradient wash — lifts flat navy into a richer, bertin-style depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1100px 700px at 85% -5%, rgba(20,90,150,0.35), transparent 60%), ' +
            'radial-gradient(ellipse 900px 600px at 100% 100%, rgba(20,120,110,0.22), transparent 60%)',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.18 }} />

      {/* Star field — upper reaches of the hero */}
      <StarField count={32} className="hidden sm:block" />

      {/* Flowing wave-grid — the "advanced" signature layer, bottom half */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '62%' }}>
        <WaveField color="45,212,191" opacity={0.9} />
      </div>

      {/* Ambient glow orbs — depth behind the globe/portrait */}
      <div
        className="orb animate-orb hidden sm:block"
        style={{ top: '18%', right: '8%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(20,184,166,0.22), transparent 70%)' }}
      />
      <div
        className="orb animate-orb hidden sm:block"
        style={{ bottom: '8%', right: '20%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(167,139,250,0.16), transparent 70%)', animationDelay: '-7s' }}
      />

      {/* Globe — centered on the right half, clearly visible */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top:    '50%',
          right:  '2%',
          width:  620,
          height: 620,
          transform: 'translateY(-50%)',
        }}
      >
        <GlobeCanvas opacity={0.4} size={0.46} />
      </div>

      {/* Gradient mask — fades effects where they meet the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--bg-base) 30%, transparent 60%, transparent 80%, var(--bg-base) 100%)',
        }}
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

      {/* ── Main content row ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16"
        style={{ paddingTop: 'calc(64px + 3rem)', paddingBottom: '3rem' }}
      >

        {/* ── LEFT: text ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Available badge */}
          <motion.div {...item(0.05)} className="mb-5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(74,222,128,0.06)',
                border:     '1px solid rgba(74,222,128,0.18)',
                color:      '#16a34a',
              }}
            >
              <span className="glow-dot" />
              Available for new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...item(0.1)}
            className="font-display font-bold mb-4"
            style={{
              fontSize:      'clamp(3rem, 6.6vw, 5.25rem)',
              color:         'var(--text-primary)',
              letterSpacing: '-0.04em',
              lineHeight:    1.0,
            }}
          >
            Jean Aime<br />
            <span className="gradient-text">Iraguha</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div {...item(0.16)} className="flex items-center gap-2 mb-5" style={{ height: 32 }}>
            <span
              className="font-display font-medium"
              style={{ fontSize: '1.1875rem', color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
            >
              {role}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
              className="inline-block w-[2px] h-5 rounded-sm"
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

          {/* Stats */}
          <motion.div {...item(0.27)} className="flex gap-8 mb-7 justify-center lg:justify-start">
            {[
              { value: '4+',  label: 'Years'    },
              { value: '50+', label: 'Projects' },
              { value: '30+', label: 'Clients'  },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center lg:items-start">
                <span
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...item(0.32)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              {...magnetic.handlers}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white"
              style={{ background: 'var(--gradient-brand)', ...magnetic.style, boxShadow: '0 8px 28px rgba(45,212,191,0.32)' }}
              whileHover={{ opacity: 0.9 }}
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
          <motion.div {...item(0.37)} className="flex items-center gap-2">
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

        {/* ── RIGHT: portrait ── */}
        <motion.div
          className="shrink-0 order-1 lg:order-2 flex items-center justify-center"
          style={{ x: imgX, y: imgY }}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">

            {/* Halo glow behind portrait — echoes the glow bertin uses behind its 3D object */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-18%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(45,212,191,0.28) 0%, rgba(167,139,250,0.14) 45%, transparent 72%)',
                filter: 'blur(28px)',
                animation: 'pulse-slow 4.5s ease-in-out infinite',
              }}
            />

            {/* Slow rotating ring — desktop */}
            <motion.div
              className="absolute hidden lg:block rounded-full pointer-events-none"
              style={{ inset: -16, border: '1px solid rgba(20,184,166,0.14)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Portrait image ──
                Mobile  : 220×220 circle
                Desktop : 300×380 rounded rectangle — shows full face + shoulders
            */}
            <div
              className="overflow-hidden"
              style={{
                width:        'clamp(220px, 28vw, 300px)',
                height:       'clamp(220px, 35vw, 380px)',
                borderRadius: 'clamp(110px, 14vw, 150px) clamp(110px, 14vw, 150px) 20px 20px',
                border:       '1px solid var(--border)',
                boxShadow:    '0 16px 48px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)',
                background:   'var(--bg-elevated)',
              }}
            >
              <img
                src="/images/profile/aime-headshot.jpg"
                alt="Jean Aime Iraguha"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>

            {/* Floating code window — a literal "engineer" visual, echoing bertin's floating 3D object */}
            <CodeWindow className="hidden lg:block" style={{ left: -140, bottom: 36 }} />

            {/* Available badge */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
              style={{
                bottom:     -14,
                background: 'var(--bg-surface)',
                color:      '#16a34a',
                border:     '1px solid rgba(74,222,128,0.2)',
                boxShadow:  '0 4px 16px rgba(0,0,0,0.07)',
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="glow-dot" />
              Open to work
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
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
