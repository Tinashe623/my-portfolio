import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: {
    body: {
      bg: 'gray.900',
      color: 'gray.100',
    },
  },
}

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'cyan',
    },
  },
  Heading: {
    baseStyle: {
      color: 'gray.100',
    },
  },
  Link: {
    baseStyle: (props) => ({
      color: mode('cyan.700', 'cyan.200')(props),
      _hover: { color: mode('cyan.800', 'cyan.300')(props), textDecoration: 'underline' },
      _focusVisible: { boxShadow: '0 0 0 2px rgba(34,211,238,0.5)', outline: 'none' },
      transition: 'color 0.2s ease',
    }),
  },
}

const theme = extendTheme({ config, styles, components })
export default theme
