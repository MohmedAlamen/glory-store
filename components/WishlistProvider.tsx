"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type WishlistItem = {
  slug: string
  title: string
  price: number
  image?: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (slug: string) => void
  isInWishlist: (slug: string) => boolean
  clear: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('glory:wishlist')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse wishlist', e)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('glory:wishlist', JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === item.slug)
      if (exists) return prev
      return [...prev, item]
    })
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const isInWishlist = (slug: string) => {
    return items.some((i) => i.slug === slug)
  }

  const clear = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clear }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
