import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { LampContainer } from '../ui/lamp'

const fieldClass =
  'mt-2 w-full rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base text-[color:var(--text)] outline-none transition focus:border-[rgba(56,189,248,0.35)] focus:bg-white/[0.05] backdrop-blur-sm'

const StoryContact = ({ contact, socials, personal }) => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Sending...')
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      if (contact.webhook) {
        const response = await fetch(contact.webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Webhook failed')
      } else if (
        contact.emailProvider?.serviceId &&
        contact.emailProvider?.templateId &&
        contact.emailProvider?.publicKey
      ) {
        await emailjs.send(
          contact.emailProvider.serviceId,
          contact.emailProvider.templateId,
          { ...payload, to_email: contact.emailProvider.toEmail || contact.email },
          contact.emailProvider.publicKey
        )
        if (contact.emailProvider.replyTemplateId) {
          await emailjs.send(
            contact.emailProvider.serviceId,
            contact.emailProvider.replyTemplateId,
            { ...payload, to_email: payload.email },
            contact.emailProvider.publicKey
          )
        }
      } else {
        const subject = encodeURIComponent(`Portfolio inquiry from ${payload.name}`)
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
        )
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
        setStatus('Opening your email app...')
        form.reset()
        return
      }

      setStatus('Thanks for reaching out! Your message has been sent.')
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus('Message failed to send. Please email me directly.')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Lamp atmosphere heading */}
      <LampContainer compact>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center px-4"
        >
          <p className="eyebrow justify-center">Contact</p>
          <h2 className="section-title mt-4 text-center">
            Open to the right role<br className="hidden sm:block" /> and team.
          </h2>
          <p className="mt-4 mx-auto max-w-md text-[0.98rem] leading-7 text-[color:var(--slate)] text-center">
            Data Science & ML roles starting May 2026 · Richardson, TX
          </p>
        </Motion.div>
      </LampContainer>

      {/* Contact details + form */}
      <div className="section-shell grid gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr] -mt-8 relative z-10">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <div className="space-y-0">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center justify-between border-b border-white/10 py-3.5 text-sm text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.24)]"
            >
              <span className="inline-flex items-center gap-3">
                <Mail size={16} className="text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition" />
                {contact.email}
              </span>
              <span className="text-[color:var(--muted)]">Email</span>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="group flex items-center justify-between border-b border-white/10 py-3.5 text-sm text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.24)]"
            >
              <span className="inline-flex items-center gap-3">
                <Phone size={16} className="text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition" />
                {contact.phone}
              </span>
              <span className="text-[color:var(--muted)]">Phone</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[0.9rem] border border-white/10 px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.28)] hover:bg-white/[0.04]"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[0.9rem] border border-white/10 px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[rgba(56,189,248,0.28)] hover:bg-white/[0.04]"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </Motion.div>

        <Motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl"
          style={{ background: 'rgba(18,25,38,0.7)' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
          <div className="relative space-y-5">
            <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Full name
              <input required className={fieldClass} type="text" name="name" />
            </label>

            <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Email
              <input required className={fieldClass} type="email" name="email" />
            </label>

            <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Message
              <textarea required className={fieldClass} rows={5} name="message" />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="rounded-[0.9rem] px-6 py-3 text-sm font-semibold text-[color:var(--bg)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_16px_32px_rgba(56,189,248,0.22)]"
                type="submit"
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
              >
                Send message
              </button>
              <p className="text-sm text-[color:var(--muted)]">Usually replies within 24 hours.</p>
            </div>

            {status ? (
              <p className="text-sm text-[color:var(--text)]" role="status" aria-live="polite">
                {status}
              </p>
            ) : null}
          </div>
        </Motion.form>
      </div>
    </section>
  )
}

export default StoryContact
