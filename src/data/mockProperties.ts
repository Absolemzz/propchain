import type { Property } from '../types/Property'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Condo',
    price: '2.5',
    location: 'Manhattan, NY',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    isAvailable: true,
    tokenAddress: '0x1234...5678'
  },  
  {
    id: '2',
    title: 'Luxury Penthouse',
    price: '8.0',
    location: 'Beverly Hills, CA',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    isAvailable: false
  }
]