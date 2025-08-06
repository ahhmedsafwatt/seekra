'use client'
import { useSpotlight } from '@/hooks/useSpotlight'
import { Spotlight } from '../ui/spotlight'
import { GlowingEffect } from '../ui/glow-effect'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ExternalLink, Star, Github, Calendar } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export const ToolItem = () => {
  const { mouseX, mouseY, containerProps } = useSpotlight()

  const tool = {
    name: 'SuperTool',
    category: 'Productivity',
    description: 'A powerful tool to boost your productivity and workflow.',
    rating: 4.7,
    githubStars: 1234,
    lastUpdated: '2024-06-01',
    pricing: 'Free',
  }
  return (
    <Card
      className="border-1 bg-background ring-accent group relative flex cursor-pointer rounded-lg p-4 ring-4 ring-inset"
      {...containerProps}
    >
      <GlowingEffect
        borderWidth={1.5}
        spread={40}
        disabled={false}
        proximity={64}
        inactiveZone={0.3}
      />
      <Spotlight raduis={200} mouseX={mouseX} mouseY={mouseY} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <span className="text-primary font-semibold">
                {tool.name.charAt(0)}
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
          {tool.description}
        </p>

        <div className="text-muted-foreground mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>{tool.rating}</span>
          </div>
          {tool.githubStars && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{tool.githubStars}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{tool.lastUpdated}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant={
              tool.pricing === 'Free' || tool.pricing === 'Open Source'
                ? 'default'
                : 'outline'
            }
          >
            {tool.pricing}
          </Badge>
          <Button size="sm" variant="ghost">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
