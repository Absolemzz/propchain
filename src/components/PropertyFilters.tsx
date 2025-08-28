import { useState } from 'react'

interface PropertyFiltersProps {
  onSearch: (query: string) => void
  onFilterAvailable: (availableOnly: boolean) => void
}

export default function PropertyFilters({ onSearch, onFilterAvailable }: PropertyFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setShowAvailableOnly(checked)
    onFilterAvailable(checked)
  }

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={handleFilterChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Available only
          </span>
        </label>
      </div>
    </div>
  )
}