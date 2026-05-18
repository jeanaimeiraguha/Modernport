import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaCode, FaLightbulb, FaUsers } from 'react-icons/fa';
import { FadeUp, SectionHeader, stagger, viewportOnce } from './motion';
import { STATS } from './data';

const TRAITS = [
  { icon: <FaCode size={14} />,     label: 'Clean code advocate',     desc: 'Readable, tested, maintainable — always.' },
  { icon: <FaLightbulb size={14} />, label: 'AI & Robotics builder',    desc: 'Computer vision, ML models, and autonomous systems.' },
  { icon: <FaUsers size={14} />,    label: 'Team builder & CTO',       desc: 'Led a 4-person engineering team at Igifu Meals.' },
];

export default function About() {
  return (
    <section id="about" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <div>
            <SectionHeader
              label="About me"
              heading={<>Engineer. Builder.<br />Co-Founder.</>}
            />

            <FadeUp delay={0.1}>
              {/* Bio */}
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.85] tracking-[-0.01em]" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  I'm Jean Aime — a full-stack engineer from{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Bugesera, Kigali, Rwanda</strong>{' '}
                  with 4+ years of experience building production software across fintech, edtech,
                  and food-tech. I studied Computer Science at the University of Rwanda (First Class
                  Honors, GPA 3.8) and have been shipping real products ever since.
                </p>
                <p>
                  In 2023 I co-founded{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Igifu Meals</strong> and took on
                  the CTO role — designing the architecture, hiring the team, and leading engineering
                  from day one. That experience taught me how to balance speed with stability, and
                  how to make technical decisions that actually move a business forward.
                </p>
                <p>
                  I care deeply about the craft: readable code, thoughtful APIs, and interfaces that
                  feel effortless. I'm at my best when I'm close to the problem — talking to users,
                  understanding the domain, then building something that genuinely fits.
                </p>
              </div>

              {/* Trait cards */}
              <div className="mt-8 space-y-3">
                {TRAITS.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  >
                    <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>{t.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.label}</p>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Hobbies ── */}
              <div className="mt-8 rounded-xl p-5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--text-muted)' }}>
                  ⚽ Beyond the Code
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  When I'm not architecting systems, you'll find me on the pitch or glued to a match.
                  Football is my reset button — it taught me teamwork, pressure, and never giving up.
                </p>
                {/* Favourite clubs */}
                <div className="flex gap-4">
                  {/* Manchester City */}
                  <div className="flex-1 rounded-xl overflow-hidden"
                    style={{ background: 'rgba(108,171,221,0.08)', border: '1.5px solid rgba(108,171,221,0.3)' }}>
                    <img src="/city.jpg" alt="Manchester City" className="w-full h-36 object-cover" />
                    <div className="text-center py-3">
                      <p className="text-xs font-bold" style={{ color: '#6CABDD' }}>Manchester City</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>⭐ Favourite Club</p>
                    </div>
                  </div>

                  {/* Real Madrid */}
                  <div className="flex-1 rounded-xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(218,165,32,0.35)' }}>
                    <img src="/madrid.jpg" alt="Real Madrid" className="w-full h-36 object-cover" />
                    <div className="text-center py-3">
                      <p className="text-xs font-bold" style={{ color: '#DAA520' }}>Real Madrid</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>👑 Los Blancos</p>
                    </div>
                  </div>

                  {/* Chelsea */}
                  <div className="flex-1 rounded-xl overflow-hidden"
                    style={{ background: 'rgba(3,70,148,0.08)', border: '1.5px solid rgba(3,70,148,0.4)' }}>
                    <img src="/chelsea.jpg" alt="Chelsea" className="w-full h-36 object-cover" />
                    <div className="text-center py-3">
                      <p className="text-xs font-bold" style={{ color: '#0346A0' }}>Chelsea FC</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>💙 The Blues</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roots & Values — ANLM tribute */}
              <div
                className="mt-8 rounded-xl p-5"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  ✦ Roots &amp; Values
                </p>
                <p className="text-[1.0625rem] leading-[1.85] tracking-[-0.01em]" style={{ color: 'var(--text-secondary)' }}>
                  I grew up in{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Bugesera, Kigali, Rwanda</strong> — a
                  place that taught me resilience and community long before I wrote a single line of
                  code. My foundation was laid at{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Kibenga Primary School</strong>, where
                  I was fortunate to be part of the{' '}
                  <strong style={{ color: 'var(--accent)' }}>
                    ANLM (African New Life Ministries)
                  </strong>{' '}
                  community. Their mentorship, spiritual guidance, and unwavering support during my
                  formative years shaped not just my character, but my entire approach to leadership
                  and life. I am deeply grateful — ANLM showed me that integrity, service, and faith
                  are the true foundations of any meaningful work.
                </p>
              </div>

              {/* Contact links */}
              <div className="mt-8 flex flex-wrap gap-5">
                <a
                  href="mailto:jeanaimeiraguha@gmail.com"
                  className="inline-flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <FaEnvelope size={12} style={{ color: 'var(--accent)' }} />
                  jeanaimeiraguha@gmail.com
                </a>
                <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <FaMapMarkerAlt size={12} style={{ color: 'var(--accent)' }} />
                  Bugesera, Kigali, Rwanda
                </span>
              </div>
            </FadeUp>
          </div>

          {/* ── Right ── */}
          <FadeUp delay={0.18}>
            {/* Stats 2×2 */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.07)}
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16,1,0.3,1] } },
                  }}
                  className="rounded-xl p-6 text-center"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <p className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {s.value}
                  </p>
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Availability */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="glow-dot" />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Currently available
                </p>
              </div>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                Open to senior full-stack, lead engineer, or CTO-track remote roles.
                Also available for consulting and fractional CTO engagements.
              </p>
            </div>

            {/* Achievements */}
            <div className="mt-5 space-y-2">
              {[
                '🏆 First Class Honors — University of Rwanda (GPA 3.8/4.0)',
                '🚀 Co-founded Igifu Meals — 30+ restaurant partners',
                '📜 AWS Certified Developer – Associate',
                '🎓 Mentored 20+ junior developers',
                '🙏 Shaped by ANLM — Kibenga Primary School, Bugesera',
              ].map((a) => (
                <p key={a} className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {a}
                </p>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
