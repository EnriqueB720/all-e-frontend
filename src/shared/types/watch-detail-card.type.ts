import { Watch } from '@model';

export interface WatchDetailCardProps {
  watch: Watch;
  ownerUsername: string;
  ownerWalletAddress?: string | null;
  isCurrentUserOwner?: boolean;
}
