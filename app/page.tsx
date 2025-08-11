import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'
import { ToolsWrapper } from '@/components/tools/tools-wrapper'
import { ToolsSearch } from '@/components/tools/tools-search'

export const experimental_ppr = true

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  console.log('Rendering Home with searchParams:', await searchParams)
  return (
    <>
      <Hero />
      <ToolsSearch />
      <ToolsWrapper searchParams={searchParams} />
      <Footer />
    </>
  )
}
