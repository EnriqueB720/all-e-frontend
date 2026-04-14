import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 * Wraps RainbowKit's ConnectButton. Handles wallet selection modal,
 * chain switching, and account display.
 */
const ConnectWalletButton: React.FC = () => (
  <ConnectButton
    accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
    chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
    showBalance={false}
  />
);

export default React.memo(ConnectWalletButton);
