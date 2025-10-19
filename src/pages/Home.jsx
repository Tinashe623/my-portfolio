import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  HStack,
  Button,
  Image,
  Stack,
  Badge,
  chakra,
  shouldForwardProp,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Link,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  EmailIcon,
  AtSignIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import { motion, isValidMotionProp } from "framer-motion";
import { NavLink } from "react-router-dom";
import { keyframes } from "@emotion/react";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const MotionStack = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const MotionHeading = chakra(motion.h1, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const ringSpin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const marquee = keyframes`
  0% { transform: translateX(0) }
  100% { transform: translateX(-50%) }
`;

export default function Home() {
  const cardBg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  return (
    <Box
      position="relative"
      overflow="hidden"
      color="white"
      mb={0}
minH={{ base: 'auto', md: 'calc(100vh - var(--header-h) - var(--footer-h))' }}
    >
      {/* background glow */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial( circle at 20% 10%, rgba(34,211,238,0.18), transparent 45% ),
                     radial( circle at 80% 0%, rgba(168,85,247,0.12), transparent 45% ),
                     linear(to-b, gray.900, gray.800)"
        zIndex={0}
      />

      <Container
        maxW="8xl"
        position="relative"
        zIndex={1}
pt={{ base: 4, md: 8 }}
pb={{ base: 6, md: 12 }}
minH={{ base: 'auto', md: 'calc(100vh - var(--header-h) - var(--footer-h))' }}
        display="flex"
        flexDir="column"
justifyContent={{ base: 'flex-start', md: 'center' }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
gap={{ base: 6, md: 10, xl: 12 }}
        >
          <MotionStack
            variants={container}
            initial="hidden"
            animate="show"
            style={{ width: "100%" }}
            display="grid"
            rowGap={{ base: 4, md: 5 }}
          >
            <MotionBox variants={itemUp}>
              <HStack spacing={{ base: 2, md: 3 }} wrap="wrap">
                <Badge colorScheme="cyan" variant="outline">
                  Frontend
                </Badge>
                <Badge colorScheme="purple" variant="outline">
                  React
                </Badge>
                <Badge colorScheme="pink" variant="outline">
                  Chakra UI
                </Badge>
              </HStack>
            </MotionBox>

            <MotionHeading
              variants={itemUp}
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "5xl" }}
              lineHeight={{ base: 1.15, md: 1.12, lg: 1.1 }}
              bgGradient="linear(to-r, cyan.300, purple.300)"
              bgClip="text"
              fontWeight={800}
            >
              Hi! I'm Tinashe Mundieta
            </MotionHeading>

            <MotionBox variants={itemUp}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.200"
                maxW={{ base: "full", md: "2xl" }}
                noOfLines={{ base: 3, md: 2 }}
              >
                Building responsive, accessible, and delightful web experiences
                with React, Vite, and Chakra UI.
              </Text>
            </MotionBox>

            <MotionBox variants={itemUp}>
              <HStack spacing={{ base: 3, md: 4 }} mt={2} wrap="wrap">
                <Button
                  as={NavLink}
                  to="/portfolio"
                  colorScheme="cyan"
                  rightIcon={<ArrowForwardIcon />}
                  size={{ base: "sm", md: "md" }}
                >
                  View Work
                </Button>
                <Button
                  as={NavLink}
                  to="/contact"
                  variant="outline"
                  colorScheme="cyan"
                  size={{ base: "sm", md: "md" }}
                >
                  Hire Me
                </Button>
              </HStack>
            </MotionBox>

            {/* quick facts as compact chips */}
<MotionBox variants={itemUp} mt={{ base: 4, md: 8 }}>
              <Wrap spacing={{ base: 2, md: 3 }}>
                <WrapItem>
                  <HStack
                    px={{ base: 3, md: 4 }}
                    py={{ base: 2, md: 2 }}
                    borderRadius="full"
                    bg="whiteAlpha.100"
                    borderWidth="1px"
                    borderColor="whiteAlpha.200"
                  >
                    <Icon as={CalendarIcon} color="cyan.300" />
                    <Text>Available: Full Time</Text>
                  </HStack>
                </WrapItem>
                <WrapItem>
                  <HStack
                    px={{ base: 3, md: 4 }}
                    py={{ base: 2, md: 2 }}
                    borderRadius="full"
                    bg="whiteAlpha.100"
                    borderWidth="1px"
                    borderColor="whiteAlpha.200"
                  >
                    <Icon as={AtSignIcon} color="cyan.300" />
                    <Text>Harare, Zimbabwe</Text>
                  </HStack>
                </WrapItem>
                <WrapItem maxW="100%">
                  <HStack
                    px={{ base: 3, md: 4 }}
                    py={{ base: 2, md: 2 }}
                    borderRadius="full"
                    bg="whiteAlpha.100"
                    borderWidth="1px"
                    borderColor="whiteAlpha.200"
                    maxW="100%"
                    overflow="hidden"
                  >
                    <Icon as={EmailIcon} color="cyan.300" flexShrink={0} />
                    <Link
                      href="mailto:tinashemundieta36@gmail.com"
                      color={useColorModeValue('cyan.700','cyan.200')}
                      noOfLines={1}
                      display="block"
                      maxW="100%"
                    >
                      tinashemundieta36@gmail.com
                    </Link>
                  </HStack>
                </WrapItem>
              </Wrap>
            </MotionBox>

{/* metrics */}
            <MotionBox variants={itemUp} mt={{ base: 8, md: 10 }} display={{ base: 'none', md: 'block' }}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: 4, md: 5 }}
              >
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  transition="all 0.25s ease"
                  _hover={{
                    borderColor: "cyan.300",
                    boxShadow:
                      "0 0 0 1px rgba(34,211,238,0.5), 0 0 16px rgba(34,211,238,0.35)",
                    transform: "translateY(-4px)",
                  }}
                  minH={{ base: "auto", md: "140px" }}
                >
                  <Text
                    bgGradient="linear(to-r, cyan.300, purple.300)"
                    bgClip="text"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="extrabold"
                  >
                    2+
                  </Text>
                  <Text color="gray.300" fontWeight="medium">
                    Years Experience
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Self-directed learning, internships & freelance work
                  </Text>
                </Box>
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  transition="all 0.25s ease"
                  _hover={{
                    borderColor: "cyan.300",
                    boxShadow:
                      "0 0 0 1px rgba(34,211,238,0.5), 0 0 16px rgba(34,211,238,0.35)",
                    transform: "translateY(-4px)",
                  }}
                  minH={{ base: "auto", md: "140px" }}
                >
                  <Text
                    bgGradient="linear(to-r, cyan.300, purple.300)"
                    bgClip="text"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="extrabold"
                  >
                    5+
                  </Text>
                  <Text color="gray.300" fontWeight="medium">
                    Projects
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Real-world apps and portfolio builds
                  </Text>
                </Box>
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  transition="all 0.25s ease"
                  _hover={{
                    borderColor: "cyan.300",
                    boxShadow:
                      "0 0 0 1px rgba(34,211,238,0.5), 0 0 16px rgba(34,211,238,0.35)",
                    transform: "translateY(-4px)",
                  }}
                  minH={{ base: "auto", md: "140px" }}
                >
                  <Text
                    bgGradient="linear(to-r, cyan.300, purple.300)"
                    bgClip="text"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="extrabold"
                  >
                    5+
                  </Text>
                  <Text color="gray.300" fontWeight="medium">
                    Happy Clients
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    School head and committee commended the ongoing School
                    Website for clear UX, clean code, and rapid progress.
                  </Text>
                </Box>
              </SimpleGrid>
            </MotionBox>

            {/* job intent (hidden on mobile; shown on md+) */}
            <MotionBox variants={itemUp} mt={{ base: 6, md: 8 }} display={{ base: 'none', md: 'block' }}>
              <HStack spacing={{ base: 2, md: 3 }} wrap="wrap">
                <Badge colorScheme="cyan" variant="subtle" borderRadius="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} fontSize={{ base: 'xs', md: 'sm' }}>
                  Seeking: Junior Frontend Role
                </Badge>
                <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} fontSize={{ base: 'xs', md: 'sm' }}>
                  Open to Remote & Onsite
                </Badge>
                <Badge colorScheme="pink" variant="subtle" borderRadius="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} fontSize={{ base: 'xs', md: 'sm' }}>
                  Available Immediately
                </Badge>
              </HStack>
            </MotionBox>
          </MotionStack>

          <Box flexShrink={0} display="flex" alignItems="center" justifyContent="center">
            <MotionBox
              position="relative"
              borderRadius="full"
              boxSize={{ base: "200px", md: "280px", lg: "320px", xl: "360px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              whileHover={{ scale: 1.02 }}
              _before={{
                content: '""',
                position: 'absolute',
                inset: '-6px',
                borderRadius: '9999px',
                bg: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.55), rgba(168,85,247,0.45) 60%, transparent 70%)',
                filter: 'blur(8px)',
                zIndex: 0,
              }}
            >
              <MotionImage
                src="/images/profile-pic.png"
                alt="profile"
                borderRadius="full"
                w="100%"
                h="100%"
                objectFit="cover"
                position="relative"
                zIndex={1}
                boxShadow="xl"
                loading="lazy"
                decoding="async"
              />
            </MotionBox>
          </Box>

          {/* mobile-only job intent: image appears above these tags */}
          <Box display={{ base: 'block', md: 'none' }} mt={4}>
            <HStack spacing={3} wrap="wrap" justify="center">
              <Badge colorScheme="cyan" variant="subtle" borderRadius="full" px={3} py={1} fontSize="sm">
                Seeking: Junior Frontend Role
              </Badge>
              <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={3} py={1} fontSize="sm">
                Open to Remote & Onsite
              </Badge>
              <Badge colorScheme="pink" variant="subtle" borderRadius="full" px={3} py={1} fontSize="sm">
                Available Immediately
              </Badge>
            </HStack>
          </Box>
        </Flex>

        {/* bottom ribbon occupies remaining space without interaction */}
        <Box
          mt="auto"
          borderTopWidth="1px"
          borderColor="whiteAlpha.200"
          h={{ base: '36px', lg: '44px' }}
          overflow="hidden"
          pointerEvents="none"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box overflowX="hidden" whiteSpace="nowrap" w="full" h="100%" display="flex" alignItems="center">
            <HStack
              as={MotionBox}
              animation={`${marquee} 22s linear infinite`}
              spacing={6}
              px={6}
              display="inline-flex"
              alignItems="center"
              lineHeight={1}
              minW="200%"
            >
              {[
                "React",
                "Vite",
                "Chakra UI",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Node.js",
                "Framer Motion",
                "Git",
              ].map((t) => (
                <Badge
                  key={t}
                  colorScheme="cyan"
                  variant="subtle"
                  fontSize="sm"
                  py={1}
                  px={3}
                  borderRadius="full"
                >
                  {t}
                </Badge>
              ))}
              {[
                "React",
                "Vite",
                "Chakra UI",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Node.js",
                "Framer Motion",
                "Git",
              ].map((t) => (
                <Badge
                  key={`${t}-dup`}
                  colorScheme="cyan"
                  variant="subtle"
                  fontSize="sm"
                  py={1}
                  px={3}
                  borderRadius="full"
                >
                  {t}
                </Badge>
              ))}
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
