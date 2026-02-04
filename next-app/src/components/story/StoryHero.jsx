import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StoryHero = ({ data }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.querySelectorAll('span'), {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
      })
      gsap.from('.hero-intro', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative flex min-h-screen items-center bg-[#0B0F19] py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow hero-intro text-cyan-200">Hello, I’m</p>
          <h1 ref={titleRef} className="mt-4 font-display text-4xl text-white sm:text-6xl">
            <span className="block">{data.name}</span>
          </h1>
          <p className="hero-intro mt-4 text-xl text-slate-300">{data.title}</p>
          <p className="hero-intro mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{data.bio}</p>
          <div className="hero-intro mt-8 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-cyan-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight transition hover:-translate-y-0.5"
              href={data.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
            <a
              className="rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-4">
          <div className="absolute inset-0 rounded-full border border-cyan-300/30 blur-2xl" />
          <div className="relative h-80 w-80 overflow-hidden rounded-full border border-white/20 shadow-lg sm:h-96 sm:w-96">
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.name}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoryHero
