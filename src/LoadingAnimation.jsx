import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Orbit ring config ───────────────────────────────────────────────────── */
const makeRing = (count, radius, colors, sizeMult, durationMult) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const rad   = (angle * Math.PI) / 180;
    return {
      x:     Math.cos(rad) * radius,
      y:     Math.sin(rad) * radius,
      color: colors[i % colors.length],
      size:  (9 + (i % 3) * 3) * sizeMult,
      delay: i * (1.6 / count),
      pulseDur: 1.6 + (i % 3) * 0.4,
      durationMult,
    };
  });

const OUTER = makeRing(
  8, 62,
  ['#818cf8','#6366f1','#a78bfa','#7c3aed','#4f46e5','#c4b5fd','#6d28d9','#8b5cf6'],
  0.72, 1
);
const INNER = makeRing(
  5, 34,
  ['#a78bfa','#6366f1','#c4b5fd','#818cf8','#7c3aed'],
  0.5, 1.55
);

/* ─── Ambient drifting orbs ───────────────────────────────────────────────── */
const ORBS = [
  { w: 480, h: 480, top: '-12%', left: '-8%',  color: 'rgba(99,102,241,0.07)',  dur: 14, dx: 40, dy: -30 },
  { w: 420, h: 420, top: '-5%',  right: '-6%', color: 'rgba(124,58,237,0.06)', dur: 18, dx: -35, dy: 25 },
  { w: 360, h: 360, bottom: '-10%', left: '10%', color: 'rgba(167,139,250,0.05)', dur: 22, dx: 20, dy: -40 },
  { w: 300, h: 300, bottom: '-8%', right: '5%', color: 'rgba(79,70,229,0.06)',  dur: 16, dx: -25, dy: 20 },
];

/* ─── Blob component ──────────────────────────────────────────────────────── */
function Blob({ b, ringDur }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width:  b.size,
        height: b.size,
        background: `radial-gradient(circle at 35% 35%, ${b.color}ff, ${b.color}99)`,
        boxShadow: `0 0 ${b.size * 1.4}px ${b.size * 0.7}px ${b.color}66`,
        filter: `blur(${b.size * 0.12}px)`,
        top:  '50%',
        left: '50%',
        marginTop:  -(b.size / 2),
        marginLeft: -(b.size / 2),
        x: b.x,
        y: b.y,
        willChange: 'transform, opacity',
      }}
      animate={{ opacity: [0.45, 1, 0.45], scale: [0.82, 1.18, 0.82] }}
      transition={{ duration: b.pulseDur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
    />
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function LoadingAnimation({ onDone }) {
  const [exit, setExit]         = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur   = 2200;
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setExit(true); setTimeout(onDone, 900); }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
          style={{ background: '#f8f8fc' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.88, ease: [0.76, 0, 0.24, 1] },
          }}
          transition={{ duration: 0.35 }}
        >

          {/* ── Drifting ambient orbs ── */}
          {ORBS.map((o, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: o.w, height: o.h,
                top: o.top, left: o.left, right: o.right, bottom: o.bottom,
                background: `radial-gradient(circle, ${o.color} 0%, transparent 65%)`,
                filter: 'blur(72px)',
                willChange: 'transform',
              }}
              animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
              transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            />
          ))}

          {/* ── Subtle grid ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(99,102,241,0.055) 1px, transparent 1px),' +
                'linear-gradient(90deg, rgba(99,102,241,0.055) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          {/* ── Radial vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #f8f8fc 100%)',
            }}
          />

          {/* ── Brand + orbit spinner ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Name + role */}
            <motion.div
              className="flex flex-col items-center text-center mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                  marginBottom: '14px',
                }}
              >
                Portfolio
              </p>
              <h1
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  color: '#0d0d1a',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                }}
              >
                Jean Aime Iraguha
              </h1>
              <p
                className="font-display font-medium"
                style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '6px', letterSpacing: '-0.01em' }}
              >
                Full-Stack Engineer &amp; CTO
              </p>
            </motion.div>

            {/* Orbit spinner */}
            <div className="relative flex items-center justify-center" style={{ width: 156, height: 156 }}>

              {/* Outer ring — clockwise */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                {OUTER.map((b, i) => <Blob key={i} b={b} />)}
              </motion.div>

              {/* Inner ring — counter-clockwise, faster */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 3.1, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                {INNER.map((b, i) => <Blob key={i} b={b} />)}
              </motion.div>

              {/* Orbit track rings (decorative) */}
              {[62, 34].map((r, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width:  r * 2 + 10,
                    height: r * 2 + 10,
                    border: `1px solid rgba(99,102,241,${i === 0 ? 0.14 : 0.10})`,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Center monogram */}
              <motion.div
                className="absolute rounded-2xl flex items-center justify-center"
                style={{
                  width: 44, height: 44,
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  boxShadow: '0 0 28px 8px rgba(99,102,241,0.28), 0 4px 16px rgba(79,70,229,0.25)',
                  willChange: 'transform, opacity',
                }}
                animate={{ scale: [0.94, 1.04, 0.94] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span
                  className="font-display font-bold text-white select-none"
                  style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}
                >
                  JA
                </span>
              </motion.div>
            </div>
          </div>

          {/* ── Bottom progress bar ── */}
          <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 pb-10 sm:pb-12 z-10">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', userSelect: 'none' }}>
                Loading portfolio
              </p>
              <div className="flex-1 overflow-hidden" style={{ height: '1px', background: 'rgba(0,0,0,0.08)' }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #4f46e5, #818cf8, #a78bfa)',
                    transformOrigin: 'left center',
                    willChange: 'transform',
                  }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <p style={{ fontFamily: 'Inter, monospace', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.06em', minWidth: '3ch', textAlign: 'right', fontVariantNumeric: 'tabular-nums', userSelect: 'none' }}>
                {progress}%
              </p>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
