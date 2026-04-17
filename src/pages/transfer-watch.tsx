import { useContext, useState } from 'react';
import {
  Heading,
  NativeSelect,
  Badge,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  DialogBackdrop,
  DialogPositioner,
} from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Input, Text } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import {
  useCreateTransferRequestMutation,
  useRespondToTransferRequestMutation,
  usePendingTransferRequestsQuery,
  useSentTransferRequestsQuery,
} from '@generated';
import { toaster } from '@/components/ui/toaster';

export default function TransferWatch() {
  const { isReady, user } = useRequireAuth();
  const { refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();

  const [selectedWatchId, setSelectedWatchId] = useState<string>('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [respondingId, setRespondingId] = useState<number | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: number; accept: boolean } | null>(null);

  const [createTransfer, { loading: creating }] = useCreateTransferRequestMutation();
  const [respondTransfer] = useRespondToTransferRequestMutation();

  const { data: pendingData, refetch: refetchPending } = usePendingTransferRequestsQuery({
    variables: { userId: user?.id ?? 0 },
    skip: !user,
    fetchPolicy: 'network-only',
  });

  const { data: sentData, refetch: refetchSent } = useSentTransferRequestsQuery({
    variables: { userId: user?.id ?? 0 },
    skip: !user,
    fetchPolicy: 'network-only',
  });

  if (!isReady || !user) return null;

  const watches = user.watches || [];
  const pendingRequests = pendingData?.pendingTransferRequests ?? [];
  const sentRequests = sentData?.sentTransferRequests ?? [];

  const handleSendRequest = async () => {
    setError('');
    setSuccess('');

    if (!selectedWatchId || !newOwnerEmail) {
      setError(t('transferWatch.errors.selectWatch'));
      return;
    }

    try {
      await createTransfer({
        variables: {
          data: {
            watchId: parseInt(selectedWatchId, 10),
            fromUserId: user.id,
            toUserEmail: newOwnerEmail.toLowerCase(),
          },
        },
      });
      setSuccess(t('transferWatch.requestSent'));
      setSelectedWatchId('');
      setNewOwnerEmail('');
      toaster.create({
        title: t('transferWatch.requestSent'),
        type: 'success',
      });
      refetchSent();
    } catch (err: any) {
      setError(err.message || t('transferWatch.errors.transferFailed'));
    }
  };

  const handleRespond = async (transferRequestId: number, accept: boolean) => {
    setConfirmAction(null);
    setRespondingId(transferRequestId);
    try {
      await respondTransfer({
        variables: {
          data: {
            transferRequestId,
            userId: user.id,
            accept,
          },
        },
      });
      if (accept) await refreshUserToken();
      toaster.create({
        title: accept ? t('notifications.transferAccepted') : t('notifications.transferRejected'),
        type: accept ? 'success' : 'info',
      });
      refetchPending();
      refetchSent();
    } catch (err: any) {
      setError(err.message || t('transferWatch.errors.transferFailed'));
    } finally {
      setRespondingId(null);
    }
  };

  const statusColor: Record<string, string> = {
    PENDING: 'yellow',
    ACCEPTED: 'green',
    REJECTED: 'red',
  };

  return (
    <Layout>
      <Flex direction="column" gap={6} maxW="600px" mx="auto" mt={10}>
        <Box
          className="soft-card fade-in-up"
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
        >
          <Heading as="h1" size="2xl" mb={6} textAlign="center" className="gradient-text" letterSpacing="tight">
            {t('transferWatch.sendRequest')}
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
                  <option value="">-- {t('transferWatch.selectAWatch')} --</option>
                  {watches.map((watch) => (
                    <option key={watch.id} value={watch.id.toString()}>
                      #{watch.serialNum} {watch.data.brand ? `- ${watch.data.brand}` : ''}
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

            {error && <Text color="red.400" fontSize="sm">{error}</Text>}
            {success && <Text color="green.400" fontSize="sm">{success}</Text>}

            <Button
              color="white"
              className="brand-gradient-bg"
              loading={creating}
              disabled={!selectedWatchId || !newOwnerEmail}
              onClick={handleSendRequest}
            >
              {t('transferWatch.form.sendRequest')}
            </Button>
          </Flex>
        </Box>

        {pendingRequests.length > 0 && (
          <Box
            className="soft-card fade-in-up stagger-2"
            bg={{ base: 'white', _dark: 'gray.800' }}
            p={6}
            borderRadius="xl"
            boxShadow="xl"
          >
            <Heading size="lg" mb={4} className="gradient-text">
              {t('transferWatch.incomingRequests')}
            </Heading>
            <Flex direction="column" gap={4}>
              {pendingRequests.map((req) => (
                <Box key={req.id} p={4} bg={{ base: 'gray.50', _dark: 'gray.700' }} borderRadius="md">
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold">
                      #{req.watch?.serialNum} {req.watch?.brand ? `- ${req.watch.brand}` : ''}
                    </Text>
                    <Badge colorPalette={statusColor[req.status]}>{req.status}</Badge>
                  </Flex>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm" mb={3}>
                    {t('transferWatch.from')}: {req.fromUser?.username} ({req.fromUser?.email})
                  </Text>
                  <Flex gap={3}>
                    <Button
                      size="sm"
                      color="white"
                      className="brand-gradient-bg"
                      loading={respondingId === req.id}
                      disabled={respondingId !== null && respondingId !== req.id}
                      onClick={() => setConfirmAction({ id: req.id, accept: true })}
                      flex={1}
                    >
                      {t('transferWatch.accept')}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="red.400"
                      borderColor="red.400"
                      loading={respondingId === req.id}
                      disabled={respondingId !== null && respondingId !== req.id}
                      onClick={() => setConfirmAction({ id: req.id, accept: false })}
                      flex={1}
                    >
                      {t('transferWatch.reject')}
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        {sentRequests.length > 0 && (
          <Box
            className="soft-card fade-in-up stagger-3"
            bg={{ base: 'white', _dark: 'gray.800' }}
            p={6}
            borderRadius="xl"
            boxShadow="xl"
          >
            <Heading size="lg" mb={4} className="gradient-text">
              {t('transferWatch.sentRequests')}
            </Heading>
            <Flex direction="column" gap={3}>
              {sentRequests.map((req) => (
                <Box key={req.id} p={4} bg={{ base: 'gray.50', _dark: 'gray.700' }} borderRadius="md">
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="sm">
                        #{req.watch?.serialNum}
                      </Text>
                      <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs">
                        {t('transferWatch.to')}: {req.toUser?.username}
                      </Text>
                    </Flex>
                    <Badge colorPalette={statusColor[req.status]}>{req.status}</Badge>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </Flex>

      <DialogRoot
        open={confirmAction !== null}
        onOpenChange={(e) => { if (!e.open) setConfirmAction(null); }}
      >
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="xl" p={2}>
            <DialogHeader>
              <DialogTitle color={{ base: 'gray.900', _dark: 'white' }}>
                {confirmAction?.accept
                  ? t('transferWatch.confirmTransferAction.accept')
                  : t('transferWatch.confirmTransferAction.cancel')}
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text color={{ base: 'gray.600', _dark: 'gray.300' }} fontSize="sm">
                {confirmAction?.accept
                  ? t('transferWatch.confirmTransferAction.description')
                  : t('transferWatch.confirmReject')}
              </Text>
            </DialogBody>
            <DialogFooter>
              <Flex gap={3} w="100%">
                <Button
                  flex={1}
                  variant="outline"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  onClick={() => setConfirmAction(null)}
                >
                  {t('transferWatch.confirmTransferAction.cancel')}
                </Button>
                <Button
                  flex={1}
                  color="white"
                  className={confirmAction?.accept ? 'brand-gradient-bg' : ''}
                  bg={confirmAction?.accept ? undefined : 'red.500'}
                  _hover={confirmAction?.accept ? undefined : { bg: 'red.600' }}
                  onClick={() => {
                    if (confirmAction) handleRespond(confirmAction.id, confirmAction.accept);
                  }}
                >
                  {confirmAction?.accept
                    ? t('transferWatch.confirmTransferAction.accept')
                    : t('transferWatch.reject')}
                </Button>
              </Flex>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Layout>
  );
}
