import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { SectionHeader, Badge, stagger } from './motion';
import { PROJECTS } from './data';

/* ── Igifu Meals hero card (full-width featured) ── */
function HeroProjectCard({ project }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } },
      }}
      className="relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Splash image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }}
        />
        {/* Category badge on image */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {project.category}
          </span>
        </div>
        {/* Live link on image */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <FaExternalLinkAlt size={10} /> Live site
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8" style={{ background: 'var(--bg-card)' }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular project card ── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-xl overflow-hidden card-hover"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      {/* Splash image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)' }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(99,102,241,0.85)', color: '#fff' }}
          >
            {project.category}
          </span>
        </div>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 p-1.5 rounded-full transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(6px)' }}
            aria-label="Live site"
          >
            <FaExternalLinkAlt size={10} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-4 font-sans" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [hero, ...rest] = PROJECTS; // Igifu Meals is first = hero

  return (
    <section id="projects" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Projects"
          heading="Things I've built"
          sub="A selection of work across web, AI, robotics, blockchain, and food-tech."
        />

        {/* Hero card — Igifu Meals */}
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: {} }}
        >
          <HeroProjectCard project={hero} />
        </motion.div>

        {/* Rest — 2-col grid */}
        <motion.div
          className="mt-5 grid xs:grid-cols-2 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0.09)}
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
