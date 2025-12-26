import { NextResponse } from 'next/server'
import { connect } from '../../../../../lib/mongoose'
import Order from '../../../../../models/Order'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connect()

    const body = await req.json()
    const { status } = body

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate('user', 'name email')

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
