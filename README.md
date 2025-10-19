# Tinashe Mundieta Portfolio

A modern, responsive personal portfolio built with React, Vite, Chakra UI, and Framer Motion. It showcases projects, certificates, services, and contact information with smooth animations and accessible, mobile‑first design.

## ✨ Highlights
- Single‑page app with routes: Home, About, Services, Portfolio, Certificates, Contact
- Responsive layout polished for small screens (no horizontal scroll)
- Clean dark UI, animated hero image frame, and subtle hover effects
- Portfolio highlight + curated projects with GitHub/Live links
- Certificates with filters and modal preview + verify links
- Contact section with email and phone chips; mailto form
- Environment‑based config (CV URL, phone numbers, socials)

## 🔧 Tech Stack
- React 18 + Vite 5
- Chakra UI 2 (component system + theme)
- Framer Motion 11 (micro‑interactions)
- React Router 7

## 🚀 Quick Start
```bash
# 1) Install
npm install

# 2) Run dev server
npm run dev

# 3) Production build
npm run build

# 4) Preview the production build
npm run preview
```

## ⚙️ Environment Variables
Copy `.env.example` to `.env` and customize as needed.

- `VITE_CONTACT_PHONE` — primary phone number
- `VITE_CONTACT_PHONE_ALT` — alternate phone number
- `VITE_WHATSAPP_PHONE` — WhatsApp number (digits only, e.g. 263771234567)
- `VITE_FACEBOOK_URL`, `VITE_LINKEDIN_URL` — social links
- `VITE_CV_URL` — path/URL to your CV (e.g. `/Tinashe_Mundieta_cv.docx`)
- `VITE_SCHOOL_WEBSITE_DEMO` — optional live demo link for the featured project

> Tip: Files inside `public/` are served at the site root. For example, `public/Tinashe_Mundieta_cv.docx` is available at `/Tinashe_Mundieta_cv.docx`.

## 🗂️ Project Structure (key files)
```
src/
  components/layout/
    Header.jsx       # Sticky header + mobile drawer
    Footer.jsx       # Footer with social/cv buttons
  pages/
    Home.jsx         # Hero, quick facts, animated ribbon
    About.jsx        # Bio, skills, mobile‑first image
    Services.jsx     # Service cards with icons
    Portfolio.jsx    # Highlight + curated projects
    Certificates.jsx # Filters + modal verify
    Contact.jsx      # Email/phone chips + mailto form
  routes/
    AppRoutes.jsx    # App routing + layout shell
  theme.js           # Chakra theme overrides
```

## 🧩 Content Management
- Projects: edit `src/pages/Portfolio.jsx` (`extraProjects` array and highlight section)
- Certificates: edit the `certs` array in `src/pages/Certificates.jsx`
- Phones / social / CV URL: update `.env`

## 🛡️ Accessibility & Performance
- Keyboard‑focusable controls and visible focus rings
- High‑contrast link colors (auto‑adjust for light/dark contexts)
- Responsive typography and spacing; reduced motion on small screens
- Images use lazy loading and proper object fit

## 📦 Deploying
Any static host works (GitHub Pages, Netlify, Vercel, etc.).

- Build with `npm run build` → deploy the `dist/` folder
- GitHub Pages (static): configure your hosting to serve from `dist/` or use an action to build & publish

## 🔗 Live Demo
Add your live URL here once deployed (e.g. `https://tinashe623.github.io/my-portfolio/`).

## © License / Usage
Content © Tinashe Mundieta. Code is shared for portfolio purposes; feel free to reference structure and patterns.
