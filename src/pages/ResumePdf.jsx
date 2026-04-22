import React from 'react'
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Icon,
  Badge,
  Heading,
  Stack,
  Flex,
} from '@chakra-ui/react'
import { DownloadIcon, ExternalLinkIcon, TimeIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { FaReact, FaPalette, FaLinux, FaWindows, FaHtml5, FaCss3, FaJs } from 'react-icons/fa'

import GradientHeading from '../components/common/GradientHeading'

const MotionBox = motion(Box)

const RESUME_PDF_PATH = '/Tinashe_mundieta_resume.pdf'
const RESUME_PDF_PREVIEW_SRC = `${RESUME_PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`

const resumeSummary = {
  name: 'Tinashe Mundieta',
  title: 'Frontend Developer & System Administrator',
  location: 'Harare, Zimbabwe',
  email: 'tinashe.mundieta@email.com',
  phone: '+263 771 234 567',
  summary:
    'Passionate frontend developer with expertise in React ecosystem and system administration. Skilled at building responsive, accessible web applications while maintaining reliable IT infrastructure.',
  experience: [
    {
      year: '2023 - Present',
      role: 'Freelance Web Developer',
      company: 'Self-employed',
      description:
        'Building modern web applications for clients using React, Chakra UI, and related technologies.',
    },
    {
      year: '2022 - 2023',
      role: 'IT Support Specialist',
      company: 'Tech Solutions Hub',
      description:
        'Provided system administration, hardware maintenance, and technical support services.',
    },
  ],
  education: [
    {
      year: '2020 - 2023',
      degree: 'Computer Science',
      school: 'Harare Institute of Technology',
      description: 'Foundation in software development and IT fundamentals.',
    },
  ],
}

const skills = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3, color: '#1572B6' },
  { name: 'Windows Admin', icon: FaWindows, color: '#0078D4' },
  { name: 'Linux', icon: FaLinux, color: '#FCC624' },
  { name: 'UI Design', icon: FaPalette, color: '#2dd4bf' },
]

export default function ResumePdf() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      color="white"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.1), transparent)"
        pointerEvents="none"
      />

      <Container
        maxW="7xl"
        position="relative"
        zIndex={1}
        py={{ base: 8, md: 12, lg: 16 }}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 8, md: 10 }}
        >
          <Badge
            px={4}
            py={1}
            borderRadius="full"
            bg="rgba(99, 102, 241, 0.15)"
            color="brand.300"
            fontSize="xs"
            fontWeight="600"
            letterSpacing="wide"
            mb={4}
          >
            MY RESUME
          </Badge>
          <GradientHeading fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} mb={4}>
            Resume
          </GradientHeading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="dark.textMuted" maxW="2xl" mx="auto">
            Download or preview my detailed resume to learn more about my experience and skills.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={10}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              p={6}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Heading size="md" mb={5} color="white" fontWeight="700">
                About Me
              </Heading>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="700" color="brand.300" fontSize="lg">
                    {resumeSummary.name}
                  </Text>
                  <Text color="gray.300" fontSize="md">
                    {resumeSummary.title}
                  </Text>
                </Box>

                <Stack spacing={2}>
                  <HStack color="dark.textMuted" fontSize="sm">
                    <Icon as={EmailIcon} color="brand.400" />
                    <Text>{resumeSummary.email}</Text>
                  </HStack>
                  <HStack color="dark.textMuted" fontSize="sm">
                    <Icon as={PhoneIcon} color="brand.400" />
                    <Text>{resumeSummary.phone}</Text>
                  </HStack>
                  <HStack color="dark.textMuted" fontSize="sm">
                    <Icon as={TimeIcon} color="brand.400" />
                    <Text>{resumeSummary.location}</Text>
                  </HStack>
                </Stack>

                <Text color="gray.400" fontSize="sm" lineHeight="tall">
                  {resumeSummary.summary}
                </Text>
              </VStack>
            </Box>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box
              p={6}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Heading size="md" mb={5} color="white" fontWeight="700">
                Skills
              </Heading>
              <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={3}>
                {skills.map((skill) => (
                  <HStack
                    key={skill.name}
                    p={3}
                    borderRadius="lg"
                    bg="rgba(255,255,255,0.02)"
                    border="1px solid"
                    borderColor="whiteAlpha.50"
                    _hover={{ borderColor: skill.color }}
                    transition="all 0.3s"
                  >
                    <Box color={skill.color}>
                      <Icon as={skill.icon} boxSize={5} />
                    </Box>
                    <Text fontSize="sm" fontWeight="600" color="gray.300">
                      {skill.name}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          </MotionBox>
        </SimpleGrid>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Flex direction={{ base: 'column', sm: 'row' }} justify="center" gap={4} mb={8}>
            <Button
              as="a"
              href={RESUME_PDF_PATH}
              download="Tinashe_Mundieta_Resume.pdf"
              size="lg"
              px={8}
              fontWeight="700"
              bgGradient="linear(to-r, brand.500, accent.500)"
              color="white"
              _hover={{
                bgGradient: 'linear(to-r, brand.600, accent.600)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              }}
              transition="all 0.3s"
              leftIcon={<DownloadIcon />}
            >
              Download CV
            </Button>
            <Button
              as="a"
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              px={8}
              fontWeight="600"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              _hover={{
                bg: 'whiteAlpha.100',
                borderColor: 'brand.400',
              }}
              leftIcon={<ExternalLinkIcon />}
            >
              Open in new tab
            </Button>
          </Flex>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <VStack spacing={4} align="stretch">
            <Box
              bg="rgba(255,255,255,0.02)"
              borderRadius="xl"
              overflow="hidden"
              border="1px solid"
              borderColor="whiteAlpha.100"
              h={{ base: '60vh', md: '75vh' }}
            >
              <Box
                as="iframe"
                title="Resume PDF Preview"
                src={RESUME_PDF_PREVIEW_SRC}
                w="100%"
                h="100%"
                border={0}
                bg="white"
              />
            </Box>

            <Text fontSize="sm" color="dark.textMuted" textAlign="center">
              Preview not loading?{' '}
              <Button
                as="a"
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
                color="brand.400"
                fontSize="sm"
              >
                Open in new tab
              </Button>
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}
