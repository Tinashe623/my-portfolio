import React from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  HStack,
  Button,
  Stack,
  chakra,
  shouldForwardProp,
  SimpleGrid,
} from '@chakra-ui/react'
import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { motion, isValidMotionProp } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import AnimatedGradientMesh from '../components/effects/AnimatedGradientMesh'
import GlassCard from '../components/effects/GlassCard'
import { GradientHeading, StatCard, StatusBadge, FloatingBadge } from '../components/common'
import { ANIMATION_VARIANTS, HERO_STATS, HERO_BADGES, FLOATING_BADGES } from '../constants'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`

export default function HomeModern() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      color="white"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      display="flex"
      alignItems="center"
    >
      {/* Animated Gradient Mesh Background */}
      <AnimatedGradientMesh variant="hero" intensity="high" />

      <Container
        maxW="7xl"
        position="relative"
        zIndex={1}
        py={{ base: 8, md: 10, lg: 12 }}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 8, md: 10, lg: 12 }}
          maxW="100%"
        >
          {/* Left Content */}
          <MotionBox
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
            flex={1}
          >
            {/* Animated Badge */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 4, md: 6 }}>
              <HStack
                spacing={{ base: 2, md: 3 }}
                wrap="wrap"
                justify={{ base: 'center', lg: 'flex-start' }}
              >
                {HERO_BADGES.map((badge, index) => (
                  <StatusBadge
                    key={index}
                    emoji={badge.emoji}
                    text={badge.text}
                    colorScheme={badge.colorScheme}
                  />
                ))}
              </HStack>
            </MotionBox>

            {/* Main Heading with Gradient */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
              <Text
                as="span"
                display="block"
                mb={2}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="900"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Hi, I'm
              </Text>
              <GradientHeading underline>Tinashe Mundieta</GradientHeading>
            </MotionBox>

            {/* Description */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 6, md: 8 }}>
              <Text
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                color="ocean.300"
                lineHeight="tall"
                maxW="2xl"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Crafting{' '}
                <Text as="span" fontWeight="700" color="brand.300">
                  pixel-perfect
                </Text>
                ,{' '}
                <Text as="span" fontWeight="700" color="brand.400">
                  accessible
                </Text>
                , and{' '}
                <Text as="span" fontWeight="700" color="accent.400">
                  delightful
                </Text>{' '}
                web experiences with React, TypeScript, and modern tools.
              </Text>
            </MotionBox>

            {/* CTA Buttons */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 6, md: 10 }}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                justify={{ base: 'center', lg: 'flex-start' }}
              >
                <Button
                  as={NavLink}
                  to="/portfolio"
                  h={{ base: '64px', md: '60px' }}
                  px={{ base: 8, md: 10 }}
                  w={{ base: 'full', sm: 'auto' }}
                  fontSize={{ base: 'lg', md: 'lg' }}
                  bgGradient="linear(135deg, brand.400, brand.600)"
                  color="white"
                  borderRadius={{ base: 'xl', md: 'lg' }}
                  _hover={{
                    bgGradient: 'linear(135deg, brand.300, brand.500)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35)',
                  }}
                  _active={{
                    transform: 'translateY(0) scale(0.98)',
                  }}
                  transition="all 0.2s"
                  rightIcon={<ArrowForwardIcon />}
                  fontWeight="700"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: `${shimmer} 3s infinite`,
                  }}
                >
                  View My Work
                </Button>
                <Button
                  as={NavLink}
                  to="/contact"
                  h={{ base: '64px', md: '60px' }}
                  px={{ base: 8, md: 10 }}
                  fontSize={{ base: 'lg', md: 'lg' }}
                  w={{ base: 'full', sm: 'auto' }}
                  borderRadius={{ base: 'xl', md: 'lg' }}
                  variant="glass"
                  fontWeight="700"
                  color="gray.200"
                  _hover={{
                    bg: 'rgba(168, 85, 247, 0.2)',
                    borderColor: 'brand.400',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  }}
                >
                  Contact Me
                </Button>
              </Stack>
            </MotionBox>

            {/* Quick Stats */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
              <SimpleGrid columns={3} spacing={{ base: 3, md: 4 }} maxW="xl" w="full">
                {HERO_STATS.map((stat, i) => (
                  <StatCard
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    icon={CheckCircleIcon}
                    color={stat.color}
                  />
                ))}
              </SimpleGrid>
            </MotionBox>
          </MotionBox>

          {/* Right Side - 3D Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="relative"
              w={{ base: '200px', sm: '240px', md: '280px', lg: '380px', xl: '460px' }}
              h={{ base: '200px', sm: '240px', md: '280px', lg: '380px', xl: '460px' }}
              sx={{
                '@media (min-width: 768px) and (max-height: 700px)': {
                  w: '240px',
                  h: '240px',
                },
              }}
            >
              {/* Floating rings - Hidden on small mobile */}
              <Box
                position="absolute"
                inset="-20px"
                borderRadius="full"
                border="2px solid"
                borderColor="rgba(20, 184, 166, 0.2)"
                animation={`${float} 6s ease-in-out infinite`}
                pointerEvents="none"
                display={{ base: 'none', sm: 'block' }}
              />
              <Box
                position="absolute"
                inset="-40px"
                borderRadius="full"
                border="2px solid"
                borderColor="rgba(245, 158, 11, 0.15)"
                animation={`${float} 8s ease-in-out infinite reverse`}
                pointerEvents="none"
                display={{ base: 'none', sm: 'block' }}
              />

              {/* Main image container with glass effect */}
              <GlassCard
                variant="strong"
                p={2}
                borderRadius="full"
                h="100%"
                w="100%"
                hover3d
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'full',
                  bg: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(245,158,11,0.2))',
                  filter: 'blur(30px)',
                }}
              >
                <MotionImage
                  src="images/profile-pic.png"
                  alt="Tinashe Mundieta"
                  borderRadius="full"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  loading="eager"
                  whileHover={{ scale: 1.05 }}
                  transition="0.3s ease"
                />
              </GlassCard>

              {/* Floating badges - Hidden on mobile */}
              {FLOATING_BADGES.map((badge, index) => (
                <FloatingBadge
                  key={index}
                  emoji={badge.emoji}
                  title={badge.title}
                  subtitle={badge.subtitle}
                  position={badge.position}
                  delay={1 + index * 0.2}
                />
              ))}
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  )
}
