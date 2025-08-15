import { ToolItem } from './tool-item'
import { sampleTools } from '@/lib/sample-data'

export async function ToolsWrapper({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>
}) {
  const params = searchParams

  function toArray(value: string | string[] | undefined | null): string[] {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }

  function normalize(text: string): string {
    return text.toLowerCase()
  }

  const q = typeof params.q === 'string' ? params.q : ''
  const categories = toArray(params.categories as any)
  const pricing = toArray(params.pricing as any)
  const sort = typeof params.sort === 'string' ? params.sort : 'latest'
  const pageRaw = (params.page as string | undefined) ?? '1'
  const page = Number(pageRaw)
  const currentPage = Number.isFinite(page) && page > 0 ? page : 1
  const pageSize = 12

  const query = normalize(q || '')

  // database query simulation
  const tools = sampleTools
    .filter((tool) => {
      const nameMatch = normalize(tool.name).includes(query)
      const descriptionMatch = normalize(tool.description).includes(query)
      const categoryMatch = categories.length
        ? categories.some((cat) => tool.category.includes(cat))
        : true
      const pricingMatch = pricing.length
        ? pricing.some((price) => tool.pricing.includes(price))
        : true
      return (nameMatch || descriptionMatch) && categoryMatch && pricingMatch
    })
    .sort((a, b) => {
      if (sort === 'alphabetical') return a.name.localeCompare(b.name)
      return 0 // Default: no sorting, as createdAt/popularity not available
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)

  if (!tools.length) {
    return (
      <div className="container border-x border-dashed pb-12 pt-6">
        No tools found
      </div>
    )
  }

  return (
    <div className="container border-x border-dashed pb-12 pt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolItem key={tool.id} tool={tool} />
        ))}
      </div>
      {/* Pagination can be added here if needed */}
      <div className="mt-6 flex justify-center">
        <span className="text-muted-foreground text-sm">
          Page {currentPage} of {Math.ceil(sampleTools.length / pageSize)}
        </span>
      </div>
    </div>
  )
}
