import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StoryAbout = ({ personal, certifications, highlights }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-block', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-20">
      <div className="mx-auto grid max-w-5xl gap-10">
        <div className="about-block">
          <p className="eyebrow">About</p>
          <h2 className="mt-3 font-display text-3xl text-white">Professional summary</h2>
          <p className="mt-4 text-lg text-slate-300">{personal.bio}</p>
        </div>
        <div className="about-block grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-xs text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="about-block">
          <p className="eyebrow">Certifications</p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-300">
            {certifications.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default StoryAbout
