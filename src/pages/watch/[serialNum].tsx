import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Badge, Separator, Link } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Text } from '@components';
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
          <Button
            variant="outline"
            color="#00a884"
            borderColor="#00a884"
            onClick={() => router.push('/transfer-watch')}
          >
            {t('transferAWatchButton')}
          </Button>
        </Flex>

        <Box bg={{ base: 'white', _dark: 'gray.800' }} p={6} borderRadius="lg" boxShadow={{ base: 'sm', _dark: 'none' }}>
          <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('seeAWatch.serialNumber')}</Text>
              <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="xl">#{watch.serialNum}</Text>
            </Flex>

            <Separator borderColor={{ base: 'gray.200', _dark: 'gray.700' }} />

            <Flex justify="space-between" align="center">
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('seeAWatch.currentOwner')}</Text>
              <Flex align="center" gap={2}>
                <Text color={{ base: 'gray.900', _dark: 'white' }}>{user.username}</Text>
                <Badge colorPalette="green">You</Badge>
              </Flex>
            </Flex>

           

            {user.data.walletAddress && (
              <>
                <Separator borderColor={{ base: 'gray.200', _dark: 'gray.700' }} />
                <Flex justify="space-between" align="center">
                  <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('ownershipHistory.walletAddress')}</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.300' }} fontSize="sm" fontFamily="mono">
                    {user.data.walletAddress}
                  </Text>
                </Flex>
              </>
            )}

            {watch.certificateUrl && (
              <>
                <Separator borderColor={{ base: 'gray.200', _dark: 'gray.700' }} />
                <Flex justify="space-between" align="center">
                  <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('seeAWatch.ipfsCertificate')}</Text>
                  <Link
                    href={watch.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="#00a884"
                    fontWeight="bold"
                    fontSize="sm"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {t('seeAWatch.viewOnIpfs')}
                  </Link>
                </Flex>
              </>
            )}
          </Flex>
        </Box>

        <Box bg={{ base: 'white', _dark: 'gray.800' }} p={6} borderRadius="lg" boxShadow={{ base: 'sm', _dark: 'none' }}>
          <Heading size="md" color={{ base: 'gray.900', _dark: 'white' }} mb={4}>
            {t('ownershipHistory.title')}
          </Heading>

          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="sm">
            {t('dashboard.ownershipHistoryPlaceholder')}
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
}
