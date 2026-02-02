import { motion } from 'framer-motion'
import Section from './Section'

const About = ({ id, personal, certifications, highlights }) => (
  <Section
    id={id}
    eyebrow="About"
    title="Master's student turning analytics and ML into business outcomes."
    subtitle={personal.bio}
  >
    <div className="grid gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-lg shadow-black/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        <div className="relative space-y-4">
          <h3 className="font-display text-2xl text-slate-900 dark:text-white">What I bring</h3>
          <p className="text-slate-700 dark:text-slate-200">
            I ship production-ready dashboards, forecasting models, and data stories that leaders can
            act on. My recent work improved Power BI delivery speed by 40%, optimized pricing with
            Prophet/ARIMA, and pushed a multilingual product to 50% higher engagement.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-2xl font-semibold text-accent">{item.value}</p>
                <p className="text-sm text-slate-800 dark:text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
          <h4 className="font-semibold text-slate-900 dark:text-white">Currently</h4>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            {personal.title}. Dean’s Excellence Scholar. Building ML, analytics, and dashboard projects
            while mentoring peers on SQL/Python.
          </p>
          <div className="mt-3 rounded-2xl bg-white/60 p-3 text-sm text-slate-800 dark:bg-white/5 dark:text-slate-200">
            <span className="font-semibold text-mint">Goal:</span> Secure a Data Analyst or ML Engineer role
            for 2026 with room to ship models and dashboards end-to-end.
          </div>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
          <h4 className="font-semibold text-slate-900 dark:text-white">Certifications</h4>
          <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200">
            {certifications.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-mint" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </Section>
)

export default About
