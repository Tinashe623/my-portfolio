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
    backdropFilter: 'blur(8px) saturate(180%)',
    hoverBackdropFilter: 'blur(6px) saturate(200%)',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px) saturate(190%)',
    hoverBackdropFilter: 'blur(8px) saturate(210%)',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(6px) saturate(160%)',
    hoverBackdropFilter: 'blur(4px) saturate(180%)',
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
          borderColor: 'rgba(20, 184, 166, 0.4)',
          boxShadow: '0 8px 32px rgba(20, 184, 166, 0.2), 0 0 0 1px rgba(20, 184, 166, 0.25)',
          transition: { duration: 0.2 },
        },
      }

  return (
    <MotionBox
      bg={style.bg}
      backdropFilter={style.backdropFilter}
      borderWidth="1px"
      borderColor={style.borderColor}
      borderRadius="2xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      style={{
        WebkitBackdropFilter: style.backdropFilter,
        transformStyle: hover3d ? 'preserve-3d' : 'flat',
        perspective: hover3d ? '1000px' : 'none',
        contain: 'layout style paint',
        willChange: 'transform',
      }}
      {...hover3dEffect}
      _hover={{
        backdropFilter: style.hoverBackdropFilter,
        WebkitBackdropFilter: style.hoverBackdropFilter,
      }}
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
