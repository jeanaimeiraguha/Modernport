import { motion } from 'framer-motion';
import { SectionHeader, FadeUp, stagger, viewportOnce } from './motion';
import { EXPERIENCE, EDUCATION } from './data';

function TimelineItem({ item, isWork }) {
  const isCTO = item.role?.includes('CTO') || item.role?.includes('Co-Founder');

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -16 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } },
      }}
      className="relative pl-6"
    >
      <div className="absolute left-0 top-2 bottom-0 w-px" style={{ background: 'var(--border)' }} />

      <div
        className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full"
        style={{
          border: `2px solid ${isCTO ? 'var(--accent)' : 'var(--border)'}`,
          background: isCTO ? 'var(--accent)' : 'var(--bg-base)',
          boxShadow: isCTO ? '0 0 8px rgba(99,102,241,0.5)' : 'none',
        }}
      />

      <div className="pb-9">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {isWork ? item.role : item.degree}
          </p>
          {item.current && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: '#4ade80', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.18)' }}
            >
              Current
            </span>
          )}
          {isCTO && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: 'var(--accent)', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)' }}
            >
              Co-Founder
            </span>
          )}
        </div>

        <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--accent)' }}>
          {isWork ? item.company : item.institution}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{item.period}</p>

        {isWork ? (
          <ul className="space-y-2">
            {item.points.map((pt) => (
              <li key={pt} className="text-sm leading-relaxed flex gap-2.5" style={{ color: 'var(--text-secondary)' }}>
                <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                {pt}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.note}</p>
            {item.anlm && (
              <div
                className="mt-3 rounded-xl px-4 py-3"
                style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.14)' }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent)' }}>✦ Grateful to ANLM</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  The ANLM (African New Life Ministries) supported and mentored me throughout my primary years.
                  Their spiritual leadership and community values shaped who I am — teaching me discipline,
                  integrity, and the importance of giving back.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-32" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Background"
          heading="Experience & Education"
          sub="4+ years of building — from intern to co-founder."
        />

        <div className="mt-12 sm:mt-16 grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16">
          {/* Work */}
          <div>
            <FadeUp>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-8" style={{ color: 'var(--text-muted)' }}>
                Work history
              </p>
            </FadeUp>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.1)}
            >
              {EXPERIENCE.map((e) => (
                <TimelineItem key={e.company} item={e} isWork />
              ))}
            </motion.div>
          </div>

          {/* Education + certs */}
          <div>
            <FadeUp>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-8" style={{ color: 'var(--text-muted)' }}>
                Education
              </p>
            </FadeUp>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.1)}
            >
              {EDUCATION.map((e) => (
                <TimelineItem key={e.institution} item={e} isWork={false} />
              ))}
            </motion.div>

            <FadeUp delay={0.2}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5 mt-2" style={{ color: 'var(--text-muted)' }}>
                Certifications & Awards
              </p>
              <div className="space-y-3">
                {[
                  { title: 'AWS Certified Developer – Associate', sub: 'Amazon Web Services' },
                  { title: 'First Class Honors', sub: 'University of Rwanda · Top 5%' },
                  { title: 'CS Club President', sub: '2020–2022 · Led 100+ members' },
                  { title: 'IEEE Research Publication', sub: 'Blockchain in supply chain' },
                ].map((c) => (
                  <motion.div
                    key={c.title}
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                    whileHover={{ borderColor: 'rgba(99,102,241,0.3)', x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
