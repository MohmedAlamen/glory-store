import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function CartPage() {
  // Cart is client-side persisted; show a helpful message and client cart UI will be available via provider/Sidebar.
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-600 mb-6">Open the cart using the cart button in the header. This page will show a full cart and checkout flow.</p>
      <div className="border p-6 rounded">
        <p className="mb-4">Full cart UI (client) is implemented via the cart provider and sidebar. Use that to manage items and proceed to checkout.</p>
        <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded">Continue shopping</Link>
      </div>
    </section>
  )
}
