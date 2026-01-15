import React from 'react'
import { Box, Container, Text, HStack, Link, IconButton, Stack, Button } from '@chakra-ui/react'
import { FaWhatsapp, FaFacebook, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const WHATSAPP = (
    import.meta.env.VITE_WHATSAPP_PHONE ||
    import.meta.env.VITE_CONTACT_PHONE ||
    ''
  ).replace(/[^\d]/g, '')
  const FACEBOOK = import.meta.env.VITE_FACEBOOK_URL || ''
  const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || ''
  const rawCV = import.meta.env.VITE_CV_URL || ''
  const CV_URL = rawCV
    ? rawCV.startsWith('http') || rawCV.startsWith('/')
      ? rawCV
      : `/${rawCV}`
    : ''

  return (
    <Box
      as="footer"
      bg="rgba(2, 4, 16, 0.8)"
      backdropFilter="blur(20px)"
      color="gray.400"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      mt={0}
      minH={{ base: 'auto', md: '64px' }}
      py={{ base: 4, md: 0 }}
      display="flex"
      alignItems="center"
      style={{ ['--footer-h']: '64px' }}
    >
      <Container maxW="8xl" px={{ base: 4, md: 6 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'center' }}
          justify="space-between"
          spacing={{ base: 3, md: 4 }}
        >
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            textAlign={{ base: 'center', md: 'left' }}
            lineHeight={{ base: '1.6', md: 'normal' }}
          >
            © {new Date().getFullYear()} Tinashe Mundieta • Design & code by Tinashe • Built with
            React, Vite & Chakra UI
          </Text>
          <HStack spacing={2}>
            {CV_URL && (
              <Button as={Link} href={CV_URL} download size="sm" variant="outline">
                Download CV
              </Button>
            )}
            {WHATSAPP && (
              <IconButton
                as={Link}
                href={`https://wa.me/${WHATSAPP}`}
                isExternal
                aria-label="WhatsApp"
                size="sm"
                colorScheme="whatsapp"
                variant="outline"
                _hover={{
                  bg: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  borderColor: '#25D366',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 15px rgba(37, 211, 102, 0.3)',
                }}
                transition="all 0.3s"
                icon={<FaWhatsapp />}
              />
            )}
            {FACEBOOK && (
              <IconButton
                as={Link}
                href={FACEBOOK}
                isExternal
                aria-label="Facebook"
                size="sm"
                colorScheme="facebook"
                variant="outline"
                _hover={{
                  bg: 'rgba(24, 119, 242, 0.1)',
                  color: '#1877F2',
                  borderColor: '#1877F2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 15px rgba(24, 119, 242, 0.3)',
                }}
                transition="all 0.3s"
                icon={<FaFacebook />}
              />
            )}
            {LINKEDIN && (
              <IconButton
                as={Link}
                href={LINKEDIN}
                isExternal
                aria-label="LinkedIn"
                size="sm"
                colorScheme="linkedin"
                variant="outline"
                _hover={{
                  bg: 'rgba(10, 102, 194, 0.1)',
                  color: '#0A66C2',
                  borderColor: '#0A66C2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 15px rgba(10, 102, 194, 0.3)',
                }}
                transition="all 0.3s"
                icon={<FaLinkedin />}
              />
            )}
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
