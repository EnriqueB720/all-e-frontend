import { useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Heading, Text, SimpleGrid, Badge } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button } from '@components';
import { useTranslation } from '@hooks';

export default function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="70vh" gap={6}>
          <Heading size="2xl" color={{ base: 'gray.900', _dark: 'white' }} textAlign="center">
            {t('frontPage.title')}
          </Heading>
          <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="lg" textAlign="center" maxW="600px">
            {t('frontPage.description')}
          </Text>
          <Flex gap={4}>
            <NextLink href="/login">
              <Button size="lg" bg="#00a884" color="white">
                {t('login.title')}
              </Button>
            </NextLink>
            <NextLink href="/check-ownership">
              <Button size="lg" variant="outline" color="#00a884" borderColor="#00a884">
                {t('checkAWatchOwnership.title')}
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Layout>
    );
  }

  const watches = user?.watches || [];

  return (
    <Layout>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
          {t('frontPage.title')}
        </Heading>
        <NextLink href="/register-watch">
          <Button bg="#00a884" color="white">
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
            <Button bg="#00a884" color="white">
              {t('registerAWatchButton')}
            </Button>
          </NextLink>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {watches.map((watch) => (
            <Box
              key={watch.id}
              bg={{ base: 'white', _dark: 'gray.800' }}
              p={5}
              borderRadius="lg"
              cursor="pointer"
              _hover={{ bg: { base: 'gray.100', _dark: 'gray.700' }, transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              boxShadow={{ base: 'sm', _dark: 'none' }}
              onClick={() => router.push(`/watch/${watch.data.serialNum}`)}
            >
              <Flex justify="space-between" align="center" mb={3}>
                <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="lg">
                  #{watch.serialNum}
                </Text>
                <Badge colorPalette="green">{t('dashboard.owned')}</Badge>
              </Flex>
              {watch.metadataURI && (
                <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="xs" truncate>
                  IPFS: {watch.metadataURI}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
}
