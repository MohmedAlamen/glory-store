"use client"

import { useCart } from './CartProvider'

export default function AddToCartButton({ product }: { product: { slug: string, title: string, price: number, images?: string[] } }) {
  const { addItem } = useCart()

  function handleAdd() {
    addItem({ slug: product.slug, title: product.title, price: product.price, image: product.images?.[0] }, 1)
  }

  return (
    <button onClick={handleAdd} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Add</button>
  )
}
