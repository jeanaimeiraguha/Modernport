import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, Badge, stagger, viewportOnce } from './motion';
import { DOMAINS } from './data';

function DomainCard({ domain, index, isActive, onClick }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="relative rounded-xl p-6 cursor-pointer overflow-hidden transition-all duration-200"
      style={{
        background: isActive ? `${domain.color}12` : 'var(--bg-card)',
        border: `1px solid ${isActive ? domain.color + '55' : 'var(--border)'}`,
        boxShadow: isActive ? `0 0 32px ${domain.color}18` : 'none',
      }}
    >
      {/* Glow blob when active */}
      {isActive && (
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${domain.color}22 0%, transparent 70%)` }}
        />
      )}

      {/* Icon */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-2xl font-bold select-none"
          style={{ color: domain.color }}
        >
          {domain.icon}
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-1 rounded-full"
          style={{
            background: `${domain.color}12`,
            color: domain.color,
            border: `1px solid ${domain.color}25`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        {domain.label}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {domain.headline}
      </p>

      {/* Active indicator bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
        style={{ background: domain.color }}
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];

  return (
    <section id="skills" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="What I do"
          heading={<>Six domains.<br />One engineer.</>}
          sub="From intelligent systems to decentralised protocols — I build across the full spectrum of modern software."
        />

        {/* Domain cards grid */}
        <motion.div
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.07)}
        >
          {DOMAINS.map((d, i) => (
            <DomainCard
              key={d.id}
              domain={d}
              index={i}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </motion.div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            className="mt-5 rounded-xl p-5 sm:p-7"
            style={{
              background: `${domain.color}08`,
              border: `1px solid ${domain.color}30`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
              {/* Left — description */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" style={{ color: domain.color }}>{domain.icon}</span>
                  <div>
                    <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                      {domain.label}
                    </p>
                    <p className="text-xs" style={{ color: domain.color }}>{domain.headline}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {domain.desc}
                </p>
              </div>

              {/* Right — skill pills */}
              <div className="sm:w-72 shrink-0">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.16em] mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Tools &amp; Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: `${domain.color}15`,
                        color: domain.color,
                        border: `1px solid ${domain.color}35`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        <p className="mt-4 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
          Click any domain to explore
        </p>
      </div>
    </section>
  );
}
