import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartProvider from '../components/CartProvider'
import CartSidebar from '../components/CartSidebar'

export const metadata = {
  title: 'Glory Store',
  description: 'Watches & Accessories e-commerce'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container py-8">{children}</main>
            <Footer />
            <CartSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
