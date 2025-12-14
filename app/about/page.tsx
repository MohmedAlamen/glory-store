"use client"

import Link from 'next/link'
import { useTranslations } from '../../lib/i18n'

export default function AboutPage() {
  const { t } = useTranslations()

  const values = [
    {
      icon: '⭐',
      title: t('qualityProducts'),
      description: 'We source only the highest quality products from trusted manufacturers.',
    },
    {
      icon: '🚀',
      title: t('fastShipping'),
      description: 'Fast and reliable shipping to get your products to you quickly.',
    },
    {
      icon: '💰',
      title: t('bestPrice'),
      description: 'Competitive prices without compromising on quality.',
    },
    {
      icon: '😊',
      title: t('excellentService'),
      description: 'Dedicated customer support to help you with any questions.',
    },
    {
      icon: '🔒',
      title: t('securePayment'),
      description: 'Safe and secure payment options for your peace of mind.',
    },
    {
      icon: '↩️',
      title: t('easyReturns'),
      description: 'Hassle-free returns and exchanges within 30 days.',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('aboutUs')}</h1>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          {t('aboutUsDescription')}
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{t('ourMission')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('ourMissionText')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Founded in 2020, Glory Store has grown to become a trusted destination for electronics enthusiasts. 
            We're committed to providing exceptional products and services to our customers worldwide.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t('shopNow')}
          </Link>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 rounded-lg p-8 h-64 flex items-center justify-center">
          <div className="text-6xl">📱</div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">{t('whyChooseUs')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
            <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">5K+</div>
            <p className="text-gray-600 dark:text-gray-400">Products</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <p className="text-gray-600 dark:text-gray-400">Countries</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
            <p className="text-gray-600 dark:text-gray-400">Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
        <p className="text-indigo-100 mb-6">Explore our wide selection of premium products today.</p>
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
