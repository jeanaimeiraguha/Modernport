import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SectionHeader } from './motion';
import { TESTIMONIALS } from './data';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const go = (index) => {
    setDir(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  const next = () => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1);

  /* Auto-advance every 5s */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot  = (i) => { go(i); resetTimer(); };

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto px-6">

        <SectionHeader
          label="Testimonials"
          heading={<>What people<br />say about me.</>}
          sub="Feedback from colleagues, clients, and teammates I've had the privilege of working with."
        />

        <div className="mt-14 relative">

          {/* ── Main card ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', minHeight: 260 }}
          >
            {/* Accent top bar */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' }} />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
                  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  exit:  (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.25 } }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-8 sm:p-12"
              >
                {/* Quote icon */}
                <FaQuoteLeft size={28} style={{ color: 'var(--accent)', opacity: 0.25, marginBottom: 20 }} />

                {/* Text */}
                <p
                  className="text-base sm:text-lg leading-[1.85] font-medium mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', color: '#fff' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="ml-auto hidden sm:block w-28">
                    <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <motion.div
                        key={active}
                        className="h-full rounded-full"
                        style={{ background: 'var(--accent)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
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
          <div className="flex items-center justify-between mt-6">

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
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
                  onClick={() => handleDot(i)}
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
          <div className="flex gap-3 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className="shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
                style={{
                  background: i === active ? 'rgba(99,102,241,0.1)' : 'var(--bg-surface)',
                  border: `1px solid ${i === active ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                  style={{
                    background: i === active ? 'linear-gradient(135deg, var(--accent), var(--accent-hover))' : 'var(--bg-elevated)',
                    color: i === active ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  {item.avatar}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-semibold leading-tight" style={{ color: i === active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {item.name.split(' ')[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
