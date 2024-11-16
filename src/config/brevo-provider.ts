// eslint-disable-next-line @typescript-eslint/no-var-requires
const brevo = require('@getbrevo/brevo')
import { env } from '@/config/environment'

const apiInstance = new brevo.TransactionalEmailsApi()
const apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async ({
  recipientEmail,
  subject,
  htmlContent
}: {
  recipientEmail: string
  subject: string
  htmlContent: string
}) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail()
  sendSmtpEmail.sender = {
    name: env.ADMIN_EMAIL_NAME,
    email: env.ADMIN_EMAIL_ADDRESS
  }

  sendSmtpEmail.to = [{ email: recipientEmail }]
  sendSmtpEmail.subject = subject
  sendSmtpEmail.htmlContent = htmlContent

  return apiInstance.sendTransacEmail(sendSmtpEmail)
}

export const BrevoProvider = {
  sendEmail
}
