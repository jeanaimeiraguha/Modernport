import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import { SectionHeader, Reveal, stagger, viewportOnce } from './motion';
import { EXPERIENCE, EDUCATION } from './data';

const CERTS = [
  { title: 'AWS Certified Developer – Associate', sub: 'Amazon Web Services' },
  { title: 'First Class Honors',                  sub: 'University of Rwanda · Top 5%' },
  { title: 'CS Club President',                   sub: '2020–2022 · Led 100+ members' },
  { title: 'IEEE Research Publication',           sub: 'Blockchain in supply chain' },
];

function ColumnHeading({ icon, children }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 36 }}>
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: 44, height: 44, background: 'var(--primary)', color: '#ffffff' }}
      >
        {icon}
      </span>
      <h4 style={{ marginBottom: 0 }}>{children}</h4>
    </div>
  );
}

function TimelineItem({ item, isWork, isLast }) {
  const isLead = item.role?.includes('CTO') || item.role?.includes('Co-Founder');

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -18 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="relative"
      style={{ paddingLeft: 34, paddingBottom: isLast ? 0 : 40 }}
    >
      {/* Rail */}
      {!isLast && (
        <span
          className="absolute"
          style={{ left: 7, top: 20, bottom: 0, width: 1, background: 'var(--border)' }}
        />
      )}
      {/* Marker — a rotated square, matching the brand's square geometry */}
      <span
        className="absolute"
        style={{
          left: 2, top: 8, width: 12, height: 12,
          transform: 'rotate(45deg)',
          background: isLead ? 'var(--primary)' : '#ffffff',
          border: `2px solid ${isLead ? 'var(--primary)' : 'var(--border)'}`,
        }}
      />

      <div className="flex flex-wrap items-center gap-2.5" style={{ marginBottom: 2 }}>
        <h4 style={{ marginBottom: 0 }}>{isWork ? item.role : item.degree}</h4>
        {item.current && (
          <span
            style={{
              background: 'rgba(40,200,64,0.1)', color: 'var(--green)',
              fontSize: 11, fontWeight: 600, padding: '3px 9px',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}
          >
            Current
          </span>
        )}
      </div>

      <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
        {isWork ? item.company : item.institution}
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14 }}>{item.period}</p>

      {isWork ? (
        <ul className="flex flex-col gap-2.5">
          {item.points.map((pt) => (
            <li key={pt} className="flex gap-3" style={{ color: 'var(--paragraph)', fontSize: 15, lineHeight: '25px' }}>
              <span className="divider-dot shrink-0" style={{ marginTop: 10 }} />
              {pt}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p style={{ color: 'var(--paragraph)', fontSize: 15 }}>{item.note}</p>
          {item.anlm && (
            <div
              style={{
                marginTop: 14, padding: '18px 20px',
                background: 'var(--sub-bg)', borderLeft: '3px solid var(--primary)',
              }}
            >
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                Grateful to ANLM
              </p>
              <p style={{ color: 'var(--paragraph)', fontSize: 14, lineHeight: '24px' }}>
                African New Life Ministries supported and mentored me throughout my primary years. Their
                community values shaped who I am — teaching me discipline, integrity and the importance of
                giving back.
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="qt-section bg-main">
      <div className="qt-container">
        <SectionHeader
          label="My Background"
          heading="Experience & education"
          sub="Four years of building — from intern to co-founder and CTO."
          align="center"
        />

        <div className="mt-16 grid lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20">
          {/* Work */}
          <div>
            <Reveal><ColumnHeading icon={<FaBriefcase size={16} />}>Work history</ColumnHeading></Reveal>
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(0.1)}>
              {EXPERIENCE.map((e, i) => (
                <TimelineItem key={e.company} item={e} isWork isLast={i === EXPERIENCE.length - 1} />
              ))}
            </motion.div>
          </div>

          {/* Education + certifications */}
          <div>
            <Reveal><ColumnHeading icon={<FaGraduationCap size={17} />}>Education</ColumnHeading></Reveal>
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(0.1)}>
              {EDUCATION.map((e, i) => (
                <TimelineItem key={e.institution} item={e} isWork={false} isLast={i === EDUCATION.length - 1} />
              ))}
            </motion.div>

            <Reveal delay={0.15}>
              <div style={{ marginTop: 52 }}>
                <ColumnHeading icon={<FaAward size={16} />}>Certifications &amp; awards</ColumnHeading>
                <div className="flex flex-col gap-4">
                  {CERTS.map((c) => (
                    <div
                      key={c.title}
                      className="qt-card qt-card-sm hover-lift"
                      style={{ padding: '18px 22px', borderLeft: '3px solid var(--primary)' }}
                    >
                      <p style={{ color: 'var(--heading)', fontWeight: 700, fontSize: 15 }}>{c.title}</p>
                      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{c.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
