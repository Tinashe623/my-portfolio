import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Image,
  List,
  ListItem,
  ListIcon,
  Wrap,
  WrapItem,
  Tag,
  Button,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { motion, isValidMotionProp } from "framer-motion";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});
const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function About() {
  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.900" color="gray.100" position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgGradient="radial(circle at 10% 0%, rgba(34,211,238,0.12), transparent 40%), radial(circle at 90% 20%, rgba(168,85,247,0.10), transparent 40%)" />
      <Container maxW="8xl" position="relative" zIndex={1}>
        <Heading size="xl" color="cyan.300" textAlign="center" mb={10}>
          About
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={10} align="center">
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ width: '100%' }}>
            <Stack spacing={5} maxW="2xl">
              <Text fontSize={{ base: "md", md: "lg" }}>
                Junior Frontend Engineer focused on the React ecosystem. I build
                responsive, accessible interfaces with attention to performance,
                readability, and a great user experience.
              </Text>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="cyan.300" /> Component driven UIs with React + Chakra UI
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="cyan.300" /> API integration (REST/JSON), form handling, and basic state management
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="cyan.300" /> Accessibility-first mindset and mobile-first layouts
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="cyan.300" /> Collaborative workflows with Git and clear communication
                </ListItem>
              </List>
              <Wrap shouldWrapChildren spacing={2}>
                {[
                  "React",
                  "Chakra UI",
                  "Vite",
                  "JavaScript",
                  "TypeScript",
                  "HTML5",
                  "CSS3",
                  "Git",
                  "Framer Motion",
                ].map((tag) => (
<WrapItem as="div" key={tag}>
                    <MotionBox whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }}>
                      <Tag colorScheme="cyan" variant="subtle">{tag}</Tag>
                    </MotionBox>
                  </WrapItem>
                ))}
              </Wrap>

              {/* Mobile image just above CTAs */}
              <Box display={{ base: 'flex', md: 'none' }} justifyContent="center" mt={4}>
                <MotionBox position="relative" borderRadius="full" boxSize={{ base: '200px' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} _before={{ content: '""', position: 'absolute', inset: '-6px', borderRadius: '9999px', bg: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.55), rgba(168,85,247,0.45) 60%, transparent 70%)', filter: 'blur(8px)', zIndex: 0 }}>
                  <MotionImage src="/images/profile-pic (5).png" alt="profile" borderRadius="full" w="100%" h="100%" objectFit="cover" position="relative" zIndex={1} boxShadow="xl" loading="lazy" decoding="async" />
                </MotionBox>
              </Box>

              <Stack direction={{ base: "column", sm: "row" }} spacing={3} pt={2}>
                <Button as={NavLink} to="/portfolio" variant="outline">
                  View Portfolio
                </Button>
                <Button as={NavLink} to="/contact" colorScheme="cyan">
                  Contact Me
                </Button>
              </Stack>
            </Stack>
          </MotionBox>

          <Box flexShrink={0} display={{ base: 'none', md: 'flex' }} alignItems="center" justifyContent="center">
            <MotionBox position="relative" borderRadius="full" boxSize={{ base: "200px", md: "280px", lg: "320px" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.05 }} _before={{ content: '""', position: 'absolute', inset: '-6px', borderRadius: '9999px', bg: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.55), rgba(168,85,247,0.45) 60%, transparent 70%)', filter: 'blur(8px)', zIndex: 0 }}>
              <MotionImage src="/images/profile-pic (5).png" alt="profile" borderRadius="full" w="100%" h="100%" objectFit="cover" position="relative" zIndex={1} boxShadow="xl" loading="lazy" decoding="async" />
            </MotionBox>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
