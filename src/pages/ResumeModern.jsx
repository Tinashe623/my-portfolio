import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  ListIcon,

} from '@chakra-ui/react'
import { FaDownload, FaExternalLinkAlt, FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'
import { NavLink, useSearchParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
import { RESUME_DATA } from '../constants/resumeData'


import { GradientHeading } from '../components/common'

const ResumeModern = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchParams] = useSearchParams()

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    const element = document.getElementById('resume-content')

    // Opt-in for high quality render
    const opt = {
      margin: 0,
      filename: 'Tinashe_Mundieta_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('PDF Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Auto-trigger download if ?print=true is in the URL
  useEffect(() => {
    if (searchParams.get('print') === 'true') {
      const timer = setTimeout(() => {
        handleDownloadPDF()
      }, 1000) // Slightly longer delay to ensure fonts load
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      py={{ base: 8, md: 12, lg: 16 }}
      sx={{
        '@media print': {
          'header, footer, .no-print': { display: 'none !important' },
          body: { bg: 'white !important', color: 'black !important' },
          '.resume-paper': {
            boxShadow: 'none !important',
            maxW: '100% !important',
            p: '0 !important',
            m: '0 !important'
          },
        },
      }}
    >
      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>

        {/* Page Header */}
        <Box textAlign="center" mb={{ base: 10, md: 12 }}>
          <GradientHeading>Digital Resume</GradientHeading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="dark.textMuted"
            maxW="2xl"
            mx="auto"
            mt={4}
            lineHeight="tall"
          >
            A live, accessible version of my professional profile.
          </Text>

          <HStack justify="center" mt={6} spacing={4}>
            <Button
              leftIcon={<FaDownload />}
              onClick={handleDownloadPDF}
              variant="outline"
              size="md"
              borderColor="whiteAlpha.300"
              color="white"
              isLoading={isGenerating}
              loadingText="Generating PDF..."
              _hover={{ bg: 'whiteAlpha.100' }}
            >
              Download PDF
            </Button>
          </HStack>
        </Box>

        {/* Resume "Paper" Container */}
        <Box
          id="resume-content"
          maxW="800px" // Slightly reduced for better mobile/PDF fit
          mx="auto"
          bg="white"
          color="gray.800"
          borderRadius="sm"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          position="relative"
          overflow="hidden"
          p={{ base: 6, md: 8 }} // Reduced padding for compactness
        >
          {/* Top colored accent bar */}
          <Box h="6px" bgGradient="linear(to-r, brand.600, accent.500)" w="100%" position="absolute" top={0} left={0} />

          {/* Wrapper for internal padding handling */}
          <Box>
            <VStack align="start" spacing={4} mb={4} borderBottom="2px solid" borderColor="gray.100" pb={4}>
              <Box>
                <Heading as="h1" size="xl" color="gray.900" letterSpacing="tight" mb={1} fontFamily="serif">
                  {RESUME_DATA.header.name}
                </Heading>
                <Text fontSize="md" color="brand.600" fontWeight="600" letterSpacing="wide" textTransform="uppercase">
                  {RESUME_DATA.header.title}
                </Text>
              </Box>

              <Flex
                wrap="wrap"
                gap={4}
                fontSize="xs"
                color="gray.600"
                w="100%"
                fontWeight="500"
              >
                <HStack spacing={2} align="center">
                  <Box as="span" w="6px" h="6px" borderRadius="full" bg="brand.500" />
                  <Text as="a" href={RESUME_DATA.header.links[0].url} target="_blank" rel="noopener noreferrer" _hover={{ color: 'brand.600' }} fontWeight="500" color="gray.700">
                    tinashe-portfolio.netlify.app
                  </Text>
                </HStack>
                <HStack spacing={2} align="center">
                  <Box as="span" w="6px" h="6px" borderRadius="full" bg="brand.500" />
                  <Text as="a" href={RESUME_DATA.header.links[1].url} target="_blank" rel="noopener noreferrer" _hover={{ color: 'brand.600' }} fontWeight="500" color="gray.700">
                    github.com/Tinashe623
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={FaEnvelope} color="accent.500" />
                  <Text>{RESUME_DATA.header.email}</Text>
                </HStack>
                <HStack>
                  <Icon as={FaPhone} color="accent.500" />
                  <Text>{RESUME_DATA.header.phone}</Text>
                </HStack>
                <HStack>
                  <Icon as={FaMapMarkerAlt} color="accent.500" />
                  <Text>{RESUME_DATA.header.location}</Text>
                </HStack>
              </Flex>
            </VStack>

            {/* Profile Summary */}
            <Box mb={4}>
              <Heading as="h3" size="sm" mb={2} color="gray.900" textTransform="uppercase" letterSpacing="wider" borderLeft="3px solid" borderColor="brand.500" pl={2}>
                Profile Summary
              </Heading>
              <Text fontSize="sm" lineHeight="1.6" color="gray.700" textAlign="justify">
                {RESUME_DATA.summary}
              </Text>
            </Box>

            {/* Technical Skills - Grid Layout for Compactness */}
            <Box mb={4}>
              <Heading as="h3" size="sm" mb={3} color="gray.900" textTransform="uppercase" letterSpacing="wider" borderLeft="3px solid" borderColor="brand.500" pl={2}>
                Technical Skills
              </Heading>
              <List spacing={1} fontSize="sm">
                {RESUME_DATA.skills.technical.map((skill, index) => (
                  <ListItem key={index} color="gray.700" display="flex" alignItems="start">
                    <ListIcon as={FaCheckCircle} color="brand.500" mt="3px" boxSize={3} />
                    {skill}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Education & Certifications */}
            <Box mb={4}>
              <Heading as="h3" size="sm" mb={3} color="gray.900" textTransform="uppercase" letterSpacing="wider" borderLeft="3px solid" borderColor="brand.500" pl={2}>
                Education & Certifications
              </Heading>
              <VStack align="stretch" spacing={4}>
                {RESUME_DATA.education.map((edu, index) => (
                  <Box key={index}>
                    <Flex justify="space-between" align="center" mb={1}>
                      <Text fontWeight="700" fontSize="sm" color="gray.800">{edu.degree}</Text>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          backgroundColor: '#F7FAFC',
                          color: '#1A202C',
                          border: '1px solid #E2E8F0',
                          borderRadius: '4px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: '1',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}
                      >
                        {edu.year}
                      </span>
                    </Flex>
                    <Text color="brand.600" fontWeight="600" fontSize="xs" mb={1}>{edu.institution}</Text>
                    <Text color="gray.700" fontSize="xs">{edu.details}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Selected Projects (Text Only for PDF) */}
            <Box mb={4} p={4} borderRadius="md" bg="gray.50" border="1px solid" borderColor="gray.200">
              <Heading as="h3" size="sm" mb={2} color="gray.800" textTransform="uppercase" letterSpacing="wider" display="flex" alignItems="center" gap={2}>
                Selected Projects
              </Heading>
              <Text fontSize="sm" color="gray.700" mb={3} lineHeight="relaxed">
                {RESUME_DATA.projects.note}
              </Text>

              {/* This button is hidden during PDF generation via data-html2canvas-ignore */}
              <Button
                as={NavLink}
                to={RESUME_DATA.projects.link}
                rightIcon={<FaExternalLinkAlt />}
                colorScheme="blue"
                variant="solid"
                bg="brand.600"
                _hover={{ bg: 'brand.700' }}
                size="sm"
                shadow="sm"
                data-html2canvas-ignore="true"
              >
                {RESUME_DATA.projects.action}
              </Button>
              {/* Fallback text for PDF */}
              <Text fontSize="xs" color="gray.500" fontStyle="italic" mt={1} display="none" className="pdf-only-text">
                Visit <Text as="span" color="brand.600" fontWeight="600">tinashe-portfolio.netlify.app/portfolio</Text> for full details.
              </Text>
            </Box>

            {/* Soft Skills & Availability */}
            <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
              <Box flex={1}>
                <Heading as="h3" size="sm" mb={3} color="gray.900" textTransform="uppercase" letterSpacing="wider" borderLeft="3px solid" borderColor="brand.500" pl={2}>
                  Soft Skills
                </Heading>
                <Flex wrap="wrap" gap={2}>
                  {RESUME_DATA.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#F7FAFC',
                        color: '#1A202C',
                        border: '1px solid #E2E8F0',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginRight: '8px',
                        marginBottom: '8px',
                        lineHeight: '1.4',
                        textAlign: 'center'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </Flex>
              </Box>

              <Box flex={1}>
                <Heading as="h3" size="sm" mb={2} color="gray.900" textTransform="uppercase" letterSpacing="wider" borderLeft="3px solid" borderColor="brand.500" pl={2}>
                  Availability
                </Heading>
                <Text color="gray.800" fontSize="sm" fontWeight="500">
                  {RESUME_DATA.availability}
                </Text>
              </Box>
            </Flex>

          </Box>

          {/* Bottom accent bar */}
          <Box h="6px" bgGradient="linear(to-r, accent.500, brand.600)" w="100%" position="absolute" bottom={0} left={0} />
        </Box>
      </Container>

      {/* Styles for PDF generation visibility toggles */}
      <style>
        {`
           /* Ensure we can target PDF specific visibility if needed via class addition during gen, 
              but data-html2canvas-ignore handles the button */
        `}
      </style>
    </Box>
  )
}

export default ResumeModern
