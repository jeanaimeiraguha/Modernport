import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark, FaFileLines, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './data';
import { useMagnetic } from './motion';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Navbar() {
  const [open, setOpen]        = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]    = useState('');
  const magnetic = useMagnetic(0.35);

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

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-50">
        <div
          className="max-w-5xl mx-auto rounded-full"
          style={{
            background:           scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            backdropFilter:       'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border:               `1px solid ${scrolled ? 'var(--border-hover)' : 'var(--border)'}`,
            boxShadow:            scrolled ? '0 8px 32px rgba(0,0,0,0.35)' : 'none',
            transition:           'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <nav className="flex items-center justify-between h-14 sm:h-16 pl-2 pr-2 sm:pl-3 sm:pr-3">

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Home"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
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
                      className="relative px-3 py-1.5 text-sm font-medium capitalize rounded-full"
                      style={{
                        color:      isActive ? 'var(--accent)' : 'var(--text-muted)',
                        background: isActive ? 'rgba(20,184,166,0.07)' : 'transparent',
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

              {/* CV */}
              <Link
                to="/cv"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  border:     '1px solid var(--border)',
                  color:      'var(--text-muted)',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <FaFileLines size={10} /> CV
              </Link>

              {/* Hire me — pill with icon button, echoing the reference's split treatment */}
              <motion.button
                onClick={() => handleNav('contact')}
                {...magnetic.handlers}
                className="hidden md:flex items-center gap-2 pl-4 pr-1.5 py-1.5 text-xs font-semibold rounded-full"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  ...magnetic.style,
                }}
              >
                Hire me
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--brand-blue)' }}
                >
                  <FaArrowUpRightFromSquare size={10} />
                </span>
              </motion.button>

              {/* Hamburger */}
              <button
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {open ? <FaXmark size={14} /> : <FaBars size={14} />}
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
              className="md:hidden max-w-6xl mx-auto mt-2 px-4 py-3 rounded-3xl"
              style={{
                background:           'var(--nav-bg-scrolled)',
                backdropFilter:       'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border:               '1px solid var(--border)',
              }}
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleNav(l)}
                    className="text-sm capitalize text-left px-3 py-2.5 rounded-xl"
                    style={{
                      color:      active === l ? 'var(--accent)' : 'var(--text-secondary)',
                      background: active === l ? 'rgba(20,184,166,0.07)' : 'transparent',
                    }}
                  >
                    {l}
                  </button>
                ))}
                <div className="h-px my-2" style={{ background: 'var(--border)' }} />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNav('contact')}
                    className="flex-1 text-sm font-semibold py-2.5 rounded-xl text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    Hire me
                  </button>
                  <Link
                    to="/cv"
                    className="flex-1 text-sm font-medium py-2.5 rounded-xl text-center inline-flex items-center justify-center gap-1.5"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    onClick={() => setOpen(false)}
                  >
                    <FaFileLines size={10} /> View CV
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
