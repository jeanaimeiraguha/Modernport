import { useState } from 'react';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { SectionHeader, FadeUp } from './motion';
import { CONTACT_ITEMS } from './data';

const ICONS = {
  email:    <FaEnvelope size={13} />,
  phone:    <FaPhone size={13} />,
  location: <FaMapMarkerAlt size={13} />,
  linkedin: <FaLinkedin size={13} />,
  whatsapp: <FaWhatsapp size={13} />,
};

const ICON_COLORS = {
  whatsapp: '#25d366',
};

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Contact"
          heading={<>Ready to build<br />something great?</>}
          sub="Whether you're hiring, have a project in mind, or just want to connect — I reply within 24 hours."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-14 items-start">

          {/* Form */}
          <FadeUp delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your name" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="you@company.com" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell me about the role or project…"
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button
                type="submit" disabled={status === 'sending'}
                className="px-7 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors disabled:opacity-50"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>
              {status === 'sent' && (
                <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>
                  ✓ Sent — I'll be in touch soon!
                </p>
              )}
            </form>
          </FadeUp>

          {/* Info */}
          <FadeUp delay={0.2}>
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                What I'm looking for
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Senior full-stack, lead engineer, or CTO-track remote roles. Also open to
                consulting, fractional CTO work, and interesting startup collaborations.
              </p>
            </div>

            <div className="space-y-5">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5" style={{ color: ICON_COLORS[item.type] || 'var(--accent)' }}>{ICONS[item.type]}</span>
                  <div>
                    <p className="text-[11px] font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
