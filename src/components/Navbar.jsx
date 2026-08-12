import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { NAV_LINKS } from './data';
import { useTheme } from '../ThemeContext';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Navbar() {
  const [open, setOpen]        = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]    = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn(); // run once on mount
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const handleNav = (id) => { scrollTo(id); setOpen(false); };

  const bg = theme === 'dark' ? 'rgba(8,8,16,0.95)' : 'rgba(248,248,252,0.95)';

  return (
    <>
      {/* ── Fixed navbar — always solid, never moves ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:          scrolled ? bg : 'var(--bg-base)',
          backdropFilter:      scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:        `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          transition:          'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <span className="font-display font-bold text-sm text-white">JA</span>
              </div>
              <span
                className="font-display font-semibold hidden sm:block"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', fontSize: '0.95rem' }}
              >
                Iraguha<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((l) => {
                const isActive = active === l;
                return (
                  <li key={l}>
                    <button
                      onClick={() => handleNav(l)}
                      className="relative px-3 py-1.5 text-sm font-medium capitalize rounded-lg"
                      style={{
                        color:      isActive ? 'var(--accent)' : 'var(--text-muted)',
                        background: isActive ? 'rgba(99,102,241,0.07)' : 'transparent',
                        transition: 'color 0.2s ease, background 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                      }}
                    >
                      {l}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Available badge */}
              <div
                className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
                style={{
                  background: 'rgba(74,222,128,0.07)',
                  border:     '1px solid rgba(74,222,128,0.18)',
                  color:      '#16a34a',
                }}
              >
                <span className="glow-dot" />
                Available
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--bg-elevated)',
                  border:     '1px solid var(--border)',
                  color:      'var(--text-secondary)',
                  transition: 'border-color 0.2s ease',
                }}
                aria-label="Toggle theme"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                {theme === 'dark' ? <HiSun size={14} /> : <HiMoon size={14} />}
              </button>

              {/* CV */}
              <a
                href="/cv/Jean-Aime-Iraguha-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  border:     '1px solid var(--border)',
                  color:      'var(--text-muted)',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <FaFileAlt size={10} /> CV
              </a>

              {/* Hire me */}
              <button
                onClick={() => handleNav('contact')}
                className="hidden md:block text-xs font-semibold px-4 py-1.5 rounded-lg text-white"
                style={{
                  background: 'var(--accent)',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Hire me
              </button>

              {/* Hamburger */}
              <button
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {open ? <FaTimes size={14} /> : <FaBars size={14} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="md:hidden px-4 pb-4"
              style={{
                background:          bg,
                backdropFilter:      'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom:        '1px solid var(--border)',
              }}
            >
              <div className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleNav(l)}
                    className="text-sm capitalize text-left px-3 py-2.5 rounded-lg"
                    style={{
                      color:      active === l ? 'var(--accent)' : 'var(--text-secondary)',
                      background: active === l ? 'rgba(99,102,241,0.07)' : 'transparent',
                    }}
                  >
                    {l}
                  </button>
                ))}
                <div className="h-px my-2" style={{ background: 'var(--border)' }} />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNav('contact')}
                    className="flex-1 text-sm font-semibold py-2.5 rounded-lg text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    Hire me
                  </button>
                  <a
                    href="/cv/Jean-Aime-Iraguha-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-sm font-medium py-2.5 rounded-lg text-center inline-flex items-center justify-center gap-1.5"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    onClick={() => setOpen(false)}
                  >
                    <FaFileAlt size={10} /> View CV
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
