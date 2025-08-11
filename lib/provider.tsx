'use client'
import { Analytics } from '@vercel/analytics/next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      {children}
      <Analytics />
    </NuqsAdapter>
  )
}
