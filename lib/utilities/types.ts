import { ElementType } from 'react'

export interface Navlinks {
  href?: string
  label: string
  children?: (Navlinks & {
    icon?: ElementType
    description?: string
  })[]
}

export type PricingInterval = 'monthly' | 'yearly' | 'one-time'

export interface PricingTier {
  name: string
  price: number | 'Custom'
  interval?: PricingInterval
  features: string[]
  limits?: {
    apiCalls?: number
    users?: number
    storage?: string
  }
  highlighted?: boolean
}

export type Provider =
  | 'OpenAI'
  | 'Anthropic'
  | 'Google'
  | 'Meta'
  | 'Stability'
  | 'Custom'
  | 'Proprietary'

export interface AIModel {
  name: string
  version?: string
  provider: Provider
}

export type IntegrationType = 'native' | 'api' | 'webhook' | 'plugin'

export interface Integration {
  name: string
  type: IntegrationType
  icon?: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  pros: string[]
  cons: string[]
  verifiedUser: boolean
  helpfulCount: number
  createdAt: string // ISO date string
  usageTime?: string // "1 month", "6 months", etc.
}

export type FeatureCategory = 'core' | 'advanced' | 'unique'

export interface ToolFeature {
  id: string
  title: string
  description: string
  category: FeatureCategory
  available: boolean
}

export interface Compliance {
  gdpr: boolean
  ccpa: boolean
  soc2: boolean
  hipaa: boolean
  iso27001: boolean
}

export interface ToolStats {
  totalUsers?: number
  githubStars?: number
  producthuntVotes?: number
  founded: number
}

export type ToolCategory =
  | 'Writing'
  | 'Image Generation'
  | 'Video'
  | 'Audio'
  | 'Code'
  | 'Data Analysis'
  | 'Chatbot'
  | 'Productivity'
  | 'Marketing'
  | 'Design'

export type PricingType =
  | 'Free'
  | 'Open-Source'
  | 'Freemium'
  | 'Paid'
  | 'Enterprise'

export interface AITool {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string // emoji or url
  website: string
  category: ToolCategory
  subCategories: string[]
  pricing: PricingType
  startingPrice?: number
  pricingTiers: PricingTier[]
  aiModels: AIModel[]
  features: ToolFeature[]
  integrations: Integration[]
  hasApi: boolean
  apiDocUrl?: string
  compliance: Compliance
  stats: ToolStats
  rating: number
  reviewCount: number
  reviews?: Review[]
  pros: string[]
  cons: string[]
  useCases: string[]
  alternatives: string[] // Tool IDs
  lastUpdated: string // ISO date string
  affiliateUrl?: string
  tags: string[]
}

export interface FilterOptions {
  category?: string
  pricing?: PricingType[]
  features?: string[]
  compliance?: string[]
  minRating?: number
  hasApi?: boolean
  sortBy?: 'popular' | 'newest' | 'rating' | 'price'
}
