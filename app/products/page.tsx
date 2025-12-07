import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'

export const metadata = {
  title: 'Products - Glory Store'
}

type Product = {
  title: string
  slug: string
  price: number
  images?: string[]
}

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products?limit=48`, { cache: 'no-store' })
  const json = await res.json().catch(() => ({ products: [] }))
  const products: Product[] = json.products || []

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}
