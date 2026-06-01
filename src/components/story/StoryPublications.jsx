import { motion as Motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const StoryPublications = ({ items }) => {
  if (!items?.length) return null

  return (
    <section id="publications" className="relative py-16 sm:py-20">
      <div className="section-shell">
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.28 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Research</p>
          <h2 className="section-title mt-4">Publications</h2>
          <p className="section-copy mt-3">Peer-reviewed research in machine learning and AI systems.</p>
        </Motion.div>

        <div className="mt-10 space-y-5">
          {items.map((pub, index) => (
            <Motion.article
              key={pub.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group rounded-2xl border border-white/[0.08] p-6 transition-all duration-300 hover:border-[rgba(56,189,248,0.2)] sm:p-7"
              style={{ background: 'rgba(14,20,30,0.7)' }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                    <span>{pub.publisher}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{pub.date}</span>
                  </div>
                  <h3 className="font-display text-[1.1rem] leading-snug text-[color:var(--text)] sm:text-[1.2rem]">
                    {pub.title}
                  </h3>
                  <p className="mt-3 text-[0.86rem] leading-7 text-[color:var(--slate)]">
                    {pub.description}
                  </p>
                </div>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-[0.85rem] border border-white/10 px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.3)] hover:text-[color:var(--accent)]"
                >
                  <ExternalLink size={13} />
                  View
                </a>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryPublications
