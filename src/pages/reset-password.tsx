import { useState } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';

import { Box, Flex, Button, Input, Text } from '@components';
import { useTranslation } from '@hooks';
import { useResetPasswordMutation } from '@generated';

export default function ResetPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  const [resetPassword, { loading, error }] = useResetPasswordMutation();

  const handleSubmit = async () => {
    if (!newPassword || newPassword !== confirm) {
      setMismatch(true);
      return;
    }
    setMismatch(false);
    try {
      await resetPassword({ variables: { data: { token, newPassword } } });
      setDone(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch {}
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box className="soft-card fade-in-up" bg={{ base: 'white', _dark: 'gray.800' }} p={8} borderRadius="xl" w="100%" maxW="400px" boxShadow="xl">
        <Heading as="h1" size="2xl" mb={6} textAlign="center" className="gradient-text" letterSpacing="tight">
          {t('resetPassword.title')}
        </Heading>

        {!token ? (
          <Text color="red.400" textAlign="center">{t('resetPassword.invalidToken')}</Text>
        ) : done ? (
          <Text color={{ base: 'gray.700', _dark: 'gray.300' }} textAlign="center">
            {t('resetPassword.success')}
          </Text>
        ) : (
          <Flex direction="column" gap={4}>
            <Input
              type="password"
              bg={{ base: 'white', _dark: 'gray.700' }}
              color={{ base: 'gray.900', _dark: 'white' }}
              borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
              placeholder={t('forgotPassword.form.newPassword')}
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              bg={{ base: 'white', _dark: 'gray.700' }}
              color={{ base: 'gray.900', _dark: 'white' }}
              borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
              placeholder={t('forgotPassword.form.repeatNewPassword')}
              value={confirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
            />
            <Button color="white" className="brand-gradient-bg" loading={loading} onClick={handleSubmit}>
              {t('resetPassword.submit')}
            </Button>
            {mismatch && (
              <Text color="red.400" fontSize="sm" textAlign="center">
                {t('global.error.invalidConfirmPassword')}
              </Text>
            )}
            {error && (
              <Text color="red.400" fontSize="sm" textAlign="center">
                {t('resetPassword.invalidToken')}
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
