export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  },

  itemUp: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  },

  itemFade: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
}

export const TRANSITION_CONFIGS = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  smooth: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  fast: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

export const HOVER_EFFECTS = {
  lift: {
    whileHover: {
      transform: 'translateY(-2px)',
      transition: { duration: 0.2 },
    },
    whileTap: {
      transform: 'translateY(0)',
    },
  },
  scale: {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  },
  glow: {
    whileHover: {
      boxShadow: '0 8px 32px rgba(20, 184, 166, 0.25)',
      transition: { duration: 0.2 },
    },
  },
}
