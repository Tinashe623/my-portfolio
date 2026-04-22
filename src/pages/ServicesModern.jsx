import React from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  ListIcon,
  VStack,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { CheckIcon, SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { motion, isValidMotionProp } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { FaReact, FaCode, FaServer, FaRocket, FaDatabase } from 'react-icons/fa'

import GlassCard from '../components/effects/GlassCard'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const services = [
  {
    title: 'Frontend Development',
    desc: 'Build modern, responsive web applications using React with focus on performance, accessibility, and clean component architecture.',
    icon: FaReact,
    features: [
      'Component-driven architecture',
      'Responsive mobile-first layouts',
      'Performance optimization',
      'Accessibility (WCAG) compliance',
    ],
    tech: 'React • Vite • Chakra UI • TypeScript',
    color: 'brand',
  },
  {
    title: 'UI/UX Implementation',
    desc: 'Transform designs into pixel-perfect, interactive interfaces with smooth animations and intuitive user experiences.',
    icon: FaCode,
    features: [
      'Design-to-code conversion',
      'Interactive animations',
      'Mobile-first approach',
      'Cross-browser compatibility',
    ],
    tech: 'CSS3 • Framer Motion • HTML5 • ARIA',
    color: 'accent',
  },
  {
    title: 'API Integration',
    desc: 'Connect your frontend to REST APIs with proper state management, error handling, and data flow.',
    icon: FaDatabase,
    features: [
      'REST API integration',
      'State management',
      'Form handling & validation',
      'Error handling',
    ],
    tech: 'REST • JSON • React Query • Hooks',
    color: 'brand',
  },
  {
    title: 'System Administration',
    desc: 'Windows & Linux server management, hardware maintenance, troubleshooting, and IT support services.',
    icon: FaServer,
    features: [
      'Windows Server administration',
      'Linux systems management',
      'Hardware maintenance',
      'IT troubleshooting & support',
    ],
    tech: 'Windows • Linux • Hardware • Networking',
    color: 'accent',
  },
  {
    title: 'Website Maintenance',
    desc: 'Keep your web presence fresh with content updates, bug fixes, performance monitoring, and security patches.',
    icon: SettingsIcon,
    features: [
      'Content updates',
      'Bug fixes & patches',
      'Performance monitoring',
      'Security updates',
    ],
    tech: 'Git • Deployment • Testing • Monitoring',
    color: 'brand',
  },
  {
    title: 'Performance Optimization',
    desc: 'Optimize your web applications for speed, SEO, and better user experience with best practices.',
    icon: FaRocket,
    features: [
      'Load time optimization',
      'SEO improvements',
      'Bundle size reduction',
      'Core Web Vitals boosting',
    ],
    tech: 'Vite • Lighthouse • Bundle Analysis',
    color: 'accent',
  },
]

export default function ServicesModern() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      pt={{ base: 6, sm: 8, md: 10, lg: 12, xl: 14 }}
      pb={{ base: 8, sm: 10, md: 14, lg: 16, xl: 18 }}
      bg="dark.bg"
      sx={{
        '@media (min-width: 768px) and (max-height: 700px)': {
          pt: 8,
          pb: 10,
        },
      }}
    >
      {/* Subtle background gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.5}
        bgGradient="radial(ellipse at 30% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial(ellipse at 70% 100%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)"
        pointerEvents="none"
      />
      <Container maxW="8xl" position="relative" zIndex={1} px={{ base: 4, sm: 6, md: 8 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 6, md: 8, lg: 10 }}
        >
          <Heading
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="900"
            mb={{ base: 3, md: 3, lg: 4 }}
            bgGradient="linear(135deg, brand.300, accent.300)"
            bgClip="text"
          >
            Services
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            color="gray.300"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
            px={{ base: 2, md: 0 }}
          >
            Focused frontend development services to bring your digital ideas to life with clean,
            modern, and accessible solutions.
          </Text>
        </MotionBox>

        {/* Services Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 4, sm: 5, md: 5, lg: 6 }}
          mb={{ base: 6, md: 8, lg: 10 }}
        >
          {services.map((service, index) => (
            <MotionBox
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                variant="default"
                p={{ base: 4, sm: 5, md: 5, lg: 6, xl: 7 }}
                h="100%"
                hover3d
                role="group"
              >
                <VStack align="start" spacing={{ base: 2.5, sm: 3, md: 3.5, lg: 4 }} h="100%">
                  {/* Icon */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="xl"
                    bg={`${service.color}.900`}
                    borderWidth="1px"
                    borderColor={`${service.color}.400`}
                    transition="all 0.3s"
                    _groupHover={{
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                      borderColor: 'brand.400',
                    }}
                  >
                    <Icon
                      as={service.icon}
                      boxSize={{ base: 6, md: 8 }}
                      color={`${service.color}.300`}
                    />
                  </Box>

                  {/* Title & Tech */}
                  <Box>
                    <Heading
                      size={{ base: 'sm', md: 'md' }}
                      mb={{ base: 1, md: 2 }}
                      color="gray.100"
                    >
                      {service.title}
                    </Heading>
                    <Text
                      fontSize={{ base: '2xs', md: 'xs' }}
                      color={`${service.color}.200`}
                      fontFamily="mono"
                      fontWeight="600"
                    >
                      {service.tech}
                    </Text>
                  </Box>

                  {/* Description */}
                  <Text
                    color="gray.300"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    lineHeight={{ base: 'short', sm: 'tall' }}
                    flex={1}
                  >
                    {service.desc}
                  </Text>

                  {/* Features List */}
                  <List spacing={{ base: 1, sm: 1.5, md: 2 }} w="100%">
                    {service.features.map((feature) => (
                      <ListItem key={feature} fontSize={{ base: 'xs', sm: 'sm' }} color="gray.200">
                        <ListIcon
                          as={CheckIcon}
                          color={`${service.color}.300`}
                          boxSize={{ base: 3, md: 4 }}
                        />
                        {feature}
                      </ListItem>
                    ))}
                  </List>

                  {/* CTA */}
                  <Button
                    as={NavLink}
                    to="/contact"
                    variant="glass"
                    size={{ base: 'sm', md: 'sm' }}
                    w="100%"
                    mt={{ base: 1, md: 2 }}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="gray.200"
                    _hover={{
                      bg: 'brand.600',
                      borderColor: 'brand.300',
                      color: 'white',
                    }}
                  >
                    Get Started
                  </Button>
                </VStack>
              </GlassCard>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard variant="strong" p={{ base: 6, sm: 7, md: 8, lg: 10 }} textAlign="center">
            <Heading
              size={{ base: 'md', md: 'lg' }}
              mb={{ base: 3, md: 3, lg: 4 }}
              color="gray.100"
            >
              Ready to start your project?
            </Heading>
            <Text
              color="gray.300"
              mb={{ base: 4, md: 5, lg: 6 }}
              fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
              maxW="2xl"
              mx="auto"
              lineHeight="tall"
            >
              Let's collaborate to create something amazing. I'm available for freelance projects
              and full-time opportunities.
            </Text>
            <Button
              as={NavLink}
              to="/contact"
              size={{ base: 'md', md: 'lg' }}
              w={{ base: 'full', sm: 'auto' }}
              bgGradient="linear(to-r, brand.500, accent.500)"
              color="white"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                bgGradient: 'linear(to-r, brand.600, accent.600)',
              }}
              rightIcon={<ArrowForwardIcon />}
            >
              Let's Work Together
            </Button>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  )
}
