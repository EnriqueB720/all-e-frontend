import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, Badge, Separator } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button } from '@components';
import { useTranslation } from '@hooks';

export default function WatchDetail() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const { serialNum } = router.query;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user || !serialNum) return null;

  const watch = user.watches?.find(
    (w) => w.serialNum === (serialNum as string)
  );

  if (!watch) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="50vh" gap={4}>
          <Text color="gray.500" fontSize="lg">{t('dashboard.watchNotFound')}</Text>
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
          <Heading size="lg" color="white">
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

        <Box bg="gray.800" p={6} borderRadius="lg">
          <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
              <Text color="gray.400" fontSize="sm">{t('seeAWatch.serialNumber')}</Text>
              <Text color="white" fontWeight="bold" fontSize="xl">#{watch.serialNum}</Text>
            </Flex>

            <Separator borderColor="gray.700" />

            <Flex justify="space-between" align="center">
              <Text color="gray.400" fontSize="sm">{t('seeAWatch.currentOwner')}</Text>
              <Flex align="center" gap={2}>
                <Text color="white">{user.username}</Text>
                <Badge colorPalette="green">You</Badge>
              </Flex>
            </Flex>

            <Separator borderColor="gray.700" />

            <Flex justify="space-between" align="center">
              <Text color="gray.400" fontSize="sm">{t('ownershipHistory.walletAddress')}</Text>
              <Text color="gray.300" fontSize="sm" fontFamily="mono">
                {user.data.walletAddress}
              </Text>
            </Flex>

            {watch.metadataURI && (
              <>
                <Separator borderColor="gray.700" />
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="sm">{t('dashboard.metadataURI')}</Text>
                  <Text color="gray.300" fontSize="sm" fontFamily="mono" truncate maxW="300px">
                    {watch.metadataURI}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        </Box>

        <Box bg="gray.800" p={6} borderRadius="lg">
          <Heading size="md" color="white" mb={4}>
            {t('ownershipHistory.title')}
          </Heading>

          <Text color="gray.500" fontSize="sm">
            {t('dashboard.ownershipHistoryPlaceholder')}
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
}
