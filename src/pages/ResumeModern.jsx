import React, { useState } from 'react'
import {
  Box,
  Container,
  Text,
  Center,
  Spinner,
  VStack,
  Button,
  Flex,
} from '@chakra-ui/react'
import { FaFileDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import GlassCard from '../components/effects/GlassCard'
import { GradientHeading } from '../components/common'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const ResumeModern = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const rawResume = import.meta.env.VITE_RESUME_PDF_URL || 'Tinashe_Mundieta_cv.pdf'
  const base = import.meta.env.BASE_URL || '/'
  const resumeUrl =
    rawResume.startsWith('http') || rawResume.startsWith('/')
      ? rawResume
      : `${base}${rawResume}`

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  const goToPrevPage = () => setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
  const goToNextPage = () => setPageNumber(pageNumber + 1 <= numPages ? pageNumber + 1 : numPages)

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      py={{ base: 8, md: 12, lg: 16 }}
    >

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        <Box textAlign="center" mb={{ base: 10, md: 12, lg: 14 }}>
          <GradientHeading>My Resume</GradientHeading>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="gray.400"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            Here you can view and download my resume.
          </Text>
        </Box>

        <GlassCard p={{ base: 4, md: 6 }} variant="strong">
          <VStack spacing={6} align="stretch">
            {/* Top toolbar */}
            <Flex
              justify="space-between"
              align="center"
              w="100%"
              pb={3}
              borderBottom="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Box>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="gray.500"
                  mb={1}
                >
                  PDF Viewer
                </Text>
                <Text fontSize="sm" fontWeight="600" color="gray.100">
                  Resume – Tinashe Mundieta
                </Text>
              </Box>
              <Button
                as="a"
                href={resumeUrl}
                download
                size="sm"
                leftIcon={<FaFileDownload />}
                bgGradient="linear(to-r, brand.400, accent.400)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, brand.300, accent.300)',
                  transform: 'translateY(-1px)',
                }}
              >
                Download
              </Button>
            </Flex>

            {/* PDF viewer */}
            <Box
              w="100%"
              bg="blackAlpha.900"
              borderRadius="xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              px={{ base: 2, md: 4 }}
              py={{ base: 4, md: 6 }}
            >
              <Document
                file={resumeUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <Center py={10}>
                    <Spinner size="lg" />
                  </Center>
                }
                error={
                  <Center flexDir="column" py={8}>
                    <Text color="gray.300" fontWeight="600" mb={2}>
                      Resume preview not available.
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      Please use the Download button above to open the PDF.
                    </Text>
                  </Center>
                }
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </Box>

            {/* Controls */}
            <Flex justify="space-between" align="center" w="100%" pt={1}>
              <Button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                leftIcon={<FaChevronLeft />}
                variant="ghost"
                size="sm"
              >
                Previous
              </Button>
              <Text fontSize="sm" color="gray.300">
                Page {pageNumber} of {numPages || '?'}
              </Text>
              <Button
                onClick={goToNextPage}
                disabled={!numPages || pageNumber >= numPages}
                rightIcon={<FaChevronRight />}
                variant="ghost"
                size="sm"
              >
                Next
              </Button>
            </Flex>
          </VStack>
        </GlassCard>
      </Container>
    </Box>
  )
}

export default ResumeModern
