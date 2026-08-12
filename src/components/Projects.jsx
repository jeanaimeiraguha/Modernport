import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowRight, FaSearchPlus } from 'react-icons/fa';
import { SectionHeader, Badge, stagger } from './motion';
import { PROJECTS } from './data';
import ProjectModal from './ProjectModal';

function HeroProjectCard({ project, onOpen }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16,1,0.3,1] } },
      }}
      onClick={() => onOpen(project)}
      className="relative rounded-xl overflow-hidden group cursor-pointer"
      style={{ border: '1px solid var(--border)' }}
      whileHover={{ borderColor: 'rgba(99,102,241,0.35)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: 'brightness(0.4) saturate(0.7)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(8,8,16,0.3) 60%, transparent 100%)' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(8,8,16,0.35)' }}
        >
          <FaSearchPlus size={12} /> View case study
        </div>
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {project.category}
          </span>
        </div>
        {project.live && (
          <a
            href={project.live} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <FaExternalLinkAlt size={9} /> Live site
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8" style={{ background: 'var(--bg-card)' }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3
              className="font-display font-bold mb-3"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
          </div>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white self-start"
            style={{ background: 'var(--accent)' }}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.97 }}
          >
            View project <FaArrowRight size={10} />
          </motion.button>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } },
      }}
      onClick={() => onOpen(project)}
      className="group relative flex flex-col rounded-xl overflow-hidden cursor-pointer"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.3)' }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
          style={{ filter: 'brightness(0.45) saturate(0.7)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center gap-1.5 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(8,8,16,0.35)' }}
        >
          <FaSearchPlus size={10} /> Case study
        </div>
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(99,102,241,0.85)', color: '#fff' }}
          >
            {project.category}
          </span>
        </div>
        {project.live && (
          <a
            href={project.live} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-1.5 rounded-full transition-opacity hover:opacity-75"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(6px)' }}
            aria-label="Live site"
          >
            <FaExternalLinkAlt size={9} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-bold mb-2"
          style={{ fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
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
  const [hero, ...rest] = PROJECTS;
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-20 sm:py-32" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Projects"
          heading="Things I've built"
          sub="A selection of work across web, AI, robotics, blockchain, and food-tech. Click any project for the full case study."
        />

        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: {} }}
        >
          <HeroProjectCard project={hero} onOpen={setSelected} />
        </motion.div>

        <motion.div
          className="mt-5 grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0.08)}
        >
          {rest.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
