import React from 'react'
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function NotFound() {
  return (
    <Box
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      bg="gray.900"
      color="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 50% 50%, rgba(34,211,238,0.15), transparent 60%)"
      />
      <Container maxW="2xl" position="relative" zIndex={1}>
        <VStack spacing={6} textAlign="center">
          <Heading
            fontSize={{ base: '6xl', md: '8xl' }}
            bgGradient="linear(to-r, cyan.300, purple.300)"
            bgClip="text"
            fontWeight="extrabold"
          >
            404
          </Heading>
          <Heading size={{ base: 'lg', md: 'xl' }} color="gray.100">
            Page Not Found
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="md">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </Text>
          <Button
            as={NavLink}
            to="/"
            colorScheme="cyan"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            mt={4}
          >
            Back to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
