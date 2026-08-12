import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ParticleCanvas from './ParticleCanvas';
import TextSequence   from './TextSequence';

/*
  SplashScreen — white/light mode cinematic intro
  ─────────────────────────────────────────────────
  Phase 0  (0 – 1.8s)   : Counter 0→100 + name reveal + progress line
  Phase 1  (1.8 – 3.0s) : "Technology never stops evolving."
  Phase 2  (3.0 – 4.2s) : "The world changes every second."
  Phase 3  (4.2 – 5.6s) : "Artificial Intelligence is reshaping the future."
  Phase 4  (5.6 – 6.8s) : "Developers must evolve with innovation."
  Phase 5  (6.8 – 8.0s) : "Building intelligent digital experiences."
  Phase 6  (8.0 – 9.4s) : "IRAGUHA Jean Aime"
  Phase 7  (9.4 – 10.6s): "Software Engineer · Creative Developer · Problem Solver"
  Phase 8  (10.6s+)      : Curtain wipe up → onDone()
*/

const PHASE_DURATIONS = [1800, 1200, 1200, 1400, 1200, 1200, 1400, 1200];

// Light-mode colour palette for the splash
const S = {
  bg:          '#f8f8fc',
  bgAlt:       '#f0f0f8',
  textPrimary: '#0d0d1a',
  textMuted:   '#9ca3af',
  textSub:     '#6b7280',
  accent:      '#4f46e5',
  accentSoft:  '#818cf8',
  border:      'rgba(0,0,0,0.07)',
  gridLine:    'rgba(79,70,229,0.05)',
};

export default function SplashScreen({ onDone }) {
  const [count,   setCount]   = useState(0);
  const [phase,   setPhase]   = useState(0);
  const [exiting, setExiting] = useState(false);
  const lineRef  = useRef(null);
  const tlRef    = useRef(null);
  const timerRef = useRef(null);

  const triggerExit = useCallback(() => {
    setExiting(true);
    setTimeout(onDone, 950);
  }, [onDone]);

  useEffect(() => {
    const obj = { val: 0 };
    tlRef.current = gsap.timeline();

    tlRef.current.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    if (lineRef.current) {
      tlRef.current.to(
        lineRef.current,
        { scaleX: 1, duration: 1.6, ease: 'power2.inOut' },
        '<'
      );
    }

    let currentPhase = 0;
    const advance = () => {
      currentPhase += 1;
      setPhase(currentPhase);
      if (currentPhase < PHASE_DURATIONS.length) {
        timerRef.current = setTimeout(advance, PHASE_DURATIONS[currentPhase]);
      } else {
        timerRef.current = setTimeout(triggerExit, 400);
      }
    };
    timerRef.current = setTimeout(advance, PHASE_DURATIONS[0]);

    return () => {
      tlRef.current?.kill();
      clearTimeout(timerRef.current);
    };
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[300] overflow-hidden flex flex-col"
          style={{ background: S.bg }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ── Canvas: light-mode particles + globe ── */}
          <ParticleCanvas phase={phase} light />

          {/* ── Subtle grid ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${S.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${S.gridLine} 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Soft radial vignette (keeps edges clean) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, ${S.bg} 100%)`,
            }}
          />

          {/* ── Ambient tint — top right ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-10%', right: '-5%',
              width: 480, height: 480,
              background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />
          {/* ── Ambient tint — bottom left ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '-10%', left: '-5%',
              width: 380, height: 380,
              background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />

          {/* ── TOP-LEFT: label ── */}
          <div className="absolute top-8 left-8 sm:top-10 sm:left-12 overflow-hidden z-10">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: S.textMuted,
              }}
            >
              Portfolio — 2025
            </motion.p>
          </div>

          {/* ── TOP-RIGHT: location ── */}
          <div className="absolute top-8 right-8 sm:top-10 sm:right-12 overflow-hidden z-10">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: S.textMuted,
              }}
            >
              Kigali, Rwanda
            </motion.p>
          </div>

          {/* ── PHASE 0: large counter ── */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div
                key="counter"
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                exit={{
                  opacity: 0,
                  scale: 1.06,
                  filter: 'blur(10px)',
                  transition: { duration: 0.45, ease: 'easeIn' },
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(7rem, 22vw, 16rem)',
                    color: S.textPrimary,
                    letterSpacing: '-0.06em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                    userSelect: 'none',
                    /* Very subtle shadow for depth on white */
                    textShadow: '0 2px 40px rgba(79,70,229,0.08)',
                  }}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── PHASES 1-7: text sequences ── */}
          {phase >= 1 && <TextSequence phase={phase} light />}

          {/* ── BOTTOM: name + progress line ── */}
          <div className="relative z-10 px-8 sm:px-12 pb-10 sm:pb-12">
            {/* Name */}
            <div className="mb-5">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                    color: S.textPrimary,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  Jean Aime
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                    color: S.accent,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  Iraguha
                </motion.p>
              </div>
            </div>

            {/* Progress line */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div
                className="flex-1 overflow-hidden"
                style={{ height: '1px', background: 'rgba(0,0,0,0.08)' }}
              >
                <div
                  ref={lineRef}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${S.accent}, ${S.accentSoft})`,
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'Inter, monospace',
                  fontSize: '11px',
                  color: S.textMuted,
                  letterSpacing: '0.06em',
                  minWidth: '3ch',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                  userSelect: 'none',
                }}
              >
                {count}%
              </p>
            </motion.div>
          </div>

          {/* ── Skip button ── */}
          <motion.button
            className="absolute bottom-10 right-8 sm:right-12 z-20 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"
            style={{ color: S.textMuted, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={triggerExit}
            whileHover={{ color: S.textSub }}
          >
            Skip
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* ── Phase dots ── */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width:      i === phase ? 16 : 4,
                  opacity:    i <= phase  ? 1  : 0.25,
                  background: i === phase ? S.accent : 'rgba(0,0,0,0.15)',
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: 4 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
