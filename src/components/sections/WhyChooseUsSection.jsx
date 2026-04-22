import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaTools, FaWindows, FaLinux, FaBolt } from 'react-icons/fa'
import { WHY_CHOOSE_US } from '../../constants'

const MotionBox = motion(Box)

const iconMap = {
  FaCode,
  FaRocket,
  FaTools,
  FaWindows,
  FaLinux,
  FaBolt,
}

export default function WhyChooseUsSection() {
  return (
    <Box py={{ base: 20, md: 24, lg: 28 }} position="relative">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 10, md: 12 }}
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
            WHY WORK WITH ME
          </Badge>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="800"
            mb={4}
            color="white"
          >
            Why{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              Choose Me
            </Text>
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.400"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            Combining modern frontend development with system administration expertise to deliver
            comprehensive digital solutions
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 6 }}>
          {WHY_CHOOSE_US.map((item, i) => (
            <MotionBox
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                p={6}
                borderRadius="2xl"
                bg="rgba(255,255,255,0.02)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                _hover={{
                  borderColor: 'brand.400',
                  bg: 'rgba(99, 102, 241, 0.05)',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s ease"
                cursor="default"
              >
                <HStack align="start" spacing={4}>
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg="linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15))"
                    color="brand.300"
                    flexShrink={0}
                  >
                    <Icon as={iconMap[item.icon]} boxSize={5} />
                  </Box>
                  <VStack align="start" spacing={2} flex={1}>
                    <Heading size="sm" color="white" fontWeight="700">
                      {item.title}
                    </Heading>
                    <Text color="gray.400" fontSize="sm" lineHeight="tall">
                      {item.desc}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      {/* Divider */}
      <Box h="150px" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          h="1px"
          bg="linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 50%, transparent 100%)"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="300px"
          h="1px"
          bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)"
        />
      </Box>
    </Box>
  )
}
