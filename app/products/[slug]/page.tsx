import { notFound } from 'next/navigation'
import { connect } from '../../../lib/mongoose'
import Product from '../../../models/Product'
import SocialShare from '../../../components/SocialShare'
import ProductReviews from '../../../components/ProductReviews'

export async function generateStaticParams() {
  // Minimal implementation: no pre-rendered paths
  return []
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  await connect()
  const product = await Product.findOne({ slug: params.slug }).lean()
  if (!product) return notFound()

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={product.images?.[0] || `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.title)}`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="mt-4 font-bold text-xl">${product.price}</div>
          <SocialShare title={product.title} url={`/products/${product.slug}`} />
        </div>
      </div>
      <ProductReviews productId={product._id.toString()} />
    </section>
  )
}
