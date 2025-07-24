import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Navlinks } from '@/lib/utilities/types'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: Navlinks[]
}

export const MobileNav = ({ isOpen, onClose, links }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 flex lg:hidden"
        >
          {/* Drawer */}
          <nav className="bg-background relative ml-auto flex h-full w-4/5 max-w-xs flex-col p-6 shadow-xl">
            <button
              className="text-muted-foreground mb-6 self-end text-2xl font-bold"
              onClick={onClose}
              aria-label="Close menu"
            >
              &times;
            </button>
            <ul className="flex flex-col gap-4">
              {links.map(({ href, label, children }) =>
                href ? (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-foreground hover:bg-accent block rounded px-3 py-2 text-lg font-medium"
                      onClick={onClose}
                    >
                      {label}
                    </Link>
                  </li>
                ) : (
                  <li key={label}>
                    <span className="text-muted-foreground block px-3 py-2 text-lg font-semibold">
                      {label}
                    </span>
                    {children && (
                      <ul className="border-accent ml-2 mt-1 flex flex-col gap-2 border-l pl-3">
                        {children.map((child: Navlinks) => (
                          <li key={child.href}>
                            <Link
                              href={child.href!}
                              className="text-foreground hover:bg-accent block rounded px-2 py-1 text-base"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
