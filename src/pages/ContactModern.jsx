import React, { useState, useCallback, useMemo, useEffect } from 'react'
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
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa'
import { init, send } from 'emailjs-com'

// Initialize EmailJS immediately
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
}

import GlassCard from '../components/effects/GlassCard'

const MotionBox = chakra(motion.create('div'), {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

// Validation helpers
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateRequired = (value) => {
  return value.trim().length > 0
}

// Success Modal Component with animations
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
            Message Sent!
          </Heading>
          <Text color="gray.300" fontSize="md" lineHeight="tall" maxW="sm" mx="auto">
            Thank you for reaching out! I've received your message and will get back to you within 24 hours.
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

// Error Modal Component
function ErrorModal({ isOpen, onClose, errorMessage, errorDetails }) {
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
        borderColor="rgba(239, 68, 68, 0.3)"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(239, 68, 68, 0.2)"
        maxW="2xl"
        mx="auto"
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
            bg="rgba(239, 68, 68, 0.1)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaExclamationTriangle} boxSize={10} color="red.400" />
          </Box>
          <Heading
            id="error-modal-title"
            as={motion.create('h2')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            fontSize="2xl"
            fontWeight="800"
            mb={3}
            color="red.300"
          >
            Oops! Something went wrong
          </Heading>
          <Text color="gray.300" fontSize="md" lineHeight="tall" mb={2}>
            {errorMessage || 'Failed to send message. Please try again.'}
          </Text>
          {errorDetails && import.meta.env.DEV && (
            <Box mt={4} p={4} borderRadius="md" bg="rgba(255,255,255,0.05)" borderWidth="1px" borderColor="rgba(255,255,255,0.1)">
              <Text fontSize="xs" color="gray.500" mb={2} fontFamily="mono">
                Error details (dev only):
              </Text>
              <Text fontSize="xs" color="gray.400" fontFamily="mono" whiteSpace="pre-wrap">
                {JSON.stringify(errorDetails, null, 2)}
              </Text>
            </Box>
          )}
          <Text color="gray.500" fontSize="sm" mt={4}>
            You can also reach me directly at{' '}
            <Link href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'tinashemundieta36@gmail.com'}`} color="brand.400" isExternal>
              {import.meta.env.VITE_CONTACT_EMAIL || 'tinashemundieta36@gmail.com'}
            </Link>
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
            bg="red.500"
            color="white"
            fontWeight="600"
            onClick={onClose}
          >
            Try Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ContactModern() {
  const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'tinashemundieta36@gmail.com'

  // EmailJS config
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const [name, setName] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation state
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
   const [isErrorOpen, setIsErrorOpen] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [errorDetails, setErrorDetails] = useState(null)

   const toast = useToast()

  // Debug modal state changes
  useEffect(() => {
    console.log('[ContactForm] Modal states - success:', isSuccessOpen, 'error:', isErrorOpen)
  }, [isSuccessOpen, isErrorOpen])

   // Log config on mount (dev only)
   useEffect(() => {
     if (import.meta.env.DEV) {
       console.log('[ContactForm] EmailJS config:', {
         serviceId: EMAILJS_SERVICE_ID ? 'set' : 'missing',
         templateId: EMAILJS_TEMPLATE_ID ? 'set' : 'missing',
         publicKey: EMAILJS_PUBLIC_KEY ? 'set' : 'missing',
         contactEmail: EMAIL,
       })
       // Verify credentials are not the placeholder values
       if (
         EMAILJS_SERVICE_ID === 'your_service_id' ||
         EMAILJS_TEMPLATE_ID === 'your_template_id' ||
         EMAILJS_PUBLIC_KEY === 'your_public_key'
       ) {
         console.warn(
           '[ContactForm] You are using placeholder EmailJS credentials! Replace them in .env file.',
         )
       }
     }
   }, [EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAIL])

  // Real-time validation for a field
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

  // Handle blur for validation
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

  // Validate all fields
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      // Validate all fields before submitting
      const isValid = validateAll()
      if (!isValid) {
        console.log('[ContactForm] Validation failed:', errors)
        return
      }

      setIsSubmitting(true)

      try {
        // Ensure EmailJS is properly configured
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
          const missing = []
          if (!EMAILJS_SERVICE_ID) missing.push('SERVICE_ID')
          if (!EMAILJS_TEMPLATE_ID) missing.push('TEMPLATE_ID')
          if (!EMAILJS_PUBLIC_KEY) missing.push('PUBLIC_KEY')
          throw new Error(`Missing EmailJS credentials: ${missing.join(', ')}. Add them to .env.`)
        }

        // Log attempt (dev only)
        if (import.meta.env.DEV) {
          console.log('[ContactForm] Sending email via EmailJS')
        }

        // Send the email using EmailJS (public key already initialized globally)
        const result = await send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: name,
            from_email: fromEmail,
            message: message,
            reply_to: fromEmail,
          }
        )

        if (result.status === 200) {
          // Success - show modal and clear form
          toast({
            title: 'Message sent!',
            description: 'Your message has been delivered successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          })
          setIsSuccessOpen(true)
          setName('')
          setFromEmail('')
          setMessage('')
          setErrors({ name: '', email: '', message: '' })
          setTouched({ name: false, email: false, message: false })
        } else {
          throw new Error(`EmailJS returned status ${result.status}`)
        }
      } catch (error) {
        console.error('[ContactForm] Email Error:', error)
        console.error('[ContactForm] Full error object:', JSON.stringify(error, null, 2))

        // Extract user-friendly message
        let userMessage = 'Failed to send message. Please try again.'

        // Try to get meaningful message from error
        if (error.message) {
          userMessage = error.message
        } else if (error.text) {
          userMessage = error.text
        } else if (typeof error === 'string') {
          userMessage = error
        }

        // Suggest solutions for common errors
        if (error.message?.includes('CORS') || error.message?.includes('network')) {
          userMessage = 'Network error: EmailJS requires HTTPS. Access via http://localhost:5173 or configure allowed origins in EmailJS dashboard.'
        } else if (error.message?.includes('Invalid') || error.message?.includes('403') || error.message?.includes('401')) {
          userMessage = 'Invalid EmailJS credentials. Verify Service ID, Template ID, and Public Key in your .env file.'
        } else if (error.message?.includes('not configured') || error.message?.includes('missing')) {
          userMessage = 'Email service not configured. Add EmailJS credentials to .env.'
        } else if (error.message?.includes('Template')) {
          userMessage = 'Template error: Check your Template ID in EmailJS dashboard and ensure template variables match.'
        } else if (error.message?.includes('Service')) {
          userMessage = 'Service error: Check your Service ID in EmailJS dashboard.'
        }

        // Store error details for debugging (dev only)
        setErrorMessage(userMessage)
        if (import.meta.env.DEV) {
          setErrorDetails({
            originalError: error,
            message: error.message,
            status: error.status,
            text: error.text,
            stack: error.stack,
          })
        } else {
          setErrorDetails(null)
        }
        setIsErrorOpen(true)
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      name,
      fromEmail,
      message,
      errors,
      validateAll,
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY,
      toast,
    ],
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
      {/* Background gradient */}
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
            Have a question or want to work together? Drop me a message and I'll get back to you
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

                  {/* Name Field */}
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

                  {/* Email Field */}
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

                  {/* Message Field */}
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
                    loadingText="Sending..."
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
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
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

      {/* Success Modal */}
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />

      {/* Error Modal */}
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        errorMessage={errorMessage}
        errorDetails={errorDetails}
      />
    </Box>
  )
}
