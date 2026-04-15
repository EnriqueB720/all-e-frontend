import { useState } from 'react';
import { Heading, Separator, Link } from '@chakra-ui/react';

import { Layout, Box, Flex, Button, Input, CopyableText, Text, DetailRow, ExternalLink } from '@components';
import { useTranslation } from '@hooks';
import { useGetWatchLazyQuery, useGetWatchesLazyQuery } from '@generated';

type SearchType = 'serialNum' | 'username';

export default function CheckOwnership() {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState<SearchType>('serialNum');
  const [searchValue, setSearchValue] = useState('');

  const [getWatch, { data: singleData, loading: singleLoading, error: singleError }] =
    useGetWatchLazyQuery({ fetchPolicy: 'network-only' });
  const [getWatches, { data: multiData, loading: multiLoading, error: multiError }] =
    useGetWatchesLazyQuery({ fetchPolicy: 'network-only' });

  const loading = singleLoading || multiLoading;
  const error = singleError || multiError;

  const handleCheck = async () => {
    if (!searchValue) return;

    if (searchType === 'serialNum') {
      await getWatch({
        variables: { where: { serialNum: searchValue } },
      });
    } else {
      await getWatches({
        variables: { where: { [searchType]: searchValue } },
      });
    }
  };

  const singleWatch = singleData?.watch;
  const multiWatches = multiData?.watches;

  const showSingle = searchType === 'serialNum' && singleWatch;
  const showMulti = searchType !== 'serialNum' && multiWatches && multiWatches.length > 0;
  const showNoResults =
    searchType !== 'serialNum' && multiData && (!multiWatches || multiWatches.length === 0);

  const placeholderMap: Record<SearchType, string> = {
    serialNum: t('checkAWatchOwnership.serialNumber'),
    username: t('checkAWatchOwnership.searchBy.usernamePlaceholder'),
  };

  const renderWatchCard = (watch: any) => (
    <Box key={watch.id} className="soft-card fade-in-up" bg={{ base: 'white', _dark: 'gray.800' }} p={6} borderRadius="lg" w="100%" maxW="500px" boxShadow={{ base: 'sm', _dark: 'none' }}>
      <Flex direction="column" gap={4}>
        <Flex justify="space-between">
          <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
            {t('checkAWatchOwnership.serialNumber')}
          </Text>
          <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold">#{watch.serialNum}</Text>
        </Flex>

        <Separator borderColor={{ base: 'gray.300', _dark: 'gray.700' }} />

        <Flex justify="space-between">
          <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
            {t('checkAWatchOwnership.result.username')}
          </Text>
          <Text color={{ base: 'gray.900', _dark: 'white' }}>{watch.user?.username ?? '—'}</Text>
        </Flex>

        <Separator borderColor={{ base: 'gray.300', _dark: 'gray.700' }} />

        <Flex justify="space-between">
          <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
            {t('checkAWatchOwnership.result.email')}
          </Text>
          {watch.user?.email ? (
            <CopyableText value={watch.user.email} />
          ) : (
            <Text color={{ base: 'gray.900', _dark: 'white' }}>—</Text>
          )}
        </Flex>

        {watch.ownershipLog && watch.ownershipLog.length > 0 && (
          <>
            <Separator borderColor={{ base: 'gray.300', _dark: 'gray.700' }} />
            <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
              {t('checkAWatchOwnership.result.ownerSince')}
            </Text>
            <Text color={{ base: 'gray.900', _dark: 'white' }} fontSize="sm">
              {new Date(watch.ownershipLog[watch.ownershipLog.length - 1].timestamp).toLocaleDateString()}
            </Text>
          </>
        )}

        {watch.certificateUrl && (
          <>
            <Separator borderColor={{ base: 'gray.300', _dark: 'gray.700' }} />
            <Flex justify="space-between" align="center">
              <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
                {t('seeAWatch.ipfsCertificate')}
              </Text>
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
  );

  return (
    <Layout>
      <Flex direction="column" align="center" mt={10} gap={6} className="fade-in-up">
        <Heading size="3xl" className="gradient-text" letterSpacing="tight" textAlign="center">
          {t('checkAWatchOwnership.title')}
        </Heading>
        <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
          {t('checkAWatchOwnership.description')}
        </Text>

        <Flex gap={2} w="100%" maxW="500px" justify="center">
          {(['serialNum', 'username'] as SearchType[]).map((type) => (
            <Button
              key={type}
              size="sm"
              variant={searchType === type ? 'solid' : 'outline'}
              bg={searchType === type ? '#00a884' : 'transparent'}
              color={searchType === type ? 'white' : '#00a884'}
              borderColor="#00a884"
              onClick={() => {
                setSearchType(type);
                setSearchValue('');
              }}
            >
              {t(`checkAWatchOwnership.searchBy.${type}`)}
            </Button>
          ))}
        </Flex>

        <Flex gap={3} w="100%" maxW="500px">
          <Input
            bg={{ base: 'white', _dark: 'gray.700' }}
            color={{ base: 'gray.900', _dark: 'white' }}
            borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
            placeholder={placeholderMap[searchType]}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && searchValue && !loading) {
                handleCheck();
              }
            }}
            flex={1}
          />
          <Button
            color="white"
            className="brand-gradient-bg"
            loading={loading}
            onClick={handleCheck}
            px={6}
          >
            {t('checkAWatchOwnership.check')}
          </Button>
        </Flex>

        {error && (
          <Text color="red.400" fontSize="sm">
            {t('dashboard.lookupError')}
          </Text>
        )}

        {showSingle && renderWatchCard(singleWatch)}

        {showMulti && (
          <Flex direction="column" gap={4} align="center" w="100%">
            <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
              {multiWatches.length} {multiWatches.length === 1
                ? t('checkAWatchOwnership.result.watchFound')
                : t('checkAWatchOwnership.result.watchesFound')}
            </Text>
            {multiWatches.map(renderWatchCard)}
          </Flex>
        )}

        {showNoResults && (
          <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
            {t('dashboard.watchNotFound')}
          </Text>
        )}
      </Flex>
    </Layout>
  );
}
