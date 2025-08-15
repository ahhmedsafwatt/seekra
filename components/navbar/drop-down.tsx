import { motion } from 'motion/react'

import { createElement, forwardRef } from 'react'
import Link from 'next/link'
import { Navlinks } from '@/lib/utilities/types'
import { NAVBAR_ANIMATION_CONFIG } from '@/lib/constants/motion'

export const DropdownMenu = forwardRef<
  HTMLUListElement,
  {
    children: Navlinks['children']
    isActive: boolean
    onMouseLeave?: () => void
  }
>(({ children, isActive, onMouseLeave }, ref) => (
  <>
    {isActive && (
      <motion.ul
        ref={ref}
        onMouseLeave={onMouseLeave}
        {...NAVBAR_ANIMATION_CONFIG.dropdown}
        className="bg-muted fixed -top-2 left-0 -z-10 flex w-full justify-center gap-4 rounded-b-md px-6 xl:gap-6 xl:px-8"
      >
        {children?.map(({ href, label, icon, description }) => (
          <motion.li
            key={href}
            {...NAVBAR_ANIMATION_CONFIG.dropdownItem}
            className="text-muted-foreground bg-background group max-w-[11.5rem] cursor-pointer rounded-md px-3 py-5 transition-colors duration-200 xl:max-w-56"
          >
            <Link
              href={href!}
              className="flex h-full flex-col items-center justify-between gap-8"
            >
              {icon
                ? createElement(icon, {
                    className:
                      'size-20 group-hover:text-primary transition-colors duration-200 mt-8 box-content',
                    fill: 'currentColor',
                  })
                : null}

              <div className="flex flex-col items-start space-y-1.5">
                <span className="text-foreground group-hover:text-primary font-serif text-sm font-bold leading-tight transition-colors duration-200 xl:text-base">
                  {label}
                </span>
                <span className="group-hover:text-secondary-foreground text-xs font-medium leading-relaxed xl:text-sm">
                  {description}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    )}
  </>
))

DropdownMenu.displayName = 'DropdownMenu'
