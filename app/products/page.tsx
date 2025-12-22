"use client"

import { useEffect, useState, useCallback } from 'react'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import { useTranslations } from '../../lib/i18n'

type Product = {
  _id: string
  title: string
  slug: string
  price: number
  images?: string[]
  category: string
  rating?: number
}

type FilterState = {
  q: string
  category: string
  sort: string
  minPrice: number | ''
  maxPrice: number | ''
  minRating: number | ''
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    q: '',
    category: 'All',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  })
  const { t } = useTranslations()

  const categories = ['All', 'Smartphones', 'Phone Accessories', 'Watches']
  const sortOptions = [
    { value: 'newest', label: t('sort_newest') },
    { value: 'price_asc', label: t('sort_price_low_to_high') },
    { value: 'price_desc', label: t('sort_price_high_to_low') },
    { value: 'rating_desc', label: t('sort_rating_high_to_low') },
  ]

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.set('limit', '100')
      if (filters.q) params.set('q', filters.q)
      if (filters.category !== 'All') params.set('category', filters.category)
      if (filters.sort) params.set('sort', filters.sort)
      if (filters.minPrice !== '') params.set('minPrice', String(filters.minPrice))
      if (filters.maxPrice !== '') params.set('maxPrice', String(filters.maxPrice))
      if (filters.minRating !== '') params.set('minRating', String(filters.minRating))

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products')
      }

      setProducts(data.products || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    // Handle number inputs (minPrice, maxPrice, minRating)
    if (name === 'minPrice' || name === 'maxPrice' || name === 'minRating') {
      setFilters((prev) => ({ ...prev, [name]: value === '' ? '' : Number(value) }))
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, q: query }))
  }

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('products')}</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-colors text-sm ${
                filters.category === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'All' ? t('all_categories') : category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('sort_by')}:
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={handleSortChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('price_range')}:
          </label>
          <input
            type="number"
            name="minPrice"
            placeholder={t('min_price')}
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-24 pl-3 pr-2 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <span className="text-gray-500 dark:text-gray-400">-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder={t('max_price')}
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-24 pl-3 pr-2 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="minRating" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('min_rating')}:
          </label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleFilterChange}
            className="mt-1 block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">{t('any')}</option>
            <option value="4">4+ {t('stars')}</option>
            <option value="3">3+ {t('stars')}</option>
            <option value="2">2+ {t('stars')}</option>
            <option value="1">1+ {t('stars')}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p>{t('loading_products')}...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">{t('no_products_found')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
