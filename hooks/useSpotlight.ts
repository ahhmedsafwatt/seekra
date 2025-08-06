'use client'
import { MotionValue, useMotionValue } from 'motion/react'
import { useCallback } from 'react'

interface SpotlightHookReturn {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  containerProps: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  }
}

export const useSpotlight = (): SpotlightHookReturn => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - left)
      mouseY.set(e.clientY - top)
    },
    [mouseX, mouseY],
  )

  return {
    mouseX,
    mouseY,
    containerProps: {
      onMouseMove,
    },
  }
}
