import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Link,
  HStack,
  VStack,
  Stack,
  SimpleGrid,
  Badge,
  Icon,
  Image,
  Flex,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { keyframes } from '@emotion/react'
import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import AnimatedGradientMesh from '../components/effects/AnimatedGradientMesh'
import GlassCard from '../components/effects/GlassCard'
import { FaGithub, FaExternalLinkAlt, FaUsers, FaCode } from 'react-icons/fa'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`

// NOTE: Desktop tuning will primarily be controlled via Grid row heights and image preview heights
const projects = [
  {
    name: 'School Website',
    desc: 'Full-featured school website with modern UI, responsive design, and clean architecture.',
    url: 'https://github.com/Tinashe623/school-website',
    homepage: null,
    tags: ['React', 'Vite', 'Chakra UI'],
    featured: true,
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '1 / 1 / 3 / 3' },
  },
  {
    name: 'Saeku Web Platform',
    desc: 'Modern web application for Saeku. Developed frontend components, user interfaces, and integrated with backend services.',
    url: 'https://github.com/farscorp/saeku-web-frontend',
    homepage: null,
    tags: ['React', 'TypeScript', 'Frontend'],
    collaborative: true,
    role: 'Frontend Developer',
    team: 'Farscorp Team',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '3 / 1 / 4 / 3' },
  },
  {
    name: 'Saeku Backend Services',
    desc: 'Backend infrastructure and API services for the Saeku platform. Contributed to service development and API integration.',
    url: 'https://github.com/farscorp/saeku-backend-services',
    homepage: null,
    tags: ['Backend', 'API', 'Services'],
    collaborative: true,
    role: 'Developer',
    team: 'Farscorp Team',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '3 / 3 / 4 / 5' },
  },
  {
    name: 'Netflix Clone',
    desc: 'Netflix-style UI with hero section, content rows, and responsive cards.',
    url: 'https://github.com/Tinashe623/netflix-clone',
    homepage: null,
    tags: ['React', 'CSS3', 'UI/UX'],
    inProgress: true,
    image:
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '1 / 3 / 2 / 5' },
  },
  {
    name: 'Todo App',
    desc: 'React Todo app with hooks, clean UI, and full CRUD functionality.',
    url: 'https://github.com/Tinashe623/react-todo-app',
    homepage: null,
    tags: ['React', 'Hooks', 'State'],
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '2 / 3 / 3 / 4' },
  },
  {
    name: 'Temperature Converter',
    desc: 'Instant temperature conversion with clean interface and validation.',
    url: 'https://github.com/Tinashe623/temperature-conversion-program',
    homepage: null,
    tags: ['JavaScript', 'DOM'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
    gridArea: { base: 'auto', md: '2 / 4 / 3 / 5' },
  },
  {
    name: 'Amazon UI',
    desc: 'Amazon-inspired storefront with navigation, product grid, and responsive patterns.',
    url: 'https://github.com/Tinashe623/amazon-project',
    homepage: null,
    tags: ['HTML', 'CSS', 'Layout'],
    inProgress: true,
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop&q=80',
    // Move to its own row on desktop to avoid overlap and inconsistent background blending
    gridArea: { base: 'auto', md: '4 / 1 / 5 / 3' },
  },
]

export default function PortfolioModern() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const featuredProject = projects.find((p) => p.featured)
  const regularProjects = projects.filter((p) => !p.featured)

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      py={{ base: 8, md: 12, lg: 16 }}
    >
      <AnimatedGradientMesh variant="vibrant" intensity="medium" />

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 10, md: 12, lg: 14 }}
        >
          <Heading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="900"
            mb={5}
            bgGradient="linear(135deg, brand.300, accent.300)"
            bgClip="text"
            letterSpacing="tight"
          >
            Featured Work
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="gray.400"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            A showcase of web applications built with modern technologies, clean architecture, and
            attention to detail.
          </Text>
        </MotionBox>

        {/* Featured Project Hero */}
        {featuredProject && (
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            mb={{ base: 12, md: 16, lg: 20 }}
          >
            <GlassCard
              p={0}
              overflow="hidden"
              position="relative"
              borderWidth="1px"
              borderColor="rgba(34, 211, 238, 0.3)"
              _hover={{
                borderColor: 'rgba(34, 211, 238, 0.6)',
              }}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              <Flex direction={{ base: 'column', lg: 'row' }} h="100%">
                {/* Hero Image */}
                <Box
                  position="relative"
                  w={{ base: '100%', lg: '55%' }}
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  overflow="hidden"
                  _hover={{ '& > img': { transform: 'scale(1.05)' } }}
                >
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    filter="brightness(0.9) saturate(1.1)"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-r, rgba(17, 24, 39, 0.7), transparent 60%)"
                  />
                  {/* Featured Badge */}
                  <Box position="absolute" top={6} left={6}>
                    <Flex
                      align="center"
                      gap={2}
                      px={4}
                      py={2}
                      borderRadius="full"
                      bg="rgba(34, 211, 238, 0.15)"
                      backdropFilter="blur(20px)"
                      border="1px solid rgba(34, 211, 238, 0.4)"
                    >
                      <Text fontSize="xl">⭐</Text>
                      <Text
                        fontSize="sm"
                        fontWeight="800"
                        bgGradient="linear(to-r, brand.200, accent.200)"
                        bgClip="text"
                        letterSpacing="wider"
                      >
                        FEATURED PROJECT
                      </Text>
                    </Flex>
                  </Box>
                </Box>

                {/* Hero Content */}
                <VStack
                  align="start"
                  justify="center"
                  p={{ base: 6, md: 8, lg: 12 }}
                  spacing={6}
                  flex={1}
                  bg="rgba(17, 24, 39, 0.4)"
                  backdropFilter="blur(10px)"
                >
                  <Heading
                    size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                    color="white"
                    lineHeight="shorter"
                  >
                    {featuredProject.name}
                  </Heading>

                  <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall">
                    {featuredProject.desc}
                  </Text>

                  {/* Technologies */}
                  <Flex wrap="wrap" gap={3}>
                    {featuredProject.tags.map((tag) => (
                      <Box
                        key={tag}
                        px={4}
                        py={2}
                        borderRadius="lg"
                        bg="rgba(34, 211, 238, 0.1)"
                        backdropFilter="blur(10px)"
                        border="1px solid rgba(34, 211, 238, 0.25)"
                        _hover={{
                          bg: 'rgba(34, 211, 238, 0.2)',
                          borderColor: 'rgba(34, 211, 238, 0.5)',
                          transform: 'translateY(-2px)',
                        }}
                        transition="all 0.3s"
                        cursor="pointer"
                      >
                        <Text fontSize="sm" fontWeight="600" color="brand.200" letterSpacing="wide">
                          {tag}
                        </Text>
                      </Box>
                    ))}
                  </Flex>

                  {/* Action Buttons */}
                  <HStack spacing={4} w="100%">
                    <Button
                      as={Link}
                      href={featuredProject.url}
                      isExternal
                      size="lg"
                      flex={1}
                      bg="rgba(255, 255, 255, 0.1)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      color="gray.200"
                      leftIcon={<Icon as={FaGithub} boxSize={5} />}
                      _hover={{
                        bg: 'rgba(168, 85, 247, 0.2)',
                        borderColor: 'brand.400',
                        color: 'white',
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      View Code
                    </Button>
                    {featuredProject.homepage && (
                      <Button
                        as={Link}
                        href={featuredProject.homepage}
                        isExternal
                        size="lg"
                        flex={1}
                        bgGradient="linear(to-r, cyan.500, purple.500)"
                        color="white"
                        leftIcon={<Icon as={FaExternalLinkAlt} boxSize={4} />}
                        _hover={{
                          bgGradient: 'linear(to-r, cyan.400, purple.400)',
                          transform: 'translateY(-2px)',
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Live Demo
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </Flex>
            </GlassCard>
          </MotionBox>
        )}

        {/* Regular Projects Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 6, md: 8, lg: 10 }}
          mb={{ base: 12, md: 16, lg: 20 }}
        >
          {regularProjects.map((project, i) => (
            <MotionBox
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <GlassCard
                p={0}
                h="100%"
                overflow="hidden"
                position="relative"
                borderWidth="1px"
                borderColor={
                  hoveredProject === project.name
                    ? 'rgba(34, 211, 238, 0.5)'
                    : 'rgba(255, 255, 255, 0.1)'
                }
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  borderColor: 'rgba(34, 211, 238, 0.6)',
                  transform: 'translateY(-8px)',
                }}
              >
                {/* Project Image with Overlay */}
                <Box position="relative" overflow="hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    objectFit="cover"
                    w="100%"
                    h="260px"
                    transition="transform 0.5s"
                    _groupHover={{ transform: 'scale(1.1)' }}
                    filter="brightness(0.85)"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.3))"
                  />

                  {/* Badges */}
                  <Flex
                    position="absolute"
                    top={4}
                    left={4}
                    right={4}
                    justify="space-between"
                    align="start"
                    zIndex={2}
                  >
                    <VStack align="start" spacing={2}>
                      {project.collaborative && (
                        <Badge
                          px={3}
                          py={1}
                          borderRadius="md"
                          bg="rgba(168, 85, 247, 0.15)"
                          backdropFilter="blur(10px)"
                          border="1px solid rgba(168, 85, 247, 0.4)"
                          color="purple.200"
                          fontSize="xs"
                          fontWeight="700"
                          letterSpacing="wider"
                        >
                          <HStack spacing={1.5}>
                            <Icon as={FaUsers} boxSize={3} />
                            <Text>TEAM</Text>
                          </HStack>
                        </Badge>
                      )}
                    </VStack>
                    {project.inProgress && (
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg="rgba(251, 191, 36, 0.15)"
                        backdropFilter="blur(10px)"
                        border="1px solid rgba(251, 191, 36, 0.4)"
                        color="yellow.200"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="wider"
                        animation={`${pulse} 2s infinite`}
                      >
                        IN PROGRESS
                      </Badge>
                    )}
                  </Flex>
                </Box>

                {/* Card Content */}
                <VStack align="start" p={6} spacing={4} flex={1}>
                  <Heading size="md" color="white" lineHeight="shorter">
                    {project.name}
                  </Heading>

                  {project.collaborative && (
                    <Text fontSize="xs" color="brand.400" fontWeight="600">
                      {project.role && `🎯 ${project.role}`}
                      {project.team && ` • 👥 ${project.team}`}
                    </Text>
                  )}

                  <Text color="gray.400" fontSize="sm" lineHeight="tall" flex={1}>
                    {project.desc}
                  </Text>

                  {/* Tech Tags */}
                  <Flex wrap="wrap" gap={2}>
                    {project.tags.map((tag) => (
                      <Box
                        key={tag}
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg="rgba(34, 211, 238, 0.1)"
                        border="1px solid rgba(34, 211, 238, 0.2)"
                        _hover={{
                          bg: 'rgba(34, 211, 238, 0.2)',
                          borderColor: 'rgba(34, 211, 238, 0.4)',
                        }}
                        transition="all 0.2s"
                      >
                        <Text fontSize="xs" fontWeight="600" color="brand.200">
                          {tag}
                        </Text>
                      </Box>
                    ))}
                  </Flex>

                  {/* Action Buttons */}
                  <HStack spacing={3} w="100%">
                    <Button
                      as={Link}
                      href={project.url}
                      isExternal
                      size="sm"
                      flex={1}
                      variant="ghost"
                      leftIcon={<Icon as={FaGithub} />}
                      color="gray.200"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.2)"
                      _hover={{
                        bg: 'rgba(168, 85, 247, 0.2)',
                        borderColor: 'brand.400',
                        color: 'white',
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.3s"
                    >
                      Code
                    </Button>
                    {project.homepage && (
                      <Button
                        as={Link}
                        href={project.homepage}
                        isExternal
                        size="sm"
                        flex={1}
                        bgGradient="linear(to-r, cyan.500, purple.500)"
                        color="white"
                        leftIcon={<Icon as={FaExternalLinkAlt} />}
                        _hover={{
                          bgGradient: 'linear(to-r, cyan.400, purple.400)',
                          transform: 'translateY(-2px)',
                        }}
                        transition="all 0.3s"
                      >
                        Live
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </GlassCard>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard p={{ base: 6, sm: 8, md: 12 }} textAlign="center" variant="strong">
            <Heading size={{ base: 'md', md: 'lg' }} mb={{ base: 3, md: 4 }}>
              Have a project in mind?
            </Heading>
            <Text
              color="gray.300"
              mb={{ base: 5, md: 6 }}
              maxW="xl"
              mx="auto"
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="tall"
            >
              I'm currently available for freelance work and full-time opportunities. Let's build
              something amazing together!
            </Text>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={{ base: 3, sm: 4 }}
              justify="center"
              w={{ base: 'full', sm: 'auto' }}
            >
              <Button
                as={NavLink}
                to="/contact"
                size={{ base: 'md', md: 'lg' }}
                w={{ base: 'full', sm: 'auto' }}
                bg="linear-gradient(135deg, #22d3ee, #a855f7)"
                color="white"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
                rightIcon={<ArrowForwardIcon />}
              >
                Get In Touch
              </Button>
              <Button
                as={Link}
                href="https://github.com/Tinashe623"
                isExternal
                size={{ base: 'md', md: 'lg' }}
                w={{ base: 'full', sm: 'auto' }}
                variant="glass"
                color="gray.200"
                leftIcon={<Icon as={FaGithub} />}
                _hover={{
                  bg: 'rgba(168, 85, 247, 0.2)',
                  borderColor: 'brand.400',
                  color: 'white',
                  transform: 'translateY(-2px)',
                }}
              >
                View GitHub
              </Button>
            </Stack>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  )
}
