import React from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  Stack,
  Icon,
  Badge,
  Avatar,
  chakra,
  shouldForwardProp,
  SimpleGrid,
} from '@chakra-ui/react'
import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { motion, isValidMotionProp } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import {
  FaCode,
  FaRocket,
  FaTools,
  FaWindows,
  FaLinux,
  FaBolt,
  FaCheck,
  FaQuoteRight,
} from 'react-icons/fa'

const iconMap = {
  FaCode,
  FaRocket,
  FaTools,
  FaWindows,
  FaLinux,
  FaBolt,
}

import GlassCard from '../components/effects/GlassCard'
import { GradientHeading, StatCard, StatusBadge, FloatingBadge } from '../components/common'
import {
  ANIMATION_VARIANTS,
  HERO_STATS,
  HERO_BADGES,
  FLOATING_BADGES,
  WHY_CHOOSE_US,
  TESTIMONIALS,
} from '../constants'

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
    <Box position="relative" overflow="hidden" color="white">
      {/* Hero Section */}
      <Box
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
            direction={{ base: 'column', xl: 'row' }}
            align="center"
            gap={{ base: 12, md: 14, xl: 20 }}
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
                  justify={{ base: 'center', xl: 'flex-start' }}
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
                  textAlign={{ base: 'center', xl: 'left' }}
                >
                  Hi, I'm
                </Text>
                <Box textAlign={{ base: 'center', xl: 'left' }}>
                  <GradientHeading size="2xl" underline>
                    Tinashe Mundieta
                  </GradientHeading>
                </Box>
              </MotionBox>

              {/* Description */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={{ base: 8, md: 10 }} mt={6}>
                <Text
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} // Larger font size
                  color="dark.textMuted" // Muted text for better contrast vs heading
                  lineHeight="tall"
                  maxW="3xl"
                  textAlign={{ base: 'center', xl: 'left' }}
                  fontWeight="400"
                >
                  Crafting{' '}
                  <Text as="span" fontWeight="700" color="brand.400">
                    exceptional
                  </Text>{' '}
                  digital experiences. I build accessible, pixel-perfect, and performant web
                  applications using{' '}
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
                  justify={{ base: 'center', xl: 'flex-start' }}
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
                // Use smaller fixed sizes on tablet/small-laptop widths to avoid crowding/overflow.
                w={{
                  base: '180px',
                  sm: '240px',
                  md: '280px',
                  lg: '320px',
                  xl: '340px',
                  '2xl': '380px',
                }}
                h={{
                  base: '180px',
                  sm: '240px',
                  md: '280px',
                  lg: '320px',
                  xl: '340px',
                  '2xl': '380px',
                }}
                maxW="min(90vw, 500px)"
                maxH="min(90vw, 500px)"
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

      {/* Modern Divider */}
      <Box
        position="relative"
        h="1px"
        bg="linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)"
        opacity={0.5}
      />

      {/* Why Choose Us Section */}
      <Box py={{ base: 20, md: 24, lg: 28 }} position="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)"
          pointerEvents="none"
        />
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} position="relative" zIndex={1}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            mb={{ base: 14, md: 16 }}
          >
            <Badge
              px={4}
              py={1}
              borderRadius="full"
              bg="rgba(99, 102, 241, 0.15)"
              color="brand.300"
              fontSize="xs"
              fontWeight="600"
              letterSpacing="wide"
              mb={4}
            >
              WHY WORK WITH ME
            </Badge>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight="800"
              mb={4}
              color="white"
            >
              Building Your Vision with{' '}
              <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
                Precision
              </Text>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.400"
              maxW="2xl"
              mx="auto"
              lineHeight="tall"
            >
              Combining modern frontend development with system administration expertise to deliver
              comprehensive digital solutions
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 6 }}>
            {WHY_CHOOSE_US.map((item, i) => (
              <MotionBox
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  p={6}
                  borderRadius="2xl"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    borderColor: 'brand.400',
                    bg: 'rgba(99, 102, 241, 0.05)',
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s ease"
                  cursor="default"
                >
                  <HStack align="start" spacing={4}>
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg="linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15))"
                      color="brand.300"
                      flexShrink={0}
                    >
                      <Icon as={iconMap[item.icon]} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={2} flex={1}>
                      <Heading size="sm" color="white" fontWeight="700">
                        {item.title}
                      </Heading>
                      <Text color="gray.400" fontSize="sm" lineHeight="tall">
                        {item.desc}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Modern Divider */}
      <Box h="150px" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          h="1px"
          bg="linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 50%, transparent 100%)"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="300px"
          h="1px"
          bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)"
        />
      </Box>

      {/* Testimonials Section */}
      <Box py={{ base: 20, md: 24, lg: 28 }} position="relative">
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            mb={{ base: 14, md: 16 }}
          >
            <Badge
              px={4}
              py={1}
              borderRadius="full"
              bg="rgba(168, 85, 247, 0.15)"
              color="accent.300"
              fontSize="xs"
              fontWeight="600"
              letterSpacing="wide"
              mb={4}
            >
              TESTIMONIALS
            </Badge>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight="800"
              mb={4}
              color="white"
            >
              Client{' '}
              <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
                Feedback
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
              Real feedback from projects I've worked on
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
            {TESTIMONIALS.map((testimonial, i) => (
              <MotionBox
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  p={7}
                  borderRadius="2xl"
                  bg="linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    borderColor: 'accent.400',
                    boxShadow: '0 0 40px rgba(168,85,247,0.1)',
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="absolute" top="-20px" right="20px" opacity={0.1}>
                    <Icon as={FaQuoteRight} boxSize={16} color="accent.300" />
                  </Box>
                  <VStack align="start" spacing={4} position="relative">
                    <Text color="gray.300" fontSize="md" lineHeight="tall" fontStyle="italic">
                      "{testimonial.quote}"
                    </Text>
                    <HStack spacing={4} pt={2}>
                      <Avatar src={testimonial.avatar} name={testimonial.name} size="md" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="700" color="white" fontSize="sm">
                          {testimonial.name}
                        </Text>
                        <Text color="dark.textMuted" fontSize="xs">
                          {testimonial.role}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}
