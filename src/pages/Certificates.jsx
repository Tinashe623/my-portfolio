import React, { useMemo, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  Link,
  Tag,
  HStack,
  chakra,
  shouldForwardProp,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ButtonGroup,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const MotionCard = motion(chakra(Card))

const certs = [
  { title: 'HTML5', issuer: 'W3Schools', date: 'April 3, 2024', url: 'https://verify.w3schools.com/1OOV2NTADY', tags: ['HTML5'] },
  { title: 'Frontend Development', issuer: 'W3Schools', date: 'October 19, 2024', url: 'https://verify.w3schools.com/1PAT7UCLEL', tags: ['Frontend'] },
  { title: 'CSS', issuer: 'W3Schools', date: 'April 27, 2024', url: 'https://verify.w3schools.com/1ORGOIOLIT', tags: ['CSS3'] },
  { title: 'JavaScript', issuer: 'W3Schools', date: 'October 19, 2024', url: 'https://verify.w3schools.com/1PAT7PQY0O', tags: ['JavaScript'] },
]

export default function Certificates() {
  const [filter, setFilter] = useState('All')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected, setSelected] = useState(null)
  const filteredCerts = useMemo(() => {
    if (filter === 'All') return certs
    return certs.filter(c => c.tags.includes(filter))
  }, [filter])

  const openModal = (c) => { setSelected(c); onOpen() }

  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.900" color="gray.100" position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgGradient="radial(circle at 15% 0%, rgba(34,211,238,0.10), transparent 45%), radial(circle at 85% 10%, rgba(168,85,247,0.08), transparent 45%)" />
      <Container maxW="8xl" position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        <chakra.div as={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Heading fontSize={{ base: '2xl', md: '3xl' }} color="cyan.300" textAlign="center" mb={{ base: 3, md: 6 }}>Certificates</Heading>
          <Box mb={{ base: 4, md: 8 }}>
            <Wrap justify="center" spacing={{ base: 2, md: 3 }}>
              {['All','HTML5','CSS3','JavaScript','Frontend'].map(t => (
                <WrapItem key={t}>
                  <Button size={{ base: 'sm', md: 'md' }} onClick={() => setFilter(t)} variant={filter === t ? 'solid' : 'outline'} colorScheme="cyan">{t}</Button>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </chakra.div>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 3, md: 6 }}>
          {filteredCerts.map((c, i) => (
            <MotionCard
              key={c.title}
              bg="gray.800"
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="xl"
              position="relative"
              overflow="hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.4)', boxShadow: '0 6px 20px rgba(34,211,238,0.12)' }}
              _before={{
                content: '""',
                position: 'absolute',
                inset: '-2px',
                borderRadius: 'md',
                bg: 'linear-gradient(90deg, rgba(34,211,238,0.35), rgba(168,85,247,0.25), rgba(34,211,238,0.35))',
                filter: 'blur(12px)',
                opacity: 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}
              _hover={{ _before: { opacity: 0.3 } }}
            >
              <CardHeader onClick={() => openModal(c)} cursor="pointer" pb={{ base: 2, md: 3 }} pt={{ base: 3, md: 4 }}>
                <HStack justify="space-between" align="start" spacing={2}>
                  <Heading fontSize={{ base: 'md', md: 'lg' }} color="gray.100">{c.title}</Heading>
                  <Tag colorScheme="cyan" variant="subtle" size={{ base: 'sm', md: 'md' }}>{c.issuer}</Tag>
                </HStack>
              </CardHeader>
              <CardBody pt={0} minH={{ base: 'auto', md: '120px' }} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
                <Text color="gray.300" fontSize={{ base: 'sm', md: 'md' }}>Issued: {c.date}</Text>
                <HStack spacing={2} mt={3} wrap="wrap">
                  {c.tags.map((t) => (
                    <Tag key={t} variant="outline" colorScheme="cyan" size={{ base: 'sm', md: 'md' }}>{t}</Tag>
                  ))}
                </HStack>
              </CardBody>
              <CardFooter pt={0} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
                <Button as={Link} href={c.url} isExternal colorScheme="cyan" rightIcon={<ExternalLinkIcon />} w="100%" size={{ base: 'sm', md: 'md' }}>
                  Verify Certificate
                </Button>
              </CardFooter>
            </MotionCard>
          ))}
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="gray.100">
<ModalHeader color="gray.100">{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected ? (
              <>
                <Text mb={2}><strong>Issuer:</strong> {selected.issuer}</Text>
                <Text mb={3}><strong>Date:</strong> {selected.date}</Text>
                <HStack spacing={2} mb={4} wrap="wrap">
                  {selected.tags.map(t => (
                    <Tag key={t} variant="outline" colorScheme="cyan">{t}</Tag>
                  ))}
                </HStack>
                <Button as={Link} href={selected.url} isExternal colorScheme="cyan" rightIcon={<ExternalLinkIcon />}>Verify on W3Schools</Button>
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="outline">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
