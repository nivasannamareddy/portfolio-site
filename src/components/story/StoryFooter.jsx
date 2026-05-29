const StoryFooter = ({ personal }) => (
  <footer className="relative z-10 border-t border-white/[0.08] py-10">
    <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p
          className="font-display text-[1.9rem] leading-none bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(100deg, #38bdf8, #818cf8)' }}
        >
          {personal.name}
        </p>
        <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {personal.title}
        </p>
      </div>
      <div className="text-left text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted)] sm:text-right">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Open to work
        </span>
        <p className="mt-2">Built for recruiter clarity · {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
)

export default StoryFooter
