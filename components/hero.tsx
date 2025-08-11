'use client'
import dynamic from 'next/dynamic'

const OrbitingCirclesWrapper = dynamic(
  () =>
    import('./orbiting-circles-wrapper').then(
      (mod) => mod.OrbitingCirclesWrapper,
    ),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-10 h-full w-full" />,
  },
)

export const Hero = () => {
  return (
    <main className="bg-background relative mt-[52px] flex h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-clip border-b border-dashed pt-12 antialiased">
      <OrbitingCirclesWrapper />
      <div className="container relative z-20 flex h-screen w-full flex-col gap-6 px-4 pt-32 text-center sm:gap-8">
        <h1 className="text-foreground text-pretty font-serif text-2xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Stop searching, <br /> start{' '}
          <span className="from-primary to-primary bg-gradient-to-r via-teal-300 bg-clip-text text-transparent">
            seeking.
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-56 text-sm font-medium leading-relaxed sm:max-w-md sm:text-lg md:max-w-2xl lg:text-xl">
          Discover the most reliable AI developer tools in our curated directory
          — complete with technical specs, integration guides, real performance
        </p>
      </div>
    </main>
  )
}
