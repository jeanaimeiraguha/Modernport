import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
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
          className="font-display text-sm font-bold tracking-wide transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          JA<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => handleNav(l)}
                className="text-sm capitalize transition-colors hover:opacity-100"
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
                className="text-sm capitalize text-left transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
