import { motion as Motion } from 'framer-motion'

const StoryPublications = ({ items }) => (
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
        <h2 className="section-title mt-4">Applied research and publications</h2>
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[color:var(--slate)]">
          Lower in the hierarchy, but still useful for validating technical depth.
        </p>
      </Motion.div>

      <div className="mt-8 border-t border-white/10">
        {items.map((pub, index) => (
          <Motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
            className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-6"
          >
            <span className="font-display text-[2rem] leading-none text-[color:var(--accent)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-[1.55rem] leading-tight text-white">{pub.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--slate)]">
                {pub.description}
              </p>
            </div>
            <div>
              <a
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-[0.9rem] border border-white/10 px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--text)] transition hover:border-[rgba(124,199,255,0.24)] hover:text-white"
              >
                Read
              </a>
            </div>
          </Motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default StoryPublications
