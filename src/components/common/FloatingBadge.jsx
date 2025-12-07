import React from 'react'
import { HStack, Text, VStack, chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import GlassCard from '../effects/GlassCard'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function FloatingBadge({ emoji, title, subtitle, position, delay = 1, ...props }) {
  return (
    <MotionBox
      position="absolute"
      initial={{ opacity: 0, x: position.left ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      display={{ base: 'none', md: 'block' }}
      {...position}
      {...props}
    >
      <GlassCard p={3} variant="strong">
        <HStack spacing={2}>
          <Text fontSize="2xl">{emoji}</Text>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" fontWeight="700">
              {title}
            </Text>
            <Text fontSize="xs" color="ocean.400">
              {subtitle}
            </Text>
          </VStack>
        </HStack>
      </GlassCard>
    </MotionBox>
  )
}
