export interface OwnershipHistoryEntry {
  id: number;
  ownerId: number;
  timestamp: string | Date;
  metadataURI?: string | null;
  certificateUrl?: string | null;
  owner?: {
    id: number;
    username: string;
  } | null;
}

export interface OwnershipHistoryCardProps {
  entries: OwnershipHistoryEntry[];
}
