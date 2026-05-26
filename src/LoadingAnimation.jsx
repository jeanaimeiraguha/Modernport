import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function KidWithGlobe() {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
    >
      <motion.g
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="118" cy="118" r="22" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
        <ellipse cx="118" cy="118" rx="22" ry="10" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        <line x1="96" y1="118" x2="140" y2="118" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
        <path d="M118 96 Q128 108 128 118 Q128 128 118 140" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M118 96 Q108 108 108 118 Q108 128 118 140" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M106 108 Q110 104 116 106 Q120 108 118 112 Q114 114 110 112 Z" fill="#94a3b8" opacity="0.6" />
        <path d="M120 114 Q124 112 128 115 Q130 119 126 121 Q122 120 120 117 Z" fill="#94a3b8" opacity="0.5" />
      </motion.g>

      <circle cx="62" cy="34" r="14" stroke="#f1f5f9" strokeWidth="1.5" fill="#0a0a0f" />
      <path d="M48 30 Q50 18 62 18 Q74 18 76 30" stroke="#f1f5f9" strokeWidth="1.5" fill="none" />
      <circle cx="57" cy="33" r="1.5" fill="#f1f5f9" />
      <circle cx="67" cy="33" r="1.5" fill="#f1f5f9" />
      <path d="M57 39 Q62 43 67 39" stroke="#f1f5f9" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M62 48 L62 90" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />

      <motion.path
        d="M62 58 Q48 48 42 38"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 58 Q48 48 42 38', 'M62 58 Q46 44 38 36', 'M62 58 Q48 48 42 38'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M62 58 Q76 68 88 78"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 58 Q76 68 88 78', 'M62 58 Q80 72 94 80', 'M62 58 Q76 68 88 78'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <path d="M62 90 L54 128" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 128 L44 130" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />

      <motion.path
        d="M62 90 Q80 100 96 108"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M62 90 Q80 100 96 108', 'M62 90 Q82 104 100 112', 'M62 90 Q80 100 96 108'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M96 108 L108 114"
        stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ['M96 108 L108 114', 'M100 112 L112 116', 'M96 108 L108 114'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <line x1="30" y1="142" x2="148" y2="142" stroke="#1e293b" strokeWidth="1" />

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

function speak() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance('Welcome');
  utter.rate   = 0.9;
  utter.pitch  = 1;
  utter.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const pick = voices.find((v) =>
    v.lang.startsWith('en') &&
    (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Natural'))
  ) || voices.find((v) => v.lang.startsWith('en'));
  if (pick) utter.voice = pick;
  window.speechSynthesis.speak(utter);
}

export default function LoadingAnimation({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const [spoken, setSpoken]     = useState(false);

  // Speak on first user interaction (required by browsers)
  const handleInteraction = useCallback(() => {
    if (!spoken) { speak(); setSpoken(true); }
  }, [spoken]);

  useEffect(() => {
    // Try speaking immediately (works on some browsers / if already interacted)
    const trySpeak = () => {
      if (window.speechSynthesis.getVoices().length) {
        speak();
        setSpoken(true);
      } else {
        window.speechSynthesis.onvoiceschanged = () => { speak(); setSpoken(true); };
      }
    };
    // Small delay so voices load
    const t = setTimeout(trySpeak, 300);

    // Fallback: speak on any interaction
    window.addEventListener('click',      handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown',    handleInteraction, { once: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener('click',      handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown',    handleInteraction);
    };
  }, [handleInteraction]);

  useEffect(() => {
    const start    = performance.now();
    const duration = 2400;
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 sm:gap-6 px-4"
          style={{ background: '#0a0a0f' }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <KidWithGlobe />
          </motion.div>

          {/* Name */}
          <motion.div
            className="flex flex-col items-center gap-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p
              className="font-display font-bold text-base sm:text-lg tracking-tight"
              style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
            >
              Jean Aime Iraguha
            </p>
            <p
              className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase"
              style={{ color: '#334155' }}
            >
              Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-32 sm:w-40 h-[2px] rounded-full overflow-hidden"
            style={{ background: '#1e293b' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: '#6366f1', transition: 'none' }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.p
            className="text-[10px] sm:text-[11px] tabular-nums font-mono"
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
