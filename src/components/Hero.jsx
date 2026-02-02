import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'

const useTypewriter = (words, speed = 80, pause = 1600) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index % words.length]
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))

      if (!deleting && subIndex === currentWord.length) {
        setDeleting(true)
      } else if (deleting && subIndex === 0) {
        setDeleting(false)
        setIndex((prev) => prev + 1)
      }
    }, deleting ? speed / 1.5 : speed)

    const pauseTimeout =
      !deleting && subIndex === currentWord.length
        ? setTimeout(() => setDeleting(true), pause)
        : null

    return () => {
      clearTimeout(timeout)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [deleting, index, pause, speed, subIndex, words])

  return words[index % words.length].substring(0, subIndex)
}

const Hero = ({ id, data, highlights, socials }) => {
  const typed = useTypewriter(data.typed)
  const primaryLinks = useMemo(
    () => [
      { icon: Github, label: 'GitHub', href: socials.github },
      { icon: Linkedin, label: 'LinkedIn', href: socials.linkedin },
      { icon: Mail, label: 'Email', href: socials.email },
    ],
    [socials]
  )

  return (
    <section
      id={id}
      data-section
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-10 px-6 pb-24 pt-36 lg:flex-row lg:pb-32"
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <p className="tag mb-4 inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-mint" />
          Available for Data Analyst / ML roles
        </p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {data.headline}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
          <span className="rounded-full bg-white/10 px-3 py-2 font-semibold text-mint">
            {typed}
            <span className="animate-pulse">▌</span>
          </span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={18} />
            {data.location}
          </span>
        </div>
        <p className="mt-6 max-w-2xl text-lg text-slate-700 dark:text-slate-300">{data.bio}</p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
          <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-mint">
            New
          </span>
          {data.status}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-semibold text-midnight shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-800 transition hover:-translate-y-0.5 hover:bg-white/15 dark:text-slate-100"
            >
              <link.icon size={16} />
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="glass relative flex w-full max-w-[420px] flex-col gap-5 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-ocean to-midnight ring-2 ring-accent/50">
            {data.avatar ? (
              <img
                src={data.avatar}
                alt={`${data.name} avatar`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_50%)]" />
            )}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Profile Snapshot</p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">{data.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{data.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/70 p-3 dark:bg-white/5">
              <p className="text-lg font-semibold text-accent">{item.value}</p>
              <p className="text-sm text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 rounded-2xl bg-white/80 p-4 text-sm text-slate-800 dark:bg-white/5 dark:text-slate-200">
          <div className="flex items-center justify-between">
            <span>Email</span>
            <a href={`mailto:${data.email}`} className="text-mint hover:text-white">
              {data.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>Phone</span>
            <a href={`tel:${data.phone}`} className="text-mint hover:text-white">
              {data.phone}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>Location</span>
            <span className="text-slate-600 dark:text-slate-300">{data.location}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
