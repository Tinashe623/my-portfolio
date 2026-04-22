import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  SimpleGrid,
  Badge,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { ANIMATION_VARIANTS, HERO_STATS } from '../../constants'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast', 'System Administrator']

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentRole.length) {
            setCharIndex(charIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (charIndex > 0) {
            setCharIndex(charIndex - 1)
          } else {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <Box position="relative" overflow="hidden" color="white">
      {/* Hero Background Image */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url(/images/hero-image.png)"
        backgroundSize="cover"
        backgroundPosition="center"
        pointerEvents="none"
      />
      {/* Dark overlay for text readability */}
      <Box position="absolute" inset={0} bg="rgba(15, 23, 42, 0.6)" pointerEvents="none" />
      {/* Gradient overlay for depth */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5))"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.15}
        backgroundImage="linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
        backgroundSize="40px 40px"
        pointerEvents="none"
      />
      <MotionBox
        position="absolute"
        top="20%"
        left="10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)"
        filter="blur(60px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        pointerEvents="none"
      />
      <MotionBox
        position="absolute"
        bottom="20%"
        right="10%"
        w="250px"
        h="250px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)"
        filter="blur(50px)"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="30%"
        right="25%"
        w="2px"
        h="150px"
        bg="linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.3), transparent)"
        transform="rotate(15deg)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="35%"
        left="20%"
        w="2px"
        h="100px"
        bg="linear-gradient(to top, transparent, rgba(6, 182, 212, 0.2), transparent)"
        transform="rotate(-10deg)"
        pointerEvents="none"
      />

      {/* Hero Content */}
      <Box minH="100vh" display="flex" alignItems="center" position="relative" zIndex={1}>
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          {/* Floating tech badges - left side */}
          <VStack
            position="absolute"
            left={{ base: 'none', lg: '4vw' }}
            top="50%"
            transform={{ lg: 'translateY(-50%)' }}
            spacing={6}
            display={{ base: 'none', lg: 'flex' }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(99, 102, 241, 0.15)"
                border="1px solid"
                borderColor="brand.400"
              >
                <Text fontSize="sm" color="brand.300" fontWeight="600">
                  React
                </Text>
              </Box>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(6, 182, 212, 0.15)"
                border="1px solid"
                borderColor="accent.400"
              >
                <Text fontSize="sm" color="accent.300" fontWeight="600">
                  TypeScript
                </Text>
              </Box>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(168, 85, 247, 0.15)"
                border="1px solid"
                borderColor="accent.400"
              >
                <Text fontSize="sm" color="accent.300" fontWeight="600">
                  Chakra UI
                </Text>
              </Box>
            </MotionBox>
          </VStack>

          {/* Floating tech badges - right side */}
          <VStack
            position="absolute"
            right={{ base: 'none', lg: '4vw' }}
            top="50%"
            transform={{ lg: 'translateY(-50%)' }}
            spacing={6}
            display={{ base: 'none', lg: 'flex' }}
          >
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(16, 185, 129, 0.15)"
                border="1px solid"
                borderColor="green.400"
              >
                <Text fontSize="sm" color="green.300" fontWeight="600">
                  Linux
                </Text>
              </Box>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(59, 130, 246, 0.15)"
                border="1px solid"
                borderColor="blue.400"
              >
                <Text fontSize="sm" color="blue.300" fontWeight="600">
                  Windows
                </Text>
              </Box>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(249, 115, 22, 0.15)"
                border="1px solid"
                borderColor="orange.400"
              >
                <Text fontSize="sm" color="orange.300" fontWeight="600">
                  Vite
                </Text>
              </Box>
            </MotionBox>
          </VStack>

          {/* Scroll indicator */}
          <MotionBox
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            display={{ base: 'none', md: 'flex' }}
            flexDirection="column"
            alignItems="center"
            cursor="pointer"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <Text fontSize="xs" color="gray.500" fontWeight="500" letterSpacing="wider" mb={2}>
              SCROLL
            </Text>
            <Box
              w="24px"
              h="40px"
              borderRadius="full"
              border="2px solid"
              borderColor="whiteAlpha.300"
              display="flex"
              justifyContent="center"
              pt={2}
            >
              <Box
                w="4px"
                h="8px"
                borderRadius="full"
                bg="brand.400"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Box>
          </MotionBox>

          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            py={{ base: 8, md: 12, lg: 16 }}
          >
            <MotionBox
              variants={ANIMATION_VARIANTS.container}
              initial="hidden"
              animate="show"
              flex={1}
              maxW={{ lg: '800px' }}
            >
              {/* Greeting */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <HStack spacing={2} justify="center">
                  <Text
                    fontSize="3xl"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    👋
                  </Text>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="brand.400"
                    fontWeight="600"
                    letterSpacing="wide"
                  >
                    Hello, welcome to my portfolio
                  </Text>
                </HStack>
              </MotionBox>

              {/* Main Heading */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={2}>
                <Text
                  fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                  fontWeight="800"
                  color="white"
                  textShadow="0 2px 10px rgba(0,0,0,0.5)"
                  lineHeight="shorter"
                >
                  I'm
                </Text>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '4xl' }}
                  fontWeight="900"
                  bgGradient="linear(to-r, brand.400, accent.400)"
                  bgClip="text"
                  textShadow="0 2px 20px rgba(99, 102, 241, 0.3)"
                  lineHeight="shorter"
                  letterSpacing="tight"
                >
                  Tinashe Mundieta
                </Heading>
              </MotionBox>

              {/* Typing Animation Role */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <HStack spacing={2} justify="center">
                  <Text
                    fontSize={{ base: 'md', sm: '2xl', md: '3xl' }}
                    fontWeight="600"
                    color="gray.300"
                  >
                    <Text as="span" color="accent.400">
                      |
                    </Text>
                    {roles[roleIndex].substring(0, charIndex)}
                    <Box
                      as="span"
                      display="inline-block"
                      w="2px"
                      h={{ base: '18px', sm: '22px', md: '28px' }}
                      bg="brand.400"
                      ml={1}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </Text>
                </HStack>
              </MotionBox>

              {/* Description */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={6}>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="gray.400"
                  lineHeight="tall"
                  maxW="lg"
                  mx="auto"
                >
                  Building modern web experiences with{' '}
                  <Text as="span" color="brand.300" fontWeight="600">
                    React
                  </Text>{' '}
                  and delivering comprehensive{' '}
                  <Text as="span" color="accent.300" fontWeight="600">
                    IT solutions
                  </Text>
                  . Let's create something extraordinary together.
                </Text>
              </MotionBox>

              {/* Stats */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
                <SimpleGrid columns={3} spacing={{ base: 2, md: 3 }} maxW="md" mx="auto">
                  {HERO_STATS.map((stat, i) => (
                    <Box
                      key={i}
                      px={4}
                      py={3}
                      borderRadius="xl"
                      bg="rgba(255,255,255,0.03)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        h: '2px',
                        bgGradient:
                          stat.color === 'brand'
                            ? 'linear(to-r, brand.500, brand.300)'
                            : 'linear(to-r, accent.500, accent.300)',
                      }}
                      _hover={{
                        bg: 'rgba(255,255,255,0.05)',
                        borderColor: stat.color === 'brand' ? 'brand.400' : 'accent.400',
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.3s ease"
                    >
                      <VStack spacing={1}>
                        <Text
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="800"
                          bgGradient={`linear(to-r, ${stat.color === 'brand' ? 'brand.400, brand.200' : 'accent.400, accent.200'})`}
                          bgClip="text"
                          lineHeight="1"
                        >
                          {stat.value}
                        </Text>
                        <HStack spacing={1}>
                          <Box
                            w="4px"
                            h="4px"
                            borderRadius="full"
                            bg={stat.color === 'brand' ? 'brand.400' : 'accent.400'}
                          />
                          <Text
                            fontSize="xs"
                            color="gray.400"
                            fontWeight="600"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            {stat.label}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Modern Divider */}
      <Box
        position="relative"
        h="1px"
        bg="linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)"
        opacity={0.5}
      />
    </Box>
  )
}
