"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type ProductForComparison = {
  _id: string
  title: string
  slug: string
  price: number
  category: string
  description: string
  rating?: number
}

type ComparisonContextType = {
  comparisonList: ProductForComparison[]
  addToComparison: (product: ProductForComparison) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isComparing: (productId: string) => boolean
  maxProducts: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ProductComparisonProvider({ children }: { children: ReactNode }) {
  const maxProducts = 3
  const [comparisonList, setComparisonList] = useState<ProductForComparison[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const storedList = localStorage.getItem('glory:comparison')
    if (storedList) {
      try {
        setComparisonList(JSON.parse(storedList))
      } catch (e) {
        console.error('Failed to parse stored comparison list', e)
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('glory:comparison', JSON.stringify(comparisonList))
  }, [comparisonList])

  const addToComparison = (product: ProductForComparison) => {
    setComparisonList((prevList) => {
      if (prevList.some((p) => p._id === product._id)) {
        return prevList // Already in list
      }
      if (prevList.length >= maxProducts) {
        // Optionally notify user that max limit is reached
        console.warn(`Comparison list is full. Max ${maxProducts} products allowed.`)
        return prevList
      }
      return [...prevList, product]
    })
  }

  const removeFromComparison = (productId: string) => {
    setComparisonList((prevList) => prevList.filter((p) => p._id !== productId))
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  const isComparing = (productId: string) => {
    return comparisonList.some((p) => p._id === productId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparing,
        maxProducts,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error('useComparison must be used within a ProductComparisonProvider')
  }
  return context
}
