'use client'
import { Star, Zap, Shield, Globe, Code, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { AITool } from '@/lib/utilities/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { GlowingEffect } from '@/components/ui/glow-effect'
import { useSpotlight } from '@/hooks/useSpotlight'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
interface ToolItemProps {
  tool: AITool
}

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase()
  if (lowerFeature.includes('api')) return <Code className="h-4 w-4" />
  if (lowerFeature.includes('security') || lowerFeature.includes('safe'))
    return <Shield className="h-4 w-4" />
  if (lowerFeature.includes('ai') || lowerFeature.includes('smart'))
    return <Sparkles className="h-4 w-4" />
  if (lowerFeature.includes('web') || lowerFeature.includes('online'))
    return <Globe className="h-4 w-4" />
  return <Zap className="h-4 w-4" />
}

const formatNumber = (num?: number) => {
  if (!num) return '0'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

const formatPricing = (tool: AITool) => {
  if (tool.pricing.toLowerCase() === 'free') return 'Free'
  if (tool.pricing.toLowerCase() === 'open-source') return 'Open Source'
  if (tool.pricing.toLowerCase() === 'paid' && tool.startingPrice !== 0) {
    return `Paid $${tool.startingPrice}/mo`
  }
  return tool.pricing
}

export function timeAgo(dateString: string) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export function ToolItem({ tool }: ToolItemProps) {
  const { mouseX, mouseY, containerProps } = useSpotlight()

  return (
    <Card
      className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border backdrop-blur-lg transition-all duration-300 hover:shadow-lg"
      {...containerProps}
      onClick={() => window.open(tool.affiliateUrl ?? tool.website, '_blank')}
    >
      <GlowingEffect
        borderWidth={2}
        spread={35}
        disabled={false}
        proximity={64}
        inactiveZone={0.3}
      />
      <Spotlight raduis={200} mouseX={mouseX} mouseY={mouseY} />

      <CardHeader className="px-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted/50 flex size-12 items-center justify-center rounded-lg">
              {tool.logo ? (
                <Image
                  src={tool.logo || '/placeholder.svg'}
                  alt={`${tool.name} logo`}
                  className="size-8 rounded object-cover"
                />
              ) : (
                <div className="bg-primary/10 flex size-8 items-center justify-center rounded">
                  <Sparkles className="text-primary h-4 w-4" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate font-serif text-lg leading-tight">
                {tool.name}
              </CardTitle>
              <CardDescription className="mt-1 text-xs">
                {tool.category}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-3.5">
            <Badge
              variant="outline"
              className="text-primary bg-accent text-xs font-medium"
            >
              {formatPricing(tool)}
            </Badge>
            {tool.hasApi && (
              <Badge variant="outline" className="text-xs font-medium">
                <Code className="mr-1 h-3 w-3" />
                API
              </Badge>
            )}
            {tool.stats.totalUsers && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">
                    {tool.stats.totalUsers.toString().slice(0, 1)}
                  </span>
                </div>
                {tool.stats.totalUsers && (
                  <span className="text-muted-foreground text-xs">
                    ({formatNumber(tool.stats.totalUsers)} users)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0! flex-1 space-y-3 px-4">
        <p className="text-muted-foreground line-clamp-3 text-sm font-medium leading-relaxed antialiased">
          {tool.description || 'No description available.'}
        </p>
      </CardContent>
      <CardFooter className="pt-4! justify-between border-t px-4">
        {tool.features && tool.features.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {tool.features.slice(0, 4).map((feature) => (
                <Tooltip key={feature.id}>
                  <TooltipTrigger>
                    <Badge className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs">
                      {getFeatureIcon(feature.title)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>{feature.title}</TooltipContent>
                </Tooltip>
              ))}
              {tool.features.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.features.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <span className="text-muted-foreground text-xs">
          updated {timeAgo(tool.lastUpdated)}
        </span>
      </CardFooter>
    </Card>
  )
}
