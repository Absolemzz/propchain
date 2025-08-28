import { useAppSelector } from '../store/hooks'
import type { Transaction } from '../store/slices/transactionsSlice'

export default function TransactionHistory() {
  const { transactions } = useAppSelector((state) => state.transactions)

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No transactions yet
        </p>
      </div>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200`
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-sm">{tx.propertyTitle}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(tx.timestamp)}
              </p>
              {tx.hash && (
                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                  {tx.hash.slice(0, 10)}...
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{tx.amount} ETH</p>
              <span className={getStatusBadge(tx.status)}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}