'use client'
import { useSpotlight } from '@/hooks/useSpotlight'
import { Spotlight } from '../ui/spotlight'
import { GlowingEffect } from '../ui/glow-effect'

export const ToolItem = () => {
  const { mouseX, mouseY, containerProps } = useSpotlight()
  return (
    <div
      className="bg-accent ring-accent group relative flex h-32 cursor-pointer items-center justify-between rounded-2xl border-2 p-2 transition-colors duration-200"
      {...containerProps}
    >
      <GlowingEffect
        borderWidth={3}
        spread={35}
        disabled={false}
        proximity={64}
        inactiveZone={0.1}
      />
      <div className="bg-background relative h-full w-full overflow-hidden rounded-lg p-2">
        <Spotlight raduis={200} mouseX={mouseX} mouseY={mouseY} />
        <span className="relative z-10 text-sm font-medium">Tool Name</span>
        <button className="relative z-10 rounded px-3 py-1 text-xs transition-colors duration-200">
          Action
        </button>
      </div>
    </div>
  )
}
