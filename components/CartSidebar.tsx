"use client"

import { useCart } from './CartProvider'
import { useTranslations } from '../lib/i18n'
import Link from 'next/link'

export default function CartSidebar() {
  const { items, open, toggleOpen, removeItem, updateQty, subtotal, clear } = useCart()
  const { t } = useTranslations()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={() => toggleOpen(false)} />
      <aside className="w-full sm:w-96 bg-white dark:bg-gray-900 border-l p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{t('cart')}</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => clear()} className="text-sm text-red-500 hover:text-red-700 transition-colors">
              Clear
            </button>
            <button onClick={() => toggleOpen(false)} className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Close
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-8 text-center text-gray-500">{t('emptyCart')}</div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.slug} className="flex items-center justify-between gap-3">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                  {it.image ? <img src={it.image} alt={it.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{it.title}</div>
                  <div className="text-xs text-gray-500">${it.price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button 
                      onClick={() => updateQty(it.slug, it.quantity - 1)} 
                      className="px-2 py-0.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      -
                    </button>
                    <div className="px-2">{it.quantity}</div>
                    <button 
                      onClick={() => updateQty(it.slug, it.quantity + 1)} 
                      className="px-2 py-0.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
                  <button 
                    onClick={() => removeItem(it.slug)} 
                    className="text-xs text-red-500 mt-2 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 flex items-center justify-between">
              <div className="font-semibold">{t('total')}</div>
              <div className="font-bold">${subtotal.toFixed(2)}</div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link 
                href="/cart" 
                className="flex-1 text-center px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t('cart')}
              </Link>
              <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                {t('checkout')}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
