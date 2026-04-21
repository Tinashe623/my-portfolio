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
  FaServer,
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
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [charIndex, setCharIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const roles = [
    'Frontend Developer',
    'React Specialist',
    'UI/UX Enthusiast',
    'System Administrator',
  ]

  React.useEffect(() => {
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
      {/* Background Effects */}
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="100%"
        opacity={0.4}
        backgroundImage="radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        pointerEvents="none"
      />

      {/* Hero Section */}
      <Box
        minH="calc(100vh - var(--header-h) - var(--footer-h))"
        display="flex"
        alignItems="center"
        position="relative"
        zIndex={1}
      >
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="space-between"
            gap={{ base: 10, lg: 16 }}
            py={{ base: 8, md: 12, lg: 16 }}
          >
            {/* Left Content */}
            <MotionBox
              variants={ANIMATION_VARIANTS.container}
              initial="hidden"
              animate="show"
              flex={1}
              maxW={{ lg: '600px' }}
            >
              {/* Greeting */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <HStack spacing={2}>
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
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="800"
                  color="white"
                  lineHeight="shorter"
                >
                  I'm
                </Text>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={4}>
                <Heading
                  as="h1"
                  size="3xl"
                  fontWeight="900"
                  bgGradient="linear(to-r, brand.400, accent.400)"
                  bgClip="text"
                  lineHeight="shorter"
                  letterSpacing="tight"
                >
                  Tinashe Mundieta
                </Heading>
              </MotionBox>

              {/* Typing Animation Role */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={6}>
                <HStack spacing={2}>
                  <Text
                    fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
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
                      w="3px"
                      h={{ base: '24px', md: '32px' }}
                      bg="brand.400"
                      ml={1}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </Text>
                </HStack>
              </MotionBox>

              {/* Description */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={8}>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="gray.400"
                  lineHeight="tall"
                  maxW="lg"
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

              {/* CTA Buttons */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={10}>
                <HStack spacing={4} wrap="wrap">
                  <Button
                    as={NavLink}
                    to="/portfolio"
                    size="lg"
                    px={8}
                    fontSize="md"
                    fontWeight="700"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, brand.600, accent.600)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
                    }}
                    transition="all 0.3s"
                    rightIcon={<ArrowForwardIcon />}
                  >
                    View Projects
                  </Button>
                  <Button
                    as={NavLink}
                    to="/contact"
                    size="lg"
                    px={8}
                    fontSize="md"
                    fontWeight="600"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      borderColor: 'brand.400',
                    }}
                  >
                    Get In Touch
                  </Button>
                </HStack>
              </MotionBox>

              {/* Premium Stats */}
              <MotionBox variants={ANIMATION_VARIANTS.itemUp}>
                <SimpleGrid columns={3} spacing={{ base: 3, md: 4 }}>
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
                          fontSize={{ base: '2xl', md: '3xl' }}
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

            {/* Right Side - Profile Image */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              maxW={{ lg: '450px' }}
            >
              <Box position="relative">
                {/* Glow effect behind */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="120%"
                  h="120%"
                  bg="radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)"
                  filter="blur(40px)"
                  pointerEvents="none"
                />

                {/* Image container */}
                <Box
                  position="relative"
                  borderRadius="3xl"
                  overflow="hidden"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{ borderColor: 'brand.400' }}
                  transition="all 0.4s ease"
                  boxShadow="0 0 60px rgba(99, 102, 241, 0.2)"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '3xl',
                    bg: 'linear-gradient(135deg, brand.400, accent.400, brand.400)',
                    zIndex: -1,
                    opacity: 0.5,
                  }}
                >
                  <MotionImage
                    src="images/profile-pic.png"
                    alt="Tinashe Mundieta"
                    w={{ base: '280px', sm: '320px', md: '380px', lg: '420px' }}
                    h={{ base: '280px', sm: '320px', md: '380px', lg: '420px' }}
                    objectFit="cover"
                    whileHover={{ scale: 1.05 }}
                    transition="0.4s ease"
                    filter="contrast(1.05) brightness(1.05)"
                  />
                </Box>

                {/* Floating tech badges */}
                <MotionBox
                  position="absolute"
                  top={{ base: 4, md: 8 }}
                  right={{ base: -4, md: -8 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Box
                    px={4}
                    py={2}
                    bg="rgba(5, 5, 5, 0.8)"
                    backdropFilter="blur(10px)"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="brand.400"
                  >
                    <HStack spacing={2}>
                      <Box w={2} h={2} borderRadius="full" bg="green.400" />
                      <Text fontSize="xs" fontWeight="600" color="brand.300">
                        Available
                      </Text>
                    </HStack>
                  </Box>
                </MotionBox>

                <MotionBox
                  position="absolute"
                  bottom={{ base: 4, md: 8 }}
                  left={{ base: -4, md: -8 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Box
                    px={4}
                    py={2}
                    bg="rgba(5, 5, 5, 0.8)"
                    backdropFilter="blur(10px)"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="accent.400"
                  >
                    <Text fontSize="xs" fontWeight="600" color="accent.300">
                      React ⚛️
                    </Text>
                  </Box>
                </MotionBox>
              </Box>
            </MotionBox>
          </Flex>

          {/* Scroll Indicator */}
          <MotionBox
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <VStack
              spacing={2}
              cursor="pointer"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <Text fontSize="xs" color="gray.500" fontWeight="500" letterSpacing="wider">
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
            </VStack>
          </MotionBox>
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

      {/* Services Preview Section */}
      <Box py={{ base: 20, md: 24, lg: 28 }} bg="rgba(5, 5, 5, 0.3)">
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
              bg="rgba(34, 211, 238, 0.15)"
              color="cyan.300"
              fontSize="xs"
              fontWeight="600"
              letterSpacing="wide"
              mb={4}
            >
              WHAT I OFFER
            </Badge>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight="800"
              mb={4}
              color="white"
            >
              Services{' '}
              <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
                I Provide
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
              Delivering comprehensive digital solutions tailored to your needs
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
            {[
              {
                title: 'Web Development',
                desc: 'Modern, responsive websites and web applications built with React and cutting-edge technologies.',
                icon: FaCode,
                color: 'brand',
              },
              {
                title: 'UI/UX Design',
                desc: 'Pixel-perfect, accessible user interfaces with smooth animations and intuitive interactions.',
                icon: FaRocket,
                color: 'accent',
              },
              {
                title: 'System Administration',
                desc: 'Windows & Linux server management, maintenance, upgrades, and technical support.',
                icon: FaServer,
                color: 'green',
              },
            ].map((service, i) => (
              <MotionBox
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  p={7}
                  borderRadius="2xl"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    borderColor: `${service.color}.400`,
                    bg: 'rgba(255,255,255,0.04)',
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s ease"
                  cursor="default"
                >
                  <HStack align="start" spacing={4}>
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg={`${service.color}.900`}
                      color={`${service.color}.300`}
                    >
                      <Icon as={service.icon} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={2} flex={1}>
                      <Heading size="md" color="white" fontWeight="700">
                        {service.title}
                      </Heading>
                      <Text color="gray.400" fontSize="sm" lineHeight="tall">
                        {service.desc}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            mt={10}
            textAlign="center"
          >
            <Button
              as={NavLink}
              to="/services"
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              _hover={{
                bg: 'whiteAlpha.100',
                borderColor: 'brand.400',
              }}
              rightIcon={<ArrowForwardIcon />}
            >
              View All Services
            </Button>
          </MotionBox>
        </Container>
      </Box>

      {/* Trusted By / Brands Section */}
      <Box py={{ base: 14, md: 16 }}>
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            mb={8}
          >
            <Text
              fontSize="sm"
              color="gray.500"
              fontWeight="600"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Trusted by businesses
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={{ base: 6, md: 8 }}>
            {[
              'GMP Electrical',
              'Tarie Cakes',
              'Saeku',
              'St James School',
              'Reigns Hydraulics',
              'Exquisite',
            ].map((brand, i) => (
              <MotionBox
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Box
                  py={4}
                  px={2}
                  textAlign="center"
                  borderRadius="lg"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.50"
                  _hover={{
                    borderColor: 'brand.400',
                    bg: 'rgba(255,255,255,0.04)',
                  }}
                  transition="all 0.3s"
                >
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="700"
                    color="gray.300"
                    letterSpacing="wide"
                  >
                    {brand}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box py={{ base: 20, md: 24, lg: 28 }}>
        <Container maxW="4xl" px={{ base: 4, md: 6, lg: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              p={{ base: 8, md: 12 }}
              borderRadius="3xl"
              bg="linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))"
              border="1px solid"
              borderColor="whiteAlpha.200"
              position="relative"
              overflow="hidden"
              textAlign="center"
            >
              <Box
                position="absolute"
                top="-50%"
                left="-50%"
                w="200%"
                h="200%"
                bg="radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
                pointerEvents="none"
              />
              <VStack spacing={6} position="relative" zIndex={1}>
                <Heading
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                  fontWeight="800"
                  color="white"
                >
                  Ready to{' '}
                  <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
                    collaborate?
                  </Text>
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="lg">
                  Whether you need a website, IT support, or have a project in mind - let's discuss
                  how I can help bring your vision to life.
                </Text>
                <HStack spacing={4} pt={2}>
                  <Button
                    as={NavLink}
                    to="/contact"
                    size="lg"
                    px={8}
                    fontSize="md"
                    fontWeight="700"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, brand.600, accent.600)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
                    }}
                    transition="all 0.3s"
                  >
                    Get In Touch
                  </Button>
                  <Button
                    as={NavLink}
                    to="/portfolio"
                    size="lg"
                    px={8}
                    fontSize="md"
                    fontWeight="600"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      borderColor: 'brand.400',
                    }}
                  >
                    View Projects
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  )
}
