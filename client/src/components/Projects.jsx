import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects as staticProjects } from '../data/portfolio';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import api from '../api';

const categories = ['All', 'AI', 'IoT', 'Robotics', 'Web'];

const categoryColors = {
  AI: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  IoT: 'bg-green-500/10 text-green-400 border-green-500/20',
  Robotics: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[project.category] || 'bg-gray-500/10 text-gray-400'}`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1">{project.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-all"
                aria-label="GitHub">
                <FaGithub size={14} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-all"
                aria-label="Live Demo">
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>
        </div>

        <p className="text-[var(--muted)] text-sm leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-6 py-3 flex items-center justify-between text-sm text-[var(--muted)] hover:text-[var(--fg)] border-t border-[var(--border)] transition-colors"
      >
        <span>{expanded ? 'Hide case study' : 'View case study'}</span>
        {expanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
      </button>

      {/* Case study */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 grid md:grid-cols-3 gap-4">
              {[
                { label: '🔴 Problem', content: project.problem },
                { label: '🟢 Solution', content: project.solution },
                { label: '📈 Impact', content: project.impact },
              ].map(({ label, content }) => (
                <div key={label} className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                  <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">{label}</div>
                  <p className="text-sm text-[var(--fg)] leading-relaxed">{content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState(staticProjects);

  // Fetch from API — merge with static, API projects appear first if any exist
  useEffect(() => {
    api.get('/api/projects').then(({ data }) => {
      if (data && data.length > 0) {
        // Combine: API projects + static ones not already in API (by title)
        const apiTitles = data.map(p => p.title.toLowerCase());
        const staticOnly = staticProjects.filter(p => !apiTitles.includes(p.title.toLowerCase()));
        setProjects([...data, ...staticOnly]);
      }
    }).catch(() => {
      // silently fall back to static data
    });
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">Projects</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Things I've built
              <br />
              <span className="gradient-text">that actually work.</span>
            </h2>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
