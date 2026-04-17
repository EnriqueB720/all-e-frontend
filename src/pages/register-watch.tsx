import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import * as yup from 'yup';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Form } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useCreateWatchMutation } from '@generated';
import { FieldProps } from '@types';

interface RegisterWatchFormValues {
  serialNum: string;
  brand: string;
  model: string;
  referenceNumber: string;
  yearOfProduction: string;
  imageUrl: string;
}

const registerWatchSchema = yup.object().shape({
  serialNum: yup.string().required('Serial number is required'),
  brand: yup.string(),
  model: yup.string(),
  referenceNumber: yup.string(),
  yearOfProduction: yup.string().matches(/^\d{4}$/, 'Must be a valid year').nullable(),
  imageUrl: yup.string().url('Must be a valid URL'),
});

const initialValues: RegisterWatchFormValues = {
  serialNum: '',
  brand: '',
  model: '',
  referenceNumber: '',
  yearOfProduction: '',
  imageUrl: '',
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
    {
      label: t('watchRegistry.brand'),
      name: 'brand',
      inputPlaceholder: 'Rolex, Omega, Seiko...',
    },
    {
      label: t('watchRegistry.model'),
      name: 'model',
      inputPlaceholder: 'Submariner, Speedmaster...',
    },
    {
      label: t('watchRegistry.referenceNumber'),
      name: 'referenceNumber',
      inputPlaceholder: '126610LN',
    },
    {
      label: t('watchRegistry.yearOfProduction'),
      name: 'yearOfProduction',
      inputPlaceholder: '2024',
    },
    {
      label: t('watchRegistry.imageUrl'),
      name: 'imageUrl',
      inputPlaceholder: 'https://...',
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
            brand: values.brand || undefined,
            model: values.model || undefined,
            referenceNumber: values.referenceNumber || undefined,
            yearOfProduction: values.yearOfProduction ? parseInt(values.yearOfProduction, 10) : undefined,
            imageUrl: values.imageUrl || undefined,
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
          className="soft-card fade-in-up"
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="450px"
          boxShadow="xl"
        >
          <Heading as="h1" size="2xl" mb={6} textAlign="center" className="gradient-text" letterSpacing="tight">
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
            groupings={[1, 2, 2, 1]}
          />
        </Box>
      </Flex>
    </Layout>
  );
}
