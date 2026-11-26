import { forwardRef, useRef, useState } from 'react';
import {
  motion, useMotionValue, useSpring, useScroll,
  useTransform, useReducedMotion,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   Shared motion language.

   The page is built around scroll: content masks in as it enters the
   viewport, decorative layers drift at their own pace, and nothing loops
   forever in the corner of your eye. Every primitive here checks the
   reduced-motion preference and degrades to a plain, static render.
   ═══════════════════════════════════════════════════════════════════════════ */

export const EASE = [0.16, 1, 0.3, 1];
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' };

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

/* ── Reveal ────────────────────────────────────────────────────────────────
   The workhorse: fades and slides a block in from a given direction once it
   scrolls into view. */
const OFFSETS = {
  up:    { y: 34, x: 0 },
  down:  { y: -34, x: 0 },
  left:  { x: -38, y: 0 },
  right: { x: 38, y: 0 },
  none:  { x: 0, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  from = 'up',
  distance,
  duration = 0.7,
  className = '',
  style,
}) {
  const reduce = useReducedMotion();
  const base = OFFSETS[from] ?? OFFSETS.up;
  const offset = distance == null
    ? base
    : { x: Math.sign(base.x) * distance, y: Math.sign(base.y) * distance };

  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export const FadeUp = forwardRef(function FadeUp({ children, delay = 0, className = '' }, ref) {
  return (
    <Reveal delay={delay} className={className}>
      <div ref={ref}>{children}</div>
    </Reveal>
  );
});

export const RevealLeft  = (p) => <Reveal {...p} from="left" />;
export const RevealRight = (p) => <Reveal {...p} from="right" />;

/* ── Parallax ──────────────────────────────────────────────────────────────
   Shifts its children against the scroll direction. `speed` is the travel in
   pixels across the whole time the element is on screen, so small numbers
   (20-60) stay tasteful and large ones get showy. */
export function Parallax({ children, speed = 40, className = '', style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 110, damping: 30, mass: 0.35 });

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* Scales and fades a block slightly as it passes through the viewport, which
   gives long pages a sense of depth without moving anything sideways. */
export function ScrollScale({ children, className = '', style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? style : { ...style, scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

/* ── SplitText ─────────────────────────────────────────────────────────────
   Masked, word-by-word heading reveal. Each word sits in an overflow-hidden
   box and slides up from beneath it. This is the single effect that most
   makes a page read as considered rather than templated. */
export function SplitText({ text, className = '', style, delay = 0, stagger: step = 0.055 }) {
  const reduce = useReducedMotion();
  const words = String(text).split(' ');

  if (reduce) return <span className={className} style={style}>{text}</span>;

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * step }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Magnetic ──────────────────────────────────────────────────────────────
   Pulls an element toward the pointer. Returns handlers plus a style object
   holding spring-backed motion values. */
export function useMagnetic(strength = 0.3) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const onMouseMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { style: { x: sx, y: sy }, handlers: { onMouseMove, onMouseLeave } };
}

/* ── Pointer-tracked tilt + spotlight ─────────────────────────────────────── */
export function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export function useTilt(strength = 6) {
  const reduce = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.6 });

  const onMouseMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setGlow({ x: px * 100, y: py * 100, opacity: 1 });
    ry.set((px - 0.5) * strength);
    rx.set((0.5 - py) * strength);
  };
  const onMouseLeave = () => {
    setGlow((g) => ({ ...g, opacity: 0 }));
    rx.set(0);
    ry.set(0);
  };

  return {
    tiltStyle: { rotateX, rotateY, transformPerspective: 900 },
    tiltHandlers: { onMouseMove, onMouseLeave },
    glow,
  };
}

export function Spotlight({ glow, color = '124,92,255', size = 420 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        borderRadius: 'inherit',
        background: `radial-gradient(${size}px circle at ${glow.x}% ${glow.y}%, rgba(${color},0.16), transparent 65%)`,
        opacity: glow.opacity,
        transition: 'opacity 0.35s ease',
      }}
    />
  );
}

/* ── Stagger helpers ──────────────────────────────────────────────────────── */
export function StaggerContainer({ children, delay = 0.08, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(delay)}
    >
      {children}
    </motion.div>
  );
}

export const riseItem = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={riseItem}>
      {children}
    </motion.div>
  );
}

export function Badge({ children }) {
  return <span className="pill">{children}</span>;
}

/* ── SectionHeader ────────────────────────────────────────────────────────── */
export function SectionHeader({ label, heading, sub, align = 'left', eyebrowAs }) {
  const centered = align === 'center';

  return (
    <div className={`section-header ${centered ? 'text-center' : ''}`}>
      {label && (
        <Reveal from="none" duration={0.5}>
          <h5>{label}</h5>
        </Reveal>
      )}

      {/* A plain string gets the masked word reveal; JSX is rendered as-is so
          callers can still pass custom markup. */}
      <h2 style={{ maxWidth: centered ? 920 : 760, marginInline: centered ? 'auto' : undefined }}>
        {typeof heading === 'string' ? <SplitText text={heading} /> : heading}
      </h2>

      {sub && (
        <Reveal delay={0.15}>
          <p
            className={`lead ${centered ? 'mx-auto' : ''}`}
            style={{ maxWidth: 620 }}
          >
            {sub}
          </p>
        </Reveal>
      )}

      {eyebrowAs}
    </div>
  );
}
