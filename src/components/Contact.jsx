import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLinkedin, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaWhatsapp, FaCheckCircle,
  FaExclamationCircle, FaPaperPlane,
} from 'react-icons/fa';
import { SectionHeader, FadeUp } from './motion';
import { CONTACT_ITEMS } from './data';

const ICONS = {
  email:    <FaEnvelope size={14} />,
  phone:    <FaPhone size={14} />,
  location: <FaMapMarkerAlt size={14} />,
  linkedin: <FaLinkedin size={14} />,
  whatsapp: <FaWhatsapp size={14} />,
};
const ICON_COLORS = { whatsapp: '#25d366', linkedin: '#0a66c2' };

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs flex items-center gap-1" style={{ color: '#f87171' }}
          >
            <FaExclamationCircle size={10} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle');
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message is too short';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:jeanaimeiraguha@gmail.com?subject=${subject}&body=${body}`;
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '11px 14px',
    fontSize: '0.875rem',
    borderRadius: '10px',
    background: 'var(--bg-base)',
    border: `1.5px solid ${errors[name] ? '#f87171' : focused === name ? 'var(--accent)' : 'var(--border)'}`,
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxShadow: focused === name && !errors[name] ? '0 0 0 3px rgba(99,102,241,0.08)' : 'none',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <section id="contact" className="py-20 sm:py-32" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Contact"
          heading={<>Ready to build<br />something great?</>}
          sub="Whether you're hiring, have a project in mind, or just want to connect — I reply within 24 hours."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Form */}
          <FadeUp delay={0.1}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center rounded-xl py-16 px-8 gap-5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(74,222,128,0.18)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                  >
                    <FaCheckCircle size={44} style={{ color: '#4ade80' }} />
                  </motion.div>
                  <div>
                    <p className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Message sent!</p>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium px-5 py-2 rounded-lg"
                    style={{ background: 'rgba(99,102,241,0.08)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.18)' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-5 rounded-xl p-6 sm:p-7"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  noValidate
                >
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                    <Field label="Name" error={errors.name}>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="Your name" style={inputStyle('name')}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="you@company.com" style={inputStyle('email')}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <Field label="Message" error={errors.message}>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about the role or project…"
                      rows={6} style={{ ...inputStyle('message'), resize: 'none' }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-7 py-2.5 text-sm font-semibold rounded-xl text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    <FaPaperPlane size={12} /> Send message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeUp>

          {/* Info */}
          <FadeUp delay={0.2}>
            <div
              className="rounded-xl p-5 mb-5"
              style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.14)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="glow-dot" />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Currently available</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Open to senior full-stack, lead engineer, or CTO-track remote roles. Also available
                for consulting and fractional CTO engagements.
              </p>
            </div>

            <div className="space-y-3">
              {CONTACT_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex items-center gap-4 rounded-xl px-4 py-3.5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.08)', color: ICON_COLORS[item.type] || 'var(--accent)' }}
                  >
                    {ICONS[item.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm truncate block transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
