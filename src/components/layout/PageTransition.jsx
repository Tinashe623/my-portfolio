import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const variants = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1], // Cubic-bezier for smooth feel
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

export default function PageTransition({ children }) {
  return (
    <Box 
      as={motion.div}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </Box>
  )
}
