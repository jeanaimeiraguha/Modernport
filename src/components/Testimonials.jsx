import { motion } from 'framer-motion';
import { FaQuoteRight } from 'react-icons/fa';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { TESTIMONIALS } from './data';

function TestimonialCard({ t }) {
  return (
    <motion.figure
      variants={{
        hidden: { opacity: 0, y: 30 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="qt-card relative flex flex-col"
      style={{ padding: '36px 32px' }}
    >
      {/* Oversized quote mark */}
      <FaQuoteRight
        size={38}
        className="absolute pointer-events-none"
        style={{ top: 26, right: 28, color: 'var(--primary)', opacity: 0.09 }}
      />

      <blockquote
        className="flex-1"
        style={{ color: 'var(--paragraph)', fontSize: 15.5, lineHeight: '28px' }}
      >
        {t.text}
      </blockquote>

      <figcaption
        className="flex items-center gap-4"
        style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border-soft)' }}
      >
        <span className="relative shrink-0" style={{ width: 54, height: 54 }}>
          <img
            src={t.image}
            alt={t.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fb = e.currentTarget.nextElementSibling;
              if (fb) fb.style.display = 'flex';
            }}
          />
          <span
            className="absolute inset-0 items-center justify-center"
            style={{ display: 'none', background: 'var(--primary)', color: '#ffffff', fontWeight: 700, fontSize: 15 }}
          >
            {t.avatar}
          </span>
        </span>
        <span>
          <span className="block" style={{ color: 'var(--heading)', fontWeight: 700, fontSize: 16 }}>
            {t.name}
          </span>
          <span className="block" style={{ color: 'var(--muted)', fontSize: 13, lineHeight: '20px' }}>
            {t.role}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="qt-section bg-sub">
      <div className="qt-container">
        <SectionHeader
          label="Testimonials"
          heading="What people say"
          sub="Feedback from the clients, colleagues and teammates I have built alongside."
          align="center"
        />

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
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
