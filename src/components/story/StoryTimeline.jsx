import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StoryTimeline = ({ id, eyebrow, title, items }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-card', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id={id} ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-white">{title}</h2>
        </div>
        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <div key={`${item.title}-${item.period}`} className="timeline-card rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.org}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryTimeline
