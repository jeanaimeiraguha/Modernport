import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ScrollNavigator() {
  const [show, setShow]       = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const fn = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollY > 300);
      setAtBottom(scrollY >= maxScroll - 40);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollUp   = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollDown = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  const btnStyle = {
    background: 'var(--bg-surface)',
    border:     '1px solid var(--border)',
    color:      'var(--text-muted)',
    transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-5 z-40 flex flex-col gap-2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Scroll up */}
          <motion.button
            onClick={scrollUp}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={btnStyle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Scroll to top"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color       = 'var(--accent)';
              e.currentTarget.style.background  = 'rgba(99,102,241,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color       = 'var(--text-muted)';
              e.currentTarget.style.background  = 'var(--bg-surface)';
            }}
          >
            <FaArrowUp size={12} />
          </motion.button>

          {/* Scroll down — hidden when already at bottom */}
          {!atBottom && (
            <motion.button
              onClick={scrollDown}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={btnStyle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Scroll to bottom"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color       = 'var(--accent)';
                e.currentTarget.style.background  = 'rgba(99,102,241,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color       = 'var(--text-muted)';
                e.currentTarget.style.background  = 'var(--bg-surface)';
              }}
            >
              <FaArrowDown size={12} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
