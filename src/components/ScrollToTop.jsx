import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ background: 'var(--accent)' }}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={13} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
