import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp,
  FaCheckCircle, FaExclamationCircle, FaPaperPlane, FaArrowRight,
  FaRegCopy, FaCheck,
} from 'react-icons/fa';
import { Reveal } from './motion';
import { CONTACT_ITEMS } from './data';

const ICONS = {
  email:    <FaEnvelope size={14} />,
  phone:    <FaPhone size={14} />,
  location: <FaMapMarkerAlt size={14} />,
  linkedin: <FaLinkedin size={14} />,
  whatsapp: <FaWhatsapp size={14} />,
};

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        style={{
          color: 'var(--heading)', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
            style={{ color: '#d14343', fontSize: 12.5 }}
          >
            <FaExclamationCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  /* Copying the address is faster than opening a mail client, so offer both. */
  const copyEmail = async () => {
    const address = 'jeanaimeiraguha@gmail.com';
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // Clipboard API needs a secure context; fall back to a temporary input.
      const el = document.createElement('textarea');
      el.value = address;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* nothing more to try */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
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

  const fieldStyle = (name) => ({
    borderColor: errors[name] ? '#d14343' : undefined,
  });

  return (
    <section id="contact" className="qt-section bg-main">
      <div className="qt-container">
        {/* The reference's "talk to us" panel: a dark gradient block carrying the
            invitation, with the form sitting on white beside it. */}
        <div className="grid lg:grid-cols-[1fr_1.15fr]">

          {/* ══ Dark invitation panel ══ */}
          <Reveal className="h-full">
            <div
              className="relative h-full overflow-hidden"
              style={{
                background: 'var(--gradient-dark)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: '56px 44px',
              }}
            >
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: '-30%', left: '-20%', width: 460, height: 460,
                  background: 'radial-gradient(circle, rgba(124,92,255,0.2), transparent 65%)',
                }}
              />

              <div className="relative z-10">
                <h5
                  style={{
                    color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase',
                    letterSpacing: '0.1em', fontWeight: 500, marginBottom: 16,
                  }}
                >
                  Get In Touch
                </h5>
                <h2 style={{ color: '#ffffff', marginBottom: 18 }}>
                  Let&apos;s build your next project together
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 34 }}>
                  Whether you are hiring, have a project in mind, or simply want to connect — I reply
                  within 24 hours.
                </p>

                <div
                  className="flex items-start gap-3"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    padding: '18px 20px',
                    marginBottom: 34,
                  }}
                >
                  <span className="glow-dot" style={{ marginTop: 9 }} />
                  <div>
                    <p style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      Currently available
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: '24px' }}>
                      Open to senior full-stack, lead engineer and CTO-track remote roles, plus consulting
                      and fractional CTO engagements.
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="btn-one btn-outline-light pressable w-full justify-center"
                  style={{ marginBottom: 26 }}
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      <FaCheck size={12} /> Email Copied
                    </>
                  ) : (
                    <>
                      <FaRegCopy size={12} /> Copy My Email
                    </>
                  )}
                </button>

                <ul className="flex flex-col gap-4">
                  {CONTACT_ITEMS.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                      >
                        {ICONS[item.type]}
                      </span>
                      <span className="min-w-0">
                        <span
                          className="block"
                          style={{
                            color: 'rgba(255,255,255,0.6)', fontSize: 10.5, fontWeight: 600,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                          }}
                        >
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="block truncate"
                            style={{ color: '#ffffff', fontSize: 15, fontWeight: 500 }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="block truncate" style={{ color: '#ffffff', fontSize: 15, fontWeight: 500 }}>
                            {item.value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* ══ Form ══ */}
          <Reveal delay={0.12} className="h-full">
            <div
              className="h-full"
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow)',
                padding: '56px 44px',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full gap-6"
                    style={{ minHeight: 420 }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    >
                      <FaCheckCircle size={48} style={{ color: 'var(--green)' }} />
                    </motion.span>
                    <div>
                      <h3 style={{ marginBottom: 8 }}>Message sent</h3>
                      <p style={{ color: 'var(--paragraph)' }}>
                        Thanks for reaching out. I will get back to you within 24 hours.
                      </p>
                    </div>
                    <button onClick={() => setStatus('idle')} className="btn-two pressable">
                      Send Another Message
                      <span className="btn-icon"><FaArrowRight size={11} /></span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    <div>
                      <h3 style={{ marginBottom: 6 }}>Send me a message</h3>
                      <p style={{ color: 'var(--paragraph)', fontSize: 15 }}>
                        Tell me about the role or the project and I will come back to you quickly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Name" error={errors.name}>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="qt-input"
                          style={fieldStyle('name')}
                          autoComplete="name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="qt-input"
                          style={fieldStyle('email')}
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    <Field label="Message" error={errors.message}>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about the role or project…"
                        rows={7}
                        className="qt-input"
                        style={{ ...fieldStyle('message'), resize: 'none' }}
                      />
                    </Field>

                    <button type="submit" className="btn-one pressable self-start">
                      <FaPaperPlane size={12} /> Send Message
                      <span className="btn-icon"><FaArrowRight size={11} /></span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
