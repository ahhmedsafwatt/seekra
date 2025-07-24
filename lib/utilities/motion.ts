// Animation configurations
export const NAVBAR_ANIMATION_CONFIG = {
  highlight: {
    transition: { type: 'spring', stiffness: 400, damping: 30 },
    initial: { opacity: 0.5, scale: 1.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  dropdown: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'tween', duration: 0.22, ease: 'easeOut' },
  },
  dropdownItem: {
    initial: { opacity: 0.5, x: 10, filter: 'blur(12px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    whileHover: {
      scale: 0.97,
      transition: { duration: 0.2, type: 'spring', stiffness: 230 },
    },
  },
} as const
