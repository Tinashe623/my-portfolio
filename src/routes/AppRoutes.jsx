import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Services from '../pages/Services.jsx'
import Portfolio from '../pages/Portfolio.jsx'
import Certificates from '../pages/Certificates.jsx'
import Contact from '../pages/Contact.jsx'

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

export default function AppRoutes() {
  return (
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
  )
}
