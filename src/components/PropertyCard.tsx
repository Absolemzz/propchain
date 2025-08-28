import type { Property } from '../types/Property'

interface PropertyCardProps {
  property: Property
  onBuyClick?: (property: Property) => void
}

export default function PropertyCard({ property, onBuyClick }: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img 
        src={property.imageUrl} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{property.location}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">{property.price} ETH</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            property.isAvailable 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {property.isAvailable ? 'Available' : 'Sold'}
          </span>
        </div>
        
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
        
        {property.isAvailable && onBuyClick && (
          <button 
            onClick={() => onBuyClick(property)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Buy Property
          </button>
        )}
      </div>
    </div>
  )
}