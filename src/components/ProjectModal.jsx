import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaCheckCircle, FaUserTie, FaCalendarAlt } from 'react-icons/fa';
import { Badge } from './motion';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-start sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(4,4,10,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative w-full sm:max-w-2xl max-h-[100vh] sm:max-h-[88vh] overflow-y-auto rounded-none sm:rounded-2xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(8,8,16,0.55)', color: '#fff', backdropFilter: 'blur(8px)' }}
            >
              <FaTimes size={14} />
            </button>

            {/* Image */}
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) saturate(0.8)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, var(--bg-surface) 0%, rgba(8,8,16,0.15) 65%, transparent 100%)' }}
              />
              <div className="absolute bottom-5 left-5 sm:left-7 right-5">
                <span
                  className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-3"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {project.category}
                </span>
                <h3
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#fff', letterSpacing: '-0.03em' }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7">
              {/* Meta row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                {project.role && (
                  <div className="flex items-center gap-2">
                    <FaUserTie size={12} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{project.role}</span>
                  </div>
                )}
                {project.period && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt size={12} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{project.period}</span>
                  </div>
                )}
                {project.team && (
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{project.team}</span>
                )}
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed mb-7" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {project.highlights?.length > 0 && (
                <div className="mb-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>
                    Key highlights
                  </p>
                  <div className="space-y-3">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <FaCheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{h}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    Visit live site <FaExternalLinkAlt size={11} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
