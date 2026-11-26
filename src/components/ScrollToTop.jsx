import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ScrollNavigator() {
  const [show, setShow]         = useState(false);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed z-40 flex flex-col gap-2.5"
          style={{ bottom: 28, right: 24 }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={scrollUp}
            className="scroll-up"
            whileTap={{ scale: 0.93 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp size={13} />
          </motion.button>

          {!atBottom && (
            <motion.button
              onClick={scrollDown}
              className="scroll-up"
              whileTap={{ scale: 0.93 }}
              aria-label="Scroll to bottom"
            >
              <FaArrowDown size={13} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
