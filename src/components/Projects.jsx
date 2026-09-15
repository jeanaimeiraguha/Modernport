import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { SectionHeader, stagger, useTilt, Spotlight } from './motion';
import { PROJECTS } from './data';
import { getTechIcon } from './techIcons';

function ProjectCard({ project }) {
  const { tiltStyle, tiltHandlers, glow } = useTilt(5);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...tiltHandlers}
      className="group relative flex flex-col rounded-xl overflow-hidden"
      style={{ ...tiltStyle, background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      whileHover={{ y: -4, borderColor: 'rgba(20,184,166,0.3)' }}
      transition={{ duration: 0.25 }}
    >
      <Spotlight glow={glow} size={340} />

      {/* Image */}
      <div className="relative z-10 h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col flex-1">
        <h3
          className="font-display font-bold mb-0.5"
          style={{ fontSize: '1.0625rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
          {project.category}
        </p>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {project.live && (
          <a
            href={project.live} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mb-4 w-fit"
            style={{ color: 'var(--accent)' }}
          >
            Visit Live Site <FaArrowRight size={10} />
          </a>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((t) => {
            const { Icon, color } = getTechIcon(t);
            return (
              <span
                key={t}
                aria-label={t}
                title={t}
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, color }}
              >
                <Icon size={13} />
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Projects"
          heading="Things I've built"
          sub="A selection of work across web, AI, robotics, blockchain, and food-tech."
        />

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0.08)}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
