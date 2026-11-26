import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { SectionHeader, viewportOnce, EASE } from './motion';
import { PROJECTS, PROJECT_FILTERS } from './data';
import { getTechIcon } from './techIcons';

/* Text-forward case card. There is no photography here on purpose: stock
   imagery on a project you actually built reads as filler, and the work
   itself is the thing worth showing. */
function CaseCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="qt-card hover-lift edge-wipe relative flex flex-col overflow-hidden"
      style={{ padding: '32px 30px' }}
    >
      {/* Index, set large and faint in the corner */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none nums"
        style={{
          top: 18, right: 24,
          fontFamily: 'var(--font-display)',
          fontSize: 56, fontWeight: 700, lineHeight: 1,
          color: 'var(--text)', opacity: 0.045,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex items-center gap-2.5 flex-wrap" style={{ marginBottom: 18 }}>
        <span className="pill">{project.group}</span>
        <span
          className="nums"
          style={{ color: 'var(--text-faint)', fontSize: 12.5, fontFamily: 'var(--font-mono)' }}
        >
          {project.year}
        </span>
      </div>

      <h3 style={{ marginBottom: 6 }}>{project.title}</h3>
      <p style={{ color: 'var(--accent-hi)', fontSize: 13.5, fontWeight: 500, marginBottom: 14 }}>
        {project.role}
      </p>

      <p
        className="flex-1"
        style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.68 }}
      >
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap items-center gap-2" style={{ marginTop: 24 }}>
        {project.stack.map((t) => {
          const { Icon, color } = getTechIcon(t);
          return (
            <span
              key={t}
              title={t}
              className="inline-flex items-center gap-1.5 shrink-0"
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                fontSize: 11.5,
                fontWeight: 500,
                color: 'var(--text-dim)',
              }}
            >
              <Icon size={12} style={{ color }} />
              {t}
            </span>
          );
        })}
      </div>

      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-btn"
          style={{ marginTop: 22, color: 'var(--accent-hi)' }}
        >
          Visit live site
          <span className="btn-icon"><FaExternalLinkAlt size={10} /></span>
        </a>
      )}
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const counts = useMemo(() => {
    const c = { All: PROJECTS.length };
    for (const f of PROJECT_FILTERS) {
      if (f === 'All') continue;
      c[f] = PROJECTS.filter((p) => p.group === f).length;
    }
    return c;
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.group === filter)),
    [filter],
  );

  return (
    <section id="projects" className="qt-section bg-sub">
      <div className="qt-container">
        <SectionHeader
          label="Selected work"
          heading="Things I have built"
          sub="Production work across food-tech, education, AI, computer vision and Web3. Filter by the area you care about."
          align="center"
        />

        {/* Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ marginTop: 44 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          role="tablist"
          aria-label="Filter projects by area"
        >
          {PROJECT_FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f)}
                className={`chip pressable ${isActive ? 'is-active' : ''}`}
              >
                {f}
                <span className="chip-count">{counts[f] ?? 0}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ marginTop: 44 }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <CaseCard key={p.title} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center" style={{ marginTop: 56 }}>
          <a
            href="https://github.com/jeanaimeiraguha"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-two pressable"
          >
            More on GitHub
            <span className="btn-icon"><FaArrowRight size={12} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
