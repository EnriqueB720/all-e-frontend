export interface OwnershipHistoryEntry {
  id: number;
  ownerId: number;
  timestamp: string | Date;
  owner?: {
    id: number;
    username: string;
    walletAddress?: string | null;
  } | null;
}

export interface OwnershipHistoryCardProps {
  entries: OwnershipHistoryEntry[];
}
