import { NextResponse } from 'next/server'
import { connect } from '../../../../../lib/mongoose'
import Product from '../../../../../models/Product'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connect()

    const body = await req.json()
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connect()

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Product deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
