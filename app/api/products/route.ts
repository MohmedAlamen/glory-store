import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import Product from '../../../../models/Product'

export async function GET(req: Request) {
  try {
    await connect()
    const url = new URL(req.url)
    const q = url.searchParams.get('q') || undefined
    const limit = Number(url.searchParams.get('limit') || 24)

    const filter: any = {}
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }

    const products = await Product.find(filter).limit(limit).lean()
    return NextResponse.json({ products })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 })
  }
}
