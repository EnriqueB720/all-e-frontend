import * as React from 'react';
import _ from 'lodash';
import { Heading, Link } from '@chakra-ui/react';

import { Box, Flex, Text } from '@atoms';
import { DetailRow } from '@molecules';
import { useTranslation } from '@hooks';
import { OwnershipHistoryCardProps } from '@types';

const formatTimestamp = (timestamp: string | Date): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleString();
};

const OwnershipHistoryCard: React.FC<OwnershipHistoryCardProps> = ({ entries }) => {
  const { t } = useTranslation();

  const sorted = [...entries].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  return (
    <Box
      className="soft-card"
      bg={{ base: 'white', _dark: 'gray.800' }}
      p={6}
      borderRadius="lg"
      boxShadow={{ base: 'sm', _dark: 'none' }}
    >
      <Heading size="md" color={{ base: 'gray.900', _dark: 'white' }} mb={4}>
        {t('ownershipHistory.title')}
      </Heading>

      {sorted.length === 0 ? (
        <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="sm">
          {t('ownershipHistory.empty')}
        </Text>
      ) : (
        <Flex direction="column" gap={4}>
          {sorted.map((entry, idx) => (
            <DetailRow
              key={entry.id}
              label={formatTimestamp(entry.timestamp)}
              showSeparator={idx !== 0}
            >
              <Flex direction="column" align="flex-end" gap={1}>
                <Text color={{ base: 'gray.900', _dark: 'white' }} fontSize="sm" fontWeight="medium">
                  {entry.owner?.username ?? `#${entry.ownerId}`}
                </Text>
                {entry.certificateUrl && (
                  <Link
                    href={entry.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="#00a884"
                    fontSize="xs"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {t('seeAWatch.viewOnIpfs')}
                  </Link>
                )}
              </Flex>
            </DetailRow>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default React.memo(OwnershipHistoryCard, (prev, next) => _.isEqual(prev, next));
