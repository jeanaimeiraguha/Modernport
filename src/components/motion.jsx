import { forwardRef } from 'react';
import { motion } from 'framer-motion';

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
        fontFamily: 'Inter, monospace',
        background: color ? `${color}12` : 'rgba(99,102,241,0.08)',
        color: color || 'var(--accent)',
        border: `1px solid ${color ? color + '28' : 'rgba(99,102,241,0.18)'}`,
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
        className="font-display font-bold leading-[1.08]"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
        }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className="mt-4 max-w-lg leading-relaxed"
          style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
