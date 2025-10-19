import React from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, DownloadIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const CNavLink = chakra(NavLink);

function NavLinks({ onClick }) {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Portfolio", "/portfolio"],
    ["Certificates", "/certificates"],
  ];
  return (
    <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }}>
      {links.map(([label, to]) => (
        <CNavLink
          key={to}
          to={to}
          onClick={onClick}
          px={3}
          py={2}
          borderRadius="full"
          transition="all 0.2s ease"
          position="relative"
          _hover={{ color: "cyan.300", transform: "translateY(-1px)", _after: { width: "80%" } }}
          _after={{
            content: '""',
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-6px",
            width: "0%",
            height: "2px",
            bg: "cyan.300",
            transition: "width 0.25s ease",
            borderRadius: "full",
          }}
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 500,
            color: isActive ? "#67e8f9" : "inherit",
            backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
          })}
        >
          {label}
        </CNavLink>
      ))}
    </HStack>
  );
}

function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Portfolio", "/portfolio"],
    ["Certificates", "/certificates"],
  ];
  const drawerBg = 'gray.900';
  const drawerColor = 'gray.100';
  return (
    <>
      <IconButton aria-label="Open menu" icon={<HamburgerIcon />} display={{ base: "inline-flex", md: "none" }} onClick={onOpen} variant="outline" />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg} color={drawerColor}>
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Heading size="md">Menu</Heading>
              <Spacer />
              <IconButton aria-label="Close menu" icon={<CloseIcon />} onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={3} mt={4}>
              {links.map(([label, to]) => (
                <CNavLink key={to} to={to} onClick={onClose} px={3} py={2} borderRadius="md" transition="all 0.2s ease" _hover={{ color: "cyan.500", pl: 4 }} style={{ fontWeight: 600 }}>
                  {label}
                </CNavLink>
              ))}
              <Button as="a" href={import.meta.env.VITE_CV_URL || "/cv/Tinashe_Mundieta_cv.docx"} download leftIcon={<DownloadIcon />} variant="outline" onClick={onClose}>
                Download CV
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Header() {
  const bg = "rgba(17,25,40,0.7)";
  const [scrolled, setScrolled] = React.useState(false);
  const cvUrl = import.meta.env.VITE_CV_URL || "/cv/Tinashe_Mundieta_cv.docx";
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Box as="header" position="sticky" top={0} zIndex={1000} bg={bg} color="white" borderBottom="1px solid" borderColor="whiteAlpha.200" backdropFilter="saturate(180%) blur(10px)" boxShadow={scrolled ? "sm" : "none"} h="64px" style={{ ['--header-h']: '64px' }}>
      <Container maxW="8xl" h="100%" py={0} px={{ base: 4, md: 6 }}>
        <Flex align="center" h="100%">
          <Heading size="md">
            <Text as="span" color="cyan.300">P</Text>ortfolio
          </Heading>
          <Spacer />
          <NavLinks />
          <HStack spacing={2} ml={2}>
            <Button as={"a"} href={cvUrl} download size="sm" variant="outline" leftIcon={<DownloadIcon />} display={{ base: "none", sm: "inline-flex" }}>
              Download CV
            </Button>
            <Button as={NavLink} to="/contact" colorScheme="cyan" size="sm" display={{ base: "none", md: "inline-flex" }}>Contact</Button>
            <MobileNav />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
