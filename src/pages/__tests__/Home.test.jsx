import React from 'react'
import { screen } from '@testing-library/react'
import Home from '../../pages/Home.jsx'
import { render } from '../../test/test-utils.jsx'

it('renders Home hero heading', () => {
  render(<Home />)
  expect(
    screen.getByRole('heading', {
      name: /hi! i'm tinashe mundieta/i,
      level: 1,
    }),
  ).toBeInTheDocument()
})
