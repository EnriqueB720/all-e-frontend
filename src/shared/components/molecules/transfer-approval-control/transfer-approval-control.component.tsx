import * as React from 'react';
import { Badge } from '@chakra-ui/react';

import { Button, ConnectWalletButton, ExternalLink, Flex, Text } from '@atoms';
import { useTranslation, useWatchApproval } from '@hooks';
import { TransferApprovalControlProps } from '@types';

const TransferApprovalControl: React.FC<TransferApprovalControlProps> = ({
  ownerWalletAddress,
}) => {
  const { t } = useTranslation();
  const {
    isConnected,
    connectedAddress,
    isApproved,
    isLoadingApproval,
    approve,
    isApproving,
    approveTxHash,
    approveError,
  } = useWatchApproval();

  const walletMatches =
    isConnected &&
    connectedAddress &&
    ownerWalletAddress &&
    connectedAddress.toLowerCase() === ownerWalletAddress.toLowerCase();

  if (!isConnected) {
    return (
      <Flex direction="column" gap={2}>
        <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.400' }}>
          {t('approval.connectToApprove')}
        </Text>
        <ConnectWalletButton />
      </Flex>
    );
  }

  if (!walletMatches) {
    return (
      <Flex direction="column" gap={2}>
        <Text fontSize="xs" color={{ base: 'orange.600', _dark: 'orange.300' }}>
          {t('approval.wrongAccount')}
        </Text>
        <ConnectWalletButton />
      </Flex>
    );
  }

  if (isLoadingApproval) {
    return (
      <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.400' }}>
        {t('approval.checking')}
      </Text>
    );
  }

  if (isApproved) {
    return (
      <Flex align="center" gap={2}>
        <Badge colorPalette="green">{t('approval.enabled')}</Badge>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={2}>
      <Text fontSize="xs" color={{ base: 'gray.600', _dark: 'gray.300' }}>
        {t('approval.description')}
      </Text>
      <Button
        size="sm"
        bg="#00a884"
        color="white"
        onClick={approve}
        disabled={isApproving}
      >
        {isApproving ? t('approval.approving') : t('approval.approve')}
      </Button>
      {approveTxHash && (
        <ExternalLink href={`https://sepolia.basescan.org/tx/${approveTxHash}`}>
          {t('approval.viewTx')}
        </ExternalLink>
      )}
      {approveError && (
        <Text fontSize="xs" color="red.400">
          {approveError.message}
        </Text>
      )}
    </Flex>
  );
};

export default React.memo(TransferApprovalControl);
