import { motion } from 'framer-motion';

const LINES = [
  'Initializing portfolio…',
  'Loading projects…',
  'Almost ready…',
];

export default function LoadingAnimation({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">

        {/* Spinning ring + initials */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer spinning arc */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: 'var(--accent)',
              borderRightColor: 'var(--accent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner static ring */}
          <div
            className="absolute inset-[6px] rounded-full"
            style={{ border: '1px solid var(--border)' }}
          />
          {/* Initials */}
          <span
            className="font-display text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            JA
          </span>
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
            <span style={{ color: 'var(--accent)' }}>Iraguha</span>
          </h1>
          <p
            className="mt-2 text-sm font-medium tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-56 sm:w-72"
        >
          <div
            className="w-full h-[2px] rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--accent)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={onDone}
            />
          </div>

          {/* Cycling status text */}
          <div className="mt-3 h-4 overflow-hidden">
            {LINES.map((line, i) => (
              <motion.p
                key={line}
                className="text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                transition={{
                  delay: 0.6 + i * 0.75,
                  duration: 0.75,
                  times: [0, 0.15, 0.75, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
