import React from 'react'
import { Heading, Text, chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const MotionHeading = chakra(motion.h1, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function GradientHeading({
  children,
  gradient = 'linear(135deg, brand.300, accent.300)',
  underline = false,
  textAlign = { base: 'center', lg: 'left' },
  mb = { base: 4, md: 6 },
  fontSize = { base: '3xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl' },
  ...props
}) {
  return (
    <MotionHeading
      as="h1"
      fontSize={fontSize}
      lineHeight={{ base: 1.15, md: 1.12, lg: 1.1 }}
      fontWeight="900"
      mb={mb}
      textAlign={textAlign}
      {...props}
    >
      <Text
        as="span"
        bgGradient={gradient}
        bgClip="text"
        position="relative"
        display="inline-block"
        _after={
          underline
            ? {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                right: 0,
                height: '4px',
                bgGradient: gradient,
                borderRadius: 'full',
              }
            : {}
        }
      >
        {children}
      </Text>
    </MotionHeading>
  )
}
