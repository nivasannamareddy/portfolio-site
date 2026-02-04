import { motion } from 'framer-motion'

const StoryNav = ({ sections, resumeUrl, linkedinUrl }) => (
  <header className="fixed inset-x-0 top-0 z-40 bg-[#0B0F19]/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <img
          src="/nivas-logo.png"
          alt="Nivas Annamareddy logo"
          className="h-8 w-8 rounded-full object-cover"
        />
        <p className="font-display text-sm uppercase tracking-[0.3em] text-white">Nivas Annamareddy</p>
      </div>
      <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="hover:text-white">
            {section.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        {linkedinUrl ? (
          <motion.a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:border-cyan-300/60 hover:text-white"
          >
            LinkedIn
          </motion.a>
        ) : null}
        <motion.a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:border-cyan-300/60"
        >
          Resume
        </motion.a>
      </div>
    </div>
  </header>
)

export default StoryNav
