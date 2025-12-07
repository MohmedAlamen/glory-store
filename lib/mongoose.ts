import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGODB_URI || process.env.MONGO_URL || ''

if (!MONGO_URL) {
  // No throw here so app can start in dev without DB configured.
  console.warn('MONGODB_URI not set; database features will be disabled.')
}

let cached: { conn: typeof mongoose | null } = { conn: null }

export async function connect() {
  if (cached.conn) return cached.conn
  if (!MONGO_URL) return null

  const conn = await mongoose.connect(MONGO_URL)
  cached.conn = conn
  return conn
}

export default mongoose
