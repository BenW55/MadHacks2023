import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useConnect, useAccount } from 'wagmi';
import { goerli } from '@wagmi/core/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import Head from 'next/head';

export default function Connect() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
        chainId: goerli.id,
    });
    const { isConnected } = useAccount();
    const router = useRouter();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted && !isConnected) {
            const metaMaskConnector = connectors.find(connector => connector instanceof MetaMaskConnector);

            // Debug: Check if the MetaMask connector is found
            console.log('MetaMask Connector:', metaMaskConnector);

            if (metaMaskConnector) {
                connect({ connector: metaMaskConnector });
            } else {
                console.error('MetaMask Connector not found in connectors array.');
            }
        }
    }, [hasMounted, isConnected, connect, connectors]);

    // if (isConnected) {
    //     router.replace('/');
    //     return null;
    // }

    if (!hasMounted) return null;

    return (
        <div>
            <Head>
                <title>Connect Wallet</title>
            </Head>
            <div className="jumbotron">
                <h1>My USDC Payment Gate App</h1>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        Connect Wallet
                        {!connector.ready && ' (unsupported) '}
                        {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                    </button>
                ))}
                {error && <div>{error.message}</div>}
            </div>
        </div>
    );
}
