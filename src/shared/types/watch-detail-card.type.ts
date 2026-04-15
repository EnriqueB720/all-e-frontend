import { Watch } from '@model';

export interface WatchDetailCardProps {
  watch: Watch;
  ownerUsername: string;
  isCurrentUserOwner?: boolean;
}
