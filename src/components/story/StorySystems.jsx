import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { BarChart3, Cpu, Crosshair, Rocket, ScanSearch } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Define',
    desc: 'Scope the problem. Align stakeholders. Set measurable success criteria before touching data.',
    Icon: Crosshair,
  },
  {
    num: '02',
    title: 'Explore',
    desc: 'Deep EDA, data cleaning, and signal discovery. Understand the data before modeling it.',
    Icon: ScanSearch,
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Model selection, feature engineering, training loops, and rigorous validation.',
    Icon: Cpu,
  },
  {
    num: '04',
    title: 'Deploy',
    desc: 'Production pipelines, REST APIs, dashboards, and real-time monitoring.',
    Icon: Rocket,
  },
  {
    num: '05',
    title: 'Improve',
    desc: 'A/B tests, drift detection, retraining loops, and performance tuning.',
    Icon: BarChart3,
  },
]

const StepCard = ({ step, index, active, onEnter, onLeave }) => {
  const { num, title, desc, Icon } = step
  const isActive = active === index

  return (
    <Motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: 0.25 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      animate={{ y: isActive ? -4 : 0 }}
      className="relative flex cursor-default flex-col gap-3 rounded-2xl border p-5 transition-colors duration-300"
      style={{
        borderColor: isActive ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.07)',
        background: isActive ? 'rgba(56,189,248,0.05)' : 'rgba(18,25,38,0.5)',
        boxShadow: isActive ? '0 8px 32px rgba(56,189,248,0.10)' : 'none',
      }}
    >
      {/* Active dot indicator */}
      {isActive && (
        <Motion.span
          layoutId="pipDot"
          className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        />
      )}

      {/* Icon */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300"
        style={{
          borderColor: isActive ? 'rgba(56,189,248,0.35)' : 'rgba(255,255,255,0.09)',
          background: isActive ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
        }}
      >
        <Icon
          size={16}
          style={{ color: isActive ? '#38bdf8' : '#667388' }}
          className="transition-colors duration-300"
        />
      </div>

      {/* Text */}
      <div>
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
          {num}
        </p>
        <h3
          className="mt-0.5 font-display text-[1.18rem] leading-tight transition-colors duration-300"
          style={{ color: isActive ? '#38bdf8' : 'var(--text)' }}
        >
          {title}
        </h3>
        <p className="mt-2 text-[0.8rem] leading-[1.65] text-[color:var(--slate)]">{desc}</p>
      </div>
    </Motion.div>
  )
}

const StorySystems = () => {
  const [active, setActive] = useState(null)

  return (
    <section id="systems" className="relative py-16 sm:py-24">
      <div className="section-shell">
        {/* Heading */}
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Process</p>
          <h2 className="section-title mt-4">How I build ML systems</h2>
          <p className="mt-4 section-copy">
            Every project follows the same rigorous loop — understand the problem, explore the data, model carefully, ship reliably, then improve continuously.
          </p>
        </Motion.div>

        {/* Pipeline */}
        <div className="relative mt-12">
          {/* Animated connector line — desktop */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[2.15rem] hidden overflow-hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative h-px bg-white/[0.05]">
              <Motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="absolute inset-0 origin-left"
                style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
              />
              {/* Traveling shimmer particle */}
              <Motion.div
                className="absolute top-1/2 h-5 w-12 -translate-y-1/2 rounded-full blur-sm"
                style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }}
                animate={{ left: ['-10%', '110%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {steps.map((step, i) => (
              <StepCard
                key={step.title}
                step={step}
                index={i}
                active={active}
                onEnter={() => setActive(i)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySystems
