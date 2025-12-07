import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Glory Store</h1>
        <p className="text-gray-600 dark:text-gray-300">Premium watches & accessories</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <article key={i} className="border rounded-lg p-4">
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-md mb-4 flex items-center justify-center">Product image</div>
            <h3 className="font-semibold">Watch Model {i}</h3>
            <p className="text-sm text-gray-500">Classic design · Stainless steel</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">$199</span>
              <Link href={`/products/${i}`} className="text-indigo-600">View</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
