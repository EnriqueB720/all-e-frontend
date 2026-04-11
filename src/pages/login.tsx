import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, Link as CKLink } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from '@contexts';
import { Box, Flex, Form } from '@components';
import { useTranslation } from '@hooks';
import { loginSchema } from '@schemas';
import { AuthCredentials, ICredentials } from '@model';
import { FieldProps } from '@types';

const loginInitialValues: ICredentials = {
  email: '',
  password: '',
};

export default function Login() {
  const { login, isLoading, isAuthenticated, error, clearError } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    clearError();
  }, []);

  const fields: FieldProps[] = [
    {
      label: t('login.form.email'),
      name: 'email',
      inputPlaceholder: 'email@example.com',
      isRequired: true,
      fieldColor: 'white',
    },
    {
      label: t('login.form.password'),
      name: 'password',
      inputPlaceholder: '********',
      isRequired: true,
      isPassword: true,
      fieldColor: 'white',
    },
  ];

  const handleLogin = async (values: ICredentials) => {
    const credentials = new AuthCredentials(values);
    const success = await login(credentials);
    if (success) {
      router.push('/');
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.900"
    >
      <Box
        bg="gray.800"
        p={8}
        borderRadius="xl"
        w="100%"
        maxW="400px"
        boxShadow="xl"
      >
        <NextLink href="/">
          <Text color="#00a884" fontSize="sm" mb={4} cursor="pointer" _hover={{ textDecoration: 'underline' }}>
            &larr; {t('dashboard.backToDashboard')}
          </Text>
        </NextLink>

        <Heading as="h1" size="xl" color="white" mb={6} textAlign="center">
          {t('login.title')}
        </Heading>

        <Form<ICredentials>
          fields={fields}
          validationSchema={loginSchema}
          formValues={loginInitialValues}
          isLoading={isLoading}
          errorMessage={error}
          submitButtonText={t('login.form.submit')}
          onSubmit={handleLogin}
          groupings={[1, 1]}
        />

        <Text mt={4} textAlign="center" color="gray.400" fontSize="sm">
          <CKLink asChild color="#00a884" _hover={{ textDecoration: 'underline' }}>
            <NextLink href="/signup">{t('login.noAccount')}</NextLink>
          </CKLink>
        </Text>
      </Box>
    </Flex>
  );
}
