import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Transaction {
  id: string
  propertyId: string
  propertyTitle: string
  amount: string
  status: 'pending' | 'success' | 'failed'
  hash?: string
  timestamp: number
}

interface TransactionsState {
  transactions: Transaction[]
  currentTransaction: Transaction | null
}

const initialState: TransactionsState = {
  transactions: [],
  currentTransaction: null,
}

// Simulate buying a property
export const buyProperty = createAsyncThunk(
  'transactions/buyProperty',
  async ({ propertyId, propertyTitle, price }: { propertyId: string, propertyTitle: string, price: string }) => {
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simulate random success/failure (90% success rate)
    const success = Math.random() > 0.1
    
    if (!success) {
      throw new Error('Transaction failed - insufficient gas or user rejected')
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      propertyId,
      propertyTitle,
      amount: price,
      status: 'success',
      hash: `0x${Math.random().toString(16).slice(2)}`,
      timestamp: Date.now(),
    }

    return transaction
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearCurrentTransaction: (state) => {
      state.currentTransaction = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyProperty.pending, (state, action) => {
        state.currentTransaction = {
          id: 'pending',
          propertyId: action.meta.arg.propertyId,
          propertyTitle: action.meta.arg.propertyTitle,
          amount: action.meta.arg.price,
          status: 'pending',
          timestamp: Date.now(),
        }
      })
      .addCase(buyProperty.fulfilled, (state, action) => {
        state.currentTransaction = null
        state.transactions.unshift(action.payload)
      })
      .addCase(buyProperty.rejected, (state) => {
        if (state.currentTransaction) {
          state.currentTransaction.status = 'failed'
        }
      })
  },
})

export const { clearCurrentTransaction } = transactionsSlice.actions
export default transactionsSlice.reducer