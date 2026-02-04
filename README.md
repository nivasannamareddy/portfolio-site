# Nivas Annamareddy – Portfolio

Modern, responsive portfolio for a data analyst / ML engineer. Built with React + Vite, Tailwind, and Framer Motion for smooth animations, parallax gradients, and micro-interactions. All content lives in a single config file for quick updates.

## Features
- Mobile-first layout with staggered scroll reveals, hover polish, parallax hero shapes, and a typing headline.
- Sections: Hero, About, Skills (animated bars), Projects (filters + hover), Experience/Education timeline, Contact form, Footer.
- Light/dark theme toggle, smooth scrolling navigation, and scroll-spy active states.
- Performance-minded: lean assets, code-splitting, gradient placeholders (no heavy images required).

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form (validated contact form)

## Quick Start
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # serve the built site locally
```

## Updating Content (single source of truth)
Edit `src/data/config.js`:
- `personal`: name, title, bio, location, status note, resume URL, typing words.
- `socials`: LinkedIn, GitHub, email.
- `highlights`: quick stats for hero/about.
- `skills`: categories with proficiency levels (drives animated bars).
- `projects`: title, description, tech, impact, links, category, optional images.
- `timeline`: experience + education entries with bullets and tech.
- `contact`: email, phone, location, response-time text.
- `theme`: tweak accent/secondary colors if desired.


### Assets
- Replace `public/resume.pdf` with your real resume to keep the download CTA working.
- Add project thumbnails to `public/images/` and point the `images` fields in `config.js` to them (SVG placeholders are included).

## Design/Interaction Notes
- Parallax hero gradients, animated skill bars, hover micro-interactions, and staggered fades (respects reduced motion).
- Navigation highlights the active section; hero CTA scrolls to contact; includes skip-to-content link.
- Contact form can use EmailJS (set service/template/public key + reply template for auto-replies) or POST to `contact.webhook`; otherwise falls back to client-side logging.

## Contact Form (EmailJS or Webhook)
The contact form supports two modes:
1) **Webhook** – set `contact.webhook` to a POST endpoint.
2) **EmailJS** – set values in `contact.emailProvider`:
   - `serviceId`
   - `templateId`
   - `replyTemplateId` (optional auto‑reply)
   - `publicKey`
   - `toEmail`

EmailJS template variables used:
`name`, `email`, `message`, `to_email`

## Analytics
- **Vercel Analytics** is included automatically when deployed on Vercel.
- **Google Analytics** (optional): set `VITE_GA_ID` in `.env`.

## Deployment (Vercel - recommended)
1. Push this project to a GitHub repo.
2. Go to Vercel → "Add New" → "Project".
3. Import your repo.
4. Framework preset: **Vite** (auto-detected).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.

### Custom Domain (optional)
In Vercel → Project → Settings → Domains, add your domain and follow the DNS steps.

## Other Deployment Options
- **Netlify**: build command `npm run build`, output `dist`.
- **Static hosting/GitHub Pages**: run `npm run build` and host the `dist/` folder.

## File Map
- `src/data/config.js` — all content and theme controls.
- `src/components/` — sections (Navigation, Hero, About, Skills, Projects, Timeline, Contact, Footer, Section).
- `public/resume.pdf` — downloadable resume placeholder.
- `tailwind.config.js` — palette, fonts, utilities.
