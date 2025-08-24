import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, projectType } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to yourself
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['phoebusdigitalsolutions@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a2a2a; border-bottom: 2px solid #d4cfc7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f5f0e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2a2a2a; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Project Type:</strong> ${projectType}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #d4cfc7;">
            <h3 style="color: #2a2a2a; margin-top: 0;">Project Description</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e8e3db; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666;">
              Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}