import { motion as Motion } from 'framer-motion'

const StoryAbout = ({ highlights }) => (
  <section id="impact" className="relative py-16 sm:py-20">
    <div className="section-shell">
      <div className="grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-14">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Impact</p>
          <h2 className="section-title mt-4">Proven business impact</h2>
        </Motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-5">
          {highlights.map((item, index) => (
            <Motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl border border-white/[0.08] p-5 transition-all duration-300 hover:border-[rgba(56,189,248,0.2)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)]"
              style={{ background: 'rgba(18,25,38,0.7)' }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p
                className="font-display text-[2.4rem] leading-tight bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
              >
                {item.value}
              </p>
              <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--text)]">
                {item.label}
              </p>
              {item.description ? (
                <p className="mt-2 text-[0.8rem] leading-6 text-[color:var(--muted)]">
                  {item.description}
                </p>
              ) : null}
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default StoryAbout
