import { motion } from 'framer-motion';

function Avatar() {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle background */}
      <circle cx="56" cy="56" r="56" fill="rgba(99,102,241,0.12)" />

      {/* Body / torso */}
      <ellipse cx="56" cy="95" rx="28" ry="18" fill="#6366f1" opacity="0.9" />

      {/* Neck */}
      <rect x="50" y="72" width="12" height="10" rx="4" fill="#f5c5a3" />

      {/* Head */}
      <circle cx="56" cy="58" r="20" fill="#f5c5a3" />

      {/* Hair */}
      <path d="M36 54 Q36 34 56 34 Q76 34 76 54 Q72 44 56 44 Q40 44 36 54Z" fill="#1a1a2e" />

      {/* Eyes */}
      <circle cx="49" cy="56" r="2.5" fill="#1a1a2e" />
      <circle cx="63" cy="56" r="2.5" fill="#1a1a2e" />
      {/* Eye shine */}
      <circle cx="50" cy="55" r="0.8" fill="white" />
      <circle cx="64" cy="55" r="0.8" fill="white" />

      {/* Smile */}
      <path d="M49 63 Q56 69 63 63" stroke="#c0845a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Shirt collar */}
      <path d="M44 78 L56 84 L68 78 L64 72 L56 76 L48 72Z" fill="#4f46e5" />

      {/* Laptop hint on lap */}
      <rect x="38" y="90" width="36" height="6" rx="2" fill="#818cf8" opacity="0.7" />
      <rect x="40" y="88" width="32" height="5" rx="1.5" fill="#6366f1" opacity="0.5" />
    </svg>
  );
}

export default function LoadingAnimation({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ── Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Outer spinning arc */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -6,
              border: '2.5px solid transparent',
              borderTopColor: 'var(--accent)',
              borderRightColor: 'var(--accent)',
              borderBottomColor: 'rgba(99,102,241,0.15)',
              borderLeftColor: 'rgba(99,102,241,0.15)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Counter arc */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -14,
              border: '1.5px solid transparent',
              borderTopColor: 'rgba(129,140,248,0.3)',
              borderBottomColor: 'rgba(129,140,248,0.3)',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Avatar circle */}
          <div
            className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center"
            style={{ border: '3px solid var(--bg-base)', background: 'var(--bg-elevated)' }}
          >
            <Avatar />
          </div>

          {/* Online dot */}
          <motion.span
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full"
            style={{ background: '#4ade80', border: '2px solid var(--bg-base)', boxShadow: '0 0 8px rgba(74,222,128,0.7)' }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── Name + role ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeInOut' }}
              style={{ display: 'inline-block', marginRight: 6 }}
            >
              👋
            </motion.span>
            Welcome to my portfolio
          </p>

          <h1
            className="font-display font-bold text-2xl sm:text-3xl"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Jean Aime{' '}
            <span style={{ color: 'var(--accent)' }}>IRAGUHA</span>
          </h1>

          <p className="text-xs tracking-[0.18em] uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
            Full-Stack Engineer · CTO @ Igifu Meals
          </p>
        </motion.div>

        {/* ── Progress bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-52 sm:w-64 flex flex-col items-center gap-2"
        >
          <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 2, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={onDone}
            />
          </div>
          <motion.span
            className="text-[10px] tracking-widest uppercase font-mono"
            style={{ color: 'var(--text-muted)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Loading…
          </motion.span>
        </motion.div>

      </div>
    </motion.div>
  );
}
