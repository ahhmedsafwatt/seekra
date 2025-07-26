import React from 'react'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

import {
  Anthropic,
  Claude,
  Copilot,
  Cursor,
  DeepSeek,
  Gemini,
  Grok,
  HuggingFace,
  LobeHub,
  Manus,
  Meta,
  Midjourney,
  Mistral,
  N8n,
  OpenAI,
  Perplexity,
  Qwen,
  V0,
  Windsurf,
} from '@lobehub/icons'

export const Hero = () => {
  return (
    <main className="bg-background relative mb-12 mt-[52px] flex min-h-screen w-full flex-col items-center justify-center overflow-clip border-b pt-12 antialiased">
      <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center overflow-clip">
        <OrbitingCircles iconSize={48} radius={400} speed={0.7}>
          <OpenAI.Avatar size={48} />
          <Perplexity.Avatar size={48} />
          <Claude.Avatar size={48} />
          <Grok.Avatar size={48} />
          <Gemini.Avatar size={48} />
          <DeepSeek.Avatar size={48} />
        </OrbitingCircles>
        <OrbitingCircles iconSize={50} radius={470} speed={0.7} reverse>
          <Midjourney.Avatar size={50} />
          <LobeHub.Avatar size={50} />
          <V0.Avatar size={50} />
          <Cursor.Avatar size={50} />
          <Windsurf.Avatar size={50} />
          <Copilot.Avatar size={50} />
        </OrbitingCircles>
        <OrbitingCircles iconSize={52} radius={540} speed={1}>
          <HuggingFace.Avatar size={52} />
          <Meta.Avatar size={52} />
          <Mistral.Avatar size={52} />
          <Qwen.Avatar size={52} />
          <Manus.Avatar size={52} />
          <N8n.Avatar size={52} />
        </OrbitingCircles>
      </div>
      <div className="container relative z-20 flex h-screen w-full flex-col gap-6 px-4 pt-20 text-center sm:gap-8 md:pt-32">
        {/* Header with gradient text */}
        <h1 className="text-foreground text-pretty text-2xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Discover AI Tools Built <br className="hidden sm:block" />
          <span className="block sm:inline">for Your Job</span>
        </h1>
        {/* Description */}
        <p className="text-muted-foreground mx-auto max-w-xs font-serif text-base font-medium leading-relaxed sm:max-w-md sm:text-lg md:max-w-2xl lg:text-xl">
          Seekra is a helpful tool designed to assist you in discovering the
          perfect AI tools for your job, saving you time and effort in your
          search.
        </p>
      </div>
    </main>
  )
}
