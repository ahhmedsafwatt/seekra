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
      },
    },
    exit: {
      height: 0,
      padding: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.3,
      },
    },
  },
  dropdownItem: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0,
        delay: 0,
      },
    },
    whileHover: {
      scale: 0.97,
      transition: { duration: 0.2, type: 'spring', stiffness: 230 },
    },
  },
} as const
