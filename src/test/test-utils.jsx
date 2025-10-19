import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import theme from '../theme'

import { render as rtlRender } from '@testing-library/react'

export function render(ui, { route = '/', ...options } = {}) {
  window.history.pushState({}, 'Test page', route)
  return rtlRender(
    <ChakraProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ChakraProvider>,
    options,
  )
}
