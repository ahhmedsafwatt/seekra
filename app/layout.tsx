import type { Metadata } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Provider } from '@/lib/provider'
import { defaultMetadata, openGraph, twitter } from '@/lib/shared-metadata'
import { Navbar } from '@/components/navbar/navbar'

const geist = Geist({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en">
      <body className={spaceGrotesk.className + geist.className + ' dark'}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
