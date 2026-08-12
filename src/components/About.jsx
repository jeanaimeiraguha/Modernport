import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaRocket, FaCode,
  FaUsers, FaBrain, FaCheckCircle, FaDownload,
} from 'react-icons/fa';
import { FadeUp, SectionHeader, stagger, viewportOnce } from './motion';

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
        const steps = 50;
        const inc = num / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { value: '4',  suffix: '+', label: 'Years experience', color: '#6366f1' },
  { value: '50', suffix: '+', label: 'Projects shipped',  color: '#a78bfa' },
  { value: '30', suffix: '+', label: 'Clients & partners', color: '#22d3ee' },
  { value: '1',  suffix: '',  label: 'Startup as CTO',    color: '#f59e0b' },
];

const VALUE_PROPS = [
  {
    icon: <FaRocket size={14} />, color: '#6366f1',
    title: 'Ships fast without breaking things',
    desc: 'From zero to production in weeks, not months. I\'ve built entire platforms solo and led teams to do the same.',
  },
  {
    icon: <FaBrain size={14} />, color: '#a78bfa',
    title: 'Full-stack depth across 6 domains',
    desc: 'Web, mobile, AI/ML, blockchain, DevOps, computer vision — production code in every one of these areas.',
  },
  {
    icon: <FaCode size={14} />, color: '#22d3ee',
    title: 'Code teams actually want to maintain',
    desc: 'At Igifu Meals, onboarding new engineers took half the usual time because of the code culture I built.',
  },
  {
    icon: <FaUsers size={14} />, color: '#f59e0b',
    title: 'Thinks like a founder, not just an engineer',
    desc: 'As CTO I made decisions that moved the business — not just the codebase. I understand tradeoffs and timelines.',
  },
];

const WINS = [
  { year: '2020', text: 'Automated 20+ hrs/week of manual work as a first-year intern.' },
  { year: '2021', text: 'Built an e-learning platform used by 5,000+ students daily across Rwanda.' },
  { year: '2022', text: 'Delivered a fintech dashboard processing $2M+ in transactions — zero critical bugs.' },
  { year: '2023', text: 'Co-founded Igifu Meals as CTO, grew to 30+ restaurant partners.' },
  { year: '2024', text: 'Leading engineering, mentoring 4 devs, scaling for 500+ concurrent users.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="About"
          heading={<>The engineer behind<br />the work.</>}
          sub="4 years. 50+ projects. 1 startup. Here's the full picture."
        />

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 mb-16"
          initial="hidden" whileInView="show" viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
              className="rounded-xl p-5 sm:p-6 text-center"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              whileHover={{ y: -3, borderColor: s.color }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <p className="font-display text-3xl sm:text-4xl font-bold mb-1.5" style={{ color: s.color }}>
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div className="space-y-8">
            <FadeUp delay={0.05}>
              <div className="space-y-4 leading-[1.85]" style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>
                <p>
                  I'm <strong style={{ color: 'var(--text-primary)' }}>Jean Aime Iraguha</strong> — a Full-Stack Engineer
                  and Co-Founder from <strong style={{ color: 'var(--text-primary)' }}>Kigali, Rwanda</strong> who has spent
                  the last 4 years turning hard problems into software that works in production.
                </p>
                <p>
                  I graduated <strong style={{ color: 'var(--text-primary)' }}>First Class Honors (GPA 3.8)</strong> from
                  the University of Rwanda — then immediately started shipping real systems with real users,
                  real money, and real consequences when things break.
                </p>
                <p>
                  In 2023 I co-founded <strong style={{ color: 'var(--accent)' }}>Igifu Meals</strong> and became CTO —
                  designing the architecture, hiring the team, and making the calls that took us from idea to{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>30+ restaurant partners</strong>.
                </p>
              </div>
            </FadeUp>

            {/* Availability */}
            <FadeUp delay={0.1}>
              <div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.14)' }}
              >
                <span className="glow-dot mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#4ade80' }}>Currently available for hire</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Open to senior full-stack, lead engineer, or CTO-track remote roles. Also available for
                    consulting and fractional CTO engagements. I reply within 24 hours.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.15}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: 'var(--text-muted)' }}>
                Career highlights
              </p>
              <div className="relative pl-5 space-y-5">
                <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: 'var(--border)' }} />
                {WINS.map((w, i) => (
                  <motion.div
                    key={w.year}
                    className="relative"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16,1,0.3,1] }}
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

            {/* CTAs */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="mailto:jeanaimeiraguha@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'var(--accent)' }}
                  whileHover={{ opacity: 0.88 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaEnvelope size={12} /> Let's talk
                </motion.a>
                <motion.a
                  href="/cv/Jean-Aime-Iraguha-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
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

          {/* Right */}
          <div className="space-y-4">
            <FadeUp delay={0.08}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: 'var(--text-muted)' }}>
                Why teams hire me
              </p>
            </FadeUp>

            {VALUE_PROPS.map((v, i) => (
              <FadeUp key={v.title} delay={0.1 + i * 0.07}>
                <motion.div
                  className="rounded-xl p-4 sm:p-5 flex gap-4"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  whileHover={{ borderColor: v.color }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${v.color}12`, color: v.color }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{v.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}

            {/* Key results */}
            <FadeUp delay={0.38}>
              <div className="rounded-xl p-4 sm:p-5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: 'var(--text-muted)' }}>
                  Key results
                </p>
                <div className="space-y-2.5">
                  {[
                    'First Class Honors — University of Rwanda (GPA 3.8 / 4.0)',
                    '$2M+ in fintech transactions — zero critical production bugs',
                    '5,000+ daily active students on the e-learning platform I built',
                    '500+ concurrent users at sub-200ms latency',
                    '30+ restaurant partners onboarded at Igifu Meals',
                    'Mentored 4 engineers — cut onboarding time by 50%',
                  ].map((a) => (
                    <div key={a} className="flex items-start gap-2.5">
                      <FaCheckCircle size={11} className="shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
                      <p className="text-sm leading-snug" style={{ color: 'var(--text-secondary)' }}>{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Personal */}
            <FadeUp delay={0.44}>
              <div className="rounded-xl p-4 sm:p-5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  Outside of work
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Football keeps me grounded — it taught me teamwork and composure under pressure.
                  I follow <strong style={{ color: '#6CABDD' }}>Manchester City</strong>,{' '}
                  <strong style={{ color: '#DAA520' }}>Real Madrid</strong>, and{' '}
                  <strong style={{ color: '#0346A0' }}>Chelsea</strong>.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I grew up in <strong style={{ color: 'var(--text-primary)' }}>Bugesera, Rwanda</strong>, shaped
                  by the <strong style={{ color: 'var(--accent)' }}>ANLM community</strong> at Kibenga Primary School —
                  whose mentorship gave me the integrity I bring to every team.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
