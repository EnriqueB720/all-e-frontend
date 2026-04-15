import { useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Heading, SimpleGrid, Badge } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Text } from '@components';
import { useTranslation } from '@hooks';

export default function Home() {
  const { isAuthenticated, isInitializing, user } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();

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

  const watches = user?.watches || [];

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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {watches.map((watch, i) => (
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
              <Flex justify="space-between" align="center" mb={3}>
                <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="lg">
                  #{watch.serialNum}
                </Text>
                <Badge colorPalette="green">{t('dashboard.owned')}</Badge>
              </Flex>
              {watch.certificateUrl && (
                <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="xs" truncate>
                  {t('seeAWatch.ipfsCertificate')}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
}
