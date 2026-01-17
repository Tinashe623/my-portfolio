import React from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Spacer,
  chakra,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, DownloadIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants'

const CNavLink = chakra(NavLink)

function NavLinks({ onClick }) {
  return (
    <HStack as="nav" spacing={2} display={{ base: 'none', md: 'flex' }}>
      {NAV_LINKS.map(({ label, path }) => (
        <CNavLink
          key={path}
          to={path}
          onClick={onClick}
          px={5}
          py={2}
          borderRadius="full"
          fontSize="sm"
          fontWeight="500"
          letterSpacing="wide"
          color="dark.textMuted"
          transition="all 0.3s ease"
          _hover={{
            color: 'white',
            bg: 'whiteAlpha.100',
          }}
          _activeLink={{
            color: 'white',
            bg: 'whiteAlpha.100',
            fontWeight: '600',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          {label}
        </CNavLink>
      ))}
    </HStack>
  )
}

function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <IconButton
        aria-label="Open navigation menu"
        icon={<HamburgerIcon boxSize={5} />}
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        color="white"
        _hover={{ bg: 'whiteAlpha.100' }}
        size="md"
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bg="dark.bgSecondary">
          <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.100" py={6}>
            <Flex align="center">
              <Heading size="md" color="white" fontWeight="800">Menu</Heading>
              <Spacer />
              <IconButton
                aria-label="Close navigation menu"
                icon={<CloseIcon />}
                onClick={onClose}
                size="md"
                variant="ghost"
                color="whiteAlpha.800"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody px={6} py={8}>
            <Stack spacing={2}>
              {NAV_LINKS.map(({ label, path }) => (
                <CNavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  px={6}
                  py={4}
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="600"
                  color="dark.textMuted"
                  _activeLink={{
                    color: 'white',
                    bg: 'brand.600',
                  }}
                >
                  {label}
                </CNavLink>
              ))}
              <Box pt={8}>
                 <Button
                  as={NavLink}
                  to="/resume?print=true"
                  size="lg"
                  w="full"
                  variant="primary"
                  leftIcon={<DownloadIcon />}
                  onClick={onClose}
                  mb={4}
                >
                  Download CV
                </Button>
                <Button
                  as={NavLink}
                  to="/contact"
                  size="lg"
                  w="full"
                  variant="outline"
                  onClick={onClose}
                >
                  Contact Me
                </Button>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const cvUrl = import.meta.env.VITE_CV_URL || '/Tinashe_Mundieta_cv.docx'

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      w="full"
      zIndex={100}
      transition="all 0.3s ease"
      bg={scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(16px)' : 'none'}
      borderBottom="1px solid"
      borderColor={scrolled ? 'whiteAlpha.100' : 'transparent'}
      py={scrolled ? 3 : 5}
    >
      <Container maxW="7xl" px={{ base: 6, md: 8 }}>
        <Flex align="center" justify="space-between">
          <Heading
            size="md"
            fontWeight="800"
            letterSpacing="-0.03em"
            as={NavLink}
            to="/"
            color="white"
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            Tinashe<Text as="span" color="brand.500">.</Text>
          </Heading>

          <NavLinks />

          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={NavLink}
              to="/resume?print=true"
              variant="ghost"
              size="sm"
              leftIcon={<DownloadIcon />}
              color="dark.textMuted"
              _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            >
              Download CV
            </Button>
            <Button
              as={NavLink}
              to="/contact"
              variant="primary"
              size="sm"
              fontSize="xs"
              px={6}
            >
              Let's Talk
            </Button>
          </HStack>

          <HStack display={{ base: 'flex', md: 'none' }}>
             <MobileNav />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
