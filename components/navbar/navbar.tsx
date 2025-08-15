'use client'
import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PixelChevronDown, MenuIcon } from '../icons/index'
import { MobileNav } from '@/components/navbar/mobile-nav'
import { LogoComponent } from '../ui/logo'
import { DropdownMenu } from './drop-down'
import { ActionButtons } from './action-buttons'
import { NAVBAR_ANIMATION_CONFIG } from '@/lib/constants/motion'
import { NAVIGATION_LINKS } from '@/lib/constants/navlinks'
import { Navlinks } from '@/lib/utilities/types'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  })

  const linksContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const linkRect = e.currentTarget.getBoundingClientRect()
    const containerRect = linksContainerRef.current?.getBoundingClientRect()

    if (containerRect) {
      setHighlightStyle({
        left: linkRect.left - containerRect.left,
        top: linkRect.top - containerRect.top,
        width: linkRect.width,
        height: linkRect.height,
        visible: true,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHighlightStyle((prev) => ({ ...prev, visible: false }))
  }, [])

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header
      className={cn(
        'bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur-md',
        {
          'border-none backdrop-blur-none': isMenuOpen,
        },
      )}
    >
      <nav className={cn('container flex items-center justify-between py-2')}>
        <LogoComponent />

        <div
          ref={linksContainerRef}
          className="relative z-30 hidden gap-2.5 text-sm lg:flex"
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {highlightStyle.visible && (
              <motion.div
                layout
                className="bg-accent absolute z-30 rounded-sm"
                {...NAVBAR_ANIMATION_CONFIG.highlight}
                style={{
                  left: highlightStyle.left,
                  top: highlightStyle.top,
                  width: highlightStyle.width,
                  height: highlightStyle.height,
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
          <ul className="hidden items-center gap-2 lg:flex">
            {NAVIGATION_LINKS.map(({ href, label }: Navlinks) => {
              if (href) {
                return (
                  <li
                    key={href}
                    className={cn(
                      'text-muted-foreground hover:text-secondary-foreground z-50 p-2 transition-colors',
                    )}
                    onMouseEnter={handleMouseEnter}
                  >
                    {href && <Link href={href}>{label}</Link>}
                  </li>
                )
              }
              return (
                <li
                  key={label}
                  className={cn(
                    'text-muted-foreground hover:text-foreground relative z-50 p-2',
                  )}
                  onMouseEnter={(e) => {
                    setActiveDropdown(label)
                    handleMouseEnter(e)
                  }}
                  onMouseLeave={handleDropdownLeave}
                >
                  <span
                    className={cn(
                      'flex cursor-pointer items-center gap-1 transition-colors',
                    )}
                  >
                    {label}
                    <PixelChevronDown
                      fill="currentColor"
                      className={cn(
                        'size-4 origin-center transition-transform duration-200',
                        {
                          'rotate-180': activeDropdown === label,
                        },
                      )}
                    />
                  </span>{' '}
                  <AnimatePresence>
                    {activeDropdown && (
                      <DropdownMenu isActive={!!activeDropdown}>
                        {
                          NAVIGATION_LINKS.find(
                            (link) => link.label === activeDropdown,
                          )?.children
                        }
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <ActionButtons />
          <MenuIcon
            isMenuOpen={isMenuOpen}
            toggleMenu={() => toggleMenu()}
            className="cursor-pointer lg:hidden"
          />
        </div>
      </nav>
      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => closeMenu()}
        links={NAVIGATION_LINKS}
      />
    </header>
  )
}
