import { useEffect, useRef } from 'react';

/* Flowing perspective dot-wave — a topographic grid receding into the distance. */
export default function WaveField({ color = '45,212,191', opacity = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COLS = 48;
    const ROWS = 18;

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const time = t * 0.00032;

      for (let row = 0; row < ROWS; row++) {
        const rowT = row / (ROWS - 1); // 0 = far (top), 1 = near (bottom)
        const y0 = H * (0.05 + rowT * 0.95);
        const spread = 0.5 + rowT * 0.85;
        const xStart = W * (0.5 - spread / 2);
        const xEnd = W * (0.5 + spread / 2);

        for (let col = 0; col < COLS; col++) {
          const colT = col / (COLS - 1);
          const x = xStart + colT * (xEnd - xStart);

          const wave =
            Math.sin(colT * Math.PI * 2.2 + time * 2.2 + row * 0.4) * (8 + rowT * 26) +
            Math.sin(colT * Math.PI * 5 + time * 3.4 - row * 0.2) * (2 + rowT * 6);
          const y = y0 + wave;

          const size = 0.7 + rowT * 2.4;
          const alpha = (0.12 + rowT * 0.8) * opacity;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
