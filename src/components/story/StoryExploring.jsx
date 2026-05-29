import { motion as Motion } from 'framer-motion'

const topics = ['LLMs', 'MLOps', 'Scalable ML Systems']

const StoryExploring = () => (
  <section id="exploring" className="relative py-12 sm:py-14">
    <div className="section-shell border-t border-white/10 pt-8">
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.28 }}
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="eyebrow">Currently Exploring</p>
          <h2 className="mt-4 font-display text-[2rem] leading-tight text-white">
            Staying close to the next layer of ML systems work
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-white/10 px-4 py-2 text-[0.74rem] uppercase tracking-[0.16em] text-[color:var(--slate)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </Motion.div>
    </div>
  </section>
)

export default StoryExploring
