import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Settings2,
  Share2,
  Trash2,
} from 'lucide-react'

const LabeledInput = ({ label, icon: Icon, value, onChange, placeholder, type = 'text' }) => (
  <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
    <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
      {Icon && <Icon size={12} />} {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/40 dark:border-white/15 dark:bg-white/10 dark:text-white"
    />
  </label>
)

const EditorPanel = ({
  data,
  onPersonalChange,
  onSocialChange,
  onContactChange,
  onHighlightsChange,
  onSkillsChange,
  onProjectsChange,
  onTimelineChange,
  onThemeChange,
  onReset,
  onExport,
  onImport,
}) => {
  const [open, setOpen] = useState(false)
  const typedValue = useMemo(() => data.personal.typed.join(', '), [data.personal.typed])
  const fileInputRef = useRef(null)
  const imageInputRefs = useRef({})

  const handleTypedChange = (value) => {
    const words = value
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean)
    onPersonalChange('typed', words.length ? words : data.personal.typed)
  }

  const addHighlight = () => {
    onHighlightsChange((prev) => [...prev, { label: 'New Metric', value: '0%', description: '' }])
  }

  const updateHighlight = (index, field, value) => {
    onHighlightsChange((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)))
  }

  const removeHighlight = (index) => {
    onHighlightsChange((prev) => prev.filter((_, idx) => idx !== index))
  }

  const addSkillCategory = () => {
    onSkillsChange((prev) => [...prev, { category: 'New Category', items: [] }])
  }

  const updateSkillCategory = (index, field, value) => {
    onSkillsChange((prev) => prev.map((cat, idx) => (idx === index ? { ...cat, [field]: value } : cat)))
  }

  const addSkillItem = (catIndex) => {
    onSkillsChange((prev) =>
      prev.map((cat, idx) =>
        idx === catIndex ? { ...cat, items: [...cat.items, { name: 'New Skill', level: 50 }] } : cat
      )
    )
  }

  const updateSkillItem = (catIndex, itemIndex, field, value) => {
    onSkillsChange((prev) =>
      prev.map((cat, idx) =>
        idx === catIndex
          ? {
              ...cat,
              items: cat.items.map((item, iidx) => (iidx === itemIndex ? { ...item, [field]: value } : item)),
            }
          : cat
      )
    )
  }

  const removeSkillItem = (catIndex, itemIndex) => {
    onSkillsChange((prev) =>
      prev.map((cat, idx) =>
        idx === catIndex ? { ...cat, items: cat.items.filter((_, iidx) => iidx !== itemIndex) } : cat
      )
    )
  }

  const removeSkillCategory = (index) => {
    onSkillsChange((prev) => prev.filter((_, idx) => idx !== index))
  }

  const addProject = () => {
    onProjectsChange((prev) => [
      ...prev,
      {
        title: 'New Project',
        period: 'YYYY',
        description: '',
        tech: [],
        impact: '',
        links: { demo: '', repo: '' },
        images: [],
        category: 'General',
      },
    ])
  }

  const updateProject = (index, field, value) => {
    onProjectsChange((prev) =>
      prev.map((proj, idx) => (idx === index ? { ...proj, [field]: value } : proj))
    )
  }

  const updateProjectTech = (index, value) => {
    const tech = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    onProjectsChange((prev) =>
      prev.map((proj, idx) => (idx === index ? { ...proj, tech } : proj))
    )
  }

  const updateProjectImages = (index, value) => {
    const images = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    onProjectsChange((prev) =>
      prev.map((proj, idx) => (idx === index ? { ...proj, images } : proj))
    )
  }

  const updateProjectLinks = (index, linkField, value) => {
    onProjectsChange((prev) =>
      prev.map((proj, idx) =>
        idx === index ? { ...proj, links: { ...proj.links, [linkField]: value } } : proj
      )
    )
  }

  const removeProject = (index) => {
    onProjectsChange((prev) => prev.filter((_, idx) => idx !== index))
  }

  const addTimelineItem = (type) => {
    onTimelineChange((prev) => [
      ...prev,
      {
        type,
        title: 'New Title',
        org: 'Organization',
        period: 'YYYY - YYYY',
        location: 'City, Country',
        bullets: [],
        tech: [],
      },
    ])
  }

  const updateTimelineItem = (index, field, value) => {
    onTimelineChange((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)))
  }

  const updateTimelineBullets = (index, value) => {
    const bullets = value
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean)
    onTimelineChange((prev) => prev.map((item, idx) => (idx === index ? { ...item, bullets } : item)))
  }

  const updateTimelineTech = (index, value) => {
    const tech = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    onTimelineChange((prev) => prev.map((item, idx) => (idx === index ? { ...item, tech } : item)))
  }

  const removeTimelineItem = (index) => {
    onTimelineChange((prev) => prev.filter((_, idx) => idx !== index))
  }

  const moveItem = (arrUpdater, index, direction) => {
    arrUpdater((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const handleProjectImageUpload = (index, event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = 1000
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            onProjectsChange((prev) =>
              prev.map((proj, idx) =>
                idx === index ? { ...proj, images: [url, ...(proj.images || [])].slice(0, 3) } : proj
              )
            )
          },
          'image/jpeg',
          0.8
        )
      }
      img.src = e.target?.result
    }
    reader.readAsDataURL(file)
  }

  const handleImportFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result || '{}')
        onImport(parsed)
      } catch (error) {
        console.error('Invalid JSON', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-midnight shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40"
      >
        <Settings2 size={16} />
        Quick Edit
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 right-0 top-0 z-40 w-full max-w-md overflow-y-auto border-l border-white/10 bg-white/90 p-5 shadow-2xl backdrop-blur-xl dark:bg-black/60"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Live content editor</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Changes save in your browser</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Hero</p>
                <div className="mt-3 space-y-3">
                  <LabeledInput
                    label="Name"
                    value={data.personal.name}
                    onChange={(v) => onPersonalChange('name', v)}
                    placeholder="Your name"
                  />
                  <LabeledInput
                    label="Headline"
                    value={data.personal.headline}
                    onChange={(v) => onPersonalChange('headline', v)}
                    placeholder="What you do"
                  />
                  <LabeledInput
                    label="Role / Title"
                    value={data.personal.title}
                    onChange={(v) => onPersonalChange('title', v)}
                    placeholder="Current role or program"
                  />
                  <LabeledInput
                    label="Typing words (comma separated)"
                    value={typedValue}
                    onChange={handleTypedChange}
                    placeholder="Data Analyst, ML Engineer, ..."
                  />
                  <LabeledInput
                    label="Avatar URL"
                    value={data.personal.avatar}
                    onChange={(v) => onPersonalChange('avatar', v)}
                    placeholder="/images/profile.jpg or https://"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Highlights</p>
                  <button
                    onClick={addHighlight}
                    className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  {data.highlights.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="space-y-2 rounded-xl border border-white/10 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
                        Highlight {index + 1}
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveItem(onHighlightsChange, index, -1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveItem(onHighlightsChange, index, 1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↓
                          </button>
                          <button onClick={() => removeHighlight(index)} className="text-accent hover:text-accent/80">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <LabeledInput
                        label="Label"
                        value={item.label}
                        onChange={(v) => updateHighlight(index, 'label', v)}
                        placeholder="Metric name"
                      />
                      <LabeledInput
                        label="Value"
                        value={item.value}
                        onChange={(v) => updateHighlight(index, 'value', v)}
                        placeholder="e.g. 40%"
                      />
                      <LabeledInput
                        label="Description"
                        value={item.description}
                        onChange={(v) => updateHighlight(index, 'description', v)}
                        placeholder="Brief context"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
                <div className="mt-3 grid gap-3">
                  <LabeledInput
                    label="Email"
                    icon={Mail}
                    value={data.personal.email}
                    onChange={(v) => {
                      onPersonalChange('email', v)
                      onContactChange('email', v)
                    }}
                    placeholder="you@example.com"
                  />
                  <LabeledInput
                    label="Phone"
                    icon={Phone}
                    value={data.personal.phone}
                    onChange={(v) => {
                      onPersonalChange('phone', v)
                      onContactChange('phone', v)
                    }}
                    placeholder="+1 ..."
                  />
                  <LabeledInput
                    label="Location"
                    icon={MapPin}
                    value={data.personal.location}
                    onChange={(v) => {
                      onPersonalChange('location', v)
                      onContactChange('location', v)
                    }}
                    placeholder="City, Region"
                  />
                  <LabeledInput
                    label="Resume URL"
                    icon={Download}
                    value={data.personal.resumeUrl}
                    onChange={(v) => onPersonalChange('resumeUrl', v)}
                    placeholder="/resume.pdf or external link"
                  />
                  <LabeledInput
                    label="Response time note"
                    icon={Share2}
                    value={data.contact.availability}
                    onChange={(v) => onContactChange('availability', v)}
                    placeholder="Replies within..."
                  />
                  <LabeledInput
                    label="EmailJS service ID"
                    value={data.contact.emailProvider?.serviceId || ''}
                    onChange={(v) => onContactChange('emailProvider', { ...data.contact.emailProvider, serviceId: v })}
                    placeholder="service_xxx"
                  />
                  <LabeledInput
                    label="EmailJS template ID (inbox)"
                    value={data.contact.emailProvider?.templateId || ''}
                    onChange={(v) => onContactChange('emailProvider', { ...data.contact.emailProvider, templateId: v })}
                    placeholder="template_xxx"
                  />
                  <LabeledInput
                    label="EmailJS template ID (auto-reply)"
                    value={data.contact.emailProvider?.replyTemplateId || ''}
                    onChange={(v) =>
                      onContactChange('emailProvider', { ...data.contact.emailProvider, replyTemplateId: v })
                    }
                    placeholder="template_reply_xxx"
                  />
                  <LabeledInput
                    label="EmailJS public key"
                    value={data.contact.emailProvider?.publicKey || ''}
                    onChange={(v) => onContactChange('emailProvider', { ...data.contact.emailProvider, publicKey: v })}
                    placeholder="public_xxx"
                  />
                  <LabeledInput
                    label="EmailJS to_email"
                    value={data.contact.emailProvider?.toEmail || ''}
                    onChange={(v) => onContactChange('emailProvider', { ...data.contact.emailProvider, toEmail: v })}
                    placeholder="Where messages are delivered"
                  />
                  <LabeledInput
                    label="Webhook (fallback)"
                    value={data.contact.webhook || ''}
                    onChange={(v) => onContactChange('webhook', v)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Socials</p>
                <div className="mt-3 space-y-3">
                  <LabeledInput
                    label="LinkedIn"
                    value={data.socials.linkedin}
                    onChange={(v) => onSocialChange('linkedin', v)}
                    placeholder="https://www.linkedin.com/in/..."
                  />
                  <LabeledInput
                    label="GitHub"
                    value={data.socials.github}
                    onChange={(v) => onSocialChange('github', v)}
                    placeholder="https://github.com/..."
                  />
                  <LabeledInput
                    label="Email link"
                    value={data.socials.email}
                    onChange={(v) => onSocialChange('email', v)}
                    placeholder="mailto:you@example.com"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Skills</p>
                  <button
                    onClick={addSkillCategory}
                    className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  {data.skills.map((cat, catIndex) => (
                    <div key={`${cat.category}-${catIndex}`} className="space-y-2 rounded-xl border border-white/10 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
                        Category {catIndex + 1}
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveItem(onSkillsChange, catIndex, -1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveItem(onSkillsChange, catIndex, 1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeSkillCategory(catIndex)}
                            className="text-accent hover:text-accent/80"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <LabeledInput
                        label="Category name"
                        value={cat.category}
                        onChange={(v) => updateSkillCategory(catIndex, 'category', v)}
                        placeholder="e.g. Data & ML"
                      />
                      <div className="space-y-2 rounded-lg bg-white/40 p-2 dark:bg-white/5">
                        {cat.items.map((item, itemIndex) => (
                          <div key={`${item.name}-${itemIndex}`} className="rounded-lg border border-white/10 p-2">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                              Skill {itemIndex + 1}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    onSkillsChange((prev) =>
                                      prev.map((cat, idx) => {
                                        if (idx !== catIndex) return cat
                                        const arr = [...cat.items]
                                        const target = itemIndex - 1
                                        if (target < 0) return cat
                                        ;[arr[itemIndex], arr[target]] = [arr[target], arr[itemIndex]]
                                        return { ...cat, items: arr }
                                      })
                                    )
                                  }
                                  className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() =>
                                    onSkillsChange((prev) =>
                                      prev.map((cat, idx) => {
                                        if (idx !== catIndex) return cat
                                        const arr = [...cat.items]
                                        const target = itemIndex + 1
                                        if (target >= arr.length) return cat
                                        ;[arr[itemIndex], arr[target]] = [arr[target], arr[itemIndex]]
                                        return { ...cat, items: arr }
                                      })
                                    )
                                  }
                                  className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                                >
                                  ↓
                                </button>
                                <button
                                  onClick={() => removeSkillItem(catIndex, itemIndex)}
                                  className="text-accent hover:text-accent/80"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                            <LabeledInput
                              label="Name"
                              value={item.name}
                              onChange={(v) => updateSkillItem(catIndex, itemIndex, 'name', v)}
                              placeholder="Python"
                            />
                            <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                Level
                              </span>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={item.level}
                                onChange={(e) =>
                                  updateSkillItem(catIndex, itemIndex, 'level', Number(e.target.value))
                                }
                                className="w-full accent-accent"
                              />
                              <span className="text-xs text-slate-600 dark:text-slate-400">{item.level}%</span>
                            </label>
                          </div>
                        ))}
                        <button
                          onClick={() => addSkillItem(catIndex)}
                          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                        >
                          <Plus size={12} /> Add Skill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Projects</p>
                  <button
                    onClick={addProject}
                    className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  {data.projects.map((proj, index) => (
                    <div key={`${proj.title}-${index}`} className="space-y-2 rounded-xl border border-white/10 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
                        Project {index + 1}
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveItem(onProjectsChange, index, -1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveItem(onProjectsChange, index, 1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↓
                          </button>
                          <button onClick={() => removeProject(index)} className="text-accent hover:text-accent/80">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <LabeledInput
                        label="Title"
                        value={proj.title}
                        onChange={(v) => updateProject(index, 'title', v)}
                        placeholder="Project title"
                      />
                      <LabeledInput
                        label="Period"
                        value={proj.period}
                        onChange={(v) => updateProject(index, 'period', v)}
                        placeholder="Timeline"
                      />
                      <LabeledInput
                        label="Category"
                        value={proj.category}
                        onChange={(v) => updateProject(index, 'category', v)}
                        placeholder="Analytics, ML, etc."
                      />
                      <LabeledInput
                        label="Impact"
                        value={proj.impact}
                        onChange={(v) => updateProject(index, 'impact', v)}
                        placeholder="Impact statement"
                      />
                      <LabeledInput
                        label="Description"
                        value={proj.description}
                        onChange={(v) => updateProject(index, 'description', v)}
                        placeholder="Brief summary"
                      />
                      <LabeledInput
                        label="Tech (comma separated)"
                        value={proj.tech.join(', ')}
                        onChange={(v) => updateProjectTech(index, v)}
                        placeholder="Python, SQL, ..."
                      />
                      <LabeledInput
                        label="Images (comma URLs)"
                        value={proj.images.join(', ')}
                        onChange={(v) => updateProjectImages(index, v)}
                        placeholder="/images/pic.jpg, ..."
                      />
                      <div className="flex flex-wrap gap-2">
                        {proj.images.slice(0, 3).map((img, iidx) => (
                          <img
                            key={`${img}-${iidx}`}
                            src={img}
                            alt="preview"
                            className="h-12 w-12 rounded-lg object-cover"
                            loading="lazy"
                          />
                        ))}
                        <button
                          onClick={() => imageInputRefs.current[index]?.click()}
                          className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                          Upload
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            imageInputRefs.current[index] = el
                          }}
                          className="hidden"
                          onChange={(e) => handleProjectImageUpload(index, e)}
                        />
                      </div>
                      <LabeledInput
                        label="Demo link"
                        value={proj.links?.demo || ''}
                        onChange={(v) => updateProjectLinks(index, 'demo', v)}
                        placeholder="https://demo..."
                      />
                      <LabeledInput
                        label="Repo link"
                        value={proj.links?.repo || ''}
                        onChange={(v) => updateProjectLinks(index, 'repo', v)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Timeline</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addTimelineItem('experience')}
                      className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                    >
                      <Plus size={12} /> Experience
                    </button>
                    <button
                      onClick={() => addTimelineItem('education')}
                      className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white dark:bg-white/10 dark:text-white"
                    >
                      <Plus size={12} /> Education
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {data.timeline.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="space-y-2 rounded-xl border border-white/10 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
                        {item.type?.toUpperCase()} {index + 1}
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveItem(onTimelineChange, index, -1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveItem(onTimelineChange, index, 1)}
                            className="rounded bg-white/60 px-2 py-1 text-[11px] text-slate-800 hover:bg-white dark:bg-white/10 dark:text-white"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeTimelineItem(index)}
                            className="text-accent hover:text-accent/80"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                          Type
                        </span>
                        <select
                          value={item.type}
                          onChange={(e) => updateTimelineItem(index, 'type', e.target.value)}
                          className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/40 dark:border-white/15 dark:bg-white/10 dark:text-white"
                        >
                          <option value="experience">Experience</option>
                          <option value="education">Education</option>
                        </select>
                      </label>
                      <LabeledInput
                        label="Title"
                        value={item.title}
                        onChange={(v) => updateTimelineItem(index, 'title', v)}
                        placeholder="Role or Degree"
                      />
                      <LabeledInput
                        label="Organization"
                        value={item.org}
                        onChange={(v) => updateTimelineItem(index, 'org', v)}
                        placeholder="Company or School"
                      />
                      <LabeledInput
                        label="Period"
                        value={item.period}
                        onChange={(v) => updateTimelineItem(index, 'period', v)}
                        placeholder="Dates"
                      />
                      <LabeledInput
                        label="Location"
                        value={item.location}
                        onChange={(v) => updateTimelineItem(index, 'location', v)}
                        placeholder="City, Country"
                      />
                      <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                          Bullets (one per line)
                        </span>
                        <textarea
                          value={item.bullets.join('\n')}
                          onChange={(e) => updateTimelineBullets(index, e.target.value)}
                          rows={3}
                          className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/40 dark:border-white/15 dark:bg-white/10 dark:text-white"
                        />
                      </label>
                      <LabeledInput
                        label="Tech (comma separated)"
                        value={(item.tech || []).join(', ')}
                        onChange={(v) => updateTimelineTech(index, v)}
                        placeholder="Python, SQL, ..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Theme</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Accent color
                    </span>
                    <input
                      type="color"
                      value={data.theme.accent}
                      onChange={(e) => onThemeChange('accent', e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border border-black/10 bg-white/80 dark:border-white/15 dark:bg-white/10"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Secondary color
                    </span>
                    <input
                      type="color"
                      value={data.theme.secondary}
                      onChange={(e) => onThemeChange('secondary', e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border border-black/10 bg-white/80 dark:border-white/15 dark:bg-white/10"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={onReset}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20"
              >
                <RefreshCw size={14} />
                Reset to defaults
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onExport}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow transition hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow transition hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  Import JSON
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default EditorPanel
