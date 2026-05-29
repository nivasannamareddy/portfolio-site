import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const StoryNav = ({ sections, activeSection, personal, resumeUrl }) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(12,17,24,0.76)] backdrop-blur-2xl">
      <div className="section-shell flex h-[74px] items-center justify-between gap-6">
        <a href="#hero" className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(129,140,248,0.12))' }}
          >
            NA
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[color:var(--text)]">{personal.name}</p>
            <p className="truncate text-[0.67rem] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {personal.title}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative pb-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition ${
                  isActive
                    ? 'text-[color:var(--text)]'
                    : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
                }`}
              >
                {section.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 h-px w-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <
            href="#contact"
            className="inline-flex rounded-[0.85rem] border border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.08)] px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[color:var(--accent)] transition duration-200 hover:scale-[1.02] hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)]"
          >
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex rounded-[0.85rem] border border-white/10 p-2 text-[color:var(--text)] transition hover:bg-white/[0.04] lg:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-white/10 lg:hidden"
          >
            <div className="section-shell py-4">
              <nav className="grid gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-[0.95rem] border border-white/10 px-4 py-3 text-sm text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.24)]"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default StoryNav
