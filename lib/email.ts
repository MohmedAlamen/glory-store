// lib/email.ts

// This is a placeholder for a real email service (e.g., SendGrid, Nodemailer with SMTP, etc.)
// In a real application, you would configure and use an external service here.

interface EmailOptions {
  to: string
  subject: string
  body: string
}

export async function sendEmail({ to, subject, body }: EmailOptions): Promise<void> {
  console.log(`
    ========================================
    SIMULATING EMAIL SEND
    ========================================
    TO: ${to}
    SUBJECT: ${subject}
    BODY:
    ---
    ${body}
    ---
    ========================================
  `)

  // In a real app, this would be an API call to your email service provider
  // Example:
  // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     personalizations: [{ to: [{ email: to }] }],
  //     from: { email: 'noreply@glory-store.com' },
  //     subject: subject,
  //     content: [{ type: 'text/plain', value: body }],
  //   }),
  // })

  // if (!response.ok) {
  //   throw new Error('Failed to send email')
  // }
}
