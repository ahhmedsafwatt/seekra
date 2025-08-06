'use client'
import { motion, MotionValue, useMotionTemplate } from 'motion/react'

interface SpotlightProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  color?: string
  raduis?: number
  opacity?: number
}

export const Spotlight = ({
  mouseX,
  mouseY,
  color = '#fff',
  raduis = 300,
  opacity = 0.1,
}: SpotlightProps) => {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        maskImage: useMotionTemplate`radial-gradient(${raduis}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 100%)`,
        opacity: opacity,
      }}
      className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
    />
  )
}
