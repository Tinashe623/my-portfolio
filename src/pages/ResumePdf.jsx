import React from 'react'
import { Box, Container, Text, VStack, HStack, Button } from '@chakra-ui/react'
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { GradientHeading } from '../components/common'

const RESUME_PDF_PATH = '/Tinashe_mundieta_resume.pdf'
// Some PDF viewers honor these fragment params for a cleaner embedded preview.
const RESUME_PDF_PREVIEW_SRC = `${RESUME_PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`

export default function ResumePdf() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="calc(100vh - var(--header-h) - var(--footer-h))"
      py={{ base: 8, md: 12, lg: 16 }}
    >
      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 8 }}>
        <Box textAlign="center" mb={{ base: 8, md: 10 }}>
          <GradientHeading>Tinashe_mundieta_resume</GradientHeading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="dark.textMuted" maxW="2xl" mx="auto" mt={4}>
            Download or preview my resume.
          </Text>

          <HStack justify="center" mt={6} spacing={3} flexWrap="wrap">
            <Button
              as="a"
              href={RESUME_PDF_PATH}
              download="Tinashe_Mundieta_Resume.pdf"
              variant="primary"
              leftIcon={<DownloadIcon />}
            >
              Download CV
            </Button>
            <Button
              as="a"
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              leftIcon={<ExternalLinkIcon />}
            >
              Open in new tab
            </Button>
          </HStack>
        </Box>

        <VStack spacing={4} align="stretch">
          <Box
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            h={{ base: '70vh', md: '78vh' }}
          >
            <Box
              as="iframe"
              title="Resume PDF"
              src={RESUME_PDF_PREVIEW_SRC}
              w="100%"
              h="100%"
              border={0}
              bg="white"
            />
          </Box>

          <Text fontSize="sm" color="dark.textMuted" textAlign="center">
            If the preview doesn’t load, use the “Open in new tab” button above.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
