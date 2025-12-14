"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  _id?: string 
  slug: string
  title: string
  price: number
  quantity: number
  image?: string
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (slug: string) => void
  updateQty: (slug: string, qty: number) => void
  clear: () => void
  subtotal: number
  open: boolean
  toggleOpen: (val?: boolean) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'glory:cart'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  function addItem(item: Omit<CartItem, 'quantity'>, qty = 1) {
    setItems((prev) => {
      const found = prev.find((p) => p.slug === item.slug)
      if (found) {
        return prev.map((p) => p.slug === item.slug ? { ...p, quantity: p.quantity + qty } : p)
      }
      return [{ ...item, quantity: qty }, ...prev]
    })
    setOpen(true)
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((p) => p.slug !== slug))
  }

  function updateQty(slug: string, qty: number) {
    if (qty <= 0) return removeItem(slug)
    setItems((prev) => prev.map((p) => p.slug === slug ? { ...p, quantity: qty } : p))
  }

  function clear() { setItems([]) }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, subtotal, open, toggleOpen: (v?: boolean) => setOpen((o) => typeof v === 'boolean' ? v : !o) }}>
      {children}
    </CartContext.Provider>
  )
}
