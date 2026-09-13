import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaAws } from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiRedis, SiPostgresql, SiMongodb, SiGraphql, SiNodedotjs, SiPython, SiTensorflow,
  SiFirebase, SiSolidity, SiLinux, SiGithub, SiDocker,
} from 'react-icons/si';
import { viewportOnce } from './motion';

const BRANCHES = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#14b8a6',
    techs: [
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8' },
      { name: 'Next.js',      Icon: SiNextdotjs,   color: '#e2e8f0' },
      { name: 'React',        Icon: SiReact,       color: '#61dafb' },
      { name: 'TypeScript',   Icon: SiTypescript,  color: '#3178c6' },
      { name: 'JavaScript',   Icon: SiJavascript,  color: '#f7df1e' },
      { name: 'CSS3',         Icon: FaCss3Alt,     color: '#2965f1' },
      { name: 'HTML5',        Icon: FaHtml5,       color: '#e34f26' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & AI',
    color: '#a78bfa',
    techs: [
      { name: 'Redis',      Icon: SiRedis,       color: '#dc382d' },
      { name: 'PostgreSQL', Icon: SiPostgresql,  color: '#4169e1' },
      { name: 'MongoDB',    Icon: SiMongodb,     color: '#47a248' },
      { name: 'GraphQL',    Icon: SiGraphql,     color: '#e10098' },
      { name: 'Node.js',    Icon: SiNodedotjs,   color: '#3c873a' },
      { name: 'Python',     Icon: SiPython,      color: '#4b8bbe' },
      { name: 'TensorFlow', Icon: SiTensorflow,  color: '#ff6f00' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Beyond',
    color: '#38bdf8',
    techs: [
      { name: 'Firebase',      Icon: SiFirebase, color: '#ffca28' },
      { name: 'Solidity',      Icon: SiSolidity, color: '#cbd5e1' },
      { name: 'React Native',  Icon: SiReact,    color: '#61dafb' },
      { name: 'Linux',         Icon: SiLinux,    color: '#e5e7eb' },
      { name: 'GitHub',        Icon: SiGithub,   color: '#e5e7eb' },
      { name: 'AWS',           Icon: FaAws,      color: '#ff9900' },
      { name: 'Docker',        Icon: SiDocker,   color: '#2496ed' },
    ],
  },
];

const ROW_H  = 58;
const STEP_X = 24;
const SIZE   = 50;

function Branch({ branch, branchIndex }) {
  const n = branch.techs.length;
  const width  = (n - 1) * STEP_X + SIZE;
  const height = (n - 1) * ROW_H + SIZE;
  const gradId = `tt-grad-${branch.id}`;

  return (
    <div className="flex flex-col items-start">
      <div className="relative" style={{ width, height }}>
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={branch.color} stopOpacity="0.05" />
              <stop offset="100%" stopColor={branch.color} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <line
            x1={SIZE / 2} y1={height - SIZE / 2}
            x2={width - SIZE / 2} y2={SIZE / 2}
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
          />
        </svg>

        {branch.techs.map((t, i) => (
          <motion.div
            key={t.name}
            title={t.name}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: SIZE, height: SIZE,
              left: i * STEP_X,
              bottom: i * ROW_H,
              background: 'var(--bg-card)',
              border: `1.5px solid ${t.color}55`,
              boxShadow: `0 4px 18px ${t.color}22`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            whileHover={{ scale: 1.12, borderColor: t.color }}
            transition={{ duration: 0.4, delay: branchIndex * 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <t.Icon size={20} style={{ color: t.color }} />
          </motion.div>
        ))}
      </div>
      <p
        className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--text-muted)' }}
      >
        {branch.label}
      </p>
    </div>
  );
}

/* ── Mobile fallback: flat wrapped grid, grouped by branch ── */
function MobileBranch({ branch }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>
        {branch.label}
      </p>
      <div className="flex flex-wrap gap-3">
        {branch.techs.map((t) => (
          <div
            key={t.name}
            title={t.name}
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: 'var(--bg-card)',
              border: `1.5px solid ${t.color}55`,
              boxShadow: `0 4px 14px ${t.color}1c`,
            }}
          >
            <t.Icon size={17} style={{ color: t.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechTree() {
  return (
    <div className="relative">
      <div className="hidden md:flex justify-center gap-8 lg:gap-14 overflow-x-auto pb-2">
        {BRANCHES.map((b, i) => (
          <Branch key={b.id} branch={b} branchIndex={i} />
        ))}
      </div>
      <div className="md:hidden space-y-8">
        {BRANCHES.map((b) => (
          <MobileBranch key={b.id} branch={b} />
        ))}
      </div>
    </div>
  );
}
