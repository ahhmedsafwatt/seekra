'use client'
import { useMemo, useState, useRef, ElementType, createElement } from 'react'
import { Button } from './button'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SiBuymeacoffee } from 'react-icons/si'
import {
  PixelChevronDown,
  Chatbot,
  Logo,
  MenuIcon,
  SearchIcon,
  SeekraLogo,
  AiAgnet,
  ImageGaneration,
  VideoGaneration,
  AudioGaneration,
} from '../icons/index'

interface Navlinks {
  href?: string
  label: string
  children?: (Navlinks & {
    icon?: ElementType
    description?: string
  })[]
}

const links: Navlinks[] = [
  {
    label: 'Browse',
    children: [
      {
        href: '/chatbots',
        label: 'Chatbots',
        icon: Chatbot,
        description: 'Explore a variety of chatbots for different purposes.',
      },
      {
        href: '/ai-agents',
        label: 'AI Agents',
        icon: AiAgnet,
        description: 'Discover AI agents that can perform tasks autonomously.',
      },
      {
        href: '/video-generators',
        label: 'Video Generators',
        icon: VideoGaneration,
        description: 'Explore a variety of video generation tools.',
      },
      {
        href: '/image-generators',
        label: 'Image Generators',
        icon: ImageGaneration,
        description: 'Explore a variety of image generation tools.',
      },
      {
        href: '/audio-generators',
        label: 'Audio Generators',
        icon: AudioGaneration,
        description: 'Discover tools for generating audio content.',
      },
    ],
  },
  {
    href: '/self-hosted',
    label: 'Self-hosted',
  },
  {
    href: '/categories',
    label: 'Categories',
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
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-xl font-bold"
        >
          <Logo size={24} />
          <SeekraLogo width={64} height={18} className="inline-block" />
        </Link>

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
                  className={cn(
                    'text-muted-foreground hover:text-secondary relative z-10 p-2',
                  )}
                  onMouseEnter={(e) => {
                    setActiveDropdown(label)
                    handleMouseEnter(e)
                  }}
                  onMouseLeave={() => setActiveDropdown(null)}
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
                  <AnimatePresence>
                    {activeDropdown === label && (
                      <motion.ul
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{
                          type: 'tween',
                          duration: 0.22,
                          ease: 'easeOut',
                        }}
                        className="bg-background absolute -left-1/2 top-10 flex -translate-x-1/4 flex-row gap-4 rounded-md border px-6 py-5 xl:-translate-x-1/3 xl:gap-6 xl:px-8 xl:py-6"
                      >
                        {children?.map(({ href, label, icon, description }) => (
                          <motion.li
                            key={href}
                            initial={{
                              opacity: 0.5,
                              x: 20,
                              filter: 'blur(12px)',
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              filter: 'blur(0px)',
                            }}
                            whileHover={{
                              scale: 0.97,
                              transition: {
                                duration: 0.2,
                                type: 'spring',

                                stiffness: 230,
                              },
                            }}
                            className="text-muted-foreground bg-accent group flex min-w-44 cursor-pointer flex-col items-center gap-12 rounded-md p-4 transition-colors duration-200 xl:min-w-56 xl:max-w-52 xl:p-5"
                          >
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <SearchIcon
              fill="currentColor"
              className="text-muted-foreground hover:bg-accent hover:text-secondary box-content size-5 cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
            />
            <SiBuymeacoffee
              size={18}
              className="text-muted-foreground hover:bg-accent hover:text-secondary box-content cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
            />
            <Button
              asChild
              size="sm"
              className="ml-1 rounded-sm duration-200 ease-out hover:scale-95"
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
