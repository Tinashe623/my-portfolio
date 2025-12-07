import React from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const meshMove = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 30px) scale(0.9);
  }
`

export default function AnimatedGradientMesh({ variant = 'default', intensity = 'medium' }) {
  const variants = {
    default: {
      bg: 'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
    },
    hero: {
      bg: 'linear-gradient(-45deg, rgba(20, 184, 166, 0.08), rgba(245, 158, 11, 0.06), rgba(20, 184, 166, 0.08), rgba(245, 158, 11, 0.06))',
    },
    vibrant: {
      bg: 'radial-gradient(circle at 30% 20%, rgba(20, 184, 166, 0.2) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 50%)',
    },
    subtle: {
      bg: 'radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.06) 0%, transparent 60%), radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.04) 0%, transparent 60%)',
    },
  }

  const intensityMap = {
    low: { blur: '120px', opacity: 0.3 },
    medium: { blur: '100px', opacity: 0.5 },
    high: { blur: '80px', opacity: 0.7 },
  }

  const config = intensityMap[intensity]

  return (
    <>
      {/* Animated gradient background */}
      <Box
        position="absolute"
        inset={0}
        bg={variants[variant].bg}
        backgroundSize="400% 400%"
        animation={variant === 'hero' ? `${gradientAnimation} 15s ease infinite` : 'none'}
        zIndex={0}
        pointerEvents="none"
      />

      {/* Floating orbs */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(20, 184, 166, 0.15), transparent 70%)"
        filter={`blur(${config.blur})`}
        opacity={config.opacity}
        animation={`${meshMove} 20s ease-in-out infinite`}
        zIndex={0}
        pointerEvents="none"
      />

      <Box
        position="absolute"
        top="60%"
        right="10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(245, 158, 11, 0.12), transparent 70%)"
        filter={`blur(${config.blur})`}
        opacity={config.opacity}
        animation={`${meshMove} 25s ease-in-out infinite reverse`}
        zIndex={0}
        pointerEvents="none"
      />

      <Box
        position="absolute"
        top="40%"
        left="50%"
        w="350px"
        h="350px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(20, 184, 166, 0.1), transparent 70%)"
        filter={`blur(${config.blur})`}
        opacity={config.opacity}
        animation={`${meshMove} 30s ease-in-out infinite`}
        sx={{ animationDelay: '5s' }}
        zIndex={0}
        pointerEvents="none"
      />
    </>
  )
}
