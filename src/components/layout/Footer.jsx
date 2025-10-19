import React from "react";
import { Box, Container, Text, HStack, Link, IconButton, Stack, Button } from "@chakra-ui/react";
import { FaWhatsapp, FaFacebook, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const WHATSAPP = (import.meta.env.VITE_WHATSAPP_PHONE || import.meta.env.VITE_CONTACT_PHONE || '').replace(/\s+/g, '')
  const FACEBOOK = import.meta.env.VITE_FACEBOOK_URL || ''
  const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || ''

  return (
<Box as="footer" bg="gray.900" color="gray.400" borderTop="1px solid" borderColor="whiteAlpha.200" mt={0} h={{ base: '92px', md: '64px' }} display="flex" alignItems="center" style={{ ['--footer-h']: '64px' }}>
      <Container maxW="8xl" py={{ base: 3, md: 0 }} px={{ base: 4, md: 6 }}>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'center' }} justify="space-between" spacing={4}>
          <Text>© {new Date().getFullYear()} Tinashe Mundieta • Design & code by Tinashe • Built with React, Vite & Chakra UI</Text>
          <HStack spacing={2}>
{import.meta.env.VITE_CV_URL && (
              <Button as={Link} href={import.meta.env.VITE_CV_URL} download size="sm" variant="outline">
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
                icon={<FaLinkedin />}
              />
            )}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
