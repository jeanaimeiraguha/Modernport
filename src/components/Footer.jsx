import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Jean Aime Iraguha
        </p>
        <div className="flex items-center gap-5">
          <Link
            to="/cv"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <FaFileAlt size={12} /> View CV
          </Link>
          {[
            { href: 'https://github.com/jeanaimeiraguha', icon: <FaGithub size={15} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', icon: <FaLinkedin size={15} />, label: 'LinkedIn' },
            { href: 'mailto:jeanaimeiraguha@gmail.com', icon: <FaEnvelope size={15} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
