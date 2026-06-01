import { motion as Motion } from 'framer-motion'
import { Brain, Code2, Cloud, Database, Monitor, Wrench, Layers, Sparkles } from 'lucide-react'

const skillCards = [
  {
    icon: Code2,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.12)',
    title: 'Languages',
    items: ['Python', 'Java', 'SQL', 'JavaScript', 'C/C++'],
    style: 'tags',
  },
  {
    icon: Layers,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
    title: 'Software Engineering',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Design Patterns & SOLID',
      'REST APIs & Microservices',
      'System Design',
    ],
    style: 'tags',
  },
  {
    icon: Brain,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    title: 'AI / Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'LangGraph', 'Multi-Agent Systems', 'NLP', 'Time Series (ARIMA, Prophet)', 'EDA', 'Feature Engineering'],
    style: 'tags',
  },
  {
    icon: Sparkles,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.12)',
    title: 'GenAI & LLMs',
    items: ['LangGraph', 'Hugging Face', 'Multi-Agent Systems', 'RAG Architectures', 'Prompt Engineering', 'OpenAI API'],
    style: 'tags',
  },
  {
    icon: Cloud,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.12)',
    title: 'Backend & Cloud',
    items: ['Spring Boot', 'Node.js', 'Docker', 'AWS', 'Azure', 'CI/CD', 'Red Hat'],
    style: 'tags',
  },
  {
    icon: Database,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.12)',
    title: 'Databases & Data Engineering',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'ETL Pipelines', 'Pandas', 'NumPy'],
    style: 'tags',
  },
  {
    icon: Monitor,
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.12)',
    title: 'Frontend & Visualization',
    items: ['React', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn'],
    style: 'tags',
  },
  {
    icon: Wrench,
    color: '#facc15',
    bg: 'rgba(250,204,21,0.12)',
    title: 'Developer Tools',
    items: ['Git', 'Jupyter Notebook', 'Google Colab', 'Agile / Scrum', 'Salesforce'],
    style: 'tags',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

const SkillCard = ({ card, index }) => {
  const Icon = card.icon
  const DecoIcon = card.icon

  return (
    <Motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 transition-all duration-300 hover:border-white/[0.16] hover:shadow-[0_16px_32px_rgba(0,0,0,0.24)]"
      style={{ background: 'rgba(14,20,30,0.8)' }}
    >
      {/* Decorative background icon */}
      <DecoIcon
        size={80}
        className="pointer-events-none absolute -right-3 -top-3 opacity-[0.05]"
        style={{ color: card.color }}
      />

      {/* Icon badge */}
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: card.bg }}
      >
        <Icon size={18} style={{ color: card.color }} />
      </div>

      {/* Title */}
      <h3 className="mb-3 font-display text-[1.05rem] font-semibold text-[color:var(--text)]">
        {card.title}
      </h3>

      {/* Items */}
      {card.style === 'bullets' ? (
        <ul className="space-y-2">
          {card.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[0.84rem] text-[color:var(--slate)]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: card.color }}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-2">
          {card.items.map((item) => (
            <span
              key={item}
              className="rounded-full border px-2.5 py-1 text-[0.72rem] font-medium"
              style={{
                borderColor: `${card.color}28`,
                color: card.color,
                background: card.bg,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </Motion.div>
  )
}

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
        <h2 className="section-title mt-4">Technical Arsenal</h2>
        <p className="section-copy mt-3">The tools I use to build intelligent systems.</p>
      </Motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCards.map((card, i) => (
          <SkillCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </div>
  </section>
)

export default StorySkills
