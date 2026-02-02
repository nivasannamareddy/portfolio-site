/*
  animations.js
  - GSAP + ScrollTrigger powered motion system
  - Custom canvas particles for hero depth
  - Cursor micro-interactions
  - Accessible fallbacks for reduced motion
*/

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
const adminKey = 'nivas-admin'

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader')
  if (!preloader) return
  setTimeout(() => preloader.classList.add('hidden'), 600)
})

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')
    if (!targetId || targetId === '#') return
    const target = document.querySelector(targetId)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  })
})

// Cursor effect
const cursor = document.querySelector('.cursor')
const cursorDot = document.querySelector('.cursor-dot')
if (cursor && cursorDot && !prefersReducedMotion) {
  window.addEventListener('mousemove', (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })

  document.querySelectorAll('a, button, .project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--active'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--active'))
  })
}

// GSAP animations
if (!prefersReducedMotion && window.gsap) {
  gsap.registerPlugin(ScrollTrigger)

  // Hero kinetic typography
  gsap.from('.hero__title-line', {
    yPercent: 120,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.12,
  })

  gsap.from('.hero__subtitle, .hero__cta, .hero__meta', {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
  })

  gsap.from('.hero__card', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3,
  })

  // Section reveals
  document.querySelectorAll('.section').forEach((section) => {
    gsap.from(section.querySelectorAll('.section__header, .glass, .skills__group, .project-card, .timeline__item, .contact__form, .contact__details'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.12,
    })
  })

  // Skill bars
  document.querySelectorAll('.skill').forEach((skill) => {
    const level = skill.dataset.level || 70
    gsap.to(skill, {
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
      },
      '--skill-width': `${level}%`,
    })
    gsap.to(skill, {
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
      },
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => {
        skill.style.setProperty('--skill-width', `${level}%`)
      },
      onComplete: () => {
        skill.style.setProperty('--skill-width', `${level}%`)
      },
    })
  })

  // Project hover micro-interaction
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
    })
  })
}

// Skill bar CSS update
const skills = document.querySelectorAll('.skill')
skills.forEach((skill) => {
  const level = skill.dataset.level || 70
  skill.style.setProperty('--skill-width', `${level}%`)
  skill.style.setProperty('position', 'relative')
  skill.style.setProperty('--skill-width', `${level}%`)
  skill.style.setProperty('color', 'var(--muted)')
  skill.style.setProperty('padding-bottom', '14px')
  skill.style.setProperty('display', 'block')
  skill.style.setProperty('border-bottom', '1px solid rgba(255,255,255,0.08)')
  skill.style.setProperty('margin-bottom', '6px')
  skill.style.setProperty('font-weight', '500')
  skill.style.setProperty('overflow', 'hidden')
  skill.style.setProperty('--bar-height', '6px')
  skill.style.setProperty('--bar-color', 'linear-gradient(90deg, var(--mint), var(--accent))')
  skill.style.setProperty('box-sizing', 'border-box')
  skill.style.setProperty('background', 'transparent')
  skill.style.setProperty('--bar-radius', '999px')
  skill.style.setProperty('--bar-width', `${level}%`)

  const bar = document.createElement('span')
  bar.style.position = 'absolute'
  bar.style.left = 0
  bar.style.bottom = 0
  bar.style.height = '6px'
  bar.style.width = prefersReducedMotion ? `${level}%` : '0%'
  bar.style.borderRadius = '999px'
  bar.style.background = 'linear-gradient(90deg, var(--mint), var(--accent))'
  bar.style.transition = 'width 1s ease'
  skill.appendChild(bar)

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bar.style.width = `${level}%`
          }
        })
      },
      { threshold: 0.6 }
    )
    observer.observe(skill)
  }
})

// Canvas particles / wave
const canvas = document.getElementById('hero-canvas')
if (canvas && !prefersReducedMotion && !isLowPower) {
  const ctx = canvas.getContext('2d')
  const particles = []

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < 80; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.6 + 0.2,
      offset: Math.random() * Math.PI * 2,
    })
  }

  const render = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.strokeStyle = 'rgba(111,229,193,0.12)'

    particles.forEach((p) => {
      const wave = Math.sin(time / 1000 + p.offset) * 20
      const x = p.x + wave
      p.y -= p.speed
      if (p.y < -20) p.y = canvas.height + 20

      ctx.beginPath()
      ctx.arc(x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

// Contact form (demo submission + auto reply)
const form = document.getElementById('contact-form')
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const status = document.querySelector('.form__status')
    if (status) status.textContent = 'Message sent. You will receive a reply shortly.'
    form.reset()
  })
}

// Hidden admin mode (URL param: ?admin=YOUR_KEY)
const params = new URLSearchParams(window.location.search)
const isAdmin = params.get('admin') === adminKey
const editableNodes = document.querySelectorAll('[data-edit]')

const applySavedEdits = () => {
  const saved = JSON.parse(localStorage.getItem('site-edits') || '{}')
  Object.entries(saved).forEach(([key, value]) => {
    const node = document.querySelector(`[data-edit=\"${key}\"]`)
    if (node) node.textContent = value
  })
}

applySavedEdits()

if (isAdmin) {
  const adminButton = document.createElement('button')
  adminButton.className = 'admin-toggle'
  adminButton.textContent = 'Edit Mode'
  document.body.appendChild(adminButton)

  let editEnabled = false
  adminButton.addEventListener('click', () => {
    editEnabled = !editEnabled
    adminButton.textContent = editEnabled ? 'Editing On' : 'Edit Mode'
    editableNodes.forEach((node) => {
      node.setAttribute('contenteditable', editEnabled)
      node.classList.toggle('is-editing', editEnabled)
    })
  })

  editableNodes.forEach((node) => {
    node.addEventListener('blur', () => {
      const key = node.dataset.edit
      const saved = JSON.parse(localStorage.getItem('site-edits') || '{}')
      saved[key] = node.textContent.trim()
      localStorage.setItem('site-edits', JSON.stringify(saved))
    })
  })
}
