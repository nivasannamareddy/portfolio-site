import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import Section from './Section'

const Timeline = ({ id, items, eyebrow, title, subtitle }) => (
  <Section id={id} eyebrow={eyebrow} title={title} subtitle={subtitle}>
    <div className="relative pl-4 sm:pl-8">
      <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-mint/70 via-white/20 to-transparent sm:left-6" />
      <div className="space-y-8">
        {items.map((item, idx) => {
          const Icon = item.type === 'education' ? GraduationCap : Briefcase
          return (
            <motion.div
              key={`${item.title}-${item.period}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative rounded-3xl border border-black/10 bg-white/80 p-5 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30"
            >
              <div className="absolute -left-[22px] top-5 flex h-10 w-10 items-center justify-center rounded-full bg-ocean text-white shadow-glow sm:-left-[26px]">
                <Icon size={18} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.period}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.org}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-700 dark:text-slate-200">
                  <MapPin size={14} />
                  {item.location}
                </div>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-mint" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {item.tech && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-200">
                  {item.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-white/10 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  </Section>
)

export default Timeline
