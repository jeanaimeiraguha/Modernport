import { motion } from 'framer-motion';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { SKILL_GROUPS } from './data';
import { getTechIcon } from './techIcons';

function SkillRow({ skill }) {
  const { Icon, color } = getTechIcon(skill.name);
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
      className="card-notch p-6 sm:p-7"
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
