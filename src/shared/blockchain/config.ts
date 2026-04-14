import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const WATCH_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_WATCH_CONTRACT_ADDRESS ?? '0x0000000000000000000000000000000000000000') as `0x${string}`;
export const DEPLOYER_ADDRESS = (process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS ?? '0x0000000000000000000000000000000000000000') as `0x${string}`;

export const wagmiConfig = getDefaultConfig({
  appName: 'All-E',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? 'all-e-demo',
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
