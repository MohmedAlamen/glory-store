"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type WishlistItem = {
  _id: string
  title: string
  slug: string
  price: number
  image?: string
  category?: string
  rating?: number
}

export type WishlistContextType = {
  items: WishlistItem[]
  toggleWishlist: (item: WishlistItem) => void
  removeItem: (slug: string) => void
  clear: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const toggleWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === item.slug)
      if (exists) {
        return prev.filter((i) => i.slug !== item.slug)
      }
      return [...prev, item]
    })
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug))
  }

  const clear = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, removeItem, clear }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
    } 
