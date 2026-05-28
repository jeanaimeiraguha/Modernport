import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/*
  Cinematic preloader — inspired by 0xjonaseb11.vercel.app
  ─────────────────────────────────────────────────────────
  Phase 1 (0 → 2.8s):  Counter counts 0→100, name slides up, thin line fills
  Phase 2 (2.8 → 3.6s): Everything fades/scales slightly, then the whole
                         panel slides UP off screen (curtain wipe)
  Phase 3:              onDone() fires → page fades in with stagger
*/

export default function LoadingAnimation({ onDone }) {
  const [count, setCount]   = useState(0);
  const [exit, setExit]     = useState(false);
  const lineRef             = useRef(null);
  const counterRef          = useRef(null);
  const tl                  = useRef(null);

  useEffect(() => {
    // GSAP counter 0 → 100
    const obj = { val: 0 };
    tl.current = gsap.timeline({
      onComplete: () => {
        // Short pause then trigger curtain exit
        setTimeout(() => {
          setExit(true);
          setTimeout(onDone, 900);
        }, 320);
      },
    });

    tl.current.to(obj, {
      val: 100,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    // Progress line via GSAP on the DOM element
    tl.current.to(
      lineRef.current,
      { scaleX: 1, duration: 2.6, ease: 'power2.inOut' },
      '<' // same start time
    );

    return () => tl.current?.kill();
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit ? (
        /* ── LOADER PANEL ── */
        <motion.div
          key="loader"
          className="fixed inset-0 z-[300] flex flex-col overflow-hidden"
          style={{ background: '#080810' }}
          /* Curtain: slides up off screen */
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ── Subtle grid ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Ambient glow — top right ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-10%', right: '-5%',
              width: 480, height: 480,
              background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />

          {/* ── TOP-LEFT: label ── */}
          <div className="absolute top-8 left-8 sm:top-10 sm:left-12 overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#3d4560',
              }}
            >
              Portfolio — 2025
            </motion.p>
          </div>

          {/* ── TOP-RIGHT: role ── */}
          <div className="absolute top-8 right-8 sm:top-10 sm:right-12 overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#3d4560',
              }}
            >
              Full-Stack Engineer
            </motion.p>
          </div>

          {/* ── CENTER: large counter ── */}
          <div className="flex-1 flex items-center justify-center">
            <div
              ref={counterRef}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(6rem, 20vw, 14rem)',
                color: '#eef0f8',
                letterSpacing: '-0.06em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                /* Subtle text shadow for depth */
                textShadow: '0 0 80px rgba(99,102,241,0.12)',
                userSelect: 'none',
              }}
            >
              {String(count).padStart(2, '0')}
            </div>
          </div>

          {/* ── BOTTOM: name + progress line ── */}
          <div className="px-8 sm:px-12 pb-10 sm:pb-12">

            {/* Name lines */}
            <div className="mb-6 sm:mb-8">
              {/* First name */}
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.6rem, 5vw, 3rem)',
                    color: '#eef0f8',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  Jean Aime
                </motion.p>
              </div>
              {/* Last name */}
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.6rem, 5vw, 3rem)',
                    color: '#6366f1',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  Iraguha
                </motion.p>
              </div>
            </div>

            {/* Progress line + percentage */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Track */}
              <div
                className="flex-1 overflow-hidden"
                style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
              >
                {/* Fill — GSAP controls scaleX */}
                <div
                  ref={lineRef}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                  }}
                />
              </div>

              {/* Percentage label */}
              <p
                style={{
                  fontFamily: 'Inter, monospace',
                  fontSize: '11px',
                  color: '#3d4560',
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
