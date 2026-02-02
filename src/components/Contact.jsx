import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Section from './Section'

const Contact = ({ id, contact, socials }) => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const sendEmailJs = async (payload, templateId) => {
    const { serviceId, publicKey } = contact.emailProvider
    const body = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: payload,
    }
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('EmailJS request failed')
  }

  const onSubmit = async (data) => {
    setError('')
    try {
      const hasEmailJs =
        contact.emailProvider?.serviceId &&
        contact.emailProvider?.templateId &&
        contact.emailProvider?.publicKey

      if (hasEmailJs) {
        const payload = {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
          to_email: contact.emailProvider.toEmail || contact.email,
        }
        await sendEmailJs(payload, contact.emailProvider.templateId)
        if (contact.emailProvider.replyTemplateId) {
          await sendEmailJs(
            {
              from_name: contact.emailProvider.toEmail || contact.email,
              to_email: data.email,
              message: 'Thanks for reaching out! I received your message and will reply soon.',
            },
            contact.emailProvider.replyTemplateId
          )
        }
      } else if (contact.webhook) {
        await fetch(contact.webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } else {
        console.log('Submission captured', data)
      }
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 3500)
    } catch (err) {
      console.error('Submit failed', err)
      setError('Something went wrong sending your message. Please email me directly.')
    }
  }

  return (
    <Section
      id={id}
      eyebrow="Contact"
      title="Let’s build the next data story together."
      subtitle="Send a quick note or grab time on my calendar. I respond within one business day."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Full name</span>
              <input
                type="text"
                className="w-full rounded-2xl border border-white/10 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/50 dark:bg-white/10 dark:text-white"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-accent">{errors.name.message}</p>}
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Email</span>
              <input
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/50 dark:bg-white/10 dark:text-white"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                })}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-accent">{errors.email.message}</p>}
            </label>
          </div>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>How can I help?</span>
            <textarea
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/50 dark:bg-white/10 dark:text-white"
              {...register('message', { required: 'A short message is helpful' })}
              placeholder="Project idea, role, or problem to solve"
            />
            {errors.message && <p className="text-xs text-accent">{errors.message.message}</p>}
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-semibold text-midnight shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send size={18} />
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
            {submitted && (
              <span className="text-sm text-mint" role="status" aria-live="polite">
                Got it! I’ll reply soon.
              </span>
            )}
            {error && (
              <span className="text-sm text-accent" role="alert" aria-live="assertive">
                {error}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Messages send via EmailJS (if configured) or your webhook. Otherwise they stay client-side. Replies
            can be automated with the reply template.
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Direct</p>
            <div className="mt-4 space-y-3 text-slate-700 dark:text-slate-200">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-mint">
                <Mail size={18} />
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 hover:text-mint">
                <Phone size={18} />
                {contact.phone}
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                {contact.location}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{contact.availability}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Stay connected</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/20"
              >
                LinkedIn
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/20"
              >
                GitHub
              </a>
              <a
                href={socials.email}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/20"
              >
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Contact
