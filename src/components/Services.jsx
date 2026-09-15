import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SectionHeader, stagger, viewportOnce, useTilt, Spotlight, hexToRgb } from './motion';
import { SERVICES } from './data';

function ServiceCard({ service }) {
  const { tiltStyle, tiltHandlers, glow } = useTilt(5);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -4 }}
      {...tiltHandlers}
      className="relative rounded-2xl p-7 sm:p-8 overflow-hidden flex flex-col"
      style={{
        ...tiltStyle,
        background: `linear-gradient(155deg, ${service.color}14, var(--bg-card) 55%)`,
        border: `1px solid ${service.color}28`,
        minHeight: 300,
      }}
    >
      <Spotlight glow={glow} color={hexToRgb(service.color)} />

      {/* Glow blob, top-right — echoes the reference's colored orb behind each icon */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: -40, right: -40, width: 160, height: 160,
          background: `radial-gradient(circle, ${service.color}55, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-6"
        style={{ background: `linear-gradient(135deg, ${service.color}, ${service.accent})`, color: '#fff' }}
      >
        {service.icon}
      </div>

      <h3
        className="relative z-10 font-display font-bold mb-3"
        style={{ fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
      >
        {service.title}
      </h3>
      <p className="relative z-10 text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        {service.desc}
      </p>

      <div className="relative z-10 flex items-center gap-3 mt-6 pt-5" style={{ borderTop: `1px solid ${service.color}1c` }}>
        <a
          href="https://github.com/jeanaimeiraguha"
          target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className="transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = service.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <FaGithub size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/"
          target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = service.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <FaLinkedin size={15} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Services"
          heading={<>What I can<br />build for you.</>}
          sub="From pixel-perfect interfaces to the APIs and databases behind them — I ship the whole product, not just one layer of it."
        />

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
