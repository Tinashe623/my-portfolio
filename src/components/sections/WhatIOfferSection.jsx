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
  Button,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { FaCode, FaRocket, FaServer } from 'react-icons/fa'

const MotionBox = motion(Box)

const services = [
  {
    title: 'Web Development',
    desc: 'Modern, responsive websites and web applications built with React and cutting-edge technologies.',
    icon: FaCode,
    color: 'brand',
  },
  {
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, accessible user interfaces with smooth animations and intuitive interactions.',
    icon: FaRocket,
    color: 'accent',
  },
  {
    title: 'System Administration',
    desc: 'Windows & Linux server management, maintenance, upgrades, and technical support.',
    icon: FaServer,
    color: 'green',
  },
]

export default function WhatIOfferSection() {
  return (
    <Box pt={{ base: 8, md: 12 }} pb={{ base: 16, md: 20 }} bg="rgba(5, 5, 5, 0.3)">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 14, md: 16 }}
        >
          <Badge
            px={4}
            py={1}
            borderRadius="full"
            bg="rgba(34, 211, 238, 0.15)"
            color="cyan.300"
            fontSize="xs"
            fontWeight="600"
            letterSpacing="wide"
            mb={4}
          >
            WHAT I OFFER
          </Badge>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="800"
            mb={4}
            color="white"
          >
            Services{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              I Provide
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
            Delivering comprehensive digital solutions tailored to your needs
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {services.map((service, i) => (
            <MotionBox
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                p={7}
                borderRadius="2xl"
                bg="rgba(255,255,255,0.02)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                _hover={{
                  borderColor: `${service.color}.400`,
                  bg: 'rgba(255,255,255,0.04)',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s ease"
                cursor="default"
              >
                <HStack align="start" spacing={4}>
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg={`${service.color}.900`}
                    color={`${service.color}.300`}
                  >
                    <Icon as={service.icon} boxSize={5} />
                  </Box>
                  <VStack align="start" spacing={2} flex={1}>
                    <Heading size="md" color="white" fontWeight="700">
                      {service.title}
                    </Heading>
                    <Text color="gray.400" fontSize="sm" lineHeight="tall">
                      {service.desc}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mt={10}
          textAlign="center"
        >
          <Button
            as={NavLink}
            to="/services"
            size="lg"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="white"
            _hover={{
              bg: 'whiteAlpha.100',
              borderColor: 'brand.400',
            }}
            rightIcon={<ArrowForwardIcon />}
          >
            View All Services
          </Button>
        </MotionBox>
      </Container>
    </Box>
  )
}
