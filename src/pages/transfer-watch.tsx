import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading, NativeSelect } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Input, Text } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useChangeWatchOwnershipMutation, useGetUserLazyQuery } from '@generated';

export default function TransferWatch() {
  const { isReady, user } = useRequireAuth();
  const { refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedWatchId, setSelectedWatchId] = useState<string>('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const [changeOwnership, { loading: transferring }] = useChangeWatchOwnershipMutation();
  const [findUser, { loading: findingUser }] = useGetUserLazyQuery();

  if (!isReady || !user) return null;

  const watches = user.watches || [];
  const selectedWatch = watches.find((w) => w.id.toString() === selectedWatchId);

  const handleTransfer = async () => {
    setError('');

    if (!selectedWatch) {
      setError(t('transferWatch.errors.selectWatch'));
      return;
    }

    if (!newOwnerEmail) {
      setError(t('transferWatch.errors.enterNewOwner'));
      return;
    }

    try {
      const { data: userData } = await findUser({
        variables: { where: { email: newOwnerEmail } },
      });

      if (!userData?.user) {
        setError(t('transferWatch.errors.userNotFound'));
        return;
      }

      const newOwner = userData.user;

      await changeOwnership({
        variables: {
          data: {
            id: selectedWatch.id,
            ownerId: newOwner.id,
            serialNum: selectedWatch.serialNum,
            metadataURI: selectedWatch.metadataURI || '',
            lastSynced: new Date().toISOString(),
          },
        },
      });

      await refreshUserToken();
      setShowConfirm(false);
      router.push('/');
    } catch (err: any) {
      setError(err.message || t('transferWatch.errors.transferFailed'));
      setShowConfirm(false);
    }
  };

  return (
    <Layout>
      <Flex justify="center" mt={10}>
        <Box
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="500px"
          boxShadow="xl"
        >
          <Heading as="h1" size="xl" color={{ base: 'gray.900', _dark: 'white' }} mb={6} textAlign="center">
            {t('transferAWatchButton')}
          </Heading>

          <Flex direction="column" gap={4}>
            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('transferWatch.selectAWatch')}
              </Text>
              <NativeSelect.Root>
                <NativeSelect.Field
                  bg={{ base: 'white', _dark: 'gray.700' }}
                  color={{ base: 'gray.900', _dark: 'white' }}
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  value={selectedWatchId}
                  onChange={(e) => setSelectedWatchId(e.target.value)}
                >
                  <option value="">
                    -- {t('transferWatch.selectAWatch')} --
                  </option>
                  {watches.map((watch) => (
                    <option key={watch.id} value={watch.id.toString()}>
                      #{watch.serialNum}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Box>

            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('transferWatch.newOwnerAccount')}
              </Text>
              <Input
                bg={{ base: 'white', _dark: 'gray.700' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                placeholder="newowner@example.com"
                value={newOwnerEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOwnerEmail(e.target.value)}
              />
            </Box>

            {error && (
              <Text color="red.400" fontSize="sm">{error}</Text>
            )}

            {!showConfirm ? (
              <Button
                bg="#00a884"
                color="white"
                loading={findingUser}
                disabled={!selectedWatchId || !newOwnerEmail}
                onClick={() => setShowConfirm(true)}
              >
                {t('transferWatch.form.transfer')}
              </Button>
            ) : (
              <Box bg={{ base: 'gray.100', _dark: 'gray.700' }} p={4} borderRadius="md">
                <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" mb={2}>
                  {t('transferWatch.confirmTransferAction.title')}
                </Text>
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} fontSize="sm" mb={4}>
                  {t('transferWatch.confirmTransferAction.description')}
                </Text>
                <Flex gap={3}>
                  <Button
                    bg="red.500"
                    color="white"
                    loading={transferring}
                    onClick={handleTransfer}
                    flex={1}
                  >
                    {t('transferWatch.confirmTransferAction.accept')}
                  </Button>
                  <Button
                    variant="outline"
                    color={{ base: 'gray.600', _dark: 'gray.300' }}
                    borderColor={{ base: 'gray.400', _dark: 'gray.500' }}
                    onClick={() => setShowConfirm(false)}
                    flex={1}
                  >
                    {t('transferWatch.confirmTransferAction.cancel')}
                  </Button>
                </Flex>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}
