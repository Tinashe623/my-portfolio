import React from 'react'
import { Box } from '@chakra-ui/react'
import {
  HeroSection,
  WhyChooseUsSection,
  TestimonialsSection,
  WhatIOfferSection,
} from '../components/sections'

export default function HomeModern() {
  return (
    <Box>
      <HeroSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <WhatIOfferSection />
    </Box>
  )
}
