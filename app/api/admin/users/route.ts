import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import User from '../../../../models/User'

export async function GET(req: Request) {
  try {
    await connect()

    const users = await User.find({}, '-password').sort({ createdAt: -1 })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
