import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

function App() {
  const { isConnected, address } = useAccount()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">PropChain</h1>
      
      <ConnectButton />
      
      {isConnected && (
        <div className="mt-8 text-center">
          <p className="text-green-400"> Wallet Connected!</p>
          <p className="text-sm text-gray-400 mt-2">
            Address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
