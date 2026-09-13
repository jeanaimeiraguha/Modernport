import { useState } from 'react';

export default function StarField({ count = 34, className = '' }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() < 0.75 ? 1 : Math.random() < 0.9 ? 1.5 : 2,
      duration: 2.2 + Math.random() * 3,
      delay: Math.random() * 4,
      max: 0.45 + Math.random() * 0.5,
    }))
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#eaf3f3',
            boxShadow: '0 0 4px 1px rgba(234,243,243,0.6)',
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            '--tw-min': 0.1,
            '--tw-max': s.max,
          }}
        />
      ))}
    </div>
  );
}
