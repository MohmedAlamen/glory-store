"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import AddToCartButton from './AddToCartButton'
import { useWishlist } from './WishlistProvider'
import { useTranslations } from '../lib/i18n'

type Props = {
  product: {
    title: string
    slug: string
    price: number
    images?: string[]
  }
}

export default function ProductCard({ product }: Props) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const { t } = useTranslations()
  const inWishlist = isInWishlist(product.slug)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.slug)
    } else {
      addItem({
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.images?.[0]
      })
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="border rounded-lg p-4 bg-white dark:bg-gray-800 relative"
    >
      <button
        onClick={toggleWishlist}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:scale-110 transition-transform"
        aria-label={inWishlist ? t('removeFromWishlist') : t('addToWishlist')}
      >
        <span className="text-xl">{inWishlist ? '❤️' : '🤍'}</span>
      </button>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          {product.images && product.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0]} alt={product.title} className="object-cover w-full h-full" />
          ) : (
            <div className="text-gray-500">No image</div>
          )}
        </div>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-sm">{product.title}</h3>
          <p className="text-xs text-gray-500">Classic · Stainless steel</p>
        </div>
        <div className="text-right">
          <div className="font-bold">${product.price}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <AddToCartButton product={product} />
      </div>
    </motion.article>
  )
}
