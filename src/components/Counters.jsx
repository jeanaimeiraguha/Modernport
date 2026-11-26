import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from './motion';

/* The reference's counter strip: a dark gradient panel that overlaps the
   section above it by 120px and carries four headline figures. */
const COUNTERS = [
  { value: 4,  suffix: '+', label: 'Years Of Experience' },
  { value: 50, suffix: '+', label: 'Finished Projects'   },
  { value: 30, suffix: '+', label: 'Satisfied Clients'   },
  { value: 6,  suffix: '',  label: 'Technical Domains'   },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const steps = 45;
      const inc = value / steps;
      let cur = 0;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= value) { setCount(value); clearInterval(timer); }
        else setCount(Math.floor(cur));
      }, 1400 / steps);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Counters() {
  return (
    <section id="counters" className="relative bg-main" style={{ paddingBlock: 24 }}>
      <div className="qt-container">
        <motion.div
          className="dark-band relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Corner light */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-60%', right: '-5%', width: 520, height: 520,
              background: 'radial-gradient(circle, rgba(59,130,246,0.22), transparent 65%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {COUNTERS.map((c, i) => (
              <div
                key={c.label}
                className="text-center lg:text-left"
                style={{
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  paddingLeft: i === 0 ? 0 : 28,
                }}
              >
                <h3
                  className="nums"
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(2.25rem, 3.4vw, 3rem)',
                    lineHeight: 1.15,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  <Counter value={c.value} suffix={c.suffix} />
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: 15,
                    lineHeight: '24px',
                    textTransform: 'capitalize',
                  }}
                >
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
