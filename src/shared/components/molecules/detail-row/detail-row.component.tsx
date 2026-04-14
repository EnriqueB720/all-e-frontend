import * as React from 'react';
import _ from 'lodash';
import { Separator } from '@chakra-ui/react';

import { Flex, Text } from '@atoms';
import { DetailRowProps } from '@types';

const DetailRow: React.FC<DetailRowProps> = ({ label, children, showSeparator = true }) => (
  <>
    {showSeparator && (
      <Separator borderColor={{ base: 'gray.200', _dark: 'gray.700' }} />
    )}
    <Flex justify="space-between" align="center">
      <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
        {label}
      </Text>
      {children}
    </Flex>
  </>
);

export default React.memo(DetailRow, (prev, next) => _.isEqual(prev, next));
