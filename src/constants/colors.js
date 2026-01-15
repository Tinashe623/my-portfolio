export const GRADIENTS = {
  primary: 'linear(135deg, brand.500, accent.500)',
  primaryHover: 'linear(135deg, brand.600, accent.600)',
  accent: 'linear(135deg, accent.400, accent.600)',
  subtle: 'linear(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))',
  text: 'linear(135deg, brand.400, accent.400)',
  textVibrant: 'linear(135deg, brand.300, accent.300, accent.400)',
}

export const GLASS_EFFECTS = {
  default: {
    bg: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderColor: 'rgba(99, 102, 241, 0.15)',
    shadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    shadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(5px)',
    borderColor: 'rgba(99, 102, 241, 0.1)',
    shadow: '0 4px 16px rgba(99, 102, 241, 0.08)',
  },
  hover: {
    bg: 'rgba(99, 102, 241, 0.12)',
    backdropFilter: 'blur(12px)',
    borderColor: 'brand.500',
    shadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
  },
}

export const COLORS = {
  brandRgba: {
    500: '99, 102, 241', // Indigo
    400: '129, 140, 248',
  },
  accentRgba: {
    500: '6, 182, 212', // Cyan
    400: '34, 211, 238',
  },
}
