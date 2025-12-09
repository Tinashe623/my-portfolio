export const GRADIENTS = {
  primary: 'linear(135deg, brand.500, ocean.500)',
  primaryHover: 'linear(135deg, brand.400, ocean.400)',
  accent: 'linear(135deg, accent.400, accent.600)',
  subtle: 'linear(135deg, rgba(168, 85, 247, 0.1), rgba(217, 70, 239, 0.1))',
  text: 'linear(135deg, brand.400, ocean.400)',
  textVibrant: 'linear(135deg, brand.300, ocean.300, accent.400)',
}

export const GLASS_EFFECTS = {
  default: {
    bg: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'none',
    borderColor: 'rgba(168, 85, 247, 0.15)',
    shadow: '0 8px 32px rgba(168, 85, 247, 0.1)',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'none',
    borderColor: 'rgba(168, 85, 247, 0.2)',
    shadow: '0 8px 32px rgba(168, 85, 247, 0.15)',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'none',
    borderColor: 'rgba(168, 85, 247, 0.1)',
    shadow: '0 4px 16px rgba(168, 85, 247, 0.08)',
  },
  hover: {
    bg: 'rgba(168, 85, 247, 0.12)',
    backdropFilter: 'none',
    borderColor: 'brand.500',
    shadow: '0 8px 32px rgba(168, 85, 247, 0.3)',
  },
}

export const COLORS = {
  brandRgba: {
    500: '168, 85, 247',
    400: '192, 132, 252',
  },
  accentRgba: {
    500: '217, 70, 239',
    400: '232, 121, 249',
  },
  oceanRgba: {
    900: '12, 74, 110',
    800: '7, 89, 133',
  },
}
