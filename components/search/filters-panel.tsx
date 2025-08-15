'use client'
import { memo, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { PixelChevronDown } from '../icons'
import { FILTER_ANIMATION_CONFIG } from '@/lib/constants/motion'
import { CATEGORIES, PRICING_OPTIONS } from '@/lib/constants/filter-constant'
import { cn, toggleInArrayOrNull } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'

interface FiltersPanelProps {
  open: boolean
  onToggle: () => void
  categories: string[]
  onCategoriesChange: (next: string[] | null) => void
  pricing: string[]
  onPricingChange: (next: string[] | null) => void
}

function toDomId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function FiltersPanelImpl({
  open,
  onToggle,
  categories,
  onCategoriesChange,
  pricing,
  onPricingChange,
}: FiltersPanelProps) {
  const [categoryQuery, setCategoryQuery] = useState('')

  const filteredCategoryOptions = useMemo(
    () =>
      CATEGORIES.filter(
        (cat) =>
          cat.label
            .toLowerCase()
            .includes(categoryQuery.trim().toLowerCase()) ||
          cat.value.toLowerCase().includes(categoryQuery.trim().toLowerCase()),
      ),
    [categoryQuery],
  )

  return (
    <motion.div
      className={cn(
        'mt-2 flex flex-col items-start gap-3 overflow-hidden rounded-md border transition-all duration-300',
        { 'p-3': open },
      )}
      {...FILTER_ANIMATION_CONFIG.container({ open })}
    >
      <div className={'flex w-full items-center justify-between gap-2'}>
        <Button
          variant="ghost"
          type="button"
          onClick={onToggle}
          className={cn('text-muted-foreground h-7 text-sm', {
            'dark:hover:bg-background': open,
          })}
          size={'sm'}
          aria-expanded={open}
          aria-controls="filters-panel"
        >
          Filters
          <PixelChevronDown className="size-4" />
        </Button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="filters-panel"
            aria-label="Filters"
            className="w-full"
            {...FILTER_ANIMATION_CONFIG.content}
          >
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
              <fieldset className="flex-1 rounded border">
                <legend className="sr-only">Categories</legend>
                <div className="p-2">
                  <Label htmlFor="category-search" className="sr-only">
                    Search categories
                  </Label>
                  <Input
                    id="category-search"
                    value={categoryQuery}
                    onChange={(e) => setCategoryQuery(e.target.value)}
                    placeholder="Find a category..."
                    className="h-4 rounded-none border-none bg-transparent text-sm focus-visible:ring-0 dark:bg-transparent"
                    type="search"
                  />
                </div>
                <Separator />
                <ScrollArea className="h-48">
                  <ul className="space-y-1 p-3">
                    {filteredCategoryOptions.map((cat) => {
                      const checked = categories.includes(cat.value)
                      const checkboxId = `cat-${toDomId(cat.value)}`
                      return (
                        <li key={cat.value}>
                          <Label
                            htmlFor={checkboxId}
                            className={cn(
                              'hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5',
                              { 'bg-muted/50': checked },
                            )}
                          >
                            <Checkbox
                              id={checkboxId}
                              checked={checked}
                              onCheckedChange={() =>
                                onCategoriesChange(
                                  toggleInArrayOrNull(categories, cat.value),
                                )
                              }
                            />
                            {cat.label}
                          </Label>
                        </li>
                      )
                    })}
                    {filteredCategoryOptions.length === 0 && (
                      <li className="text-muted-foreground p-2 text-sm">
                        No categories match your search.
                      </li>
                    )}
                  </ul>
                </ScrollArea>
              </fieldset>
              <fieldset className="rounded border sm:w-[30%]">
                <legend className="sr-only">Pricing</legend>
                <div className="text-muted-foreground p-1.5 text-sm">
                  Pricing
                </div>
                <Separator />
                <ul className="space-y-1 p-3">
                  {PRICING_OPTIONS.map((p) => {
                    const checked = pricing.includes(p.value)
                    const checkboxId = `price-${toDomId(p.value)}`
                    return (
                      <li key={p.value}>
                        <Label
                          htmlFor={checkboxId}
                          className={cn(
                            'hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5',
                            { 'bg-muted/50': checked },
                          )}
                        >
                          <Checkbox
                            id={checkboxId}
                            checked={checked}
                            onCheckedChange={() =>
                              onPricingChange(
                                toggleInArrayOrNull(pricing, p.value),
                              )
                            }
                          />
                          {p.label}
                        </Label>
                      </li>
                    )
                  })}
                </ul>
              </fieldset>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FiltersPanel = memo(FiltersPanelImpl)
