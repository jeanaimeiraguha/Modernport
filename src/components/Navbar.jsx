import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark, FaArrowRight } from 'react-icons/fa6';
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './data';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const SOCIALS = [
  { icon: <FaLinkedin size={14} />, href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', label: 'LinkedIn' },
  { icon: <FaGithub   size={14} />, href: 'https://github.com/jeanaimeiraguha',                       label: 'GitHub'   },
  { icon: <FaWhatsapp size={14} />, href: 'https://wa.me/250793411594',                               label: 'WhatsApp' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 },
    );
    NAV_LINKS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNav = (id) => { scrollTo(id); setOpen(false); };

  /* Over the dark hero the header is transparent with white type; once the page
     scrolls it becomes the reference's solid white bar with a soft shadow. */
  const textColor = 'var(--fg)';

  return (
    <>
      <header className={`qt-header ${scrolled ? 'is-fixed' : ''}`}>
        <div className="qt-container">
          <nav
            className="flex items-center justify-between"
            style={{ height: scrolled ? 76 : 92, transition: 'height 0.3s ease-in-out' }}
          >
            {/* ── Wordmark ── */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-3 shrink-0"
              aria-label="Home"
            >
              <span
                className="inline-flex items-center justify-center shrink-0"
                style={{
                  width: 42, height: 42,
                  background: 'var(--ink)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em',
                  transition: 'var(--transition)',
                }}
              >
                JA
              </span>
              <span className="hidden sm:block text-left leading-tight">
                <span
                  className="block"
                  style={{ color: textColor, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', transition: 'var(--transition)' }}
                >
                  Iraguha Jean Aime
                </span>
                <span
                  className="block"
                  style={{
                    color: 'var(--fg-subtle)',
                    fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
                    transition: 'var(--transition)',
                  }}
                >
                  Software Engineering
                </span>
              </span>
            </button>

            {/* ── Desktop menu — 35px gaps, 600 weight ── */}
            <ul className="qt-menu hidden xl:flex">
              {NAV_LINKS.map((l) => {
                const isActive = active === l;
                return (
                  <li key={l} className="relative">
                    <button
                      onClick={() => handleNav(l)}
                      style={{
                        color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                        transition: 'color 0.25s ease-in-out',
                      }}
                    >
                      {l}
                    </button>
                    {/* One shared element, so it slides between items instead
                        of fading out and in. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute"
                        style={{
                          left: 0,
                          right: 0,
                          bottom: -7,
                          height: 2,
                          background: 'var(--fg)',
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Right side ── */}
            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/cv"
                className="hidden lg:inline-flex read-more-btn pressable"
                style={{ color: 'var(--fg-muted)' }}
              >
                View CV
              </Link>

              <button
                onClick={() => handleNav('contact')}
                className="hidden md:inline-flex btn-one pressable"
              >
                Hire Me
                <span className="btn-icon"><FaArrowRight size={11} /></span>
              </button>

              {/* Hamburger */}
              <button
                className="xl:hidden inline-flex items-center justify-center"
                style={{
                  width: 44, height: 44,
                  border: '1px solid var(--line-strong)',
                  color: textColor,
                  transition: 'var(--transition)',
                }}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <FaBars size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Dark slide-in panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0"
              style={{ background: 'rgba(15,13,29,0.6)', zIndex: 70 }}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="qt-sidebar"
            >
              <div className="flex items-center justify-between mb-10">
                <span style={{ color: 'var(--fg)', fontWeight: 700, fontSize: 17 }}>
                  Iraguha Jean Aime
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, border: '1px solid var(--line)', color: 'var(--fg)' }}
                  aria-label="Close menu"
                >
                  <FaXmark size={16} />
                </button>
              </div>

              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l} style={{ borderBottom: '1px solid var(--line)' }}>
                    <button
                      onClick={() => handleNav(l)}
                      className="w-full text-left capitalize flex items-center justify-between"
                      style={{
                        color: active === l ? '#ffffff' : 'var(--fg-muted)',
                        fontWeight: 600,
                        fontSize: 16,
                        padding: '15px 0',
                      }}
                    >
                      {l}
                      <FaArrowRight size={11} style={{ opacity: 0.5 }} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <button onClick={() => handleNav('contact')} className="btn-one w-full justify-center">
                  Hire Me
                  <span className="btn-icon"><FaArrowRight size={11} /></span>
                </button>
                <Link
                  to="/cv"
                  onClick={() => setOpen(false)}
                  className="btn-two w-full justify-center mt-3"
                >
                  View CV
                </Link>
              </div>

              {/* Contact block, as on the reference's sidebar */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--line)' }}>
                <h5 style={{ color: 'var(--fg)', marginBottom: 16 }}>Contact</h5>
                <ul className="flex flex-col gap-3.5">
                  {[
                    { icon: <FaEnvelope size={12} />,      text: 'jeanaimeiraguha@gmail.com', href: 'mailto:jeanaimeiraguha@gmail.com' },
                    { icon: <FaPhone size={12} />,         text: '+250 793 411 594',          href: 'tel:+250793411594' },
                    { icon: <FaMapMarkerAlt size={12} />,  text: 'Kigali, Rwanda',            href: null },
                  ].map((c) => (
                    <li key={c.text} className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ width: 30, height: 30, background: 'var(--bg-2)', color: 'var(--fg)' }}
                      >
                        {c.icon}
                      </span>
                      {c.href ? (
                        <a href={c.href} style={{ color: 'var(--fg-muted)', fontSize: 14, wordBreak: 'break-all' }}>
                          {c.text}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--fg-muted)', fontSize: 14 }}>{c.text}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="qt-sidebar-social flex items-center gap-3 mt-7">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
