import { useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { Github } from 'lucide-react'

const getMetric = (impact = '') => impact.match(/(\d+%)/)?.[1] || 'Impact'

const chartBars = [52, 68, 44, 76, 60, 88, 72, 100]

const StoryFeaturedProject = ({ projects }) => {
  const featured = useMemo(
    () =>
      projects.find((p) => p.title === 'Airline Reservation Forecasting') ||
      [...projects].sort(
        (a, b) =>
          Number(getMetric(b.impact).replace('%', '')) - Number(getMetric(a.impact).replace('%', ''))
      )[0],
    [projects]
  )

  if (!featured) return null

  const metric = getMetric(featured.impact)
  const repoLink = featured.links?.repo && featured.links.repo !== '#' ? featured.links.repo : null

  return (
    <section id="featured" className="relative py-16 sm:py-20">
      <div className="section-shell">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Featured Project</p>
          <h2 className="section-title mt-4">{featured.title}</h2>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08]"
          style={{ background: 'rgba(18,25,38,0.7)' }}
        >
          {/* Top: header + metric */}
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/[0.08] p-6 sm:p-8">
            <div className="min-w-0">
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {featured.category} · {featured.period}
              </span>
              <p className="mt-3 max-w-2xl text-[1.02rem] leading-7 text-[color:var(--text)]">
                Forecasted pricing trends using ARIMA + Prophet and delivered decision-ready Power BI dashboards for revenue optimization.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[0.7rem] text-[color:var(--slate)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p
                className="font-display text-[4.2rem] leading-none bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(100deg, #38bdf8, #818cf8)' }}
              >
                {metric}
              </p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                Revenue ↑
              </p>
              {repoLink && (
                <a
                  href={repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-[0.85rem] border border-white/[0.08] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.3)]"
                >
                  <Github size={13} />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Bottom: simulated forecast chart */}
          <div className="flex items-end gap-1.5 p-6 sm:p-8 sm:pt-6" style={{ height: '160px' }}>
            {chartBars.map((h, i) => (
              <Motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 origin-bottom rounded-t"
                style={{
                  height: `${h}%`,
                  background:
                    i === chartBars.length - 1
                      ? 'linear-gradient(to top, #38bdf8, #818cf8)'
                      : i >= chartBars.length - 3
                      ? 'rgba(56,189,248,0.28)'
                      : 'rgba(255,255,255,0.07)',
                }}
              />
            ))}
            <div className="ml-4 shrink-0 space-y-1 self-center text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                <span className="text-[0.62rem] text-[color:var(--muted)]">Forecast</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="text-[0.62rem] text-[color:var(--muted)]">Actual</span>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default StoryFeaturedProject
