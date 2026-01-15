import React from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { CheckCircleIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { motion, isValidMotionProp } from 'framer-motion'

import GlassCard from '../components/effects/GlassCard'
import { FaReact, FaCode, FaPalette, FaRocket } from 'react-icons/fa'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const skills = [
  { name: 'React & Hooks', icon: FaReact, color: 'brand.300' },
  { name: 'Modern CSS', icon: FaPalette, color: 'brand.400' },
  { name: 'Clean Code', icon: FaCode, color: 'accent.400' },
  { name: 'Fast Builds', icon: FaRocket, color: 'brand.300' },
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
]

export default function AboutModern() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      py={{ base: 8, sm: 10, md: 12, lg: 14, xl: 16 }}
      sx={{
        '@media (min-width: 768px) and (max-height: 700px)': {
          py: 10,
        },
      }}
    >
      <Container maxW="8xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 8, md: 8, lg: 10 }}
        >
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="900"
            mb={4}
            bgGradient="linear(135deg, brand.300, accent.300)"
            bgClip="text"
          >
            About Me
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="accent.300" maxW="2xl" mx="auto">
            Passionate frontend developer building modern, accessible web experiences
          </Text>
        </MotionBox>

        {/* Main Content */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 6, md: 8, lg: 12 }}
          mb={{ base: 10, md: 12, lg: 14 }}
        >
          {/* Left - Profile Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            flex={{ base: 'none', lg: '0 0 auto' }}
          >
            <GlassCard
              variant="strong"
              p={3}
              borderRadius="3xl"
              w={{ base: '260px', md: '280px', lg: '320px' }}
              h={{ base: '260px', md: '280px', lg: '320px' }}
              sx={{
                '@media (min-width: 768px) and (max-height: 700px)': {
                  w: '240px',
                  h: '240px',
                },
              }}
              mx="auto"
              hover3d
            >
              <MotionImage
                src="/images/profile-pic (5).png"
                alt="Tinashe Mundieta"
                borderRadius="2xl"
                w="100%"
                h="100%"
                objectFit="cover"
                whileHover={{ scale: 1.05 }}
                transition="0.3s"
              />
            </GlassCard>
          </MotionBox>

          {/* Right - Content */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard variant="default" p={{ base: 6, md: 8 }}>
              <VStack align="start" spacing={6}>
                <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="tall" color="gray.200">
                  Junior Frontend Engineer focused on the{' '}
                  <Text as="span" fontWeight="700" color="brand.300">
                    React ecosystem
                  </Text>
                  . I build responsive, accessible interfaces with attention to performance,
                  readability, and a great user experience.
                </Text>

                <Box w="100%">
                  <Heading size="md" mb={4} color="gray.100">
                    What I Do
                  </Heading>
                  <List spacing={3}>
                    {[
                      'Component-driven UIs with React + Chakra UI',
                      'API integration (REST/JSON), form handling, and state management',
                      'Accessibility-first mindset and mobile-first layouts',
                      'Collaborative workflows with Git and clear communication',
                    ].map((item, i) => (
                      <ListItem key={i} display="flex" alignItems="start">
                        <ListIcon as={CheckCircleIcon} color="brand.300" mt={1} />
                        <Text color="accent.300">{item}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} w="100%">
                  <Button
                    as={NavLink}
                    to="/portfolio"
                    size="lg"
                    bg="linear-gradient(135deg, #22d3ee, #a855f7)"
                    color="white"
                    flex={1}
                    _hover={{
                      transform: 'translateY(-2px)',
                    }}
                    rightIcon={<ArrowForwardIcon />}
                  >
                    View Work
                  </Button>
                  <Button
                    as={NavLink}
                    to="/contact"
                    size="lg"
                    variant="glass"
                    flex={1}
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
              </VStack>
            </GlassCard>
          </MotionBox>
        </Flex>

        {/* Skills Grid */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          mb={{ base: 10, md: 10, lg: 12 }}
        >
          <Heading size="lg" mb={{ base: 6, md: 6, lg: 8 }} textAlign="center" color="gray.100">
            Core Strengths
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            {skills.map((skill, i) => (
              <GlassCard
                key={skill.name}
                p={6}
                textAlign="center"
                hover3d
                as={MotionBox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <Icon as={skill.icon} boxSize={12} color={skill.color} mb={3} />
                <Text fontWeight="700" fontSize="lg">
                  {skill.name}
                </Text>
              </GlassCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Tech Stack */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard variant="strong" p={{ base: 6, md: 6, lg: 8 }} textAlign="center">
            <Heading size="md" mb={{ base: 4, md: 5, lg: 6 }} color="gray.100">
              Technology Stack
            </Heading>
            <HStack spacing={3} wrap="wrap" justify="center">
              {techStack.map((tech, i) => (
                <MotionBox
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Box
                    px={4}
                    py={2}
                    bg="rgba(34, 211, 238, 0.1)"
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="rgba(34, 211, 238, 0.3)"
                    fontSize="sm"
                    fontWeight="600"
                    color="brand.200"
                  >
                    {tech}
                  </Box>
                </MotionBox>
              ))}
            </HStack>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  )
}
