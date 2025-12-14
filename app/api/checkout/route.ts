import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { connect } from '../../../lib/mongoose'
import Order from '../../../models/Order'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' as any })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items = [], success_url, cancel_url } = body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    // Create line items for Stripe
    const line_items = items.map((it: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: it.title },
        unit_amount: Math.round(it.price * 100)
      },
      quantity: it.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: success_url || `${process.env.NEXT_PUBLIC_BASE_URL}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_BASE_URL}/cart`
    })

    // Save order record with pending status
    await connect()
    const total = items.reduce((s: number, it: any) => s + it.price * it.quantity, 0)
    const order = await Order.create({ items, total, status: 'pending', stripeSessionId: session.id })

    return NextResponse.json({ sessionId: session.id, orderId: order._id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 })
  }
}
