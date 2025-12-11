"use client"

import Link from 'next/link'
import { useTranslations } from '../lib/i18n'

export default function Home() {
  const { t } = useTranslations()
  
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t('siteTitle')}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t('premiumWatches')}</p>
      </header>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('featuredProducts')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <article key={i} className="border rounded-lg p-4 hover:shadow-lg transition-shadow dark:border-gray-700">
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-md mb-4 flex items-center justify-center">
              Product image
            </div>
            <h3 className="font-semibold">Watch Model {i}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Classic design · Stainless steel</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">${199}</span>
              <Link 
                href={`/products/${i}`} 
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t('viewDetails')}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
