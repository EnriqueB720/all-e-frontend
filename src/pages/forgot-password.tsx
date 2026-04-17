import { useState } from 'react';
import { Heading, Link as CKLink } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Box, Flex, Button, Input, Text } from '@components';
import { useTranslation } from '@hooks';
import { useForgotPasswordMutation } from '@generated';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [forgotPassword, { loading, error }] = useForgotPasswordMutation();

  const handleSubmit = async () => {
    if (!email) return;
    try {
      await forgotPassword({ variables: { data: { email: email.toLowerCase() } } });
      setSent(true);
    } catch {}
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box className="soft-card fade-in-up" bg={{ base: 'white', _dark: 'gray.800' }} p={8} borderRadius="xl" w="100%" maxW="400px" boxShadow="xl">
        <NextLink href="/login">
          <Text color="#00a884" fontSize="sm" mb={4} cursor="pointer" _hover={{ textDecoration: 'underline' }}>
            &larr; {t('login.title')}
          </Text>
        </NextLink>

        <Heading as="h1" size="2xl" mb={6} textAlign="center" className="gradient-text" letterSpacing="tight">
          {t('forgotPassword.title')}
        </Heading>

        {sent ? (
          <Text color={{ base: 'gray.700', _dark: 'gray.300' }} textAlign="center">
            {t('forgotPassword.sent')}
          </Text>
        ) : (
          <Flex direction="column" gap={4}>
            <Input
              bg={{ base: 'white', _dark: 'gray.700' }}
              color={{ base: 'gray.900', _dark: 'white' }}
              borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
              placeholder={t('forgotPassword.form.email')}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Button color="white" className="brand-gradient-bg" loading={loading} onClick={handleSubmit}>
              {t('forgotPassword.form.submit')}
            </Button>
            {error && (
              <Text color="red.400" fontSize="sm" textAlign="center">
                {t('global.error.defaultError.message')}
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
