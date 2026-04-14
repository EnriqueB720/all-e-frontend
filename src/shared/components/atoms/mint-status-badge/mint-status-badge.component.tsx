import * as React from 'react';
import _ from 'lodash';
import { Badge } from '@chakra-ui/react';

import { MintStatus } from '@generated';
import { MintStatusBadgeProps } from '@types';
import { useTranslation } from '@hooks';

const MintStatusBadge: React.FC<MintStatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const effective = status ?? MintStatus.Pending;

  const palette =
    effective === MintStatus.Minted ? 'green'
    : effective === MintStatus.Failed ? 'red'
    : 'yellow';

  const label =
    effective === MintStatus.Minted ? t('mintStatus.minted')
    : effective === MintStatus.Failed ? t('mintStatus.failed')
    : t('mintStatus.pending');

  return <Badge colorPalette={palette}>{label}</Badge>;
};

export default React.memo(MintStatusBadge, (prev, next) => _.isEqual(prev, next));
