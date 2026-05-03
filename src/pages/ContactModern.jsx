import React, { useState, useCallback, useMemo } from 'react'
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
  VStack,
  SimpleGrid,
  HStack,
  Icon,
  Link,
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

  const mailtoHref = useMemo(() => {
    const subject = `Portfolio contact from ${name || 'someone'}`
    const body = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [name, fromEmail, message])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      window.location.href = mailtoHref
      setIsSubmitting(false)
    }, 500)
  }, [mailtoHref])

  const contactInfo = useMemo(() => [
    { icon: FaClock, label: 'Response Time', value: 'Within 24 hours' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Remote-Friendly' },
    { icon: FaCheckCircle, label: 'Availability', value: 'Open to Opportunities' },
  ], [])

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      pt={{ base: 8, md: 10, lg: 12 }}
      pb={{ base: 10, md: 12, lg: 16 }}
    >
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

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
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
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="xl" mx="auto" lineHeight="tall">
            Have a question or want to work together? Drop me a message.
          </Text>
        </MotionBox>

        <HStack justify="center" mb={{ base: 10, md: 12 }}>
          <Box w="100%" maxW="2xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard p={{ base: 6, md: 8 }} borderWidth="1px" borderColor="rgba(34, 211, 238, 0.2)">
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
                      placeholder="Tell me about your project..."
                      size="lg"
                      rows={5}
                      resize="vertical"
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
                    isLoading={isSubmitting}
                    loadingText="Opening Email..."
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    color="white"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                      bgGradient: 'linear(to-r, brand.600, accent.600)',
                    }}
                    rightIcon={<Icon as={FaPaperPlane} />}
                    w="full"
                  >
                    {isSubmitting ? 'Processing...' : 'Send Message'}
                  </Button>
                </Stack>
              </GlassCard>
            </MotionBox>
          </Box>
        </HStack>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} maxW="4xl" mx="auto">
            {contactInfo.map((info, index) => (
              <GlassCard key={info.label} variant="default" p={5} textAlign="center">
                <VStack spacing={3}>
                  <Box p={3} borderRadius="full" bg="rgba(34, 211, 238, 0.1)" color="accent.300">
                    <Icon as={info.icon} boxSize={6} />
                  </Box>
                  <Heading size="sm" color="gray.100" fontWeight="700">
                    {info.label}
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    {info.value}
                  </Text>
                </VStack>
              </GlassCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          mt={{ base: 10, md: 12 }}
          textAlign="center"
        >
          <Text color="gray.400" fontSize="sm">
            Or reach me directly at{' '}
            <Link href={`mailto:${EMAIL}`} color="brand.400" _hover={{ color: 'brand.300' }} isExternal>
              {EMAIL}
            </Link>
          </Text>
        </MotionBox>
      </Container>
    </Box>
  )
}
