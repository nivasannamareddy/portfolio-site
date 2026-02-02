const StorySidebar = ({ sections, data, socials }) => (
  <aside className="lg:sticky lg:top-24 h-fit space-y-8 rounded-[28px] border border-white/10 bg-black/60 p-6 backdrop-blur-2xl">
    <div>
      <p className="text-3xl font-semibold text-white">{data.name}</p>
      <p className="mt-2 text-sm text-slate-400">{data.title}</p>
      <p className="mt-4 text-sm text-slate-300">{data.headline}</p>
    </div>
    <nav className="space-y-3 text-xs uppercase tracking-[0.3em] text-slate-400">
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className="block hover:text-white">
          {section.label}
        </a>
      ))}
    </nav>
    <div className="flex gap-4 text-xs uppercase tracking-[0.2em] text-slate-400">
      <a href={socials.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={socials.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={socials.email}>Email</a>
    </div>
  </aside>
)

export default StorySidebar
