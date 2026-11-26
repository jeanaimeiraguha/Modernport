import { Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight,
} from 'react-icons/fa';

const SOCIALS = [
  { href: 'https://github.com/jeanaimeiraguha',                        icon: <FaGithub size={14} />,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/iraguha-jean-aime-53ba74405/', icon: <FaLinkedin size={14} />, label: 'LinkedIn' },
  { href: 'https://wa.me/250793411594',                               icon: <FaWhatsapp size={14} />, label: 'WhatsApp' },
  { href: 'mailto:jeanaimeiraguha@gmail.com',                         icon: <FaEnvelope size={14} />, label: 'Email'    },
];

const QUICK_LINKS = [
  { label: 'About Me',    id: 'about'      },
  { label: 'Services',    id: 'services'   },
  { label: 'Projects',    id: 'projects'   },
  { label: 'Experience',  id: 'experience' },
  { label: 'Contact',     id: 'contact'    },
];

const CONTACT = [
  { icon: <FaMapMarkerAlt size={12} />, text: 'Bugesera, Kigali, Rwanda',  href: null },
  { icon: <FaClock size={12} />,        text: 'Mon – Fri: 09:00 – 18:00',  href: null },
  { icon: <FaPhone size={12} />,        text: '+250 793 411 594',          href: 'tel:+250793411594' },
  { icon: <FaEnvelope size={12} />,     text: 'jeanaimeiraguha@gmail.com', href: 'mailto:jeanaimeiraguha@gmail.com' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
      {/* Corner light */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-30%', right: '-5%', width: 620, height: 620,
          background: 'radial-gradient(circle, rgba(124,92,255,0.16), transparent 65%)',
        }}
      />

      <div className="qt-container relative z-10" style={{ paddingTop: 90, paddingBottom: 0 }}>
        <div className="grid lg:grid-cols-[1.4fr_1fr_1.2fr] gap-12 lg:gap-16">

          {/* ── Brand ── */}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 22 }}>
              <span
                className="inline-flex items-center justify-center shrink-0"
                style={{ width: 44, height: 44, background: '#ffffff', color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}
              >
                JA
              </span>
              <span className="leading-tight">
                <span className="block" style={{ color: '#ffffff', fontWeight: 700, fontSize: 18 }}>
                  Iraguha Jean Aime
                </span>
                <span
                  className="block"
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}
                >
                  Software Engineering
                </span>
              </span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400, marginBottom: 28 }}>
              I build, secure and ship production-grade digital products — full-stack web, mobile, AI and Web3
              systems, from Kigali to teams anywhere.
            </p>

            <div className="qt-sidebar-social flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: '#ffffff' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h5 style={{ color: '#ffffff', marginBottom: 22 }}>Quick Links</h5>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="inline-flex items-center gap-2 text-left"
                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, transition: 'var(--transition)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                  >
                    <FaArrowRight size={9} style={{ opacity: 0.6 }} />
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/cv"
                  className="inline-flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}
                >
                  <FaArrowRight size={9} style={{ opacity: 0.6 }} />
                  View CV
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h5 style={{ color: '#ffffff', marginBottom: 22 }}>Contact Me</h5>
            <ul className="flex flex-col gap-4">
              {CONTACT.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <span
                    className="inline-flex items-center justify-center shrink-0"
                    style={{ width: 30, height: 30, background: 'rgba(255,255,255,0.1)', color: '#ffffff', marginTop: 2 }}
                  >
                    {c.icon}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, wordBreak: 'break-word' }}
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ marginTop: 70, paddingTop: 26, paddingBottom: 30, borderTop: '1px solid rgba(255,255,255,0.14)' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
            © {new Date().getFullYear()} Iraguha Jean Aime. All rights reserved.
          </p>
          <a
            href="https://github.com/jeanaimeiraguha"
            target="_blank"
            rel="noopener noreferrer"
            className="link-grow"
            style={{ color: 'var(--text-faint)', fontSize: 14 }}
          >
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
