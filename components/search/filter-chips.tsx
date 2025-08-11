'use client'
import { memo } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterChipsProps {
  categories: string[]
  pricing: string[]
  onRemoveCategory: (cat: string) => void
  onRemovePricing: (price: string) => void
  onClearAll: () => void
}

function FilterChipsImpl({
  categories,
  pricing,
  onRemoveCategory,
  onRemovePricing,
  onClearAll,
}: FilterChipsProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {categories.map((cat) => (
        <span
          key={cat}
          className="bg-muted text-muted-foreground flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
        >
          {cat}
          <button
            type="button"
            aria-label={`Remove ${cat} filter`}
            title={`Remove ${cat}`}
            onClick={() => onRemoveCategory(cat)}
            className="inline-flex h-4 w-4 items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}
      {pricing.map((price) => (
        <span
          key={price}
          className="bg-muted text-muted-foreground flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
        >
          {price}
          <button
            type="button"
            aria-label={`Remove ${price} filter`}
            title={`Remove ${price}`}
            onClick={() => onRemovePricing(price)}
            className="inline-flex h-4 w-4 items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}{' '}
      <Button
        variant="outline"
        type="button"
        aria-label="Clear all filters"
        onClick={onClearAll}
        className={cn(
          'text-muted-foreground dark:bg-background h-fit rounded px-1.5 py-0.5 text-xs',
        )}
        size={'sm'}
      >
        Clear All
      </Button>
    </div>
  )
}

export const FilterChips = memo(FilterChipsImpl)
