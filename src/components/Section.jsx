import { motion } from 'framer-motion'

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section
    id={id}
    data-section
    className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      {eyebrow && <p className="tag mb-3 inline-block">{eyebrow}</p>}
      {title && (
        <h2 className="font-display text-3xl text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}
      {subtitle && <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">{subtitle}</p>}
    </motion.div>
    <div className="mt-10 lg:mt-12">{children}</div>
  </section>
)

export default Section
