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

import GlassCard from '../components/effects/GlassCard'
// Removed AnimatedGradientMesh to let StarField shine
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
          gap={{ base: 12, md: 16, lg: 20 }} // Increased gap for better spacing
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
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 6, md: 8 }}>
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
                fontWeight="800"
                color="dark.textMuted"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Hi, I'm
              </Text>
              <Box textAlign={{ base: 'center', lg: 'left' }}>
                <GradientHeading size="2xl" underline>Tinashe Mundieta</GradientHeading>
              </Box>
            </MotionBox>

            {/* Description */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 8, md: 10 }} mt={6}>
              <Text
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} // Larger font size
                color="dark.textMuted" // Muted text for better contrast vs heading
                lineHeight="tall"
                maxW="3xl"
                textAlign={{ base: 'center', lg: 'left' }}
                fontWeight="400"
              >
                Crafting{' '}
                <Text as="span" fontWeight="700" color="brand.400">
                  exceptional
                </Text>{' '}
                digital experiences. I build accessible, pixel-perfect, and performant web applications using{' '}
                <Text as="span" fontWeight="700" color="white">
                  React
                </Text>{' '}
                and modern technologies.
              </Text>
            </MotionBox>

            {/* CTA Buttons */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 10, md: 12 }}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={5}
                justify={{ base: 'center', lg: 'flex-start' }}
              >
                <Button
                  as={NavLink}
                  to="/portfolio"
                  h={{ base: '56px', md: '64px' }}
                  px={{ base: 8, md: 10 }}
                  w={{ base: 'full', sm: 'auto' }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  variant="primary"
                  rightIcon={<ArrowForwardIcon />}
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
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: `${shimmer} 3s infinite`,
                  }}
                >
                  View My Work
                </Button>
                <Button
                  as={NavLink}
                  to="/contact"
                  h={{ base: '56px', md: '64px' }}
                  px={{ base: 8, md: 10 }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  w={{ base: 'full', sm: 'auto' }}
                  variant="glass"
                  color="white"
                  borderWidth="1px"
                  borderColor="whiteAlpha.300"
                >
                  Contact Me
                </Button>
              </Stack>
            </MotionBox>

            {/* Quick Stats */}
            <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
              <SimpleGrid columns={3} spacing={{ base: 4, md: 6 }} maxW="xl" w="full">
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="relative"
              w={{ base: '240px', sm: '320px', md: '380px', lg: '440px', xl: '500px' }}
              h={{ base: '240px', sm: '320px', md: '380px', lg: '440px', xl: '500px' }}
            >
              {/* Floating rings */}
              <Box
                position="absolute"
                inset="-20px"
                borderRadius="full"
                border="1px solid"
                borderColor="brand.500"
                opacity={0.3}
                animation={`${float} 10s ease-in-out infinite`}
                pointerEvents="none"
              />
              <Box
                position="absolute"
                inset="-40px"
                borderRadius="full"
                border="1px solid"
                borderColor="accent.500"
                opacity={0.2}
                animation={`${float} 14s ease-in-out infinite reverse`}
                pointerEvents="none"
              />

              {/* Main image container */}
              <GlassCard
                p={1}
                borderRadius="full"
                h="100%"
                w="100%"
                hover3d
                position="relative"
                overflow="hidden"
                borderColor="whiteAlpha.200"
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'full',
                  bg: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
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
                  filter="contrast(1.1) brightness(1.1)"
                  border="4px solid rgba(255,255,255,0.1)"
                />
              </GlassCard>

              {/* Floating badges */}
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
