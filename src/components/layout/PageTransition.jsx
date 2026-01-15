import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const variants = {
  initial: { opacity: 0, y: 10 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.61, 1, 0.88, 1],
    }
  }
}

export default function PageTransition({ children }) {
  return (
    <Box as={motion.div}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </Box>
  )
}
