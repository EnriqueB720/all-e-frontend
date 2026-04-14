import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';

import { Layout, Flex, Button, Text, WatchDetailCard, OwnershipHistoryCard } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useGetWatchQuery, useRetryMintMutation, MintStatus } from '@generated';
import { Watch as WatchModel } from '@model';

export default function WatchDetail() {
  const { isReady, user } = useRequireAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { serialNum } = router.query;

  const cachedWatch = user?.watches?.find(
    (w) => w.serialNum === (serialNum as string)
  );

  const { data, startPolling, stopPolling } = useGetWatchQuery({
    variables: { where: { serialNum: serialNum as string } },
    skip: !serialNum,
    fetchPolicy: 'cache-and-network',
  });

  const watch = data?.watch ? new WatchModel(data.watch) : cachedWatch;

  const [retryMint, { loading: retrying }] = useRetryMintMutation();

  const handleRetry = async () => {
    if (!watch?.id) return;
    try {
      await retryMint({ variables: { watchId: watch.id } });
      startPolling(4000);
    } catch (err) {
      console.error('Retry failed', err);
    }
  };

  useEffect(() => {
    if (watch?.mintStatus === MintStatus.Pending) {
      startPolling(4000);
    } else {
      stopPolling();
    }
    return () => stopPolling();
  }, [watch?.mintStatus, startPolling, stopPolling]);

  if (!isReady || !user || !serialNum) return null;

  if (!watch) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="50vh" gap={4}>
          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="lg">{t('dashboard.watchNotFound')}</Text>
          <Button bg="#00a884" color="white" onClick={() => router.push('/')}>
            {t('dashboard.backToDashboard')}
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex direction="column" gap={6}>
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
            {t('seeAWatch.ownershipOfAWatch')}
          </Heading>
          <Flex gap={3}>
            {watch.mintStatus === MintStatus.Failed && (
              <Button
                bg="#e53e3e"
                color="white"
                onClick={handleRetry}
                disabled={retrying}
              >
                {retrying ? t('mintStatus.retrying') : t('mintStatus.retry')}
              </Button>
            )}
            <Button
              variant="outline"
              color="#00a884"
              borderColor="#00a884"
              onClick={() => router.push('/transfer-watch')}
            >
              {t('transferAWatchButton')}
            </Button>
          </Flex>
        </Flex>

        <WatchDetailCard
          watch={watch}
          ownerUsername={user.username}
          ownerWalletAddress={user.data.walletAddress}
          isCurrentUserOwner
        />

        <OwnershipHistoryCard entries={data?.watch?.ownershipLog ?? []} />
      </Flex>
    </Layout>
  );
}
