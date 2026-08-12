import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const SOCIALS = [
  { href: 'https://github.com/jeanaimeiraguha',                        icon: <FaGithub size={15} />,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', icon: <FaLinkedin size={15} />, label: 'LinkedIn' },
  { href: 'mailto:jeanaimeiraguha@gmail.com',                          icon: <FaEnvelope size={15} />, label: 'Email'    },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }}
            >
              <span className="font-display font-bold text-xs text-white">JA</span>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Jean Aime Iraguha
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="/cv/Jean-Aime-Iraguha-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <FaFileAlt size={11} /> View CV
            </a>

            <div className="w-px h-4" style={{ background: 'var(--border)' }} />

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  whileHover={{ color: 'var(--accent)', y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-5 flex items-center justify-center" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
            Designed & built with{' '}
            <span style={{ color: 'var(--accent)' }}>React</span> ·{' '}
            <span style={{ color: 'var(--accent)' }}>Framer Motion</span> ·{' '}
            <span style={{ color: 'var(--accent)' }}>Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
