import React from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  ListIcon,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { CheckIcon, ViewIcon, SettingsIcon, EditIcon } from '@chakra-ui/icons'
import { motion, isValidMotionProp } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const MotionCard = motion(chakra(Card))
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const services = [
  {
    title: 'Frontend Development',
    desc: 'Build modern, responsive web applications using React, Vite, and Chakra UI with focus on performance and accessibility.',
    icon: SettingsIcon,
    features: ['Component-driven architecture', 'Responsive design', 'Performance optimization', 'Cross-browser compatibility'],
    tech: 'React • Chakra UI • Vite • JavaScript',
  },
  {
    title: 'UI/UX Implementation',
    desc: 'Transform designs into pixel-perfect, interactive interfaces with smooth animations and intuitive user experiences.',
    icon: ViewIcon,
    features: ['Design-to-code conversion', 'Interactive animations', 'Mobile-first approach', 'Accessibility compliance'],
    tech: 'CSS3 • Framer Motion • HTML5 • ARIA',
  },
  {
    title: 'Website Maintenance',
    desc: 'Keep your web presence fresh with content updates, bug fixes, performance improvements, and feature enhancements.',
    icon: EditIcon,
    features: ['Content management', 'Bug fixes & updates', 'Performance monitoring', 'Security best practices'],
    tech: 'Git • Version Control • Testing • Deployment',
  },
]

export default function Services() {
  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.800" color="gray.100" position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgGradient="radial(circle at 30% 10%, rgba(34,211,238,0.08), transparent 50%), radial(circle at 70% 90%, rgba(168,85,247,0.06), transparent 50%)" />
      <Container maxW="8xl" position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Heading fontSize={{ base: '2xl', md: '3xl' }} color="cyan.300" textAlign="center" mb={{ base: 3, md: 4 }}>
            Services
          </Heading>
          <Text textAlign="center" color="gray.300" mb={{ base: 6, md: 10 }} maxW="2xl" mx="auto" fontSize={{ base: 'sm', md: 'md' }}>
            I offer focused frontend development services to help bring your digital ideas to life with clean, modern, and accessible web solutions.
          </Text>
        </MotionBox>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 3, md: 6 }}>
          {services.map((service, index) => (
            <Box key={service.title} role="group">
              <MotionCard
                bg="gray.700"
                borderWidth="1px"
                borderColor="gray.600"
                h="100%"
                position="relative"
                overflow="hidden"
                borderRadius="xl"
                style={{ transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  borderColor: 'rgba(34,211,238,0.45)',
                  boxShadow: '0 0 0 1px rgba(34,211,238,0.35), 0 10px 20px rgba(34,211,238,0.18)'
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: 'xl',
                  bg: 'linear-gradient(90deg, rgba(34,211,238,0.45), rgba(168,85,247,0.35), rgba(34,211,238,0.45))',
                  filter: 'blur(12px)',
                  opacity: 0.08,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: 'none',
                }}
                _hover={{ _before: { opacity: 0.45 } }}
              >
                <CardHeader pb={{ base: 1, md: 2 }} pt={{ base: 3, md: 4 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Icon as={service.icon} color="cyan.300" boxSize={{ base: 5, md: 7 }} transition="transform 0.25s ease, color 0.25s ease" _groupHover={{ transform: 'translateY(-2px) scale(1.05)', color: 'cyan.200' }} />
                    <Heading fontSize={{ base: 'md', md: 'lg' }}>{service.title}</Heading>
                  </Box>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="cyan.200" fontFamily="mono" mt={1}>
                    {service.tech}
                  </Text>
                </CardHeader>
                <CardBody pt={0} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
                  <Text color="gray.200" mb={{ base: 3, md: 4 }} fontSize={{ base: 'sm', md: 'md' }}>
                    {service.desc}
                  </Text>
                  <List spacing={{ base: 1, md: 1 }} mb={{ base: 4, md: 6 }}>
                    {service.features.map((feature) => (
                      <ListItem key={feature} fontSize={{ base: 'sm', md: 'sm' }} color="gray.200">
                        <ListIcon as={CheckIcon} color="cyan.300" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    as={NavLink}
                    to="/contact"
                    variant="outline"
                    colorScheme="cyan"
                    size={{ base: 'sm', md: 'md' }}
                    w="100%"
                    _hover={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.3), 0 0 12px rgba(34,211,238,0.20)' }}
                  >
                    Get Started
                  </Button>
                </CardBody>
              </MotionCard>
            </Box>
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={12}>
          <Text color="gray.300" mb={4}>
            Ready to start your project?
          </Text>
          <Button
            as={NavLink}
            to="/contact"
            colorScheme="cyan"
            size="lg"
            position="relative"
            overflow="hidden"
            transition="all 0.25s ease"
            _before={{
              content: '""',
              position: 'absolute',
              inset: '-2px',
              borderRadius: 'md',
              bg: 'linear-gradient(90deg, rgba(34,211,238,0.4), rgba(168,85,247,0.35), rgba(34,211,238,0.4))',
              filter: 'blur(14px)',
              opacity: 0.12,
              transition: 'opacity 0.25s ease',
              pointerEvents: 'none',
            }}
            _after={{
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-30%',
              width: '40%',
              height: '200%',
              bg: 'whiteAlpha.700',
              opacity: 0.25,
              transform: 'translateX(-100%) rotate(25deg)',
              transition: 'transform 0.5s ease',
              pointerEvents: 'none',
            }}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.35), 0 10px 24px rgba(34,211,238,0.25)',
              _before: { opacity: 0.35 },
              _after: { transform: 'translateX(130%) rotate(25deg)' },
            }}
          >
            Let's Work Together
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
