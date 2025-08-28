import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Property } from '../../types/Property'
import { fetchPropertiesFromAPI } from '../../services/api'

interface PropertiesState {
  properties: Property[]
  filteredProperties: Property[]
  loading: boolean
  error: string | null
  searchQuery: string
  showAvailableOnly: boolean
}

const initialState: PropertiesState = {
  properties: [],
  filteredProperties: [],
  loading: false,
  error: null,
  searchQuery: '',
  showAvailableOnly: false,
}

// Helper function to filter properties
const filterProperties = (properties: Property[], searchQuery: string, showAvailableOnly: boolean) => {
  return properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAvailability = !showAvailableOnly || property.isAvailable
    return matchesSearch && matchesAvailability
  })
}

// Async thunk for fetching properties from real API
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => {
    const properties = await fetchPropertiesFromAPI()
    return properties
  }
)

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.filteredProperties = filterProperties(state.properties, state.searchQuery, state.showAvailableOnly)
    },
    setShowAvailableOnly: (state, action) => {
      state.showAvailableOnly = action.payload
      state.filteredProperties = filterProperties(state.properties, state.searchQuery, state.showAvailableOnly)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false
        state.properties = action.payload
        state.filteredProperties = filterProperties(action.payload, state.searchQuery, state.showAvailableOnly)
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch properties'
      })
  },
})

export const { clearError, setSearchQuery, setShowAvailableOnly } = propertiesSlice.actions
export default propertiesSlice.reducer