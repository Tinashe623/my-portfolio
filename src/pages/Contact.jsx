import React, { useState } from 'react'
import { Box, Container, Heading, Stack, FormControl, FormLabel, Input, Textarea, Button, Text, HStack, Icon, Link, chakra, shouldForwardProp } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { motion, isValidMotionProp } from 'framer-motion'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function Contact() {
  const EMAIL = 'tinashemundieta36@gmail.com'
  const PHONE = import.meta.env.VITE_CONTACT_PHONE || ''
  const PHONE_ALT = import.meta.env.VITE_CONTACT_PHONE_ALT || ''

  const [name, setName] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')

  const subject = `Portfolio contact from ${name || 'someone'}`
  const body = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.800" color="gray.100">
      <Container maxW="4xl">
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Heading size="xl" color="cyan.300" textAlign="center" mb={3}>Get in touch</Heading>
          <Text textAlign="center" color="gray.300" mb={8}>Prefer email or a quick call? Use the details below, or send a message via the form.</Text>
        </MotionBox>

        <HStack spacing={4} justify="center" mb={10} wrap="wrap">
          <HStack
            spacing={3}
            p={4}
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            borderRadius="lg"
            bg="gray.700"
          >
            <Icon as={EmailIcon} color="cyan.300" />
            <Link href={`mailto:${EMAIL}`} color="cyan.200">{EMAIL}</Link>
          </HStack>
          {PHONE && (
            <HStack
              spacing={3}
              p={4}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              borderRadius="lg"
              bg="gray.700"
            >
              <Icon as={PhoneIcon} color="cyan.300" />
              <Link href={`tel:${PHONE.replace(/\s+/g,'')}`} color="cyan.200">{PHONE}</Link>
            </HStack>
          )}
          {PHONE_ALT && (
            <HStack
              spacing={3}
              p={4}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              borderRadius="lg"
              bg="gray.700"
            >
              <Icon as={PhoneIcon} color="cyan.300" />
              <Link href={`tel:${PHONE_ALT.replace(/\s+/g,'')}`} color="cyan.200">{PHONE_ALT}</Link>
            </HStack>
          )}
        </HStack>

        <Box
          as="section"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="gray.700"
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 5, md: 8 }}
        >
          <Heading size="md" mb={5}>Send a message</Heading>
          <Stack spacing={5} as="form" onSubmit={(e) => { e.preventDefault(); window.location.href = mailtoHref }}>
            <FormControl isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input placeholder="Your Name" variant="filled" _focus={{ borderColor: 'cyan.300' }} value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Your Email</FormLabel>
              <Input type="email" placeholder="you@example.com" variant="filled" _focus={{ borderColor: 'cyan.300' }} value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Your Message</FormLabel>
              <Textarea rows={6} placeholder="Tell me about your project" variant="filled" _focus={{ borderColor: 'cyan.300' }} value={message} onChange={(e) => setMessage(e.target.value)} />
            </FormControl>
            <HStack spacing={3}>
              <Button colorScheme="cyan" type="submit">Send Message</Button>
              <Button as={Link} href={mailtoHref} rightIcon={<ExternalLinkIcon />} variant="outline">Email Instead</Button>
            </HStack>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
