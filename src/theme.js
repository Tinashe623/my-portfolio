import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Premium Slate Palette
const colors = {
  brand: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Primary Indigo
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  accent: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf', // Teal/Cyan pop
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  dark: {
    bg: '#050505',       // Pure black/slate base
    bgSecondary: '#0a0a0a',
    card: 'rgba(18, 18, 18, 0.7)', 
    border: 'rgba(255, 255, 255, 0.08)',
    text: '#e2e8f0', // Slate 200
    textMuted: '#94a3b8', // Slate 400
  }
}

const styles = {
  global: (props) => ({
    html: {
      scrollBehavior: 'smooth',
      height: '100%',
    },
    body: {
      bg: modes.bg(props),
      color: 'dark.text',
      fontFamily: 'body',
      overflowX: 'hidden',
      backgroundImage: mode(
        'none',
        'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(20, 184, 166, 0.05) 0%, transparent 30%)'
      )(props),
      backgroundAttachment: 'fixed',
    },
    '::selection': {
      bg: 'brand.500',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'whiteAlpha.200',
      borderRadius: 'full',
      _hover: {
        bg: 'whiteAlpha.300',
      },
      _active: {
        bg: 'whiteAlpha.400',
      },
    },
  }),
}

const modes = {
  bg: (props) => mode('white', 'dark.bg')(props),
}

const fonts = {
  heading: `'Outfit', 'Space Grotesk', sans-serif`,
  body: `'Plus Jakarta Sans', 'Inter', sans-serif`,
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
      _focusVisible: {
        boxShadow: 'outline',
      },
    },
    variants: {
      primary: {
        bg: 'brand.600',
        color: 'white',
        fontSize: 'sm',
        h: '10',
        px: '6',
        _hover: {
          bg: 'brand.500',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)', 
        },
        _active: {
          transform: 'translateY(0)',
          bg: 'brand.700',
        },
        transition: 'all 0.2s',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'whiteAlpha.200',
        color: 'white',
        _hover: {
          bg: 'whiteAlpha.100',
          borderColor: 'whiteAlpha.400',
        },
      },
      ghost: {
        color: 'whiteAlpha.800',
        _hover: {
          bg: 'whiteAlpha.100',
          color: 'white',
        },
      },
      glass: {
        bg: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'whiteAlpha.100',
        color: 'white',
        _hover: {
          bg: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'whiteAlpha.300',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      letterSpacing: '-0.02em',
      color: 'white',
    },
  },
  Text: {
    baseStyle: {
      color: 'dark.textMuted',
      lineHeight: 'tall',
    },
  },
  Container: {
    baseStyle: {
      maxW: '7xl',
      px: { base: 6, md: 8 },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'dark.card',
        backdropFilter: 'blur(12px)',
        borderWidth: '1px',
        borderColor: 'dark.border',
        borderRadius: '2xl',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
    },
  },
}

const theme = extendTheme({ config, colors, styles, fonts, components })
export default theme
