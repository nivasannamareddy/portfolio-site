import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StorySkills = ({ skills }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-row', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow">Skills</p>
          <h2 className="mt-3 font-display text-3xl text-white">Technical strengths</h2>
          <p className="mt-4 text-lg text-slate-300">Focused on analytics, ML, and visualization.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skills.map((category) => (
            <div key={category.category} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{category.category}</p>
              <div className="mt-4 space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="skill-row">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.name}</span>
                      <span className="text-slate-500">{item.level}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-white" style={{ width: `${item.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StorySkills
