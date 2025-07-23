import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { WagmiProvider, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

const wagmiConfig = getDefaultConfig({
  appName: 'PropChain',
  projectId: 'demo-project-id',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)