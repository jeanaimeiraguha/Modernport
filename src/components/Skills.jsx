import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { DOMAINS } from './data';

function DomainCard({ domain, index, isActive, onClick }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="relative rounded-xl p-6 cursor-pointer overflow-hidden"
      style={{
        background: isActive ? `${domain.color}0c` : 'var(--bg-card)',
        border: `1px solid ${isActive ? domain.color + '45' : 'var(--border)'}`,
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-2xl font-bold select-none" style={{ color: domain.color }}>
          {domain.icon}
        </span>
        <span
          className="text-[10px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-md"
          style={{ background: `${domain.color}10`, color: domain.color, border: `1px solid ${domain.color}22` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
        {domain.label}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {domain.headline}
      </p>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
        style={{ background: domain.color }}
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];

  return (
    <section id="skills" className="py-20 sm:py-32" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="What I do"
          heading={<>Six domains.<br />One engineer.</>}
          sub="From intelligent systems to decentralised protocols — I build across the full spectrum of modern software."
        />

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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

        <AnimatePresence mode="wait">
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            className="mt-5 rounded-xl p-6 sm:p-7"
            style={{
              background: `${domain.color}07`,
              border: `1px solid ${domain.color}28`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
                    style={{ background: `${domain.color}12`, color: domain.color }}
                  >
                    {domain.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                      {domain.label}
                    </p>
                    <p className="text-xs" style={{ color: domain.color }}>{domain.headline}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {domain.desc}
                </p>
              </div>

              <div className="sm:w-64 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  Tools & Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className="inline-block px-3 py-1 text-xs font-medium rounded-md"
                      style={{
                        background: `${domain.color}10`,
                        color: domain.color,
                        border: `1px solid ${domain.color}28`,
                        fontFamily: 'Inter, monospace',
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

        <p className="mt-4 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
          Click any domain to explore
        </p>
      </div>
    </section>
  );
}
