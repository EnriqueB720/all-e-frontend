import { useState } from 'react';
import { Heading, QrCode, Link, Icon as CKIcon } from '@chakra-ui/react';
import { MdCheckCircle, MdMail } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

import { Layout, Box, Flex, Form, Text } from '@components';
import { useTranslation } from '@hooks';
import { useSendContactMessageMutation } from '@generated';
import { contactSchema } from '@schemas';
import { DictionaryLeaves, FieldProps } from '@types';

const LINKEDIN_URL = 'https://www.linkedin.com/in/enrique-barroso/';
const LINKEDIN_URL_2 = 'https://www.linkedin.com/in/d-andre-wolbrom-highfield-2060321b7/';

interface ContactValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: ContactValues = { name: '', email: '', message: '' };

interface PersonCardProps {
  namePath: DictionaryLeaves;
  rolePath: DictionaryLeaves;
  bioPath: DictionaryLeaves;
  scanPath: DictionaryLeaves;
  linkPath: DictionaryLeaves;
  linkedInUrl: string;
  stagger: 'stagger-2' | 'stagger-3';
}

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [sendContact, { loading, error }] = useSendContactMessageMutation();

  const fields: FieldProps[] = [
    { label: t('contact.form.name'), name: 'name', inputPlaceholder: t('contact.form.name'), isRequired: true },
    { label: t('contact.form.email'), name: 'email', inputPlaceholder: 'email@example.com', isRequired: true },
    { label: t('contact.form.message'), name: 'message', inputPlaceholder: t('contact.form.message'), isRequired: true, isTextarea: true, rows: 6 },
  ];

  const handleSubmit = async (values: ContactValues) => {
    try {
      await sendContact({ variables: { data: values } });
      setSent(true);
    } catch { }
  };

  const cardBg = { base: 'white', _dark: 'gray.800' };
  const cardBorder = { base: 'gray.200', _dark: 'whiteAlpha.200' };
  const mutedText = { base: 'gray.600', _dark: 'gray.400' };

  const PersonCard = ({ namePath, rolePath, bioPath, scanPath, linkPath, linkedInUrl, stagger }: PersonCardProps) => (
    <Box
      className={`soft-card fade-in-up ${stagger}`}
      w={{ base: '100%', md: '320px' }}
      bg={cardBg}
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius="xl"
      p={6}
      boxShadow="sm"
    >
      <Flex direction="column" gap={4} align="center" textAlign="center">
        <Flex
          w="56px"
          h="56px"
          borderRadius="full"
          bg="#00a88422"
          align="center"
          justify="center"
        >
          <CKIcon boxSize={7} color="#00a884">
            <MdMail />
          </CKIcon>
        </Flex>

        <Flex direction="column" gap={1}>
          <Heading size="md" color={{ base: 'gray.900', _dark: 'white' }}>
            {t(namePath)}
          </Heading>
          <Text fontSize="sm" color="#00a884" fontWeight="medium">
            {t(rolePath)}
          </Text>
        </Flex>

        <Text fontSize="sm" color={mutedText}>
          {t(bioPath)}
        </Text>

        <Box pt={2}>
          <QrCode.Root value={linkedInUrl} encoding={{ ecc: 'H' }} size="md">
            <QrCode.Frame>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        </Box>

        <Text fontSize="xs" color={mutedText}>
          {t(scanPath)}
        </Text>

        <Link
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="#00a884"
          fontSize="sm"
          fontWeight="medium"
          display="inline-flex"
          alignItems="center"
          gap={2}
        >
          <CKIcon boxSize={4}>
            <FaLinkedin />
          </CKIcon>
          {t(linkPath)}
        </Link>
      </Flex>
    </Box>
  );

  return (
    <Layout>
      <Flex direction="column" align="center" mt={10} mb={16} gap={8} px={4}>
        <Flex direction="column" align="center" gap={2} className="fade-in-up">
          <Heading size="3xl" className="gradient-text" letterSpacing="tight">
            {t('contact.title')}
          </Heading>
          <Text color={mutedText}>
            {t('contact.description')}
          </Text>
        </Flex>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={6}
          w="100%"
          maxW="1200px"
          align="stretch"
          justify="center"
          wrap="wrap"
        >
          <Box
            className="soft-card fade-in-up stagger-1"
            flex="1"
            minW={{ base: '100%', md: '360px' }}
            bg={cardBg}
            borderWidth="1px"
            borderColor={cardBorder}
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
            boxShadow="sm"
          >
            {sent ? (
              <Flex direction="column" align="center" justify="center" gap={4} py={10}>
                <CKIcon boxSize={16} color="#00a884">
                  <MdCheckCircle />
                </CKIcon>
                <Heading size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
                  {t('contact.sentTitle')}
                </Heading>
                <Text color={mutedText} textAlign="center">
                  {t('contact.sent')}
                </Text>
              </Flex>
            ) : (
              <Form<ContactValues>
                fields={fields}
                validationSchema={contactSchema}
                formValues={initialValues}
                isLoading={loading}
                errorMessage={error ? t('contact.error') : undefined}
                submitButtonText={t('contact.form.submit')}
                onSubmit={handleSubmit}
                groupings={[1, 1, 1]}
              />
            )}
          </Box>

          <PersonCard
            namePath="contact.creator.name"
            rolePath="contact.creator.role"
            bioPath="contact.creator.bio"
            scanPath="contact.creator.scanToConnect"
            linkPath="contact.creator.openLinkedIn"
            linkedInUrl={LINKEDIN_URL}
            stagger="stagger-2"
          />
          <PersonCard
            namePath="contact.contributor.name"
            rolePath="contact.contributor.role"
            bioPath="contact.contributor.bio"
            scanPath="contact.contributor.scanToConnect"
            linkPath="contact.contributor.openLinkedIn"
            linkedInUrl={LINKEDIN_URL_2}
            stagger="stagger-3"
          />
        </Flex>
      </Flex>
    </Layout>
  );
}
