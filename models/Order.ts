import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrder extends Document {
  userId?: string
  items: Array<{ slug: string; title: string; price: number; quantity: number }>
  total: number
  status: string
  stripeSessionId?: string
}

const OrderSchema: Schema = new Schema({
  userId: { type: String },
  items: [{ slug: String, title: String, price: Number, quantity: Number }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  stripeSessionId: { type: String }
}, { timestamps: true })

const Order: Model<IOrder> = (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema)

export default Order
