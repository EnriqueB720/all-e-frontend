import { useState } from 'react';
import { Heading } from '@chakra-ui/react';

import { Layout, Box, Flex, Form, Text } from '@components';
import { useTranslation } from '@hooks';
import { useSendContactMessageMutation } from '@generated';
import { contactSchema } from '@schemas';
import { FieldProps } from '@types';

interface ContactValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: ContactValues = { name: '', email: '', message: '' };

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
    } catch {}
  };

  return (
    <Layout>
      <Flex direction="column" align="center" mt={10} gap={6}>
        <Heading size="xl" color={{ base: 'gray.900', _dark: 'white' }}>
          {t('contact.title')}
        </Heading>
        <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
          {t('contact.description')}
        </Text>

        <Box w="100%" maxW="500px">
          {sent ? (
            <Text color="#00a884" fontSize="sm" textAlign="center">
              {t('contact.sent')}
            </Text>
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
      </Flex>
    </Layout>
  );
}
