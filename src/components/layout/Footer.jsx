import React from 'react'
import {
  Box,
  Container,
  Text,
  HStack,
  Link,
  Stack,
  Flex,
  SimpleGrid,
  VStack,
  Heading,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaFacebook, FaLinkedin, FaGithub, FaReact, FaCode } from 'react-icons/fa'

const MotionBox = motion(Box)

const socials = [
  {
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/tinashe-mundieta-041715302/',
    color: '#0077B5',
  },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/Tinashe623', color: '#fff' },
  { label: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/263779941427', color: '#25D366' },
  {
    label: 'Facebook',
    icon: FaFacebook,
    href: import.meta.env.VITE_FACEBOOK_URL,
    color: '#1877F2',
  },
].filter((s) => s.href)

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      bg="rgba(15, 23, 42, 0.8)"
      backdropFilter="blur(20px)"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      pt={{ base: 16, md: 20 }}
      pb={8}
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse 50% 80% at 50% 100%, rgba(99, 102, 241, 0.08), transparent 50%)"
        pointerEvents="none"
      />

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} mb={12}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color="white" fontWeight="800">
                Tinashe
                <Text as="span" color="brand.400">
                  .
                </Text>
              </Heading>
              <Text color="dark.textMuted" fontSize="sm" lineHeight="tall">
                Frontend developer with system administration expertise. Building digital
                experiences with passion and precision.
              </Text>
              <HStack spacing={3}>
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    isExternal
                    _hover={{ transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    borderRadius="lg"
                    bg="whiteAlpha.50"
                    color="dark.textMuted"
                    _groupHover={{ color: social.color }}
                    aria-label={social.label}
                  >
                    <Icon as={social.icon} boxSize={5} />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color="white" fontWeight="700">
                Navigation
              </Heading>
              <Stack spacing={2}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="dark.textMuted"
                    fontSize="sm"
                    _hover={{ color: 'brand.400', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                  >
                    <Text>{link.label}</Text>
                  </Link>
                ))}
              </Stack>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color="white" fontWeight="700">
                Services
              </Heading>
              <Stack spacing={2}>
                <Text color="dark.textMuted" fontSize="sm">
                  Web Development
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  React Applications
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  System Administration
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  IT Support
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  Hardware Maintenance
                </Text>
              </Stack>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color="white" fontWeight="700">
                Contact
              </Heading>
              <Stack spacing={2}>
                <Text color="dark.textMuted" fontSize="sm">
                  Harare, Zimbabwe
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  tinashemundieta36@gmail.com
                </Text>
                <Text color="dark.textMuted" fontSize="sm">
                  +263 779 941 427
                </Text>
              </Stack>
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={8}>
          <Flex
            direction={{ base: 'column-reverse', sm: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text fontSize="sm" color="dark.textMuted">
              © {currentYear} Tinashe Mundieta. All rights reserved.
            </Text>

            <HStack spacing={6}>
              <Link href="#" fontSize="sm" color="dark.textMuted" _hover={{ color: 'white' }}>
                Privacy Policy
              </Link>
              <Link href="#" fontSize="sm" color="dark.textMuted" _hover={{ color: 'white' }}>
                Terms of Service
              </Link>
            </HStack>

            <HStack spacing={2} color="dark.textMuted" fontSize="sm">
              <Text>Built with</Text>
              <HStack spacing={1}>
                <Icon as={FaReact} color="cyan.400" />
                <Icon as={FaCode} color="brand.400" />
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
