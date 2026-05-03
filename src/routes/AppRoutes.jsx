import React, { Suspense, useMemo } from 'react'
import { Routes, Route, useLocation, useOutlet } from 'react-router-dom'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import SkipToContent from '../components/layout/SkipToContent.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import PageTransition from '../components/layout/PageTransition.jsx'
import ParticleNetwork from '../components/effects/ParticleNetwork.jsx'

const Home = React.lazy(() => import('../pages/HomeModern.jsx'))
const About = React.lazy(() => import('../pages/AboutModern.jsx'))
const Services = React.lazy(() => import('../pages/ServicesModern.jsx'))
const Portfolio = React.lazy(() => import('../pages/PortfolioModern.jsx'))
const Certificates = React.lazy(() => import('../pages/CertificatesModern.jsx'))
const Contact = React.lazy(() => import('../pages/ContactModern.jsx'))
const Resume = React.lazy(() => import('../pages/ResumePdf.jsx'))
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'))

const routeConfig = {
  '/': { component: Home },
  '/about': { component: About },
  '/services': { component: Services },
  '/portfolio': { component: Portfolio },
  '/certificates': { component: Certificates },
  '/contact': { component: Contact },
  '/resume': { component: Resume },
  '*': { component: NotFound },
}

function LoadingFallback() {
  return (
    <Center minH="100vh" bg="dark.bg">
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="whiteAlpha.200"
        color="brand.500"
        size="xl"
      />
    </Center>
  )
}

function Layout() {
  const location = useLocation()
  const currentOutlet = useOutlet()

  return (
    <Box
      minH="100vh"
      bg="transparent"
      display="flex"
      flexDir="column"
      position="relative"
      style={{ ['--header-h']: '64px', ['--footer-h']: '64px' }}
    >
      <SkipToContent />
      <ParticleNetwork />
      <Header />
      <Box
        as="main"
        id="main-content"
        flex="1"
        minH={0}
        overflowX="hidden"
        tabIndex={-1}
        outline="none"
        pt="64px"
      >
        <AnimatePresence mode="wait" initial={false}>
          {currentOutlet && React.cloneElement(currentOutlet, { key: location.pathname })}
        </AnimatePresence>
      </Box>
      <Footer />
    </Box>
  )
}

function AppRoute({ path }) {
  const Page = routeConfig[path]?.component || routeConfig['*'].component
  return (
    <PageTransition>
      <Suspense fallback={<LoadingFallback />}>
        <Page />
      </Suspense>
    </PageTransition>
  )
}

export default function AppRoutes() {
  const routes = useMemo(() => Object.keys(routeConfig), [])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {routes.map((path) => (
            <Route
              key={path}
              index={path === '/'}
              path={path !== '/' ? path : undefined}
              element={<AppRoute path={path} />}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}
