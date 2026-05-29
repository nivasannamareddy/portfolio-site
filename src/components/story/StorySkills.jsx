import { motion as Motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'SQL', 'JavaScript', 'C/C++'],
  },
  {
    category: 'Software Engineering',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Design Patterns',
      'SOLID Principles',
      'REST APIs',
      'Microservices',
      'System Design',
    ],
  },
  {
    category: 'AI / Machine Learning',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'Hugging Face',
      'NLP',
      'LangGraph',
      'Multi-Agent Systems',
      'Time Series Forecasting (ARIMA, Prophet)',
    ],
  },
  {
    category: 'Backend & Cloud',
    items: ['Spring Boot', 'Node.js', 'Docker', 'AWS'],
  },
  {
    category: 'Databases & Data Engineering',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'ETL Pipelines', 'Pandas', 'NumPy'],
  },
  {
    category: 'Frontend & Visualization',
    items: ['React', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'Jupyter Notebook', 'Google Colab', 'Agile/Scrum'],
  },
]

const StorySkills = () => (
  <section id="skills" className="relative py-20 sm:py-24">
    <div className="section-shell">
      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title mt-4">Technical Skills</h2>
      </Motion.div>

      <div className="max-w-4xl space-y-0 divide-y divide-white/[0.07]">
        {skillGroups.map((group, index) => (
          <Motion.div
            key={group.category}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 py-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:py-6"
          >
            <p className="shrink-0 text-[0.82rem] font-semibold text-[color:var(--text)]">
              {group.category}
            </p>
            <p className="text-[0.88rem] leading-7 text-[color:var(--slate)]">
              {group.items.join(', ')}
            </p>
          </Motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default StorySkills
