'use client'
import { useSpotlight } from '@/hooks/useSpotlight'
import { Spotlight } from '../ui/spotlight'
import { GlowingEffect } from '../ui/glow-effect'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ExternalLink, Star, Github, Calendar } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import type { AITool } from '@/lib/utilities/types'

interface ToolItemProps {
  tool: AITool
}

export function ToolItem({ tool }: ToolItemProps) {
  const { mouseX, mouseY, containerProps } = useSpotlight()

  const githubStars = tool.stats.githubStars
  const lastUpdatedDate = new Date(tool.lastUpdated).toISOString().slice(0, 10)

  return (
    <Card
      className="ring-secondary/40 ring-6 group relative flex cursor-pointer rounded-lg border ring-inset backdrop-blur-lg"
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

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <span className="text-primary font-semibold" aria-hidden>
                {tool.logo || tool.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="group-hover:text-primary text-lg transition-colors">
                  {tool.name}
                </CardTitle>
              </div>
              <Badge variant="secondary" className="mt-1">
                {tool.category}
              </Badge>
            </div>
          </div>
          <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {tool.tagline || tool.description}
        </p>

        <div className="text-muted-foreground mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>{tool.rating.toFixed(1)}</span>
          </div>
          {githubStars ? (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{githubStars}</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{lastUpdatedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={tool.pricing === 'Free' ? 'default' : 'outline'}>
            {tool.pricing}
          </Badge>
          <Button size="sm" variant="ghost" asChild>
            <a
              href={tool.affiliateUrl ?? tool.website}
              target="_blank"
              rel="noreferrer"
            >
              View Details
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
