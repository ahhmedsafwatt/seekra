import { AnimatePresence, motion } from 'motion/react'

import { createElement } from 'react'
import Link from 'next/link'
import { Navlinks } from '@/lib/utilities/types'
import { NAVBAR_ANIMATION_CONFIG } from '@/lib/utilities/motion'

export const DropdownMenu = ({
  children,
  isActive,
}: {
  children: Navlinks['children']
  isActive: boolean
}) => (
  <AnimatePresence>
    {isActive && (
      <motion.ul
        {...NAVBAR_ANIMATION_CONFIG.dropdown}
        className="bg-background absolute -left-1/2 top-10 flex -translate-x-1/4 flex-row gap-4 rounded-md border px-6 py-5 xl:-translate-x-1/3 xl:gap-6 xl:px-8 xl:py-6"
      >
        {children?.map(({ href, label, icon, description }) => (
          <motion.li
            key={href}
            {...NAVBAR_ANIMATION_CONFIG.dropdownItem}
            className="text-muted-foreground bg-accent group flex min-w-44 cursor-pointer flex-col items-center gap-12 rounded-md p-4 transition-colors duration-200 xl:min-w-56 xl:max-w-52 xl:p-5"
          >
            <Link href={href!} className="flex flex-col items-center gap-12">
              {icon
                ? createElement(icon, {
                    className:
                      'size-14 xl:size-18 group-hover:text-primary transition-colors duration-200 pt-4 box-content',
                    fill: 'currentColor',
                  })
                : null}

              <div className="flex flex-col items-start space-y-1">
                <span className="text-foreground group-hover:text-primary font-serif text-sm font-bold leading-tight transition-colors duration-200 xl:text-base">
                  {label}
                </span>
                <span className="text-xs font-medium leading-relaxed xl:text-sm">
                  {description}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
)
