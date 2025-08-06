'use client'
import { cn } from '@/lib/utils'
import React, { ElementType, useCallback, useEffect, useState } from 'react'

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed

  const [isMounted, setIsMounted] = useState(false)

  const getResponsiveRadius = useCallback(
    (baseRadius: number) => {
      if (!isMounted) return baseRadius
      const width = window.innerWidth
      if (width < 640) {
        return baseRadius * 0.5
      } else if (width < 768) {
        return baseRadius * 0.7
      } else if (width < 1024) {
        return baseRadius * 0.8
      }
      return baseRadius
    },
    [isMounted],
  )
  const getResponsiveIconSize = useCallback(
    (baseSize: number) => {
      if (!isMounted) return baseSize
      const width = window.innerWidth
      if (width < 640) {
        return baseSize * 0.6
      } else if (width < 768) {
        return baseSize * 0.7
      } else if (width < 1024) {
        return baseSize * 0.8
      }
      return baseSize
    },
    [isMounted],
  )

  const [responsiveRadius, setResponsiveRadius] = useState(radius)
  const [responsiveIconSize, setresponsiveIconSize] = useState(iconSize)

  useEffect(() => {
    setIsMounted(true)

    function handleResize() {
      setResponsiveRadius(getResponsiveRadius(radius))
    }

    function handleIconResize() {
      setresponsiveIconSize(getResponsiveIconSize(iconSize))
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleIconResize)

    handleIconResize()
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [iconSize, radius, isMounted, getResponsiveRadius, getResponsiveIconSize])

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={responsiveRadius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        let renderedIcon = child
        if (React.isValidElement(child)) {
          renderedIcon = React.cloneElement(
            child as React.ReactElement<ElementType & { size?: number }>,
            {
              size: responsiveIconSize,
            },
          )
        }
        return (
          <div
            style={
              {
                '--duration': calculatedDuration,
                '--radius': responsiveRadius,
                '--angle': angle,
                '--icon-size': `${responsiveIconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full`,
              { '[animation-direction:reverse]': reverse },
              className,
            )}
            {...props}
          >
            {renderedIcon}
          </div>
        )
      })}
    </>
  )
}
