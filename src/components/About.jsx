import { motion } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaRocket, FaBrain,
  FaCode, FaUsers, FaCheck, FaDownload, FaArrowRight,
} from 'react-icons/fa';
import { SectionHeader, Reveal, viewportOnce, stagger } from './motion';

/* The two headline qualities, shown as the reference's paired feature items. */
const FEATURES = [
  {
    icon: <FaRocket size={22} />,
    title: 'Business Growth',
    desc: 'I build for outcomes, not demos — platforms that take a business from idea to paying customers.',
  },
  {
    icon: <FaBrain size={22} />,
    title: 'High End Technologies',
    desc: 'Modern stacks across web, mobile, AI, Web3 and cloud, chosen for the problem rather than the trend.',
  },
];

const PILLARS = [
  {
    icon: <FaRocket size={16} />,
    title: 'Ships fast without breaking things',
    desc: 'Zero to production in weeks, not months. I have built entire platforms solo and led teams to do the same.',
  },
  {
    icon: <FaBrain size={16} />,
    title: 'Full-stack depth across six domains',
    desc: 'Web, mobile, AI/ML, blockchain, DevOps and computer vision — production code in every one of them.',
  },
  {
    icon: <FaCode size={16} />,
    title: 'Code teams actually want to maintain',
    desc: 'At Igifu Meals, onboarding new engineers took half the usual time because of the code culture I built.',
  },
  {
    icon: <FaUsers size={16} />,
    title: 'Thinks like a founder, not just an engineer',
    desc: 'As CTO I made the calls that moved the business, not only the codebase. I understand tradeoffs and timelines.',
  },
];

const RESULTS = [
  'First Class Honors — University of Rwanda (GPA 3.8 / 4.0)',
  '$2M+ in fintech transactions with zero critical production bugs',
  '5,000+ daily active students on the e-learning platform I built',
  '500+ concurrent users served at sub-200ms latency',
  '30+ restaurant partners onboarded at Igifu Meals',
  'Mentored 4 engineers and cut onboarding time by half',
];

export default function About() {
  return (
    <section id="about" className="qt-section bg-main">
      <div className="qt-container">

        {/* ══ Intro: copy left, mission/vision right ══ */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <SectionHeader
              label="About Me"
              heading="Empowering businesses with reliable software"
            />

            <div style={{ marginTop: 30 }}>
              <p style={{ color: 'var(--paragraph)', marginBottom: 18 }}>
                I am <strong style={{ color: 'var(--heading)' }}>Jean Aime Iraguha</strong>, a full-stack
                engineer and co-founder based in <strong style={{ color: 'var(--heading)' }}>Kigali, Rwanda</strong>,
                with four years spent turning hard problems into software that holds up in production.
              </p>
              <p style={{ color: 'var(--paragraph)', marginBottom: 18 }}>
                I graduated with <strong style={{ color: 'var(--heading)' }}>First Class Honors</strong> from the
                University of Rwanda, then went straight to shipping real systems with real users, real money
                and real consequences when things break.
              </p>
              <p style={{ color: 'var(--paragraph)' }}>
                In 2023 I co-founded <strong style={{ color: 'var(--primary)' }}>Igifu Meals</strong> and took the
                CTO seat — designing the architecture, hiring the team, and making the calls that carried us from
                an idea to <strong style={{ color: 'var(--heading)' }}>30+ restaurant partners</strong>.
              </p>
            </div>

            {/* Paired feature items */}
            <motion.div
              className="grid sm:grid-cols-2 gap-7"
              style={{ marginTop: 44 }}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.12)}
            >
              {FEATURES.map((f) => (
                <motion.div
                  key={f.title}
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center"
                    style={{ width: 56, height: 56, background: 'var(--gradient-dark)', color: '#ffffff', marginBottom: 18 }}
                  >
                    {f.icon}
                  </span>
                  <h4 style={{ marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ color: 'var(--paragraph)', fontSize: 15, lineHeight: '26px' }}>{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Actions */}
            <Reveal>
              <div className="flex flex-wrap items-center gap-4" style={{ marginTop: 44 }}>
                <a href="mailto:jeanaimeiraguha@gmail.com" className="btn-one pressable">
                  <FaEnvelope size={13} /> Let&apos;s Talk
                  <span className="btn-icon"><FaArrowRight size={11} /></span>
                </a>
                <a href="/cv/Jean-Aime-Iraguha-CV.pdf" download className="btn-two pressable">
                  <FaDownload size={12} /> Download CV
                </a>
                <span className="inline-flex items-center gap-2" style={{ color: 'var(--muted)', fontSize: 14 }}>
                  <FaMapMarkerAlt size={12} style={{ color: 'var(--primary)' }} />
                  Kigali, Rwanda · Remote-first
                </span>
              </div>
            </Reveal>
          </div>

          {/* ══ Right column ══ */}
          <div className="flex flex-col gap-7">
            {/* Mission / Vision */}
            <Reveal>
              <div className="qt-card leaf-card hover-lift" style={{ padding: '36px 32px' }}>
                <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 10 }}>
                  My Mission
                </h5>
                <p style={{ color: 'var(--paragraph)', marginBottom: 28 }}>
                  To build software that solves genuine problems for the people who use it, and to leave every
                  codebase I touch easier to work in than I found it.
                </p>
                <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 10 }}>
                  My Vision
                </h5>
                <p style={{ color: 'var(--paragraph)' }}>
                  To help put African engineering teams at the centre of the products the world depends on —
                  where technology and people unite to shape the future.
                </p>
              </div>
            </Reveal>

            {/* Availability */}
            <Reveal delay={0.06}>
              <div
                className="flex items-start gap-4"
                style={{ background: 'var(--sub-bg)', border: '1px solid var(--border-soft)', padding: '24px 26px' }}
              >
                <span className="glow-dot" style={{ marginTop: 10 }} />
                <div>
                  <h4 style={{ marginBottom: 6 }}>Currently available for hire</h4>
                  <p style={{ color: 'var(--paragraph)', fontSize: 15, lineHeight: '26px' }}>
                    Open to senior full-stack, lead engineer and CTO-track remote roles, plus consulting and
                    fractional CTO engagements. I reply within 24 hours.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Key results */}
            <Reveal delay={0.1}>
              <div className="qt-card" style={{ padding: '32px 30px' }}>
                <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 20 }}>
                  Key Results
                </h5>
                <ul className="flex flex-col gap-3">
                  {RESULTS.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ width: 20, height: 20, marginTop: 4, background: 'var(--primary)', color: '#ffffff' }}
                      >
                        <FaCheck size={9} />
                      </span>
                      <span style={{ color: 'var(--paragraph)', fontSize: 15, lineHeight: '25px' }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══ Why teams hire me ══ */}
        <div style={{ marginTop: 110 }}>
          <SectionHeader label="Why Teams Hire Me" heading="What I bring to a team" align="center" />

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.09)}
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="qt-card qt-card-sm hover-lift edge-wipe flex flex-col"
                style={{ padding: '32px 26px' }}
              >
                <span className="qt-icon-tile-soft" style={{ marginBottom: 20 }}>{p.icon}</span>
                <span
                  className="block"
                  style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}
                >
                  0{i + 1}
                </span>
                <h4 style={{ marginBottom: 10, fontSize: 17, lineHeight: '26px' }}>{p.title}</h4>
                <p style={{ color: 'var(--paragraph)', fontSize: 14.5, lineHeight: '25px' }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ Outside of work ══ */}
        <Reveal delay={0.08}>
          <div
            className="grid md:grid-cols-2 gap-10 md:gap-16"
            style={{ marginTop: 90, background: 'var(--sub-bg)', padding: '48px 44px' }}
          >
            <div>
              <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 14 }}>
                Outside Of Work
              </h5>
              <p style={{ color: 'var(--paragraph)' }}>
                Football keeps me grounded — it taught me teamwork and composure under pressure. I follow{' '}
                <strong style={{ color: 'var(--heading)' }}>Manchester City</strong>,{' '}
                <strong style={{ color: 'var(--heading)' }}>Real Madrid</strong> and{' '}
                <strong style={{ color: 'var(--heading)' }}>Chelsea</strong>.
              </p>
            </div>
            <div>
              <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 14 }}>
                Where I Come From
              </h5>
              <p style={{ color: 'var(--paragraph)' }}>
                I grew up in <strong style={{ color: 'var(--heading)' }}>Bugesera, Rwanda</strong>, shaped by the{' '}
                <strong style={{ color: 'var(--primary)' }}>ANLM community</strong> at Kibenga Primary School, whose
                mentorship gave me the integrity I bring to every team.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
