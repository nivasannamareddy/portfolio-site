import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StoryProjects = ({ projects }) => {
  const sectionRef = useRef(null)

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
          <p className="mt-4 text-lg text-slate-300">
            A focused set of analytics and ML projects that highlight measurable impact.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="project-card rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{project.period}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{project.description}</p>
              <p className="mt-3 text-sm font-semibold text-white">{project.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 px-3 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryProjects
