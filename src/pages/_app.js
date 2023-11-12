// App.js
import React from 'react';
//import '@/styles/globals.css';
import { goerli } from '@wagmi/core/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import MainComponent from './MainComponent'; // Import the MainComponent

// Configure chains and provider
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <MainComponent>
        <Component {...pageProps} />
      </MainComponent>
    </WagmiConfig>
  );
}
