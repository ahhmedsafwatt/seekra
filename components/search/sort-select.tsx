'use client'
import { memo } from 'react'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { SORT_OPTIONS } from '@/lib/utilities/filter-constant'

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
}

function SortSelectImpl({ value, onChange }: SortSelectProps) {
  return (
    <div>
      <Label htmlFor="sort" className="sr-only">
        Sort by
      </Label>
      <Select value={value} onValueChange={(v) => onChange(v)}>
        <SelectTrigger id="sort" aria-label="Sort by">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export const SortSelect = memo(SortSelectImpl)
