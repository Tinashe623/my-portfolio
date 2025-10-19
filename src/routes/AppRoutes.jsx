import React, { Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Box, Center, Spinner } from '@chakra-ui/react'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'

const Home = React.lazy(() => import('../pages/Home.jsx'))
const About = React.lazy(() => import('../pages/About.jsx'))
const Services = React.lazy(() => import('../pages/Services.jsx'))
const Portfolio = React.lazy(() => import('../pages/Portfolio.jsx'))
const Certificates = React.lazy(() => import('../pages/Certificates.jsx'))
const Contact = React.lazy(() => import('../pages/Contact.jsx'))

function Layout() {
  return (
    <Box minH="100vh" bg="gray.900" display="flex" flexDir="column" style={{ ['--header-h']: '64px', ['--footer-h']: '64px' }}>
      <Header />
      <Box as="main" flex="1" minH={0} overflowX="hidden">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

function Fallback() {
  return (
    <Center py={10}>
      <Spinner thickness='3px' speed='0.65s' emptyColor='gray.200' color='cyan.300' size='lg' />
    </Center>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
