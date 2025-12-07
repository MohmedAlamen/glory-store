"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from '../lib/i18n'
import { useCart } from './CartProvider'

export default function Header() {
  const [dark, setDark] = useState(false)
  const { locale, setLocale } = useLocale()
  const { t } = useTranslations()
  const { items, toggleOpen } = useCart()

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
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">{t('siteTitle')}</Link>
          <nav className="hidden sm:flex gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/products">{t('products')}</Link>
            <Link href="/orders">{t('myOrders')}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleLang} className="px-3 py-1 rounded border">
            {locale === 'en' ? 'EN' : 'AR'}
          </button>
          <button onClick={toggleDark} className="px-3 py-1 rounded border">
            {dark ? 'Dark' : 'Light'}
          </button>
          <button onClick={() => toggleOpen(true)} className="px-3 py-1 rounded bg-indigo-600 text-white">
            {t('cart')}{items.length > 0 ? ` (${items.length})` : ''}
          </button>
        </div>
      </div>
    </header>
  )
}
