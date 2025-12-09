import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  ocean: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
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
      bg: '#0F0A1F',
      color: '#f0f9ff',
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
        borderWidth: '1px',
        borderColor: 'rgba(168, 85, 247, 0.2)',
        color: 'white',
        _hover: {
          bg: 'rgba(168, 85, 247, 0.12)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(168, 85, 247, 0.35)',
          borderColor: 'brand.500',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      solid: {
        bg: 'linear-gradient(135deg, brand.500, ocean.500)',
        color: 'white',
        _hover: {
          bg: 'linear-gradient(135deg, brand.400, ocean.400)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
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
