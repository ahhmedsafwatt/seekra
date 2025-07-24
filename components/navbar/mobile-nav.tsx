import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Navlinks } from '@/lib/utilities/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { createElement } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: Navlinks[]
}

export const MobileNav = ({ isOpen, onClose, links }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/60 z-45 absolute inset-0 top-[50px] ml-auto flex h-screen w-screen flex-col p-3 backdrop-blur-md"
        >
          <ul className="flex flex-col gap-4 font-serif">
            {links.map(({ href, label, children }) =>
              href ? (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-foreground block rounded px-3 py-2 text-lg font-medium transition-all duration-200"
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                </li>
              ) : (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                  key={label}
                >
                  <AccordionItem value={label} key={label}>
                    <AccordionTrigger className="text-foreground items-center rounded px-3 py-2 text-lg font-medium transition-all duration-200">
                      {label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="pl-2">
                        {children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href ? child.href : '#'}
                              className="text-forground flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200"
                              onClick={onClose}
                            >
                              {createElement(child.icon!, {
                                className:
                                  'mr-2 size-6 box-content bg-primary-forground text-primary rounded p-1.5',
                              })}
                              <span className="text-lg font-black">
                                {child.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ),
            )}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
