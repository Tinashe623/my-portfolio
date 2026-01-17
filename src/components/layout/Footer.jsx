import React from 'react'
import { Box, Container, Text, HStack, Link, IconButton, Stack, Flex, Divider } from '@chakra-ui/react'
import { FaWhatsapp, FaFacebook, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Social Links Configuration
  const socials = [
    { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/tinashe-mundieta-041715302/' },
    { label: 'GitHub', icon: FaGithub, href: 'https://github.com/Tinashe623' }, 
    { label: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/263779941427' },
    { label: 'Facebook', icon: FaFacebook, href: import.meta.env.VITE_FACEBOOK_URL },
  ].filter(s => s.href)

  return (
    <Box
      as="footer"
      bg="dark.bgSecondary"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      pt={16}
      pb={8}
    >
      <Container maxW="7xl" px={{ base: 6, md: 8 }}>
        <Stack spacing={12}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            gap={6}
          >
            <Box>
              <Text fontSize="2xl" fontWeight="800" color="white" letterSpacing="-0.03em" mb={2}>
                Tinashe<Text as="span" color="brand.500">.</Text>
              </Text>
              <Text color="dark.textMuted" maxW="sm">
                Building digital experiences with passion and precision. 
                Let's create something specific together.
              </Text>
            </Box>

            <HStack spacing={4}>
              {socials.map((social) => (
                <IconButton
                  key={social.label}
                  as={Link}
                  href={social.href}
                  isExternal
                  aria-label={social.label}
                  icon={<social.icon />}
                  variant="ghost"
                  color="dark.textMuted"
                  size="lg"
                  fontSize="xl"
                  _hover={{
                    color: 'white',
                    bg: 'whiteAlpha.100',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                />
              ))}
            </HStack>
          </Flex>

          <Divider borderColor="whiteAlpha.100" />

          <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
            fontSize="sm"
            color="dark.textMuted"
          >
            <Text>© {currentYear} Tinashe Mundieta. All rights reserved.</Text>
            
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={{ base: 2, sm: 6 }}
              align="center"
            >
              <HStack spacing={6}>
                <Link href="#" _hover={{ color: 'white' }}>Privacy</Link>
                <Link href="#" _hover={{ color: 'white' }}>Terms</Link>
              </HStack>
              <Text textAlign="center">Built with React & Chakra UI</Text>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
