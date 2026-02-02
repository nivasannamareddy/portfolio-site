import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Link as LinkIcon } from 'lucide-react'
import Section from './Section'

const Projects = ({ id, projects }) => {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))],
    [projects]
  )
  const [filter, setFilter] = useState('All')
  const filtered = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <Section
      id={id}
      eyebrow="Projects"
      title="Selected work across analytics, forecasting, and ML systems."
      subtitle="Each project pairs modeling with dashboards and storytelling to drive action."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === cat ? 'bg-accent text-midnight shadow-glow' : 'bg-white/5 text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project, index) => {
          const backgroundImage = project.images?.[0]
          const backgroundStyle = {
            backgroundImage: backgroundImage
              ? `linear-gradient(135deg, rgba(15,47,83,0.85), rgba(12,18,34,0.9)), url(${backgroundImage})`
              : 'linear-gradient(135deg, rgba(15,47,83,0.85), rgba(12,18,34,0.9))',
          }
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30"
            >
              <div className="h-44 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]" style={backgroundStyle} />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent">{project.period}</p>
                    <p className="text-xl font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project.links?.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
                      >
                        <LinkIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-200">{project.description}</p>
                <p className="text-sm font-semibold text-mint">{project.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-700 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-accent">{project.category}</span>
                <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200">
                  View details <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

export default Projects
