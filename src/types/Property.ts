export interface Property {
    id: string
    title: string
    price: string // in ETH
    location: string
    imageUrl: string
    bedrooms: number
    bathrooms: number
    sqft: number
    isAvailable: boolean
    tokenAddress?: string // Smart contract address
}