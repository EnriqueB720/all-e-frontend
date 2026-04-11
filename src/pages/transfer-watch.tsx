import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, NativeSelect } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Input } from '@components';
import { useTranslation } from '@hooks';
import { useChangeWatchOwnershipMutation, useGetUserLazyQuery } from '@generated';

export default function TransferWatch() {
  const { isAuthenticated, user, refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedWatchId, setSelectedWatchId] = useState<string>('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const [changeOwnership, { loading: transferring }] = useChangeWatchOwnershipMutation();
  const [findUser, { loading: findingUser }] = useGetUserLazyQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

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
          bg="gray.800"
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="500px"
          boxShadow="xl"
        >
          <Heading as="h1" size="xl" color="white" mb={6} textAlign="center">
            {t('transferAWatchButton')}
          </Heading>

          <Flex direction="column" gap={4}>
            <Box>
              <Text color="white" mb={2} fontSize="sm" fontWeight="medium">
                {t('transferWatch.selectAWatch')}
              </Text>
              <NativeSelect.Root>
                <NativeSelect.Field
                  bg="gray.700"
                  color="white"
                  borderColor="gray.600"
                  value={selectedWatchId}
                  onChange={(e) => setSelectedWatchId(e.target.value)}
                >
                  <option value="" style={{ background: '#2D3748' }}>
                    -- {t('transferWatch.selectAWatch')} --
                  </option>
                  {watches.map((watch) => (
                    <option key={watch.id} value={watch.id.toString()} style={{ background: '#2D3748' }}>
                      #{watch.serialNum}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Box>

            <Box>
              <Text color="white" mb={2} fontSize="sm" fontWeight="medium">
                {t('transferWatch.newOwnerAccount')}
              </Text>
              <Input
                bg="gray.700"
                color="white"
                borderColor="gray.600"
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
              <Box bg="gray.700" p={4} borderRadius="md">
                <Text color="white" fontWeight="bold" mb={2}>
                  {t('transferWatch.confirmTransferAction.title')}
                </Text>
                <Text color="gray.300" fontSize="sm" mb={4}>
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
                    color="gray.300"
                    borderColor="gray.500"
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
