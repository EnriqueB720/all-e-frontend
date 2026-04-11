import * as React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from '@contexts';
import { Box, Flex, Button } from '@components';
import { useTranslation } from '@hooks';
import { Language } from '@generated';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { t, language, switchLanguage } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleLanguageToggle = () => {
    const newLang = language === Language.English ? Language.Spanish : Language.English;
    switchLanguage(newLang);
  };

  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <NextLink href="/">
          <Heading size="md" color="#00a884" cursor="pointer">
            All-E
          </Heading>
        </NextLink>

        <Flex align="center" gap={4}>
          {isAuthenticated ? (
            <>
              <NextLink href="/">
                <Text color="gray.300" _hover={{ color: 'white' }} cursor="pointer" fontSize="sm">
                  Dashboard
                </Text>
              </NextLink>
              <NextLink href="/register-watch">
                <Text color="gray.300" _hover={{ color: 'white' }} cursor="pointer" fontSize="sm">
                  {t('registerAWatchButton')}
                </Text>
              </NextLink>
              <NextLink href="/transfer-watch">
                <Text color="gray.300" _hover={{ color: 'white' }} cursor="pointer" fontSize="sm">
                  {t('transferAWatchButton')}
                </Text>
              </NextLink>
              <Text color="gray.400" fontSize="sm">
                {user?.username}
              </Text>
              <Button
                size="sm"
                variant="outline"
                color="#00a884"
                borderColor="#00a884"
                onClick={handleLogout}
              >
                {t('logoutMessage')}
              </Button>
            </>
          ) : (
            <>
              <NextLink href="/login">
                <Button size="sm" variant="outline" color="#00a884" borderColor="#00a884">
                  {t('login.title')}
                </Button>
              </NextLink>
              <NextLink href="/signup">
                <Button size="sm" bg="#00a884" color="white">
                  {t('login.noAccount')}
                </Button>
              </NextLink>
            </>
          )}

          <Button
            size="sm"
            variant="ghost"
            color="gray.300"
            _hover={{ color: 'white', bg: 'gray.700' }}
            onClick={handleLanguageToggle}
            fontWeight="bold"
            minW="auto"
            px={2}
          >
            {language === Language.English ? 'ES' : 'EN'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default React.memo(Navbar);
