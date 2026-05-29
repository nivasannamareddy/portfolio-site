import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import StoryNav from './components/story/StoryNav'
import StoryFooter from './components/story/StoryFooter'
import StoryHero from './components/story/StoryHero'
import StoryAtmosphere from './components/story/StoryAtmosphere'
import EditorPanel from './components/EditorPanel'
import config from './data/config'
import mergeDeep from './lib/mergeConfig'
import { Analytics } from '@vercel/analytics/react'

const StoryAbout = lazy(() => import('./components/story/StoryAbout'))
const StoryFeaturedProject = lazy(() => import('./components/story/StoryFeaturedProject'))
const StorySystems = lazy(() => import('./components/story/StorySystems'))
const StoryProjects = lazy(() => import('./components/story/StoryProjects'))
const StoryGithub = lazy(() => import('./components/story/StoryGithub'))
const StorySkills = lazy(() => import('./components/story/StorySkills'))
const StoryCertifications = lazy(() => import('./components/story/StoryCertifications'))
const StoryTimeline = lazy(() => import('./components/story/StoryTimeline'))
const StoryContact = lazy(() => import('./components/story/StoryContact'))

const sections = [
  { id: 'skills', label: 'Capabilities' },
  { id: 'impact', label: 'Impact' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'Code' },
  { id: 'contact', label: 'Contact' },
]

const SectionFallback = () => (
  <div className="section-shell py-8 text-sm text-[color:var(--muted)]">Loading section…</div>
)

function App() {
  const [activeSection, setActiveSection] = useState('skills')
  const [siteData, setSiteData] = useState(() => {
    const stored = localStorage.getItem('site-data-v5')
    if (stored) {
      try {
        return mergeDeep(config, JSON.parse(stored))
      } catch {
        return config
      }
    }
    return config
  })

  useEffect(() => {
    document.title = siteData.meta.title
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) {
      descriptionTag.setAttribute('content', siteData.meta.description)
    }
  }, [siteData.meta.description, siteData.meta.title])

  useEffect(() => {
    localStorage.setItem('site-data-v5', JSON.stringify(siteData))
  }, [siteData])

  useEffect(() => {
    const observedSections = Array.from(document.querySelectorAll('main section[id]'))
    if (!observedSections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (!visibleEntries.length) return
        setActiveSection(visibleEntries[0].target.id)
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.18, 0.35, 0.55],
      }
    )

    observedSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID
    if (!gaId) return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', gaId, { anonymize_ip: true })

    return () => {
      document.head.removeChild(script)
    }
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
    localStorage.removeItem('site-data-v5')
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
      const mergedData = mergeDeep(config, data)
      setSiteData(mergedData)
      localStorage.setItem('site-data-v5', JSON.stringify(mergedData))
    } catch (error) {
      console.error('Import failed', error)
    }
  }

  const isAdmin = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('admin') === 'Dimpu@02.'
  }, [])

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <StoryAtmosphere />
      <StoryNav
        sections={sections}
        activeSection={activeSection}
        personal={siteData.personal}
        resumeUrl={siteData.personal.resumeUrl}
      />
      <main className="relative z-10 overflow-x-clip pb-16 pt-20 sm:pt-24">
        <StoryHero data={siteData.personal} highlights={siteData.highlights} socials={siteData.socials} />
        <Suspense fallback={<SectionFallback />}>
          <StorySkills />
          <StoryCertifications items={siteData.certifications} />
          <StoryAbout highlights={siteData.highlights} />
          <StoryFeaturedProject projects={siteData.projects} />
          <StoryProjects projects={siteData.projects} />
          <StorySystems />
          <StoryTimeline
            id="experience"
            eyebrow="Experience"
            title="Experience delivering measurable business impact"
            items={siteData.timeline.filter((item) => item.type === 'experience')}
            variant="experience"
          />
          <StoryGithub githubUrl={siteData.socials.github} projects={siteData.projects} />
          <StoryContact
            contact={siteData.contact}
            socials={siteData.socials}
            personal={siteData.personal}
          />
        </Suspense>
      </main>
      <StoryFooter personal={siteData.personal} />
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
      <Analytics />
    </div>
  )
}

export default App
