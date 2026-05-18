import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION } from './components/data';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin,
  FaArrowLeft, FaDownload, FaCode, FaBriefcase,
  FaGraduationCap, FaAward, FaGlobe, FaStar, FaWhatsapp,
} from 'react-icons/fa';

const SKILLS = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Node.js / APIs',  level: 92 },
  { name: 'TypeScript',      level: 88 },
  { name: 'PostgreSQL',      level: 85 },
  { name: 'Python / AI·ML',  level: 80 },
  { name: 'Docker / AWS',    level: 82 },
  { name: 'React Native',    level: 78 },
  { name: 'Solidity / Web3', level: 70 },
];

const TAGS = [
  'GraphQL','Redis','TensorFlow','OpenCV','Tailwind CSS',
  'GitHub Actions','Nginx','Terraform','Hardhat','YOLO',
  'Framer Motion','Prisma','Socket.io','MongoDB',
];

const CERTS = [
  { title: 'AWS Certified Developer', sub: 'Associate · Amazon Web Services', icon: '☁️' },
  { title: 'Full-Stack Certification', sub: 'freeCodeCamp · 300+ hours', icon: '💻' },
  { title: 'First Class Honors', sub: 'University of Rwanda · Top 5%', icon: '🏆' },
  { title: 'CS Club President', sub: '2020–2022 · Led 100+ members', icon: '👥' },
];

const STATS = [
  { value: '4+',  label: 'Years' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '3.8', label: 'GPA' },
];

const LANGS = [
  { lang: 'Kinyarwanda', level: 'Native',        pct: 100 },
  { lang: 'English',     level: 'Fluent',         pct: 95  },
  { lang: 'French',      level: 'Conversational', pct: 60  },
];

const ACHIEVEMENTS = [
  { icon: '🏆', text: 'First Class Honors — GPA 3.8/4.0, top 5% of cohort' },
  { icon: '🚀', text: 'Scaled Igifu Meals to 30+ restaurant partners as CTO' },
  { icon: '⚡', text: 'Built real-time order engine — sub-200ms at 500+ concurrent sessions' },
  { icon: '💰', text: 'Delivered AI/blockchain features generating $500K+ in new contracts' },
  { icon: '📚', text: 'E-learning platform serving 5,000+ students across East Africa' },
  { icon: '🎓', text: 'Mentored 20+ junior developers into production-ready engineers' },
];

/* ── Avatar SVG ── */
function AvatarSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 112 112" fill="none">
      <circle cx="56" cy="56" r="56" fill="rgba(99,102,241,0.15)" />
      <ellipse cx="56" cy="95" rx="28" ry="18" fill="#6366f1" opacity="0.9" />
      <rect x="50" y="72" width="12" height="10" rx="4" fill="#f5c5a3" />
      <circle cx="56" cy="58" r="20" fill="#f5c5a3" />
      <path d="M36 54 Q36 34 56 34 Q76 34 76 54 Q72 44 56 44 Q40 44 36 54Z" fill="#1a1a2e" />
      <circle cx="49" cy="56" r="2.5" fill="#1a1a2e" />
      <circle cx="63" cy="56" r="2.5" fill="#1a1a2e" />
      <circle cx="50" cy="55" r="0.8" fill="white" />
      <circle cx="64" cy="55" r="0.8" fill="white" />
      <path d="M49 63 Q56 69 63 63" stroke="#c0845a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M44 78 L56 84 L68 78 L64 72 L56 76 L48 72Z" fill="#4f46e5" />
    </svg>
  );
}

function SkillBar({ name, level, animated }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[0.72rem] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{name}</span>
        <span className="text-[0.68rem]" style={{ color: 'rgba(255,255,255,0.35)' }}>{level}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function LangBar({ lang, level, pct, animated }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[0.72rem] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{lang}</span>
        <span className="text-[0.68rem] px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa' }}>{level}</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#818cf8,#c4b5fd)' }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${pct}%` : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SideSection({ title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <p className="text-[9px] font-bold tracking-[0.22em] uppercase px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{title}</p>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
      {children}
    </div>
  );
}

function MainSection({ icon, title, children }) {
  return (
    <div className="mb-8 print:mb-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <span style={{ color: 'var(--accent)' }}>{icon}</span>
        </div>
        <h2 className="font-display text-sm font-bold tracking-[0.1em] uppercase" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>
      {children}
    </div>
  );
}

export default function CVPage() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* ── Toolbar ── */}
      <div
        className="print:hidden sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(10,10,15,0.9)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(16px)' }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <FaArrowLeft size={11} /> Back to portfolio
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to work
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
          >
            <FaDownload size={11} /> Download PDF
          </button>
        </div>
      </div>

      {/* ── CV Shell ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto my-8 print:my-0 rounded-2xl print:rounded-none overflow-hidden"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
      >
        <div className="flex min-h-[1100px] print:min-h-0">

          {/* ════ SIDEBAR ════ */}
          <aside
            className="w-[240px] shrink-0 flex flex-col print:w-48"
            style={{ background: 'linear-gradient(175deg,#0d0d22 0%,#0a0a1a 50%,#0f0f28 100%)' }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a78bfa,#6366f1)' }} />

            {/* Avatar + name */}
            <div className="px-6 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 mb-4"
              >
                {/* Glow ring */}
                <div className="absolute inset-[-3px] rounded-full" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', padding: 2, borderRadius: '9999px' }}>
                  <div className="w-full h-full rounded-full overflow-hidden" style={{ background: '#0d0d22' }}>
                    <img src="/aime picture.jpeg" alt="Jean Aime Iraguha" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ background: '#6366f1' }} />
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full"
                  style={{ background: '#4ade80', border: '2px solid #0d0d22', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
              </motion.div>

              <h1 className="font-display text-base font-bold leading-tight" style={{ color: '#fff' }}>
                Jean Aime<br />
                <span style={{ color: '#818cf8' }}>IRAGUHA</span>
              </h1>
              <p className="text-[0.7rem] mt-1.5 font-semibold tracking-wide" style={{ color: 'rgba(129,140,248,0.7)' }}>
                Full-Stack Engineer · CTO
              </p>

              {/* Availability badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
                style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-semibold" style={{ color: '#4ade80' }}>Available for hire</span>
              </div>
            </div>

            {/* Contact */}
            <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SideSection title="Contact">
                <div className="space-y-2">
                  {[
                    { icon: <FaEnvelope size={9} />, text: 'jeanaimeiraguha@gmail.com' },
                    { icon: <FaPhone size={9} />,    text: '+250 793 411 594' },
                    { icon: <FaWhatsapp size={9} />, text: 'wa.me/250793411594' },
                    { icon: <FaMapMarkerAlt size={9} />, text: 'Bugesera, Kigali, Rwanda' },
                    { icon: <FaLinkedin size={9} />, text: 'iraguha-jean-aime' },
                    { icon: <FaGlobe size={9} />,    text: 'igifumeals.com' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: '#6366f1' }}>{icon}</span>
                      <span className="text-[0.68rem] leading-snug break-all" style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </SideSection>
            </div>

            {/* Stats */}
            <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SideSection title="At a Glance">
                <div className="grid grid-cols-2 gap-2">
                  {STATS.map((s) => (
                    <div key={s.label} className="rounded-lg p-2.5 text-center"
                      style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                      <p className="font-display text-lg font-black" style={{ color: '#a78bfa' }}>{s.value}</p>
                      <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </SideSection>
            </div>

            {/* Skills */}
            <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SideSection title="Core Skills">
                {SKILLS.map((s) => <SkillBar key={s.name} {...s} animated={animated} />)}
              </SideSection>
            </div>

            {/* Tech tags */}
            <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SideSection title="Also Proficient In">
                <div className="flex flex-wrap gap-1">
                  {TAGS.map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </SideSection>
            </div>

            {/* Languages */}
            <div className="px-5 py-5">
              <SideSection title="Languages">
                {LANGS.map((l) => <LangBar key={l.lang} {...l} animated={animated} />)}
              </SideSection>
            </div>

            {/* Bottom accent */}
            <div className="mt-auto h-1 w-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a78bfa,#6366f1)' }} />
          </aside>

          {/* ════ MAIN ════ */}
          <main className="flex-1 px-9 py-8 print:px-6 print:py-5 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>

            {/* Header banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative rounded-xl p-5 mb-8 overflow-hidden"
              style={{ background: 'linear-gradient(120deg,rgba(99,102,241,0.1) 0%,rgba(167,139,250,0.05) 100%)', border: '1px solid rgba(99,102,241,0.18)' }}
            >
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle,#6366f1,transparent)' }} />
              <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full opacity-5"
                style={{ background: 'radial-gradient(circle,#a78bfa,transparent)' }} />
              <p className="text-[0.875rem] leading-[1.85] relative z-10" style={{ color: 'var(--text-secondary)' }}>
                A builder at heart —{' '}
                <strong style={{ color: 'var(--text-primary)' }}>not just an engineer who writes code, but one who ships products that matter.</strong>
                {' '}With <strong style={{ color: 'var(--text-primary)' }}>4+ years</strong> of hands-on experience across fintech, edtech, and food-tech,
                I've gone from writing my first API to{' '}
                <strong style={{ color: 'var(--accent)' }}>co-founding and leading the entire engineering of Igifu Meals as CTO</strong> —
                architecting the stack from zero, assembling the team, and scaling to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>30+ restaurant partners</strong> in production.
                Academically, I graduated with{' '}
                <strong style={{ color: 'var(--accent)' }}>First Class Honors, GPA 3.8/4.0</strong> — top 5% of my cohort at the University of Rwanda.
                I don't just build features — I build systems that{' '}
                <strong style={{ color: 'var(--text-primary)' }}>outlast deadlines, scale under pressure, and make businesses grow.</strong>
              </p>
            </motion.div>

            {/* Experience */}
            <MainSection icon={<FaBriefcase size={12} />} title="Work Experience">
              <div className="relative">
                <div className="absolute left-[6px] top-2 bottom-2 w-px" style={{ background: 'var(--border)' }} />
                <div className="space-y-6">
                  {EXPERIENCE.map((e) => (
                    <motion.div
                      key={e.role}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pl-6 relative"
                    >
                      <div
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2"
                        style={{
                          borderColor: e.current ? 'var(--accent)' : 'var(--border)',
                          background: e.current ? 'rgba(99,102,241,0.25)' : 'var(--bg-surface)',
                          boxShadow: e.current ? '0 0 8px rgba(99,102,241,0.4)' : 'none',
                        }}
                      />
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{e.role}</p>
                          <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>{e.company}</p>
                        </div>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full shrink-0 font-medium"
                          style={{
                            background: e.current ? 'rgba(99,102,241,0.1)' : 'var(--bg-elevated)',
                            color: e.current ? 'var(--accent)' : 'var(--text-muted)',
                            border: `1px solid ${e.current ? 'rgba(99,102,241,0.25)' : 'var(--border)'}`,
                          }}>
                          {e.period}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {e.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-[0.78rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)', opacity: 0.7 }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MainSection>

            {/* Education */}
            <MainSection icon={<FaGraduationCap size={12} />} title="Education">
              <div className="space-y-3">
                {EDUCATION.map((e) => (
                  <div key={e.degree} className="flex items-start justify-between gap-4 rounded-xl px-4 py-3"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{e.degree}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>{e.institution}</p>
                      {e.note && <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>{e.note}</p>}
                    </div>
                    <span className="text-[10px] shrink-0 mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>{e.period}</span>
                  </div>
                ))}
              </div>
            </MainSection>

            {/* Certifications */}
            <MainSection icon={<FaAward size={12} />} title="Certifications & Awards">
              <div className="grid sm:grid-cols-2 gap-2.5">
                {CERTS.map((c) => (
                  <div key={c.title} className="flex items-start gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.12)' }}>
                    <span className="text-base shrink-0">{c.icon}</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{c.title}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MainSection>

            {/* Key achievements */}
            <MainSection icon={<FaCode size={12} />} title="Key Achievements">
              <div className="grid sm:grid-cols-2 gap-2">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.text} className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <span className="text-sm shrink-0">{a.icon}</span>
                    <p className="text-[0.76rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a.text}</p>
                  </div>
                ))}
              </div>
            </MainSection>

          </main>
        </div>
      </motion.div>

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
