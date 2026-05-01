import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

function SkillCard({ category, data, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-all group"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{data.icon}</span>
        <h3 className="font-bold text-[var(--fg)]">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.04 }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/40 transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[var(--card)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">Skills</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            The stack behind
            <br />
            <span className="gradient-text">the solutions.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, data], i) => (
            <SkillCard key={category} category={category} data={data} index={i} />
          ))}
        </div>

        {/* Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--accent)]/5"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">Currently Exploring</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['LangChain', 'RAG Systems', 'Vector Databases', 'Edge AI', 'Next.js', 'Docker'].map(item => (
              <span key={item} className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
