import PropertyCardSkeleton from './components/PropertyCardSkeleton'
import PropertyFilters from './components/PropertyFilters'
import TransactionStatus from './components/TransactionStatus'
import TransactionHistory from './components/TransactionHistory'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import PropertyCard from './components/PropertyCard'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { fetchProperties, setSearchQuery, setShowAvailableOnly } from './store/slices/propertiesSlice'
import { buyProperty } from './store/slices/transactionsSlice'
import type { Property } from './types/Property'

function App() {
  const { isConnected } = useAccount()
  const dispatch = useAppDispatch()
  const { filteredProperties, loading, error } = useAppSelector((state) => state.properties)

  // Fetch properties when wallet connects
  useEffect(() => {
    if (isConnected) {
      dispatch(fetchProperties())
    }
  }, [isConnected, dispatch])

  const handleBuyProperty = (property: Property) => {
    dispatch(buyProperty({
      propertyId: property.id,
      propertyTitle: property.title,
      price: property.price
    }))
  }

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const handleFilterAvailable = (availableOnly: boolean) => {
    dispatch(setShowAvailableOnly(availableOnly))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PropChain</h1>
          <ConnectButton />
        </div>
      </header>

      {/* Transaction Status Overlay */}
      <TransactionStatus />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect your wallet to browse and purchase tokenized properties
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Available Properties</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover tokenized real estate opportunities
              </p>
            </div>

            <PropertyFilters 
              onSearch={handleSearch}
              onFilterAvailable={handleFilterAvailable}
            />

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-red-800 dark:text-red-200">
                  Error: {error}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                </>
              ) : (
                filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onBuyClick={handleBuyProperty}
                  />
                ))
              )}
            </div>

            {/* Transaction History */}
            <div className="mt-12">
              <TransactionHistory />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App