export const GRADIENTS = {
  primary: 'linear(135deg, brand.400, brand.600)',
  primaryHover: 'linear(135deg, brand.300, brand.500)',
  accent: 'linear(135deg, accent.400, accent.600)',
  subtle: 'linear(135deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.1))',
  text: 'linear(135deg, brand.300, accent.300)',
  textVibrant: 'linear(135deg, brand.200, brand.400, accent.400)',
}

export const GLASS_EFFECTS = {
  default: {
    bg: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(180%)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px) saturate(190%)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(6px) saturate(160%)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },
  hover: {
    bg: 'rgba(20, 184, 166, 0.12)',
    backdropFilter: 'blur(6px) saturate(200%)',
    borderColor: 'brand.500',
    shadow: '0 8px 32px rgba(20, 184, 166, 0.25)',
  },
}

export const COLORS = {
  brandRgba: {
    500: '20, 184, 166',
    400: '45, 212, 191',
  },
  accentRgba: {
    500: '245, 158, 11',
    400: '251, 191, 36',
  },
  oceanRgba: {
    900: '15, 23, 42',
    800: '30, 41, 59',
  },
}
