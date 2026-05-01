import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail, HiCheckCircle } from 'react-icons/hi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">Contact</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Let's build something
            <br />
            <span className="gradient-text">worth talking about.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-[var(--muted)] leading-relaxed text-lg">
              Whether you're looking for a developer for your team, want to collaborate on a project, or just want to talk tech — my inbox is open.
            </p>

            <div className="space-y-4">
              <a href="mailto:ritikravi7724@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-all group">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                  <HiMail size={18} />
                </div>
                <div>
                  <div className="text-xs text-[var(--muted)] mb-0.5">Email</div>
                  <div className="font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">ritikravi7724@gmail.com</div>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: 'https://github.com/ritikravi', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ritik-raushan-626584383/', label: 'LinkedIn' },
                { icon: FaTwitter, href: 'https://x.com/ritikravi7724', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]/40 transition-all text-sm font-medium"
                >
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>

            <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </div>
              <p className="text-sm text-[var(--muted)]">Open to internships (AI / Full Stack), GDSC Lead, and interesting collaborations.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-green-500/20 bg-green-500/5">
                <HiCheckCircle size={48} className="text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-[var(--fg)] mb-2">Message sent!</h3>
                <p className="text-[var(--muted)]">I'll get back to you within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--muted)] mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--muted)] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)] mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)] mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm resize-none"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again or email directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
