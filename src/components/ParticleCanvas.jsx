import { useEffect, useRef } from 'react';

function project3D(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z);
  return { x: cx + x * scale, y: cy + y * scale, scale };
}

export default function ParticleCanvas({ phase, light = false }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  // Colour palette based on mode
  const C = light
    ? { globe: '79,70,229', particle: '100,116,139', connect: '79,70,229' }
    : { globe: '99,102,241', particle: '148,163,184', connect: '99,102,241' };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W / 2;
      cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const R          = Math.min(W, H) * 0.28;
    const FOV        = 400;
    let   rotY       = 0;
    const LAT_LINES  = 8;
    const LON_LINES  = 12;
    const GLOBE_DOTS = 120;

    const globeDots = Array.from({ length: GLOBE_DOTS }, () => {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi   = Math.random() * Math.PI * 2;
      return { theta, phi };
    });

    const PARTICLE_COUNT = window.innerWidth < 640 ? 35 : 70;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      vx:    (Math.random() - 0.5) * 0.0003,
      vy:    (Math.random() - 0.5) * 0.0003,
      r:     Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.3 + 0.08,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      const globeAlpha = phase >= 1 ? Math.min(1, (phase - 1) * 0.4 + 0.25) : 0.18;
      rotY = t * 0.00016;

      // Lat lines
      for (let i = 1; i < LAT_LINES; i++) {
        const lat  = (i / LAT_LINES) * Math.PI;
        const r2   = R * Math.sin(lat);
        const yOff = -R * Math.cos(lat);
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
          const rx = r2 * Math.cos(a + rotY);
          const rz = r2 * Math.sin(a + rotY);
          const p  = project3D(rx, yOff, rz, cx, cy, FOV);
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${C.globe},${globeAlpha * 0.22})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Lon lines
      for (let i = 0; i < LON_LINES; i++) {
        const lon = (i / LON_LINES) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= Math.PI; a += 0.06) {
          const rx = R * Math.sin(a) * Math.cos(lon + rotY);
          const ry = -R * Math.cos(a);
          const rz = R * Math.sin(a) * Math.sin(lon + rotY);
          const p  = project3D(rx, ry, rz, cx, cy, FOV);
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${C.globe},${globeAlpha * 0.18})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Globe dots
      globeDots.forEach(({ theta, phi }) => {
        const rx = R * Math.sin(theta) * Math.cos(phi + rotY);
        const ry = -R * Math.cos(theta);
        const rz = R * Math.sin(theta) * Math.sin(phi + rotY);
        const p  = project3D(rx, ry, rz, cx, cy, FOV);
        if (p.scale < 0) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.scale * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.globe},${globeAlpha * p.scale * 0.6})`;
        ctx.fill();
      });

      // Ambient particles + neural connections
      const pts = particles.map((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        return { px: p.x * W, py: p.y * H, r: p.r, alpha: p.alpha };
      });

      const CONNECT_DIST = W * 0.11;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].px - pts[j].px;
          const dy = pts[i].py - pts[j].py;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].px, pts[i].py);
            ctx.lineTo(pts[j].px, pts[j].py);
            ctx.strokeStyle = `rgba(${C.connect},${(1 - d / CONNECT_DIST) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      pts.forEach(({ px, py, r, alpha }) => {
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.particle},${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [phase, light]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: light ? 0.7 : 0.9 }}
    />
  );
}
