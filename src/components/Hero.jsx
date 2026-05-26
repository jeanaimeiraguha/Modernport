import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaArrowRight, FaDownload } from 'react-icons/fa';

const ROLES = [
  'Full-Stack Engineer',
  'CTO @ Igifu Meals',
  'AI & ML Builder',
  'Blockchain Developer',
  'Open to Remote Roles',
];

function useTypewriter(words, speed = 75, pause = 2000) {
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

const item = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
});

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col lg:flex-row lg:items-start items-center gap-8 lg:gap-16">

        {/* ── Left — Text ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Name */}
          <motion.h1
            {...item(0.07)}
            className="font-display font-bold leading-[1.05] mb-3"
            style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Jean Aime<br />
            <span style={{ color: 'var(--accent)' }}>Iraguha</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div {...item(0.13)} className="flex items-center gap-2 mb-5 h-7">
            <span className="text-base sm:text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
              {role}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="inline-block w-[2px] h-4 rounded-sm"
              style={{ background: 'var(--accent)' }}
            />
          </motion.div>

          {/* Pitch */}
          <motion.p
            {...item(0.19)}
            className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 sm:mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            I build software that solves real problems, scales under pressure, and{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>stays reliable beyond the prototype.</span>
            {' '}I don't just write code —{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>I build solutions meant to last.</span>
          </motion.p>

          {/* Stats */}
          <motion.div {...item(0.24)} className="flex gap-6 sm:gap-8 mb-6 sm:mb-8 justify-center lg:justify-start">
            {[
              { value: '4+',  label: 'Years' },
              { value: '50+', label: 'Projects' },
              { value: '30+', label: 'Clients' },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center lg:items-start">
                {i > 0 && (
                  <div className="hidden lg:block absolute" />
                )}
                <span className="font-display font-bold text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
                <span className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...item(0.3)} className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-5 sm:mb-7">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg text-white"
              style={{ background: 'var(--accent)' }}
              whileHover={{ background: 'var(--accent-hover)' }}
              whileTap={{ scale: 0.97 }}
            >
              View my work <FaArrowRight size={11} />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              whileHover={{ borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
              whileTap={{ scale: 0.97 }}
            >
              Let's talk
            </motion.button>

            <motion.a
              href="/cv"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              whileHover={{ borderColor: 'rgba(99,102,241,0.4)', color: 'var(--text-primary)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload size={11} /> Resume
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div {...item(0.36)} className="flex items-center gap-3">
            {[
              { icon: <FaLinkedin size={15} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn' },
              { icon: <FaGithub size={15} />,   href: 'https://github.com/',                                        label: 'GitHub'   },
              { icon: <FaWhatsapp size={15} />, href: 'https://wa.me/250793411594',                                 label: 'WhatsApp' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                whileTap={{ scale: 0.93 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Portrait ── */}
        <motion.div
          className="shrink-0 order-1 lg:order-2 flex flex-col items-center gap-4 lg:pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait — circle */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 'clamp(180px, 45vw, 320px)', height: 'clamp(180px, 45vw, 320px)' }}
          >
            {/* Outer decorative ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(99,102,241,0.18)' }}
            />
            {/* Inner accent ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: '12px',
                border: '1px solid rgba(99,102,241,0.1)',
              }}
            />

            {/* Photo circle */}
            <div
              className="absolute overflow-hidden rounded-full"
              style={{
                inset: '20px',
                border: '3px solid var(--bg-elevated)',
                boxShadow: '0 0 0 1px var(--border)',
              }}
            >
              <img
                src="/aime rm.png"
                alt="Jean Aime Iraguha"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Available badge — bottom center, outside the rings */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
              style={{
                background: 'var(--bg-elevated)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.25)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
              Open to work
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
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
