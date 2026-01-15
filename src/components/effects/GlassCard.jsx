import React from 'react'
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const variants = {
  default: {
    bg: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'none',
    hoverBackdropFilter: 'none',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'none',
    hoverBackdropFilter: 'none',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'none',
    hoverBackdropFilter: 'none',
  },
}

export default function GlassCard({ children, variant = 'default', hover3d = false, ...props }) {
  const style = variants[variant]

  const hover3dEffect = hover3d
    ? {
        whileHover: {
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.3 },
        },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {
        whileHover: {
          scale: 1.02,
          borderColor: 'rgba(99, 102, 241, 0.4)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.25)',
          transition: { duration: 0.2 },
        },
      }

  return (
    <MotionBox
      bg={style.bg}
      borderWidth="1px"
      borderColor={style.borderColor}
      borderRadius="2xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      style={{
        transformStyle: hover3d ? 'preserve-3d' : 'flat',
        perspective: hover3d ? '1000px' : 'none',
        contain: 'layout style paint',
        willChange: 'transform',
      }}
      {...hover3dEffect}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '2xl',
        padding: '1px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}
