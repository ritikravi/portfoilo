import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">About</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 max-w-2xl">
            I don't just write code.
            <br />
            <span className="gradient-text">I engineer solutions.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <p className="text-[var(--muted)] leading-relaxed text-lg">
                I'm <span className="text-[var(--fg)] font-semibold">Ritik Raushan</span> — a developer who operates at the intersection of AI, web, and hardware. I don't pick one lane; I build across all three because the most interesting problems live at the boundaries.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-[var(--muted)] leading-relaxed">
                My journey started with curiosity about how things work — from writing my first Arduino sketch to deploying full-stack AI applications. Every project I build starts with a real problem, usually one I've seen students struggle with firsthand.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="text-[var(--muted)] leading-relaxed">
                Currently interning at <span className="text-[var(--fg)] font-medium">IIT Ropar</span> (CoE SEnSRS & TIH-AWaDH), building an AI-Based Landslide Monitoring & Early Warning System — embedded firmware on <span className="text-[var(--fg)] font-medium">Nordic nRF5340 + Zephyr RTOS</span>, multi-sensor RS485 integration, dual ML models trained on real field data, and Power BI analytics pipelines. Working alongside researchers and getting exposure to industry-grade hardware that most students never touch.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-[var(--muted)] leading-relaxed">
                I won 2nd place at <span className="text-[var(--fg)] font-medium">SemiXthon'26 at DTU</span> — not by having the most polished slides, but by shipping a working IoT system in 24 hours. That's the standard I hold myself to: real, working, impactful.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <p className="text-[var(--muted)] leading-relaxed">
                I'm a student at <span className="text-[var(--fg)] font-medium">Lovely Professional University, Punjab</span> — active member of the <span className="text-[var(--fg)] font-medium">RISC Club</span>, participated in 7+ hackathons, and working toward a <span className="text-[var(--fg)] font-medium">GDSC Lead</span> role to build a stronger developer community on campus.
              </p>
            </AnimatedSection>
          </div>

          {/* Values / Vision */}
          <div className="space-y-4">
            {[
              {
                icon: '🎯',
                title: 'Problem-First Thinking',
                desc: 'Every project starts with a real problem. I don\'t build for the sake of building — I build because something needs to exist.',
              },
              {
                icon: '🔗',
                title: 'Cross-Domain Builder',
                desc: 'AI + Web + Hardware. Most developers pick one. I connect all three to build systems that are genuinely novel.',
              },
              {
                icon: '🚀',
                title: 'Ship Fast, Learn Faster',
                desc: 'I believe in getting working prototypes out quickly, learning from real usage, and iterating. Perfection is the enemy of shipped.',
              },
              {
                icon: '🌱',
                title: 'Community-Driven Growth',
                desc: 'I grow by helping others grow. Mentoring, teaching, and sharing knowledge is core to how I operate.',
              },
            ].map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={0.1 + i * 0.1}>
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-semibold text-[var(--fg)] mb-1">{title}</div>
                      <div className="text-sm text-[var(--muted)] leading-relaxed">{desc}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
