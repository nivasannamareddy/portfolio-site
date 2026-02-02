import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, SunMedium, X } from 'lucide-react'

const Navigation = ({ sections, activeSection, onNavigate, theme, onThemeToggle, resumeUrl }) => {
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'

  const handleClick = (id) => {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <a
        href="#hero"
        className="absolute left-4 top-[-40px] rounded-md bg-accent px-3 py-2 text-sm font-semibold text-midnight shadow focus:top-4"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="glass flex items-center justify-between rounded-full px-4 py-3 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-mint/80 text-sm font-bold text-midnight shadow-glow">
              NA
            </div>
            <div>
              <p className="font-display text-lg">Nivas Annamareddy</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Data Analyst & ML Engineer
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 sm:flex">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? isDark
                      ? 'bg-white/15 text-white'
                      : 'bg-ocean/10 text-ocean'
                    : isDark
                      ? 'text-slate-300 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-ocean/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-midnight shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
            >
              Download Resume
            </a>
            <button
              onClick={onThemeToggle}
              className={`rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
                isDark ? 'bg-white/10 text-slate-200 hover:bg-white/20' : 'bg-ocean/10 text-ocean hover:bg-ocean/20'
              }`}
            >
              {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
            </button>
          </nav>
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onThemeToggle}
              className={`rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
                isDark ? 'bg-white/10 text-slate-200 hover:bg-white/20' : 'bg-ocean/10 text-ocean hover:bg-ocean/20'
              }`}
            >
              {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={`rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
                isDark ? 'bg-white/10 text-slate-200 hover:bg-white/20' : 'bg-ocean/10 text-ocean hover:bg-ocean/20'
              }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-6xl px-4 sm:hidden"
          >
            <div className="glass rounded-3xl px-4 py-3 shadow-lg shadow-black/20">
              <div className="flex flex-col gap-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={`w-full rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                      activeSection === item.id
                        ? isDark
                          ? 'bg-white/15 text-white'
                          : 'bg-ocean/10 text-ocean'
                        : isDark
                          ? 'text-slate-200 hover:bg-white/10'
                          : 'text-slate-700 hover:bg-ocean/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-midnight shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
