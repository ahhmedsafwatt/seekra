'use client'
import { useMemo, useState, useRef } from 'react'
import SeekraLogo from './SeekraLogo'
import Logo from './Logo'
import { MenuIcon } from './menu-icon'
import { Button } from './button'
import { ChevronDownIcon, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { SiBuymeacoffee } from 'react-icons/si'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IoMdArrowDropup } from 'react-icons/io'

interface Navlinks {
  href?: string
  label: string
  children?: (Navlinks & { icon?: React.ReactNode; description?: string })[]
}

const links: Navlinks[] = [
  {
    label: 'Browse',
    children: [
      {
        href: '/chatbots',
        label: 'Chatbots',
        icon: 'image',
      },
      {
        href: '/ai-agents',
        label: 'AI Agents',
        icon: 'robot',
      },
      {
        href: '/video-generators',
        label: 'Video Generators',
        icon: 'video',
      },
      {
        href: '/image-generators',
        label: 'Image Generators',
        icon: 'image',
      },
      {
        href: '/audio-generators',
        label: 'Audio Generators',
      },
    ],
  },
  {
    href: '/self-hosted',
    label: 'Self-hosted',
  },
  {
    href: '/advertise',
    label: 'Advertise',
  },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number
    top: number
    width: number
    height: number
    visible: boolean
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  })
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const toggleMenu = useMemo(() => {
    ;() => {
      setIsMenuOpen((prev) => !prev)
    }
  }, [isMenuOpen])

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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
  }

  const handleMouseLeave = () => {
    setHighlightStyle((prev) => ({ ...prev, visible: false }))
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b">
      {/* Mobile menu icon */}
      <nav className="bg-background/60 container flex items-center justify-between py-2 backdrop-blur-md lg:rounded-sm">
        <div className="flex items-center gap-4 lg:gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-bold"
          >
            <Logo size={24} />
            <SeekraLogo width={64} height={18} className="inline-block" />
          </Link>
        </div>
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
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="bg-accent absolute z-0 rounded-sm"
                initial={{
                  opacity: 0.5,
                  scale: 1.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                }}
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
            {links.map(({ href, label, children }: Navlinks) => {
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
                  className={cn('relative z-10 p-2')}
                  onMouseEnter={(e) => {
                    setActiveDropdown(label)
                    handleMouseEnter(e)
                  }}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span
                    className={cn(
                      'text-muted-foreground hover:text-secondary flex cursor-pointer items-center gap-1 transition-colors',
                    )}
                  >
                    {label}
                    <ChevronDownIcon
                      size={16}
                      className={cn('transition-transform duration-200', {
                        'rotate-180': activeDropdown === label,
                      })}
                    />
                  </span>
                  <AnimatePresence>
                    {activeDropdown === label && (
                      <motion.ul
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.625, 0.05, 0, 1],
                        }}
                        className="absolute left-0 top-12 w-56 rounded-md border p-2 shadow-lg"
                      >
                        <IoMdArrowDropup className="absolute left-[50%] top-0 size-9 h-8 w-full -translate-x-[50%] -translate-y-[60%]" />
                        {children?.map(({ href, label, icon }) => (
                          <motion.li
                            key={href}
                            className="py-1"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: 0.2,
                              ease: [0.625, 0.05, 0, 1],
                            }}
                          >
                            <Link
                              href={href ?? ''}
                              className="group flex w-full items-center gap-2 rounded-md text-xs transition-colors duration-300"
                            >
                              <span className="rounded-md border p-[4px] transition-colors">
                                <span className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                                  {icon}
                                </span>
                              </span>
                              <span>{label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Search
              className="text-muted-foreground hover:bg-accent hover:text-secondary box-content cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
              size={18}
            />
            <SiBuymeacoffee
              size={18}
              className="text-muted-foreground hover:bg-accent hover:text-secondary box-content cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
            />
            <Button
              asChild
              size="sm"
              className="rounded-sm duration-200 ease-out hover:scale-95"
            >
              <a href="/submit">Submit</a>
            </Button>
          </div>
          <MenuIcon
            isMenuOpen={isMenuOpen}
            toggleMenu={() => toggleMenu}
            className="cursor-pointer lg:hidden"
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
