"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from '../lib/i18n'
import { useCart } from './CartProvider'
import { useWishlist } from './WishlistProvider'
import { useAuth } from './AuthProvider'

export default function Header() {
  const [dark, setDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { locale, setLocale } = useLocale()
  const { t } = useTranslations()
  const { items, toggleOpen } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, logout } = useAuth()

  useEffect(() => {
    const stored = localStorage.getItem('glory:dark')
    if (stored === '1') {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    if (next) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('glory:dark', next ? '1' : '0')
  }

  function toggleLang() {
    const next = locale === 'en' ? 'ar' : 'en'
    setLocale(next)
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {t('siteTitle')}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-sm text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {t('home')}
          </Link>
          <Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {t('products')}
          </Link>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {t('about')}
          </Link>
          <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {t('contact')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Language Toggle */}
          <button 
            onClick={toggleLang} 
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={t('switchLanguage')}
          >
            {locale === 'en' ? '🇬🇧 EN' : '🇸🇦 AR'}
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDark} 
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={dark ? t('switchToLight') : t('switchToDark')}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Wishlist */}
          <Link 
            href="/wishlist" 
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={t('wishlist')}
          >
            ❤️ <span className="hidden sm:inline">{wishlistItems.length > 0 ? `(${wishlistItems.length})` : ''}</span>
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/dashboard" 
                className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
              >
                👤 {user.name.split(' ')[0]}
              </Link>
              <button 
                onClick={logout} 
                className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Cart Button */}
          <button 
            onClick={() => toggleOpen(true)} 
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
            aria-label={t('openCart')}
          >
            🛒 {items.length > 0 ? `(${items.length})` : ''}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <nav className="container py-4 space-y-3">
            <Link href="/" className="block text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t('home')}
            </Link>
            <Link href="/products" className="block text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t('products')}
            </Link>
            <Link href="/about" className="block text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t('about')}
            </Link>
            <Link href="/contact" className="block text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t('contact')}
            </Link>
            {user && (
              <Link href="/dashboard" className="block text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
