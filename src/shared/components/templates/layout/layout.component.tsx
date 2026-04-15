import * as React from 'react';

import _ from 'lodash';

import { Navbar } from '@components';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default React.memo(Layout, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});
