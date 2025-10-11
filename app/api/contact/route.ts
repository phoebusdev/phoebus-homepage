import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { track } from '@vercel/analytics/server'

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY)

// Zod schema for server-side validation
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().nullable().optional(),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters').max(2000, 'Project description must be less than 2000 characters'),
  timestamp: z.string().datetime().optional()
})

type ContactFormData = z.infer<typeof ContactFormSchema>

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate with Zod schema
    const validationResult = ContactFormSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.format()
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors
        },
        { status: 400 }
      )
    }

    const data: ContactFormData = validationResult.data

    // Verify required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('Missing CONTACT_EMAIL environment variable')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Construct email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: 600;
              color: #555;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              background: white;
              padding: 12px;
              border-radius: 5px;
              border-left: 3px solid #667eea;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #888;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Phoebus Digital Homepage</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <span class="label">Phone:</span>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Project Description:</span>
              <div class="value">${data.projectDescription.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              Received: ${data.timestamp ? new Date(data.timestamp).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'long'
              }) : new Date().toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'long'
              })}
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    try {
      const emailResponse = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact: ${data.name} - ${data.email}`,
        html: emailHtml,
        replyTo: data.email
      })

      // Track successful submission with Vercel Analytics
      try {
        await track('contact_form_submission', {
          name: data.name.substring(0, 3) + '***', // Anonymize for privacy
          hasPhone: !!data.phone,
          descriptionLength: data.projectDescription.length,
          source: 'homepage'
        })
      } catch (analyticsError) {
        // Don't fail the request if analytics fails
        console.error('Analytics tracking error:', analyticsError)
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
        emailId: emailResponse.data?.id
      })

    } catch (resendError: any) {
      console.error('Resend API error:', resendError)

      // Handle specific Resend errors
      if (resendError.name === 'validation_error') {
        return NextResponse.json(
          {
            error: 'Email validation failed',
            details: resendError.message
          },
          { status: 400 }
        )
      }

      if (resendError.statusCode === 429) {
        return NextResponse.json(
          {
            error: 'Too many requests. Please try again later.'
          },
          { status: 429 }
        )
      }

      // Generic Resend error
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again or contact us directly.',
          details: resendError.message
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Contact form error:', error)

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.' },
        { status: 503 }
      )
    }

    // Generic error fallback
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
