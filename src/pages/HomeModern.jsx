import React, { useMemo } from 'react'
import { Box, Container, VStack, HStack, Text, Heading, Button, SimpleGrid, Badge, Icon, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FaCode, FaRocket, FaPalette, FaUsers, FaCheckCircle, FaTools, FaServer, FaQuoteRight } from 'react-icons/fa'
import { ANIMATION_VARIANTS, HERO_STATS, WHY_CHOOSE_US, TESTIMONIALS } from '../constants'
import GlassCard from '../components/effects/GlassCard'

const MotionBox = motion.create(Box)

const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast']

const highlights = [
  {
    title: 'Frontend Development',
    desc: 'React, TypeScript, and modern tooling for production-ready apps.',
    icon: FaCode,
    color: 'brand',
  },
  {
    title: 'UI/UX Implementation',
    desc: 'Responsive, accessible interfaces with smooth interactions.',
    icon: FaPalette,
    color: 'accent',
  },
  {
    title: 'Remote Collaboration',
    desc: 'Async-friendly workflows with clear milestones and updates.',
    icon: FaUsers,
    color: 'brand',
  },
  {
    title: 'Performance & SEO',
    desc: 'Optimized load times, clean bundles, and Core Web Vitals.',
    icon: FaRocket,
    color: 'accent',
  },
]

function HeroSection() {
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [charIndex, setCharIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [hasReducedMotion, setHasReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHasReducedMotion(prefersReducedMotion.matches)
    const handler = (e) => setHasReducedMotion(e.matches)
    prefersReducedMotion.addEventListener('change', handler)
    return () => prefersReducedMotion.removeEventListener('change', handler)
  }, [])

  React.useEffect(() => {
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

  const backgroundEffects = React.useMemo(() => [
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

  const heroStats = React.useMemo(() => HERO_STATS, [])

  return (
    <Box position="relative" overflow="hidden" color="white" bg="dark.bg">
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
      <Box
        position="absolute"
        inset={0}
        bgImage="/images/hero.webp"
        bgSize="cover"
        bgPosition="center"
        opacity={0.25}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(15,23,42,0.3), rgba(15,23,42,0.7))"
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
              <Text fontSize="sm" color="green.300" fontWeight="600">Remote</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(59, 130, 246, 0.15)" border="1px solid" borderColor="blue.400">
              <Text fontSize="sm" color="blue.300" fontWeight="600">Freelance</Text>
            </Badge>
            <Badge px={4} py={2} borderRadius="full" bg="rgba(249, 115, 22, 0.15)" border="1px solid" borderColor="orange.400">
              <Text fontSize="sm" color="orange.300" fontWeight="600">Vite</Text>
            </Badge>
          </VStack>

          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" py={{ base: 8, md: 12, lg: 16 }}>
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
                  I&apos;m
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
                  Available for freelance projects worldwide. I build modern web experiences with <Text as="span" color="brand.300" fontWeight="600">React</Text> and deliver clean, accessible interfaces for remote-ready businesses.
                </Text>
              </MotionBox>

              <MotionBox variants={ANIMATION_VARIANTS.itemUp} mb={8}>
                <HStack spacing={4} justify="center" flexWrap="wrap">
                  <Button
                    as={NavLink}
                    to="/contact"
                    size="lg"
                    px={8}
                    fontWeight="700"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, brand.600, accent.600)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                    }}
                    rightIcon={<ArrowForwardIcon />}
                    transition="all 0.3s"
                  >
                    Start a Project
                  </Button>
                  <Button
                    as={NavLink}
                    to="/portfolio"
                    size="lg"
                    px={8}
                    fontWeight="600"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      borderColor: 'brand.400',
                    }}
                  >
                    View Portfolio
                  </Button>
                </HStack>
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
          </Box>
        </Container>
      </Box>

      <Box position="relative" h="1px" bg="linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" opacity={0.5} />
    </Box>
  )
}

function HighlightsSection() {
  return (
    <Box py={{ base: 10, md: 14 }} position="relative">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 10, md: 12 }}
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
            WHAT I DO
          </Badge>
          <Heading fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} fontWeight="800" mb={4} color="white">
            Built for <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">remote teams</Text> and founders
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto" lineHeight="tall">
            Freelance frontend services tailored for product teams that need reliable execution, clear communication, and fast delivery.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, md: 6 }}>
          {highlights.map((item, i) => (
            <MotionBox
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard p={6} textAlign="center" h="100%">
                <VStack spacing={3}>
                  <Box p={3} borderRadius="full" bg={`${item.color}.900`} color={`${item.color}.300`}>
                    <Icon as={item.icon} boxSize={6} />
                  </Box>
                  <Heading size="sm" color="white" fontWeight="700">
                    {item.title}
                  </Heading>
                  <Text color="gray.400" fontSize="sm" lineHeight="tall">
                    {item.desc}
                  </Text>
                </VStack>
              </GlassCard>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

function WhyChooseUsSection() {
  const iconMap = {
    FaCode,
    FaRocket,
    FaTools,
    FaUsers,
    FaPalette,
    FaCheckCircle,
  }

  return (
    <Box pt={{ base: 8, md: 12 }} pb={{ base: 8, md: 12 }} position="relative">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 10, md: 12 }}
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
            Why{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              Choose Me
            </Text>
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.400"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            Modern frontend development expertise for digital products that users love
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

      <Box h="30px" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="30%"
          h="1px"
          bg="linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)"
        />
      </Box>
    </Box>
  )
}

function TestimonialsSection() {
  return (
    <Box pt={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }} position="relative">
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
            Real feedback from projects I&apos;ve worked on
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, md: 6 }}>
          {TESTIMONIALS.map((testimonial, i) => (
            <MotionBox
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                p={{ base: 5, md: 7 }}
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
                  <Text color="gray.300" fontSize="sm" lineHeight="tall" fontStyle="italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </Text>
                  <HStack spacing={3} pt={2}>
                    <Avatar src={testimonial.avatar} name={testimonial.name} size="sm" />
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
  )
}

function WhatIOfferSection() {
  const services = [
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
      title: 'Performance Optimization',
      desc: 'Optimize your web applications for speed, SEO, and better user experience with best practices.',
      icon: FaPalette,
      color: 'brand',
    },
    {
      title: 'Website Maintenance',
      desc: 'Keep your web presence fresh with content updates, bug fixes, performance monitoring, and security patches.',
      icon: FaTools,
      color: 'accent',
    },
    {
      title: 'API Integration',
      desc: 'Connect your frontend to REST APIs with proper state management, error handling, and data flow.',
      icon: FaServer,
      color: 'brand',
    },
  ]

  return (
    <Box pt={{ base: 8, md: 12 }} pb={{ base: 16, md: 20 }} bg="rgba(5, 5, 5, 0.3)">
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
            SERVICES
          </Badge>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="800"
            mb={4}
            color="white"
          >
            What I{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              Provide
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
            End-to-end frontend services for remote teams and founders
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {services.map((service, i) => (
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
  )
}

function CtaSection() {
  return (
    <Box py={{ base: 10, md: 14 }} position="relative">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard variant="strong" p={{ base: 6, sm: 8, md: 10 }} textAlign="center">
            <VStack spacing={4}>
              <Badge
                px={4}
                py={1}
                borderRadius="full"
                bg="rgba(99, 102, 241, 0.15)"
                color="brand.300"
                fontSize="xs"
                fontWeight="600"
                letterSpacing="wide"
              >
                LET&apos;S WORK TOGETHER
              </Badge>
              <Heading fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} fontWeight="800" color="white">
                Ready to start your next project?
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="2xl" lineHeight="tall">
                I&apos;m available for freelance projects and remote collaborations. Tell me about your idea and I&apos;ll help you ship it.
              </Text>
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  as={NavLink}
                  to="/contact"
                  size="lg"
                  px={8}
                  fontWeight="700"
                  bgGradient="linear(to-r, brand.500, accent.500)"
                  color="white"
                  _hover={{
                    bgGradient: 'linear(to-r, brand.600, accent.600)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                  }}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Get In Touch
                </Button>
                <Button
                  as={NavLink}
                  to="/portfolio"
                  size="lg"
                  px={8}
                  fontWeight="600"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'brand.400',
                  }}
                >
                  View Portfolio
                </Button>
              </HStack>
            </VStack>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default function HomeModern() {
  const memoizedSections = useMemo(() => [
    <HeroSection key="hero" />,
    <HighlightsSection key="highlights" />,
    <WhyChooseUsSection key="why" />,
    <TestimonialsSection key="testimonials" />,
    <WhatIOfferSection key="offer" />,
    <CtaSection key="cta" />,
  ], [])

  return <Box>{memoizedSections}</Box>
}
