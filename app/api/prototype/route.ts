import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, projectType, source } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to yourself
    const { data, error } = await resend.emails.send({
      from: 'Free Prototype Request <onboarding@resend.dev>',
      to: ['phoebusdigitalsolutions@gmail.com'],
      subject: `🚀 Free Prototype Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a2a2a; border-bottom: 2px solid #d4cfc7; padding-bottom: 10px;">
            🚀 Free Prototype Request
          </h2>
          
          <div style="background: #f5f0e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2a2a2a; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
            ${source ? `<p><strong>Source:</strong> ${source}</p>` : ''}
          </div>
          
          ${message ? `
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #d4cfc7;">
            <h3 style="color: #2a2a2a; margin-top: 0;">Additional Details</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background: #e8e3db; border-radius: 8px;">
            <h3 style="color: #2a2a2a; margin-top: 0;">Next Steps</h3>
            <ul style="line-height: 1.6;">
              <li>Schedule a discovery call within 24 hours</li>
              <li>Understand project requirements and scope</li>
              <li>Deliver working prototype within 3-5 days</li>
              <li>Present clear proposal with fixed pricing</li>
            </ul>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #d0e8e3; border-radius: 8px; text-align: center;">
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
      { message: 'Prototype request sent successfully', id: data?.id },
      { status: 200 }
    )

  } catch (error) {
    console.error('Prototype request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}