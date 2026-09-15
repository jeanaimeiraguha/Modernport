import { motion } from 'framer-motion';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { TESTIMONIALS } from './data';

function TestimonialCard({ t }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="card-notch relative p-7 sm:p-8 flex flex-col items-center text-center"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      whileHover={{ y: -3, borderColor: 'rgba(20,184,166,0.3)' }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={t.image}
        alt={t.name}
        className="w-16 h-16 rounded-xl object-cover shrink-0 mb-4"
        style={{ border: '1px solid var(--border)' }}
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
      />
      <div
        className="w-16 h-16 rounded-xl items-center justify-center text-sm font-bold shrink-0 mb-4"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', color: '#fff', display: 'none' }}
      >
        {t.avatar}
      </div>
      <p className="font-display font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
      <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
        {t.text}
      </p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Testimonials"
          heading={<>What people<br />say about me.</>}
          sub="Feedback from colleagues, clients, and teammates I've had the privilege of working with."
        />

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
