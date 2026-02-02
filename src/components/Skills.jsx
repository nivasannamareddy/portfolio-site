import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Section from './Section'

const Skills = ({ id, skills }) => {
  const [active, setActive] = useState(skills[0]?.category)
  const activeSkills = skills.find((s) => s.category === active) || skills[0]

  return (
    <Section
      id={id}
      eyebrow="Skills"
      title="A toolkit built for analytics, machine learning, and clear storytelling."
      subtitle="Hands-on with Python, SQL, BI tools, and production-ready ML workflows."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-3xl border border-black/10 bg-white/80 p-4 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <Sparkles size={16} /> Focus Areas
            </p>
            <div className="mt-4 space-y-2">
              {skills.map((skill) => (
                <button
                  key={skill.category}
                  onClick={() => setActive(skill.category)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    active === skill.category
                      ? 'bg-ocean/10 text-ocean shadow-inner shadow-black/40 dark:bg-white/15 dark:text-white'
                      : 'text-slate-700 hover:bg-ocean/10 dark:text-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {skill.category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-accent">Depth</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {activeSkills?.category}
                </p>
              </div>
              <div className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                Updated
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {activeSkills?.items.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">{item.level}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-2 rounded-full bg-gradient-to-r from-mint to-accent shadow-glow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {skills
              .filter((s) => s.category !== activeSkills?.category)
              .slice(0, 2)
              .map((skill) => (
                <div
                  key={skill.category}
                  className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{skill.category}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {skill.items.map((item) => (
                      <span key={item.name} className="rounded-full bg-white/10 px-3 py-1">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Skills
