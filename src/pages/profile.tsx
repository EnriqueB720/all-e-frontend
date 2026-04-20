import { useContext, useMemo, useState } from 'react';
import { Heading, Separator, Badge } from '@chakra-ui/react';

import { AuthContext } from '@contexts';
import { Layout, Box, Flex, Button, Input, Text, PasswordInput, UserAvatar } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useUpdateUserMutation, useUserActivityQuery } from '@generated';


export default function Profile() {
  const { isReady, user } = useRequireAuth();
  const { refreshUserToken } = useContext(AuthContext);
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [updateUser, { loading }] = useUpdateUserMutation();

  const { data: activityData } = useUserActivityQuery({
    variables: { userId: user?.id ?? 0 },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const passwordChecks = useMemo(() => ({
    minLength: newPassword.length >= 8,
    hasLowercase: /[a-z]/.test(newPassword),
    hasUppercase: /[A-Z]/.test(newPassword),
    hasDigit: /\d/.test(newPassword),
  }), [newPassword]);

  const isPasswordValid = !newPassword || Object.values(passwordChecks).every(Boolean);

  const [initialized, setInitialized] = useState(false);
  if (user && !initialized) {
    setUsername(user.username);
    setInitialized(true);
  }

  if (!isReady || !user) return null;

  const watchCount = user.watches?.length ?? 0;
  const joinDate = new Date(user.createdAt).toLocaleDateString();

  const handleSave = async () => {
    setError('');
    setMessage('');

    if (newPassword && !isPasswordValid) {
      setError(t('profile.passwordRequirements'));
      return;
    }

    try {
      await updateUser({
        variables: {
          data: {
            id: user.id,
            username: username !== user.username ? username : undefined,
            currentPassword: currentPassword || undefined,
            newPassword: newPassword || undefined,
          },
        },
      });

      await refreshUserToken();
      setCurrentPassword('');
      setNewPassword('');
      setMessage(t('profile.saved'));
    } catch (err: any) {
      setError(err.message || t('profile.error'));
    }
  };

  return (
    <Layout>
      <Flex direction="column" align="center" mt={10}>
        <Box
          className="soft-card fade-in-up"
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="500px"
          boxShadow="xl"
        >
          <Heading as="h1" size="2xl" mb={6} textAlign="center" className="gradient-text" letterSpacing="tight">
            {t('profile.title')}
          </Heading>

          <Flex justify="center" mb={4}>
            <UserAvatar seed={user.username || user.email} size={96} />
          </Flex>

          <Flex direction="column" gap={4}>
            <Flex justify="space-between" align="center">
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('profile.totalWatches')}</Text>
              <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold">{watchCount}</Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">{t('profile.joinDate')}</Text>
              <Text color={{ base: 'gray.900', _dark: 'white' }}>{joinDate}</Text>
            </Flex>

            <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('profile.email')}
              </Text>
              <Input
                bg={{ base: 'gray.100', _dark: 'gray.700' }}
                color={{ base: 'gray.500', _dark: 'gray.400' }}
                value={user.email}
                disabled
              />
            </Box>

            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('profile.username')}
              </Text>
              <Input
                bg={{ base: 'white', _dark: 'gray.700' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
            </Box>

            <Separator borderColor={{ base: 'gray.200', _dark: 'gray.600' }} />

            <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm" fontWeight="medium">
              {t('profile.changePassword')}
            </Text>

            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('profile.currentPassword')}
              </Text>
              <PasswordInput
                bg={{ base: 'white', _dark: 'gray.700' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                value={currentPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
              />
            </Box>

            <Box>
              <Text color={{ base: 'gray.700', _dark: 'white' }} mb={2} fontSize="sm" fontWeight="medium">
                {t('profile.newPassword')}
              </Text>
              <PasswordInput
                bg={{ base: 'white', _dark: 'gray.700' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
              {newPassword && (
                <Flex direction="column" gap={1} mt={2}>
                  <Text fontSize="xs" color={passwordChecks.minLength ? 'green.400' : 'red.400'}>
                    {passwordChecks.minLength ? '\u2713' : '\u2717'} {t('profile.rules.minLength')}
                  </Text>
                  <Text fontSize="xs" color={passwordChecks.hasLowercase ? 'green.400' : 'red.400'}>
                    {passwordChecks.hasLowercase ? '\u2713' : '\u2717'} {t('profile.rules.lowercase')}
                  </Text>
                  <Text fontSize="xs" color={passwordChecks.hasUppercase ? 'green.400' : 'red.400'}>
                    {passwordChecks.hasUppercase ? '\u2713' : '\u2717'} {t('profile.rules.uppercase')}
                  </Text>
                  <Text fontSize="xs" color={passwordChecks.hasDigit ? 'green.400' : 'red.400'}>
                    {passwordChecks.hasDigit ? '\u2713' : '\u2717'} {t('profile.rules.digit')}
                  </Text>
                </Flex>
              )}
            </Box>

            {error && <Text color="red.400" fontSize="sm">{error}</Text>}
            {message && <Text color="green.400" fontSize="sm">{message}</Text>}

            <Button
              color="white"
              className="brand-gradient-bg"
              loading={loading}
              disabled={!isPasswordValid}
              onClick={handleSave}
            >
              {t('profile.save')}
            </Button>
          </Flex>
        </Box>

        <Box
          className="soft-card fade-in-up stagger-2"
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={8}
          borderRadius="xl"
          w="100%"
          maxW="500px"
          boxShadow="xl"
          mt={6}
        >
          <Heading as="h2" size="lg" mb={4} className="gradient-text" letterSpacing="tight">
            {t('activity.title')}
          </Heading>
          {!activityData?.userActivity?.length ? (
            <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
              {t('activity.empty')}
            </Text>
          ) : (
            <Flex
              direction="column"
              gap={3}
              maxH="400px"
              overflowY="auto"
              pr={2}
              css={{
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-thumb': { background: '#00a884', borderRadius: '3px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
              }}
            >
              {activityData.userActivity.map((entry, index) => {
                const watchLabel = [entry.watch?.brand, entry.watch?.model].filter(Boolean).join(' ');
                const allEntries = activityData.userActivity;
                const isFirst = index === allEntries.length - 1 ||
                  entry.watch?.serialNum !== allEntries[index + 1]?.watch?.serialNum;
                const isOwner = entry.ownerId === user.id;

                let activityType: 'registered' | 'received' | 'sent';
                if (isFirst && isOwner) {
                  activityType = 'registered';
                } else if (isOwner) {
                  activityType = 'received';
                } else {
                  activityType = 'sent';
                }

                const badgeConfig = {
                  registered: { label: t('activity.registered'), color: 'blue' as const },
                  received: { label: t('activity.received'), color: 'green' as const },
                  sent: { label: t('activity.sent'), color: 'orange' as const },
                };

                const badge = badgeConfig[activityType];

                return (
                  <Flex
                    key={entry.id}
                    justify="space-between"
                    align="center"
                    p={3}
                    bg={{ base: 'gray.50', _dark: 'gray.700' }}
                    borderRadius="md"
                  >
                    <Flex direction="column" gap={1}>
                      <Flex align="center" gap={2}>
                        <Text color={{ base: 'gray.900', _dark: 'white' }} fontSize="sm" fontWeight="medium">
                          #{entry.watch?.serialNum}
                        </Text>
                        <Badge colorPalette={badge.color} variant="subtle" fontSize="2xs">
                          {badge.label}
                        </Badge>
                      </Flex>
                      {watchLabel && (
                        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs">
                          {watchLabel}
                        </Text>
                      )}
                    </Flex>
                    <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs" flexShrink={0}>
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
