import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'

const StoryContact = ({ contact, socials }) => {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Thanks for reaching out! I will reply soon.')
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-3xl text-white">Let’s connect.</h2>
          <p className="mt-4 text-lg text-slate-300">Share your role or project, and I’ll reply within 24 hours.</p>
          <motion.form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            whileHover={{ y: -2 }}
          >
            <label className="block text-sm text-slate-300">
              Full name
              <input
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white"
                type="text"
                name="name"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white"
                type="email"
                name="email"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Message
              <textarea
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white"
                rows={4}
                name="message"
              />
            </label>
            <button className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight" type="submit">
              Send message
            </button>
            {status && (
              <p className="text-sm text-white" role="status" aria-live="polite">
                {status}
              </p>
            )}
          </motion.form>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Direct</p>
          <div className="mt-6 space-y-3 text-base text-slate-200">
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Location:</strong> {contact.location}
            </p>
            {contact.availability && (
              <p className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-300">
                {contact.availability}
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-4 text-sm uppercase tracking-[0.2em] text-slate-300">
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href={socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3">
              <Github size={20} /> GitHub
            </a>
            <a href={socials.email} className="inline-flex items-center gap-3">
              <Mail size={20} /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoryContact
