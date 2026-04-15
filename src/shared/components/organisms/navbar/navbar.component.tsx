import * as React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Separator,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverPositioner,
  PopoverArrow,
  PopoverArrowTip,
} from '@chakra-ui/react';
import { useColorMode } from '@/shared/contexts/color-mode.context';
import NextLink from 'next/link';

import { AuthContext } from '@contexts';
import { Box, Flex, Button, Text } from '@components';
import { useTranslation } from '@hooks';
import { Language } from '@generated';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { t, language, switchLanguage } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
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
    <Box
      bg={{ base: 'whiteAlpha.800', _dark: 'blackAlpha.400' }}
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
      px={6}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <NextLink href="/">
          <Heading size="md" cursor="pointer" className="gradient-text" letterSpacing="tight">
            All-E
          </Heading>
        </NextLink>

        <Flex align="center" gap={4}>
          {isAuthenticated ? (
            <>
              <NextLink href="/">
                <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  Dashboard
                </Text>
              </NextLink>
              <NextLink href="/register-watch">
                <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  {t('registerAWatchButton')}
                </Text>
              </NextLink>
              <NextLink href="/transfer-watch">
                <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  {t('transferAWatchButton')}
                </Text>
              </NextLink>
              <NextLink href="/check-ownership">
                <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  Check Ownership
                </Text>
              </NextLink>
              <NextLink href="/contact">
                <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  Contact Us
                </Text>
              </NextLink>

              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Text
                    color={{ base: 'gray.500', _dark: 'gray.400' }}
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ color: '#00a884' }}
                  >
                    {user?.username}
                  </Text>
                </PopoverTrigger>
                <PopoverPositioner>
                  <PopoverContent
                    bg={{ base: 'white', _dark: 'gray.700' }}
                    borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    minW="250px"
                  >
                    <PopoverArrow>
                      <PopoverArrowTip />
                    </PopoverArrow>
                    <Flex direction="column" gap={3}>
                      <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="md">
                        {user?.username}
                      </Text>

                      <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

                      <Flex direction="column" gap={1}>
                        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs" fontWeight="medium">
                          {t('profile.email')}
                        </Text>
                        <Text color={{ base: 'gray.700', _dark: 'gray.200' }} fontSize="sm">
                          {user?.email}
                        </Text>
                      </Flex>

                    </Flex>
                  </PopoverContent>
                </PopoverPositioner>
              </PopoverRoot>

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
                <Button size="sm" color="white" className="brand-gradient-bg">
                  {t('login.noAccount')}
                </Button>
              </NextLink>
            </>
          )}

          <Button
            size="sm"
            variant="ghost"
            color={{ base: 'gray.600', _dark: 'gray.300' }}
            _hover={{ color: { base: 'gray.900', _dark: 'white' }, bg: { base: 'gray.100', _dark: 'gray.700' } }}
            onClick={toggleColorMode}
            fontWeight="bold"
            minW="auto"
            px={2}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            color={{ base: 'gray.600', _dark: 'gray.300' }}
            _hover={{ color: { base: 'gray.900', _dark: 'white' }, bg: { base: 'gray.100', _dark: 'gray.700' } }}
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
