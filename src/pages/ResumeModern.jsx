import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Center,
  Spinner,
  Icon,
  VStack,
  Button,
  Flex,
} from '@chakra-ui/react'
import { FaFileDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import AnimatedGradientMesh from '../components/effects/AnimatedGradientMesh'
import GlassCard from '../components/effects/GlassCard'
import { GradientHeading } from '../components/common'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const ResumeModern = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const resumeUrl = '/Tinashe_Mundieta_cv.pdf'

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
      <AnimatedGradientMesh variant="vibrant" intensity="low" />
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

        <GlassCard p={{ base: 2, sm: 4, md: 6 }} variant="strong">
          <VStack spacing={4}>
            <Document
              file={resumeUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <Center>
                  <Spinner size="xl" />
                </Center>
              }
              error={
                <Center>
                  <Text color="red.500">Failed to load PDF file.</Text>
                </Center>
              }
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <Flex justify="center" align="center" gap="4">
              <Button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                leftIcon={<FaChevronLeft />}
              >
                Prev
              </Button>
              <Text>
                Page {pageNumber} of {numPages}
              </Text>
              <Button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                rightIcon={<FaChevronRight />}
              >
                Next
              </Button>
            </Flex>
            <a href={resumeUrl} download>
              <Button
                leftIcon={<FaFileDownload />}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Download Resume
              </Button>
            </a>
          </VStack>
        </GlassCard>
      </Container>
    </Box>
  )
}

export default ResumeModern
