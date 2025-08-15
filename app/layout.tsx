import type { Metadata } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Provider } from '@/lib/provider'
import { defaultMetadata, openGraph, twitter } from '@/lib/shared-metadata'
import { Navbar } from '@/components/navbar/navbar'
import { cn } from '@/lib/utils'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...twitter,
  },
  openGraph: {
    ...openGraph,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(` ${geist.variable} ${spaceGrotesk.variable} dark`)}
    >
      <body className={cn(`${geist.className} `)}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
