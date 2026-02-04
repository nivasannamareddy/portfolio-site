'use client'

import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StoryNav from '@/components/story/StoryNav'
import StoryHero from '@/components/story/StoryHero'
import StoryAbout from '@/components/story/StoryAbout'
import StoryProjects from '@/components/story/StoryProjects'
import StorySkills from '@/components/story/StorySkills'
import StoryTimeline from '@/components/story/StoryTimeline'
import StoryContact from '@/components/story/StoryContact'
import StoryFooter from '@/components/story/StoryFooter'
import StoryAtmosphere from '@/components/story/StoryAtmosphere'
import config from '@/data/config'

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

export default function Home() {
  const [siteData, setSiteData] = useState(config)

  const gradientOverlay = useMemo(
    () => ({
      background:
        'radial-gradient(circle at 20% 10%, rgba(111, 229, 193, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255, 123, 84, 0.18), transparent 35%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.16), transparent 45%)',
    }),
    []
  )

  useEffect(() => {
    setSiteData(config)
  }, [])

  return (
    <div className="relative min-h-screen bg-midnight text-slate-100" style={gradientOverlay}>
      <StoryAtmosphere />
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-[size:28px_28px] opacity-20" />
      <StoryNav
        sections={sections}
        resumeUrl={siteData.personal.resumeUrl}
        linkedinUrl={siteData.socials?.linkedin}
      />
      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6">
        <StoryHero data={siteData.personal} />
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
    </div>
  )
}
