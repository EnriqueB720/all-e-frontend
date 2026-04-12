import { useState } from "react";
import { Flex, Text } from "..";

const CopyableText: React.FC<{ value: string; mono?: boolean }> = ({ value, mono }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Flex align="center" gap={2}>
      <Text
        color={mono ? { base: 'gray.700', _dark: 'gray.300' } : { base: 'gray.900', _dark: 'white' }}
        fontSize="sm"
        fontFamily={mono ? 'mono' : undefined}
      >
        {value}
      </Text>
      <Text
        onClick={handleCopy}
        cursor="pointer"
        fontSize="xs"
        color={copied ? '#00a884' : { base: 'gray.500', _dark: 'gray.400' }}
        _hover={{ color: '#00a884' }}
        title="Copy"
      >
        {copied ? '✓' : '⧉'}
      </Text>
    </Flex>
  );
};

export default CopyableText;