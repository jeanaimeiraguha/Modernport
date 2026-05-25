import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaRocket, FaCode,
  FaUsers, FaBrain, FaCheckCircle, FaDownload,
} from 'react-icons/fa';
import { FadeUp, SectionHeader, stagger, viewportOnce } from './motion';

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1600;
        const steps = 40;
        const inc = num / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Stats ── */
const STATS = [
  { value: '4',  suffix: '+', label: 'Years of production experience', color: '#6366f1' },
  { value: '50', suffix: '+', label: 'Projects shipped end-to-end',    color: '#a78bfa' },
  { value: '30', suffix: '+', label: 'Happy clients & partners',       color: '#34d399' },
  { value: '1',  suffix: '',  label: 'Startup co-founded as CTO',      color: '#f59e0b' },
];

/* ── Why hire me cards ── */
const VALUE_PROPS = [
  {
    icon: <FaRocket size={18} />,
    color: '#6366f1',
    title: 'I ship fast — without breaking things',
    desc: 'From zero to production in weeks, not months. I\'ve built entire platforms solo and led teams to do the same. Speed and stability aren\'t opposites — I\'ve proven that.',
  },
  {
    icon: <FaBrain size={18} />,
    color: '#a78bfa',
    title: 'Full-stack depth across 6 domains',
    desc: 'Web, mobile, AI/ML, blockchain, DevOps, computer vision. I don\'t just know the buzzwords — I\'ve shipped production code in every one of these areas.',
  },
  {
    icon: <FaCode size={18} />,
    color: '#34d399',
    title: 'Code that teams actually want to maintain',
    desc: 'At Igifu Meals, onboarding new engineers took half the usual time because of the code culture I built. Clean architecture, thorough reviews, zero cowboy commits.',
  },
  {
    icon: <FaUsers size={18} />,
    color: '#f59e0b',
    title: 'I think like a founder, not just an engineer',
    desc: 'As CTO I made decisions that moved the business — not just the codebase. I understand tradeoffs, timelines, and what actually matters to users and stakeholders.',
  },
];

/* ── Key wins timeline ── */
const WINS = [
  { year: '2020', text: 'Automated 20+ hrs/week of manual work as a first-year intern — outperformed senior devs.' },
  { year: '2021', text: 'Built an e-learning platform now used by 5,000+ students daily across Rwanda.' },
  { year: '2022', text: 'Delivered a fintech dashboard processing $2M+ in transactions — zero critical bugs in production.' },
  { year: '2023', text: 'Co-founded Igifu Meals, architected the full stack, grew to 30+ restaurant partners.' },
  { year: '2024', text: 'Leading engineering, mentoring 4 devs, and scaling infrastructure for 500+ concurrent users.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32" style={{ background: 'var(--bg-surface)', fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6">

        <SectionHeader
          label="About me"
          heading={<>Why engineers like me<br />get hired fast.</>}
          sub="4 years. 50+ projects. 1 startup. Here's the full picture."
        />

        {/* ── Animated stats row ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 mb-16"
          initial="hidden" whileInView="show" viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
              className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              whileHover={{ y: -4, borderColor: s.color, boxShadow: `0 12px 32px ${s.color}18` }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              <div className="absolute inset-0 opacity-[0.03] rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}, transparent 70%)` }} />
              <p className="font-display text-4xl sm:text-5xl font-bold mb-2" style={{ color: s.color }}>
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left column ── */}
          <div className="space-y-8">

            {/* Bio — punchy, recruiter-first */}
            <FadeUp delay={0.05}>
              <div className="space-y-4 text-[1.0625rem] leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  I'm <strong style={{ color: 'var(--text-primary)' }}>Jean Aime IRAGUHA</strong> — a Full-Stack Engineer
                  and Co-Founder from <strong style={{ color: 'var(--text-primary)' }}>Kigali, Rwanda</strong> who has spent
                  the last 4 years turning hard problems into software that actually works in production.
                </p>
                <p>
                  I graduated <strong style={{ color: 'var(--text-primary)' }}>First Class Honors (GPA 3.8)</strong> from
                  the University of Rwanda — then immediately started shipping. Not side projects. Real systems
                  with real users, real money, and real consequences when things break.
                </p>
                <p>
                  In 2023 I co-founded <strong style={{ color: 'var(--accent)' }}>Igifu Meals</strong> and became CTO —
                  designing the architecture, hiring the team, and making the technical calls that took us from
                  idea to <strong style={{ color: 'var(--text-primary)' }}>30+ restaurant partners</strong>. That's
                  where I learned that the best engineers don't just write code — they{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>own outcomes</strong>.
                </p>
              </div>
            </FadeUp>

            {/* Availability banner */}
            <FadeUp delay={0.1}>
              <motion.div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}
                whileHover={{ borderColor: 'rgba(52,211,153,0.4)' }}
              >
                <span className="glow-dot mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: '#34d399' }}>Currently available for hire</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Open to senior full-stack, lead engineer, or CTO-track remote roles. Also available for
                    consulting and fractional CTO engagements. I reply within 24 hours.
                  </p>
                </div>
              </motion.div>
            </FadeUp>

            {/* Key wins timeline */}
            <FadeUp delay={0.15}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] mb-5" style={{ color: 'var(--text-muted)' }}>
                📈 Career highlights
              </p>
              <div className="relative pl-5 space-y-5">
                <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: 'var(--border)' }} />
                {WINS.map((w, i) => (
                  <motion.div
                    key={w.year}
                    className="relative"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16,1,0.3,1] }}
                  >
                    <span
                      className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--accent)' }}
                    />
                    <span className="text-[11px] font-bold tracking-widest" style={{ color: 'var(--accent)' }}>{w.year}</span>
                    <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{w.text}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Contact + CTA */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="mailto:jeanaimeiraguha@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'var(--accent)' }}
                  whileHover={{ scale: 1.04, background: '#818cf8' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaEnvelope size={12} /> Let's talk
                </motion.a>
                <motion.a
                  href="/cv"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  whileHover={{ scale: 1.04, borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaDownload size={11} /> Download CV
                </motion.a>
                <span className="inline-flex items-center gap-2 text-sm self-center" style={{ color: 'var(--text-muted)' }}>
                  <FaMapMarkerAlt size={11} style={{ color: 'var(--accent)' }} />
                  Kigali, Rwanda · Remote-first
                </span>
              </div>
            </FadeUp>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Why hire me cards */}
            <FadeUp delay={0.08}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] mb-5" style={{ color: 'var(--text-muted)' }}>
                💡 Why teams hire me
              </p>
            </FadeUp>

            {VALUE_PROPS.map((v, i) => (
              <FadeUp key={v.title} delay={0.1 + i * 0.07}>
                <motion.div
                  className="rounded-xl p-5 flex gap-4"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  whileHover={{ borderColor: v.color, boxShadow: `0 8px 28px ${v.color}14`, x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${v.color}18`, color: v.color }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{v.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}

            {/* Achievements checklist */}
            <FadeUp delay={0.35}>
              <div className="rounded-xl p-5 mt-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--text-muted)' }}>
                  🏆 Proof points
                </p>
                <div className="space-y-2.5">
                  {[
                    'First Class Honors — University of Rwanda (GPA 3.8 / 4.0)',
                    '$2M+ in fintech transactions — zero critical production bugs',
                    '5,000+ daily active students on the e-learning platform I built',
                    '500+ concurrent users handled at sub-200ms latency',
                    '30+ restaurant partners onboarded at Igifu Meals',
                    '20+ hours/week automated as a first-year intern',
                    'Mentored 4 engineers — cut onboarding time by 50%',
                  ].map((a) => (
                    <div key={a} className="flex items-start gap-2.5">
                      <FaCheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                      <p className="text-sm leading-snug" style={{ color: 'var(--text-secondary)' }}>{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Football / personal */}
            <FadeUp delay={0.42}>
              <div className="rounded-xl p-5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  ⚽ Beyond the screen
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Football is my reset button — it taught me teamwork, composure under pressure, and
                  that the best results come from trusting your teammates. I follow{' '}
                  <strong style={{ color: '#6CABDD' }}>Manchester City</strong>,{' '}
                  <strong style={{ color: '#DAA520' }}>Real Madrid</strong>, and{' '}
                  <strong style={{ color: '#0346A0' }}>Chelsea</strong>.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I grew up in <strong style={{ color: 'var(--text-primary)' }}>Bugesera, Rwanda</strong> — shaped
                  by the <strong style={{ color: 'var(--accent)' }}>ANLM community</strong> at Kibenga Primary School,
                  whose mentorship gave me the integrity and resilience I bring to every team I join.
                </p>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
