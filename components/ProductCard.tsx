"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from './CartProvider'
import { useWishlist } from './WishlistProvider'
import { useTranslations } from '../lib/i18n'

type ProductCardProps = {
  product: {
    _id?: string
    title: string
    slug: string
    price: number
    images?: string[]
    category?: string
    rating?: number
    inventory?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { items: wishlistItems, toggleWishlist } = useWishlist()
  const { t } = useTranslations()
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  const isInWishlist = wishlistItems.some((item) => item.slug === product.slug)
  const image = product.images?.[0] || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.title)}`
  const inStock = (product.inventory ?? 1) > 0

  const handleAddToCart = () => {
    addItem({
      id: product._id || product.slug,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image,
      quantity: 1,
    })
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  const handleWishlist = () => {
    toggleWishlist({
      id: product._id || product.slug,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image,
      category: product.category || 'Uncategorized',
      rating: product.rating,
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-64">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
          {product.rating && product.rating >= 4.5 && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
              ⭐ {product.rating}
            </span>
          )}
          {!inStock && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {t('outOfStock')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('addToWishlist')}
        >
          <span className="text-xl">{isInWishlist ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            {product.category}
          </p>
        )}

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-4 mt-auto">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-sm font-medium"
          >
            {t('viewDetails')}
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {t('addToCart')}
          </button>
        </div>

        {/* Added Message */}
        {showAddedMessage && (
          <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-300 text-xs text-center">
            {t('addedToCart')} ✓
          </div>
        )}
      </div>
    </div>
  )
}
