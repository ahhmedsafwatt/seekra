// Animation configurations
export const NAVBAR_ANIMATION_CONFIG = {
  highlight: {
    transition: { type: 'spring', stiffness: 400, damping: 30 },
    initial: { opacity: 0.5, scale: 1.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  dropdown: {
    initial: { height: 0, padding: 0 },
    animate: {
      height: '380px',
      padding: '5rem 0 1.5rem',
      transition: {
        duration: 0.3,
      } as const,
    },
    exit: {
      height: 0,
      padding: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.3,
      } as const,
    },
  },
  dropdownItem: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
      } as const,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0,
        delay: 0,
      } as const,
    },
    whileHover: {
      scale: 0.97,
      transition: { duration: 0.2, type: 'spring', stiffness: 230 } as const,
    },
  },
} as const

export const FILTER_ANIMATION_CONFIG = {
  container: ({ open }: { open: boolean }) => ({
    initial: {
      width: '5rem',
      overflow: 'hidden',
    },
    animate: open
      ? {
          width: '100%',
          overflow: 'visible',
          transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 300,
            damping: 30,
          } as const,
        }
      : {
          width: '5.25rem',
          overflow: 'hidden',
          transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 300,
            damping: 30,
          } as const,
        },
  }),
  content: {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.2,
      } as const,
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      } as const,
    },
  },
} as const
