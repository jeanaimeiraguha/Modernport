import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaSearch, FaUser, FaCode, FaBriefcase, FaCommentDots, FaEnvelope,
  FaLaptopCode, FaFileAlt, FaGithub, FaLinkedin, FaArrowRight,
} from 'react-icons/fa';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = (fn) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(fn, 60);
    } else {
      fn();
    }
  };

  const items = useMemo(() => [
    { id: 'about',        label: 'About',              hint: 'Who I am',        icon: <FaUser size={13} />,        action: () => goHome(() => scrollTo('about')) },
    { id: 'skills',       label: 'Skills',              hint: 'What I build with', icon: <FaCode size={13} />,      action: () => goHome(() => scrollTo('skills')) },
    { id: 'projects',     label: 'Projects',            hint: 'Things I\'ve shipped', icon: <FaLaptopCode size={13} />, action: () => goHome(() => scrollTo('projects')) },
    { id: 'experience',   label: 'Experience',          hint: 'Work history',    icon: <FaBriefcase size={13} />,   action: () => goHome(() => scrollTo('experience')) },
    { id: 'testimonials', label: 'Testimonials',        hint: 'What people say', icon: <FaCommentDots size={13} />, action: () => goHome(() => scrollTo('testimonials')) },
    { id: 'contact',      label: 'Contact',             hint: 'Get in touch',    icon: <FaEnvelope size={13} />,    action: () => goHome(() => scrollTo('contact')) },
    { id: 'cv',           label: 'View full CV / Resume', hint: 'Open dedicated resume page', icon: <FaFileAlt size={13} />, action: () => navigate('/cv') },
    { id: 'github',       label: 'Open GitHub',        hint: 'github.com/jeanaimeiraguha', icon: <FaGithub size={13} />, action: () => window.open('https://github.com/jeanaimeiraguha', '_blank') },
    { id: 'linkedin',     label: 'Open LinkedIn',      hint: 'Connect professionally', icon: <FaLinkedin size={13} />, action: () => window.open('https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', '_blank') },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [location.pathname]);

  const filtered = query.trim()
    ? items.filter((i) => (i.label + ' ' + i.hint).toLowerCase().includes(query.trim().toLowerCase()))
    : items;

  useEffect(() => setActive(0), [query, open]);

  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key === 'k' || e.key === 'K';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery('');
  }, [open]);

  const runItem = (item) => {
    item.action();
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % Math.max(filtered.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1)); }
    else if (e.key === 'Enter' && filtered[active]) { runItem(filtered[active]); }
  };

  return (
    <>
      {/* Trigger — visible hint, doubles as click target for touch devices */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium"
        style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
        aria-label="Open command palette"
      >
        <FaSearch size={10} />
        <span
          className="px-1.5 py-0.5 rounded"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
        >
          ⌘K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[300]"
              style={{ background: 'rgba(3,12,24,0.6)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-[14vh] z-[301] w-[min(560px,92vw)] -translate-x-1/2 rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
                <FaSearch size={13} style={{ color: 'var(--text-muted)' }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, open a link…"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  ESC
                </span>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No matches — try another term.</p>
                )}
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => runItem(item)}
                    onMouseEnter={() => setActive(i)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
                    style={{ background: i === active ? 'rgba(20,184,166,0.1)' : 'transparent' }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--bg-elevated)', color: i === active ? 'var(--accent)' : 'var(--text-muted)' }}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                      <span className="block text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{item.hint}</span>
                    </span>
                    {i === active && <FaArrowRight size={11} style={{ color: 'var(--accent)' }} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
