import React, { useMemo, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Link,
  Badge,
  HStack,
  VStack,
  Flex,
  chakra,
  shouldForwardProp,
  Wrap,
  WrapItem,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { FaCertificate, FaAward, FaCheckCircle, FaTrophy } from 'react-icons/fa'
import AnimatedGradientMesh from '../components/effects/AnimatedGradientMesh'
import GlassCard from '../components/effects/GlassCard'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const certs = [
  {
    title: 'HTML5',
    issuer: 'W3Schools',
    date: 'April 3, 2024',
    url: 'https://verify.w3schools.com/1OOV2NTADY',
    tags: ['HTML5'],
    color: 'orange',
  },
  {
    title: 'Frontend Development',
    issuer: 'W3Schools',
    date: 'October 19, 2024',
    url: 'https://verify.w3schools.com/1PAT7UCLEL',
    tags: ['Frontend'],
    color: 'cyan',
  },
  {
    title: 'CSS',
    issuer: 'W3Schools',
    date: 'April 27, 2024',
    url: 'https://verify.w3schools.com/1ORGOIOLIT',
    tags: ['CSS3'],
    color: 'purple',
  },
  {
    title: 'JavaScript',
    issuer: 'W3Schools',
    date: 'October 19, 2024',
    url: 'https://verify.w3schools.com/1PAT7PQY0O',
    tags: ['JavaScript'],
    color: 'yellow',
  },
]

export default function CertificatesModern() {
  const [filter, setFilter] = useState('All')

  const filteredCerts = useMemo(() => {
    if (filter === 'All') return certs
    return certs.filter((c) => c.tags.includes(filter))
  }, [filter])

  const allTags = ['All', 'HTML5', 'CSS3', 'JavaScript', 'Frontend']

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      pt={{ base: 8, md: 10, lg: 12 }}
      pb={{ base: 10, md: 12, lg: 16 }}
    >
      <AnimatedGradientMesh variant="subtle" intensity="medium" />

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={{ base: 6, md: 8, lg: 10 }}
        >
          <Heading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="900"
            mb={4}
            bgGradient="linear(135deg, brand.300, accent.300)"
            bgClip="text"
          >
            Certifications & Achievements
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="gray.400"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            Professional certifications validating my expertise in modern web development
          </Text>
        </MotionBox>

        {/* Stats Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          mb={{ base: 8, md: 8, lg: 10 }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 4, md: 5 }}>
            <GlassCard
              p={5}
              textAlign="center"
              borderWidth="1px"
              borderColor="rgba(34, 211, 238, 0.2)"
            >
              <Icon as={FaCertificate} boxSize={7} color="cyan.400" mb={2} />
              <Heading size="lg" color="white" mb={1}>
                {certs.length}
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Certificates
              </Text>
            </GlassCard>
            <GlassCard
              p={5}
              textAlign="center"
              borderWidth="1px"
              borderColor="rgba(168, 85, 247, 0.2)"
            >
              <Icon as={FaCheckCircle} boxSize={7} color="purple.400" mb={2} />
              <Heading size="lg" color="white" mb={1}>
                100%
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Verified
              </Text>
            </GlassCard>
            <GlassCard
              p={5}
              textAlign="center"
              borderWidth="1px"
              borderColor="rgba(236, 72, 153, 0.2)"
            >
              <Icon as={FaTrophy} boxSize={7} color="pink.400" mb={2} />
              <Heading size="lg" color="white" mb={1}>
                W3Schools
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Platform
              </Text>
            </GlassCard>
            <GlassCard
              p={5}
              textAlign="center"
              borderWidth="1px"
              borderColor="rgba(251, 146, 60, 0.2)"
            >
              <Icon as={FaAward} boxSize={7} color="orange.400" mb={2} />
              <Heading size="lg" color="white" mb={1}>
                2024
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Latest
              </Text>
            </GlassCard>
          </SimpleGrid>
        </MotionBox>

        {/* Filter Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          mb={{ base: 6, md: 8, lg: 10 }}
          textAlign="center"
        >
          <Text
            fontSize="sm"
            color="gray.400"
            mb={4}
            fontWeight="600"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Filter by Technology
          </Text>

          {/* Filter Buttons */}
          <Wrap justify="center" spacing={{ base: 2, md: 3 }}>
            {allTags.map((tag) => (
              <WrapItem key={tag}>
                <Button
                  size="md"
                  px={6}
                  onClick={() => setFilter(tag)}
                  bg={
                    filter === tag
                      ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                      : 'rgba(255, 255, 255, 0.05)'
                  }
                  color="white"
                  borderWidth="1px"
                  borderColor={filter === tag ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}
                  borderRadius="full"
                  fontWeight="600"
                  _hover={{
                    bg:
                      filter === tag
                        ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                        : 'rgba(34, 211, 238, 0.1)',
                    borderColor: filter === tag ? 'transparent' : 'rgba(34, 211, 238, 0.4)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.3s"
                >
                  {tag}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </MotionBox>

        {/* Certificates Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 4, sm: 5, md: 5, lg: 6 }}
          mb={{ base: 12, md: 20, lg: 28 }}
        >
          {filteredCerts.map((cert, i) => (
            <MotionBox
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <GlassCard
                p={0}
                h="100%"
                overflow="hidden"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                position="relative"
                _hover={{
                  borderColor: 'rgba(34, 211, 238, 0.5)',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                role="group"
              >
                {/* Certificate Header Background */}
                <Box
                  position="relative"
                  bg={`linear-gradient(135deg, rgba(${cert.color === 'cyan' ? '34,211,238' : cert.color === 'purple' ? '168,85,247' : cert.color === 'orange' ? '251,146,60' : '234,179,8'},0.1), rgba(${cert.color === 'cyan' ? '34,211,238' : cert.color === 'purple' ? '168,85,247' : cert.color === 'orange' ? '251,146,60' : '234,179,8'},0.05))`}
                  p={6}
                  borderBottom="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                >
                  <Flex justify="space-between" align="start" mb={4}>
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`rgba(${cert.color === 'cyan' ? '34,211,238' : cert.color === 'purple' ? '168,85,247' : cert.color === 'orange' ? '251,146,60' : '234,179,8'},0.2)`}
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor={`rgba(${cert.color === 'cyan' ? '34,211,238' : cert.color === 'purple' ? '168,85,247' : cert.color === 'orange' ? '251,146,60' : '234,179,8'},0.3)`}
                      transition="all 0.3s"
                      _groupHover={{
                        transform: 'rotate(-5deg) scale(1.1)',
                      }}
                    >
                      <Icon as={FaCertificate} boxSize={6} color={`${cert.color}.300`} />
                    </Box>
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={`rgba(${cert.color === 'cyan' ? '34,211,238' : cert.color === 'purple' ? '168,85,247' : cert.color === 'orange' ? '251,146,60' : '234,179,8'},0.15)`}
                      color={`${cert.color}.200`}
                      fontSize="xs"
                      fontWeight="700"
                      letterSpacing="wide"
                    >
                      {cert.issuer}
                    </Badge>
                  </Flex>

                  <Heading size="md" color="white" mb={2} lineHeight="shorter">
                    {cert.title}
                  </Heading>

                  <HStack spacing={2} color="gray.400" fontSize="sm">
                    <Icon as={FaCheckCircle} boxSize={4} color={`${cert.color}.400`} />
                    <Text>Issued {cert.date}</Text>
                  </HStack>
                </Box>

                {/* Card Content */}
                <VStack align="start" p={6} spacing={4}>
                  {/* Tags */}
                  <Flex wrap="wrap" gap={2} w="100%">
                    {cert.tags.map((tag) => (
                      <Box
                        key={tag}
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg="rgba(34, 211, 238, 0.1)"
                        border="1px solid rgba(34, 211, 238, 0.2)"
                        _hover={{
                          bg: 'rgba(34, 211, 238, 0.2)',
                          borderColor: 'rgba(34, 211, 238, 0.4)',
                        }}
                        transition="all 0.2s"
                      >
                        <Text fontSize="xs" fontWeight="600" color="brand.200">
                          {tag}
                        </Text>
                      </Box>
                    ))}
                  </Flex>

                  {/* Verify Button */}
                  <Button
                    as={Link}
                    href={cert.url}
                    isExternal
                    w="100%"
                    size="md"
                    bgGradient="linear(135deg, brand.400, brand.600)"
                    color="white"
                    rightIcon={<ExternalLinkIcon />}
                    _hover={{
                      bgGradient: 'linear(135deg, brand.300, brand.500)',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    Verify Certificate
                  </Button>
                </VStack>
              </GlassCard>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Achievement Summary */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlassCard
            variant="strong"
            p={{ base: 8, md: 10, lg: 12 }}
            textAlign="center"
            borderWidth="1px"
            borderColor="rgba(34, 211, 238, 0.2)"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative gradient */}
            <Box
              position="absolute"
              top="-50%"
              left="-10%"
              w="120%"
              h="200%"
              bgGradient="radial(circle, rgba(34,211,238,0.1), transparent 70%)"
              pointerEvents="none"
            />

            <VStack spacing={6} position="relative">
              <Box
                p={4}
                borderRadius="full"
                bg="rgba(34, 211, 238, 0.1)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(34, 211, 238, 0.3)"
              >
                <Icon as={FaAward} boxSize={12} color="brand.300" />
              </Box>

              <Heading size="lg" color="white" maxW="xl">
                Committed to Continuous Learning
              </Heading>

              <Text color="gray.400" maxW="2xl" fontSize="lg" lineHeight="tall">
                These certifications represent my dedication to mastering frontend development and
                staying current with modern web technologies. Each certification validates my
                expertise and commitment to professional growth.
              </Text>

              <HStack spacing={8} pt={4}>
                <VStack spacing={1}>
                  <Icon as={FaCheckCircle} boxSize={6} color="green.400" />
                  <Text fontSize="sm" color="gray.400">
                    Verified
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={FaTrophy} boxSize={6} color="yellow.400" />
                  <Text fontSize="sm" color="gray.400">
                    Recognized
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={FaCertificate} boxSize={6} color="brand.400" />
                  <Text fontSize="sm" color="gray.400">
                    Certified
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  )
}
