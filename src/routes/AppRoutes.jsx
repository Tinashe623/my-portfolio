import React, { Suspense } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import SkipToContent from '../components/layout/SkipToContent.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import PageTransition from '../components/layout/PageTransition.jsx'

const Home = React.lazy(() => import('../pages/HomeModern.jsx'))
const About = React.lazy(() => import('../pages/AboutModern.jsx'))
const Services = React.lazy(() => import('../pages/ServicesModern.jsx'))
const Portfolio = React.lazy(() => import('../pages/PortfolioModern.jsx'))
const Certificates = React.lazy(() => import('../pages/CertificatesModern.jsx'))
const Contact = React.lazy(() => import('../pages/ContactModern.jsx'))
const Resume = React.lazy(() => import('../pages/ResumeModern.jsx'))
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'))

function Layout() {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      display="flex"
      flexDir="column"
      style={{ ['--header-h']: '64px', ['--footer-h']: '64px' }}
    >
      <SkipToContent />
      <Header />
      <Box
        as="main"
        id="main-content"
        flex="1"
        minH={0}
        overflowX="hidden"
        tabIndex={-1}
        outline="none"
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

function Fallback() {
  return (
    <Center py={10}>
      <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="cyan.300" size="lg" />
    </Center>
  )
}

export default function AppRoutes() {
  const location = useLocation()
  
  return (
    <Suspense fallback={<Fallback />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route index element={<PageTransition><Home /></PageTransition>} />
            <Route path="about" element={<PageTransition><About /></PageTransition>} />
            <Route path="services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="certificates" element={<PageTransition><Certificates /></PageTransition>} />
            <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="resume" element={<PageTransition><Resume /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
