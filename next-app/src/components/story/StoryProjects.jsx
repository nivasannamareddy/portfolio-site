import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const StoryProjects = ({ projects }) => {
  const sectionRef = useRef(null)

  const highlightPercents = (text) => {
    if (!text) return text
    return text.split(/(\d+%)/g).map((part, index) =>
      /\d+%/.test(part) ? (
        <span key={`${part}-${index}`} className="font-semibold text-white">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow">Projects</p>
          <h2 className="mt-3 font-display text-3xl text-white">Selected work</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            A focused set of analytics and ML projects that highlight measurable impact.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => {
            const demoLink = project.links?.demo && project.links.demo !== '#' ? project.links.demo : null
            const repoLink = project.links?.repo && project.links.repo !== '#' ? project.links.repo : null
            const image = project.images?.[0]
            return (
              <article
                key={project.title}
                className="project-card overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div
                  className="h-40 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5"
                  style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                  aria-hidden="true"
                />
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{project.period}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
                <p className="mt-3 text-sm font-semibold text-white">{highlightPercents(project.impact)}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {repoLink ? (
                    <a
                      href={repoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-cyan-300/60 hover:text-white"
                    >
                      <Github size={16} /> View Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-slate-500">
                      <Github size={16} /> View Code
                    </span>
                  )}
                  {demoLink && (
                    <a
                      href={demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-cyan-300/60 hover:text-white"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StoryProjects
