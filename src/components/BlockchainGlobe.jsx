import { useEffect, useRef } from 'react';

/**
 * BlockchainGlobe
 * ---------------------------------------------------------------------------
 * A rotating wireframe globe rendered on a 2D canvas with a hand-rolled 3D
 * projection — no WebGL or extra dependency. On top of the sphere sits a peer
 * network: nodes pinned to real-ish coordinates, great-circle links between
 * them, and little "block" packets that travel those links and ripple the
 * receiving node when they land. The whole globe also drifts gently side to
 * side (the `animate-sway-x` wrapper) so it reads as alive even at a glance.
 */

/* Peer locations, roughly over real cities so the mesh looks plausible. */
const NODES = [
  { lat:  -1.9, lon:  30.1, hub: true  }, // Kigali
  { lat:   6.5, lon:   3.4, hub: false }, // Lagos
  { lat:  30.0, lon:  31.2, hub: false }, // Cairo
  { lat: -26.2, lon:  28.0, hub: false }, // Johannesburg
  { lat:  51.5, lon:  -0.1, hub: true  }, // London
  { lat:  48.9, lon:   2.4, hub: false }, // Paris
  { lat:  52.5, lon:  13.4, hub: false }, // Berlin
  { lat:  40.7, lon: -74.0, hub: true  }, // New York
  { lat:  37.8, lon:-122.4, hub: false }, // San Francisco
  { lat: -23.6, lon: -46.6, hub: false }, // São Paulo
  { lat:  25.2, lon:  55.3, hub: false }, // Dubai
  { lat:  19.1, lon:  72.9, hub: false }, // Mumbai
  { lat:   1.4, lon: 103.8, hub: true  }, // Singapore
  { lat:  35.7, lon: 139.7, hub: false }, // Tokyo
  { lat:  31.2, lon: 121.5, hub: false }, // Shanghai
  { lat: -33.9, lon: 151.2, hub: false }, // Sydney
  { lat:  55.8, lon:  37.6, hub: false }, // Moscow
  { lat:  43.7, lon: -79.4, hub: false }, // Toronto
];

/* Which peers talk to which. Indices into NODES. */
const LINKS = [
  [0, 4], [0, 1], [0, 3], [0, 10], [0, 2],
  [4, 7], [4, 5], [4, 6], [4, 16], [4, 12],
  [7, 8], [7, 9], [7, 17], [7, 12],
  [12, 13], [12, 14], [12, 11], [12, 15],
  [10, 11], [10, 2], [1, 3], [8, 13], [9, 3], [11, 14],
];

const DEG = Math.PI / 180;

/* Unit vector for a lat/lon pair. */
function toVec(lat, lon) {
  const la = lat * DEG;
  const lo = lon * DEG;
  return {
    x: Math.cos(la) * Math.sin(lo),
    y: Math.sin(la),
    z: Math.cos(la) * Math.cos(lo),
  };
}

/* Spherical interpolation so links hug the surface as true great-circle arcs. */
function slerp(a, b, t) {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return { ...a };
  const s = Math.sin(omega);
  const k0 = Math.sin((1 - t) * omega) / s;
  const k1 = Math.sin(t * omega) / s;
  return {
    x: a.x * k0 + b.x * k1,
    y: a.y * k0 + b.y * k1,
    z: a.z * k0 + b.z * k1,
  };
}

/* Two palettes so the same globe reads correctly on a white section or on the
   dark navy hero band. */
const PALETTES = {
  light: { base: '5,65,99',     accent: '9,145,223',  ring: '255,255,255', wireMax: 0.26, bodyA: 0.07 },
  dark:  { base: '255,255,255', accent: '56,189,248', ring: '5,65,99',     wireMax: 0.34, bodyA: 0.06 },
};

export default function BlockchainGlobe({ size = 560, tone = 'light', className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const P = PALETTES[tone] || PALETTES.light;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width || size;
      H = rect.height || size;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * 0.4;
      cx = W / 2;
      cy = H / 2;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Camera: fixed tilt, continuous spin about the polar axis. */
    const TILT = -18 * DEG;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const PERSP = 2.6;

    /* Rotate a unit vector by the current spin, then tilt, then project. */
    const project = (v, spin) => {
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      // spin about Y
      const x1 = v.x * cs + v.z * sn;
      const z1 = -v.x * sn + v.z * cs;
      const y1 = v.y;
      // tilt about X
      const y2 = y1 * cosT - z1 * sinT;
      const z2 = y1 * sinT + z1 * cosT;
      // perspective
      const k = PERSP / (PERSP - z2);
      return { sx: cx + x1 * R * k, sy: cy - y2 * R * k, z: z2, k };
    };

    /* Pre-build the graticule as unit-vector polylines. */
    const graticule = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring = [];
      for (let lon = -180; lon <= 180; lon += 6) ring.push(toVec(lat, lon));
      graticule.push(ring);
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const meridian = [];
      for (let lat = -90; lat <= 90; lat += 6) meridian.push(toVec(lat, lon));
      graticule.push(meridian);
    }

    const nodeVecs = NODES.map((n) => toVec(n.lat, n.lon));

    /* One travelling block per link, each with its own phase and speed. */
    const packets = LINKS.map((_, i) => ({
      t: (i * 0.137) % 1,
      speed: 0.07 + ((i * 7) % 5) * 0.022,
      dir: i % 3 === 0 ? -1 : 1,
    }));

    /* Ripple rings fired when a packet reaches a node. */
    const ripples = [];
    const fired = LINKS.map(() => false);

    let spin = 0;
    let last = performance.now();

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) spin += dt * 0.16;

      ctx.clearRect(0, 0, W, H);

      /* ── Soft atmosphere behind the sphere ── */
      const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.5);
      halo.addColorStop(0, `rgba(${P.base},0.10)`);
      halo.addColorStop(0.55, `rgba(${P.accent},0.06)`);
      halo.addColorStop(1, `rgba(${P.base},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fill();

      /* ── Globe body: a faint tinted disc so the wireframe sits on something ── */
      const body = ctx.createRadialGradient(
        cx - R * 0.3, cy - R * 0.35, R * 0.1,
        cx, cy, R,
      );
      body.addColorStop(0, `rgba(${P.base},${P.bodyA})`);
      body.addColorStop(1, `rgba(${P.base},0.02)`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      /* ── Limb ── */
      ctx.strokeStyle = `rgba(${P.base},0.2)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      /* ── Graticule, split per segment so depth can fade it ── */
      ctx.lineWidth = 1;
      for (const line of graticule) {
        for (let i = 0; i < line.length - 1; i++) {
          const a = project(line[i], spin);
          const b = project(line[i + 1], spin);
          // Front half is crisper; back half shows through faintly.
          const depth = (a.z + b.z) / 2;
          const alpha = depth > 0
            ? 0.10 + depth * P.wireMax
            : 0.045 + (depth + 1) * 0.03;
          ctx.strokeStyle = `rgba(${P.base},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      /* ── Links as great-circle arcs lifted just off the surface ── */
      const SEG = 36;
      LINKS.forEach(([ai, bi]) => {
        const a = nodeVecs[ai];
        const b = nodeVecs[bi];
        for (let i = 0; i < SEG; i++) {
          const p0 = slerp(a, b, i / SEG);
          const p1 = slerp(a, b, (i + 1) / SEG);
          // Lift the middle of the arc outward for a subtle hop.
          const lift0 = 1 + 0.07 * Math.sin((i / SEG) * Math.PI);
          const lift1 = 1 + 0.07 * Math.sin(((i + 1) / SEG) * Math.PI);
          const s0 = project({ x: p0.x * lift0, y: p0.y * lift0, z: p0.z * lift0 }, spin);
          const s1 = project({ x: p1.x * lift1, y: p1.y * lift1, z: p1.z * lift1 }, spin);
          const depth = (s0.z + s1.z) / 2;
          if (depth < -0.15) continue; // hide arcs well behind the globe
          const alpha = depth > 0 ? 0.16 + depth * 0.3 : 0.06;
          ctx.strokeStyle = `rgba(${P.accent},${alpha.toFixed(3)})`;
          ctx.lineWidth = depth > 0 ? 1.15 : 0.8;
          ctx.beginPath();
          ctx.moveTo(s0.sx, s0.sy);
          ctx.lineTo(s1.sx, s1.sy);
          ctx.stroke();
        }
      });

      /* ── Travelling blocks ── */
      packets.forEach((pk, idx) => {
        if (!reduced) pk.t += dt * pk.speed;
        if (pk.t >= 1) {
          pk.t -= 1;
          fired[idx] = false;
        }
        const [ai, bi] = LINKS[idx];
        const from = pk.dir === 1 ? nodeVecs[ai] : nodeVecs[bi];
        const to = pk.dir === 1 ? nodeVecs[bi] : nodeVecs[ai];
        const p = slerp(from, to, pk.t);
        const lift = 1 + 0.07 * Math.sin(pk.t * Math.PI);
        const s = project({ x: p.x * lift, y: p.y * lift, z: p.z * lift }, spin);

        // Fire a ripple as the block lands.
        if (pk.t > 0.93 && !fired[idx]) {
          fired[idx] = true;
          const land = project(to, spin);
          if (land.z > 0) ripples.push({ x: land.sx, y: land.sy, r: 3, life: 1 });
        }

        if (s.z <= 0) return; // only draw blocks on the near face

        const a = 0.35 + s.z * 0.65;
        const w = 4.4 * s.k;

        // Short comet trail behind the block.
        const trailT = Math.max(0, pk.t - 0.05);
        const tp = slerp(from, to, trailT);
        const tl = 1 + 0.07 * Math.sin(trailT * Math.PI);
        const ts = project({ x: tp.x * tl, y: tp.y * tl, z: tp.z * tl }, spin);
        const grad = ctx.createLinearGradient(ts.sx, ts.sy, s.sx, s.sy);
        grad.addColorStop(0, `rgba(${P.accent},0)`);
        grad.addColorStop(1, `rgba(${P.accent},${(a * 0.8).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ts.sx, ts.sy);
        ctx.lineTo(s.sx, s.sy);
        ctx.stroke();

        // The block itself — a small square, rotated 45°, so it reads as a block
        // rather than a generic dot.
        ctx.save();
        ctx.translate(s.sx, s.sy);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(${P.accent},${a.toFixed(3)})`;
        ctx.fillRect(-w / 2, -w / 2, w, w);
        ctx.restore();
      });

      /* ── Ripples ── */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += dt * 42;
        rp.life -= dt * 1.5;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(${P.accent},${(rp.life * 0.45).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* ── Nodes, back face first so the near ones sit on top ── */
      const ordered = nodeVecs
        .map((v, i) => ({ ...project(v, spin), hub: NODES[i].hub, i }))
        .sort((a, b) => a.z - b.z);

      ordered.forEach((n) => {
        const front = n.z > 0;
        const a = front ? 0.45 + n.z * 0.55 : 0.12;
        const r = (n.hub ? 3.6 : 2.4) * n.k;

        if (front && n.hub) {
          // Halo on the hub peers.
          const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, r * 5);
          g.addColorStop(0, `rgba(${P.accent},${(a * 0.35).toFixed(3)})`);
          g.addColorStop(1, `rgba(${P.accent},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = n.hub
          ? `rgba(${P.accent},${a.toFixed(3)})`
          : `rgba(${P.base},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
        ctx.fill();

        if (front) {
          ctx.strokeStyle = `rgba(${P.ring},${(a * 0.8).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [size, tone]);

  const ring = PALETTES[tone] || PALETTES.light;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: '100%', maxWidth: size, aspectRatio: '1 / 1' }}
      aria-hidden="true"
    >
      {/* Concentric orbit rings — static scaffolding behind the globe */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: `1px solid rgba(${ring.base},0.12)` }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ inset: '7%', border: `1px dashed rgba(${ring.base},0.14)` }}
      />

      {/* Slow orbiting marker on the outer ring */}
      <div className="absolute inset-0 animate-ring pointer-events-none">
        <span
          className="absolute"
          style={{
            top: -4,
            left: '50%',
            width: 8,
            height: 8,
            marginLeft: -4,
            background: `rgb(${ring.accent})`,
            borderRadius: '50%',
            boxShadow: `0 0 0 4px rgba(${ring.accent},0.18)`,
          }}
        />
      </div>

      {/* The globe itself, drifting side to side */}
      <div className="absolute inset-0 animate-sway-x">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
}
