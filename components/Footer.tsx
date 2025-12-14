"use client"

import Link from 'next/link'
import { useTranslations } from '../lib/i18n'

export default function Footer() {
  const { t } = useTranslations()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('siteTitle')}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t('aboutUsDescription')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">📘</a>
              <a href="#" className="hover:text-white transition-colors">🐦</a>
              <a href="#" className="hover:text-white transition-colors">📷</a>
              <a href="#" className="hover:text-white transition-colors">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">{t('products')}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">{t('faq')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('shippingInfo')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('termsConditions')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400">
          <p>© {currentYear} {t('siteTitle')} — {t('allRightsReserved')}</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span>We Accept: 💳 💰 🏦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
