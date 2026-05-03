import { useNavigate } from 'react-router-dom'

const routeComponents = {
  '/': () => import('../pages/HomeModern.jsx'),
  '/about': () => import('../pages/AboutModern.jsx'),
  '/services': () => import('../pages/ServicesModern.jsx'),
  '/portfolio': () => import('../pages/PortfolioModern.jsx'),
  '/certificates': () => import('../pages/CertificatesModern.jsx'),
  '/contact': () => import('../pages/ContactModern.jsx'),
  '/resume': () => import('../pages/ResumePdf.jsx'),
}

let prefetchedRoutes = new Set()

export const useRoutePrefetch = () => {
  useNavigate()

  const prefetchRoute = (path) => {
    if (prefetchedRoutes.has(path) || !routeComponents[path]) return

    routeComponents[path]().catch(() => {
      // Ignore prefetch errors
    })
    prefetchedRoutes.add(path)
  }

  const setupNavLinkPrefetch = (navElement) => {
    if (!navElement) return () => {}

    const handleMouseEnter = (e) => {
      const link = e.target.closest('[data-prefetch-path]')
      if (link) {
        prefetchRoute(link.dataset.prefetchPath)
      }
    }

    const handleTouchStart = (e) => {
      const link = e.target.closest('[data-prefetch-path]')
      if (link) {
        prefetchRoute(link.dataset.prefetchPath)
      }
    }

    navElement.addEventListener('mouseenter', handleMouseEnter, true)
    navElement.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      navElement.removeEventListener('mouseenter', handleMouseEnter, true)
      navElement.removeEventListener('touchstart', handleTouchStart)
    }
  }

  return { prefetchRoute, setupNavLinkPrefetch }
}
