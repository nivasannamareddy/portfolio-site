import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'

const StoryGithub = ({ githubUrl, projects }) => {
  const repositories = projects
    .filter((p) => p.links?.repo && p.links.repo !== '#')
    .slice(0, 3)

  if (!githubUrl && !repositories.length) return null

  return (
    <section id="github" className="relative py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-14">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[15rem]"
          >
            <p className="eyebrow">Code</p>
            <h2 className="section-title mt-4">Code that shows execution, not just intent</h2>

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-[0.9rem] px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition duration-200 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(56,189,248,0.22)]"
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
              >
                <Github size={15} />
                View GitHub
              </a>
            )}
          </Motion.div>

          <div className="border-t border-white/[0.08]">
            {repositories.map((project, index) => (
              <Motion.article
                key={project.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group grid gap-4 border-b border-white/[0.08] py-5 transition-colors duration-200 hover:border-[rgba(56,189,248,0.18)] md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-[1.55rem] leading-tight text-[color:var(--text)]">
                    {project.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[0.7rem] text-[color:var(--slate)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:self-center">
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[0.85rem] border border-white/[0.08] px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--text)] transition duration-200 hover:border-[rgba(56,189,248,0.3)] hover:bg-[rgba(56,189,248,0.05)]"
                  >
                    <ArrowUpRight size={14} />
                    View Repo
                  </a>
                </div>
              </Motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoryGithub
