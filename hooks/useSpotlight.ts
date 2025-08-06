'use client'
import { MotionValue, useMotionValue } from 'motion/react'
import { useCallback } from 'react'

interface SpotlightHookReturn {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  containerProps: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  }
}

export const useSpotlight = (): SpotlightHookReturn => {
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - left)
      mouseY.set(e.clientY - top)
    },
    [mouseX, mouseY],
  )

  const onMouseLeave = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.set(-300)
      mouseY.set(-300)
    },
    [mouseX, mouseY],
  )

  const onMouseEnter = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.set(300)
      mouseY.set(300)
    },
    [mouseX, mouseY],
  )

  return {
    mouseX,
    mouseY,
    containerProps: {
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
    },
  }
}
