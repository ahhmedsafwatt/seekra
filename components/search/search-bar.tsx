'use client'
import { useEffect, useMemo, useState, memo } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { SearchIcon } from '../icons'

interface SearchBarProps {
  value: string
  onChange: (next: string | null) => void
}

function SearchBarImpl({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState<string>(value ?? '')
  const debounceMs = 300

  // Keep local state in sync if value from URL changes externally
  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value])

  // Debounce outgoing updates
  useEffect(() => {
    const handle = setTimeout(() => {
      onChange(localValue ? localValue : null)
    }, debounceMs)
    return () => clearTimeout(handle)
  }, [localValue, onChange])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onChange(localValue ? localValue : null)
    }
  }

  return (
    <div className="relative flex-1">
      <Label htmlFor="q" className="sr-only">
        Search
      </Label>
      <SearchIcon
        fill="currentColor"
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 md:left-2 md:size-5"
      />
      <Input
        className="pl-10 text-sm placeholder:text-sm md:text-base"
        id="q"
        placeholder={'Search tools...'}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export const SearchBar = memo(SearchBarImpl)
