import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Badge,
  Divider,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { CheckCircleIcon, ArrowForwardIcon, DownloadIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { motion, isValidMotionProp } from 'framer-motion'
import { keyframes } from '@emotion/react'

import GlassCard from '../components/effects/GlassCard'
import {
  FaReact,
  FaCode,
  FaPalette,
  FaRocket,
  FaLinux,
  FaWindows,
  FaBullseye,
  FaEye,
  FaHandshake,
  FaLightbulb,
  FaClock,
  FaFolderOpen,
  FaUserGraduate,
  FaBriefcase,
  FaStar,
  FaLayerGroup,
} from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

function AnimatedNumber({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { label: 'Projects Completed', value: 10, suffix: '+', color: 'brand' },
  { label: 'Components Built', value: 50, suffix: '+', color: 'accent' },
  { label: 'Hours Coded', value: 500, suffix: '+', color: 'brand' },
  { label: 'Happy Clients', value: 5, suffix: '+', color: 'accent' },
]

const careerTimeline = [
  {
    year: '2023',
    title: 'Started Learning',
    desc: 'Began my journey in web development with HTML, CSS, and JavaScript fundamentals.',
    icon: FaUserGraduate,
    color: 'brand',
  },
  {
    year: '2024',
    title: 'First React Project',
    desc: 'Built my first React application, applying component-based architecture.',
    icon: FaCode,
    color: 'accent',
  },
  {
    year: '2024',
    title: 'System Admin Skills',
    desc: 'Expanded into Windows & Linux administration, hardware maintenance, and IT support.',
    icon: FiSettings,
    color: 'blue',
  },
  {
    year: '2025',
    title: 'Professional Freelance',
    desc: 'Started taking on client projects, delivering real-world web solutions.',
    icon: FaBriefcase,
    color: 'green',
  },
  {
    year: 'Present',
    title: 'Open to Opportunities',
    desc: 'Ready to bring my skills to a dynamic team and grow further.',
    icon: FaStar,
    color: 'purple',
  },
]

const skills = [
  { name: 'React & Hooks', icon: FaReact, color: 'cyan.400' },
  { name: 'Modern CSS', icon: FaPalette, color: 'purple.400' },
  { name: 'Clean Code', icon: FaCode, color: 'brand.400' },
  { name: 'Fast Builds', icon: FaRocket, color: 'brand.300' },
  { name: 'Windows Admin', icon: FaWindows, color: 'blue.400' },
  { name: 'Linux Systems', icon: FaLinux, color: 'orange.400' },
  { name: 'System Maintain', icon: FiSettings, color: 'green.400' },
]

const techStack = [
  'React',
  'TypeScript',
  'JavaScript',
  'Vite',
  'Chakra UI',
  'Framer Motion',
  'HTML5',
  'CSS3',
  'Git',
  'REST APIs',
  'Windows',
  'Linux',
  'System Admin',
]

const missionVision = {
  mission: {
    icon: FaBullseye,
    title: 'My Mission',
    text: 'To deliver exceptional digital solutions that combine technical excellence with reliable IT infrastructure, helping businesses establish a strong online presence while maintaining seamless operations.',
    color: 'brand',
  },
  vision: {
    icon: FaEye,
    title: 'My Vision',
    text: 'To be a trusted partner for businesses seeking comprehensive web development and IT solutions, known for quality craftsmanship, reliability, and commitment to client success.',
    color: 'accent',
  },
}

const coreValues = [
  {
    icon: FaLightbulb,
    title: 'Innovation',
    desc: 'Continuously learning and implementing modern technologies to deliver cutting-edge solutions.',
  },
  {
    icon: FaHandshake,
    title: 'Reliability',
    desc: 'Dependable service delivery with clear communication and accountability.',
  },
  {
    icon: FaClock,
    title: 'Timeliness',
    desc: 'Respecting deadlines and delivering quality work within agreed timeframes.',
  },
  {
    icon: FaLayerGroup,
    title: 'Quality',
    desc: 'Attention to detail and commitment to writing clean, maintainable code.',
  },
]

const whatIDo = [
  'Component-driven UIs with React + Chakra UI',
  'API integration (REST/JSON), form handling, and state management',
  'Accessibility-first mindset and mobile-first layouts',
  'System maintenance and OS administration (Windows & Linux)',
  'Hardware upgrades, troubleshooting, and performance optimization',
  'Collaborative workflows with Git and clear communication',
]

export default function AboutModern() {
  return (
    <Box position="relative" overflow="hidden" color="white">
      {/* Background Effects */}
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.1), transparent)"
        pointerEvents="none"
      />

      <Container
        maxW="8xl"
        position="relative"
        zIndex={1}
        py={{ base: 8, md: 12, lg: 16 }}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 10, md: 12, lg: 14 }}
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
            GET TO KNOW ME
          </Badge>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="800"
            mb={4}
            color="white"
          >
            About{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              Me
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
            Frontend developer with system administration expertise
          </Text>
        </MotionBox>

        {/* Profile + Intro Section */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 8, lg: 12 }}
          mb={{ base: 14, md: 16 }}
        >
          {/* Profile Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            flex={{ base: 'none', lg: '0 0 auto' }}
          >
            <Box position="relative">
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="120%"
                h="120%"
                bg="radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)"
                filter="blur(30px)"
                pointerEvents="none"
              />
              <GlassCard
                variant="strong"
                p={2}
                borderRadius="3xl"
                w={{ base: '260px', md: '300px', lg: '340px' }}
                h={{ base: '260px', md: '300px', lg: '340px' }}
                hover3d
              >
                <MotionImage
                  src="/images/profile-pic (5).png"
                  alt="Tinashe Mundieta"
                  borderRadius="2xl"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  whileHover={{ scale: 1.03 }}
                  transition="0.3s"
                />
              </GlassCard>
            </Box>
          </MotionBox>

          {/* Introduction */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <VStack align="start" spacing={5}>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.300">
                  Frontend Engineer focused on the{' '}
                  <Text as="span" fontWeight="700" color="brand.300">
                    React ecosystem
                  </Text>
                  , with expertise in{' '}
                  <Text as="span" fontWeight="700" color="cyan.300">
                    system administration
                  </Text>{' '}
                  and{' '}
                  <Text as="span" fontWeight="700" color="cyan.300">
                    OS maintenance
                  </Text>
                  . I build responsive, accessible interfaces with attention to performance,
                  readability, and great user experience.
                </Text>

                <Box w="100%">
                  <Heading size="sm" mb={4} color="white" fontWeight="700">
                    What I Do
                  </Heading>
                  <Stack spacing={3}>
                    {whatIDo.map((item, i) => (
                      <HStack key={i} spacing={3}>
                        <Box flexShrink={0}>
                          <Icon as={CheckCircleIcon} color="brand.400" boxSize={5} />
                        </Box>
                        <Text color="gray.400" fontSize="sm">
                          {item}
                        </Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>

                <HStack spacing={4} pt={2} w="100%">
                  <Button
                    as={NavLink}
                    to="/portfolio"
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
                    transition="all 0.3s"
                    rightIcon={<ArrowForwardIcon />}
                    flex={1}
                  >
                    View Work
                  </Button>
                  <Button
                    as={NavLink}
                    to="/contact"
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
                    flex={1}
                  >
                    Contact Me
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        </Flex>

        {/* Mission & Vision */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={{ base: 14, md: 16 }}>
          {[missionVision.mission, missionVision.vision].map((item, i) => (
            <MotionBox
              key={item.title}
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
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: `${item.color}.400`,
                }}
                transition="all 0.3s"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="3px"
                  bgGradient={`linear(to-r, ${item.color}.500, ${item.color}.300)`}
                />
                <HStack align="start" spacing={4}>
                  <Box p={3} borderRadius="xl" bg={`${item.color}.900`} color={`${item.color}.300`}>
                    <Icon as={item.icon} boxSize={6} />
                  </Box>
                  <VStack align="start" spacing={3} flex={1}>
                    <Heading size="md" color="white" fontWeight="700">
                      {item.title}
                    </Heading>
                    <Text color="gray.400" fontSize="sm" lineHeight="tall">
                      {item.text}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Core Values */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mb={{ base: 14, md: 16 }}
        >
          <VStack spacing={8}>
            <Box textAlign="center">
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
                MY VALUES
              </Badge>
              <Heading
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                fontWeight="800"
                color="white"
              >
                Core Values
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} w="100%">
              {coreValues.map((value, i) => (
                <MotionBox
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Box
                    p={6}
                    borderRadius="xl"
                    bg="rgba(255,255,255,0.02)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    textAlign="center"
                    _hover={{
                      borderColor: 'accent.400',
                      transform: 'translateY(-4px)',
                    }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={3}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="rgba(168, 85, 247, 0.15)"
                        color="accent.300"
                      >
                        <Icon as={value.icon} boxSize={6} />
                      </Box>
                      <Heading size="sm" color="white" fontWeight="700">
                        {value.title}
                      </Heading>
                      <Text color="gray.500" fontSize="sm">
                        {value.desc}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>

        {/* Skills Grid */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mb={{ base: 14, md: 16 }}
        >
          <Box textAlign="center" mb={{ base: 8, md: 10 }}>
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
              EXPERTISE
            </Badge>
            <Heading
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              fontWeight="800"
              color="white"
            >
              Skills & Expertise
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 7 }} spacing={4}>
            {skills.map((skill, i) => (
              <MotionBox
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Box
                  p={5}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  textAlign="center"
                  _hover={{
                    borderColor: skill.color,
                    bg: 'rgba(255,255,255,0.04)',
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s"
                >
                  <VStack spacing={2}>
                    <Icon as={skill.icon} boxSize={8} color={skill.color} />
                    <Text fontWeight="600" fontSize="xs" color="gray.300">
                      {skill.name}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Animated Stats */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mb={{ base: 14, md: 16 }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {stats.map((stat, i) => (
              <MotionBox
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Box
                  p={5}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  textAlign="center"
                  _hover={{
                    borderColor: `${stat.color}.400`,
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s"
                >
                  <Text
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight="800"
                    bgGradient={`linear(to-r, ${stat.color}.400, ${stat.color}.200)`}
                    bgClip="text"
                  >
                    <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {stat.label}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Career Timeline */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mb={{ base: 14, md: 16 }}
        >
          <Box textAlign="center" mb={8}>
            <Badge
              px={4}
              py={1}
              borderRadius="full"
              bg="rgba(34, 197, 94, 0.15)"
              color="green.300"
              fontSize="xs"
              fontWeight="600"
              letterSpacing="wide"
              mb={4}
            >
              MY JOURNEY
            </Badge>
            <Heading
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              fontWeight="800"
              color="white"
            >
              Career Timeline
            </Heading>
          </Box>

          <Box
            position="relative"
            pl={{ base: 4, md: 8 }}
            borderLeft="2px solid"
            borderColor="whiteAlpha.200"
          >
            {careerTimeline.map((item, i) => (
              <MotionBox
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                mb={6}
              >
                <HStack align="start" spacing={4}>
                  <Box
                    position="absolute"
                    left="-9px"
                    w={4}
                    h={4}
                    borderRadius="full"
                    bg={
                      item.color === 'brand'
                        ? 'brand.500'
                        : item.color === 'accent'
                          ? 'accent.500'
                          : item.color === 'blue'
                            ? 'blue.500'
                            : item.color === 'green'
                              ? 'green.500'
                              : 'purple.500'
                    }
                    border="4px solid"
                    borderColor="dark.bg"
                  />
                  <Box ml={6}>
                    <Text
                      fontSize="xs"
                      color={
                        item.color === 'brand'
                          ? 'brand.400'
                          : item.color === 'accent'
                            ? 'accent.400'
                            : item.color === 'blue'
                              ? 'blue.400'
                              : item.color === 'green'
                                ? 'green.400'
                                : 'purple.400'
                      }
                      fontWeight="700"
                    >
                      {item.year}
                    </Text>
                    <Heading size="sm" color="white" fontWeight="700" mb={1}>
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.400">
                      {item.desc}
                    </Text>
                  </Box>
                </HStack>
              </MotionBox>
            ))}
          </Box>
        </MotionBox>

        {/* Tech Stack */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.02)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            textAlign="center"
          >
            <Heading size="md" mb={{ base: 5, md: 6 }} color="white" fontWeight="700">
              Technology Stack
            </Heading>
            <Flex wrap="wrap" gap={3} justify="center">
              {techStack.map((tech, i) => (
                <MotionBox
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Box
                    px={4}
                    py={2}
                    borderRadius="full"
                    bg="rgba(99, 102, 241, 0.1)"
                    border="1px solid"
                    borderColor="rgba(99, 102, 241, 0.3)"
                    fontSize="sm"
                    fontWeight="600"
                    color="brand.300"
                    _hover={{
                      bg: 'rgba(99, 102, 241, 0.2)',
                      borderColor: 'brand.400',
                    }}
                    transition="all 0.3s"
                  >
                    {tech}
                  </Box>
                </MotionBox>
              ))}
            </Flex>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
