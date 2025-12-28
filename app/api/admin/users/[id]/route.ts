import { NextResponse } from 'next/server'
import { connect } from '../../../../../lib/mongoose'
import User from '../../../../../models/User'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connect()

    const body = await req.json()
    const user = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password')

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('User update error:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
