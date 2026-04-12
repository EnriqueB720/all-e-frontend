import * as React from 'react';
import { useContext, useState } from 'react';
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
import { Box, Flex, Button, Input, CopyableText, Text } from '@components';
import { useTranslation } from '@hooks';
import { Language, useUpdateUserMutation } from '@generated';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, refreshUserToken } = useContext(AuthContext);
  const { t, language, switchLanguage } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [walletInput, setWalletInput] = useState('');
  const [walletError, setWalletError] = useState('');
  const [updateUser] = useUpdateUserMutation();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleLanguageToggle = () => {
    const newLang = language === Language.English ? Language.Spanish : Language.English;
    switchLanguage(newLang);
  };

  const handleSaveWallet = async () => {
    if (!walletInput.trim() || !user) return;
    try {
      setWalletError('');
      await updateUser({
        variables: { data: { id: user.id, walletAddress: walletInput.trim() } },
      });
      setIsEditingWallet(false);
      setWalletInput('');
      await refreshUserToken();
    } catch (err: any) {
      const message = err?.message || '';
      if (message.includes('wallet address is already in use')) {
        setWalletError(t('profile.walletTaken'));
      } else {
        setWalletError(t('profile.walletError'));
      }
    }
  };

  return (
    <Box bg={{ base: 'white', _dark: 'gray.800' }} px={6} py={3} boxShadow="md">
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
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  Dashboard
                </Text>
              </NextLink>
              <NextLink href="/register-watch">
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  {t('registerAWatchButton')}
                </Text>
              </NextLink>
              <NextLink href="/transfer-watch">
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  {t('transferAWatchButton')}
                </Text>
              </NextLink>
              <NextLink href="/check-ownership">
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                  Check Ownership
                </Text>
              </NextLink>
              <NextLink href="/contact">
                <Text color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
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

                      <Flex direction="column" gap={1}>
                        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs" fontWeight="medium">
                          {t('profile.wallet')}
                        </Text>
                        {user?.data.walletAddress ? (
                          <Text color={{ base: 'gray.700', _dark: 'gray.200' }} fontSize="sm" fontFamily="mono" wordBreak="break-all">
                           <CopyableText value={user?.data.walletAddress} />
                          </Text>
                        ) : isEditingWallet ? (
                          <Flex direction="column" gap={2}>
                            <Flex align="center" gap={1} bg={{ base: 'orange.50', _dark: 'orange.900' }} p={2} borderRadius="md">
                              <Text fontSize="xs" color={{ base: 'orange.600', _dark: 'orange.300' }}>
                                {'\u24D8'} {t('profile.walletWarning')}
                              </Text>
                            </Flex>
                            <Input
                              size="sm"
                              placeholder={t('profile.walletPlaceholder')}
                              value={walletInput}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setWalletInput(e.target.value); setWalletError(''); }}
                              bg={{ base: 'white', _dark: 'gray.600' }}
                              color={{ base: 'gray.900', _dark: 'white' }}
                            />
                            {walletError && (
                              <Text color="red.400" fontSize="xs">{walletError}</Text>
                            )}
                            <Flex gap={2}>
                              <Button size="xs" bg="#00a884" color="white" onClick={handleSaveWallet}>
                                {t('profile.saveWallet')}
                              </Button>
                              <Button size="xs" variant="outline" color={{ base: 'gray.600', _dark: 'gray.300' }} onClick={() => { setIsEditingWallet(false); setWalletError(''); }}>
                                {t('profile.cancel')}
                              </Button>
                            </Flex>
                          </Flex>
                        ) : (
                          <Flex align="center" gap={2}>
                            <Text color={{ base: 'gray.400', _dark: 'gray.500' }} fontSize="sm">
                              {t('profile.noWallet')}
                            </Text>
                            <Button size="xs" variant="outline" color="#00a884" borderColor="#00a884" onClick={() => setIsEditingWallet(true)}>
                              {t('profile.addWallet')}
                            </Button>
                          </Flex>
                        )}
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
                <Button size="sm" bg="#00a884" color="white">
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
