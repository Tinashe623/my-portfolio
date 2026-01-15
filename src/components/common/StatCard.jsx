import React from 'react'
import { Text, Icon, VStack } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import GlassCard from '../effects/GlassCard'
import { COLORS } from '../../constants'

export default function StatCard({
  label,
  value,
  icon = CheckCircleIcon,
  color = 'brand',
  ...props
}) {
  const colorRgba = color === 'brand' ? COLORS.brandRgba[400] : COLORS.accentRgba[400]

  return (
    <GlassCard
      p={{ base: 4, md: 5 }}
      textAlign="center"
      borderWidth="1px"
      borderColor={`rgba(${colorRgba}, 0.2)`}
      _hover={{
        borderColor: `rgba(${colorRgba}, 0.5)`,
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s"
      {...props}
    >
      <VStack spacing={2}>
        <Icon as={icon} boxSize={{ base: 4, md: 5 }} color={`${color}.400`} />
        <Text
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="900"
          bgGradient={`linear(to-r, ${color}.300, ${color}.400)`}
          bgClip="text"
          lineHeight="1.2"
        >
          {value}
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="accent.400">
          {label}
        </Text>
      </VStack>
    </GlassCard>
  )
}
