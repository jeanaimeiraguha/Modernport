import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Kid kicking a globe SVG ── */
function KidWithGlobe() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Globe (ball) — bouncing ── */}
      <motion.g
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Globe circle */}
        <circle cx="118" cy="118" r="22" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
        {/* Latitude lines */}
        <ellipse cx="118" cy="118" rx="22" ry="10" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        <line x1="96" y1="118" x2="140" y2="118" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
        {/* Longitude curves */}
        <path d="M118 96 Q128 108 128 118 Q128 128 118 140" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M118 96 Q108 108 108 118 Q108 128 118 140" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Continents hint */}
        <path d="M106 108 Q110 104 116 106 Q120 108 118 112 Q114 114 110 112 Z" fill="#94a3b8" opacity="0.6" />
        <path d="M120 114 Q124 112 128 115 Q130 119 126 121 Q122 120 120 117 Z" fill="#94a3b8" opacity="0.5" />
      </motion.g>

      {/* ── Kid body ── */}

      {/* Head */}
      <circle cx="62" cy="34" r="14" stroke="#f1f5f9" strokeWidth="1.5" fill="#0a0a0f" />
      {/* Hair */}
      <path d="M48 30 Q50 18 62 18 Q74 18 76 30" stroke="#f1f5f9" strokeWidth="1.5" fill="none" />
      {/* Face — eyes */}
      <circle cx="57" cy="33" r="1.5" fill="#f1f5f9" />
      <circle cx="67" cy="33" r="1.5" fill="#f1f5f9" />
      {/* Smile */}
      <path d="M57 39 Q62 43 67 39" stroke="#f1f5f9" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Torso */}
      <path d="M62 48 L62 90" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />

      {/* Left arm — raised up (excited) */}
      <motion.path
        d="M62 58 Q48 48 42 38"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 58 Q48 48 42 38', 'M62 58 Q46 44 38 36', 'M62 58 Q48 48 42 38'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right arm — swinging toward ball */}
      <motion.path
        d="M62 58 Q76 68 88 78"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 58 Q76 68 88 78', 'M62 58 Q80 72 94 80', 'M62 58 Q76 68 88 78'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Left leg — standing */}
      <path d="M62 90 L54 128" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
      {/* Left foot */}
      <path d="M54 128 L44 130" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />

      {/* Right leg — kicking */}
      <motion.path
        d="M62 90 Q80 100 96 108"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 90 Q80 100 96 108', 'M62 90 Q82 104 100 112', 'M62 90 Q80 100 96 108'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Right foot — kicking the globe */}
      <motion.path
        d="M96 108 L108 114"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M96 108 L108 114', 'M100 112 L112 116', 'M96 108 L108 114'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ground line */}
      <line x1="30" y1="142" x2="148" y2="142" stroke="#1e293b" strokeWidth="1" />

      {/* Motion lines near globe */}
      <motion.g
        animate={{ opacity: [0, 1, 0], x: [0, 6, 12] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="138" y1="108" x2="148" y2="106" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <line x1="140" y1="114" x2="150" y2="114" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <line x1="138" y1="120" x2="148" y2="122" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

export default function LoadingAnimation({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2400;

    // Welcome voice greeting
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance('Welcome');
      utter.rate   = 0.95;
      utter.pitch  = 1;
      utter.volume = 1;
      // Use a natural English voice if available
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find((v) =>
          v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
        ) || voices.find((v) => v.lang.startsWith('en'));
        if (preferred) utter.voice = preferred;
        window.speechSynthesis.speak(utter);
      };
      if (window.speechSynthesis.getVoices().length) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }

    const tick = (now) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setDone(true); setTimeout(onDone, 500); }, 150);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6"
          style={{ background: '#0a0a0f' }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Kid + globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <KidWithGlobe />
          </motion.div>

          {/* Name */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="font-display font-bold text-lg tracking-tight" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
              Jean Aime <span style={{ color: '#f1f5f9' }}>Iraguha</span>
            </p>
            <p className="text-[11px] tracking-[0.22em] uppercase font-sans" style={{ color: '#334155' }}>
              Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-40 h-[2px] rounded-full overflow-hidden"
            style={{ background: '#1e293b' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="h-full rounded-full transition-none"
              style={{ width: `${progress}%`, background: '#f1f5f9' }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.p
            className="text-[11px] tabular-nums font-mono"
            style={{ color: '#334155' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
