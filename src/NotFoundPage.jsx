import { Link } from 'react-router-dom';
import { FaArrowRight, FaHome } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ background: 'var(--bg)', padding: 24 }}
    >

      <div className="relative z-10 text-center">
        <p
          style={{
            color: 'var(--fg-muted)', fontSize: 14, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18,
          }}
        >
          Error 404
        </p>
        <h1 style={{ color: 'var(--fg)', fontSize: 'clamp(3.5rem, 12vw, 7rem)', lineHeight: 1, marginBottom: 20 }}>
          404
        </h1>
        <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>Page not found</h2>
        <p style={{ color: 'var(--fg-muted)', maxWidth: 440, margin: '0 auto 36px' }}>
          The page you are looking for does not exist. It may have been moved or removed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-one">
            <FaHome size={13} /> Back To Home
            <span className="btn-icon"><FaArrowRight size={11} /></span>
          </Link>
          <Link to="/cv" className="btn-two">
            View CV
          </Link>
        </div>
      </div>

      <p
        className="absolute"
        style={{ bottom: 24, color: 'var(--fg-subtle)', fontSize: 13 }}
      >
        © {new Date().getFullYear()} Iraguha Jean Aime
      </p>
    </div>
  );
}
