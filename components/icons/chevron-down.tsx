import { cn } from '@/lib/utils'
import React from 'react'
import type { SVGProps } from 'react'

export function PixelChevronDown({
  className,
  fill = 'currentColor',
  stroke,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(
        'size-4 origin-center transition-transform duration-200',
        className,
      )}
      fill={fill || 'currentColor'}
      stroke={stroke}
      {...props}
    >
      <path d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7z" />
    </svg>
  )
}
