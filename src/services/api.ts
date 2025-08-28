import type { Property } from '../types/Property'

interface PhotoResponse {
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

// Simulate real estate API using JSONPlaceholder + transformation
export const fetchPropertiesFromAPI = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos?_limit=6`)
    const photos = await response.json()

    // Transform generic photo data into property data
    return photos.map((photo: PhotoResponse, index: number) => ({
      id: photo.id.toString(),
      title: generatePropertyTitle(index),
      price: generatePrice(index),
      location: generateLocation(index),
      imageUrl: photo.url,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      sqft: Math.floor(Math.random() * 2000) + 800,
      isAvailable: Math.random() > 0.3, // 70% available
      tokenAddress: Math.random() > 0.5 ? `0x${Math.random().toString(16).slice(2, 10)}...` : undefined
    }))
  } catch (error) {
    console.error('Failed to fetch properties:', error)
    throw new Error('Failed to load properties from API')
  }
}

const propertyTitles = [
  'Modern Downtown Condo',
  'Luxury Penthouse',
  'Suburban Family Home',
  'Waterfront Villa',
  'City Loft',
  'Mountain Retreat'
]

const locations = [
  'Manhattan, NY',
  'Beverly Hills, CA',
  'Austin, TX',
  'Miami, FL',
  'Seattle, WA',
  'Denver, CO'
]

const generatePropertyTitle = (index: number): string => 
  propertyTitles[index % propertyTitles.length]

const generateLocation = (index: number): string => 
  locations[index % locations.length]

const generatePrice = (index: number): string => {
  const prices = ['1.2', '3.5', '0.8', '5.2', '2.1', '4.7']
  return prices[index % prices.length]
}