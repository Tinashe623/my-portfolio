import React from 'react'
import { Link } from '@chakra-ui/react'

export default function SkipToContent() {
  return (
    <Link
      href="#main-content"
      position="absolute"
      left="-999px"
      top="8px"
      zIndex={9999}
      bg="cyan.500"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      fontWeight="bold"
      _focus={{
        left: '8px',
        outline: '3px solid',
        outlineColor: 'cyan.300',
        outlineOffset: '2px',
      }}
    >
      Skip to main content
    </Link>
  )
}
