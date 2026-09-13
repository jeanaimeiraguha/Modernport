import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Minimal brand-mark loader — the pattern most modern apps use
   (Vercel, Linear, Notion, Raycast): solid background, centered
   mark, a single spinner ring, quick fade. No choreography, no delay. */
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
          style={{ background: 'var(--bg-base)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
            {/* Ambient glow behind the mark */}
            <motion.div
              className="absolute rounded-2xl"
              style={{ inset: 6, background: 'var(--gradient-brand)', filter: 'blur(22px)' }}
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Spinner ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 0,
                border: '2.5px solid transparent',
                borderTopColor: 'var(--accent)',
                borderRightColor: 'rgba(20,184,166,0.25)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
            />

            {/* Brand mark */}
            <motion.div
              className="relative rounded-2xl flex items-center justify-center"
              style={{
                width: 60,
                height: 60,
                background: 'var(--gradient-brand)',
                boxShadow: '0 10px 34px rgba(20,184,166,0.35)',
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display font-bold text-xl text-white">JA</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
