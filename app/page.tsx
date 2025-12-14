"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from '../lib/i18n'
import ProductCard from '../components/ProductCard'

type Product = {
  _id: string
  title: string
  slug: string
  price: number
  images?: string[]
  category: string
  rating?: number
}

export default function Home() {
  const { t } = useTranslations()
  const [products, setProducts] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=100')
        const data = await response.json()
        const allProducts = data.products || []
        setProducts(allProducts)

        // Get new arrivals (last 6 products)
        setNewArrivals(allProducts.slice(-6))

        // Get best sellers (products with highest rating)
        const sorted = [...allProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0))
        setBestSellers(sorted.slice(0, 6))
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    { name: t('smartphones'), slug: 'smartphones', icon: '📱', color: 'from-blue-400 to-blue-600' },
    { name: t('phoneAccessories'), slug: 'phone-accessories', icon: '🎧', color: 'from-purple-400 to-purple-600' },
    { name: t('watches'), slug: 'watches', icon: '⌚', color: 'from-amber-400 to-amber-600' },
  ]

  const banners = [
    {
      title: 'Latest Smartphones',
      subtitle: 'Get the newest phones with exclusive discounts',
      discount: '30',
      image: '📱',
      link: '/products?category=Smartphones',
    },
    {
      title: 'Premium Accessories',
      subtitle: 'Enhance your device with quality accessories',
      discount: '25',
      image: '🎧',
      link: '/products?category=Phone Accessories',
    },
    {
      title: 'Luxury Watches',
      subtitle: 'Timeless elegance for every occasion',
      discount: '20',
      image: '⌚',
      link: '/products?category=Watches',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section with Banners */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <Link
              key={index}
              href={banner.link}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${index === 0 ? 'from-indigo-500 to-indigo-700' : index === 1 ? 'from-purple-500 to-purple-700' : 'from-pink-500 to-pink-700'} p-8 text-white min-h-64 flex flex-col justify-between relative`}>
                <div className="absolute right-0 top-0 text-8xl opacity-20">{banner.image}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-indigo-100 mb-4">{banner.subtitle}</p>
                </div>
                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-bold">{banner.discount}</span>
                    <span className="text-xl ml-2">% OFF</span>
                  </div>
                  <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    {t('shopNow')}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">{t('categories')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className={`bg-gradient-to-br ${category.color} text-white rounded-lg p-8 hover:shadow-lg transition-shadow group cursor-pointer`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-white/80 mt-2">Explore now →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t('newArrivals')}</h2>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            {t('viewDetails')} →
          </Link>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('noProducts')}</p>
        )}
      </section>

      {/* Best Sellers Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t('bestSellers')}</h2>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            {t('viewDetails')} →
          </Link>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('noProducts')}</p>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('whyChooseUs')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="font-semibold mb-2">{t('fastShipping')}</h3>
            <p className="text-gray-600 dark:text-gray-400">Fast and reliable shipping worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="font-semibold mb-2">{t('securePayment')}</h3>
            <p className="text-gray-600 dark:text-gray-400">Safe and secure payment options</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-semibold mb-2">{t('excellentService')}</h3>
            <p className="text-gray-600 dark:text-gray-400">24/7 customer support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Product?</h2>
        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
          Browse our extensive collection of smartphones, accessories, and watches.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {t('shopNow')}
        </Link>
      </section>
    </div>
  )
}
