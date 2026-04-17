import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Heading, SimpleGrid, Badge, NativeSelect } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Input, Text } from '@components';
import { useTranslation } from '@hooks';

export default function Home() {
  const { isAuthenticated, isInitializing, user } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

  const watches = user?.watches || [];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'serial'>('newest');

  const filteredWatches = useMemo(() => {
    let result = [...watches];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((w) => {
        const serial = (w.serialNum ?? '').toLowerCase();
        const brand = (w.data.brand ?? '').toLowerCase();
        const model = (w.data.model ?? '').toLowerCase();
        const ref = (w.data.referenceNumber ?? '').toLowerCase();
        return serial.includes(q) || brand.includes(q) || model.includes(q) || ref.includes(q);
      });
    }

    result.sort((a, b) => {
      if (sortBy === 'serial') return (a.serialNum ?? '').localeCompare(b.serialNum ?? '');
      const dateA = new Date(a.data.lastSynced).getTime();
      const dateB = new Date(b.data.lastSynced).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [watches, search, sortBy]);

  if (isInitializing) return <Layout><Flex minH="70vh" /></Layout>;

  if (!isAuthenticated) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="70vh" gap={6}>
          <Heading
            size="4xl"
            textAlign="center"
            className="gradient-text fade-in-up"
            letterSpacing="tight"
            lineHeight="1.05"
          >
            {t('frontPage.title')}
          </Heading>
          <Text
            className="fade-in-up stagger-2"
            color={{ base: 'gray.600', _dark: 'gray.300' }}
            fontSize="xl"
            textAlign="center"
            maxW="640px"
          >
            {t('frontPage.description')}
          </Text>
          <Flex gap={4} className="fade-in-up stagger-3">
            <NextLink href="/login">
              <Button size="lg" color="white" className="brand-gradient-bg" px={8}>
                {t('login.title')}
              </Button>
            </NextLink>
            <NextLink href="/check-ownership">
              <Button size="lg" variant="outline" color="#00a884" borderColor="#00a884" px={8} _hover={{ bg: 'rgba(0,168,132,0.08)', transform: 'translateY(-1px)' }} transition="all 0.2s">
                {t('checkAWatchOwnership.title')}
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex justify="space-between" align="center" mb={6} className="fade-in-up">
        <Heading size="2xl" className="gradient-text" letterSpacing="tight">
          {t('frontPage.title')}
        </Heading>
        <NextLink href="/register-watch">
          <Button color="white" className="brand-gradient-bg" px={6}>
            {t('registerAWatchButton')}
          </Button>
        </NextLink>
      </Flex>

      {watches.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="40vh"
          gap={4}
        >
          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="lg">
            {t('dashboard.noWatches')}
          </Text>
          <NextLink href="/register-watch">
            <Button color="white" className="brand-gradient-bg" px={6}>
              {t('registerAWatchButton')}
            </Button>
          </NextLink>
        </Flex>
      ) : (
        <>
        <Flex gap={3} mb={4} align="center" className="fade-in-up stagger-2">
          <Input
            bg={{ base: 'white', _dark: 'gray.700' }}
            color={{ base: 'gray.900', _dark: 'white' }}
            borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
            placeholder={t('dashboard.searchPlaceholder')}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            flex={1}
          />
          <NativeSelect.Root w="auto">
            <NativeSelect.Field
              bg={{ base: 'white', _dark: 'gray.700' }}
              color={{ base: 'gray.900', _dark: 'white' }}
              borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">{t('dashboard.sortNewest')}</option>
              <option value="oldest">{t('dashboard.sortOldest')}</option>
              <option value="serial">{t('dashboard.sortSerial')}</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {filteredWatches.map((watch, i) => (
            <Box
              key={watch.id}
              className={`glow-card fade-in-up stagger-${Math.min(i + 1, 4)}`}
              bg={{ base: 'white', _dark: 'gray.800' }}
              p={5}
              borderRadius="lg"
              cursor="pointer"
              boxShadow={{ base: 'sm', _dark: 'none' }}
              onClick={() => router.push(`/watch/${watch.data.serialNum}`)}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="lg">
                  #{watch.serialNum}
                </Text>
                <Badge colorPalette="green">{t('dashboard.owned')}</Badge>
              </Flex>
              {(watch.data.brand || watch.data.model) && (
                <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm" mb={1}>
                  {[watch.data.brand, watch.data.model].filter(Boolean).join(' ')}
                </Text>
              )}
              {watch.data.referenceNumber && (
                <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="xs" mb={1}>
                  Ref. {watch.data.referenceNumber}
                </Text>
              )}
              {watch.certificateUrl && (
                <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="xs" truncate>
                  {t('seeAWatch.ipfsCertificate')}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
        {filteredWatches.length === 0 && search && (
          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="sm" textAlign="center" mt={4}>
            {t('dashboard.noResults')}
          </Text>
        )}
        </>
      )}
    </Layout>
  );
}
