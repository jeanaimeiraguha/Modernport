import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION } from './components/data';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin,
  FaArrowLeft, FaPrint, FaCode, FaBriefcase,
  FaGraduationCap, FaAward, FaGlobe, FaStar,
} from 'react-icons/fa';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SKILLS = [
  { name: 'React / Next.js',  level: 95 },
  { name: 'Node.js / APIs',   level: 92 },
  { name: 'TypeScript',       level: 88 },
  { name: 'PostgreSQL',       level: 85 },
  { name: 'Python / AI/ML',   level: 80 },
  { name: 'Docker / AWS',     level: 82 },
  { name: 'React Native',     level: 78 },
  { name: 'Solidity / Web3',  level: 70 },
];

const TAGS = [
  'GraphQL','Redis','TensorFlow','OpenCV','Tailwind CSS',
  'GitHub Actions','Nginx','Terraform','Hardhat','YOLO',
];

const CERTS = [
  { title: 'AWS Certified Developer', sub: 'Associate · Amazon Web Services' },
  { title: 'Full-Stack Certification', sub: 'freeCodeCamp · 300+ hours' },
];

const STATS = [
  { value: '4+',  label: 'Years' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '3.8', label: 'GPA' },
];

const LANGS = [
  { lang: 'Kinyarwanda', level: 'Native' },
  { lang: 'English',     level: 'Fluent' },
  { lang: 'French',      level: 'Conversational' },
];

/* ── Sub-components ───────────────────────────────────────────────────────── */
function SideLabel({ icon, children }) {
  return (
    <p className="flex items-start gap-2 text-[0.8rem] leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>
      <span className="mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }}>{icon}</span>
      {children}
    </p>
  );
}

function SideSection({ title, children }) {
  return (
    <div className="mb-7">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function SkillBar({ name, level, animate }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[0.75rem]" style={{ color: 'rgba(255,255,255,0.75)' }}>{name}</span>
        <span className="text-[0.7rem]" style={{ color: 'rgba(255,255,255,0.35)' }}>{level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function MainSection({ icon, title, children }) {
  return (
    <div className="mb-8 print:mb-5">
      <div className="flex items-center gap-2 mb-5">
        <span style={{ color: 'var(--accent)' }}>{icon}</span>
        <h2 className="font-display text-sm font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <div className="flex-1 h-px ml-1" style={{ background: 'var(--border)' }} />
      </div>
      {children}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function CVPage() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* ── Toolbar ── */}
      <div
        className="print:hidden flex items-center justify-between px-6 py-3.5 sticky top-0 z-50"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <FaArrowLeft size={11} /> Back to portfolio
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
            Open to work
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
          >
            <FaPrint size={11} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── CV Shell ── */}
      <div className="max-w-5xl mx-auto my-8 print:my-0 shadow-2xl print:shadow-none overflow-hidden rounded-2xl print:rounded-none">
        <div className="flex min-h-screen print:min-h-0" style={{ background: 'var(--bg-surface)' }}>

          {/* ════ SIDEBAR ════ */}
          <aside
            className="w-64 shrink-0 flex flex-col print:w-52"
            style={{ background: 'linear-gradient(160deg,#0f0f2a 0%,#0a0a1f 60%,#0d0d22 100%)' }}
          >
            {/* Avatar / Name block */}
            <div className="px-6 pt-10 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Avatar ring */}
              <div className="relative w-20 h-20 mb-5">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', padding: 2 }}
                >
                  <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ background: '#0f0f2a' }}
                >
                  <img src="/aime picture.jpeg" alt="Jean Aime Iraguha" className="w-full h-full object-cover" />
                </div>
                </div>
                {/* glow */}
                <div className="absolute inset-0 rounded-full blur-md opacity-40" style={{ background: 'radial-gradient(circle,#6366f1,transparent)' }} />
              </div>

              <h1 className="font-display text-lg font-bold leading-tight" style={{ color: '#fff' }}>
                Jean Aime<br />Iraguha
              </h1>
              <p className="text-[0.75rem] mt-1 font-medium" style={{ color: '#818cf8' }}>
                Full-Stack Engineer &amp; CTO
              </p>
            </div>

            {/* Contact */}
            <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SideSection title="Contact">
                <div className="space-y-2.5">
                  <SideLabel icon={<FaEnvelope size={10} />}>jeanaimeiraguha@gmail.com</SideLabel>
                  <SideLabel icon={<FaPhone size={10} />}>+250 793 411 594</SideLabel>
                  <SideLabel icon={<FaMapMarkerAlt size={10} />}>Bugesera, Kigali, Rwanda</SideLabel>
                  <SideLabel icon={<FaLinkedin size={10} />}>iraguha-jean-aime</SideLabel>
                  <SideLabel icon={<FaGlobe size={10} />}>igifumeals.com</SideLabel>
                </div>
              </SideSection>
            </div>

            {/* Stats */}
            <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SideSection title="At a glance">
                <div className="grid grid-cols-2 gap-2">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg p-3 text-center"
                      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}
                    >
                      <p className="font-display text-xl font-bold" style={{ color: '#a78bfa' }}>{s.value}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </SideSection>
            </div>

            {/* Skills */}
            <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SideSection title="Core Skills">
                {SKILLS.map((s) => (
                  <SkillBar key={s.name} {...s} animate={animated} />
                ))}
              </SideSection>
            </div>

            {/* Tech tags */}
            <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SideSection title="Also proficient in">
                <div className="flex flex-wrap gap-1.5">
                  {TAGS.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SideSection>
            </div>

            {/* Languages */}
            <div className="px-6 py-6">
              <SideSection title="Languages">
                <div className="space-y-2">
                  {LANGS.map((l) => (
                    <div key={l.lang} className="flex justify-between items-center">
                      <span className="text-[0.78rem]" style={{ color: 'rgba(255,255,255,0.7)' }}>{l.lang}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}
                      >
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </SideSection>
            </div>
          </aside>

          {/* ════ MAIN ════ */}
          <main className="flex-1 px-10 py-10 print:px-7 print:py-6 overflow-hidden">

            {/* Header banner */}
            <div
              className="rounded-xl p-6 mb-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(120deg,rgba(99,102,241,0.12) 0%,rgba(167,139,250,0.06) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              {/* decorative circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#6366f1,transparent)' }} />
              <p className="text-[0.9375rem] leading-[1.8] tracking-[-0.01em]" style={{ color: 'var(--text-secondary)' }}>
                Full-stack engineer with <strong style={{ color: 'var(--text-primary)' }}>4+ years</strong> building production software across fintech, edtech, and food-tech.
                Co-Founder &amp; CTO of <strong style={{ color: 'var(--accent)' }}>Igifu Meals</strong> — designed the architecture, hired the team, and led engineering from day one.
                First Class Honors, GPA <strong style={{ color: 'var(--text-primary)' }}>3.8/4.0</strong> — University of Rwanda.
              </p>
            </div>

            {/* Experience */}
            <MainSection icon={<FaBriefcase size={13} />} title="Work Experience">
              <div className="relative">
                {/* timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--border)' }} />

                <div className="space-y-7">
                  {EXPERIENCE.map((e, i) => (
                    <div key={e.role} className="pl-7 relative">
                      {/* dot */}
                      <div
                        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: e.current ? 'var(--accent)' : 'var(--border)',
                          background: e.current ? 'rgba(99,102,241,0.2)' : 'var(--bg-surface)',
                        }}
                      >
                        {e.current && (
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{e.role}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{e.company}</p>
                        </div>
                        <span
                          className="text-[11px] px-2.5 py-0.5 rounded-full shrink-0"
                          style={{
                            background: e.current ? 'rgba(99,102,241,0.1)' : 'var(--bg-elevated)',
                            color: e.current ? 'var(--accent)' : 'var(--text-muted)',
                            border: `1px solid ${e.current ? 'rgba(99,102,241,0.2)' : 'var(--border)'}`,
                          }}
                        >
                          {e.period}
                        </span>
                      </div>

                      <ul className="mt-2.5 space-y-1.5">
                        {e.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)', opacity: 0.6 }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </MainSection>

            {/* Education */}
            <MainSection icon={<FaGraduationCap size={13} />} title="Education">
              <div className="space-y-4">
                {EDUCATION.map((e) => (
                  <div
                    key={e.degree}
                    className="flex items-start justify-between gap-4 rounded-lg px-4 py-3"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  >
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{e.degree}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{e.institution}</p>
                      {e.note && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{e.note}</p>}
                    </div>
                    <span className="text-[11px] shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>{e.period}</span>
                  </div>
                ))}
              </div>
            </MainSection>

            {/* Certifications */}
            <MainSection icon={<FaAward size={13} />} title="Certifications">
              <div className="grid sm:grid-cols-2 gap-3">
                {CERTS.map((c) => (
                  <div
                    key={c.title}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}
                  >
                    <FaStar size={11} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MainSection>

            {/* Key achievements */}
            <MainSection icon={<FaCode size={13} />} title="Key Achievements">
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  '🏆 First Class Honors — GPA 3.8/4.0, top 5% of cohort',
                  '🚀 Scaled Igifu Meals to 30+ restaurant partners',
                  '⚡ Built real-time order engine — sub-200ms at 500+ concurrent sessions',
                  '💰 Delivered AI/blockchain features generating $500K+ in new contracts',
                  '📚 E-learning platform serving 5,000+ students across East Africa',
                  '🎓 Mentored 20+ junior developers into production-ready engineers',
                ].map((a) => (
                  <p key={a} className="text-[0.8125rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {a}
                  </p>
                ))}
              </div>
            </MainSection>

          </main>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
