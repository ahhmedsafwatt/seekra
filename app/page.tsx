'use client'
import Logo from '@/components/ui/Logo'
import SeekraLogo from '@/components/ui/SeekraLogo'

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen items-center gap-5">
      <div className="container">
        <h1 className="text-4xl text-white">
          Hello World <SeekraLogo />
        </h1>
        <Logo />
      </div>
    </main>
  )
}
