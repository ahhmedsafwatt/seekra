'use client'
import { useQueryState, parseAsString } from 'nuqs'
import { useState } from 'react'
import {
  PARSE_CATEGORY_OPTIONS,
  PARSE_PRICING_OPTIONS,
  PARSE_SORT_OPTIONS,
} from '@/lib/utilities/filter-constant'
import { FilterChips } from '@/components/search/filter-chips'
import { FiltersPanel } from '@/components/search/filters-panel'
import { SearchBar } from '@/components/search/search-bar'
import { SortSelect } from '@/components/search/sort-select'

export function ToolsSearch() {
  const [open, setOpen] = useState(false)

  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))
  const [categories, setCategories] = useQueryState(
    'categories',
    PARSE_CATEGORY_OPTIONS,
  )
  const [pricing, setPricing] = useQueryState('pricing', PARSE_PRICING_OPTIONS)
  const [sort, setSort] = useQueryState('sort', PARSE_SORT_OPTIONS)

  const toggleArrayValue = (
    value: string,
    current: string[],
    setter: (v: string[] | null) => void,
  ) => {
    if (current.includes(value)) {
      const next = current.filter((v) => v !== value)
      setter(next.length ? next : null)
    } else {
      setter([...current, value])
    }
  }

  const clearAll = () => {
    setQ('')
    setCategories(null)
    setPricing(null)
    setSort('latest')
  }

  return (
    <div className="container border-x border-dashed pt-12">
      <div className="flex gap-3">
        <SearchBar value={q} onChange={(v: string | null) => setQ(v)} />
        <SortSelect value={sort} onChange={(v: string) => setSort(v as any)} />
      </div>
      <FiltersPanel
        open={open}
        onToggle={() => setOpen(!open)}
        categories={categories}
        onCategoriesChange={setCategories}
        pricing={pricing}
        onPricingChange={setPricing}
      />
      {(pricing.length > 0 || categories.length > 0) && (
        <FilterChips
          categories={categories}
          pricing={pricing}
          onRemoveCategory={(cat: string) =>
            toggleArrayValue(cat, categories, setCategories)
          }
          onRemovePricing={(p: string) =>
            toggleArrayValue(p, pricing, setPricing)
          }
          onClearAll={clearAll}
        />
      )}
    </div>
  )
}
