import { motion } from 'framer-motion';
import { FaCode, FaAws, FaCss3Alt } from 'react-icons/fa';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5,
  SiNodedotjs, SiPostgresql, SiMongodb, SiRedis, SiFirebase, SiGraphql,
  SiTailwindcss, SiRedux, SiTensorflow, SiOpencv, SiPython, SiSolidity,
  SiWeb3Dotjs, SiDocker, SiGithubactions, SiNginx,
} from 'react-icons/si';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { SKILL_GROUPS } from './data';

const ICONS = {
  'React':           { Icon: SiReact,        color: '#61DAFB' },
  'Next.js':         { Icon: SiNextdotjs,     color: '#ffffff' },
  'TypeScript':      { Icon: SiTypescript,    color: '#3178C6' },
  'JavaScript':      { Icon: SiJavascript,    color: '#F7DF1E' },
  'React Native':    { Icon: SiReact,         color: '#61DAFB' },
  'HTML5':           { Icon: SiHtml5,         color: '#E34F26' },
  'Node.js':         { Icon: SiNodedotjs,     color: '#3C873A' },
  'PostgreSQL':      { Icon: SiPostgresql,    color: '#4169E1' },
  'MongoDB':         { Icon: SiMongodb,       color: '#47A248' },
  'Redis':           { Icon: SiRedis,         color: '#DC382D' },
  'Firebase':        { Icon: SiFirebase,      color: '#FFCA28' },
  'GraphQL':         { Icon: SiGraphql,       color: '#E10098' },
  'Tailwind CSS':    { Icon: SiTailwindcss,   color: '#38BDF8' },
  'Redux Toolkit':   { Icon: SiRedux,         color: '#764ABC' },
  'Zustand':         { Icon: FaCode,          color: '#ff8a65' },
  'CSS3':            { Icon: FaCss3Alt,       color: '#1572B6' },
  'TensorFlow':      { Icon: SiTensorflow,    color: '#FF6F00' },
  'OpenCV':          { Icon: SiOpencv,        color: '#5C3EE8' },
  'Python':          { Icon: SiPython,        color: '#3776AB' },
  'Solidity':        { Icon: SiSolidity,      color: '#a78bfa' },
  'Web3.js':         { Icon: SiWeb3Dotjs,     color: '#F16822' },
  'YOLO':            { Icon: FaCode,          color: '#facc15' },
  'Docker':          { Icon: SiDocker,        color: '#2496ED' },
  'AWS':             { Icon: FaAws,           color: '#FF9900' },
  'GitHub Actions':  { Icon: SiGithubactions, color: '#2088FF' },
  'Nginx':           { Icon: SiNginx,         color: '#009639' },
};

function SkillRow({ skill }) {
  const entry = ICONS[skill.name] || { Icon: FaCode, color: 'var(--accent)' };
  const { Icon, color } = entry;
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, color }}
      >
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{skill.name}</p>
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{skill.level}</p>
      </div>
    </div>
  );
}

function GroupCard({ group }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <p
        className="font-display font-bold mb-5"
        style={{ fontSize: '1.0625rem', color: group.color, letterSpacing: '-0.02em' }}
      >
        {group.title}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {group.skills.map((s) => <SkillRow key={s.name} skill={s} />)}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="My Skills"
          heading={<>Tools I reach<br />for every day.</>}
          sub="From intelligent systems to decentralised protocols — the technologies I use to build across the full spectrum of modern software."
        />

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
        >
          {SKILL_GROUPS.map((g) => (
            <GroupCard key={g.title} group={g} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
