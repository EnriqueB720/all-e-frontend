import * as React from 'react';
import { Box } from '@chakra-ui/react';

interface UserAvatarProps {
  seed: string;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ seed, size = 32 }) => {
  const encoded = encodeURIComponent(seed || 'anonymous');
  const src = `https://api.dicebear.com/9.x/identicon/svg?seed=${encoded}&backgroundColor=ffffff,f3f4f6,e2e8f0`;

  return (
    <Box
      as="img"
      src={src}
      alt={`${seed} avatar`}
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="full"
      bg="white"
      border="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
      flexShrink={0}
    />
  );
};

export default React.memo(UserAvatar);
