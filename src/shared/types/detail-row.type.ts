import { ReactNode } from 'react';

export interface DetailRowProps {
  label: string;
  children: ReactNode;
  showSeparator?: boolean;
}
