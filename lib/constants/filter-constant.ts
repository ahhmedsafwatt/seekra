import { parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs'
import { ToolCategory } from '@/lib/utilities/types'
import { Enums } from '../utilities/types.database'

export const CATEGORIES: { label: ToolCategory; value: string }[] = [
  { label: 'Writing', value: 'writing' },
  { label: 'Image Generation', value: 'image_generation' },
  { label: 'Video', value: 'video' },
  { label: 'Audio', value: 'audio' },
  { label: 'Code', value: 'code' },
  { label: 'Data Analysis', value: 'data_analysis' },
  { label: 'Chatbot', value: 'chatbot' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Design', value: 'design' },
]
export const PARSE_CATEGORY_OPTIONS = parseAsArrayOf(parseAsString).withDefault(
  [],
)

export const PRICING_OPTIONS: {
  label: string
  value: Enums<'pricing_type_enum'>
}[] = [
  { label: 'Free', value: 'free' },
  { label: 'Open Source', value: 'open_source' },
  { value: 'freemium', label: 'Freemium' },
  { label: 'Paid', value: 'paid' },
]

export const PARSE_PRICING_OPTIONS = parseAsArrayOf(parseAsString).withDefault(
  [],
)

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price (A to Z)' },
  { value: 'price-desc', label: 'Price (Z to A)' },
  { value: 'pageviews', label: 'Most Poupular' },
]
export const PARSE_SORT_OPTIONS = parseAsStringEnum<
  'latest' | 'rating' | 'price-asc' | 'price-desc' | 'popular'
>(SORT_OPTIONS.map((o) => o.value) as any).withDefault('latest')
