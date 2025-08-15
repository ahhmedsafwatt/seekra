import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toggleInArrayOrNull(
  current: string[],
  value: string,
): string[] | null {
  if (current.includes(value)) {
    const next = current.filter((v) => v !== value)
    return next.length ? next : null
  }
  return [...current, value]
}
