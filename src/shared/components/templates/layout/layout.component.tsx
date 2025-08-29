import * as React from 'react';

import _ from 'lodash';
import { useTranslation } from '@hooks';

const Layout: React.FC = () => {

  const { t } = useTranslation();

  return (
    <>
      <p> {t('AppCreatorProfile.link')}</p>
    </>
  );
}

export default React.memo(Layout, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});