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
import { NAVBAR_ANIMATION_CONFIG } from '@/lib/utilities/motion'
import { NAVIGATION_LINKS } from '@/lib/utilities/navlinks'
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
    <header className="fixed top-0 z-50 w-full border-b">
      <nav className="bg-background/60 container flex items-center justify-between py-2 backdrop-blur-md lg:rounded-sm">
        <LogoComponent />

        <div
          ref={linksContainerRef}
          className="relative hidden gap-2.5 text-sm lg:flex"
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated highlight background */}
          <AnimatePresence>
            {highlightStyle.visible && (
              <motion.div
                layout
                className="bg-accent absolute z-0 rounded-sm"
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
            {NAVIGATION_LINKS.map(({ href, label, children }: Navlinks) => {
              if (href) {
                return (
                  <li
                    key={href}
                    className={cn(
                      'text-muted-foreground hover:text-secondary z-10 p-2 transition-colors',
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
                    'text-muted-foreground hover:text-secondary relative z-10 p-2',
                  )}
                  onMouseEnter={(e) => {
                    setActiveDropdown(label)
                    handleMouseEnter(e)
                  }}
                  onMouseLeave={() => handleDropdownLeave()}
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
                  </span>
                  <DropdownMenu isActive={activeDropdown === label}>
                    {children}
                  </DropdownMenu>
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
