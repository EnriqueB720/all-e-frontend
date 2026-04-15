import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';

import { Layout, Flex, Button, Text, WatchDetailCard, OwnershipHistoryCard } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useGetWatchQuery } from '@generated';
import { Watch as WatchModel } from '@model';

export default function WatchDetail() {
  const { isReady, user } = useRequireAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { serialNum } = router.query;

  const cachedWatch = user?.watches?.find(
    (w) => w.serialNum === (serialNum as string)
  );

  const { data } = useGetWatchQuery({
    variables: { where: { serialNum: serialNum as string } },
    skip: !serialNum,
    fetchPolicy: 'cache-and-network',
  });

  const watch = data?.watch ? new WatchModel(data.watch as any) : cachedWatch;

  if (!isReady || !user || !serialNum) return null;

  if (!watch) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="50vh" gap={4}>
          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="lg">{t('dashboard.watchNotFound')}</Text>
          <Button color="white" className="brand-gradient-bg" onClick={() => router.push('/')}>
            {t('dashboard.backToDashboard')}
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex direction="column" gap={6} className="fade-in-up">
        <Flex justify="space-between" align="center">
          <Heading size="2xl" className="gradient-text" letterSpacing="tight">
            {t('seeAWatch.ownershipOfAWatch')}
          </Heading>
          <Button
            variant="outline"
            color="#00a884"
            borderColor="#00a884"
            onClick={() => router.push('/transfer-watch')}
          >
            {t('transferAWatchButton')}
          </Button>
        </Flex>

        <WatchDetailCard
          watch={watch}
          ownerUsername={user.username}
          isCurrentUserOwner
        />

        <OwnershipHistoryCard entries={data?.watch?.ownershipLog ?? []} />
      </Flex>
    </Layout>
  );
}
