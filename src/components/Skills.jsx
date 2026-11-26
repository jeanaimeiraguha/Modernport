import { motion } from 'framer-motion';
import { SectionHeader, stagger, viewportOnce } from './motion';
import { SKILL_GROUPS, LEVEL_PCT } from './data';
import { getTechIcon } from './techIcons';

/* A continuous logo rail, giving the section a sense of motion before you
   even scroll into it. */
const MARQUEE = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker',
  'AWS', 'Python', 'TensorFlow', 'Solidity', 'MongoDB', 'Tailwind CSS',
  'GraphQL', 'Redis', 'React Native',
];

function TechRail() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden" style={{ marginBottom: 76 }}>
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{ width: 130, background: 'linear-gradient(to right, var(--sub-bg), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{ width: 130, background: 'linear-gradient(to left, var(--sub-bg), transparent)' }}
      />

      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {row.map((name, i) => {
          const { Icon, color } = getTechIcon(name);
          return (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 shrink-0"
              style={{ padding: '0 30px' }}
            >
              <Icon size={23} style={{ color }} />
              <span
                style={{
                  color: 'var(--heading)',
                  fontWeight: 600,
                  fontSize: 15,
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Each skill gets a meter that fills once it scrolls into view. */
function SkillRow({ skill, delay }) {
  const { Icon, color } = getTechIcon(skill.name);
  const pct = LEVEL_PCT[skill.level] ?? 60;

  return (
    <div>
      <div className="flex items-center gap-2.5" style={{ marginBottom: 9 }}>
        <Icon size={16} style={{ color, flexShrink: 0 }} />
        <span
          className="flex-1 truncate"
          style={{ color: 'var(--heading)', fontWeight: 600, fontSize: 14.5 }}
        >
          {skill.name}
        </span>
        <span
          className="nums shrink-0"
          style={{ color: 'var(--muted)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em' }}
        >
          {skill.level}
        </span>
      </div>

      <div className="meter" role="presentation">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}

function GroupCard({ group, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="qt-card hover-lift edge-wipe"
      style={{ padding: '32px 28px' }}
    >
      <div className="flex items-center gap-3" style={{ marginBottom: 26 }}>
        <span
          className="inline-flex items-center justify-center shrink-0 nums"
          style={{
            width: 36, height: 36,
            background: 'var(--primary)', color: '#ffffff',
            fontSize: 13, fontWeight: 700,
          }}
        >
          0{index + 1}
        </span>
        <h4 style={{ marginBottom: 0 }}>{group.title}</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5">
        {group.skills.map((s, i) => (
          <SkillRow key={s.name} skill={s} delay={i * 0.06} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="qt-section bg-sub overflow-hidden">
      <div className="qt-container">
        <TechRail />

        <SectionHeader
          label="My Skills"
          heading="Technologies I work with"
          sub="Across intelligent systems, decentralised protocols and cloud infrastructure — the stack I use to build end to end."
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-7"
          style={{ marginTop: 60 }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.09)}
        >
          {SKILL_GROUPS.map((g, i) => (
            <GroupCard key={g.title} group={g} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
