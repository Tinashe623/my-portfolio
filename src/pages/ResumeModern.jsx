import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Text,
  Center,
  Spinner,
  VStack,
  Button,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaFileDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import GlassCard from '../components/effects/GlassCard'
import { GradientHeading } from '../components/common'

// Configure PDF worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const ResumeModern = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [containerWidth, setContainerWidth] = useState(null)
  const containerRef = useRef(null)

  const rawResume = import.meta.env.VITE_RESUME_PDF_URL || 'Tinashe_Mundieta_cv.pdf'
  const base = import.meta.env.BASE_URL || '/'
  const resumeUrl =
    rawResume.startsWith('http') || rawResume.startsWith('/')
      ? rawResume
      : `${base}${rawResume}`

  // Responsive logic to fit PDF to container
  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect
      setContainerWidth(width)
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

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
            color="dark.textMuted"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            A comprehensive look at my professional journey and technical expertise.
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
              wrap="wrap"
              gap={4}
            >
              <Box>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="gray.500"
                  mb={1}
                >
                  Document Viewer
                </Text>
                <Text fontSize="sm" fontWeight="600" color="white">
                  Resume – Tinashe Mundieta
                </Text>
              </Box>
              <Button
                as="a"
                href={resumeUrl}
                download
                size="sm"
                leftIcon={<FaFileDownload />}
                variant="primary"
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
              >
                Download PDF
              </Button>
            </Flex>

            {/* PDF viewer Container */}
            <Box
              ref={containerRef}
              w="100%"
              bg="blackAlpha.500" // Dark background behind the white paper
              borderRadius="xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              p={{ base: 4, md: 8 }} // Padding behaves like "desk space" around the paper
              display="flex"
              justifyContent="center"
              minH="600px" // Minimum height to avoid collapse while loading
            >
              <Document
                file={resumeUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <Center h="400px" w="full">
                    <VStack spacing={4}>
                      <Spinner size="xl" color="brand.500" thickness="3px" />
                      <Text color="dark.textMuted" fontSize="sm">
                        Loading document...
                      </Text>
                    </VStack>
                  </Center>
                }
                error={
                  <Center flexDir="column" py={20} px={4}>
                    <Text color="red.300" fontWeight="600" mb={2}>
                      Unable to load PDF preview.
                    </Text>
                    <Text fontSize="sm" color="dark.textMuted" textAlign="center" mb={6}>
                      This browser configuration may blocked the embedded viewer.
                    </Text>
                    <Button
                      as="a"
                      href={resumeUrl}
                      download
                      variant="outline"
                      size="sm"
                    >
                      Download Instead
                    </Button>
                  </Center>
                }
              >
                {/* 
                  The Page component renders a canvas. 
                  We constrain width to containerWidth minus padding.
                  We add shadow and borderRadius to the canvas itself via css/style prop 
                */}
                <Box
                  boxShadow="0 20px 40px rgba(0,0,0,0.4)" // Paper shadow
                  borderRadius="sm"
                  overflow="hidden"
                >
                  <Page
                    pageNumber={pageNumber}
                    width={containerWidth ? Math.min(containerWidth - 64, 800) : 300} // Max width 800px to keep it readable, padding considered
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="pdf-page"
                  />
                </Box>
              </Document>
            </Box>

            {/* Pagination Controls - Only show if > 1 page */}
            {numPages && numPages > 1 && (
              <Flex justify="center" align="center" w="100%" gap={4} pt={2}>
                <Button
                  onClick={goToPrevPage}
                  isDisabled={pageNumber <= 1}
                  leftIcon={<FaChevronLeft />}
                  variant="ghost"
                  size="sm"
                >
                  Previous
                </Button>
                <Text fontSize="sm" color="dark.textMuted" fontWeight="600">
                  Page {pageNumber} of {numPages}
                </Text>
                <Button
                  onClick={goToNextPage}
                  isDisabled={pageNumber >= numPages}
                  rightIcon={<FaChevronRight />}
                  variant="ghost"
                  size="sm"
                >
                  Next
                </Button>
              </Flex>
            )}
          </VStack>
        </GlassCard>
      </Container>

      {/* Global styles override for react-pdf specific class issues if any */}
      <style>
        {`
          .react-pdf__Page__canvas {
            display: block !important;
            margin: 0 auto;
            max-width: 100%;
            height: auto !important;
          }
          .react-pdf__Page__textContent {
            display: none !important; /* Hide text layer if it causes selection alignment issues, optional */
          }
        `}
      </style>
    </Box>
  )
}

export default ResumeModern
