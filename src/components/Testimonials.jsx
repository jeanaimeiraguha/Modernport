import { motion } from 'framer-motion';
import { FadeUp, SectionHeader, stagger, viewportOnce } from './motion';
import { TESTIMONIALS } from './data';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Testimonials"
          heading={<>What people<br />say about me.</>}
          sub="Feedback from colleagues, clients, and teammates I've had the privilege of working with."
        />

        <motion.div
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="card-hover rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <FaQuoteLeft size={16} style={{ color: 'var(--accent)', opacity: 0.6 }} />

              <p
                className="text-[0.9rem] leading-[1.8] tracking-[-0.01em] flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
