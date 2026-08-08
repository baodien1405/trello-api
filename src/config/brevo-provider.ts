import { BrevoClient } from '@getbrevo/brevo'
import { env } from '@/config/environment'

const brevoClient = new BrevoClient({
  apiKey: env.BREVO_API_KEY || ''
})

const sendEmail = async ({
  recipientEmail,
  subject,
  htmlContent
}: {
  recipientEmail: string
  subject: string
  htmlContent: string
}) => {
  return brevoClient.transactionalEmails.sendTransacEmail({
    sender: {
      name: env.ADMIN_EMAIL_NAME || '',
      email: env.ADMIN_EMAIL_ADDRESS || ''
    },
    to: [{ email: recipientEmail }],
    subject,
    htmlContent
  })
}

export const BrevoProvider = {
  sendEmail
}
