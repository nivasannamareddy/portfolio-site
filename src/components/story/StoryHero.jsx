import { useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, MapPin } from 'lucide-react'

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}
const item = {
  initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const StoryHero = ({ data, highlights, socials }) => {
  const displayTitle = data.title?.replace(' | ', ' · ') || data.title

  const impactStrip = useMemo(
    () => highlights.slice(0, 3).map((h) => ({ value: h.value, label: h.label })),
    [highlights]
  )

  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/[0.08] pb-16 pt-6 sm:pb-24 sm:pt-10">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,17,24,1)_0%,rgba(12,17,24,0.92)_45%,rgba(12,17,24,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.09),transparent_32%),radial-gradient(circle_at_70%_70%,rgba(129,140,248,0.07),transparent_28%)]" />
      </div>

      {/* Ambient blobs */}
      <Motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[8%] -z-10 h-[540px] w-[480px] rounded-full"
        animate={{ scale: [1, 1.14, 1, 1.07, 1], x: [0, 22, 5, -10, 0], y: [0, -16, 5, 11, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 42% 50%, rgba(129,140,248,0.16) 0%, rgba(56,189,248,0.08) 42%, transparent 68%)',
          filter: 'blur(90px)',
        }}
      />
      <Motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] bottom-[12%] -z-10 h-[360px] w-[300px] rounded-full"
        animate={{ scale: [1, 1.09, 1, 1.05, 1], x: [0, -12, 3, 8, 0], y: [0, 10, -5, -9, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          background: 'radial-gradient(circle at 58% 50%, rgba(56,189,248,0.09) 0%, rgba(129,140,248,0.05) 42%, transparent 68%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_340px] lg:items-center lg:gap-20">
          {/* Left */}
          <Motion.div variants={container} initial="initial" animate="animate" className="max-w-3xl">
            {/* Status */}
            <Motion.div variants={item} className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--slate)]">
                {data.status}
              </span>
            </Motion.div>

            {/* Headline */}
            <Motion.h1
              variants={item}
              className="mt-7 font-display text-[clamp(2.35rem,4.6vw,4.7rem)] leading-[0.91] tracking-[-0.05em] text-[color:var(--text)]"
            >
              Building intelligent systems
              <br />
              that work under{' '}
              <span
                className="italic bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(100deg, #38bdf8 0%, #818cf8 100%)' }}
              >
                real constraints
              </span>
            </Motion.h1>

            {/* Sub */}
            <Motion.p variants={item} className="mt-6 max-w-[34rem] text-[1.02rem] leading-[1.75] text-[color:var(--slate)]">
              Multi-agent systems, ML pipelines, and compliance frameworks shipped with measurable impact across healthcare, finance, and HR workflows.
            </Motion.p>

            {/* Location */}
            <Motion.p variants={item} className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] text-[color:var(--muted)]">
              <MapPin size={13} />
              {data.location}
            </Motion.p>

            {/* CTAs */}
            <Motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-[0.95rem] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:shadow-[0_16px_36px_rgba(56,189,248,0.28)]"
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
              >
                View Projects
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </a>
            </Motion.div>

            {/* Impact strip */}
            <Motion.div variants={item} className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              {impactStrip.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'border-l border-white/[0.08] pl-5' : ''}>
                  <p
                    className="font-display text-[2.6rem] leading-none bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(100deg, #38bdf8, #818cf8)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Motion.div>
          </Motion.div>

          {/* Right: profile card */}
          <Motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[340px] lg:justify-self-end"
          >
            {/* Photo with gradient ring */}
            <div className="relative">
              {/* Glow behind photo */}
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.6rem] opacity-25 blur-2xl"
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
              />
              {/* Gradient border wrapper */}
              <div
                className="rounded-[1.35rem] p-[1.5px]"
                style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.55), rgba(129,140,248,0.55))' }}
              >
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt={data.name}
                    className="aspect-[4/5] w-full rounded-[1.25rem] bg-[color:var(--bg-elevated)] object-cover object-top shadow-[0_24px_56px_rgba(0,0,0,0.32)]"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full rounded-[1.25rem] bg-[color:var(--bg-elevated)]" />
                )}
              </div>
            </div>

            {/* Name + socials */}
            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <h2 className="font-display text-[2.6rem] leading-[0.93] text-[color:var(--text)]">
                {data.name}
              </h2>
              <p className="mt-2 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--slate)]">
                {displayTitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[0.8rem] border border-white/[0.08] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)] transition hover:border-[rgba(56,189,248,0.3)] hover:text-[color:var(--text)]"
                  >
                    <Linkedin size={13} />
                    LinkedIn
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[0.8rem] border border-white/[0.08] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)] transition hover:border-[rgba(56,189,248,0.3)] hover:text-[color:var(--text)]"
                  >
                    <Github size={13} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default StoryHero
