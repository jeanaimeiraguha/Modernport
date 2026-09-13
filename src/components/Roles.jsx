import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaServer, FaCloud } from 'react-icons/fa';
import { SectionHeader, stagger, viewportOnce } from './motion';

const ROLES = [
  { id: 'web',     icon: FaCode,      color: '#14b8a6', accent: '#a78bfa', label: ['Web', 'Developer']     },
  { id: 'mobile',  icon: FaMobileAlt, color: '#fb7185', accent: '#38bdf8', label: ['Mobile', 'Developer']  },
  { id: 'backend', icon: FaServer,    color: '#38bdf8', accent: '#14b8a6', label: ['Backend', 'Developer'] },
  { id: 'devops',  icon: FaCloud,     color: '#f59e0b', accent: '#a78bfa', label: ['DevOps', 'Engineer']   },
];

function RoleCard({ role }) {
  const Icon = role.icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -4 }}
      className="rounded-2xl p-[1.5px]"
      style={{ background: `linear-gradient(150deg, ${role.color}, transparent 45%, transparent 60%, ${role.accent})` }}
    >
      <div
        className="rounded-2xl h-full flex flex-col items-center text-center px-6 py-9"
        style={{ background: 'var(--bg-card)' }}
      >
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: `radial-gradient(circle, ${role.color}66, transparent 72%)` }}
          />
          <div
            className="absolute inset-0 rounded-full blur-lg"
            style={{ background: `radial-gradient(circle at 68% 28%, ${role.accent}55, transparent 70%)` }}
          />
          <Icon size={26} style={{ color: '#fff', position: 'relative', zIndex: 1 }} />
        </div>
        <p
          className="font-display font-bold leading-snug"
          style={{ fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
        >
          {role.label[0]}<br />{role.label[1]}
        </p>
      </div>
    </motion.div>
  );
}

export default function Roles() {
  return (
    <section className="relative py-20 sm:py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="How I help"
          heading={<>Four roles.<br />One engineer.</>}
          sub="Whatever a project needs — a pixel-perfect interface, a native mobile app, a resilient API, or infrastructure that doesn't fall over — I put on that hat."
        />

        <motion.div
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
