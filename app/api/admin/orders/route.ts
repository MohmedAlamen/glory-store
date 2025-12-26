import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import Order from '../../../../models/Order'

export async function GET(req: Request) {
  try {
    await connect()

    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
