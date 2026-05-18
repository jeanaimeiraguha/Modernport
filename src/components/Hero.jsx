import { motion } from 'framer-motion';
import { FaLinkedin, FaArrowDown, FaCode, FaRocket } from 'react-icons/fa';

const item = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay } },
});

const PILLS = ['Full-Stack Web', 'AI & ML', 'Computer Vision', 'Blockchain', 'Robotics', 'CTO @ Igifu Meals'];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-20 pb-12 lg:pt-28 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-14">

          {/* ── Avatar mobile top ── */}
          <motion.div {...item(0.05)} className="flex lg:hidden flex-col items-center gap-3">
            <div className="relative w-28 h-28">
              <motion.div
                className="absolute inset-[-5px] rounded-full"
                style={{
                  background: 'conic-gradient(var(--accent) 0deg 100deg, transparent 100deg 260deg, var(--accent) 260deg 360deg)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <img src="/images/profile/aime picture.jpeg" alt="Jean Aime Iraguha" className="w-full h-full object-cover rounded-full" style={{ border: '3px solid var(--bg-base)' }} />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full" style={{ background: '#4ade80', border: '2px solid var(--bg-base)', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
            </div>
            <div className="flex gap-3">
              {[{ value: '4+', label: 'Yrs' }, { value: '50+', label: 'Projects' }, { value: '30+', label: 'Clients' }].map((s) => (
                <div key={s.label} className="rounded-lg px-3 py-1.5 text-center" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <p className="font-display text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                  <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Left column ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Status */}
            <motion.div {...item(0)} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(99,102,241,0.22)',
                }}
              >
                <span className="glow-dot" />
                Open to senior / lead roles · Remote-first
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              {...item(0.08)}
              className="font-display font-bold leading-[1.04] mb-4"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: 'var(--text-primary)' }}
            >
              Jean Aime<br />
              <span style={{ color: 'var(--accent)' }}>
                IRAGUHA
              </span>
            </motion.h1>

            {/* Role line */}
            <motion.p
              {...item(0.15)}
              className="text-base sm:text-lg font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--accent)' }}>Full-Stack Engineer</span>
              {' '}&amp; Co-Founder
              {' '}·{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>CTO @ Igifu Meals</span>
            </motion.p>

            {/* Pitch */}
            <motion.p
              {...item(0.21)}
              className="text-sm sm:text-base leading-relaxed max-w-lg mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              I don't just write code —{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>I architect systems that outlast deadlines.</span>
              {' '}4+ years turning brutal real-world problems into{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>clean, battle-tested software</span>
              {' '}across fintech, edtech &amp; food-tech —
              from lone engineer to{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>leading teams as CTO.</span>
            </motion.p>

            {/* Tech pills */}
            <motion.div {...item(0.27)} className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {p}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...item(0.33)} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                <FaRocket size={13} /> View my work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Let's talk
              </button>
              <a
                href="https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <FaLinkedin size={14} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* ── Right column — avatar + quick stats (desktop only) ── */}
          <motion.div
            {...item(0.18)}
            className="hidden lg:flex flex-col items-center gap-6 shrink-0"
          >
            {/* Avatar */}
            <div className="relative w-44 h-44 md:w-52 md:h-52">
              {/* Spinning conic ring */}
              <motion.div
                className="absolute inset-[-6px] rounded-full"
                style={{
                  background: 'conic-gradient(var(--accent) 0deg 100deg, transparent 100deg 260deg, var(--accent) 260deg 360deg)',
                  borderRadius: '9999px',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <img
                src="/images/profile/aime picture.jpeg"
                alt="Jean Aime Iraguha"
                className="w-full h-full object-cover rounded-full"
                style={{ border: '3px solid var(--bg-base)' }}
              />
              {/* Online dot */}
              <span
                className="absolute bottom-2 right-2 w-4 h-4 rounded-full"
                style={{
                  background: '#4ade80',
                  border: '2px solid var(--bg-base)',
                  boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                }}
              />
            </div>

            {/* Quick-stat cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[220px]">
              {[
                { value: '4+',  label: 'Yrs exp.' },
                { value: '50+', label: 'Projects' },
                { value: 'CTO', label: 'Igifu Meals' },
                { value: '30+', label: 'Clients' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <p className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {s.value}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Scroll hint */}
        <motion.div
          {...item(0.42)}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-[10px] tracking-[0.22em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <FaArrowDown size={11} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
