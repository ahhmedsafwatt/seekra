import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'
import { ToolsWrapper } from '@/components/tools/tools-wrapper'
import { ToolsSearch } from '@/components/tools/tools-search'

export const experimental_ppr = true

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const params = await searchParams
  return (
    <>
      <Hero />
      <ToolsSearch />
      <ToolsWrapper searchParams={params} />
      <Footer />
    </>
  )
}
