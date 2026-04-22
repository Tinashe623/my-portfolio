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
  Avatar,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaQuoteRight } from 'react-icons/fa'
import { TESTIMONIALS } from '../../constants'

const MotionBox = motion(Box)

export default function TestimonialsSection() {
  return (
    <Box pt={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }} position="relative">
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
            bg="rgba(168, 85, 247, 0.15)"
            color="accent.300"
            fontSize="xs"
            fontWeight="600"
            letterSpacing="wide"
            mb={4}
          >
            TESTIMONIALS
          </Badge>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="800"
            mb={4}
            color="white"
          >
            Client{' '}
            <Text as="span" bgGradient="linear(135deg, brand.400, accent.400)" bgClip="text">
              Feedback
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl" mx="auto">
            Real feedback from projects I've worked on
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, md: 6 }}>
          {TESTIMONIALS.map((testimonial, i) => (
            <MotionBox
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                p={{ base: 5, md: 7 }}
                borderRadius="2xl"
                bg="linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
                border="1px solid"
                borderColor="whiteAlpha.100"
                _hover={{
                  borderColor: 'accent.400',
                  boxShadow: '0 0 40px rgba(168,85,247,0.1)',
                }}
                transition="all 0.3s ease"
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" top="-20px" right="20px" opacity={0.1}>
                  <Icon as={FaQuoteRight} boxSize={16} color="accent.300" />
                </Box>
                <VStack align="start" spacing={4} position="relative">
                  <Text color="gray.300" fontSize="sm" lineHeight="tall" fontStyle="italic">
                    "{testimonial.quote}"
                  </Text>
                  <HStack spacing={3} pt={2}>
                    <Avatar src={testimonial.avatar} name={testimonial.name} size="sm" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="700" color="white" fontSize="sm">
                        {testimonial.name}
                      </Text>
                      <Text color="dark.textMuted" fontSize="xs">
                        {testimonial.role}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
