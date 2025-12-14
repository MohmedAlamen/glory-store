import { NextResponse } from 'next/server'
import { connect } from '../../../lib/mongoose'
import Product from '../../../models/Product'
import { phonesAndAccessories } from '../../../data/phones-and-accessories'

export async function POST(req: Request) {
  try {
    await connect()

    // Clear existing products
    await Product.deleteMany({})

    // Add new products
    const products = phonesAndAccessories.map((product) => ({
      ...product,
      images: [
        `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.title)}`,
      ],
    }))

    const createdProducts = await Product.insertMany(products)

    return NextResponse.json(
      {
        message: `Successfully seeded ${createdProducts.length} products`,
        count: createdProducts.length,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed products' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    await connect()

    const count = await Product.countDocuments({})

    return NextResponse.json(
      {
        message: 'Database status',
        productCount: count,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Status error:', error)
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    )
  }
}
