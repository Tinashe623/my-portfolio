import { extendTheme } from '@chakra-ui/react'

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
}

const theme = extendTheme({ config, styles, components })
export default theme
