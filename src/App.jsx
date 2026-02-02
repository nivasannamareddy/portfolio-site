import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StoryNav from './components/story/StoryNav'
import StoryHero from './components/story/StoryHero'
import StoryAbout from './components/story/StoryAbout'
import StoryProjects from './components/story/StoryProjects'
import StorySkills from './components/story/StorySkills'
import StoryTimeline from './components/story/StoryTimeline'
import StoryContact from './components/story/StoryContact'
import StoryFooter from './components/story/StoryFooter'
import StoryAtmosphere from './components/story/StoryAtmosphere'
import EditorPanel from './components/EditorPanel'
import config from './data/config'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [siteData, setSiteData] = useState(() => {
    const stored = localStorage.getItem('site-data')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return config
      }
    }
    return config
  })

  const gradientOverlay = useMemo(
    () => ({
      background:
        'radial-gradient(circle at 20% 10%, rgba(111, 229, 193, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255, 123, 84, 0.18), transparent 35%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.16), transparent 45%)',
    }),
    []
  )

  useEffect(() => {
    document.title = siteData.meta.title
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) {
      descriptionTag.setAttribute('content', siteData.meta.description)
    }
  }, [siteData.meta.description, siteData.meta.title])

  useEffect(() => {
    localStorage.setItem('site-data', JSON.stringify(siteData))
  }, [siteData])

  useEffect(() => {
    const overlay = document.querySelector('[data-section-wipe]')
    if (!overlay) return
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      gsap.fromTo(
        overlay,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.6,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      )
    })
  }, [])

  const handlePersonalChange = (field, value) => {
    setSiteData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }))
  }

  const handleSocialChange = (field, value) => {
    setSiteData((prev) => ({ ...prev, socials: { ...prev.socials, [field]: value } }))
  }

  const handleContactChange = (field, value) => {
    setSiteData((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }))
  }

  const updateHighlights = (updater) => {
    setSiteData((prev) => ({ ...prev, highlights: updater(prev.highlights) }))
  }

  const updateSkills = (updater) => {
    setSiteData((prev) => ({ ...prev, skills: updater(prev.skills) }))
  }

  const updateProjects = (updater) => {
    setSiteData((prev) => ({ ...prev, projects: updater(prev.projects) }))
  }

  const updateTimeline = (updater) => {
    setSiteData((prev) => ({ ...prev, timeline: updater(prev.timeline) }))
  }

  const updateTheme = (field, value) => {
    setSiteData((prev) => ({ ...prev, theme: { ...prev.theme, [field]: value } }))
  }

  const resetContent = () => {
    setSiteData(config)
    localStorage.removeItem('site-data')
  }

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-content.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const importContent = (data) => {
    try {
      setSiteData(data)
      localStorage.setItem('site-data', JSON.stringify(data))
    } catch (error) {
      console.error('Import failed', error)
    }
  }

  const isAdmin = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('admin') === 'Dimpu@02.'
  }, [])

  return (
    <div className="relative min-h-screen bg-midnight text-slate-100" style={gradientOverlay}>
      <StoryAtmosphere />
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-[size:28px_28px] opacity-20" />
      <StoryNav sections={sections} resumeUrl={siteData.personal.resumeUrl} />
      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6">
        <StoryHero data={siteData.personal} highlights={siteData.highlights} socials={siteData.socials} />
        <StoryAbout
          personal={siteData.personal}
          certifications={siteData.certifications}
          highlights={siteData.highlights}
        />
        <StoryProjects projects={siteData.projects} />
        <StorySkills skills={siteData.skills} />
        <StoryTimeline
          id="experience"
          eyebrow="Experience"
          title="Building analytics and ML impact in internships and research."
          items={siteData.timeline.filter((item) => item.type === 'experience')}
        />
        <StoryTimeline
          id="education"
          eyebrow="Education"
          title="Graduate studies rooted in analytics, data engineering, and ML."
          items={siteData.timeline.filter((item) => item.type === 'education')}
        />
        <StoryContact contact={siteData.contact} socials={siteData.socials} />
        <StoryFooter personal={siteData.personal} />
      </main>
      {isAdmin && (
        <EditorPanel
          data={siteData}
          onPersonalChange={handlePersonalChange}
          onSocialChange={handleSocialChange}
          onContactChange={handleContactChange}
          onHighlightsChange={updateHighlights}
          onSkillsChange={updateSkills}
          onProjectsChange={updateProjects}
          onTimelineChange={updateTimeline}
          onThemeChange={updateTheme}
          onReset={resetContent}
          onExport={exportContent}
          onImport={importContent}
        />
      )}
    </div>
  )
}

export default App
