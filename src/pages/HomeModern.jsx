import React, { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { HeroSection, WhyChooseUsSection, TestimonialsSection, WhatIOfferSection } from '../components/sections'

export default function HomeModern() {
  const memoizedSections = useMemo(() => [
    <HeroSection key="hero" />,
    <WhyChooseUsSection key="why" />,
    <TestimonialsSection key="testimonials" />,
    <WhatIOfferSection key="offer" />,
  ], [])

  return <Box>{memoizedSections}</Box>
}
