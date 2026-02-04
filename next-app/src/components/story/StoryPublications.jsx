import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Publish section with subtle reveal

gsap.registerPlugin(ScrollTrigger)

const StoryPublications = ({ items }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.publication-card', {
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
    <section id="publications" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow">Publications</p>
          <h2 className="mt-3 font-display text-3xl text-white">Research & publications</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Selected research work highlighting applied ML and data science outcomes.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((pub) => (
            <article
              key={pub.title}
              className="publication-card rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{pub.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{pub.description}</p>
              <div className="mt-4">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/60 hover:text-white"
                >
                  View Publication
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryPublications
