import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SectionHeader } from './motion';
import { TESTIMONIALS } from './data';

const AUTO_DELAY = 34000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const timerRef            = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, AUTO_DELAY);
  };

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  const go = (i) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    startTimer();
  };

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <div
        className="orb animate-orb"
        style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 520, height: 300, background: 'radial-gradient(ellipse, rgba(20,184,166,0.09), transparent 70%)' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        <SectionHeader
          label="Testimonials"
          heading={<>What people<br />say about me.</>}
          sub="Feedback from colleagues, clients, and teammates I've had the privilege of working with."
        />

        <div className="mt-12 sm:mt-14">

          {/* ── Main card ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            {/* Accent top bar */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' }} />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={{
                  enter:  (d) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
                  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                  exit:   (d) => ({ opacity: 0, x: d > 0 ? -48 : 48, transition: { duration: 0.25 } }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-6 sm:p-10"
              >
                <FaQuoteLeft size={24} style={{ color: 'var(--accent)', opacity: 0.3, marginBottom: 18 }} />

                <p
                  className="text-base sm:text-lg leading-[1.9] mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{t.text}"
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Real photo */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                    style={{ border: '2px solid var(--border)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials */}
                  <div
                    className="w-12 h-12 rounded-full items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', color: '#fff', display: 'none' }}
                  >
                    {t.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>

                  {/* Progress bar — desktop */}
                  <div className="hidden sm:block w-24 shrink-0">
                    <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <motion.div
                        key={active}
                        className="h-full rounded-full"
                        style={{ background: 'var(--accent)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTO_DELAY / 1000, ease: 'linear' }}
                      />
                    </div>
                    <p className="text-[10px] mt-1 text-right" style={{ color: 'var(--text-muted)' }}>
                      {active + 1} / {TESTIMONIALS.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-2">
              <button
                onClick={() => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={() => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <FaChevronRight size={12} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          <div className="flex gap-2 sm:gap-3 mt-5 overflow-x-auto pb-1 scrollbar-hide">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="shrink-0 flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl transition-all"
                style={{
                  background: i === active ? 'rgba(20,184,166,0.1)' : 'var(--bg-surface)',
                  border: `1px solid ${i === active ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                  style={{ border: `1.5px solid ${i === active ? 'var(--accent)' : 'var(--border)'}` }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-7 h-7 rounded-full items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: i === active ? 'var(--accent)' : 'var(--bg-elevated)',
                    color: i === active ? '#fff' : 'var(--text-muted)',
                    display: 'none',
                  }}
                >
                  {item.avatar}
                </div>
                <span
                  className="text-[11px] font-medium hidden sm:block"
                  style={{ color: i === active ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {item.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
