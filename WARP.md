# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type
- React single-page application built with Vite and Chakra UI.

Commands
- Install deps: `npm install`
- Dev server: `npm run dev` (serves at a local port Vite picks, with HMR)
- Build: `npm run build` (outputs to `dist/`)
- Preview built app: `npm run preview`

Tests and lint
- No tests or linters are configured.

High-level architecture
- Entry: `index.html` loads `/src/main.jsx` and mounts on `#root`.
- App shell: `src/main.jsx` wraps the app in `ChakraProvider` and renders `<App />`.
- UI composition: `src/App.jsx` contains the initial layout and sections (Home, About, Services, Skills, Portfolio, Certificates, Contact) implemented with Chakra components (`Box`, `Container`, `Flex`, `Heading`, `Text`, etc.). Extract/new sections should live under `src/` as React components and be composed in `App.jsx`.
- Styling and theming: Prefer Chakra props and theme tokens over custom CSS. If global styles are required, add them via Chakra theme overrides or a minimal CSS file imported in `main.jsx`.
- Assets: static images live under `public/images/` and can be referenced as `/images/...` from React and HTML.

Conventions
- Use Chakra components and responsive props for layout rather than hand-written CSS. Co-locate component code under `src/` and avoid direct DOM manipulation.
