import { motion } from 'framer-motion';

export default function LoadingAnimation({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">

        {/* ── Kicking figure + ball ── */}
        <div className="relative w-48 h-48 flex items-end justify-center">

          {/* Shadow under figure */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
            style={{ background: 'rgba(99,102,241,0.18)', filter: 'blur(4px)' }}
            animate={{ scaleX: [1, 0.7, 1], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── Stick figure ── */}
          <svg
            width="90" height="160"
            viewBox="0 0 90 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
            style={{ overflow: 'visible' }}
          >
            {/* Head */}
            <motion.circle
              cx="45" cy="18" r="14"
              fill="var(--accent)"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Body */}
            <motion.line
              x1="45" y1="32" x2="45" y2="90"
              stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Left arm (raised up — celebrating) */}
            <motion.line
              x1="45" y1="50" x2="15" y2="30"
              stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round"
              animate={{ rotate: [-10, 10, -10], originX: '45px', originY: '50px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Right arm (swinging for kick) */}
            <motion.line
              x1="45" y1="50" x2="75" y2="65"
              stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round"
              animate={{ rotate: [0, 15, 0], originX: '45px', originY: '50px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Left leg (standing) */}
            <motion.line
              x1="45" y1="90" x2="30" y2="140"
              stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Right leg — kicking! */}
            <motion.line
              x1="45" y1="90" x2="80" y2="115"
              stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round"
              animate={{
                x2: [80, 105, 80],
                y2: [115, 90, 115],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          {/* ── Ball ── */}
          <motion.div
            className="absolute"
            style={{ bottom: 0, left: '62%' }}
            animate={{
              x:    [0,  60, 130, 200],
              y:    [0, -70,  -20, 0],
              rotate: [0, 180, 360, 540],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeOut',
              repeatType: 'loop',
            }}
          >
            {/* Soccer ball SVG */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" fill="white" stroke="#ccc" strokeWidth="1" />
              {/* Pentagon patches */}
              <polygon points="14,4 18,8 16,13 12,13 10,8" fill="#1e1e2e" />
              <polygon points="4,10 8,8 10,13 7,17 3,15" fill="#1e1e2e" />
              <polygon points="24,10 20,8 18,13 21,17 25,15" fill="#1e1e2e" />
              <polygon points="7,22 10,18 14,20 18,18 21,22 14,26" fill="#1e1e2e" />
            </svg>
          </motion.div>

        </div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Jean Aime{' '}
            <span style={{ color: 'var(--accent)' }}>IRAGUHA</span>
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
            Full-Stack Engineer · CTO @ Igifu Meals
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-56 sm:w-72"
        >
          <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--accent)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={onDone}
            />
          </div>
          <motion.p
            className="mt-3 text-[11px] tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Loading portfolio…
          </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
}
