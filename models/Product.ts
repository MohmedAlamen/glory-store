import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProduct extends Document {
  title: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  inventory: number
  rating?: number
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  category: { type: String, default: 'Watches' },
  inventory: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true })

// Prevent model overwrite upon hot reloads in dev
const Product: Model<IProduct> = (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
