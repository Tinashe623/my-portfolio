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
    <HStack as="nav" spacing={1} display={{ base: 'none', md: 'flex' }}>
      {NAV_LINKS.map(({ label, path }) => (
        <CNavLink
          key={path}
          to={path}
          onClick={onClick}
          px={4}
          py={2}
          borderRadius="full"
          fontSize="sm"
          fontWeight="600"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          overflow="hidden"
          _hover={{
            color: 'white',
            _before: {
              transform: 'scaleX(1)',
              opacity: 1,
            },
            _after: {
              opacity: 0.6,
            },
          }}
          _before={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            bgGradient: 'linear(to-r, brand.400, accent.400)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: 0,
          }}
          _after={{
            content: '""',
            position: 'absolute',
            inset: 0,
            bgGradient: 'linear(135deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.1))',
            borderRadius: 'full',
            opacity: 0,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: -1,
          }}
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 600,
            color: isActive ? '#14b8a6' : 'rgba(255, 255, 255, 0.8)',
            background: isActive
              ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(245, 158, 11, 0.1))'
              : 'transparent',
            borderWidth: isActive ? '1px' : '0px',
            borderColor: isActive ? 'rgba(20, 184, 166, 0.4)' : 'transparent',
          })}
        >
          {label}
        </CNavLink>
      ))}
    </HStack>
  )
}

function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerBg = 'accent.900'
  const drawerColor = 'accent.50'
  return (
    <>
      <IconButton
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        icon={<HamburgerIcon />}
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        size="md"
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay bg="blackAlpha.600" />
        <DrawerContent bg={drawerBg} color={drawerColor} id="mobile-nav-drawer">
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Heading size="md">Menu</Heading>
              <Spacer />
              <IconButton
                aria-label="Close navigation menu"
                icon={<CloseIcon />}
                onClick={onClose}
                size="sm"
                variant="ghost"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={3} mt={4}>
              {NAV_LINKS.map(({ label, path }) => (
                <CNavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  fontSize="md"
                  fontWeight="600"
                  position="relative"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    color: 'brand.300',
                    pl: 5,
                    bg: 'rgba(20, 184, 166, 0.15)',
                    transform: 'translateX(2px)',
                  }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '0%',
                    bgGradient: 'linear(to-b, brand.400, accent.400)',
                    borderRadius: '0 2px 2px 0',
                    transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  sx={{
                    '&:hover::before': {
                      height: '80%',
                    },
                  }}
                  style={({ isActive }) => ({
                    color: isActive ? '#14b8a6' : 'inherit',
                    background: isActive ? 'rgba(20, 184, 166, 0.2)' : 'transparent',
                    borderLeft: isActive ? '3px solid #14b8a6' : '3px solid transparent',
                  })}
                >
                  {label}
                </CNavLink>
              ))}
              <Button
                as="a"
                href={
                  import.meta.env.VITE_CV_URL
                    ? import.meta.env.VITE_CV_URL.startsWith('http') ||
                      import.meta.env.VITE_CV_URL.startsWith('/')
                      ? import.meta.env.VITE_CV_URL
                      : `/${import.meta.env.VITE_CV_URL}`
                    : '/Tinashe_Mundieta_cv.docx'
                }
                download
                leftIcon={<DownloadIcon />}
                size="md"
                w="full"
                bg="rgba(255, 255, 255, 0.05)"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                color="white"
                _hover={{
                  bg: 'rgba(20, 184, 166, 0.1)',
                  borderColor: 'brand.400',
                  transform: 'translateY(-2px)',
                }}
                onClick={onClose}
              >
                Download CV
              </Button>
              <Button
                as={NavLink}
                to="/contact"
                size="md"
                w="full"
                bgGradient="linear(135deg, brand.400, brand.600)"
                color="white"
                _hover={{
                  bgGradient: 'linear(135deg, brand.300, brand.500)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)',
                }}
                onClick={onClose}
              >
                Get In Touch
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default function Header() {
  const bg = 'rgba(17,25,40,0.4)'
  const [scrolled, setScrolled] = React.useState(false)
  const rawCv = import.meta.env.VITE_CV_URL
  const cvUrl = rawCv
    ? rawCv.startsWith('http') || rawCv.startsWith('/')
      ? rawCv
      : `/${rawCv}`
    : '/Tinashe_Mundieta_cv.docx'
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <Box
      as="header"
      role="banner"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bg}
      color="white"
      borderBottom="1px solid"
      borderColor={scrolled ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.08)'}
      backdropFilter="saturate(190%) blur(16px)"
      boxShadow={scrolled ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'}
      h="64px"
      style={{ ['--header-h']: '64px' }}
      transition="box-shadow 0.2s ease"
      sx={{ WebkitBackdropFilter: 'saturate(190%) blur(16px)' }}
    >
      <Container maxW="7xl" h="100%" py={0} px={{ base: 4, md: 6, lg: 8 }}>
        <Flex align="center" h="100%">
          <Heading
            size="md"
            fontWeight="900"
            letterSpacing="tight"
            cursor="pointer"
            as={NavLink}
            to="/"
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <Text
              as="span"
              bgGradient="linear(to-r, brand.300, accent.400)"
              bgClip="text"
              fontSize="xl"
            >
              Tinashe
            </Text>
          </Heading>
          <Spacer />
          <NavLinks />
          <HStack spacing={2} ml={2}>
            <Button
              as={'a'}
              href={cvUrl}
              download
              size="sm"
              leftIcon={<DownloadIcon />}
              display={{ base: 'none', sm: 'inline-flex' }}
              bg="rgba(255, 255, 255, 0.05)"
              borderWidth="1px"
              borderColor="rgba(255, 255, 255, 0.1)"
              color="white"
              position="relative"
              _hover={{
                bg: 'rgba(20, 184, 166, 0.1)',
                borderColor: 'brand.400',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Download CV
            </Button>
            <Button
              as={NavLink}
              to="/contact"
              size="sm"
              bgGradient="linear(135deg, brand.400, brand.600)"
              color="white"
              display={{ base: 'none', md: 'inline-flex' }}
              position="relative"
              overflow="hidden"
              _hover={{
                bgGradient: 'linear(135deg, brand.300, brand.500)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)',
              }}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              }}
              sx={{
                '&:hover::before': {
                  left: '100%',
                },
              }}
              transition="all 0.3s"
            >
              Contact
            </Button>
            <MobileNav />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
