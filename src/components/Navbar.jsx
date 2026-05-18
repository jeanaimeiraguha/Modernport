import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './data';
import { useTheme } from '../ThemeContext';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme }  = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleNav = (id) => { scrollTo(id); setOpen(false); };

  const navBg = scrolled
    ? theme === 'dark'
      ? 'rgba(10,10,15,0.88)'
      : 'rgba(248,248,246,0.88)'
    : 'transparent';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-[10px] group"
          aria-label="Jean Aime Iraguha"
        >
          {/* SVG monogram mark */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background square with cut corner */}
            <path d="M4 0h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="var(--accent)" />
            {/* J letter */}
            <text x="4" y="26" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="white" letterSpacing="-1">J</text>
            {/* A letter — slightly offset, accent-tinted */}
            <text x="16" y="26" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="rgba(255,255,255,0.75)" letterSpacing="-1">A</text>
            {/* Bottom accent line */}
            <rect x="4" y="30" width="28" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
          </svg>

          {/* Wordmark */}
          <span
            className="font-display font-bold tracking-tight transition-colors"
            style={{ fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Iraguha<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => handleNav(l)}
                className="text-[0.9375rem] font-medium capitalize transition-colors hover:opacity-100"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                {theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* View CV — desktop */}
          <Link
            to="/cv"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <FaFileAlt size={11} /> CV
          </Link>

          {/* Hire me — desktop */}
          <button
            onClick={() => handleNav('contact')}
            className="hidden md:block text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ background: 'var(--accent)', color: '#fff' }}
            onMouseEnter={(e) => (e.target.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.target.style.background = 'var(--accent)')}
          >
            Hire me
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-6 py-5 flex flex-col gap-4"
            style={{
              background: theme === 'dark' ? 'rgba(10,10,15,0.97)' : 'rgba(248,248,246,0.97)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--border)',
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => handleNav(l)}
                className="text-[0.9375rem] capitalize text-left transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="mt-1 text-sm font-medium px-4 py-2 rounded-lg w-fit"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Hire me
            </button>
            <Link
              to="/cv"
              className="text-sm font-medium px-4 py-2 rounded-lg w-fit inline-flex items-center gap-1.5"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              onClick={() => setOpen(false)}
            >
              <FaFileAlt size={11} /> View CV
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
