import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLinkedin, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaWhatsapp, FaCheckCircle,
  FaExclamationCircle, FaPaperPlane,
} from 'react-icons/fa';
import { SectionHeader, FadeUp } from './motion';
import { CONTACT_ITEMS } from './data';

/* ── EmailJS config — fill these in from emailjs.com dashboard ── */
const EJS_SERVICE  = 'service_xxxxxxx';   // ← your Service ID
const EJS_TEMPLATE = 'template_xxxxxxx';  // ← your Template ID
const EJS_KEY      = 'xxxxxxxxxxxxxxxxxxxx'; // ← your Public Key

const ICONS = {
  email:    <FaEnvelope size={14} />,
  phone:    <FaPhone size={14} />,
  location: <FaMapMarkerAlt size={14} />,
  linkedin: <FaLinkedin size={14} />,
  whatsapp: <FaWhatsapp size={14} />,
};

const ICON_COLORS = { whatsapp: '#25d366' };

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
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
  const formRef = useRef();
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name    = 'Name is required';
    if (!form.email.trim())                         e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim())                       e.message = 'Message is required';
    else if (form.message.trim().length < 10)       e.message = 'Message is too short';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, formRef.current, EJS_KEY);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputBase = (name) => ({
    width: '100%',
    padding: '11px 14px',
    fontSize: '0.875rem',
    borderRadius: '10px',
    background: 'var(--bg-elevated)',
    border: `1.5px solid ${errors[name] ? '#f87171' : focused === name ? 'var(--accent)' : 'var(--border)'}`,
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === name && !errors[name] ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
  });

  return (
    <section id="contact" className="py-20 sm:py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeader
          label="Contact"
          heading={<>Ready to build<br />something great?</>}
          sub="Whether you're hiring, have a project in mind, or just want to connect — I reply within 24 hours."
        />

        <div className="mt-12 sm:mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Form ── */}
          <FadeUp delay={0.1}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center rounded-2xl py-16 px-8 gap-5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(74,222,128,0.2)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                  >
                    <FaCheckCircle size={48} style={{ color: '#4ade80' }} />
                  </motion.div>
                  <div>
                    <p className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      Message sent!
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                    style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.18)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.1)')}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name" error={errors.name}>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="Your name" style={inputBase('name')}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="you@company.com" style={inputBase('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Message" error={errors.message}>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about the role or project…"
                      rows={6} style={{ ...inputBase('message'), resize: 'none' }}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </Field>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm px-4 py-3 rounded-lg"
                        style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}
                      >
                        <FaExclamationCircle size={13} />
                        Something went wrong. Please try emailing me directly at jeanaimeiraguha@gmail.com
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 text-sm font-semibold rounded-xl text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'var(--accent)' }}
                    onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.background = 'var(--accent-hover)'; }}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={12} /> Send message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeUp>

          {/* ── Info panel ── */}
          <FadeUp delay={0.2}>
            {/* Availability card */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.18)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Currently available
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Open to senior full-stack, lead engineer, or CTO-track remote roles. Also available
                for consulting and fractional CTO engagements.
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 rounded-xl px-4 py-3.5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.1)', color: ICON_COLORS[item.type] || 'var(--accent)' }}
                  >
                    {ICONS[item.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-muted)' }}>
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
