/**
 * Simple Node seeder for products.
 * Run: MONGODB_URI="your" node scripts/seed.js
 */
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGODB_URI || process.env.MONGO_URL
if (!MONGO_URL) {
  console.error('Please set MONGODB_URI and try again')
  process.exit(1)
}

const ProductSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  images: [String],
  category: String,
  inventory: Number,
  rating: Number
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

const sample = [
  {
    title: 'Aurelius Classic Silver',
    slug: 'aurelius-classic-silver',
    description: 'Timeless silver watch with sapphire crystal and stainless steel mesh strap.',
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741491409-0f0f3b4c0d3a?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Watches',
    inventory: 32,
    rating: 4.6
  },
  {
    title: 'Vanguard Leather Chrono',
    slug: 'vanguard-leather-chrono',
    description: 'Sporty chronograph with durable leather strap and water resistance.',
    price: 329,
    images: [
      'https://images.unsplash.com/photo-1513569771923-5d8c9f7f4a2f?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Watches',
    inventory: 18,
    rating: 4.4
  },
  {
    title: 'Stellar Rose Gold',
    slug: 'stellar-rose-gold',
    description: 'Elegant rose gold watch with minimalist dial for evening wear.',
    price: 279,
    images: [
      'https://images.unsplash.com/photo-1536305030013-4c3d5f8b29b6?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Watches',
    inventory: 12,
    rating: 4.8
  }
]

async function run() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
    await Product.deleteMany({})
    const inserted = await Product.insertMany(sample)
    console.log(`Inserted ${inserted.length} products`)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
