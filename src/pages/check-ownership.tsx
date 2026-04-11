import { useState } from 'react';
import { Heading, Text, Separator } from '@chakra-ui/react';

import { Layout, Box, Flex, Button, Input } from '@components';
import { useTranslation } from '@hooks';
import { useGetWatchLazyQuery } from '@generated';

export default function CheckOwnership() {
  const { t } = useTranslation();
  const [serialNum, setSerialNum] = useState('');
  const [getWatch, { data, loading, error }] = useGetWatchLazyQuery();

  const handleCheck = async () => {
    if (!serialNum) return;

    await getWatch({
      variables: {
        where: {
          id: 0,
          ownerId: 0,
          serialNum: serialNum,
        },
      },
    });
  };

  const watch = data?.watch;

  return (
    <Layout>
      <Flex direction="column" align="center" mt={10} gap={6}>
        <Heading size="xl" color="white">
          {t('checkAWatchOwnership.title')}
        </Heading>
        <Text color="gray.400">
          {t('checkAWatchOwnership.description')}
        </Text>

        <Flex gap={3} w="100%" maxW="500px">
          <Input
            bg="gray.700"
            color="white"
            borderColor="gray.600"
            placeholder={t('checkAWatchOwnership.serialNumber')}
            value={serialNum}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSerialNum(e.target.value)}
            flex={1}
          />
          <Button
            bg="#00a884"
            color="white"
            loading={loading}
            onClick={handleCheck}
          >
            {t('checkAWatchOwnership.check')}
          </Button>
        </Flex>

        {error && (
          <Text color="red.400" fontSize="sm">
            {t('dashboard.lookupError')}
          </Text>
        )}

        {watch && (
          <Box bg="gray.800" p={6} borderRadius="lg" w="100%" maxW="500px">
            <Flex direction="column" gap={4}>
              <Flex justify="space-between">
                <Text color="gray.400" fontSize="sm">{t('checkAWatchOwnership.serialNumber')}</Text>
                <Text color="white" fontWeight="bold">#{watch.serialNum}</Text>
              </Flex>

              <Separator borderColor="gray.700" />

              <Flex justify="space-between">
                <Text color="gray.400" fontSize="sm">{t('checkAWatchOwnership.result.username')}</Text>
                <Text color="white">{watch.user?.username}</Text>
              </Flex>

              <Separator borderColor="gray.700" />

              <Flex justify="space-between">
                <Text color="gray.400" fontSize="sm">{t('checkAWatchOwnership.result.walletOwner')}</Text>
                <Text color="gray.300" fontSize="sm" fontFamily="mono">
                  {watch.user?.walletAddress}
                </Text>
              </Flex>

              {watch.ownershipLog && watch.ownershipLog.length > 0 && (
                <>
                  <Separator borderColor="gray.700" />
                  <Text color="gray.400" fontSize="sm">{t('checkAWatchOwnership.result.ownerSince')}</Text>
                  <Text color="white" fontSize="sm">
                    {new Date(watch.ownershipLog[watch.ownershipLog.length - 1].timestamp).toLocaleDateString()}
                  </Text>
                </>
              )}
            </Flex>
          </Box>
        )}
      </Flex>
    </Layout>
  );
}
