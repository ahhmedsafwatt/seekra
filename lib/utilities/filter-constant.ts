import { parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs'
import { ToolCategory, PricingType } from './types'

export const CATEGORIES: ToolCategory[] = [
  'Writing',
  'Image Generation',
  'Video',
  'Audio',
  'Code',
  'Data Analysis',
  'Chatbot',
  'Productivity',
  'Marketing',
  'Design',
]
export const PARSE_CATEGORY_OPTIONS = parseAsArrayOf(parseAsString).withDefault(
  [],
)

export const PRICING_OPTIONS: PricingType[] = [
  'Free',
  'Open-Source',
  'Freemium',
  'Paid',
  'Enterprise',
]

export const PARSE_PRICING_OPTIONS = parseAsArrayOf(parseAsString).withDefault(
  [],
)

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price (A to Z)' },
  { value: 'price-desc', label: 'Price (Z to A)' },
  { value: 'popular', label: 'Popularity' },
]
export const PARSE_SORT_OPTIONS = parseAsStringEnum<
  'latest' | 'rating' | 'price-asc' | 'price-desc' | 'popular'
>(SORT_OPTIONS.map((o) => o.value) as any).withDefault('latest')
