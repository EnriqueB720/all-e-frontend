import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, Link as CKLink } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from '@contexts';
import { Box, Flex, Form } from '@components';
import { useTranslation } from '@hooks';
import { signUpSchema } from '@schemas';
import { SignUpUser } from '@model';
import { FieldProps } from '@types';

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  walletAddress: string;
}

const signUpInitialValues: SignUpFormValues = {
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  walletAddress: '',
};

export default function Signup() {
  const { register, isLoading, isAuthenticated, error, clearError } = useContext(AuthContext);
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
      label: t('register.form.email'),
      name: 'email',
      inputPlaceholder: 'email@example.com',
      isRequired: true,
    },
    {
      label: t('register.form.username'),
      name: 'username',
      inputPlaceholder: 'johndoe',
      isRequired: true,
    },
    {
      label: t('register.form.password'),
      name: 'password',
      inputPlaceholder: '********',
      isRequired: true,
      isPassword: true,
    },
    {
      label: t('register.form.repeatPassword'),
      name: 'repeatPassword',
      inputPlaceholder: '********',
      isRequired: true,
      isPassword: true,
    },
    {
      label: t('register.form.walletAddress'),
      name: 'walletAddress',
      inputPlaceholder: '0x...',
      isRequired: true,
    },
  ];

  const handleSignUp = async (values: SignUpFormValues) => {
    const { repeatPassword, ...signUpData } = values;
    const signUpUser = new SignUpUser(signUpData);
    const success = await register(signUpUser);
    if (success) {
      router.push('/login');
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={{ base: 'gray.50', _dark: 'gray.900' }}
    >
      <Box
        bg={{ base: 'white', _dark: 'gray.800' }}
        p={8}
        borderRadius="xl"
        w="100%"
        maxW="450px"
        boxShadow="xl"
      >
        <NextLink href="/">
          <Text color="#00a884" fontSize="sm" mb={4} cursor="pointer" _hover={{ textDecoration: 'underline' }}>
            &larr; {t('dashboard.backToDashboard')}
          </Text>
        </NextLink>

        <Heading as="h1" size="xl" color={{ base: 'gray.900', _dark: 'white' }} mb={6} textAlign="center">
          {t('register.title')}
        </Heading>

        <Form<SignUpFormValues>
          fields={fields}
          validationSchema={signUpSchema}
          formValues={signUpInitialValues}
          isLoading={isLoading}
          errorMessage={error}
          submitButtonText={t('register.form.submit')}
          onSubmit={handleSignUp}
          groupings={[1, 1, 2, 1]}
        />

        <Text mt={4} textAlign="center" color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
          <CKLink asChild color="#00a884" _hover={{ textDecoration: 'underline' }}>
            <NextLink href="/login">{t('register.alreadyAnAccount')}</NextLink>
          </CKLink>
        </Text>
      </Box>
    </Flex>
  );
}
