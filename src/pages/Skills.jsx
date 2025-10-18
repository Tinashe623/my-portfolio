import React from 'react'
import { Box, Container, Heading, SimpleGrid, Text, Progress, Stack, CircularProgress, CircularProgressLabel, chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function Skills() {
  const bars = [
    { label: 'JavaScript', value: 72 },
    { label: 'CSS3', value: 80 },
    { label: 'HTML5', value: 90 },
  ]
  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.900" color="gray.100">
      <Container maxW="6xl">
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Heading size="xl" color="cyan.300" textAlign="center" mb={10}>My Skills</Heading>
        </MotionBox>
        <SimpleGrid as={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={5}>
            {bars.map((b) => (
              <Box key={b.label}>
                <Text mb={2}>{b.label}</Text>
                <Progress colorScheme="cyan" value={b.value} borderRadius="md" />
              </Box>
            ))}
          </Stack>
          <SimpleGrid columns={{ base: 3 }} spacing={6} justifyItems="center">
            {bars.map((b) => (
              <CircularProgress key={b.label} value={b.value} size="120px" color="cyan.300" trackColor="gray.700">
                <CircularProgressLabel>{b.value}%</CircularProgressLabel>
              </CircularProgress>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
