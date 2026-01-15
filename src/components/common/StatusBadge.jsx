import React from 'react'
import { Badge } from '@chakra-ui/react'
import { COLORS } from '../../constants'

export default function StatusBadge({ emoji, text, colorScheme = 'brand', ...props }) {
  const colorRgba = colorScheme === 'brand' ? COLORS.brandRgba[500] : COLORS.accentRgba[500]

  return (
    <Badge
      colorScheme={colorScheme}
      variant="subtle"
      px={{ base: 3, md: 4 }}
      py={{ base: 1.5, md: 2 }}
      borderRadius="full"
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight="600"
      bg={`rgba(${colorRgba}, 0.15)`}
      backdropFilter="blur(6px)"
      borderWidth="1px"
      borderColor={`rgba(${colorRgba}, 0.3)`}
      color="white"
      _hover={{
        transform: 'scale(1.05)',
        bg: `rgba(${colorRgba}, 0.25)`,
        borderColor: `rgba(${colorRgba}, 0.6)`,
        boxShadow: `0 0 12px rgba(${colorRgba}, 0.25)`,
        cursor: 'default',
      }}
      transition="all 0.2s"
      {...props}
    >
      {emoji && `${emoji} `}
      {text}
    </Badge>
  )
}
