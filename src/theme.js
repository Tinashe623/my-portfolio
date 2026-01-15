import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Modern "Deep Midnight" Palette
const colors = {
  brand: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Electric Indigo
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  accent: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee', // Neon Cyan
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  dark: {
    bg: '#020410',       // Deepest midnight blue, almost black
    card: 'rgba(20, 20, 35, 0.6)', 
    border: 'rgba(99, 102, 241, 0.1)',
  }
}

const styles = {
  global: (props) => ({
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      bg: modes.bg(props),
      color: 'whiteAlpha.900',
      fontFamily: 'body',
      overflowX: 'hidden',
    },
    '::selection': {
      bg: 'brand.500',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '8px',
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
    },
  }),
}

// Helper to switch modes (though we enforce dark mode mostly, good to have)
const modes = {
  bg: (props) => mode('white', '#020410')(props),
}

const fonts = {
  heading: `'Outfit', 'Space Grotesk', sans-serif`,
  body: `'Plus Jakarta Sans', 'Inter', sans-serif`,
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'xl',
    },
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-2px)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)', 
        },
        transition: 'all 0.2s',
      },
      gradient: {
        bgGradient: 'linear(to-r, brand.500, accent.500)',
        color: 'white',
        _hover: {
          bgGradient: 'linear(to-r, brand.600, accent.600)',
          transform: 'translateY(-2px)',
          boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)',
        },
        transition: 'all 0.3s',
      },
      glass: {
        bg: 'whiteAlpha.100',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'whiteAlpha.200',
        color: 'white',
        _hover: {
          bg: 'whiteAlpha.200',
          borderColor: 'brand.400',
        },
      },
      // Keep existing variants if needed or map them
      solid: {
         // Mapping solid to primary style as default fallback
        bg: 'brand.500',
        color: 'white',
        _hover: { bg: 'brand.600' }
      }
    },
    defaultProps: {
      colorScheme: 'brand',
    },
  },
  Heading: {
    baseStyle: {
      letterSpacing: '-0.02em',
    },
  },
  Container: {
    baseStyle: {
      maxW: '7xl',
      px: { base: 4, md: 8 },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'dark.card',
        backdropFilter: 'blur(16px)',
        borderWidth: '1px',
        borderColor: 'dark.border',
        borderRadius: '2xl',
        boxShadow: 'xl',
      },
    },
  },
}

const theme = extendTheme({ config, colors, styles, fonts, components })
export default theme
