import { ElementType } from 'react'

export interface Navlinks {
  href?: string
  label: string
  children?: (Navlinks & {
    icon?: ElementType
    description?: string
  })[]
}
