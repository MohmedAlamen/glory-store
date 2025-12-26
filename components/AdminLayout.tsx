"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Redirect if not admin
  React.useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 dark:bg-gray-950 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className={`font-bold text-lg ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen ? 'Admin Panel' : 'AP'}
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">📦</span>
            {sidebarOpen && <span>Products</span>}
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">📋</span>
            {sidebarOpen && <span>Orders</span>}
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">👥</span>
            {sidebarOpen && <span>Users</span>}
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">📈</span>
            {sidebarOpen && <span>Analytics</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-xl">{sidebarOpen ? '←' : '→'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.name}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
