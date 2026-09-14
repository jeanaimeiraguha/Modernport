import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaAws } from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiRedis, SiPostgresql, SiMongodb, SiGraphql, SiNodedotjs, SiPython, SiTensorflow,
  SiSolidity, SiEthereum, SiLinux, SiGithub, SiDocker,
} from 'react-icons/si';
import { SectionHeader, viewportOnce } from './motion';

const CATEGORIES = [
  { id: 'frontend',   label: 'Frontend',   color: '#38bdf8' },
  { id: 'backend',    label: 'Backend',    color: '#34d399' },
  { id: 'database',   label: 'Database',   color: '#14b8a6' },
  { id: 'devops',     label: 'DevOps',     color: '#22d3ee' },
  { id: 'mobile',     label: 'Mobile',     color: '#fb7185' },
  { id: 'ai',         label: 'AI / ML',    color: '#f59e0b' },
  { id: 'blockchain', label: 'Blockchain', color: '#a78bfa' },
];
const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.color]));

/* Each column is a chevron: an apex icon at the bottom, with an arm of
   icons rising to the left and another rising to the right. */
const COLUMNS = [
  {
    id: 'web',
    apex:  { name: 'Next.js',    Icon: SiNextdotjs,  cat: 'frontend' },
    left:  [
      { name: 'TypeScript', Icon: SiTypescript, cat: 'frontend' },
      { name: 'JavaScript', Icon: SiJavascript, cat: 'frontend' },
      { name: 'HTML5',      Icon: FaHtml5,      cat: 'frontend' },
    ],
    right: [
      { name: 'React',        Icon: SiReact,       cat: 'frontend' },
      { name: 'CSS3',         Icon: FaCss3Alt,     cat: 'frontend' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, cat: 'frontend' },
    ],
  },
  {
    id: 'data',
    apex:  { name: 'Node.js', Icon: SiNodedotjs, cat: 'backend' },
    left:  [
      { name: 'Python',     Icon: SiPython,     cat: 'backend' },
      { name: 'GraphQL',    Icon: SiGraphql,    cat: 'backend' },
      { name: 'PostgreSQL', Icon: SiPostgresql, cat: 'database' },
    ],
    right: [
      { name: 'MongoDB', Icon: SiMongodb, cat: 'database' },
      { name: 'Redis',   Icon: SiRedis,   cat: 'database' },
      { name: 'Docker',  Icon: SiDocker,  cat: 'devops' },
    ],
  },
  {
    id: 'infra',
    apex:  { name: 'AWS', Icon: FaAws, cat: 'devops' },
    left:  [
      { name: 'Linux',        Icon: SiLinux,  cat: 'devops' },
      { name: 'GitHub',       Icon: SiGithub, cat: 'devops' },
      { name: 'React Native', Icon: SiReact,  cat: 'mobile' },
    ],
    right: [
      { name: 'TensorFlow', Icon: SiTensorflow, cat: 'ai' },
      { name: 'Solidity',   Icon: SiSolidity,   cat: 'blockchain' },
      { name: 'Ethereum',   Icon: SiEthereum,   cat: 'blockchain' },
    ],
  },
];

const ARM     = 3;
const STEP_X  = 26;
const STEP_Y  = 56;
const SIZE    = 50;

const COL_W = 2 * ARM * STEP_X + SIZE;
const COL_H = ARM * STEP_Y + SIZE;

function nodePos(index) {
  // index: -ARM..-1 = left arm (far to near), 0 = apex, 1..ARM = right arm
  const cx = COL_W / 2;
  const cy = COL_H - SIZE / 2;
  return { x: cx + index * STEP_X, y: cy - Math.abs(index) * STEP_Y };
}

function Node({ tech, index, colIndex }) {
  const { x, y } = nodePos(index);
  const color = CAT[tech.cat];
  return (
    <motion.div
      title={tech.name}
      className="absolute rounded-full flex items-center justify-center"
      style={{
        width: SIZE, height: SIZE,
        left: x - SIZE / 2, top: y - SIZE / 2,
        background: 'var(--bg-card)',
        border: `1.5px solid ${color}55`,
        boxShadow: `0 4px 18px ${color}22`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      whileHover={{ scale: 1.14, borderColor: color }}
      transition={{ duration: 0.4, delay: colIndex * 0.15 + Math.abs(index) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <tech.Icon size={20} style={{ color }} />
    </motion.div>
  );
}

function Column({ col, colIndex }) {
  const apexPos = nodePos(0);
  const leftEnd  = nodePos(-ARM);
  const rightEnd = nodePos(ARM);
  const gradId = `tt-grad-${col.id}`;

  return (
    <div className="relative shrink-0" style={{ width: COL_W, height: COL_H }}>
      <svg className="absolute inset-0 pointer-events-none" width={COL_W} height={COL_H} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#5eead4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line x1={apexPos.x} y1={apexPos.y} x2={leftEnd.x}  y2={leftEnd.y}  stroke={`url(#${gradId})`} strokeWidth="1.5" />
        <line x1={apexPos.x} y1={apexPos.y} x2={rightEnd.x} y2={rightEnd.y} stroke={`url(#${gradId})`} strokeWidth="1.5" />
      </svg>

      {col.left.map((t, i) => (
        <Node key={t.name} tech={t} index={-(i + 1)} colIndex={colIndex} />
      ))}
      <Node tech={col.apex} index={0} colIndex={colIndex} />
      {col.right.map((t, i) => (
        <Node key={t.name} tech={t} index={i + 1} colIndex={colIndex} />
      ))}
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
      {CATEGORIES.map((c) => (
        <span key={c.id} className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* ── Mobile fallback: flat wrapped grid, grouped by column ── */
function MobileColumn({ col }) {
  const all = [...col.left, col.apex, ...col.right];
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {all.map((t) => (
        <div
          key={t.name}
          title={t.name}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'var(--bg-card)',
            border: `1.5px solid ${CAT[t.cat]}55`,
            boxShadow: `0 4px 14px ${CAT[t.cat]}1c`,
          }}
        >
          <t.Icon size={17} style={{ color: CAT[t.cat] }} />
        </div>
      ))}
    </div>
  );
}

export default function TechTree() {
  return (
    <div>
      <SectionHeader
        label="My expertise"
        heading={<>Skills &amp; Technologies.</>}
        sub="A toolkit spanning full-stack development, cloud infrastructure, and the frameworks I reach for daily — from frontend polish to backend resilience, shipped as clean, scalable code."
      />

      <div className="relative mt-14">
        <div className="hidden md:flex justify-center gap-10 lg:gap-16 overflow-x-auto pb-2">
          {COLUMNS.map((c, i) => (
            <Column key={c.id} col={c} colIndex={i} />
          ))}
        </div>
        <div className="md:hidden space-y-6">
          {COLUMNS.map((c) => (
            <MobileColumn key={c.id} col={c} />
          ))}
        </div>
        <Legend />
      </div>
    </div>
  );
}
