// MainComponent.js
import React, { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export default function MainComponent({ children }) {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      const metaMaskConnector = connectors.find(connector => connector instanceof MetaMaskConnector);
      if (metaMaskConnector) {
        connect(metaMaskConnector);
      }
    }
  }, [isConnected, connect, connectors]);

  return <>{children}</>;
}
