import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { Claude } from '@lobehub/icons'
import { Copilot } from '@lobehub/icons'
import { Cursor } from '@lobehub/icons'
import { DeepSeek } from '@lobehub/icons'
import { Gemini } from '@lobehub/icons'
import { Grok } from '@lobehub/icons'
import { HuggingFace } from '@lobehub/icons'
import { LobeHub } from '@lobehub/icons'
import { Manus } from '@lobehub/icons'
import { Meta } from '@lobehub/icons'
import { Midjourney } from '@lobehub/icons'
import { Mistral } from '@lobehub/icons'
import { N8n } from '@lobehub/icons'
import { OpenAI } from '@lobehub/icons'
import { Perplexity } from '@lobehub/icons'
import { Qwen } from '@lobehub/icons'
import { V0 } from '@lobehub/icons'
import { Windsurf } from '@lobehub/icons'

export const OrbitingCirclesWrapper = () => {
  return (
    <div
      style={{
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 40%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0.01) 75%,rgba(0,0,0,0) 100% )',
      }}
      className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center overflow-clip"
    >
      <OrbitingCircles iconSize={48} radius={400} speed={0.5}>
        <OpenAI.Avatar size={48} />
        <Perplexity.Avatar size={48} />
        <Claude.Avatar size={48} />
        <Grok.Avatar size={48} />
        <Gemini.Avatar size={48} />
        <DeepSeek.Avatar size={48} />
      </OrbitingCircles>
      <OrbitingCircles iconSize={50} radius={470} speed={0.5} reverse>
        <Midjourney.Avatar size={50} />
        <LobeHub.Avatar size={50} />
        <V0.Avatar size={50} />
        <Cursor.Avatar size={50} />
        <Windsurf.Avatar size={50} />
        <Copilot.Avatar size={50} />
      </OrbitingCircles>
      <OrbitingCircles iconSize={52} radius={540} speed={0.7}>
        <HuggingFace.Avatar size={52} />
        <Meta.Avatar size={52} />
        <Mistral.Avatar size={52} />
        <Qwen.Avatar size={52} />
        <Manus.Avatar size={52} />
        <N8n.Avatar size={52} />
      </OrbitingCircles>
    </div>
  )
}
