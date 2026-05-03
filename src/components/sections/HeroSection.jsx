import React, { useState, useEffect, useMemo } from 'react'
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
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ANIMATION_VARIANTS, HERO_STATS } from '../../constants'

const MotionBox = motion.create(Box)

const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast', 'System Administrator']

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHasReducedMotion(prefersReducedMotion.matches)
    const handler = (e) => setHasReducedMotion(e.matches)
    prefersReducedMotion.addEventListener('change', handler)
    return () => prefersReducedMotion.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (hasReducedMotion) {
      setCharIndex(roles[0].length)
      return
    }

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
  }, [charIndex, isDeleting, roleIndex, hasReducedMotion])

  const backgroundEffects = useMemo(() => [
    {
      style: {
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: 'full',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'pulse 8s ease-in-out infinite',
      },
    },
    {
      style: {
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        borderRadius: 'full',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'pulse 10s ease-in-out infinite',
      },
    },
  ], [])

  const heroStats = useMemo(() => HERO_STATS, [])

  return (
    <Box position="relative" overflow="hidden" color="white">
      <Box
        position="absolute"
        inset={0}
        background="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
        pointerEvents="none"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.1); }
              }
            `,
          }}
        />
        {backgroundEffects.map((effect, i) => (
          <Box key={i} position="absolute" {...effect.style} />
        ))}
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
      </Box>
      <Box
        position="absolute"
        inset={0}
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        pointerEvents="none"
      />
      {hasReducedMotion && (
        <Box position="absolute" inset={0} bg="rgba(15, 23, 42, 0.7)" pointerEvents="none" />
      )}

      <Box minH="100vh" display="flex" alignItems="center" position="relative" zIndex={1}>
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack position="absolute" left={{ base: 'none', lg: '4vw' }} top="50%" transform={{ lg: 'translateY(-50%)' }} spacing={6} display={{ base: 'none', lg: 'flex' }}>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(99, 102, 241, 0.15)" border="1px solid" borderColor="brand.400">
              <Text fontSize="sm" color="brand.300" fontWeight="600">React</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(6, 182, 212, 0.15)" border="1px solid" borderColor="accent.400">
              <Text fontSize="sm" color="accent.300" fontWeight="600">TypeScript</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(168, 85, 247, 0.15)" border="1px solid" borderColor="accent.400">
              <Text fontSize="sm" color="accent.300" fontWeight="600">Chakra UI</Text>
            </Badge>
          </VStack>

          <VStack position="absolute" right={{ base: 'none', lg: '4vw' }} top="50%" transform={{ lg: 'translateY(-50%)' }} spacing={6} display={{ base: 'none', lg: 'flex' }}>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(16, 185, 129, 0.15)" border="1px solid" borderColor="green.400">
              <Text fontSize="sm" color="green.300" fontWeight="600">Linux</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(59, 130, 246, 0.15)" border="1px solid" borderColor="blue.400">
              <Text fontSize="sm" color="blue.300" fontWeight="600">Windows</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(249, 115, 22, 0.15)" border="1px solid" borderColor="orange.400">
              <Text fontSize="sm" color="orange.300" fontWeight="600">Vite</Text>
            </Badge>
          </VStack>

          <Flex direction="column" align="center" justify="center" textAlign="center" py={{ base: 8, md: 12, lg: 16 }}>
            <MotionBox variants={ANIMATION_VARIANTS.container} initial="hidden" animate="show" flex={1} maxW={{ lg: '800px' }}>
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <HStack spacing={2} justify="center">
                  <Text fontSize="3xl" animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}>
                    👋
                  </Text>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.400" fontWeight="600" letterSpacing="wide">
                    Hello, welcome to my portfolio
                  </Text>
                </HStack>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={2}>
                <Text fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }} fontWeight="800" color="white" textShadow="0 2px 10px rgba(0,0,0,0.5)" lineHeight="shorter">
                  I'm
                </Text>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <Heading as="h1" fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '4xl' }} fontWeight="900" bgGradient="linear(to-r, brand.400, accent.400)" bgClip="text" textShadow="0 2px 20px rgba(99, 102, 241, 0.3)" lineHeight="shorter" letterSpacing="tight">
                  Tinashe Mundieta
                </Heading>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <HStack spacing={2} justify="center">
                  <Text fontSize={{ base: 'md', sm: '2xl', md: '3xl' }} fontWeight="600" color="gray.300">
                    {hasReducedMotion ? roles[0] : roles[roleIndex].substring(0, charIndex)}
                    {!hasReducedMotion && (
                      <Box as="span" display="inline-block" w="2px" h={{ base: '18px', sm: '22px', md: '28px' }} bg="brand.400" ml={1} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                    )}
                  </Text>
                </HStack>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={6}>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.400" lineHeight="tall" maxW="lg" mx="auto">
                  Building modern web experiences with <Text as="span" color="brand.300" fontWeight="600">React</Text> and delivering comprehensive <Text as="span" color="accent.300" fontWeight="600">IT solutions</Text>. Let's create something extraordinary together.
                </Text>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
                <SimpleGrid columns={3} spacing={{ base: 2, md: 3 }} maxW="md" mx="auto">
                  {heroStats.map((stat, i) => (
                    <Box key={i} px={4} py={3} borderRadius="xl" bg="rgba(255,255,255,0.03)" border="1px solid" borderColor="whiteAlpha.100" position="relative" overflow="hidden" _hover={{ bg: 'rgba(255,255,255,0.05)', borderColor: stat.color === 'brand' ? 'brand.400' : 'accent.400', transform: 'translateY(-2px)' }} transition="all 0.3s ease">
                      <VStack spacing={1}>
                        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800" bgGradient={`linear(to-r, ${stat.color === 'brand' ? 'brand.400, brand.200' : 'accent.400, accent.200'})`} bgClip="text" lineHeight="1">
                          {stat.value}
                        </Text>
                        <HStack spacing={1}>
                          <Box w="4px" h="4px" borderRadius="full" bg={stat.color === 'brand' ? 'brand.400' : 'accent.400'} />
                          <Text fontSize="xs" color="gray.400" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
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

      <Box position="relative" h="1px" bg="linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" opacity={0.5} />
    </Box>
  )
}
