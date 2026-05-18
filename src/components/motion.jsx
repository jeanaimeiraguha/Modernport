import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

export const viewportOnce = { once: true, margin: '-60px' };

export const FadeUp = forwardRef(function FadeUp({ children, delay = 0, className = '' }, ref) {
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
});

export function Badge({ children }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-md"
      style={{
        background: 'rgba(99,102,241,0.1)',
        color: 'var(--accent)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}
    >
      {children}
    </span>
  );
}

export function SectionHeader({ label, heading, sub }) {
  return (
    <FadeUp>
      <p
        className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </p>
      <h2
        className="font-display text-3xl sm:text-4xl font-bold leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {heading}
      </h2>
      {sub && (
        <p className="mt-3 text-sm max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          {sub}
        </p>
      )}
    </FadeUp>
  );
}
