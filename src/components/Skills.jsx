import { motion } from 'framer-motion';
import { SectionHeader, Badge, stagger, viewportOnce } from './motion';
import { SKILLS } from './data';

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Skills"
          heading="What I work with"
          sub="Technologies I reach for when building production software."
        />

        <motion.div
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.07)}
        >
          {Object.entries(SKILLS).map(([category, items]) => (
            <motion.div
              key={category}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-xl p-6 card-hover"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
