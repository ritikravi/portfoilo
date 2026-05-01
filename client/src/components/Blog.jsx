import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../data/portfolio';
import { HiArrowRight } from 'react-icons/hi';

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-[var(--muted)]">{blog.readTime} min read</span>
      </div>

      <h3 className="font-bold text-[var(--fg)] text-lg mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
        {blog.title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{blog.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted)]">{blog.date}</span>
        <span className="flex items-center gap-1 text-sm text-[var(--accent)] font-medium group-hover:gap-2 transition-all">
          Read more <HiArrowRight size={14} />
        </span>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const navigate = useNavigate();
  return (
    <section id="blog" className="py-32 px-6 bg-[var(--card)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">Blog</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Thinking out loud
              <br />
              <span className="gradient-text">while building.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/blog/hackai-agentic-ai')}
            className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all">
            All posts <HiArrowRight size={14} />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
