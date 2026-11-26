import { motion } from 'framer-motion';
import { FaArrowRight, FaLayerGroup, FaServer, FaCubes } from 'react-icons/fa';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { SERVICES } from './data';

const ICONS = {
  frontend:  <FaLayerGroup size={26} />,
  backend:   <FaServer size={26} />,
  fullstack: <FaCubes size={26} />,
};

function ServiceCard({ service, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 34 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="qt-card leaf-card hover-lift edge-wipe relative flex flex-col overflow-hidden"
      style={{ padding: '40px 32px' }}
    >
      {/* Oversized index numeral in the corner */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          top: 14, right: 26,
          fontSize: 66, fontWeight: 800, lineHeight: 1,
          color: 'var(--primary)', opacity: 0.06,
        }}
      >
        0{index + 1}
      </span>

      {/* Icon tile — flips on card hover, as on the reference's service cards */}
      <span className="qt-icon-tile relative z-10 mb-7">
        {ICONS[service.id] ?? <FaCubes size={26} />}
      </span>

      <h3 className="relative z-10" style={{ marginBottom: 14 }}>
        {service.title}
      </h3>
      <p className="relative z-10 flex-1" style={{ color: 'var(--paragraph)' }}>
        {service.desc}
      </p>

      <button
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="read-more-btn pressable relative z-10"
        style={{ marginTop: 26 }}
      >
        Read More
        <span className="btn-icon"><FaArrowRight size={11} /></span>
      </button>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="qt-section bg-main">
      <div className="qt-container">
        <SectionHeader
          label="What I Do"
          heading="Wide range of services"
          sub="From pixel-accurate interfaces to the APIs and databases behind them — I deliver the whole product, not one layer of it."
          align="center"
        />

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
