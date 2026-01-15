import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  HStack,
  Icon,
  Link,
  VStack,
  Flex,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import {
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa'

import GlassCard from '../components/effects/GlassCard'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function ContactModern() {
  const EMAIL = 'tinashemundieta36@gmail.com'

  const [name, setName] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subject = `Portfolio contact from ${name || 'someone'}`
  const body = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      window.location.href = mailtoHref
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      pt={{ base: 8, md: 10, lg: 12 }}
      pb={{ base: 10, md: 12, lg: 16 }}
    >


      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 10, md: 12 }}
        >
          <Heading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="900"
            mb={4}
            bgGradient="linear(135deg, brand.300, accent.300)"
            bgClip="text"
          >
            Get In Touch
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.400"
            maxW="xl"
            mx="auto"
            lineHeight="tall"
          >
            Have a question or want to work together? Drop me a message.
          </Text>
        </MotionBox>

        {/* Main Content - Centered Single Column */}
        <Flex justify="center" mb={{ base: 10, md: 12 }}>
          <Box w="100%" maxW="2xl">
            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard
                p={{ base: 6, md: 8 }}
                borderWidth="1px"
                borderColor="rgba(34, 211, 238, 0.2)"
              >
                <Stack spacing={5} as="form" onSubmit={handleSubmit}>
                  <Text fontSize="sm" color="gray.500" mb={2} fontWeight="600">
                    * Required fields
                  </Text>
                  <FormControl isRequired>
                    <FormLabel color="white" fontWeight="600" fontSize="sm">
                      Name *
                    </FormLabel>
                    <Input
                      placeholder="Your name"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.05)"
                      borderColor="rgba(255, 255, 255, 0.1)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.5)',
                        bg: 'rgba(255, 255, 255, 0.08)',
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="white" fontWeight="600" fontSize="sm">
                      Email *
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.05)"
                      borderColor="rgba(255, 255, 255, 0.1)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.5)',
                        bg: 'rgba(255, 255, 255, 0.08)',
                      }}
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="white" fontWeight="600" fontSize="sm">
                      Message *
                    </FormLabel>
                    <Textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      size="lg"
                      bg="rgba(255, 255, 255, 0.05)"
                      borderColor="rgba(255, 255, 255, 0.1)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.5)',
                        bg: 'rgba(255, 255, 255, 0.08)',
                      }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    bgGradient="linear(135deg, brand.400, brand.600)"
                    color="white"
                    leftIcon={<Icon as={FaPaperPlane} />}
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    _hover={{
                      bgGradient: 'linear(135deg, brand.300, brand.500)',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    Send Message
                  </Button>
                </Stack>
              </GlassCard>
            </MotionBox>

            {/* Contact Links */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              mt={8}
            >
              <VStack spacing={3}>
                <Text fontSize="sm" color="gray.500" fontWeight="600">
                  Or reach me directly:
                </Text>
                <HStack spacing={6} flexWrap="wrap" justify="center">
                  <Link
                    href="mailto:tinashemundieta36@gmail.com"
                    color="brand.300"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ color: 'brand.200', textDecoration: 'underline' }}
                  >
                    📧 Email
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    isExternal
                    color="brand.300"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ color: 'brand.200', textDecoration: 'underline' }}
                  >
                    💼 LinkedIn
                  </Link>
                  <Link
                    href="https://github.com/Tinashe623"
                    isExternal
                    color="brand.300"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ color: 'brand.200', textDecoration: 'underline' }}
                  >
                    🐙 GitHub
                  </Link>
                  <Link
                    href="https://wa.me/"
                    isExternal
                    color="brand.300"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ color: 'brand.200', textDecoration: 'underline' }}
                  >
                    💬 WhatsApp
                  </Link>
                </HStack>
              </VStack>
            </MotionBox>
          </Box>
        </Flex>

        {/* Info Footer */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HStack
            justify="center"
            spacing={8}
            flexWrap="wrap"
            py={6}
            borderTop="1px solid"
            borderColor="rgba(255, 255, 255, 0.05)"
          >
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="green.400" boxSize={4} />
              <Text fontSize="sm" color="gray.400">
                Available for work
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaClock} color="purple.400" boxSize={4} />
              <Text fontSize="sm" color="gray.400">
                24h response time
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaMapMarkerAlt} color="pink.400" boxSize={4} />
              <Text fontSize="sm" color="gray.400">
                Harare, Zimbabwe
              </Text>
            </HStack>
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  )
}
