import { motion } from 'framer-motion';

const LINE = ({ children }) => <div style={{ whiteSpace: 'pre' }}>{children}</div>;

export default function CodeWindow({ className = '', style = {} }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ perspective: 900, ...style }}
      initial={{ opacity: 0, y: 24, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: 'rotateY(-10deg) rotateX(5deg)',
          transformStyle: 'preserve-3d',
          width: 'clamp(200px, 22vw, 250px)',
          borderRadius: 12,
          overflow: 'hidden',
          background: 'rgba(8,21,33,0.92)',
          border: '1px solid rgba(45,212,191,0.22)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 40px rgba(20,184,166,0.12)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fbbf24' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} />
          <span
            className="ml-1.5 text-[9px]"
            style={{ color: 'rgba(234,243,243,0.45)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            engineer.ts
          </span>
        </div>

        {/* Code body */}
        <div
          className="px-3.5 py-3 text-[10.5px] leading-[1.85]"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#94a8ba' }}
        >
          <LINE><span style={{ color: '#a78bfa' }}>const</span> <span style={{ color: '#38bdf8' }}>engineer</span> = {'{'}</LINE>
          <LINE>{'  '}name: <span style={{ color: '#5eead4' }}>'Jean Aime Iraguha'</span>,</LINE>
          <LINE>{'  '}role: <span style={{ color: '#5eead4' }}>'Full-Stack · Founder'</span>,</LINE>
          <LINE>{'  '}stack: [<span style={{ color: '#5eead4' }}>'AI'</span>, <span style={{ color: '#5eead4' }}>'Web3'</span>, <span style={{ color: '#5eead4' }}>'Cloud'</span>],</LINE>
          <LINE>{'  '}available: <span style={{ color: '#facc15' }}>true</span>,</LINE>
          <LINE>
            {'}'}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ display: 'inline-block', width: 6, height: 12, background: '#2dd4bf', marginLeft: 4, transform: 'translateY(2px)' }}
            />
          </LINE>
        </div>
      </motion.div>
    </motion.div>
  );
}
