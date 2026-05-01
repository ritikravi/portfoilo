import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--muted)] mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for internships & collaborations
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          I build things that{' '}
          <span className="gradient-text">think,</span>
          <br />
          connect, and{' '}
          <span className="gradient-text">matter.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p {...fadeUp(0.35)} className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-10">
          Full Stack Developer · AI Enthusiast · IoT Builder
          <br />
          <span className="text-[var(--fg)] font-medium">Turning student problems into intelligent products.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.45)} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full border border-[var(--border)] text-[var(--fg)] font-semibold hover:bg-[var(--card)] transition-all hover:scale-105 active:scale-95"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.55)} className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            { value: '6+', label: 'Projects Shipped' },
            { value: '7+', label: 'Hackathons' },
            { value: '3', label: 'Tech Domains' },
            { value: 'RISC', label: 'Club Member · LPU' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black gradient-text">{value}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.65)} className="flex items-center justify-center gap-5">
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
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-all hover:scale-110"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <HiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
