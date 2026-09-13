import { forwardRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ── Mouse-tracking tilt + spotlight ──────────────────────────────────────── */
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export function useTilt(strength = 7) {
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.6 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
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
    tiltStyle: { rotateX, rotateY, transformPerspective: 800 },
    tiltHandlers: { onMouseMove, onMouseLeave },
    glow,
  };
}

export function Spotlight({ glow, color = '20,184,166', size = 420 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
      style={{
        background: `radial-gradient(${size}px circle at ${glow.x}% ${glow.y}%, rgba(${color},0.14), transparent 65%)`,
        opacity: glow.opacity,
        transition: 'opacity 0.35s ease',
      }}
    />
  );
}

/* ── Magnetic button ───────────────────────────────────────────────────────── */
export function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { style: { x: sx, y: sy }, handlers: { onMouseMove, onMouseLeave } };
}

export const viewportOnce = { once: true, margin: '-80px' };

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

export const FadeUp = forwardRef(function FadeUp({ children, delay = 0, className = '' }, ref) {
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
});

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLeft({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealRight({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, delay = 0.08, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, color }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-md"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        background: color ? `${color}12` : 'rgba(20,184,166,0.08)',
        color: color || 'var(--accent)',
        border: `1px solid ${color ? color + '28' : 'rgba(20,184,166,0.18)'}`,
      }}
    >
      {children}
    </span>
  );
}

export function SectionHeader({ label, heading, sub }) {
  return (
    <Reveal>
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </p>
      <h2
        className="font-display font-bold leading-[1.06]"
        style={{
          fontSize: 'clamp(2.1rem, 4.8vw, 3.5rem)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
        }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className="mt-4 max-w-lg leading-relaxed"
          style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
