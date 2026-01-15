import React from 'react'
import { Box, usePrefersReducedMotion } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Subtle animated gradient mesh background for hero sections
// Designed to be low-contrast and professional, with motion disabled
// for users who prefer reduced motion.

const floatGradient = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(36px);
  }
  50% {
    transform: translate3d(-10%, 8%, 0) scale(1.08);
    filter: blur(42px);
  }
  100% {
    transform: translate3d(10%, -8%, 0) scale(1);
    filter: blur(36px);
  }
`

export default function AnimatedGradientMesh(props) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Static fallback for users who prefer reduced motion
  if (prefersReducedMotion) {
    return (
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        opacity={0.35}
        bgGradient="radial(circle at top left, rgba(37, 99, 235, 0.45), transparent 55%), radial(circle at bottom right, rgba(6, 182, 212, 0.45), transparent 55%)"
        {...props}
      />
    )
  }

  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      zIndex={0}
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        inset: '-10%',
        bg: 'radial-gradient(circle at top left, rgba(129, 140, 248, 0.6), transparent 55%), radial-gradient(circle at bottom right, rgba(45, 212, 191, 0.6), transparent 55%)',
        animation: `${floatGradient} 22s ease-in-out infinite alternate`,
        opacity: 0.65,
        mixBlendMode: 'screen',
      }}
      {...props}
    />
  )
}
