"use client"

import { useWishlist } from '../../components/WishlistProvider'
import { useTranslations } from '../../lib/i18n'
import Link from 'next/link'

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlist()
  const { t } = useTranslations()

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('wishlist')}</h1>
        {items.length > 0 && (
          <button 
            onClick={clear} 
            className="px-4 py-2 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{t('emptyWishlist')}</p>
          <Link 
            href="/products" 
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {t('shopNow')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article 
              key={item.slug} 
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow dark:border-gray-700"
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">Product image</span>
                )}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">${item.price}</span>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/products/${item.slug}`}
                  className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  {t('viewDetails')}
                </Link>
                <button 
                  onClick={() => removeItem(item.slug)}
                  className="px-4 py-2 border rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                  aria-label={t('removeFromWishlist')}
                >
                  🗑️
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
