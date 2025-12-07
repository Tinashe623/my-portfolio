import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  ocean: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.08)',
  },
}

const styles = {
  global: {
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      bg: 'ocean.900',
      color: 'ocean.50',
      overflowX: 'hidden',
    },
    '#root': {
      isolation: 'isolate',
      minHeight: '100vh',
    },
    '@media (min-width: 768px) and (max-height: 700px)': {
      body: {
        fontSize: '14px',
      },
    },
  },
}

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
    variants: {
      glass: {
        bg: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        _hover: {
          bg: 'rgba(20, 184, 166, 0.15)',
          backdropFilter: 'blur(6px)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(20, 184, 166, 0.25)',
          borderColor: 'brand.500',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      solid: {
        bg: 'linear-gradient(135deg, brand.500, brand.600)',
        color: 'white',
        _hover: {
          bg: 'linear-gradient(135deg, brand.400, brand.500)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      color: 'ocean.50',
      fontWeight: '800',
      letterSpacing: '-0.02em',
    },
  },
  Link: {
    baseStyle: (props) => ({
      color: mode('brand.700', 'brand.300')(props),
      _hover: {
        color: mode('brand.800', 'brand.200')(props),
        textDecoration: 'underline',
      },
      _focusVisible: {
        boxShadow: '0 0 0 2px rgba(20, 184, 166, 0.5)',
        outline: 'none',
      },
      transition: 'all 0.2s ease',
    }),
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
}

const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
}

const theme = extendTheme({ config, colors, styles, components, fonts })
export default theme
