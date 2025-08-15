'use client'
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'
import { useState } from 'react'
import {
  PARSE_CATEGORY_OPTIONS,
  PARSE_PRICING_OPTIONS,
  PARSE_SORT_OPTIONS,
} from '@/lib/constants/filter-constant'
import { FilterChips } from '@/components/search/filter-chips'
import { FiltersPanel } from '@/components/search/filters-panel'
import { SearchBar } from '@/components/search/search-bar'
import { SortSelect } from '@/components/search/sort-select'
import { toggleInArrayOrNull } from '@/lib/utils'

export function ToolsSearch() {
  const [open, setOpen] = useState(false)

  const [searchParams, setSearchParams] = useQueryStates({
    q: parseAsString.withDefault(''),
    categories: PARSE_CATEGORY_OPTIONS,
    pricing: PARSE_PRICING_OPTIONS,
    sort: PARSE_SORT_OPTIONS,
    page: parseAsInteger.withDefault(1),
  })

  // Destructure searchParams for easier access
  const { q, categories, pricing, sort, page } = searchParams

  // Generic update function with pagination reset
  const updateSearch = (updates: Partial<typeof searchParams>) => {
    setSearchParams({
      ...updates,
      page: 1, // Reset page when search changes
    })
  }

  // Clear all filters and search
  const clearAll = () => {
    setSearchParams({
      q: '',
      categories: null,
      pricing: null,
      sort: 'latest',
      page: 1,
    })
  }

  // Individual setter functions for component props
  const handleQueryChange = (value: string | null) => {
    updateSearch({ q: value || '' })
  }

  const handleSortChange = (value: any) => {
    updateSearch({ sort: value })
  }

  const handleCategoriesChange = (newCategories: string[] | null) => {
    setSearchParams({
      categories: newCategories,
      page: 1, // Reset pagination
    })
  }

  const handlePricingChange = (newPricing: string[] | null) => {
    setSearchParams({
      pricing: newPricing,
      page: 1, // Reset pagination
    })
  }

  return (
    <div className="container border-x border-dashed pt-12">
      <div className="flex gap-3">
        <SearchBar value={q} onChange={handleQueryChange} />
        <SortSelect value={sort} onChange={handleSortChange} />
      </div>

      <FiltersPanel
        open={open}
        onToggle={() => setOpen(!open)}
        categories={categories}
        onCategoriesChange={handleCategoriesChange}
        pricing={pricing}
        onPricingChange={handlePricingChange}
      />

      {(pricing.length > 0 || categories.length > 0) && (
        <FilterChips
          categories={categories}
          pricing={pricing}
          onRemoveCategory={(cat: string) =>
            setSearchParams({
              categories: toggleInArrayOrNull(categories, cat),
              page: 1,
            })
          }
          onRemovePricing={(p: string) =>
            setSearchParams({
              pricing: toggleInArrayOrNull(pricing, p),
              page: 1,
            })
          }
          onClearAll={clearAll}
        />
      )}
    </div>
  )
}
