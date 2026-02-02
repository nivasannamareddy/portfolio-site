import { Github, Linkedin } from 'lucide-react'

const Footer = ({ personal, socials }) => (
  <footer className="relative mt-12 border-t border-white/5 bg-black/20">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{personal.name}</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Crafted with React, Tailwind, and Framer Motion. Built for smooth hiring conversations.
        </p>
      </div>
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ocean/10 p-2 transition hover:bg-ocean/20 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ocean/10 p-2 transition hover:bg-ocean/20 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <Github size={16} />
        </a>
        <a
          href="#hero"
          className="rounded-full bg-ocean/10 px-3 py-2 text-xs uppercase tracking-[0.2em] dark:bg-white/10"
        >
          Back to top
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
