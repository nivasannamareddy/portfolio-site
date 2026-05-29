import { motion as Motion } from 'framer-motion'

const StoryCertifications = ({ items }) => {
  if (!items?.length) return null

  return (
    <section id="certifications" className="relative pb-16 pt-2 sm:pb-20">
      <div className="section-shell border-t border-white/[0.08] pt-8">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">Certifications</p>
            <h2 className="mt-4 font-display text-[1.6rem] leading-tight text-[color:var(--text)]">
              Industry credentials
            </h2>
            <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
              {String(items.length).padStart(2, '0')} credentials
            </p>
          </Motion.div>

          <div className="max-w-3xl">
            {items.map((cert, index) => (
              <Motion.div
                key={cert}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid gap-3 border-t border-white/[0.08] py-4 pl-0 transition-colors duration-200 sm:grid-cols-[54px_1fr]"
              >
                {/* Left accent on hover */}
                <div
                  className="pointer-events-none absolute -left-1 bottom-2 top-2 w-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to bottom, #38bdf8, #818cf8)' }}
                />
                <p className="pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-[0.94rem] leading-7 text-[color:var(--text)]">{cert}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoryCertifications
