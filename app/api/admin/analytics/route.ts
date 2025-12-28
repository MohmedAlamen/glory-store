import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import Product from '../../../../models/Product'
import Order from '../../../../models/Order'

export async function GET(req: Request) {
  try {
    await connect()

    // Sales by Month (mock data for now)
    const salesByMonth = [
      { month: 'January', sales: 4500 },
      { month: 'February', sales: 5200 },
      { month: 'March', sales: 4800 },
      { month: 'April', sales: 6100 },
      { month: 'May', sales: 5900 },
      { month: 'June', sales: 7200 },
    ]

    // Top Selling Products
    const products = await Product.find().sort({ reviewCount: -1 }).limit(5)
    const productsSold = products.map((p) => ({
      name: p.title,
      count: p.reviewCount || 0,
    }))

    // Order Status Distribution
    const orders = await Order.find()
    const orderStatus = [
      { status: 'pending', count: orders.filter((o) => o.status === 'pending').length },
      { status: 'processing', count: orders.filter((o) => o.status === 'processing').length },
      { status: 'shipped', count: orders.filter((o) => o.status === 'shipped').length },
      { status: 'delivered', count: orders.filter((o) => o.status === 'delivered').length },
    ]

    // Revenue by Category
    const revenueByCategory = [
      { category: 'Watches', revenue: 15000 },
      { category: 'Accessories', revenue: 8500 },
      { category: 'Straps', revenue: 5200 },
    ]

    return NextResponse.json({
      salesByMonth,
      productsSold,
      orderStatus,
      revenueByCategory,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
