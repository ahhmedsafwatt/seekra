'use client'
import { motion, MotionValue, useMotionTemplate } from 'motion/react'

interface SpotlightProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  color?: string
  raduis?: number
}

export const Spotlight = ({
  mouseX,
  mouseY,
  color = '#262626',
  raduis = 300,
}: SpotlightProps) => {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        maskImage: useMotionTemplate`radial-gradient(circle ${raduis}px at ${mouseX}px ${mouseY}px, #ffffff, transparent 80%)`,
      }}
      className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
    />
  )
}
