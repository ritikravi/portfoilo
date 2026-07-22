import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/portfolio';

const typeColors = {
  hackathon: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  project: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  community: 'bg-green-500/10 text-green-400 border-green-500/20',
  internship: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

const typeLabels = {
  hackathon: '🏆 Hackathon',
  project: '⚡ Project',
  community: '🌱 Community',
  internship: '🎓 Internship',
};

function AchievementItem({ item, index, last }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex gap-5"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
        {!last && <div className="w-px flex-1 bg-[var(--border)] mt-2" />}
      </div>
      <div className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${typeColors[item.type]}`}>
            {typeLabels[item.type]}
          </span>
          <span className="text-xs text-[var(--muted)]">{item.year}</span>
        </div>
        <h3 className="font-bold text-[var(--fg)] mb-1">{item.title}</h3>
        <div className="text-sm text-[var(--accent)] mb-2">{item.org}</div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">Experience & Achievements</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Proof of work,
            <br />
            <span className="gradient-text">not just promises.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="space-y-6">
            {achievements.map((item, i) => (
              <AchievementItem key={i} item={item} index={i} last={i === achievements.length - 1} />
            ))}
          </div>

          {/* Community & Leadership */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
            >
              <h3 className="font-bold text-[var(--fg)] mb-4 text-lg">Community & Activities</h3>
              <div className="space-y-4">
                {[
                  { icon: '🎓', title: 'Research Intern — IIT Ropar', desc: 'Working on an AI-Based Landslide Monitoring & Early Warning System at CoE SEnSRS & TIH-AWaDH. Embedded firmware on Nordic nRF5340 + Zephyr RTOS, multi-sensor integration, and dual ML architecture.' },
                  { icon: '👕', title: 'Full Stack Dev — RMNA Street', desc: 'Built the full web presence for RMNA Street, a clothing startup focused on luxury streetwear. Owned the entire stack solo — from UI to deployment. Real-world practice shipping a product for an actual business.' },
                  { icon: '🟡', title: 'Google Student Ambassador 2026', desc: 'Selected for the Google Student Ambassador Program (Gemini Program). Representing Google\'s AI products and developer ecosystem at LPU.' },
                  { icon: '🏆', title: '7+ Hackathons', desc: 'Participated in 7–8 hackathons across AI, Web, and Hardware — including DTU and IIT Guwahati. Always shipped a working product.' },
                  { icon: '🔬', title: 'RISC Club — Active Member', desc: 'Member of the Research, Innovation & Science Club at LPU. Engaged in technical events, project showcases, and the campus developer community.' },
                  { icon: '🎯', title: 'GDSC Lead Aspirant', desc: 'Working toward GDSC Lead role to build a stronger developer community and run impactful technical events at LPU.' },
                  { icon: '🌐', title: 'Open Source & Building in Public', desc: 'All projects are open source on GitHub. Sharing learnings through blog posts and building in public.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <span className="text-xl shrink-0">{icon}</span>
                    <div>
                      <div className="font-semibold text-sm text-[var(--fg)]">{title}</div>
                      <div className="text-sm text-[var(--muted)] mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/5 to-purple-500/5"
            >
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-bold text-[var(--fg)] mb-2">The Vision</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Building toward a future where AI tools are accessible to every student — not just those at top institutions. The goal is to ship products that democratize learning and opportunity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
