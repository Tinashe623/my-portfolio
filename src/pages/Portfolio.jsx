import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  CardBody,
  Button,
  Link,
  HStack,
  Stack,
  SimpleGrid,
  Tag,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { keyframes } from "@emotion/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const MotionCard = motion(chakra(Card));
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.35); }
  70% { box-shadow: 0 0 0 10px rgba(250, 204, 21, 0); }
  100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
`;

const extraProjects = [
  {
    name: "netfix-clone-rs",
    url: "https://github.com/Tinashe623/netfix-clone-rs",
    desc: "Netflix‑style landing UI with hero, content rows, and responsive cards. Focus on layout and component structure (in progress).",
    homepage: null,
  },
  {
    name: "temperature-conversion-program",
    url: "https://github.com/Tinashe623/temperature-conversion-program",
    desc: "Converts temperatures between Celsius and Fahrenheit with instant updates and basic input validation.",
    homepage: null,
  },
  {
    name: "Todo-App",
    url: "https://github.com/Tinashe623/Todo-App",
    desc: "React Todo app using functional components and Hooks (add, complete, delete) with clean, responsive UI.",
    homepage: null,
  },
  {
    name: "amazon-project",
    url: "https://github.com/Tinashe623/amazon-project",
    desc: "Amazon‑inspired storefront UI: header navigation, product grid, and responsive layout patterns (in progress).",
    homepage: null,
  },
];

export default function Portfolio() {
  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.800" color="gray.100">
      <Container maxW="8xl">
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Heading size="xl" color="cyan.300" textAlign="center" mb={10}>
            Project Highlight
          </Heading>
        </MotionBox>
        <Box maxW={{ base: "full", md: "3xl" }} mx="auto" px={{ base: 0, md: 0 }} mb={{ base: 8, md: 12 }}>
          <MotionCard
            bg="gray.700"
            borderWidth="1px"
            borderColor="gray.600"
            position="relative"
            overflow="hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
              y: -6,
              borderColor: "rgba(34,211,238,0.5)",
              boxShadow: "0 6px 24px rgba(34,211,238,0.12)",
            }}
            _before={{
              content: '""',
              position: 'absolute',
              inset: '-2px',
              borderRadius: 'md',
              bg: 'linear-gradient(90deg, rgba(34,211,238,0.35), rgba(168,85,247,0.25), rgba(34,211,238,0.35))',
              filter: 'blur(12px)',
              opacity: 0,
              transition: 'opacity 0.25s ease',
              pointerEvents: 'none',
            }}
            _hover={{ _before: { opacity: 0.35 } }}
          >
            <CardBody>
              <HStack justify="space-between" align="start" mb={2} wrap="wrap" spacing={3}>
                <Heading size={{ base: "md", md: "lg" }} color="gray.100">School Website</Heading>
                <Tag colorScheme="yellow" variant="subtle" sx={{ animation: `${pulse} 2.2s ease-out infinite`, borderColor: 'yellow.300' }}>in progress</Tag>
              </HStack>
              <Text color="gray.200" mb={4}>
                A school website project. Source available on GitHub.
              </Text>
              <Stack spacing={3} direction={{ base: 'column', sm: 'row' }} align={{ base: 'stretch', sm: 'center' }}>
                <Button
                  as={Link}
                  href="https://github.com/Tinashe623/school-website"
                  isExternal
                  aria-label="View school website repository on GitHub"
                  colorScheme="cyan"
                  rightIcon={<ExternalLinkIcon />}
                  w={{ base: 'full', sm: 'auto' }}
                  transition="box-shadow 0.25s ease, transform 0.2s ease"
                  _hover={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.35), 0 0 12px rgba(34,211,238,0.25)', transform: 'translateY(-1px)' }}
                >
                  View on GitHub
                </Button>
                {import.meta.env.VITE_SCHOOL_WEBSITE_DEMO ? (
                  <Button
                    as={Link}
                    href={import.meta.env.VITE_SCHOOL_WEBSITE_DEMO}
                    isExternal
                    aria-label="Open live demo of school website"
                    variant="outline"
                    colorScheme="cyan"
                    rightIcon={<ExternalLinkIcon />}
                    w={{ base: 'full', sm: 'auto' }}
                    transition="box-shadow 0.25s ease, transform 0.2s ease"
                    _hover={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.35), 0 0 12px rgba(34,211,238,0.25)', transform: 'translateY(-1px)' }}
                  >
                    Live Demo
                  </Button>
                ) : (
                  <Button variant="outline" colorScheme="cyan" isDisabled w={{ base: 'full', sm: 'auto' }}>
                    Live Demo (coming soon)
                  </Button>
                )}
              </Stack>
            </CardBody>
          </MotionCard>
        </Box>

        <Heading size={{ base: 'md', md: 'lg' }} color="cyan.300" mb={{ base: 4, md: 6 }}>
          More Projects
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, md: 6 }}>
          {extraProjects.map((proj, i) => (
            <MotionCard
              key={proj.name}
              bg="gray.700"
              borderWidth="1px"
              borderColor="gray.600"
              position="relative"
              overflow="hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                y: -6,
                scale: 1.01,
                borderColor: "rgba(34,211,238,0.4)",
                boxShadow: "0 6px 20px rgba(34,211,238,0.12)",
              }}
              _before={{
                content: '""',
                position: 'absolute',
                inset: '-2px',
                borderRadius: 'md',
                bg: 'linear-gradient(90deg, rgba(34,211,238,0.35), rgba(168,85,247,0.25), rgba(34,211,238,0.35))',
                filter: 'blur(12px)',
                opacity: 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}
              _hover={{ _before: { opacity: 0.35 } }}
            >
              <CardBody minH={{ base: "auto", md: "140px" }}>
                <HStack spacing={2} align="start" wrap="wrap">
                  <Heading size={{ base: "sm", md: "md" }} color="gray.100" _groupHover={{ bgGradient: 'linear(to-r, cyan.300, purple.300)', bgClip: 'text' }}>
                    {proj.name}
                  </Heading>
                  {(proj.name === 'amazon-project' || proj.name === 'netfix-clone-rs') && (
                    <Tag colorScheme="yellow" variant="subtle" sx={{ animation: `${pulse} 2.2s ease-out infinite`, borderColor: 'yellow.300' }}>in progress</Tag>
                  )}
                </HStack>
                <Text color="gray.300" mt={2} noOfLines={{ base: 3, md: 2 }}>
                  {proj.desc}
                </Text>
                <Stack spacing={3} mt={4} direction={{ base: 'column', sm: 'row' }}>
                  <Button
                    as={Link}
                    href={proj.url}
                    isExternal
                    aria-label={`Open ${proj.name} on GitHub`}
                    size="sm"
                    variant="outline"
                    colorScheme="cyan"
                    rightIcon={<ExternalLinkIcon />}
                    w={{ base: 'full', sm: 'auto' }}
                    transition="box-shadow 0.25s ease, transform 0.2s ease"
                    _hover={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.3), 0 0 10px rgba(34,211,238,0.2)', transform: 'translateY(-1px)' }}
                  >
                    GitHub
                  </Button>
                  {proj.homepage ? (
                    <Button
                      as={Link}
                      href={proj.homepage}
                      isExternal
                      aria-label={`Open live demo of ${proj.name}`}
                      size="sm"
                      colorScheme="cyan"
                      rightIcon={<ExternalLinkIcon />}
                      w={{ base: 'full', sm: 'auto' }}
                      transition="box-shadow 0.25s ease, transform 0.2s ease"
                      _hover={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.3), 0 0 10px rgba(34,211,238,0.2)', transform: 'translateY(-1px)' }}
                    >
                      Live Demo
                    </Button>
                  ) : null}
                </Stack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
