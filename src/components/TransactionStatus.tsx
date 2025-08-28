import { useAppSelector, useAppDispatch } from '../store/hooks'
import { clearCurrentTransaction } from '../store/slices/transactionsSlice'
import type { Transaction } from '../store/slices/transactionsSlice'

export default function TransactionStatus() {
  const dispatch = useAppDispatch()
  const { currentTransaction } = useAppSelector((state) => state.transactions)

  if (!currentTransaction) return null

  const handleClose = () => {
    if (currentTransaction.status !== 'pending') {
      dispatch(clearCurrentTransaction())
    }
  }

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200'
      case 'success': return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200'
      case 'failed': return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200'
    }
  }

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'pending': return 'Transaction Pending...'
      case 'success': return 'Transaction Successful!'
      case 'failed': return 'Transaction Failed'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`p-4 rounded-lg border ${getStatusColor(currentTransaction.status)}`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold">{getStatusText(currentTransaction.status)}</h4>
          {currentTransaction.status !== 'pending' && (
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
        
        <p className="text-sm mb-1">Property: {currentTransaction.propertyTitle}</p>
        <p className="text-sm mb-1">Amount: {currentTransaction.amount} ETH</p>
        
        {currentTransaction.status === 'pending' && (
          <div className="mt-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent mr-2"></div>
            <span className="text-sm">Processing...</span>
          </div>
        )}
        
        {currentTransaction.hash && (
          <p className="text-xs mt-2 opacity-75">
            Hash: {currentTransaction.hash.slice(0, 10)}...
          </p>
        )}
      </div>
    </div>
  )
}