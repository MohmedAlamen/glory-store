import { NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongoose'
import User from '../../../../models/User'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../../../../lib/email'

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json()

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    await connect()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    // Send welcome email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to Glory Store!',
        body: `Dear ${user.name},\n\nThank you for registering with Glory Store. We are excited to have you on board!\n\nStart shopping now: [Link to your store]\n\nBest regards,\nThe Glory Store Team`,
      })
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue execution even if email fails
    }

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
