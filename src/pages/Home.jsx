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
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  EmailIcon,
  AtSignIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import { motion, isValidMotionProp } from "framer-motion";
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

const marquee = keyframes`
  0% { transform: translateX(0) }
  100% { transform: translateX(-50%) }
`;

export default function Home() {
  const cardBg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  return (
    <Box position="relative" overflow="hidden" color="white">
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
        maxW="6xl"
        position="relative"
        zIndex={1}
        pt={{ base: 12, md: 24 }}
        pb={{ base: 20, md: 24 }}
      >
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          gap={12}
        >
          <MotionStack
            variants={container}
            initial="hidden"
            animate="show"
            style={{ width: "100%" }}
          >
            <MotionBox variants={itemUp}>
              <HStack spacing={3}>
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
              fontSize={{ base: "4xl", md: "6xl" }}
              lineHeight={1.1}
              bgGradient="linear(to-r, cyan.300, purple.300)"
              bgClip="text"
              fontWeight={800}
            >
              Hi! I'm Tinashe Mundieta
            </MotionHeading>

            <MotionBox variants={itemUp}>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.200">
                Building responsive, accessible, and delightful web experiences
                with React, Vite, and Chakra UI.
              </Text>
            </MotionBox>

            <MotionBox variants={itemUp}>
              <HStack spacing={4} mt={2}>
                <Button
                  colorScheme="cyan"
                  rightIcon={<ArrowForwardIcon />}
                  size="md"
                >
                  View Work
                </Button>
                <Button variant="outline" colorScheme="cyan" size="md">
                  Hire Me
                </Button>
              </HStack>
            </MotionBox>

            {/* quick facts */}
            <MotionBox variants={itemUp} mt={8}>
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                <Box
                  p={4}
                  bg={cardBg}
                  borderRadius="lg"
                  backdropFilter="blur(6px)"
                  minW={0}
                >
                  <HStack>
                    <Icon as={CalendarIcon} color="cyan.300" />
                    <Text>Available: Full Time</Text>
                  </HStack>
                </Box>
                <Box
                  p={4}
                  bg={cardBg}
                  borderRadius="lg"
                  backdropFilter="blur(6px)"
                  minW={0}
                >
                  <HStack>
                    <Icon as={AtSignIcon} color="cyan.300" />
                    <Text>Harare, Zimbabwe</Text>
                  </HStack>
                </Box>
                <Box
                  p={4}
                  bg={cardBg}
                  borderRadius="lg"
                  backdropFilter="blur(6px)"
                  minW={0}
                  overflow="hidden"
                >
                  <HStack maxW="100%" overflow="hidden">
                    <Icon as={EmailIcon} color="cyan.300" flexShrink={0} />
                    <Link
                      href="mailto:tinashemundieta36@gmail.com"
                      color="cyan.200"
                      noOfLines={1}
                      display="block"
                      maxW="100%"
                    >
                      tinashemundieta36@gmail.com
                    </Link>
                  </HStack>
                </Box>
              </SimpleGrid>
            </MotionBox>

            {/* metrics */}
            <MotionBox variants={itemUp} mt={8}>
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                <Box
                  p={6}
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
                  p={6}
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
                  p={6}
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
                    School head and committee commended the ongoing School Website for clear UX,
                    clean code, and rapid progress.
                  </Text>
                </Box>
              </SimpleGrid>
            </MotionBox>

            {/* job intent */}
            <MotionBox variants={itemUp} mt={6}>
              <HStack spacing={3} wrap="wrap">
                <Badge
                  colorScheme="cyan"
                  variant="subtle"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  Seeking: Junior Frontend Role
                </Badge>
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  Open to Remote & Onsite
                </Badge>
                <Badge
                  colorScheme="pink"
                  variant="subtle"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  Available Immediately
                </Badge>
              </HStack>
            </MotionBox>
          </MotionStack>

          <Box flexShrink={0}>
            <MotionImage
              src="/images/profile-pic.png"
              alt="profile"
              style={{ borderRadius: 16 }}
              boxShadow="2xl"
              maxW={{ base: "280px", md: "380px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            />
            <Box
              mt={4}
              h="10px"
              w="60%"
              mx="auto"
              bgGradient="linear(to-r, cyan.400, purple.400)"
              borderRadius="full"
              animation={`${float} 4s ease-in-out infinite`}
              opacity={0.6}
            />
          </Box>
        </Flex>
      </Container>

      {/* tech marquee */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderTopWidth="1px"
        borderColor="whiteAlpha.200"
        py={3}
        pointerEvents="none"
        overflow="hidden"
      >
        <Box overflowX="hidden" overflowY="visible" whiteSpace="nowrap">
          <HStack
            as={MotionBox}
            animation={`${marquee} 22s linear infinite`}
            spacing={8}
            px={8}
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
                fontSize="md"
                py={2}
                px={4}
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
                fontSize="md"
                py={2}
                px={4}
                borderRadius="full"
              >
                {t}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
