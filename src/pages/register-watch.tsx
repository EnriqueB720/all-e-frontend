import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import * as yup from 'yup';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Form, Button, Text } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useCreateWatchMutation } from '@generated';
import { FieldProps } from '@types';

interface RegisterWatchFormValues {
  serialNum: string;
}

const registerWatchSchema = yup.object().shape({
  serialNum: yup.string().required('Serial number is required'),
});

const initialValues: RegisterWatchFormValues = {
  serialNum: '',
};

export default function RegisterWatch() {
  const { isReady, user } = useRequireAuth();
  const { refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [createWatch, { loading }] = useCreateWatchMutation();
  const [error, setError] = useState<string | undefined>(undefined);

  const fields: FieldProps[] = [
    {
      label: t('watchRegistry.serialNumber'),
      name: 'serialNum',
      inputPlaceholder: '123456',
      isRequired: true,
    },
  ];

  const handleRegister = async (values: RegisterWatchFormValues) => {
    if (!user) return;
    setError(undefined);

    try {
      await createWatch({
        variables: {
          data: {
            ownerId: user.id,
            serialNum: values.serialNum,
            lastSynced: new Date().toISOString(),
          },
        },
      });

      await refreshUserToken();
      router.push('/');
    } catch (err: any) {
      const message = err.message || 'Failed to register watch';
      setError(message);
    }
  };

  if (!isReady) return null;

  return (
    <Layout>
      <Flex justify="center" mt={10}>
        <Box
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="450px"
          boxShadow="xl"
        >
          <Heading as="h1" size="xl" color={{ base: 'gray.900', _dark: 'white' }} mb={6} textAlign="center">
            {t('watchRegistry.title')}
          </Heading>

          {!user?.data.walletAddress ? (
            <Flex direction="column" gap={4} align="center">
              <Text color={{ base: 'orange.600', _dark: 'orange.300' }} textAlign="center">
                {t('watchRegistry.walletRequired')}
              </Text>
              <Button bg="#00a884" color="white" onClick={() => router.push('/')}>
                {t('dashboard.backToDashboard')}
              </Button>
            </Flex>
          ) : (
            <Form<RegisterWatchFormValues>
              fields={fields}
              validationSchema={registerWatchSchema}
              formValues={initialValues}
              isLoading={loading}
              errorMessage={error}
              submitButtonText={t('watchRegistry.form.register')}
              onSubmit={handleRegister}
              groupings={[1]}
            />
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
