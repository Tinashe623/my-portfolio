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
  FormErrorMessage,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import {
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaSpinner,
} from 'react-icons/fa'
import GlassCard from '../components/effects/GlassCard'

const MotionBox = chakra(motion.create('div'), {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateRequired = (value) => {
  return value.trim().length > 0
}

function SuccessModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="none" bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent
        as={motion.create('div')}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        borderRadius="2xl"
        bg="rgba(16, 20, 42, 0.95)"
        borderWidth="1px"
        borderColor="rgba(99, 102, 241, 0.3)"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.2)"
        maxW="2xl"
        mx="auto"
        data-testid="success-modal"
      >
        <ModalCloseButton zIndex={10} />
        <ModalBody py={10} textAlign="center">
          <Box
            as={motion.create('div')}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            w="80px"
            h="80px"
            mx="auto"
            mb={6}
            borderRadius="full"
            bg="rgba(34, 211, 238, 0.1)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaCheckCircle} boxSize={10} color="accent.300" />
          </Box>
          <Heading
            id="success-modal-title"
            as={motion.create('h2')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            fontSize="2xl"
            fontWeight="800"
            mb={3}
            bgGradient="linear(135deg, #22d3ee, #a855f7)"
            bgClip="text"
          >
            Message Ready!
          </Heading>
          <Text color="gray.300" fontSize="md" lineHeight="tall" maxW="sm" mx="auto">
            Your email client should have opened with a pre-filled message. If it didn&apos;t,
            please reach me directly at the email below.
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center" pb={8}>
          <Button
            as={motion.create('button')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            size="lg"
            px={8}
            borderRadius="xl"
            bgGradient="linear(to-r, brand.500, accent.500)"
            color="white"
            fontWeight="600"
            onClick={onClose}
          >
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ContactModern() {
  const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'tinashemundieta36@gmail.com'

  const [name, setName] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })

  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const toast = useToast()

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'name':
        if (!validateRequired(value)) {
          return 'Name is required'
        }
        return ''
      case 'email':
        if (!validateRequired(value)) {
          return 'Email is required'
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address'
        }
        return ''
      case 'message':
        if (!validateRequired(value)) {
          return 'Message is required'
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters'
        }
        return ''
      default:
        return ''
    }
  }, [])

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(
          field,
          field === 'name' ? name : field === 'email' ? fromEmail : message,
        ),
      }))
    },
    [name, fromEmail, message, validateField],
  )

  const validateAll = useCallback(() => {
    const newErrors = {
      name: validateField('name', name),
      email: validateField('email', fromEmail),
      message: validateField('message', message),
    }
    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })
    return !Object.values(newErrors).some((error) => error !== '')
  }, [name, fromEmail, message, validateField])

  const buildMailto = useCallback(() => {
    const subject = encodeURIComponent(`Portfolio Contact: ${name || 'New Message'}`)
    const body = encodeURIComponent(
      `Name: ${name || ''}\nEmail: ${fromEmail || ''}\n\n${message || ''}`,
    )
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }, [EMAIL, name, fromEmail, message])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()

      const isValid = validateAll()
      if (!isValid) {
        console.log('[ContactForm] Validation failed:', errors)
        return
      }

      setIsSubmitting(true)

      try {
        window.location.href = buildMailto()

        toast({
          title: 'Opening email client...',
          description: 'If your email client did not open, please use the email link below.',
          status: 'info',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        })

        setIsSuccessOpen(true)
        setName('')
        setFromEmail('')
        setMessage('')
        setErrors({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false, message: false })
      } catch (error) {
        console.error('[ContactForm] Submit error:', error)
        toast({
          title: 'Something went wrong',
          description: 'Please reach out directly via the email link below.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateAll, errors, buildMailto, toast],
  )

  const contactInfo = useMemo(
    () => [
      { icon: FaClock, label: 'Response Time', value: 'Within 24 hours' },
      { icon: FaMapMarkerAlt, label: 'Location', value: 'Remote-Friendly' },
      { icon: FaCheckCircle, label: 'Availability', value: 'Open to Opportunities' },
    ],
    [],
  )

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
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.400"
            maxW="xl"
            mx="auto"
            lineHeight="tall"
          >
            Have a question or want to work together? Drop me a message and I&apos;ll get back to you
            soon.
          </Text>
        </MotionBox>

        <HStack justify="center" mb={{ base: 10, md: 12 }}>
          <Box w="100%" maxW="2xl">
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

                  <FormControl isRequired isInvalid={touched.name && errors.name !== ''}>
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
                      _invalid={{
                        borderColor: 'red.500',
                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                      }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (touched.name) {
                          setErrors((prev) => ({
                            ...prev,
                            name: validateField('name', e.target.value),
                          }))
                        }
                      }}
                      onBlur={() => handleBlur('name')}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.email && errors.email !== ''}>
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
                      _invalid={{
                        borderColor: 'red.500',
                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                      }}
                      value={fromEmail}
                      onChange={(e) => {
                        setFromEmail(e.target.value)
                        if (touched.email) {
                          setErrors((prev) => ({
                            ...prev,
                            email: validateField('email', e.target.value),
                          }))
                        }
                      }}
                      onBlur={() => handleBlur('email')}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.message && errors.message !== ''}>
                    <FormLabel color="white" fontWeight="600" fontSize="sm">
                      Message *
                    </FormLabel>
                    <Textarea
                      placeholder="Tell me about your project or just say hi..."
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
                      _invalid={{
                        borderColor: 'red.500',
                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                      }}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        if (touched.message) {
                          setErrors((prev) => ({
                            ...prev,
                            message: validateField('message', e.target.value),
                          }))
                        }
                      }}
                      onBlur={() => handleBlur('message')}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText="Opening..."
                    spinner={<Icon as={FaSpinner} />}
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    color="white"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                      bgGradient: 'linear(to-r, brand.600, accent.600)',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                    rightIcon={<Icon as={FaPaperPlane} />}
                    w="full"
                    transition="all 0.2s ease"
                  >
                    {isSubmitting ? 'Opening...' : 'Send Message'}
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
            {contactInfo.map((info) => (
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
            <Link
              href={`mailto:${EMAIL}`}
              color="brand.400"
              _hover={{ color: 'brand.300' }}
              isExternal
            >
              {EMAIL}
            </Link>
          </Text>
        </MotionBox>
      </Container>

      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </Box>
  )
}
