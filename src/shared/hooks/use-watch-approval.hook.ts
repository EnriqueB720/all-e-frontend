import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ALL_E_WATCH_ABI } from '@/shared/blockchain/abi';
import { WATCH_CONTRACT_ADDRESS, DEPLOYER_ADDRESS } from '@/shared/blockchain/config';

export interface UseWatchApprovalResult {
  isConnected: boolean;
  connectedAddress?: `0x${string}`;
  isApproved: boolean;
  isLoadingApproval: boolean;
  approve: () => void;
  isApproving: boolean;
  approveTxHash?: `0x${string}`;
  approveError?: Error | null;
}

/**
 * Reads and writes the deployer's operator approval on the AllEWatch contract
 * for the currently connected wallet. Approval lets the backend move the
 * user's NFTs on their behalf (non-custodial transfers).
 */
export function useWatchApproval(): UseWatchApprovalResult {
  const { address, isConnected } = useAccount();

  const { data: approved, isLoading: isLoadingApproval, refetch } = useReadContract({
    abi: ALL_E_WATCH_ABI,
    address: WATCH_CONTRACT_ADDRESS,
    functionName: 'isApprovedForAll',
    args: address ? [address, DEPLOYER_ADDRESS] : undefined,
    query: { enabled: Boolean(address) },
  });

  const { writeContract, data: approveTxHash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  if (isSuccess) {
    refetch();
  }

  const approve = () => {
    writeContract({
      abi: ALL_E_WATCH_ABI,
      address: WATCH_CONTRACT_ADDRESS,
      functionName: 'setApprovalForAll',
      args: [DEPLOYER_ADDRESS, true],
    });
  };

  return {
    isConnected,
    connectedAddress: address,
    isApproved: Boolean(approved),
    isLoadingApproval,
    approve,
    isApproving: isPending || isConfirming,
    approveTxHash,
    approveError: error,
  };
}
