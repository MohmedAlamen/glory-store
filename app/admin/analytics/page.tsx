"use client"

import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'

interface AnalyticsData {
  salesByMonth: Array<{ month: string; sales: number }>
  productsSold: Array<{ name: string; count: number }>
  orderStatus: Array<{ status: string; count: number }>
  revenueByCategory: Array<{ category: string; revenue: number }>
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    salesByMonth: [],
    productsSold: [],
    orderStatus: [],
    revenueByCategory: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading analytics...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>

        {/* Sales by Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4">Sales by Month</h2>
          <div className="space-y-3">
            {data.salesByMonth.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.month}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div
                    className="h-6 bg-blue-500 rounded"
                    style={{ width: `${(item.sales / 100) * 100}%` }}
                  />
                  <span className="text-sm font-semibold">${item.sales}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {data.productsSold.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div
                    className="h-6 bg-green-500 rounded"
                    style={{ width: `${(item.count / 50) * 100}%` }}
                  />
                  <span className="text-sm font-semibold">{item.count} sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4">Order Status Distribution</h2>
            <div className="space-y-3">
              {data.orderStatus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{item.status}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-6 bg-purple-500 rounded"
                      style={{ width: `${(item.count / 20) * 100}%` }}
                    />
                    <span className="text-sm font-semibold">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4">Revenue by Category</h2>
            <div className="space-y-3">
              {data.revenueByCategory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-6 bg-orange-500 rounded"
                      style={{ width: `${(item.revenue / 1000) * 100}%` }}
                    />
                    <span className="text-sm font-semibold">${item.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
