import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

function project3D(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z);
  return { x: cx + x * scale, y: cy + y * scale, z, scale };
}

export default function GlobeCanvas({ opacity = 0.32, size = 0.46 }) {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const light     = theme !== 'dark';

  // Indigo accent — slightly different shade per theme
  const rgb = light ? '79,70,229' : '99,102,241';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy;

    const resize = () => {
      W  = canvas.width  = canvas.offsetWidth;
      H  = canvas.height = canvas.offsetHeight;
      cx = W / 2;
      cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const LAT_LINES  = 10;
    const LON_LINES  = 16;
    const GLOBE_DOTS = 220;
    const FOV        = 420;
    let   rotY       = 0;

    // Pre-compute dot positions
    const dots = Array.from({ length: GLOBE_DOTS }, () => ({
      theta: Math.acos(2 * Math.random() - 1),
      phi:   Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      const R = Math.min(W, H) * size;
      rotY    = t * 0.00013; // slow, elegant

      // ── Latitude lines ──
      for (let i = 1; i < LAT_LINES; i++) {
        const lat  = (i / LAT_LINES) * Math.PI;
        const r2   = R * Math.sin(lat);
        const yOff = -R * Math.cos(lat);

        // Sample points, split into front/back segments
        const pts = [];
        for (let a = 0; a <= Math.PI * 2 + 0.07; a += 0.06) {
          const rx = r2 * Math.cos(a + rotY);
          const rz = r2 * Math.sin(a + rotY);
          pts.push(project3D(rx, yOff, rz, cx, cy, FOV));
        }

        // Draw with depth-based alpha
        for (let j = 0; j < pts.length - 1; j++) {
          const p    = pts[j];
          const pn   = pts[j + 1];
          // z ranges from -R to +R; front = positive z
          const depth = (p.z + R) / (2 * R); // 0=back, 1=front
          const a     = 0.08 + depth * 0.32;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pn.x, pn.y);
          ctx.strokeStyle = `rgba(${rgb},${a})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // ── Longitude lines ──
      for (let i = 0; i < LON_LINES; i++) {
        const lon = (i / LON_LINES) * Math.PI * 2;
        const pts = [];
        for (let a = 0; a <= Math.PI + 0.055; a += 0.05) {
          pts.push(project3D(
            R * Math.sin(a) * Math.cos(lon + rotY),
            -R * Math.cos(a),
            R * Math.sin(a) * Math.sin(lon + rotY),
            cx, cy, FOV
          ));
        }

        for (let j = 0; j < pts.length - 1; j++) {
          const p    = pts[j];
          const pn   = pts[j + 1];
          const depth = (p.z + R) / (2 * R);
          const a     = 0.06 + depth * 0.26;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pn.x, pn.y);
          ctx.strokeStyle = `rgba(${rgb},${a})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // ── Dots ──
      dots.forEach(({ theta, phi }) => {
        const p = project3D(
          R * Math.sin(theta) * Math.cos(phi + rotY),
          -R * Math.cos(theta),
          R * Math.sin(theta) * Math.sin(phi + rotY),
          cx, cy, FOV
        );
        // Only draw front-facing dots
        if (p.z < -R * 0.1) return;
        const depth = (p.z + R) / (2 * R);
        const a     = 0.15 + depth * 0.65;
        const r     = 0.8 + depth * 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [rgb, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
