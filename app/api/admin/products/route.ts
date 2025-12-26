import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import Product from '../../../../models/Product'

export async function POST(req: Request) {
  try {
    await connect()

    const body = await req.json()
    const { title, slug, description, price, category, inventory, images } = body

    // Check if product already exists
    const existing = await Product.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }

    const product = new Product({
      title,
      slug,
      description,
      price,
      category,
      inventory,
      images,
    })

    await product.save()
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
