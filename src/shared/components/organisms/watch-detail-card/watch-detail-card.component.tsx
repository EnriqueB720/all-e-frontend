import * as React from 'react';
import _ from 'lodash';
import { Badge } from '@chakra-ui/react';

import { Box, ExternalLink, Flex, Text } from '@atoms';
import { DetailRow } from '@molecules';
import { useTranslation } from '@hooks';
import { WatchDetailCardProps } from '@types';

const WatchDetailCard: React.FC<WatchDetailCardProps> = ({
  watch,
  ownerUsername,
  isCurrentUserOwner = false,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      bg={{ base: 'white', _dark: 'gray.800' }}
      p={6}
      borderRadius="lg"
      boxShadow={{ base: 'sm', _dark: 'none' }}
    >
      <Flex direction="column" gap={4}>
        <DetailRow label={t('seeAWatch.serialNumber')} showSeparator={false}>
          <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="xl">
            #{watch.serialNum}
          </Text>
        </DetailRow>

        <DetailRow label={t('seeAWatch.currentOwner')}>
          <Flex align="center" gap={2}>
            <Text color={{ base: 'gray.900', _dark: 'white' }}>{ownerUsername}</Text>
            {isCurrentUserOwner && <Badge colorPalette="green">{t('seeAWatch.you')}</Badge>}
          </Flex>
        </DetailRow>

        {ownerWalletAddress && (
          <DetailRow label={t('ownershipHistory.walletAddress')}>
            <Text
              color={{ base: 'gray.600', _dark: 'gray.300' }}
              fontSize="sm"
              fontFamily="mono"
            >
              {ownerWalletAddress}
            </Text>
          </DetailRow>
        )}

        {watch.certificateUrl && (
          <DetailRow label={t('seeAWatch.ipfsCertificate')}>
            <ExternalLink href={watch.certificateUrl}>
              {t('seeAWatch.viewOnIpfs')}
            </ExternalLink>
          </DetailRow>
        )}
      </Flex>
    </Box>
  );
};

export default React.memo(WatchDetailCard, (prev, next) => _.isEqual(prev, next));
