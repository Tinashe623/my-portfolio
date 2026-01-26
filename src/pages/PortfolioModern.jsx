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
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'

import GlassCard from '../components/effects/GlassCard'
import { FaGithub, FaExternalLinkAlt, FaUsers } from 'react-icons/fa'
import { PROJECTS } from '../constants/projectsData'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

// Desktop tuning will primarily be controlled via Grid row heights and image preview heights
const projects = PROJECTS

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
            fontWeight="800"
            mb={5}
            color="white"
            letterSpacing="tight"
          >
            Featured Work
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="dark.textMuted"
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
              borderColor="whiteAlpha.100" // Subtle default border
              _hover={{
                borderColor: 'brand.500', // Highlight on hover
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
              }}
              transition="all 0.4s ease"
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
                    filter="brightness(0.9)"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-r, rgba(5, 5, 5, 0.8), transparent 60%)" // Matches dark.bg
                  />
                  {/* Featured Badge */}
                  <Box position="absolute" top={6} left={6}>
                    <Flex
                      align="center"
                      gap={2}
                      px={4}
                      py={2}
                      borderRadius="full"
                      bg="rgba(15, 23, 42, 0.6)" // Darker slate
                      backdropFilter="blur(12px)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                    >
                      <Text fontSize="md">⭐</Text>
                      <Text
                        fontSize="xs"
                        fontWeight="700"
                        color="white"
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
                  bg="rgba(255, 255, 255, 0.02)"
                >
                  <Heading
                    size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                    color="white"
                    lineHeight="shorter"
                    fontWeight="800"
                  >
                    {featuredProject.name}
                  </Heading>

                  <Text color="dark.textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall">
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
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
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
                      variant="outline"
                      leftIcon={<Icon as={FaGithub} boxSize={5} />}
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
                        variant="primary"
                        leftIcon={<Icon as={FaExternalLinkAlt} boxSize={4} />}
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
                    ? 'whiteAlpha.400'
                    : 'whiteAlpha.50'
                }
                transition="all 0.3s ease"
                _hover={{
                  borderColor: 'whiteAlpha.400',
                  transform: 'translateY(-6px)',
                }}
              >
                {/* Project Image with Overlay */}
                <Box position="relative" overflow="hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    objectFit="cover"
                    w="100%"
                    h="240px"
                    transition="transform 0.5s ease"
                    _groupHover={{ transform: 'scale(1.05)' }}
                    filter="brightness(0.9)"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, #050505 0%, transparent 50%)" // Matches dark.bg/premium slate
                    opacity={0.8}
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
                          bg="purple.900"
                          color="purple.100"
                          fontSize="xs"
                          fontWeight="700"
                        >
                          <HStack spacing={1.5}>
                            <Icon as={FaUsers} boxSize={3} />
                            <Text>TEAM</Text>
                          </HStack>
                        </Badge>
                      )}
                      {/* NEW: Show Tech Stack on Image for quick scan */}
                      <HStack spacing={1}>
                        {project.tags.slice(0, 2).map(t => (
                          <Badge key={t} bg="blackAlpha.600" color="whiteAlpha.900" fontSize="2xs">{t}</Badge>
                        ))}
                      </HStack>
                    </VStack>
                    {project.inProgress && (
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg="yellow.900"
                        color="yellow.100"
                        fontSize="xs"
                        fontWeight="700"
                        animation={`${pulse} 2s infinite`}
                      >
                        IN PROGRESS
                      </Badge>
                    )}
                  </Flex>
                </Box>

                {/* Card Content */}
                <VStack align="start" p={6} spacing={4} flex={1}>
                  <Heading size="md" color="white" lineHeight="shorter" fontWeight="700">
                    {project.name}
                  </Heading>

                  {project.collaborative && (
                    <Text fontSize="xs" color="brand.400" fontWeight="600">
                      {project.role && `🎯 ${project.role}`}
                      {project.team && ` • 👥 ${project.team}`}
                    </Text>
                  )}

                  <Text color="dark.textMuted" fontSize="sm" lineHeight="tall" flex={1}>
                    {project.desc}
                  </Text>

                  {/* Action Buttons */}
                  <HStack spacing={3} w="100%" pt={2}>
                    <Button
                      as={Link}
                      href={project.url}
                      isExternal
                      size="sm"
                      flex={1}
                      variant="outline"
                      leftIcon={<Icon as={FaGithub} />}
                    >
                      Code
                    </Button>
                    {project.homepage && (
                      <Button
                        as={project.homepage === '#' ? 'button' : Link}
                        href={project.homepage === '#' ? undefined : project.homepage}
                        isExternal={project.homepage !== '#'}
                        size="sm"
                        flex={1}
                        variant={project.homepage === '#' ? 'solid' : 'ghost'}
                        color={project.homepage === '#' ? 'whiteAlpha.600' : 'brand.300'}
                        bg={project.homepage === '#' ? 'whiteAlpha.200' : 'transparent'}
                        _hover={project.homepage === '#' ? {} : { bg: 'whiteAlpha.100', color: 'brand.200' }}
                        cursor={project.homepage === '#' ? 'not-allowed' : 'pointer'}
                        leftIcon={project.homepage !== '#' ? <Icon as={FaExternalLinkAlt} /> : null}
                      >
                        {project.homepage === '#' ? 'Coming Soon' : 'Live'}
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
            <Heading size={{ base: 'md', md: 'lg' }} mb={{ base: 3, md: 4 }} color="white">
              Have a project in mind?
            </Heading>
            <Text
              color="dark.textMuted"
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
                size="lg"
                variant="primary"
                rightIcon={<ArrowForwardIcon />}
              >
                Get In Touch
              </Button>
              <Button
                as={Link}
                href="https://github.com/Tinashe623"
                isExternal
                size="lg"
                variant="glass"
                leftIcon={<Icon as={FaGithub} />}
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
