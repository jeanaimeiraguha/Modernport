import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Brand-mark loader on the deep navy band: square mark, one square spinner
   ring, quick fade — the same geometry the rest of the site uses. */
export default function LoadingAnimation({ onDone }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const MIN_VISIBLE = 900;
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onDone, 420);
    }, MIN_VISIBLE);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="flex flex-col items-center gap-7">
            <div className="relative flex items-center justify-center" style={{ width: 84, height: 84 }}>
              {/* Rotating square ring */}
              <motion.span
                className="absolute"
                style={{
                  inset: 0,
                  border: '2px solid var(--line)',
                  borderTopColor: 'var(--accent-sky)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              />
              {/* Brand mark */}
              <motion.span
                className="relative inline-flex items-center justify-center"
                style={{
                  width: 54, height: 54,
                  background: 'var(--ink)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 19,
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                JA
              </motion.span>
            </div>

            <span
              className="font-mono"
              style={{
                color: 'var(--fg-muted)',
                fontSize: 10.5,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
