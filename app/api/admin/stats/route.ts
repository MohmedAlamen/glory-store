import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import Product from '../../../../models/Product'
import User from '../../../../models/User'
import Order from '../../../../models/Order'

export async function GET(req: Request) {
  try {
    await connect()

    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()

    const orders = await Order.find().populate('user').sort({ createdAt: -1 }).limit(10)
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
        },
      },
    ])

    const topProducts = await Product.find().sort({ inventory: -1 }).limit(6)

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders: orders,
      topProducts,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
