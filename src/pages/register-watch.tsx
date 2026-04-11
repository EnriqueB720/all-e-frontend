import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import * as yup from 'yup';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Form } from '@components';
import { useTranslation } from '@hooks';
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
  const { isAuthenticated, user, refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [createWatch, { loading }] = useCreateWatchMutation();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const fields: FieldProps[] = [
    {
      label: t('watchRegistry.serialNumber'),
      name: 'serialNum',
      inputPlaceholder: '123456',
      isRequired: true,
      fieldColor: 'white',
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

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Flex justify="center" mt={10}>
        <Box
          bg="gray.800"
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="450px"
          boxShadow="xl"
        >
          <Heading as="h1" size="xl" color="white" mb={6} textAlign="center">
            {t('watchRegistry.title')}
          </Heading>

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
        </Box>
      </Flex>
    </Layout>
  );
}
