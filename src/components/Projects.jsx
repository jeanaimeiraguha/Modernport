import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { PROJECTS } from './data';
import { getTechIcon } from './techIcons';

/* Case-study card: full-bleed image under a bottom-up dark scrim, with the
   title and category sitting on the image and the stack revealed below. */
function CaseCard({ project }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 34 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="qt-card group relative flex flex-col overflow-hidden"
    >
      {/* Image + scrim */}
      <div className="media-zoom case-scrim relative overflow-hidden" style={{ height: 250 }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Category chip */}
        <span
          className="absolute z-10"
          style={{
            top: 18, left: 18,
            background: 'var(--primary)', color: '#ffffff',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '6px 12px',
          }}
        >
          {project.category}
        </span>

        {/* Title over the scrim */}
        <h4
          className="absolute z-10"
          style={{ left: 24, right: 24, bottom: 20, color: '#ffffff', marginBottom: 0 }}
        >
          {project.title}
        </h4>

        {/* Circular action button, revealed on hover */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="absolute z-20 inline-flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
            style={{
              top: 16, right: 16, width: 46, height: 46,
              borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)',
              color: '#ffffff', background: 'rgba(5,65,99,0.4)',
              backdropFilter: 'blur(6px)',
              transition: 'var(--transition)',
            }}
          >
            <FaArrowRight size={13} style={{ transform: 'rotate(-45deg)' }} />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1" style={{ padding: 30 }}>
        <p className="flex-1" style={{ color: 'var(--paragraph)', fontSize: 15, lineHeight: '26px' }}>
          {project.description}
        </p>

        {/* Stack icons */}
        <div className="flex flex-wrap items-center gap-2" style={{ marginTop: 24 }}>
          {project.stack.map((t) => {
            const { Icon, color } = getTechIcon(t);
            return (
              <span
                key={t}
                title={t}
                aria-label={t}
                className="inline-flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, background: 'var(--sub-bg)', color }}
              >
                <Icon size={15} />
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
            style={{ marginTop: 22, color: 'var(--primary)' }}
          >
            Visit Live Site
            <span className="btn-icon"><FaArrowRight size={11} /></span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="qt-section bg-sub">
      <div className="qt-container">
        <SectionHeader
          label="From My Case Studies"
          heading="Selected projects"
          sub="Production work across food-tech, fintech, education, AI, robotics and Web3."
          align="center"
        />

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.09)}
        >
          {PROJECTS.map((p) => (
            <CaseCard key={p.title} project={p} />
          ))}
        </motion.div>

        <div className="flex justify-center" style={{ marginTop: 56 }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-one"
          >
            Start A Project
            <span className="btn-icon"><FaArrowRight size={12} /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
