import * as React from 'react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Separator,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverPositioner,
  PopoverArrow,
  PopoverArrowTip,
  Badge,
  DrawerRoot,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  IconButton,
} from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import { useColorMode } from '@/shared/contexts/color-mode.context';
import NextLink from 'next/link';

import { AuthContext } from '@contexts';
import { Box, Flex, Button, Text, UserAvatar } from '@components';
import { useTranslation } from '@hooks';
import { Language, usePendingTransferRequestsQuery } from '@generated';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { t, language, switchLanguage } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: pendingData } = usePendingTransferRequestsQuery({
    variables: { userId: user?.id ?? 0 },
    skip: !isAuthenticated || !user,
    pollInterval: 10000,
    fetchPolicy: 'network-only',
  });

  const pendingCount = pendingData?.pendingTransferRequests?.length ?? 0;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleLanguageToggle = () => {
    const newLang = language === Language.English ? Language.Spanish : Language.English;
    switchLanguage(newLang);
  };

  const navLinks = isAuthenticated ? (
    <>
      <NextLink href="/" onClick={() => setDrawerOpen(false)}>
        <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
          Dashboard
        </Text>
      </NextLink>
      <NextLink href="/register-watch" onClick={() => setDrawerOpen(false)}>
        <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
          {t('registerAWatchButton')}
        </Text>
      </NextLink>
      <NextLink href="/transfer-watch" onClick={() => setDrawerOpen(false)}>
        <Flex align="center" gap={1}>
          <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
            {t('transferAWatchButton')}
          </Text>
          {pendingCount > 0 && (
            <Badge colorPalette="red" variant="solid" fontSize="2xs" borderRadius="full" px={1.5} minW="18px" textAlign="center">
              {pendingCount}
            </Badge>
          )}
        </Flex>
      </NextLink>
      <NextLink href="/check-ownership" onClick={() => setDrawerOpen(false)}>
        <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
          Check Ownership
        </Text>
      </NextLink>
      <NextLink href="/contact" onClick={() => setDrawerOpen(false)}>
        <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
          Contact Us
        </Text>
      </NextLink>
    </>
  ) : null;

  const utilButtons = (
    <>
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
    </>
  );

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
          <Image
            src="/NavbarLogoAllE.png"
            alt="All-E"
            width={90}
            height={36}
            style={{
              cursor: 'pointer',
              filter: colorMode === 'light' ? 'drop-shadow(0 0 0.5px #333) drop-shadow(0 0 0.5px #333)' : 'none',
            }}
            priority
          />
        </NextLink>

        {/* Desktop nav */}
        <Flex align="center" gap={4} display={{ base: 'none', lg: 'flex' }}>
          {isAuthenticated ? (
            <>
              {navLinks}

              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Flex align="center" gap={2} cursor="pointer" _hover={{ color: '#00a884' }}>
                    <UserAvatar seed={user?.username || user?.email || ''} size={28} />
                    <Text
                      color={{ base: 'gray.500', _dark: 'gray.400' }}
                      fontSize="sm"
                    >
                      {user?.username}
                    </Text>
                  </Flex>
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
                      <Flex align="center" gap={3}>
                        <UserAvatar seed={user?.username || user?.email || ''} size={40} />
                        <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="md">
                          {user?.username}
                        </Text>
                      </Flex>

                      <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

                      <Flex direction="column" gap={1}>
                        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs" fontWeight="medium">
                          {t('profile.email')}
                        </Text>
                        <Text color={{ base: 'gray.700', _dark: 'gray.200' }} fontSize="sm">
                          {user?.email}
                        </Text>
                      </Flex>

                      <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

                      <NextLink href="/profile">
                        <Text
                          color="#00a884"
                          fontSize="sm"
                          fontWeight="medium"
                          cursor="pointer"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          {t('profile.title')}
                        </Text>
                      </NextLink>

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

          {utilButtons}
        </Flex>

        {/* Mobile hamburger */}
        <Flex align="center" gap={2} display={{ base: 'flex', lg: 'none' }}>
          {utilButtons}
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            color={{ base: 'gray.600', _dark: 'gray.300' }}
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            <LuMenu />
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile drawer */}
      <DrawerRoot
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
        placement="end"
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent bg={{ base: 'white', _dark: 'gray.800' }} maxW="280px">
            <DrawerHeader>
              <DrawerTitle color={{ base: 'gray.900', _dark: 'white' }}>Menu</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={4}>
                {isAuthenticated ? (
                  <>
                    <Flex align="center" gap={3} mb={2}>
                      <UserAvatar seed={user?.username || user?.email || ''} size={40} />
                      <Flex direction="column" gap={1}>
                        <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="md">
                          {user?.username}
                        </Text>
                        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs">
                          {user?.email}
                        </Text>
                      </Flex>
                    </Flex>

                    <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

                    {navLinks}

                    <NextLink href="/profile" onClick={() => setDrawerOpen(false)}>
                      <Text className="link-underline" color={{ base: 'gray.600', _dark: 'gray.300' }} _hover={{ color: { base: 'gray.900', _dark: 'white' } }} cursor="pointer" fontSize="sm">
                        {t('profile.title')}
                      </Text>
                    </NextLink>

                    <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

                    <Button
                      size="sm"
                      variant="outline"
                      color="#00a884"
                      borderColor="#00a884"
                      onClick={() => { setDrawerOpen(false); handleLogout(); }}
                    >
                      {t('logoutMessage')}
                    </Button>
                  </>
                ) : (
                  <>
                    <NextLink href="/login" onClick={() => setDrawerOpen(false)}>
                      <Button size="sm" variant="outline" color="#00a884" borderColor="#00a884" w="100%">
                        {t('login.title')}
                      </Button>
                    </NextLink>
                    <NextLink href="/signup" onClick={() => setDrawerOpen(false)}>
                      <Button size="sm" color="white" className="brand-gradient-bg" w="100%">
                        {t('login.noAccount')}
                      </Button>
                    </NextLink>
                  </>
                )}
              </Flex>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRoot>
    </Box>
  );
};

export default React.memo(Navbar);
