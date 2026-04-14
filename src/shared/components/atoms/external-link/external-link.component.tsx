import * as React from 'react';
import _ from 'lodash';
import { Link } from '@chakra-ui/react';

import { ExternalLinkProps } from '@types';

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    color="#00a884"
    fontWeight="bold"
    fontSize="sm"
    _hover={{ textDecoration: 'underline' }}
  >
    {children}
  </Link>
);

export default React.memo(ExternalLink, (prev, next) => _.isEqual(prev, next));
